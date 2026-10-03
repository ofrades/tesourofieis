import { View } from "react-native";
import { Typography } from "~/components/typography";
import { useAppTheme } from "~/theme";

interface LiturgicalDateHeaderProps {
  overline: string;
  /** Plain-text title rendered with the header typography. */
  title?: string;
  /** Custom title content rendered in place of `title`. */
  titleContent?: React.ReactNode;
  subtitle?: React.ReactNode;
  leftControl?: React.ReactNode;
  rightControl?: React.ReactNode;
  footer?: React.ReactNode;
  paddingHorizontal?: number;
  paddingTop?: number;
  paddingBottom?: number;
  titleSize?: number;
  subtitleSize?: number;
  centeredTitle?: boolean;
  bottomSpacing?: number;
  accentColor?: string;
}

export function LiturgicalDateHeader({
  overline,
  title,
  titleContent,
  subtitle,
  leftControl,
  rightControl,
  footer,
  paddingHorizontal = 20,
  paddingTop = 8,
  paddingBottom = 10,
  titleSize = 28,
  subtitleSize = 12,
  centeredTitle = false,
  bottomSpacing = 6,
  accentColor,
}: LiturgicalDateHeaderProps) {
  const { isDark, colors } = useAppTheme();

  return (
    <View
      style={{
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.divider,
        paddingTop,
        paddingBottom,
        paddingHorizontal,
      }}
    >
      <Typography
        className="font-ui"
        style={{
          fontSize: 10,
          letterSpacing: 0.8,
          color: accentColor ?? (isDark ? colors.accent : colors.accentStrong),
          marginBottom: 6,
        }}
      >
        {overline}
      </Typography>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          columnGap: 6,
          alignSelf: "stretch",
          marginBottom: bottomSpacing,
        }}
      >
        {leftControl}

        <View
          style={{
            flex: 1,
            flexShrink: 1,
            minWidth: 0,
            alignItems: centeredTitle ? "center" : "flex-start",
          }}
        >
          {titleContent !== undefined ? (
            titleContent
          ) : (
            <Typography
              className={`font-display leading-none ${centeredTitle ? "text-center" : ""}`}
              style={{
                fontSize: titleSize,
                color: colors.textSecondary,
              }}
              numberOfLines={1}
            >
              {title}
            </Typography>
          )}
        </View>

        {rightControl}
      </View>

      {subtitle ? (
        <Typography
          className="font-italic"
          style={{
            fontSize: subtitleSize + 1,
            color: colors.textMuted,
          }}
        >
          {subtitle}
        </Typography>
      ) : null}

      {footer}
    </View>
  );
}
