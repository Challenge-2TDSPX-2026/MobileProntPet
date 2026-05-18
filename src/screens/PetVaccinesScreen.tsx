import React from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { useRoute } from "@react-navigation/native";

import vaccines from "../data/vaccines.json";
import VaccineRow from "../components/VaccineRow";

export default function PetVaccinesScreen({ navigation }: any) {
  const route = useRoute<any>();

  const pet = route.params?.pet;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.petCard}>
          <View style={styles.petImage}>
            <Ionicons name="paw" size={40} color="#eb9a22" />
          </View>

          <View style={styles.petInfo}>
            <Text style={styles.petName}>{pet.name}</Text>

            <Text style={styles.petInfo}>{pet.breed} • {pet.age} anos</Text>
          </View>
        </View>

        <FlatList
          data={vaccines}
          keyExtractor={(item) => item.idVaccine.toString()}
          renderItem={({ item }) => <VaccineRow vaccine={item} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  content: {
    padding: 20,
  },

  petCard: {
    backgroundColor: "#eb9a22",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 3,
  },

  petImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff4e6",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 18,
  },

  petInfo: {
    flex: 1,
  },

  petName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 5,
  },

  petDetails: {
    fontSize: 15,
    color: "#1F2937",
    marginBottom: 4,
  },

  petId: {
    marginTop: 6,
    fontSize: 13,
    color: "#999",
    fontWeight: "600",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#222",
  },

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
