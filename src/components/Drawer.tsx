import {
  Settings,
  Search,
  ChevronDown,
  ChevronRight,
  BookPlus,
  CalendarDays,
} from "lucide-react-native";
import { usePathname, useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { getAllTopLevelDocs, getChildren } from "~/services/search";
import { useSearchModal } from "~/components/Search";
import { useFontContext } from "~/providers/fonts";
import { useAppTheme } from "~/theme";

interface CustomDrawerContentProps {
  navigation: {
    closeDrawer: () => void;
  };
}

export interface SubHeading {
  title: string;
  id: string;
  level: number;
  body: string;
  excerpt?: string; // Short snippet for search results
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
  keywords: string[]; // Minimal keyword array instead of searchBlob
  hasChildren: boolean;
}

function normalizePathForMatching(path: string): string {
  return path.replace(/\/\([^)]+\)/g, "");
}

const TOP_LEVEL_TEXT = {
  small: "font-ui-medium text-xs",
  medium: "font-ui-medium text-sm",
  large: "font-ui-medium text-base",
} as const;

const CHILD_TEXT = {
  small: "font-ui text-xs",
  medium: "font-ui text-sm",
  large: "font-ui text-base",
} as const;

const ACTION_TEXT = {
  small: "font-ui-medium text-xs",
  medium: "font-ui-medium text-sm",
  large: "font-ui-medium text-base",
} as const;

function pathsMatch(pathname: string, docUrl: string): boolean {
  const normalizedPathname = normalizePathForMatching(pathname);
  const normalizedDocUrl = normalizePathForMatching(docUrl);

  if (normalizedPathname === normalizedDocUrl) return true;
  if (normalizedPathname.endsWith(normalizedDocUrl)) return true;
  if (normalizedDocUrl.endsWith(normalizedPathname)) return true;

  return false;
}

const TreeItem = React.memo(
  ({
    doc,
    level,
    expanded,
    toggleExpand,
    currentPathname,
    loadingIds,
    childrenMap: _childrenMap,
    closeDrawer,
    flattenedDocs: _flattenedDocs,
  }: {
    doc: Docs;
    level: number;
    expanded: Record<string, boolean>;
    toggleExpand: (id: string, children: boolean) => void;
    currentPathname: string;
    loadingIds: string[];
    childrenMap: Record<string, Docs[]>;
    closeDrawer: () => void;
    flattenedDocs: Docs[];
  }) => {
    const router = useRouter();
    const children = doc.hasChildren;
    const isOpen = expanded[doc.id];
    const isActive = pathsMatch(currentPathname, doc.url);

    const handlePress = useCallback(() => {
      if (children) {
        toggleExpand(doc.id, children);
      } else {
        closeDrawer();
        router.push({
          pathname: doc.url,
          params: { docId: doc.id },
        } as any);
      }
    }, [children, doc.url, doc.id, router, toggleExpand, closeDrawer]);

    const chevronSize = 11;
    const chevronWidth = 20;
    const indent = level * chevronWidth;

    const isTopLevel = level === 0;
    // UI chrome follows the user's font-size setting, one notch below the
    // reading scale (see Typography's PAGE_FONT_SIZE_CLASS).
    const { fontSize } = useFontContext();
    const { colors } = useAppTheme();
    const uiTextClass = isTopLevel ? TOP_LEVEL_TEXT[fontSize] : CHILD_TEXT[fontSize];
    const itemText = `text-sepia-700 dark:text-sepia-300 ${uiTextClass} flex-1`;
    const activeText = `${uiTextClass} font-ui-bold`;

    return (
      <TouchableOpacity
        onPress={handlePress}
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 7,
          paddingHorizontal: 8,
          paddingLeft: 8 + indent,
          marginHorizontal: 6,
          borderRadius: 7,
          borderLeftWidth: isActive ? 2 : 0,
          borderLeftColor: isActive ? colors.accent : "transparent",
        }}
        className={isActive ? "bg-sepia-200 dark:bg-sepia-800" : "bg-transparent"}
        accessibilityRole="button"
        accessibilityLabel={doc.title}
      >
        {/* Chevron for expandable, small indent for leaves */}
        <View style={{ width: chevronWidth, alignItems: "center" }}>
          {children ? (
            loadingIds.includes(doc.id) ? (
              <ActivityIndicator size="small" />
            ) : isOpen ? (
              <ChevronDown
                size={chevronSize}
                color={isActive ? colors.accent : colors.textSecondary}
              />
            ) : (
              <ChevronRight
                size={chevronSize}
                color={isActive ? colors.accent : colors.textSecondary}
              />
            )
          ) : null}
        </View>

        <Text
          numberOfLines={1}
          className={`${isActive ? activeText : itemText}`}
          style={isActive ? { color: colors.accent, letterSpacing: 0.05 } : { letterSpacing: 0.05 }}
        >
          {doc.title}
        </Text>
      </TouchableOpacity>
    );
  },
);

