import React from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { useDeletePet, useMyPets } from "../hooks/usePets";

import { useQueryClient } from "@tanstack/react-query";
import { logout } from "../services/authService";

export default function MyPetsScreen({ navigation }: any) {
  const queryClient = useQueryClient();

  async function handleLogout() {
    await logout();
    queryClient.clear();

    navigation.replace("TutorForm");
  }
  const { data, isLoading, isError, refetch } = useMyPets();

  console.log("MEUS PETS:", data);

  const deletePetMutation = useDeletePet();

  const pets = data?.content ?? [];

  function handleRemovePet(id: number) {
    deletePetMutation.mutate(id);
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando seus pets...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>
            Não foi possível carregar os pets.
          </Text>

          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => refetch()}
          >
            <Text style={styles.retryButtonText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Meus Pets</Text>

            <Text style={styles.headerSubtitle}>
              Gerencie os pets cadastrados
            </Text>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={22} color="#1F2937" />

            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={pets}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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
                petId: item.id,
              })
            }
          >
            <View style={styles.petImage}>
              <Ionicons name="paw" size={35} color="#eb9a22" />
            </View>

            <View style={styles.petInfo}>
              <Text style={styles.petName}>{item.name}</Text>

              <Text style={styles.petDetails}>{item.breed}</Text>

              <Text style={styles.petDetails}>{item.species}</Text>

              <Text style={styles.petDetails}>{item.weight} kg</Text>
            </View>

            <TouchableOpacity
              onPress={() => handleRemovePet(item.id)}
              disabled={deletePetMutation.isPending}
            >
              <Ionicons name="trash-outline" size={24} color="#d62828" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

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

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    fontSize: 17,
    color: "#6B7280",
  },

  errorText: {
    fontSize: 17,
    color: "#d62828",
    textAlign: "center",
  },

  retryButton: {
    marginTop: 15,
    backgroundColor: "#eb9a22",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },

  retryButtonText: {
    color: "white",
    fontWeight: "bold",
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
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },

  logoutText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "bold",
    color: "#1F2937",
  },
});
