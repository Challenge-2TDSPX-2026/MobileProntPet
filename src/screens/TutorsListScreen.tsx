import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";




export default function TutorListScreen({ navigation} : any) {
  const [search, setSearch] = useState("");

  
  return (
    <SafeAreaView style={styles.container}>
      
      
      <View style={styles.header}>
        <Text style={styles.title}>Tutores & Pets</Text>
        <Text style={styles.subtitle}>
          Acompanhe os tutores cadastrados
        </Text>
      </View>

   
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#94A3B8" />

        <TextInput
          placeholder="Buscar tutor..."
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

    </SafeAreaView>
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
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E293B",
  },

  subtitle: {
    color: "#64748B",
    marginTop: 4,
  },

  searchContainer: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 14,
    marginBottom: 20,
    height: 55,
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
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

  name: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1E293B",
  },

  infoText: {
    color: "#64748B",
    marginTop: 2,
    fontSize: 13,
  },
});