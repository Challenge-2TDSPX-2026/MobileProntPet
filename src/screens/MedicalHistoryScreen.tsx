import React, { useCallback } from "react";

import {
  Text,
  StyleSheet,
  SectionList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import { useFocusEffect } from "@react-navigation/native";
import AppointmentRow from "../components/AppointmentRow";

import {
  getAppointmentsByPet,
  deleteAppointment,
} from "../services/appointmentService";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import BackButton from "../components/BackButton";

export default function MedicalHistoryScreen({ navigation, route }: any) {
  const { petId } = route.params;

  const queryClient = useQueryClient();

  const {
    data: appointments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["appointments", petId],
    queryFn: () => getAppointmentsByPet(petId),
    enabled: !!petId,
  });

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries({
        queryKey: ["appointments", petId],
      });
    }, [queryClient, petId]),
  );

  const deleteAppointmentMutation = useMutation({
    mutationFn: (appointmentId: number) => deleteAppointment(appointmentId),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["appointments", petId],
      });

      Alert.alert(
        "Consulta cancelada",
        "A consulta foi cancelada com sucesso.",
      );
    },

    onError: (error: any) => {
      if (error?.status === 409) {
        Alert.alert(
          "Não é possível cancelar",
          "Essa consulta já aconteceu e não pode ser cancelada.",
        );
        return;
      }

      if (error?.status === 403) {
        Alert.alert("Acesso negado", "Você não pode cancelar essa consulta.");
        return;
      }

      Alert.alert(
        "Erro",
        error?.message || "Não foi possível cancelar a consulta.",
      );
    },
  });

  const handleDeleteAppointment = (appointmentId: number) => {
    Alert.alert(
      "Cancelar consulta",
      "Tem certeza que deseja cancelar esta consulta?",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim, cancelar",
          style: "destructive",
          onPress: () => {
            deleteAppointmentMutation.mutate(appointmentId);
          },
        },
      ],
    );
  };

  const now = new Date();

  const upcomingAppointments = appointments.filter(
    (appointment) => new Date(appointment.appointmentDate) >= now,
  );

  const historyAppointments = appointments.filter(
    (appointment) => new Date(appointment.appointmentDate) < now,
  );

  const sections = [
    {
      title: "Próximas Consultas",
      data: upcomingAppointments,
    },
    {
      title: "Histórico de consultas",
      data: historyAppointments,
    },
  ];

  if (isLoading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <ActivityIndicator size="large" />

          <Text style={styles.loadingText}>Carregando consultas...</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  if (isError) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Text style={styles.errorText}>Erro ao carregar as consultas.</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <BackButton goBackTo="TutorHomeScreen" params={{ petId: petId }} />

        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id.toString()}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionTitle}>{section.title}</Text>
          )}
          renderItem={({ item, section }) => (
            <>
              <AppointmentRow
                appointment={item}
                onPress={() =>
                  navigation.navigate("AppointmentDetailsScreen", {
                    appointment: item,
                    petId
                  })
                }
              />

              {section.title === "Próximas Consultas" && (
                <TouchableOpacity
                  style={styles.cancelButton}
                  disabled={deleteAppointmentMutation.isPending}
                  onPress={() => handleDeleteAppointment(item.id)}
                >
                  <Text style={styles.cancelButtonText}>
                    {deleteAppointmentMutation.isPending
                      ? "Cancelando..."
                      : "Cancelar consulta"}
                  </Text>
                </TouchableOpacity>
              )}
            </>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhuma consulta encontrada.</Text>
          }
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 10,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 10,
    color: "#eb9a22",
  },

  loadingText: {
    textAlign: "center",
    marginTop: 10,
  },

  errorText: {
    textAlign: "center",
    marginTop: 20,
    color: "red",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 30,
    color: "#777",
  },

  cancelButton: {
    marginTop: 5,
    marginBottom: 15,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#FFE5E5",
  },

  cancelButtonText: {
    color: "#D32F2F",
    fontSize: 14,
    fontWeight: "600",
  },
});
