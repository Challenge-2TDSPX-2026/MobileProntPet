import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";



export type Appointment = { 
    id: number,
    idMedicalRecord:number,
    idVeterinarian: number,
    consultationType:string,
    consultationDate: string,
    symptoms: string,
    diagnosis: string,
    observations: string, 
    attachment: null,
}

export default function AppointmentRow({appointment, onPress} : {appointment: Appointment, onPress : () => void}) {
  return (
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <Text style={styles.cardTitle}>{appointment.consultationType}</Text>
        <Text style={styles.cardSubtitle}>
          {appointment.consultationDate} • {appointment.consultationType}
        </Text>
      </TouchableOpacity>

    
  );
}

const styles = StyleSheet.create({
  container: {
  marginBottom: 10,
},
 
  sectionHeader: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 10,
    color: "#636E72",
  },
  card: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: "bold" },
  cardSubtitle: { fontSize: 14, color: "#B2BEC3" },
});
