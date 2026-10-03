import { Asset } from "expo-asset";
import { File } from "expo-file-system";
import { Image as ExpoImage, type ImageProps } from "expo-image";
import { useRef } from "react";
import { View } from "react-native";
import { usePrintBlock } from "~/providers/printing";
import { escapePrintText } from "~/printing/markup";

interface ReadingImageProps extends Omit<ImageProps, "source"> {
  source: number;
}

export function Image({ source, style, accessibilityLabel, ...props }: ReadingImageProps) {
  const ref = useRef<View>(null);
  usePrintBlock(ref, async () => {
    const asset = await Asset.fromModule(source).downloadAsync();
    if (!asset.localUri) throw new Error("A ilustração não está disponível.");
    const base64 = await new File(asset.localUri).base64();
    const mime = asset.type === "jpg" ? "jpeg" : asset.type;
    return `<img src="data:image/${mime};base64,${base64}" alt="${escapePrintText(accessibilityLabel ?? "")}">`;
  });
  return (
    <View ref={ref} style={style}>
      <ExpoImage
        {...props}
        source={source}
        accessibilityLabel={accessibilityLabel}
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
}