export default function CustomDrawerContent({ navigation }: CustomDrawerContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { toggleSearch } = useSearchModal();
  const actionText = ACTION_TEXT[useFontContext().fontSize];
  const { colors } = useAppTheme();

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [allDocs, setAllDocs] = useState<Docs[]>([]);
  const [loadingIds, setLoadingIds] = useState<string[]>([]);

  const flatListRef = React.useRef<FlatList>(null);
  const hasScrolledToActive = React.useRef(false);

  useEffect(() => {
    if (allDocs.length === 0) {
      const loadDocs = async () => {
        try {
          const docs = getAllTopLevelDocs();
          setAllDocs(docs);
        } catch (err) {
          console.error("Error loading initial docs:", err);
        }
      };
      loadDocs();
    }
  }, [allDocs.length]);

  const childrenMap = useMemo(() => {
    return allDocs.reduce<Record<string, Docs[]>>((map, doc) => {
      if (doc.parent) {
        const list = map[doc.parent] || [];
        list.push(doc);
        map[doc.parent] = list;
      }
      return map;
    }, {});
  }, [allDocs]);

  const flattenedDocs = useMemo(() => {
    const flatten = (docs: Docs[], level: number = 0): Docs[] => {
      const result: Docs[] = [];
      for (const doc of docs) {
        result.push(doc);
        if (expanded[doc.id] && childrenMap[doc.id]) {
          result.push(...flatten(childrenMap[doc.id] || [], level + 1));
        }
      }
      return result;
    };

    const topLevel = allDocs.filter((doc) => !doc.parent);
    return flatten(topLevel);
  }, [allDocs, expanded, childrenMap]);

  useEffect(() => {
    if (allDocs.length === 0 || isManualInteraction.current) return;

    const findAndExpandActiveRoute = async () => {
      let currentDocs = [...allDocs];

      let activeDoc = currentDocs.find((doc) => pathsMatch(pathname, doc.url));

      if (!activeDoc) {
        const normalizedPath = normalizePathForMatching(pathname);
        const pathSegments = normalizedPath.split("/").filter(Boolean);

        for (let i = 0; i < pathSegments.length; i++) {
          const currentPath = pathSegments.slice(0, i + 1).join("/");
          const parentDoc = currentDocs.find((doc) => doc.id === currentPath);

          if (parentDoc?.hasChildren) {
            const childrenAlreadyLoaded = currentDocs.some((doc) => doc.parent === parentDoc.id);

            if (!childrenAlreadyLoaded) {
              try {
                const children = getChildren(parentDoc.id);
                currentDocs = [...currentDocs, ...children];
              } catch (err) {
                console.error("Error loading children:", err);
              }
            }
          }
        }

        activeDoc = currentDocs.find((doc) => pathsMatch(pathname, doc.url));
      }

      if (!activeDoc) {
        setExpanded({});
        return;
      }

      const parentsToExpand: string[] = [];
      let currentParent = activeDoc.parent;

      while (currentParent) {
        const parentDoc = currentDocs.find((doc) => doc.id === currentParent);
        if (!parentDoc) break;
        parentsToExpand.push(currentParent);
        currentParent = parentDoc.parent;
      }

      const parentsTopToBottom = [...parentsToExpand].reverse();

      for (const parentId of parentsTopToBottom) {
        const childrenAlreadyLoaded = currentDocs.some((doc) => doc.parent === parentId);

        if (!childrenAlreadyLoaded) {
          try {
            const children = getChildren(parentId);
            currentDocs = [...currentDocs, ...children];
          } catch (err) {
            console.error("Error loading children for active route:", err);
          }
        }
      }

      if (currentDocs.length > allDocs.length) {
        setAllDocs(currentDocs);
      }

      const newExpanded: Record<string, boolean> = {};
      parentsToExpand.forEach((id) => {
        newExpanded[id] = true;
      });
      setExpanded(newExpanded);
    };

    findAndExpandActiveRoute();
  }, [pathname, allDocs.length]);

  useEffect(() => {
    if (flattenedDocs.length > 0 && flatListRef.current && !hasScrolledToActive.current) {
      const activeIndex = flattenedDocs.findIndex((doc) => pathsMatch(pathname, doc.url));

      if (activeIndex !== -1 && activeIndex < flattenedDocs.length) {
        const attemptScroll = (attempt = 0) => {
          if (attempt > 10 || hasScrolledToActive.current) return;

          setTimeout(
            () => {
              if (
                flatListRef.current &&
                activeIndex < flattenedDocs.length &&
                !hasScrolledToActive.current
              ) {
                try {
                  flatListRef.current.scrollToIndex({
                    index: activeIndex,
                    animated: false,
                    viewPosition: 0.3,
                  });
                  hasScrolledToActive.current = true;
                } catch (_err) {
                  attemptScroll(attempt + 1);
                }
              }
            },
            200 * (attempt + 1),
          );
        };

        attemptScroll();
      }
    }
  }, [flattenedDocs, pathname]);

  useEffect(() => {
    hasScrolledToActive.current = false;
  }, [pathname]);

  const isManualInteraction = React.useRef(false);

  const toggleExpand = useCallback(
    async (id: string, children: boolean) => {
      // eslint-disable-next-line react-hooks/immutability
      isManualInteraction.current = true;
      const isCurrentlyExpanded = expanded[id];

      setExpanded((prev) => ({ ...prev, [id]: !isCurrentlyExpanded }));

      if (!isCurrentlyExpanded && children) {
        const childrenAlreadyLoaded = allDocs.some((doc) => doc.parent === id);

        if (!childrenAlreadyLoaded) {
          setLoadingIds((prev) => [...prev, id]);
          try {
            const loadedChildren = getChildren(id);
            setAllDocs((prev) => [...prev, ...loadedChildren]);
          } catch (err) {
            console.error("Error loading children:", err);
          } finally {
            setLoadingIds((prev) => prev.filter((loadingId) => loadingId !== id));
          }
        }
      }

      setTimeout(() => {
        isManualInteraction.current = false;
      }, 100);
    },
    [expanded, allDocs],
  );

  const isLoadingInitialDocs = allDocs.length === 0;

  const getItemLevel = useCallback(
    (doc: Docs) => {
      let level = 0;
      let currentParent = doc.parent;
      while (currentParent) {
        level++;
        const parent = allDocs.find((d) => d.id === currentParent);
        currentParent = parent?.parent;
      }
      return level;
    },
    [allDocs],
  );

  return (
    <View className="flex-1 justify-between bg-sepia-50 dark:bg-sepia-900">
      <View style={{ flex: 1 }}>
        {/* App wordmark — tappable, navigates to root */}
        <TouchableOpacity
          onPress={() => {
            navigation.closeDrawer();
            router.push("/");
          }}
          style={{
            paddingHorizontal: 16,
            paddingTop: 22,
            paddingBottom: 18,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
          accessibilityRole="link"
          accessibilityLabel="Início"
        >
          <BookPlus size={19} color={colors.accent} strokeWidth={1.8} />
          <Text
            className="font-display text-xl text-sepia-800 dark:text-sepia-200"
            style={{ letterSpacing: -0.2 }}
          >
            Tesouro dos Fiéis
          </Text>
        </TouchableOpacity>

        {/* Search action */}
        <View
          style={{
            paddingHorizontal: 4,
            paddingBottom: 8,
            borderBottomWidth: 1,
          }}
          className="border-sepia-300 dark:border-sepia-700"
        >
          <TouchableOpacity
            onPress={toggleSearch}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              paddingVertical: 6,
              paddingHorizontal: 8,
              marginHorizontal: 4,
              borderRadius: 6,
            }}
            accessibilityRole="button"
            accessibilityLabel="Pesquisar"
          >
            <View style={{ width: 20, alignItems: "center" }}>
              <Search size={14} className="text-sepia-700 dark:text-sepia-300" />
            </View>
            <Text className={`${actionText} text-sepia-700 dark:text-sepia-300`}>Pesquisar</Text>
          </TouchableOpacity>

          {/* Calendar action — static quick link to the month/week overview */}
          <TouchableOpacity
            onPress={() => {
              navigation.closeDrawer();
              router.push("/calendario");
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              paddingVertical: 6,
              paddingHorizontal: 8,
              marginHorizontal: 4,
              borderRadius: 6,
              borderLeftWidth: pathname === "/calendario" ? 3 : 0,
              borderLeftColor: pathname === "/calendario" ? colors.accent : "transparent",
            }}
            className={
              pathname === "/calendario" ? "bg-sepia-200 dark:bg-sepia-800" : "bg-transparent"
            }
            accessibilityRole="button"
            accessibilityLabel="Calendário"
          >
            <View style={{ width: 20, alignItems: "center" }}>
              <CalendarDays
                size={14}
                color={pathname === "/calendario" ? colors.accent : colors.textSecondary}
              />
            </View>
            <Text
              className={`${actionText} ${
                pathname === "/calendario" ? "font-ui-bold" : "text-sepia-700 dark:text-sepia-300"
              }`}
              style={pathname === "/calendario" ? { color: colors.accent } : undefined}
            >
              Calendário
            </Text>
          </TouchableOpacity>
        </View>

        {/* Document tree */}
        <View style={{ paddingHorizontal: 14, paddingTop: 15, paddingBottom: 7 }}>
          <Text
            className="font-ui-medium text-sepia-500 dark:text-sepia-400"
            style={{ fontSize: 10, letterSpacing: 1.1, textTransform: "uppercase" }}
          >
            Biblioteca
          </Text>
        </View>
        {isLoadingInitialDocs ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" />
            <Text className={`${actionText} text-sepia-500 mt-2`}>A carregar...</Text>
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={flattenedDocs}
            keyExtractor={(doc) => doc.id}
            renderItem={({ item: doc }) => (
              <TreeItem
                doc={doc}
                level={getItemLevel(doc)}
                expanded={expanded}
                toggleExpand={toggleExpand}
                currentPathname={pathname}
                loadingIds={loadingIds}
                childrenMap={childrenMap}
                closeDrawer={navigation.closeDrawer}
                flattenedDocs={flattenedDocs}
              />
            )}
          />
        )}
      </View>

      {/* Footer */}
      <View
        style={{
          borderTopWidth: 1,
          paddingHorizontal: 4,
          paddingVertical: 10,
        }}
        className="border-sepia-300 dark:border-sepia-700"
      >
        <TouchableOpacity
          onPress={() => {
            navigation.closeDrawer();
            router.push("/configurar");
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            paddingVertical: 6,
            paddingHorizontal: 8,
            marginHorizontal: 4,
            borderRadius: 6,
          }}
          accessibilityRole="button"
          accessibilityLabel="Configurações"
        >
          <View style={{ width: 20, alignItems: "center" }}>
            <Settings size={14} className="text-sepia-700 dark:text-sepia-300" />
          </View>
          <Text className={`${actionText} text-sepia-700 dark:text-sepia-300`}>Configurações</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
