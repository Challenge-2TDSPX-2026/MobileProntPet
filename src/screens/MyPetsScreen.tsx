import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function MyPetsScreen({ navigation }: any) {
  const [pets, setPets] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      async function loadPets() {
        const storedPets = await AsyncStorage.getItem("pets");

        if (storedPets) {
          setPets(JSON.parse(storedPets));
        }
      }

      loadPets();
    }, []),
  );

  async function handleRemovePet(id:number) {
    const updatedPets = pets.filter(
      (pet) => pet.id !== id
    );

    setPets(updatedPets);

    await AsyncStorage.setItem(
      "pets", 
      JSON.stringify(updatedPets)
  );
  }
  

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meus Pets</Text>

        <Text style={styles.headerSubtitle}>Gerencie os pets cadastrados</Text>
      </View>

      {/* LISTA */}
      <FlatList
        data={pets}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        /*
          CASO NÃO TENHA PETS
        */
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="paw-outline" size={70} color="#D1D5DB" />

            <Text style={styles.emptyTitle}>Nenhum pet cadastrado</Text>

            <Text style={styles.emptySubtitle}>Adicione seu primeiro pet</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.petCard}
            onPress={() =>
              navigation.navigate("TutorHomeScreen", {
                pet: item,
              })
            }
          >
            {/* FOTO */}
            <View style={styles.petImage}>
              <Ionicons name="paw" size={35} color="#eb9a22" />
            </View>

            {/* INFOS */}
            <View style={styles.petInfo}>
              <Text style={styles.petName}>{item.name}</Text>

              <Text style={styles.petDetails}>{item.breed}</Text>

              <Text style={styles.petDetails}>{item.age} anos</Text>
            </View>

            {/* REMOVER */}
            <TouchableOpacity onPress={() => handleRemovePet(item.id)}>
              <Ionicons name="trash-outline" size={24} color="#d62828" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

      {/* BOTÃO ADICIONAR */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("PetFormScreen")}
      >
        <Ionicons name="add" size={26} color="white" />

        <Text style={styles.addButtonText}>Novo Pet</Text>
      </TouchableOpacity>
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
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
  },

  headerSubtitle: {
    marginTop: 5,
    fontSize: 15,
    color: "#374151",
  },

  listContent: {
    padding: 20,
    paddingBottom: 120,
  },

  emptyContainer: {
    marginTop: 80,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: "bold",
    color: "#374151",
  },

  emptySubtitle: {
    marginTop: 8,
    fontSize: 15,
    color: "#6B7280",
  },

  petCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,

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
    width: 70,
    height: 70,
    borderRadius: 35,

    backgroundColor: "#fff4e6",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 15,
  },

  petInfo: {
    flex: 1,
  },

  petName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 5,
  },

  petDetails: {
    fontSize: 15,
    color: "#6B7280",
    marginBottom: 2,
  },

  addButton: {
    position: "absolute",

    bottom: 25,
    right: 25,

    backgroundColor: "#eb9a22",

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 20,
    paddingVertical: 14,

    borderRadius: 30,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.2,
    shadowRadius: 5,

    elevation: 5,
  },

  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
