import React from "react";
import { View, Text, SectionList, StyleSheet, FlatList } from "react-native";
import appointment from "../data/appointment.json";
import AppointmentRow from "../components/AppointmentRow";
import { SafeAreaView } from "react-native-safe-area-context";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function MedicalHistoryScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.appointmentSection}>
           <Text style={styles.sectionTitle}>Próximas Consultas</Text>
          <FlatList
            data={appointment}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <AppointmentRow appointment={item} />}
          />
          <Text style={styles.sectionTitle}>Histórico Recente</Text>
          <FlatList
            data={appointment}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <AppointmentRow appointment={item} />}
          />
          
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA", padding: 10 },
  appointmentSection:{flex: 1},
  sectionTitle:{ fontSize: 16, fontWeight: '600', marginTop: 15, marginBottom: 10, color: '#636E72' },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2D3436",
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
