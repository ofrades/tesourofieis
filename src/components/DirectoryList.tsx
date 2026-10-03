import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { findBySlug } from "~/services/search";
import type { Docs } from "./Drawer";
import PageLinkCard from "./LinkCard";
import { Typography } from "./typography";

const DirectoryList = ({ slug }: { slug: string }) => {
  const [searchResults, setSearchResults] = useState<Docs[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = () => {
      setIsLoading(true);
      setError(null);
      try {
        const results = findBySlug(slug);
        const currentDirUrl = `/${slug}`;
        const childrenOnly = results.filter((item) => item.url !== currentDirUrl);
        setSearchResults(childrenOnly);
      } catch (err: any) {
        console.error("Error fetching by slug:", err);
        setError(err.message || "Failed to load directory.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [slug]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <ActivityIndicator size="large" className="text-red-500" />
        <Typography className="mt-2 text-gray-600 dark:text-gray-400">
          Carregando directório...
        </Typography>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Typography className="text-red-500 text-center">{error}</Typography>
      </View>
    );
  }

  if (searchResults.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Typography className="text-gray-600 dark:text-gray-400">
          Nenhum item encontrado neste diretório.
        </Typography>
      </View>
    );
  }

  return (
    <View className="flex-1 px-3 gap-2">
      {searchResults.map((page) => (
        <PageLinkCard
          key={page.url}
          href={page.url}
          title={page.title}
          hasChildren={page.hasChildren}
          description={
            page.content.comment ??
            page.content.introduction ??
            [...page.content.headings].sort((a, b) => a.level - b.level).find((i) => i.body.length)
              ?.body
          }
        />
      ))}
    </View>
  );
};

export default DirectoryList;
