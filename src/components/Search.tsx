import { BookPlus, Search, X, Filter, Tag, CircleDot } from "lucide-react-native";
import { useRouter } from "expo-router";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Platform,
  Pressable,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Keyboard,
} from "react-native";
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Typography } from "~/components/typography";
import { COLORS } from "~/constants/Colors";
import type { SearchResult, SearchFilters } from "~/services/search";
import { getAvailableSections, getSectionDisplayName } from "~/services/documents";
import { H5 } from "./Headings";
import { useAppTheme } from "~/theme";

const SearchModalContext = createContext<{
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
  isSearchOpen: boolean;
} | null>(null);

export const useSearchModal = () => {
  const context = useContext(SearchModalContext);
  if (!context) {
    throw new Error("useSearchModal must be used within SearchModalProvider");
  }
  return context;
};

export function SearchModalProvider({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const openSearch = useCallback(() => {
    if (Platform.OS === "web") {
      setIsSearchOpen(true);
    } else {
      bottomSheetRef.current?.present();
      setIsSearchOpen(true);
    }
  }, []);

  const closeSearch = useCallback(() => {
    if (Platform.OS === "web") {
      setIsSearchOpen(false);
    } else {
      bottomSheetRef.current?.dismiss();
      Keyboard.dismiss();
      setIsSearchOpen(false);
    }
  }, []);

  const toggleSearch = useCallback(() => {
    if (isSearchOpen) {
      closeSearch();
    } else {
      openSearch();
    }
  }, [closeSearch, isSearchOpen, openSearch]);

  const handleBottomSheetDismiss = useCallback(() => {
    setIsSearchOpen(false);
    Keyboard.dismiss();
  }, []);

  useEffect(() => {
    if (Platform.OS !== "web") return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      if (key === "escape" && isSearchOpen) {
        event.preventDefault();
        closeSearch();
        return;
      }

      if ((event.ctrlKey || event.metaKey) && key === "k") {
        event.preventDefault();
        toggleSearch();
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [closeSearch, isSearchOpen, toggleSearch]);

  const handleNavigate = useCallback(
    (url: string, headingId?: string) => {
      router.push({
        pathname: url,
        params: headingId ? { anchor: headingId } : undefined,
      } as any);
    },
    [router],
  );

  const value = useMemo(
    () => ({ openSearch, closeSearch, toggleSearch, isSearchOpen }),
    [openSearch, closeSearch, toggleSearch, isSearchOpen],
  );

  return (
    <SearchModalContext.Provider value={value}>
      {children}
      {Platform.OS === "web" ? (
        <SearchModal
          visible={isSearchOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onClose={closeSearch}
          onNavigate={handleNavigate}
        />
      ) : (
        <SearchBottomSheet
          ref={bottomSheetRef}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onNavigate={handleNavigate}
          onDismiss={handleBottomSheetDismiss}
        />
      )}
    </SearchModalContext.Provider>
  );
}

const renderFTSHighlightedText = (text: string) => {
  if (!text) return null;
  const parts = text.split(/(<b>.*?<\/b>)/g).filter(Boolean);
  return (
    <Typography>
      {parts.map((part, i) => {
        if (part.startsWith("<b>") && part.endsWith("</b>")) {
          const highlightedContent = part.slice(3, -4);
          return (
            <Typography key={part + i} className="bg-sepia-400 dark:bg-sepia-600 bold">
              {highlightedContent}
            </Typography>
          );
        }
        return <Typography key={part + i}>{part}</Typography>;
      })}
    </Typography>
  );
};

const SearchResultItem = React.memo(
  ({
    item,
    onPress,
  }: {
    item: SearchResult;
    onPress: (url: string, headingId?: string) => void;
  }) => {
    const { colors } = useAppTheme();
    const handlePress = useCallback(
      (headingId?: string) => {
        onPress(item.url, headingId);
      },
      [item, onPress],
    );
    const handleCardPress = useCallback(() => {
      if (item.matchedHeading) {
        handlePress(item.matchedHeading.id);
      } else if (item.content.headings.length > 0) {
        handlePress(item.content.headings[0]?.id);
      } else {
        handlePress();
      }
    }, [item.matchedHeading, item.content.headings, handlePress]);

    const displaySnippet = item.matchedText;
    const fallbackSnippet =
      item.content.introduction ||
      (item.content.headings.length > 0 ? item.content.headings[0]!.body : "") ||
      "";

    return (
      <View className="mx-4 py-3 border-b border-b-sepia-500">
        <TouchableOpacity onPress={handleCardPress}>
          <View className="flex-row items-center gap-2">
            <CircleDot color={COLORS["500"]} size={10} />
            <H5 text={item.title} />
          </View>

          <Typography className="aside" numberOfLines={2}>
            {displaySnippet ? renderFTSHighlightedText(displaySnippet) : fallbackSnippet}
          </Typography>

          {item.content.headings.length > 1 && (
            <View className="mt-2">
              <Typography className="font-ui-medium">Secções:</Typography>
              <View className="flex-row flex-wrap gap-2 mt-1">
                {item.content.headings
                  .filter((heading) => heading.id !== item.matchedHeading?.id)
                  .slice(0, 10)
                  .map((heading) => (
                    <TouchableOpacity key={heading.id} onPress={() => handlePress(heading.id)}>
                      <Typography className="font-ui text-xs underline" numberOfLines={1}>
                        {heading.title}
                      </Typography>
                    </TouchableOpacity>
                  ))}
              </View>
            </View>
          )}
          <View className="flex-row flex-wrap items-center mt-3 gap-2">
            {item.section && (
              <View className="flex-row items-center gap-1">
                <Tag size={10} color={COLORS["500"]} />
                <Typography
                  className="text-ellipsis text-xs px-2 py-1 rounded-full"
                  style={{
                    color: colors.accentStrong,
                    backgroundColor: colors.accentSoft,
                  }}
                >
                  {getSectionDisplayName(item.section)}
                </Typography>
              </View>
            )}
            {item.id
              .split("/")
              .slice(1, -1)
              .map((path, i) => (
                <Typography
                  key={i}
                  className="text-ellipsis text-sepia-800 dark:text-sepia-200 text-xs px-2 py-1 rounded-full extreme-background"
                >
                  {path}
                </Typography>
              ))}
            {item.relevanceScore && item.relevanceScore > 1000 && (
              <Typography className="text-xs text-green-600 dark:text-green-400 px-2 py-1 rounded-full bg-green-100 dark:bg-green-900">
                Relevante
              </Typography>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  },
);

function SearchFiltersBar({
  showFilters,
  selectedSections,
  setSelectedSections,
  availableSections,
}: {
  showFilters: boolean;
  selectedSections: string[];
  setSelectedSections: React.Dispatch<React.SetStateAction<string[]>>;
  availableSections: string[];
}) {
  const { colors } = useAppTheme();

  if (!showFilters) return null;

  return (
    <View className="mt-3 px-2">
      <Typography className="text-sm font-ui-medium mb-2 text-sepia-500 dark:text-sepia-300">
        Filtrar por seção:
      </Typography>
      <ScrollView horizontal>
        <View className="flex-row gap-2">
          {selectedSections.length > 0 && (
            <TouchableOpacity
              onPress={() => setSelectedSections([])}
              className="px-3 py-1 rounded-full"
              style={{ backgroundColor: colors.accentSoft }}
            >
              <Typography className="text-xs" style={{ color: colors.accentStrong }}>
                Limpar
              </Typography>
            </TouchableOpacity>
          )}
          {availableSections.map((section) => {
            const isSelected = selectedSections.includes(section);
            return (
              <TouchableOpacity
                key={section}
                accessibilityRole="button"
                accessibilityLabel={getSectionDisplayName(section)}
                accessibilityState={{ selected: isSelected }}
                onPress={() => {
                  if (isSelected) {
                    setSelectedSections((prev) => prev.filter((s) => s !== section));
                  } else {
                    setSelectedSections((prev) => [...prev, section]);
                  }
                }}
                className="px-3 py-1 rounded-full border"
                style={{
                  backgroundColor: isSelected ? colors.accentSoft : colors.panel,
                  borderColor: isSelected ? colors.accentBorder : colors.divider,
                }}
              >
                <Typography
                  className="text-xs"
                  style={{ color: isSelected ? colors.accentStrong : colors.textMuted }}
                >
                  {getSectionDisplayName(section)}
                </Typography>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

function SearchResults({
  results,
  isSearching,
  searchError,
  retrySearch,
  searchQuery,
  selectedSections,
  setSelectedSections,
  onNavigate,
  ListComponent = FlatList,
}: {
  results: SearchResult[];
  isSearching: boolean;
  searchError: boolean;
  retrySearch: () => void;
  searchQuery: string;
  selectedSections: string[];
  setSelectedSections: React.Dispatch<React.SetStateAction<string[]>>;
  onNavigate: (url: string, headingId?: string) => void;
  ListComponent?: typeof FlatList | typeof BottomSheetFlatList;
}) {
  const { colors: themeColors } = useAppTheme();

  if (searchError) return <SearchError onRetry={retrySearch} />;

  if (isSearching) {
    return (
      <View className="flex-1 justify-center items-center py-12">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (results.length > 0) {
    return (
      <View className="flex-1">
        <View className="px-4 py-2 border-b border-sepia">
          <Typography className="text-xs text-sepia-500 dark:text-sepia-400">
            {results.length} resultado
            {results.length !== 1 ? "s" : ""} encontrado
            {results.length !== 1 ? "s" : ""}
            {selectedSections.length > 0 && (
              <Typography className="text-xs">
                {" "}
                em {selectedSections.map((s) => getSectionDisplayName(s)).join(", ")}
              </Typography>
            )}
          </Typography>
        </View>
        <ListComponent
          data={results}
          renderItem={({ item }: { item: SearchResult }) => (
            <SearchResultItem item={item} onPress={onNavigate} />
          )}
          keyExtractor={(item: SearchResult) => item.id}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    );
  }

  if (searchQuery.trim()) {
    return (
      <View className="flex-1 justify-center items-center py-12">
        <Search size={15} color={themeColors.icon} />
        <Typography className="text-sepia-500 dark:text-sepia-400 mt-2 text-center">
          Nenhum resultado encontrado
        </Typography>
        {selectedSections.length > 0 && (
          <TouchableOpacity
            onPress={() => setSelectedSections([])}
            className="mt-2 px-3 py-1 rounded border border-sepia"
          >
            <Typography className="text-xs text-sepia-500 dark:text-sepia-400">
              Remover filtros
            </Typography>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return null;
}

function useSearch(searchQuery: string, selectedSections: string[]) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const retrySearch = useCallback(() => setAttempt((previous) => previous + 1), []);
  useEffect(() => {
    let cancelled = false;
    const performSearch = async () => {
      if (!searchQuery.trim()) {
        if (!cancelled) {
          setResults([]);
          setIsSearching(false);
          setSearchError(false);
        }
        return;
      }
      setIsSearching(true);
      setSearchError(false);
      try {
        const filters: SearchFilters = {};
        if (selectedSections.length > 0) filters.sections = selectedSections;
        const { search } = await import("~/services/search");
        const matches = await search(searchQuery, 20, filters);
        if (!cancelled) setResults(matches);
      } catch (error) {
        console.error("Search error:", error);
        if (!cancelled) {
          setResults([]);
          setSearchError(true);
        }
      } finally {
        if (!cancelled) setIsSearching(false);
      }
    };
    const timeout = setTimeout(() => void performSearch(), searchQuery.trim() ? 100 : 0);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [searchQuery, selectedSections, attempt]);

  return { results, isSearching, searchError, retrySearch };
}

interface SearchErrorProps {
  onRetry: () => void;
}

function SearchError({ onRetry }: SearchErrorProps) {
  return (
    <View className="items-center p-6 gap-3">
      <Typography accessibilityRole="alert">Não foi possível pesquisar.</Typography>
      <Pressable
        onPress={onRetry}
        accessibilityRole="button"
        className="min-h-11 justify-center px-4 rounded-lg soft-background"
      >
        <Typography>Tentar novamente</Typography>
      </Pressable>
    </View>
  );
}

const SearchBottomSheet = React.forwardRef<
  BottomSheetModal,
  {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    onNavigate: (url: string, headingId?: string) => void;
    onDismiss: () => void;
  }
>(({ searchQuery, setSearchQuery, onNavigate, onDismiss }, ref) => {
  const { colors: themeColors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const inputRef = useRef<any>(null);
  const availableSections = useMemo(() => getAvailableSections(), []);
  const { results, isSearching, searchError, retrySearch } = useSearch(
    searchQuery,
    selectedSections,
  );

  const handleNavigate = useCallback(
    (url: string, headingId?: string) => {
      onNavigate(url, headingId);
      (ref as React.RefObject<BottomSheetModal>)?.current?.dismiss();
      Keyboard.dismiss();
    },
    [onNavigate, ref],
  );

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      Keyboard.dismiss();
    }
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    [],
  );

  const colors = useMemo(
    () => ({
      placeholder: COLORS["500"],
    }),
    [],
  );

  const snapPoints = useMemo(() => ["50%", "90%"], []);

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      onDismiss={onDismiss}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
      keyboardBehavior="extend"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      topInset={insets.top + 55}
      backgroundStyle={{
        backgroundColor: themeColors.panel,
      }}
    >
      <BottomSheetScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: Math.max(100, insets.bottom + 24),
        }}
      >
        <View className="px-4 pb-1 pt-4 medium-background">
          <View className="flex-row px-3 py-1 items-center rounded-lg border border-sepia-300 dark:border-sepia-700 extreme-background">
            <Search size={16} color={colors.placeholder} />
            <BottomSheetTextInput
              accessibilityLabel="Pesquisar no Tesouro dos Fiéis"
              ref={inputRef}
              placeholder="Procurar..."
              placeholderTextColor={colors.placeholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCorrect={false}
              autoFocus={true}
              returnKeyType="search"
              style={{
                flex: 1,
                paddingVertical: 8,
                marginLeft: 8,
                fontSize: 16,
                color: themeColors.textPrimary,
              }}
            />
            <TouchableOpacity
              onPress={() => setShowFilters(!showFilters)}
              className="ml-2 p-1"
              accessibilityRole="button"
              accessibilityLabel="Filtros de pesquisa"
              accessibilityState={{ expanded: showFilters }}
              hitSlop={10}
            >
              <Filter
                size={15}
                color={selectedSections.length > 0 ? themeColors.accent : colors.placeholder}
              />
            </TouchableOpacity>
            {!!searchQuery && (
              <TouchableOpacity
                onPress={() => setSearchQuery("")}
                className="ml-1 p-1"
                accessibilityRole="button"
                accessibilityLabel="Limpar pesquisa"
                hitSlop={10}
              >
                <X size={16} color={colors.placeholder} />
              </TouchableOpacity>
            )}
          </View>

          <SearchFiltersBar
            showFilters={showFilters}
            selectedSections={selectedSections}
            setSelectedSections={setSelectedSections}
            availableSections={availableSections}
          />

          {results.length > 0 && (
            <View className="pt-2">
              <Typography className="text-xs text-sepia-600 dark:text-sepia-400">
                {results.length} resultado{results.length !== 1 ? "s" : ""}
              </Typography>
            </View>
          )}

          {isSearching && (
            <View className="py-8 items-center">
              <ActivityIndicator size="small" />
            </View>
          )}

          {searchError && <SearchError onRetry={retrySearch} />}
          {searchQuery.trim() && !isSearching && !searchError && results.length === 0 && (
            <View className="py-8 items-center">
              <Typography className="text-sepia-500 dark:text-sepia-400 text-center">
                Nenhum resultado encontrado
              </Typography>
            </View>
          )}
        </View>

        {results.map((item) => (
          <SearchResultItem key={item.id} item={item} onPress={handleNavigate} />
        ))}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

function SearchModal({
  visible,
  searchQuery,
  setSearchQuery,
  onClose,
  onNavigate,
}: {
  visible?: boolean;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
  onNavigate: (url: string, headingId?: string) => void;
}) {
  const { colors: themeColors } = useAppTheme();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const inputRef = useRef<TextInput>(null);
  const availableSections = useMemo(() => getAvailableSections(), []);
  const { results, isSearching, searchError, retrySearch } = useSearch(
    searchQuery,
    selectedSections,
  );

  useEffect(() => {
    if (visible) {
      const focusTimeout = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(focusTimeout);
    }
  }, [visible]);

  const handleNavigate = useCallback(
    (url: string, headingId?: string) => {
      onNavigate(url, headingId);
      onClose();
    },
    [onNavigate, onClose],
  );

  const colors = useMemo(
    () => ({
      placeholder: COLORS["500"],
    }),
    [],
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View className="flex-1 items-center justify-center bg-black/40">
        <Pressable className="absolute inset-0" onPress={onClose} />
        <View
          className="px-6 w-full max-w-xl flex-1 items-center justify-center"
          pointerEvents="box-none"
        >
          <View
            className="overflow-hidden rounded-xl"
            style={{
              minHeight: "10%",
              maxHeight: "85%",
              minWidth: "90%",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <View className="px-5 pt-4 pb-3 medium-background">
              <View className="flex-row justify-center items-center pb-3">
                <BookPlus size={15} color={themeColors.accent} />
              </View>
              <View className="flex-row px-5 py-1 items-center rounded-xl border border-sepia extreme-background">
                <Search size={15} color={colors.placeholder} />
                <TextInput
                  accessibilityLabel="Pesquisar no Tesouro dos Fiéis"
                  ref={inputRef}
                  placeholder="Procurar..."
                  placeholderTextColor={colors.placeholder}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  autoCorrect={false}
                  autoFocus
                  returnKeyType="search"
                  className="flex-1 py-3 ml-2 text-sepia-900 dark:text-sepia-100"
                  style={Platform.OS === "web" ? ({ outlineStyle: "none" } as any) : undefined}
                />
                <TouchableOpacity
                  onPress={() => setShowFilters(!showFilters)}
                  className="ml-2 p-1"
                  accessibilityRole="button"
                  accessibilityLabel="Filtros de pesquisa"
                  accessibilityState={{ expanded: showFilters }}
                  hitSlop={10}
                >
                  <Filter
                    size={15}
                    color={selectedSections.length > 0 ? themeColors.accent : colors.placeholder}
                  />
                </TouchableOpacity>
                {!!searchQuery && (
                  <TouchableOpacity
                    onPress={() => setSearchQuery("")}
                    className="ml-2"
                    accessibilityRole="button"
                    accessibilityLabel="Limpar pesquisa"
                    hitSlop={10}
                  >
                    <X size={15} color={colors.placeholder} />
                  </TouchableOpacity>
                )}
              </View>

              <SearchFiltersBar
                showFilters={showFilters}
                selectedSections={selectedSections}
                setSelectedSections={setSelectedSections}
                availableSections={availableSections}
              />
            </View>

            <View className="flex-1 medium-background">
              <SearchResults
                results={results}
                isSearching={isSearching}
                searchError={searchError}
                retrySearch={retrySearch}
                searchQuery={searchQuery}
                selectedSections={selectedSections}
                setSelectedSections={setSelectedSections}
                onNavigate={handleNavigate}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
