import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function requestNotificationPermission() {
  const { status: currentStatus } = await Notifications.getPermissionsAsync();

  let finalStatus = currentStatus;

  if (currentStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    return false;
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("consultas", {
      name: "Lembretes de consultas",
      importance: Notifications.AndroidImportance.HIGH,
      sound: "default",
    });
  }
  return true;
}

export async function scheduleAppointmentReminder(
  appointmentId: number,
  petId: number,
  appointment: Date,
  petName: string,
) {
  const permitted = await requestNotificationPermission();

  if (!permitted) {
    throw new Error("Permissão para notificações não concedida");
  }

  // O lembrete será exibido uma hora antes da consulta.
  const reminderDate = new Date(appointment.getTime() - 60 * 60 * 1000);

  if (reminderDate.getTime() <= Date.now()) {
    throw new Error(
      "A consulta precisa acontecer pelo menos uma hora no futuro",
    );
  }

  return Notifications.scheduleNotificationAsync({
    content: {
      title: "Lembrete de consulta",
      body: `A consulta de ${petName} acontecerá daqui a uma hora.`,
      sound: "default",
      data: {
        appointmentId,
        petId
      },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: reminderDate,
      ...(Platform.OS === "android" && {
        channelId: "consultas",
      }),
    },
  });
}

export async function cancelAppointmentReminder(appointmentId: number) {
  const scheduledNotifications =
    await Notifications.getAllScheduledNotificationsAsync();

  const reminders = scheduledNotifications.filter(
    (notification) =>
      notification.content.data?.appointmentId === appointmentId,
  );

  await Promise.all(
    reminders.map((notification) =>
      Notifications.cancelScheduledNotificationAsync(notification.identifier),
    ),
  );
}
