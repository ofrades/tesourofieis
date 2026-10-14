import { Type } from "~/components/icons";
import { useFontContext } from "~/providers/fonts";
import { SegmentedOption, SettingsSection } from "./SettingsControls";
import { useAppTheme } from "~/theme";

const SIZES = ["small", "medium", "large"] as const;
const SIZE_LABEL = {
  small: "Pequeno",
  medium: "Médio",
  large: "Grande",
} satisfies Record<(typeof SIZES)[number], string>;

export const FontSizeSelector = () => {
  const { colors } = useAppTheme();
  const { fontSize, setFontSize } = useFontContext();
  return (
    <SettingsSection icon={<Type size={15} color={colors.textPrimary} />} title="Tamanho da Letra">
      <SegmentedOption
        value={fontSize}
        onChange={setFontSize}
        options={SIZES.map((size) => ({ label: SIZE_LABEL[size], value: size }))}
      />
    </SettingsSection>
  );
};
