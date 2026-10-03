import * as fs from "fs";
import * as path from "path";
import { globSync } from "glob";
import MiniSearch from "minisearch";
import type { Docs, DirectoryEntry } from "../lib/documents";
import { STOP_WORDS, tokenize } from "../lib/search-tokenizer";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function extractKeywords(text: string): string[] {
  const normalized = normalize(text);
  const words = normalized
    .split(/\s+/)
    .filter((word) => word.length >= 3) // Only words with 3+ characters
    .filter((word) => !/^\d+$/.test(word)) // Filter out pure numbers
    .filter((word) => !STOP_WORDS.has(word)); // Filter Portuguese stop words

  return [...new Set(words)]; // Remove duplicates
}

function createExcerpt(text: string, maxWords = 20): string {
  if (!text) return "";
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
}

function generateDocumentKeywords(title: string, content: any, section: string | null): string[] {
  // Include heading titles + first part of body content for keyword extraction
  const headingText = content.headings
    .map((h: any) => {
      const bodyStart = h.body ? h.body.split(/\s+/).slice(0, 15).join(" ") : ""; // First 15 words of body
      return `${h.title} ${bodyStart}`;
    })
    .join(" ");

  const allText = [
    title,
    section || "",
    content.introduction || "",
    headingText, // Includes both title and body start
    content.comment || "",
  ]
    .filter(Boolean)
    .join(" ");

  return extractKeywords(allText);
}

interface ParsedContentSegment {
  type: "text" | "heading" | "comment";
  content: string;
  index: number;
  level?: number;
  length?: number;
  /** Explicit `id` prop on the heading tag, mirroring useHeadingId. */
  explicitId?: string;
}

function extractTextFromNestedTags(content: string): string[] {
  const textContents: string[] = [];
  let startIndex = 0;

  while (startIndex < content.length) {
    const openTag = content.indexOf("<Typography", startIndex);
    if (openTag === -1) break;

    const tagEnd = content.indexOf(">", openTag);
    if (tagEnd === -1) break;

    let depth = 1;
    let currentIndex = tagEnd + 1;
    let textContent = "";

    while (currentIndex < content.length && depth > 0) {
      const nextOpen = content.indexOf("<Typography", currentIndex);
      const nextClose = content.indexOf("</Typography>", currentIndex);

      if (nextClose === -1) break;

      if (nextOpen !== -1 && nextOpen < nextClose) {
        // Found nested opening tag
        textContent += content.substring(currentIndex, nextOpen);
        depth++;
        currentIndex = content.indexOf(">", nextOpen) + 1;
      } else {
        // Found closing tag
        textContent += content.substring(currentIndex, nextClose);
        depth--;
        const closingTagLength = "</Typography>".length; // 13; generalize as const TAG_NAME = "Typography"; then `</${TAG_NAME}>`.length
        currentIndex = nextClose + closingTagLength;
      }
    }

    if (depth === 0) {
      const cleanContent = textContent
        .replace(/<[^>]+>/g, "")
        .replace(/{[^}]+}/g, "")
        .trim();

      if (cleanContent) {
        textContents.push(cleanContent);
      }
    }

    startIndex = currentIndex;
  }

  return textContents;
}

