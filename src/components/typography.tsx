import { Text, type TextProps } from "react-native";
import { useFontContext } from "~/providers/fonts";
import { TYPE_SCALE } from "~/theme/typography";

/* Tailwind sorts utilities by name, so family-specific classes must not
 * compete with Typography's default reading face. */
const FONT_FAMILY_CLASS =
  /\b(?:font-(?:display(?:-italic)?|italic|mono|reading|strong|ui(?:-(?:medium|bold))?)|aside|bold|comment|em|latin|response|versicle|vernacular)\b/;

type PProps = TextProps & {
  className?: string;
};

export function Typography({ children, className = "", ...props }: PProps) {
  const { fontSize } = useFontContext();
  const fontClassName = FONT_FAMILY_CLASS.test(className) ? "" : "font-reading";
  return (
    <Text
      className={`${fontClassName} text-sepia ${TYPE_SCALE.body[fontSize]} ${className}`}
      {...props}
    >
      {children}
    </Text>
  );
}
