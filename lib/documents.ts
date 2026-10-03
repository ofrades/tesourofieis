export interface SubHeading {
  title: string;
  id: string;
  level: number;
  body: string;
  excerpt?: string;
}

export interface Docs {
  id: string;
  title: string;
  url: string;
  level: number;
  levels: string[];
  section?: string | null;
  parent?: string | null;
  content: {
    introduction?: string;
    headings: SubHeading[];
    comment?: string | null;
  };
  keywords: string[];
  hasChildren: boolean;
}

export interface DirectoryEntry {
  id: string;
  title: string;
  url: string;
  level: number;
  section?: string | null;
  parent?: string | null;
  hasChildren: boolean;
  description: string;
}
