import { Text, type TextProps } from "react-native";
import { useRef } from "react";
import { PrintInlineProvider, usePrintBlock } from "~/providers/printing";
import { printInline } from "~/printing/markup";
import { useFontContext } from "~/providers/fonts";
import { TYPE_SCALE } from "~/theme/typography";
import { useAppTheme } from "~/theme";

/* Tailwind sorts utilities by name, so family-specific classes must not
 * compete with Typography's default reading face. */
const FONT_FAMILY_CLASS =
  /\b(?:font-(?:display(?:-italic)?|italic|mono|reading|strong|ui(?:-(?:medium|bold))?)|aside|bold|comment|em|latin|response|versicle|vernacular)\b/;

type PProps = TextProps & {
  className?: string;
  printable?: boolean;
};

export function Typography({
  children,
  className = "",
  printable = true,
  style,
  ...props
}: PProps) {
  const { fontSize } = useFontContext();
  const { colors } = useAppTheme();
  const fontClassName = FONT_FAMILY_CLASS.test(className) ? "" : "font-reading";
  const ref = useRef<Text>(null);
  usePrintBlock(ref, () => (printable ? `<p>${printInline(children)}</p>` : ""));
  return (
    <Text
      className={`${fontClassName} text-sepia ${TYPE_SCALE.body[fontSize]} ${className}`}
      {...props}
      style={[
        /\bcomment\b/.test(className) ? { borderLeftColor: colors.accent } : undefined,
        style,
      ]}
      ref={ref}
    >
      <PrintInlineProvider>{children}</PrintInlineProvider>
    </Text>
  );
}
