import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { useRoute } from "@react-navigation/native";

import pets from "../data/pet.json";

export default function TutorPetsScreen({ navigation }: any) {
  const route = useRoute<any>();
  const { tutor } = route.params as any;

  const tutorPets = pets.filter((pets) => pets.idTutor === tutor.id);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>{tutor.name}</Text>

          <Text style={styles.subtitle}>Pets vinculados ao tutor</Text>
        </View>

        {/* LISTA DE PETS */}
        <FlatList
          data={tutorPets}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate("MedicalHistoryScreen", {
                  pet: item,
                })
              }
            >
              {/* Ícone */}
              <View style={styles.avatar}>
                <Text style={{ fontSize: 28 }}>
                  {item.species === "Cachorro" ? "🐶" : "🐱"}
                </Text>
              </View>

              {/* Infos */}
              <View style={styles.infoContainer}>
                <Text style={styles.petName}>{item.name}</Text>

                <Text style={styles.petInfo}>{item.breed}</Text>

                <Text style={styles.petInfo}>anos • {item.weight}</Text>
              </View>

              <Ionicons name="chevron-forward" size={22} color="#94A3B8" />
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 20,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1E293B",
  },

  subtitle: {
    color: "#64748B",
    marginTop: 4,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,

    elevation: 2,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#eb9a22",

    justifyContent: "center",
    alignItems: "center",
  },

  infoContainer: {
    flex: 1,
    marginLeft: 15,
  },

  petName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1E293B",
  },

  petInfo: {
    color: "#64748B",
    marginTop: 2,
    fontSize: 13,
  },
});
