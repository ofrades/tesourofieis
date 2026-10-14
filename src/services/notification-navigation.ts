import type { NotificationResponse } from "expo-notifications";
import { Option, Schema } from "~/lib/effect";

export interface NotificationNavigationSource {
  DEFAULT_ACTION_IDENTIFIER: string;
  getLastNotificationResponse(): NotificationResponse | null;
  clearLastNotificationResponse(): void;
  addNotificationResponseReceivedListener(listener: (response: NotificationResponse) => void): {
    remove(): void;
  };
}

/** Start only after the root navigator is mounted. */
export function startNotificationNavigation(
  notifications: NotificationNavigationSource,
  navigate: (path: string) => void,
) {
  const handled = new Set<string>();
  const redirect = (response: NotificationResponse) => {
    if (response.actionIdentifier !== notifications.DEFAULT_ACTION_IDENTIFIER) return;
    const decoded = Schema.decodeUnknownOption(Schema.String)(
      response.notification.request.content.data?.url,
    );
    if (Option.isNone(decoded)) return;
    const url = decoded.value.trim();
    if (!url) return;

    // Repeating reminders reuse their request ID, but each delivery has its own date.
    const key = JSON.stringify([
      response.notification.request.identifier,
      response.notification.date,
      response.actionIdentifier,
    ]);
    if (!handled.has(key)) {
      navigate(url.startsWith("/") ? url : `/${url}`);
      handled.add(key);
    }
    notifications.clearLastNotificationResponse();
  };

  // Subscribe first so a tap arriving during setup cannot be missed.
  const subscription = notifications.addNotificationResponseReceivedListener(redirect);
  const response = notifications.getLastNotificationResponse();
  if (response) redirect(response);
  return () => subscription.remove();
}
