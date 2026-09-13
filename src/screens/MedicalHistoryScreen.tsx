import React from "react";

import { Text, StyleSheet, SectionList, ActivityIndicator } from "react-native";

import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import AppointmentRow from "../components/AppointmentRow";
import { getAppointmentsByPet } from "../services/appointmentService";
import { useQuery } from "@tanstack/react-query";
import BackButton from "../components/BackButton";

export default function MedicalHistoryScreen({ navigation, route }: any) {
  const { petId } = route.params;
  const {
    data: appointments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["appointments", petId],
    queryFn: () => getAppointmentsByPet(petId),
    enabled: !!petId,
  });

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
          renderItem={({ item }) => (
            <AppointmentRow
              appointment={item}
              onPress={() =>
                navigation.navigate("AppointmentDetailsScreen", {
                  appointment: item,
                })
              }
            />
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
});
