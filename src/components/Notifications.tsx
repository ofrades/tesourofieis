import { Settings, Bell, Calendar, Circle, BookPlus, Sparkles } from "lucide-react-native";
import { useState } from "react";
import { Platform, Pressable, ScrollView, Switch, TouchableOpacity, View } from "react-native";
import { H6 } from "~/components/Headings";
import { COLORS } from "~/constants/Colors";
import { useSettings } from "~/providers/settings";
import { Typography } from "./typography";
import { useAppTheme } from "~/theme";

const notificationIcons = {
  bell: Bell,
  calendar: Calendar,
  circle: Circle,
  book: BookPlus,
  sparkles: Sparkles,
} as const;

const NotificationToggle = ({
  title,
  icon,
  description,
  times,
  enabled,
  toggle,
}: {
  title: string;
  icon: string;
  description: string;
  times: string[];
  enabled: boolean;
  toggle: () => void;
}) => {
  const { colors } = useAppTheme();
  const IconComponent = notificationIcons[icon as keyof typeof notificationIcons] ?? Settings;

  return (
    <View className="py-3">
      <View className="my-1 py-1">
        <View className="flex flex-row items-center justify-between">
          <IconComponent size={15} color={colors.textPrimary} />
          <View className="flex-1 ml-3">
            <Typography className="font-ui-bold text-sepia-800 dark:text-sepia-200">
              {title}
            </Typography>
            <Typography className="font-ui text-sepia-800 dark:text-sepia-200 text-sm">
              {description}
            </Typography>
          </View>
          <View className="ml-3">
            <Switch
              trackColor={{ false: COLORS["600"], true: COLORS["400"] }}
              thumbColor={enabled ? COLORS["200"] : COLORS["500"]}
              ios_backgroundColor={COLORS["500"]}
              onValueChange={toggle}
              value={enabled}
              accessibilityLabel={`Toggle ${title.toLowerCase()} notifications`}
            />
          </View>
        </View>
      </View>
      <View className="flex-row flex-wrap items-center ml-5">
        {times.map((time) => (
          <Typography
            key={time}
            className="text-sm text-center text-sepia-200 ml-2 mt-2 px-2 py-1 rounded-full bg-sepia-900"
          >
            {time}
          </Typography>
        ))}
      </View>
    </View>
  );
};

export const Notifications = () => {
  const { colors } = useAppTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    settings,
    setNotificationPref,
    list,
    permissionStatus,
    requestPermission,
    isSoftRejected,
  } = useSettings();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (Platform.OS === "web") {
    return null;
  }

  if (permissionStatus !== "granted") {
    return (
      <View className="py-3 my-3 border-b border-sepia-300 dark:border-sepia-700">
        <View className="flex-row items-center gap-1">
          <Settings size={15} color={colors.textPrimary} />
          <H6 text="Notificações Desativadas" />
        </View>

        <Typography className="font-ui dark:text-sepia-200 text-sm">
          {isSoftRejected
            ? "Os lembretes de oração ajudam a santificar o seu dia."
            : "Para receber notificações active as notificações."}
        </Typography>
        <Typography className="font-ui dark:text-sepia-200 text-xs">
          {isSoftRejected
            ? '"Orai sem cessar" (1 Tes 5:17)'
            : "Pode ter que activar nas definições do dispositivo."}
        </Typography>

        <Pressable
          className="bg-sepia-800 dark:bg-sepia-200 items-center justify-center rounded mt-3 active:bg-sepia-700 dark:active:bg-sepia-300"
          onPressOut={requestPermission}
        >
          <Typography className="m-5 font-ui-bold text-sepia-300 dark:text-sepia-700">
            Activar Notificações
          </Typography>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView className="py-3 my-3 border-b border-sepia-300 dark:border-sepia-700">
      <View className="flex-row items-center gap-1">
        <Settings size={15} color={colors.textPrimary} />
        <H6 text="Configurar Notificações" />
      </View>

      <Typography className="font-ui dark:text-sepia-200 text-sm">
        Receba notificações sobre as mais importantes orações do dia.
      </Typography>

      <Typography className="font-ui text-xs text-sepia-700 dark:text-sepia-300">
        As notificações dinâmicas, como as da Missa do Dia e Novenas, necessitam de que o utilizador
        use a aplicação pelo menos uma vez por semana.
      </Typography>

      <NotificationToggle
        title="Angelus"
        icon="bell"
        description="Receba o toque das Trindades"
        times={["6:00", "12:00", "18:00"]}
        enabled={settings.angelusEnabled}
        toggle={() => setNotificationPref("ANGELUS", !settings.angelusEnabled)}
      />

      <NotificationToggle
        title="Missa do Dia"
        icon="calendar"
        description="Receba informações sobre as celebrações e comemorações do dia. Inclui lembretes da Primeira Sexta-feira (Sagrado Coração) e do Primeiro Sábado (Imaculado Coração)."
        times={["7:00"]}
        enabled={settings.massEnabled}
        toggle={() => setNotificationPref("MASS", !settings.massEnabled)}
      />

      <NotificationToggle
        title="Novenas"
        icon="circle"
        description="Receba alertas nos dias de novena, incluindo a Quaresma de São Miguel (15 ago – 29 set)."
        times={["20:00"]}
        enabled={settings.novenaEnabled}
        toggle={() => setNotificationPref("NOVENA", !settings.novenaEnabled)}
      />

      <NotificationToggle
        title="Ofício"
        icon="book"
        description="Receba lembretes para o Pequeno Ofício de Nossa Senhora."
        times={["0:00", "3:00", "6:00", "9:00", "12:00", "15:00", "18:00", "21:00"]}
        enabled={settings.officeEnabled}
        toggle={() => setNotificationPref("OFFICE", !settings.officeEnabled)}
      />

      <NotificationToggle
        title="Indulgências"
        icon="sparkles"
        description="Receba alertas sobre indulgências plenárias e oportunidades especiais."
        times={["Dias especiais", "Festas móveis"]}
        enabled={settings.indulgencesEnabled}
        toggle={() => setNotificationPref("INDULGENCES", !settings.indulgencesEnabled)}
      />

      <View className="mt-5">
        {list?.length > 0 ? (
          <TouchableOpacity
            onPressOut={toggleExpand}
            className="p-3 soft-background text-sepia-700 dark:text-sepia-300"
          >
            <Typography className="text-center font-ui-medium text-sepia-800 dark:text-sepia-200">
              {isExpanded ? "Esconder lista notificações" : "Mostrar lista de notificações"}
            </Typography>
          </TouchableOpacity>
        ) : undefined}

        {isExpanded && list?.length ? (
          <View>
            {list.map((notification) => (
              <View
                key={notification.identifier}
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderColor: colors.divider,
                }}
              >
                <Typography className="text-sepia-800 dark:text-sepia-200">
                  {notification.content.title}
                </Typography>
                {notification.content.body ? (
                  <Typography className="text-sepia-700 dark:text-sepia-300">
                    {notification.content.body}
                  </Typography>
                ) : undefined}
              </View>
            ))}
          </View>
        ) : undefined}
      </View>
    </ScrollView>
  );
};
