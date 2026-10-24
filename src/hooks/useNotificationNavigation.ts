
import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import {
  createNavigationContainerRef,
} from "@react-navigation/native";

type RootStackParamList = {
  MedicalHistoryScreen: {
    petId: number;
    appointmentId: number;
  };
  AppointmentDetailsScreen: {
    petId: number;
    appointment: any;
  };
};

export const navigationRef =
  createNavigationContainerRef<RootStackParamList>();

export function useNotificationNavigation() {
  useEffect(() => {
    const handleNotification = (
      response: Notifications.NotificationResponse
    ) => {
      const data = response.notification.request.content
        .data as {
          appointmentId?: number | string;
          petId?: number | string;
        };

      if (data.appointmentId == null || data.petId == null) {
        return;
      }

      if (navigationRef.isReady()) {
        navigationRef.navigate("MedicalHistoryScreen", {
          petId: Number(data.petId),
          appointmentId: Number(data.appointmentId),
        });
      }
    };

    const subscription =
      Notifications.addNotificationResponseReceivedListener(
        handleNotification
      );

    Notifications.getLastNotificationResponseAsync().then(
      (response) => {
        if (response) {
          handleNotification(response);
        }
      }
    );

    return () => subscription.remove();
  }, []);
}
