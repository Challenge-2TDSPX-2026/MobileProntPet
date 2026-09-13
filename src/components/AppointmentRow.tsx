import React from "react";

import { Text, StyleSheet, TouchableOpacity } from "react-native";

import { AppointmentResponse } from "../services/appointmentService";

interface AppointmentRowProps {
  appointment: AppointmentResponse;
  onPress: () => void;
}

function formatAppointmentDate(dateString: string) {
  const date = new Date(dateString);

  const dateFormatted = date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const timeFormatted = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${dateFormatted} às ${timeFormatted}`;
}

export default function AppointmentRow({
  appointment,
  onPress,
}: AppointmentRowProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.cardTitle}>
        Consulta veterinária
      </Text>

      <Text style={styles.cardSubtitle}>
        {formatAppointmentDate(appointment.appointmentDate)} •{" "}
        {appointment.pet.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },

  cardSubtitle: {
    fontSize: 14,
    color: "#B2BEC3",
  },
});