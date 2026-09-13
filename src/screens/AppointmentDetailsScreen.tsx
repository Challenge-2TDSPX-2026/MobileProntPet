import React from "react";

import { View, Text, StyleSheet, ScrollView } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useRoute } from "@react-navigation/native";
import BackButton from "../components/BackButton";

export default function AppointmentDetailsScreen() {

  const route = useRoute<any>();
  const appointment = route.params?.appointment;
  const petId = route.params?.petId;

  const formatDate = (dateString: string) => {
    if (!dateString) return "Data não informada";

    const date = new Date(dateString);

    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getContent = (value: string | null | undefined, message: string) => {
    if (!value || !value.trim()) {
      return message;
    }

    return value;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackButton goBackTo="MedicalHistoryScreen" params={{petId}} />
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Detalhes da Consulta</Text>

          <Text style={styles.title}>Consulta veterinária</Text>

          <Text style={styles.date}>
            {formatDate(appointment.appointmentDate)}
          </Text>
        </View>

        {/* SINTOMAS */}
        <View style={styles.card}>
          <Text style={styles.label}>Sintomas</Text>

          <Text style={styles.content}>
            {getContent(appointment.symptoms, "Nenhum sintoma informado.")}
          </Text>
        </View>

        {/* DIAGNÓSTICO */}
        <View style={styles.card}>
          <Text style={styles.label}>Diagnóstico</Text>

          <Text
            style={[
              styles.content,
              !appointment.diagnosis && styles.pendingContent,
            ]}
          >
            {getContent(
              appointment.diagnosis,
              "Aguarda o diagnóstico do Doutor.",
            )}
          </Text>
        </View>

        {/* OBSERVAÇÕES */}
        <View style={styles.card}>
          <Text style={styles.label}>Observações</Text>

          <Text
            style={[
              styles.content,
              !appointment.observations && styles.pendingContent,
            ]}
          >
            {getContent(
              appointment.observations,
              "Aguarda as observações do Doutor.",
            )}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  header: {
    backgroundColor: "#eb9a22",
    padding: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  headerTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1F2937",
  },

  date: {
    marginTop: 5,
    fontSize: 15,
    color: "#374151",
  },

  card: {
    backgroundColor: "white",
    marginHorizontal: 15,
    marginTop: 15,
    padding: 18,
    borderRadius: 18,
    elevation: 3,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#374151",
  },

  content: {
    fontSize: 15,
    color: "#6B7280",
    lineHeight: 22,
  },

  pendingContent: {
    color: "#9CA3AF",
    fontStyle: "italic",
  },
});
