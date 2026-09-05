import AsyncStorage from "@react-native-async-storage/async-storage";
import { isFirstFriday, isFirstSaturday, stMichaelLentDay, yyyyMMDD } from "~/lib/utils";
import { burgundy } from "config";
import { addDays, isWithinInterval, parseISO, subDays } from "date-fns";
import * as Application from "expo-application";
import * as IntentLauncher from "expo-intent-launcher";
import * as Linking from "expo-linking";
import type * as ExpoNotifications from "expo-notifications";
import { useRouter } from "expo-router";
import type React from "react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Alert, Platform } from "react-native";
import { useCalendar } from "./calendar";
import { Notifications, nativeNotificationsAvailable } from "~/services/notifications";
import { FIXED_INDULGENCES, getMovableIndulgence } from "~/lib/indulgences";

export type Settings = {
  angelusEnabled: boolean;
  massEnabled: boolean;
  novenaEnabled: boolean;
  officeEnabled: boolean;
  indulgencesEnabled: boolean;
  permissionRequested: boolean;
  permissionSoftRejected: boolean;
};

const NOTIFICATIONS = {
  ANGELUS: {
    title: "🔔 Hora do Angelus",
    times: [
      { hour: 6, minute: 0 },
      { hour: 12, minute: 0 },
      { hour: 18, minute: 0 },
    ],
    color: "#2196f3",
    link: "devocionario/dia/angelus",
  },
  MASS: {
    title: "📅 Missa",
    times: { hour: 7, minute: 0 },
  },
  FIRST_FRIDAY: {
    title: "❤️ Primeira Sexta-feira — Sagrado Coração de Jesus",
    body: "Missa e Comunhão reparadora ao Sagrado Coração de Jesus. Confissão, Comunhão e acto de reparação.",
    link: "devocionario/oracoes/consagracaosagradocoracaojesus",
    color: "#C62828",
  },
  FIRST_SATURDAY: {
    title: "💙 Primeiro Sábado — Imaculado Coração de Maria",
    body: "Rosário, Confissão, Comunhão reparadora e 15 minutos de meditação em desagravo ao Imaculado Coração de Maria.",
    link: "devocionario/rosario",
    color: "#1565C0",
  },
  NOVENA: {
    title: "🙏 Novena",
    times: { hour: 20, minute: 0 },
    link: "devocionario/novenas",
  },
  ST_MICHAEL_LENT: {
    title: "⚔️ Quaresma de São Miguel",
    link: "devocionario/oracoes/coroasaomiguel",
    color: "#5C6BC0",
  },
  OFFICE: {
    title: "⏰ Hora do Ofício",
    times: [
      { name: "Matinas", hour: 0, link: "devocionario/oficio/matinas" },
      { name: "Laudes", hour: 3, link: "devocionario/oficio/laudes" },
      { name: "Prima", hour: 6, link: "devocionario/oficio/prima" },
      { name: "Terça", hour: 9, link: "devocionario/oficio/terca" },
      { name: "Sexta", hour: 12, link: "devocionario/oficio/sexta" },
      { name: "Noa", hour: 15, link: "devocionario/oficio/noa" },
      { name: "Vésperas", hour: 18, link: "devocionario/oficio/vesperas" },
      { name: "Completas", hour: 21, link: "devocionario/oficio/completas" },
    ],
    color: "#4CAF50",
  },
  INDULGENCES: {
    title: "✨ Indulgência Plenária",
    color: "#FFD700",
    dates: FIXED_INDULGENCES,
  },
};

function getColor(color?: string) {
  switch (color) {
    case "w":
      return "#FFFFFFFF";
    case "r":
      return burgundy[500];
    case "g":
      return "#FF00FF00";
    case "v":
      return "#FFEE82EE";
    case "b":
      return "#FF000000";
    default:
      return "#FF808080";
  }
}

