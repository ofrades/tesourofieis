import { printAsync, printToFileAsync } from "expo-print";
import { Asset } from "expo-asset";
import { File } from "expo-file-system";
import { Printer } from "lucide-react-native";
import { useRef, useState } from "react";
import { ActivityIndicator, Alert, Pressable } from "react-native";
import { useCollectPrint, usePrintingAvailable } from "~/providers/printing.native";
import { printDocument, printFileName } from "~/printing/markup";
import { useAppTheme } from "~/theme";

interface PrintPageProps {
  iconOnly?: boolean;
}

async function loadPrintFont() {
  const asset = await Asset.fromModule(
    require("../../assets/fonts/Cardo_400Regular.ttf"),
  ).downloadAsync();
  if (!asset.localUri) throw new Error("A fonte não está disponível.");
  return new File(asset.localUri).base64();
}

export default function PrintPage(_props: PrintPageProps) {
  const { colors } = useAppTheme();
  const collect = useCollectPrint();
  const available = usePrintingAvailable();
  const printing = useRef(false);
  const [busy, setBusy] = useState(false);
  const print = async () => {
    if (printing.current) return;
    printing.current = true;
    setBusy(true);
    try {
      const [page, font] = await Promise.all([collect(), loadPrintFont()]);
      const html = printDocument(page.content, font, page.title);
      const { uri } = await printToFileAsync({ html, width: 595.28, height: 841.89 });
      const file = new File(uri);
      const namedFile = new File(file.parentDirectory, `${printFileName(page.title)}.pdf`);
      if (namedFile.exists) namedFile.delete();
      file.move(namedFile);
      await printAsync({ uri: namedFile.uri });
    } catch (error) {
      if (
        error instanceof Error &&
        (error.message.toLowerCase().includes("cancel") ||
          error.message === "Printing did not complete")
      )
        return;
      Alert.alert(
        "Não foi possível imprimir",
        "Tente novamente. O conteúdo da página continua disponível.",
      );
    } finally {
      printing.current = false;
      setBusy(false);
    }
  };
  if (!available) return null;
  return (
    <Pressable
      onPress={print}
      disabled={busy}
      accessibilityRole="button"
      accessibilityLabel="Imprimir em A4"
      accessibilityState={{ disabled: busy, busy }}
      className="flex items-center justify-center w-11 h-11 rounded-xl active:bg-sepia-400 dark:active:bg-sepia-700 soft-background"
    >
      {busy ? (
        <ActivityIndicator size="small" color={colors.accent} />
      ) : (
        <Printer size={18} strokeWidth={1.5} color={colors.accent} />
      )}
    </Pressable>
  );
}
