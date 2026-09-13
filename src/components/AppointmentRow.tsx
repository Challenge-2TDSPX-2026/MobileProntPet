import React from "react";

import { Text, StyleSheet, TouchableOpacity } from "react-native";

import { AppointmentResponse } from "../services/appointmentService";

interface AppointmentRowProps {
  appointment: AppointmentResponse;
  onPress: () => void;
}

export default function AppointmentRow({
  appointment,
  onPress,
}: AppointmentRowProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.cardTitle}>
        {"Consulta veterinária"}
      </Text>

      <Text style={styles.cardSubtitle}>
        {appointment.appointmentDate} • {appointment.pet.name}
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
