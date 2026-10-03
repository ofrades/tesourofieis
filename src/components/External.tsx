import { Coffee, Bitcoin, Mail, Copy } from "lucide-react-native";
import { burgundy } from "config";
import * as Clipboard from "expo-clipboard";
import * as WebBrowser from "expo-web-browser";
import type { GestureResponderEvent } from "react-native";
import { Alert, Platform, Pressable, ScrollView, ToastAndroid, View } from "react-native";
import { COLORS } from "~/constants/Colors";
import { useAppTheme } from "~/theme";
import { cardBase } from "./LinkCard";
import { Typography } from "./typography";

function getColor(color?: string) {
  switch (color) {
    case "w":
      return "white";
    case "r":
      return burgundy[500];
    case "g":
      return "green";
    case "v":
      return "violet";
    case "b":
      return "black";
    default:
      return "gray";
  }
}

interface ExternalLink {
  name: string;
  url: string;
  icon: string;
  title: string;
  desc: string;
  copyValue?: string;
}

const externalLinks: ExternalLink[] = [
  {
    name: "KO-FI",
    url: "https://ko-fi.com/tesourofieis",
    icon: "coffee",
    title: "Ajudar",
    desc: "Ajude a manter o Tesouro dos Fiéis com uma doação.",
  },
  {
    name: "Bitcoin",
    url: "bitcoin:bc1qh0sjg9m26ejhg7qxqevs5rldyysy0yc7mdpve5",
    icon: "bitcoin",
    title: "Doar Bitcoin",
    desc: "Ajude-nos com uma doação em Bitcoin.",
    copyValue: "BC1QAJM5VN255SEU2UGSSVNN3APXX7TQLEW4E0J7CV",
  },
  {
    name: "Email",
    url: "mailto:info@tesourofieis.com",
    icon: "mail",
    title: "Falar",
    desc: "Fale connosco por email. Caso tenha alguma dúvida ou sugestão.",
  },
];

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "coffee":
      return Coffee;
    case "bitcoin":
      return Bitcoin;
    case "mail":
      return Mail;
    case "copy":
      return Copy;
    default:
      return Coffee;
  }
};

const copyToClipboard = async (text: string) => {
  await Clipboard.setStringAsync(text);
};

const showCopiedFeedback = (message = "Copiado para a área de transferência") => {
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert("", message);
  }
};

const openExternalLink = async (link: string) => {
  try {
    await WebBrowser.openBrowserAsync(link);
  } catch (err) {
    // opcional: lidar com erro de abertura do browser
    console.warn("Erro ao abrir link:", err);
  }
};

export default function ExternalLinks() {
  const { isDark } = useAppTheme();

  return (
    <ScrollView className="mt-1 px-5 py-4">
      <View className="flex flex-col gap-3">
        {externalLinks.map((link) => (
          <Pressable
            key={link.name}
            onPress={() => openExternalLink(link.url)}
            className="w-full"
            accessibilityLabel={`${link.title}: ${link.desc}`}
            accessibilityRole="link"
          >
            {({ pressed }) => (
              <View className={cardBase(pressed)}>
                <View className="flex flex-row justify-between items-center gap-1 mr-2">
                  <View className="flex-1">
                    <View className="flex text-pretty font-ui-medium flex-row items-center gap-2">
                      {(() => {
                        const IconComponent = getIconComponent(link.icon);
                        return (
                          <IconComponent size={15} color={isDark ? COLORS["200"] : COLORS["800"]} />
                        );
                      })()}
                      <Typography className="text-lg font-display text-sepia-600 dark:text-sepia-300">
                        {link.title}
                      </Typography>
                    </View>

                    <View className="flex flex-row">
                      <Typography
                        className="text-pretty font-ui text-xs text-sepia-600 dark:text-sepia-200"
                        numberOfLines={1}
                      >
                        {link.desc}
                      </Typography>
                    </View>

                    {link.copyValue && (
                      <View className="flex-row items-center gap-2 mt-1">
                        {/* Important: stopPropagation to avoid opening the external link when pressing copy */}
                        <Pressable
                          onPress={async (e: GestureResponderEvent) => {
                            // evita que o Pressable pai seja acionado
                            e.stopPropagation?.();
                            try {
                              await copyToClipboard(link.copyValue as string);
                              showCopiedFeedback();
                            } catch (err) {
                              console.warn("Erro ao copiar:", err);
                              showCopiedFeedback("Erro ao copiar");
                            }
                          }}
                          accessibilityRole="button"
                          accessibilityLabel={`Copiar ${link.name}`}
                        >
                          <View className="flex-row p-3 gap-3 items-center text-xs text-sepia bg-sepia-200 dark:bg-sepia-900 rounded-xl">
                            <Typography
                              className="font-mono text-xs"
                              numberOfLines={1}
                              ellipsizeMode="middle"
                            >
                              {link.copyValue}
                            </Typography>

                            <Copy size={12} color={COLORS[500]} />
                          </View>
                        </Pressable>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            )}
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