function parseRawContentToSegments(rawContent: string): ParsedContentSegment[] {
  const segments: ParsedContentSegment[] = [];
  const headingTags = ["H1", "H2", "H3", "H4", "H5", "H6"];

  const headingMatches = headingTags
    .flatMap((tag) => {
      const regex = new RegExp(`<${tag}[^>]*text\\s*=\\s*(["'])(.*?)\\1[^>]*\\/>`, "gs");
      return [...rawContent.matchAll(regex)].map((match) => ({
        type: "heading" as const,
        content: match[2].trim(),
        explicitId: match[0].match(/id\s*=\s*(["'])(.*?)\1/)?.[2]?.trim() || undefined,
        index: match.index!,
        length: match[0].length,
        level: parseInt(tag.substring(1), 10),
      }));
    })
    .sort((a, b) => a.index - b.index);

  const commentMatch = rawContent.match(
    /<[^>]*className="[^"]*comment[^"]*"[^>]*>([\s\S]*?)<\/[^>]+>/,
  );
  const commentSegment: ParsedContentSegment | null = commentMatch
    ? {
        type: "comment",
        content: commentMatch[1].replace(/<[^>]+>/g, "").trim(),
        index: commentMatch.index!,
        length: commentMatch[0].length,
      }
    : null;

  const allStructuralElements: ParsedContentSegment[] = [
    ...headingMatches,
    ...(commentSegment ? [commentSegment] : []),
  ].sort((a, b) => a.index! - b.index!);

  let lastIndex = 0;

  for (const structuralElement of allStructuralElements) {
    if (structuralElement.index! > lastIndex) {
      const textChunk = rawContent.substring(lastIndex, structuralElement.index!);

      const extractedTexts = extractTextFromNestedTags(textChunk);

      if (extractedTexts.length > 0) {
        segments.push({
          type: "text",
          content: extractedTexts.join(" ").replace(/\s+/g, " ").trim(),
          index: lastIndex,
        });
      }
    }

    segments.push(structuralElement);
    lastIndex = structuralElement.index! + structuralElement.length!;
  }

  if (lastIndex < rawContent.length) {
    const textChunk = rawContent.substring(lastIndex);
    const extractedTexts = extractTextFromNestedTags(textChunk);

    if (extractedTexts.length > 0) {
      segments.push({
        type: "text",
        content: extractedTexts.join(" ").replace(/\s+/g, " ").trim(),
        index: lastIndex,
      });
    }
  }

  const consolidatedSegments: ParsedContentSegment[] = [];
  let currentTextContent: string = "";

  segments.forEach((segment) => {
    if (segment.type === "text") {
      currentTextContent += (currentTextContent ? " " : "") + segment.content;
    } else {
      if (currentTextContent) {
        consolidatedSegments.push({
          type: "text",
          content: currentTextContent.trim(),
          index: -1,
          length: currentTextContent.length,
        });
        currentTextContent = "";
      }
      consolidatedSegments.push(segment);
    }
  });

  if (currentTextContent) {
    consolidatedSegments.push({
      type: "text",
      content: currentTextContent.trim(),
      index: -1,
      length: currentTextContent.length,
    });
  }

  return consolidatedSegments;
}

function buildDocumentContent(rawContent: string): Docs["content"] {
  const parsedSegments = parseRawContentToSegments(rawContent);

  const content: Docs["content"] = {
    introduction: undefined,
    headings: [],
    comment: undefined,
  };

  let currentHeadingBody: string[] = [];
  let inIntroduction = true;

  parsedSegments.forEach((segment) => {
    if (segment.type === "heading") {
      if (inIntroduction && currentHeadingBody.length > 0) {
        content.introduction = currentHeadingBody.join(" ").trim();
        if (content.introduction === "") content.introduction = undefined;
      }
      inIntroduction = false;

      if (content.headings.length > 0) {
        const lastHeading = content.headings[content.headings.length - 1];
        const fullBody = currentHeadingBody.join(" ").trim();
        lastHeading.body = fullBody;
        lastHeading.excerpt = createExcerpt(fullBody, 15);
      }

      const baseId = segment.explicitId ?? slugify(segment.content);
      const uniqueId =
        baseId +
        (content.headings.filter((h) => h.id.startsWith(baseId)).length > 0
          ? `-${content.headings.filter((h) => h.id.startsWith(baseId)).length}`
          : "");

      content.headings.push({
        title: segment.content,
        id: uniqueId,
        level: segment.level!,
        body: "",
        excerpt: "",
      });
      currentHeadingBody = [];
    } else if (segment.type === "text") {
      currentHeadingBody.push(segment.content);
    } else if (segment.type === "comment") {
      content.comment = segment.content;
    }
  });

  if (content.headings.length > 0) {
    const lastHeading = content.headings[content.headings.length - 1];
    const fullBody = currentHeadingBody.join(" ").trim();
    lastHeading.body = fullBody;
    lastHeading.excerpt = createExcerpt(fullBody, 15); // Short excerpt for search
  } else if (currentHeadingBody.length > 0 && inIntroduction) {
    content.introduction = currentHeadingBody.join(" ").trim();
    if (content.introduction === "") content.introduction = undefined;
  }

  content.headings.sort((a, b) => a.level - b.level);

  return content;
}

function generateTitle(filePath: string, content: string): string {
  const headingMatches = [...content.matchAll(/<H[1-6][^>]*text\s*=\s*(["'])(.*?)\1[^>]*\/>/gs)];
  if (headingMatches.length > 0) {
    const primaryTitle = headingMatches[0][2].trim();
    if (primaryTitle) return primaryTitle;
  }

  const fileName = path.basename(filePath, ".tsx");
  return (
    fileName
      .replace(/([A-Z])/g, " $1")
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase())
      .trim() || "Sem título"
  );
}

function generateUrl(relativePath: string): string {
  return `/${relativePath}`;
}

function shouldProcessFile(file: string, baseDir: string, targetDirs: string[]): boolean {
  const relative: string = path.relative(baseDir, file);
  const isInTargetDir: boolean = targetDirs.some((dir) => relative.startsWith(`${dir}${path.sep}`));
  const isLayout: boolean = path.basename(file) === "_layout.tsx";

  return isInTargetDir && !isLayout;
}

function processFile(file: string, baseDir: string): Docs | null {
  try {
    const rawContent: string = fs.readFileSync(file, "utf-8");
    if (rawContent.trim().length < 100) {
      console.log(`Ignorando ${file}: conteúdo muito curto`);
      return null;
    }

    let relativePath: string = path.relative(baseDir, file).replace(/\\/g, "/");

    const isFolder = path.basename(file) === "index.tsx";

    if (isFolder) {
      relativePath = path.dirname(relativePath);
    }
    relativePath = relativePath.replace(/\.tsx$/, "");

    const id: string = relativePath;
    const url: string = generateUrl(relativePath);

    const title: string = generateTitle(file, rawContent);
    const documentContent = buildDocumentContent(rawContent);

    const pathParts: string[] = id.split("/").filter(Boolean);
    const section: string | null = pathParts.length > 0 ? pathParts[0] : null;
    const levels: string[] = pathParts.slice(0, -1);
    const level: number = levels.length;
    const parent: string | null = level > 0 ? pathParts.slice(0, level).join("/") : null;

    const hasChildren = isFolder;

    // Generate minimal keywords array for search indexing
    const keywords = generateDocumentKeywords(title, documentContent, section);

    const result: Docs = {
      id,
      title,
      url,
      level,
      levels,
      section,
      parent,
      hasChildren,
      content: documentContent,
      keywords,
    };

    return result;
  } catch (error: any) {
    console.error(`Erro ao processar ${file}:`, error.message);
    return null;
  }
}

function buildJsonDocs(): void {
  console.log("🔍 Iniciando indexação e construção do arquivo JSON...");
  const startTime = Date.now();

  const targetDirs: string[] = ["canticos", "devocionario", "fe", "missal", "ritual"];
  const baseDir: string = "src/app";
  const jsonFilePath: string = path.resolve("./assets/docs.json");
  const searchIndexPath: string = path.resolve("./assets/search-index.json");

  // Statistics tracking
  const sectionCounts: Record<string, number> = {};
  const stats = {
    totalFiles: 0,
    processedDocs: 0,
    totalKeywords: 0,
    sectionCounts,
    averageHeadings: 0,
    totalHeadings: 0,
  };

  const outDir: string = path.resolve("./assets");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  if (fs.existsSync(jsonFilePath)) {
    fs.unlinkSync(jsonFilePath);
    console.log(`🗑 Removido arquivo JSON existente: ${jsonFilePath}`);
  }

  if (fs.existsSync(searchIndexPath)) {
    fs.unlinkSync(searchIndexPath);
    console.log(`🗑 Removido índice de busca existente: ${searchIndexPath}`);
  }

  let files: string[] = [];
  for (const pattern of targetDirs.map((dir) => path.join(baseDir, dir, "**", "*.tsx"))) {
    const found: string[] = globSync(pattern, { cwd: process.cwd() });
    files = files.concat(found);
  }

  files = [...new Set(files)].filter((file) => shouldProcessFile(file, baseDir, targetDirs));

  console.log(`📁 Total de arquivos TSX a processar: ${files.length}`);
  stats.totalFiles = files.length;

  const processedDocs: Docs[] = [];

  files.forEach((file, index) => {
    const doc = processFile(file, baseDir);
    if (doc) {
      processedDocs.push(doc);
      stats.processedDocs++;

      // Update statistics
      if (doc.section) {
        stats.sectionCounts[doc.section] = (stats.sectionCounts[doc.section] || 0) + 1;
      }
      stats.totalHeadings += doc.content.headings.length;
      stats.totalKeywords += doc.keywords.length;
    }

    if ((index + 1) % 500 === 0 || index === files.length - 1) {
      console.log(`   Processados ${index + 1}/${files.length} documentos...`);
    }
  });

  stats.averageHeadings = stats.totalHeadings / stats.processedDocs;

  // Build MiniSearch index
  console.log(`\n🔎 Construindo índice MiniSearch...`);

  const miniSearch = new MiniSearch({
    fields: ["title", "section", "headingTitles", "introduction", "bodyText"],
    storeFields: ["id", "title", "url", "section", "bodyText"], // Store bodyText for snippet extraction
    tokenize,
    searchOptions: {
      boost: { title: 3, headingTitles: 2, section: 1.5 },
      prefix: true,
      fuzzy: 0.2,
    },
  });

  // Transform docs for indexing
  const searchDocs = processedDocs.map((doc) => ({
    id: doc.id,
    title: doc.title,
    section: doc.section || "",
    url: doc.url,
    headingTitles: doc.content.headings.map((h) => h.title).join(" "),
    introduction: doc.content.introduction || "",
    // Store body text for snippet extraction (up to 300 chars per heading, max 2000 total)
    bodyText: [
      doc.content.introduction || "",
      ...doc.content.headings.map((h) => `${h.title}: ${h.body.slice(0, 300)}`),
    ]
      .join(" | ")
      .slice(0, 2000),
  }));

  miniSearch.addAll(searchDocs);

  try {
    // Save MiniSearch index
    fs.writeFileSync(searchIndexPath, JSON.stringify(miniSearch.toJSON()), "utf-8");
    const indexSize = fs.statSync(searchIndexPath).size;
    console.log(
      `✅ Índice MiniSearch salvo: ${searchIndexPath} (${(indexSize / 1024).toFixed(1)}KB)`,
    );

    // Save optimized docs.json (with truncated body for display)
    const lightDocs = processedDocs.map((doc) => ({
      ...doc,
      content: {
        ...doc.content,
        headings: doc.content.headings.map((h) => ({
          ...h,
          // Keep excerpt, truncate body for display purposes
          body: h.excerpt || h.body.slice(0, 200),
        })),
      },
      // Keywords no longer needed at runtime - MiniSearch handles search
      keywords: [],
    }));

    fs.writeFileSync(jsonFilePath, JSON.stringify(lightDocs), "utf-8");
    const navigation: DirectoryEntry[] = lightDocs.map((doc) => ({
      id: doc.id,
      title: doc.title,
      url: doc.url,
      level: doc.level,
      section: doc.section,
      parent: doc.parent,
      hasChildren: doc.hasChildren,
      description: (
        doc.content.comment ??
        doc.content.introduction ??
        doc.content.headings.find((heading) => heading.body.length)?.body ??
        ""
      ).slice(0, 200),
    }));
    fs.writeFileSync(path.resolve("./assets/navigation.json"), JSON.stringify(navigation), "utf-8");
    const docsSize = fs.statSync(jsonFilePath).size;
    console.log(
      `✅ ${processedDocs.length} documentos salvos em: ${jsonFilePath} (${(docsSize / 1024 / 1024).toFixed(2)}MB)`,
    );

    // Print detailed statistics
    const endTime = Date.now();
    const processingTime = (endTime - startTime) / 1000;

    console.log(`\n📊 Estatísticas de Indexação:`);
    console.log(`⏱️  Tempo de processamento: ${processingTime.toFixed(2)}s`);
    console.log(`📁 Arquivos processados: ${stats.processedDocs}/${stats.totalFiles}`);
    console.log(`📝 Média de cabeçalhos por documento: ${stats.averageHeadings.toFixed(1)}`);
    console.log(`📚 Documentos por seção:`);
    Object.entries(stats.sectionCounts)
      .sort(([, a], [, b]) => b - a)
      .forEach(([section, count]) => {
        console.log(`   • ${section}: ${count} documentos`);
      });
  } catch (error: any) {
    console.error(`❌ Erro ao salvar arquivos:`, error.message);
  }

  console.log(`\n🎉 Geração do índice de busca MiniSearch concluída!`);
}

buildJsonDocs();
