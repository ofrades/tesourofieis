import { Text, type TextProps } from "react-native";
import { useFontContext } from "~/providers/fonts";
import { TYPE_SCALE } from "~/theme";

type PProps = TextProps & {
  className?: string;
};

export function Typography({ children, className = "", ...props }: PProps) {
  const { fontSize } = useFontContext();
  return (
    <Text
      className={`font-reading text-sepia ${TYPE_SCALE.body[fontSize]} ${className}`}
      {...props}
    >
      {children}
    </Text>
  );
}
