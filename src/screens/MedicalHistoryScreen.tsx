import React from "react";
import { View, Text, StyleSheet, FlatList, SectionList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SafeAreaProvider } from "react-native-safe-area-context";

import appointment from "../data/appointment.json";
import AppointmentRow from "../components/AppointmentRow";
import historyAppointments from "../data/historyAppoinments.json";

export default function MedicalHistoryScreen({navigation}: any) {
  const sections = [
    {
      title: "Proximas Consultas",
      data: appointment,
    },
    {
      title: "Historico de consultas",
      data: historyAppointments
    }
  ];
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id.toString()}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionTitle}>{section.title}</Text>
          )}
          renderItem={({ item }) => (
            <AppointmentRow onPress={() => navigation.navigate("AppointmentDetailsScreen", {appointment:item})} appointment={item}/>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA", padding: 10 },
  appointmentSection: { flex: 1 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 10,
    color:"#eb9a22",
  },
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

{
  /* <View style={styles.appointmentSection}>
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
          
        </View> */
}