const prefKeyMap = {
  ANGELUS: "angelusEnabled",
  MASS: "massEnabled",
  NOVENA: "novenaEnabled",
  OFFICE: "officeEnabled",
  INDULGENCES: "indulgencesEnabled",
} as const;

const SETTINGS_STORAGE_KEY = "app_settings";

const DEFAULT_SETTINGS: Settings = {
  angelusEnabled: true,
  massEnabled: true,
  novenaEnabled: true,
  officeEnabled: false,
  indulgencesEnabled: true,
  permissionRequested: false,
  permissionSoftRejected: false,
};

type SettingsContextType = {
  settings: Settings;
  isLoading: boolean;
  setNotificationPref: (key: keyof typeof prefKeyMap, enabled: boolean) => Promise<void>;
  list: ExpoNotifications.NotificationRequest[];
  permissionStatus: ExpoNotifications.PermissionStatus;
  requestPermission: () => Promise<boolean>;
  openSettings: () => Promise<void>;
  isSoftRejected: boolean;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: React.PropsWithChildren) {
  const router = useRouter();
  const { calendar } = useCalendar();

  // Always use real clock for notification scheduling — never the user-selected display date.
  // If we used context `novenas` here, changing the date picker would retrigger syncNotifications
  // with the wrong 9-day window and corrupt scheduled novena notifications.
  const novenas = useMemo(() => {
    const today = new Date();
    const endDate = addDays(today, 9);
    const result: { name: string; date?: string; link: string; novena?: boolean }[] = [];
    for (const calDay of calendar) {
      const dayDate = parseISO(calDay.date);
      if (isWithinInterval(dayDate, { start: today, end: endDate })) {
        const dayNovenas = calDay.mass
          .filter((m) => m.novena)
          .map((m) => ({ ...m, date: yyyyMMDD(dayDate) }));
        result.push(...dayNovenas);
      }
    }
    return result;
  }, [calendar]);
  const isWeb = Platform.OS === "web";

  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(!isWeb);
  const [list, setList] = useState<ExpoNotifications.NotificationRequest[]>([]);
  const [permissionStatus, setPermissionStatus] = useState<ExpoNotifications.PermissionStatus>(
    Notifications.PermissionStatus.UNDETERMINED,
  );

  const getSettingsFromStorage = useCallback(async (): Promise<Settings> => {
    if (isWeb) return DEFAULT_SETTINGS;
    try {
      const jsonValue = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);
      if (jsonValue != null) {
        const parsedSettings: Settings = JSON.parse(jsonValue);
        return { ...DEFAULT_SETTINGS, ...parsedSettings };
      } else {
        await AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS));
        return DEFAULT_SETTINGS;
      }
    } catch (e: any) {
      console.error("Error retrieving settings from AsyncStorage:", e);
      return DEFAULT_SETTINGS;
    }
  }, [isWeb]);

  const updateSettingsInStorage = useCallback(
    async (newValues: Partial<Settings>): Promise<Settings> => {
      if (isWeb) return { ...settings, ...newValues };
      try {
        const updatedSettings: Settings = { ...settings, ...newValues };
        await AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updatedSettings));
        return updatedSettings;
      } catch (e: any) {
        console.error("Error updating settings in AsyncStorage:", e);
        throw new Error(`Failed to update settings: ${e.message}`, { cause: e });
      }
    },
    [settings, isWeb],
  );

  const updateSetting = useCallback(
    async (newValues: Partial<Settings>) => {
      const updated = await updateSettingsInStorage(newValues);
      setSettings(updated);
    },
    [updateSettingsInStorage],
  );

  const checkPermissionStatus = useCallback(async () => {
    if (isWeb) {
      setPermissionStatus(Notifications.PermissionStatus.DENIED);
      return Notifications.PermissionStatus.DENIED;
    }

    if (!nativeNotificationsAvailable) {
      setPermissionStatus(Notifications.PermissionStatus.DENIED);
      return Notifications.PermissionStatus.DENIED;
    }

    const permissions = (await Notifications.getPermissionsAsync()) as {
      status: ExpoNotifications.PermissionStatus;
    };
    setPermissionStatus(permissions.status);
    return permissions.status;
  }, [isWeb]);

  const openSettings = useCallback(async () => {
    if (isWeb) return;
    try {
      if (Platform.OS === "ios") {
        await Linking.openSettings();
      } else {
        const packageName = Application.applicationId;
        await IntentLauncher.startActivityAsync(
          IntentLauncher.ActivityAction.APPLICATION_DETAILS_SETTINGS,
          { data: `package:${packageName}` },
        );
      }
    } catch (error) {
      console.error("Failed to open settings:", error);
      Alert.alert(
        "Erro",
        "Não foi possível abrir as configurações. Por favor, abra manualmente configurações do sistema.",
      );
    }
  }, [isWeb]);

  const scheduleNotification = useCallback(
    async (notification: ExpoNotifications.NotificationRequestInput, identifier: string) => {
      if (permissionStatus !== "granted") return;

      if (isWeb) {
        return;
      }

      // Mobile notifications
      if (!nativeNotificationsAvailable) return;

      await Notifications.scheduleNotificationAsync({
        ...notification,
        identifier,
      });
    },
    [permissionStatus, isWeb],
  );

  const syncNotifications = useCallback(async () => {
    if (permissionStatus !== "granted" || !settings) {
      if (!isWeb && nativeNotificationsAvailable) {
        await Notifications.cancelAllScheduledNotificationsAsync();
      }
      setList([]);
      return;
    }

    // Clear existing notifications
    if (isWeb) {
      setList([]);
      return;
    }

    if (nativeNotificationsAvailable) {
      await Notifications.cancelAllScheduledNotificationsAsync();
    }

    if (settings.angelusEnabled) {
      for (const time of NOTIFICATIONS.ANGELUS.times) {
        const identifier = `angelus-${time.hour}-${time.minute}`;
        await scheduleNotification(
          {
            content: {
              title: NOTIFICATIONS.ANGELUS.title,
              data: { url: NOTIFICATIONS.ANGELUS.link },
              color: NOTIFICATIONS.ANGELUS.color,
            },
            trigger: {
              type: Notifications.SchedulableTriggerInputTypes.DAILY,
              hour: time.hour,
              minute: time.minute,
            },
          },
          identifier,
        );
      }
    }

    if (settings.massEnabled) {
      const today = new Date();
      const maxDays = 30;
      for (let i = 0; i < maxDays; i++) {
        const date = addDays(today, i);
        const dayMass = calendar.find((d) => d.date === yyyyMMDD(date))?.mass;
        if (dayMass?.length) {
          const identifier = `mass-${yyyyMMDD(date)}`;
          await scheduleNotification(
            {
              content: {
                title: NOTIFICATIONS.MASS.title,
                body: dayMass.map((i) => i.name).join("\n"),
                data: { url: dayMass[0]?.link || "" },
                color: getColor(dayMass[0]?.color),
              },
              trigger: {
                type: Notifications.SchedulableTriggerInputTypes.DATE,
                date: new Date(
                  date.getFullYear(),
                  date.getMonth(),
                  date.getDate(),
                  NOTIFICATIONS.MASS.times.hour,
                  NOTIFICATIONS.MASS.times.minute,
                ),
              },
            },
            identifier,
          );
        }

        const devotionDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          NOTIFICATIONS.MASS.times.hour,
          NOTIFICATIONS.MASS.times.minute,
        );
        if (devotionDate <= today) continue;
        if (isFirstFriday(date)) {
          await scheduleNotification(
            {
              content: {
                title: NOTIFICATIONS.FIRST_FRIDAY.title,
                body: NOTIFICATIONS.FIRST_FRIDAY.body,
                data: { url: NOTIFICATIONS.FIRST_FRIDAY.link },
                color: NOTIFICATIONS.FIRST_FRIDAY.color,
              },
              trigger: {
                type: Notifications.SchedulableTriggerInputTypes.DATE,
                date: devotionDate,
              },
            },
            `first-friday-${yyyyMMDD(date)}`,
          );
        } else if (isFirstSaturday(date)) {
          await scheduleNotification(
            {
              content: {
                title: NOTIFICATIONS.FIRST_SATURDAY.title,
                body: NOTIFICATIONS.FIRST_SATURDAY.body,
                data: { url: NOTIFICATIONS.FIRST_SATURDAY.link },
                color: NOTIFICATIONS.FIRST_SATURDAY.color,
              },
              trigger: {
                type: Notifications.SchedulableTriggerInputTypes.DATE,
                date: devotionDate,
              },
            },
            `first-saturday-${yyyyMMDD(date)}`,
          );
        }
      }
    }

    if (settings.novenaEnabled) {
      const today = new Date();
      const currentYear = today.getFullYear();
      const startDate = new Date(currentYear, 11, 17);
      const endDate = new Date(currentYear, 11, 23, 23);
      const maxDays = 30;
      const maxScheduleDate = addDays(today, maxDays);

      const daysUntilStart = Math.ceil(
        (startDate.getTime() - today.getTime()) / (1000 * 3600 * 24),
      );

      const isWithinSchedulingWindow = daysUntilStart <= maxDays && today <= endDate;

      if (isWithinSchedulingWindow) {
        for (let day = 1; day <= 7; day++) {
          const notificationDate = new Date(currentYear, 11, 16 + day);

          if (notificationDate > today && notificationDate <= maxScheduleDate) {
            const identifier = `our-lady-of-o-${day}`;
            await scheduleNotification(
              {
                content: {
                  title: "Nossa Senhora do Ó",
                  body: `Antífona do dia ${16 + day} de dezembro`,
                  data: { url: "devocionario/antifonasdoo" },
                },
                trigger: {
                  type: Notifications.SchedulableTriggerInputTypes.DATE,
                  date: new Date(
                    notificationDate.getFullYear(),
                    notificationDate.getMonth(),
                    notificationDate.getDate(),
                    NOTIFICATIONS.NOVENA.times.hour,
                    NOTIFICATIONS.NOVENA.times.minute,
                  ),
                },
              },
              identifier,
            );
          }
        }
      }
    }

    if (settings.novenaEnabled && novenas) {
      const today = new Date();
      const maxDays = 30;
      const maxScheduleDate = addDays(today, maxDays);
      for (const novena of novenas) {
        if (!novena.date) continue;
        const novenaDate = subDays(new Date(novena.date), 1);
        if (novenaDate > today && novenaDate <= maxScheduleDate) {
          const dayDifference = Math.ceil(
            (novenaDate.getTime() - today.getTime()) / (1000 * 3600 * 24),
          );
          const currentNovenaDay = Math.max(1, 9 - dayDifference);
          for (let i = currentNovenaDay; i <= 9; i++) {
            const scheduleDate = addDays(today, i - currentNovenaDay);
            if (scheduleDate > maxScheduleDate) {
              break;
            }
            const identifier = `novena-${novena.name}-${i}`;
            await scheduleNotification(
              {
                content: {
                  title: NOTIFICATIONS.NOVENA.title,
                  body: `Dia ${i} da novena de ${novena.name}`,
                  data: { url: "devocionario/novenas" },
                },
                trigger: {
                  type: Notifications.SchedulableTriggerInputTypes.DATE,
                  date: new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate() + (i - currentNovenaDay),
                    NOTIFICATIONS.NOVENA.times.hour,
                    NOTIFICATIONS.NOVENA.times.minute,
                  ),
                },
              },
              identifier,
            );
          }
        }
      }
    }

    if (settings.novenaEnabled) {
      const today = new Date();
      const maxDays = 30;
      for (let i = 0; i < maxDays; i++) {
        const date = addDays(today, i);
        const lentDay = stMichaelLentDay(date);
        if (lentDay === null) continue;
        // 20–28 September is already covered by the novena notifications
        // for the Dedication of St. Michael (same 20:00 slot) — skip to
        // avoid a duplicate reminder for the same devotion.
        if (date.getMonth() === 8 && date.getDate() >= 20 && date.getDate() <= 28) {
          continue;
        }
        const devotionDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          NOTIFICATIONS.NOVENA.times.hour,
          NOTIFICATIONS.NOVENA.times.minute,
        );
        if (devotionDate <= today) continue;
        await scheduleNotification(
          {
            content: {
              title: NOTIFICATIONS.ST_MICHAEL_LENT.title,
              body: "Coroa de São Miguel e penitência diária",
              data: { url: NOTIFICATIONS.ST_MICHAEL_LENT.link },
              color: NOTIFICATIONS.ST_MICHAEL_LENT.color,
            },
            trigger: {
              type: Notifications.SchedulableTriggerInputTypes.DATE,
              date: devotionDate,
            },
          },
          `st-michael-lent-${yyyyMMDD(date)}`,
        );
      }
    }

    if (settings.officeEnabled) {
      for (const office of NOTIFICATIONS.OFFICE.times) {
        const identifier = `office-${office.name}`;
        await scheduleNotification(
          {
            content: {
              title: `${NOTIFICATIONS.OFFICE.title} ${office.name}`,
              body: "Pequeno Ofício de Nossa Senhora",
              data: { url: office.link },
              color: NOTIFICATIONS.OFFICE.color,
            },
            trigger: {
              type: Notifications.SchedulableTriggerInputTypes.DAILY,
              hour: office.hour,
              minute: 0,
            },
          },
          identifier,
        );
      }
    }

    if (settings.indulgencesEnabled) {
      const today = new Date();
      const currentYear = today.getFullYear();
      const maxDays = 30;
      const maxScheduleDate = addDays(today, maxDays);

      for (const indulgence of NOTIFICATIONS.INDULGENCES.dates) {
        const notificationDate = new Date(
          currentYear,
          indulgence.month,
          indulgence.day,
          indulgence.hour,
          indulgence.minute,
        );
        if (notificationDate > today && notificationDate <= maxScheduleDate) {
          const identifier = `indulgence-${indulgence.month}-${indulgence.day}`;
          await scheduleNotification(
            {
              content: {
                title: NOTIFICATIONS.INDULGENCES.title,
                body: indulgence.body,
                data: { url: indulgence.link },
                color: NOTIFICATIONS.INDULGENCES.color,
              },
              trigger: {
                type: Notifications.SchedulableTriggerInputTypes.DATE,
                date: notificationDate,
              },
            },
            identifier,
          );
        }
      }

      for (let i = 0; i < maxDays; i++) {
        const checkDate = addDays(today, i);
        const dayData = calendar.find((d) => d.date === yyyyMMDD(checkDate));
        const movable = getMovableIndulgence(dayData);

        if (movable) {
          await scheduleNotification(
            {
              content: {
                title: `✨ Indulgência: ${movable.prayer}`,
                body: `${movable.body} (Condições habituais)`,
                color: NOTIFICATIONS.INDULGENCES.color,
                data: { url: movable.link },
              },
              trigger: {
                type: Notifications.SchedulableTriggerInputTypes.DATE,
                date: new Date(
                  checkDate.getFullYear(),
                  checkDate.getMonth(),
                  checkDate.getDate(),
                  8,
                  0,
                ),
              },
            },
            `ind-movable-${yyyyMMDD(checkDate)}`,
          );
        }
      }
    }

    if (!nativeNotificationsAvailable) {
      setList([]);
      return;
    }

    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    setList(scheduled);
  }, [isWeb, permissionStatus, settings, calendar, novenas, scheduleNotification]);

  const requestPermission = useCallback(async () => {
    if (!settings) return false;

    if (isWeb) {
      setPermissionStatus(Notifications.PermissionStatus.DENIED);
      return false;
    }

    if (!nativeNotificationsAvailable) {
      Alert.alert(
        "Notificações indisponíveis",
        "Esta compilação local não inclui o módulo nativo de notificações. Use um development build atualizado.",
      );
      return false;
    }

    const currentPermissions = (await Notifications.getPermissionsAsync()) as {
      status: ExpoNotifications.PermissionStatus;
    };
    const currentStatus = currentPermissions.status;
    if (currentStatus === "granted") {
      setPermissionStatus(Notifications.PermissionStatus.GRANTED);
      await updateSetting({ permissionSoftRejected: false });
      return true;
    }

    if (
      currentStatus === Notifications.PermissionStatus.DENIED &&
      settings.permissionRequested === true
    ) {
      Alert.alert(
        "Notificações desativadas",
        "Para receber lembretes de oração, por favor active as notificações nas configurações do sistema.",
        [
          { text: "Mais tarde", style: "cancel" },
          { text: "Abrir Configurações", onPress: openSettings },
        ],
      );
      return false;
    }

    const shouldProceed = await new Promise<boolean>((resolve) => {
      Alert.alert(
        "Notificações do Tesouro dos Fiéis",
        "Pode configurar as notificações para o Angelus, a Missa do Dia, as Novenas ou o Pequeno Oficio",
        [
          { text: "Agora não", style: "cancel", onPress: () => resolve(false) },
          { text: "Permitir", onPress: () => resolve(true) },
        ],
      );
    });

    if (!shouldProceed) {
      await updateSetting({
        permissionSoftRejected: true,
      });
      return false;
    }

    const permissions = (await Notifications.requestPermissionsAsync()) as {
      status: ExpoNotifications.PermissionStatus;
    };
    setPermissionStatus(permissions.status);
    await updateSetting({
      permissionRequested: true,
      permissionSoftRejected: false,
    });

    if (permissions.status === "granted") {
      await syncNotifications();
    }

    return permissions.status === "granted";
  }, [isWeb, openSettings, settings, updateSetting, syncNotifications]);

  useEffect(() => {
    const init = async () => {
      try {
        const loadedSettings = await getSettingsFromStorage();
        setSettings(loadedSettings);
        await checkPermissionStatus();
      } catch (error) {
        console.error("Failed to initialize settings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, [getSettingsFromStorage, checkPermissionStatus]);

  useEffect(() => {
    if (isLoading) return;
    void Promise.resolve().then(syncNotifications);
  }, [syncNotifications, isLoading]);

  useEffect(() => {
    if (isWeb || !nativeNotificationsAvailable) return;

    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      const url = response.notification.request.content.data?.url;
      if (url) {
        router.navigate(url as string);
      }
    });
    return () => subscription.remove();
  }, [isWeb, router]);

  const setNotificationPref = useCallback(
    async (key: keyof typeof prefKeyMap, enabled: boolean) => {
      if (enabled && permissionStatus !== "granted") {
        const granted = await requestPermission();
        if (!granted) return;
      }

      const dbKey = prefKeyMap[key];
      await updateSetting({ [dbKey]: enabled });
    },
    [permissionStatus, requestPermission, updateSetting],
  );

  const value = useMemo(
    () => ({
      settings,
      isLoading,
      setNotificationPref,
      list,
      permissionStatus,
      requestPermission,
      openSettings,
      isSoftRejected: settings.permissionSoftRejected === true,
    }),
    [
      settings,
      isLoading,
      setNotificationPref,
      list,
      permissionStatus,
      requestPermission,
      openSettings,
    ],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
