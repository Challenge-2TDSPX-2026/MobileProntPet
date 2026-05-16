import React from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";


export type Vaccine = {
    idVaccine: number;
    nameVaccine: string;
    status: string
}

export default function VaccineRow({vaccine} : {vaccine: Vaccine}) {
  return (
    <View key={vaccine.idVaccine} style={styles.vaccineCard}>
      <View style={styles.vaccineTop}>
        <View style={styles.vaccineNameArea}>
          <Ionicons name="medkit" size={22} color="#d62828" />

          <Text style={styles.vaccineName}>{vaccine.nameVaccine}</Text>
        </View>

        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{vaccine.status}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({



  vaccineCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,

    borderLeftWidth: 6,
    borderLeftColor: "#d62828",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 4,

    elevation: 2,
  },

  vaccineTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  vaccineNameArea: {
    flexDirection: "row",
    alignItems: "center",
  },

  vaccineName: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#222",
  },

  statusBadge: {
    backgroundColor: "#ffe5e5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusText: {
    color: "#d62828",
    fontWeight: "bold",
    fontSize: 12,
  },

  vaccineDate: {
    fontSize: 15,
    fontWeight: "600",
    color: "#444",
    marginBottom: 8,
  },

  vaccineDescription: {
    fontSize: 14,
    color: "#777",
    lineHeight: 20,
  },
});
