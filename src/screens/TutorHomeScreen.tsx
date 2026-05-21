import React from "react";
import {View,Text,StyleSheet,ScrollView, TouchableOpacity} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useRoute } from "@react-navigation/native";

export default function TutorHomeScreen({ navigation }: any) {

  const route = useRoute();
  const {pet} = route.params as any;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={true}>
          {/* Header com Perfil */}
          <View style={styles.header}>
            <View style={styles.profileRow}>
              <View style={styles.avatarContainer}>
                <Text style={{ fontSize: 40 }}>🐶</Text>
              </View>
              <View style={styles.profileText}>
                <Text style={styles.welcomeTitle}>Bem Vindo</Text>
                <Text style={styles.petName}>{pet.name}</Text>
                <Text style={styles.petInfo}>{pet.breed} • {pet.age} anos</Text>
              </View>
            </View>
          </View>

          <View style={styles.content}>
            {/* Atenção Necessária */}
            <Text style={styles.sectionTitle}>Atenção Necessária</Text>
            <TouchableOpacity style={[styles.card, styles.alertCard]} onPress={()=> navigation.navigate("PetVaccinesScreen", {pet: pet})}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name="needle"
                  size={30}
                  color="#8e9aaf"
                />
              </View>
              <View style={styles.cardTextContent}>
                <Text style={styles.cardTitle}>Vacina V10 Atrasada</Text>
                <Text style={styles.cardSubtitle}>
                  Era esperada para 01/05/2026
                </Text>
              </View>
            </TouchableOpacity>

            {/* Tratamento em Curso */}
            <Text style={styles.sectionTitle}>Tratamento em Curso</Text>
            <View style={[styles.card, styles.treatmentCard]}>
              <View style={styles.checkboxContainer}>
                <Ionicons name="checkbox" size={24} color="#0056b3" />
              </View>
              <View style={styles.cardTextContent}>
                <Text style={styles.cardTitle}>Antibiótico Oral</Text>
                <Text style={styles.cardSubtitle}>
                  Dose das 14:00 • 8/12 horas
                </Text>
              </View>
            </View>

            {/* Indicadores de Saúde */}
            <Text style={styles.sectionTitle}>Indicadores de Saúde</Text>
            <View style={styles.indicatorsRow}>
              <View style={styles.indicatorBox}>
                <Text style={styles.indicatorLabel}>Peso Atual</Text>
                <Text style={styles.indicatorValue}>{pet.weight}</Text>
                <Text style={styles.indicatorTrend}>↑ 0.5kg este mês</Text>
              </View>
              <View style={styles.indicatorBox}>
                <Text style={styles.indicatorLabel}>Temperatura</Text>
                <Text style={styles.indicatorValue}>--</Text>
                <Text style={styles.indicatorStatus}>Normal</Text>
              </View>
            </View>

            
          </View>
        </ScrollView>

        {/* Tab Bar Fake */}
        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="home" size={24} color="#0056b3" />
            <Text style={[styles.tabText, { color: "#0056b3" }]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("MedicalHistoryScreen")} style={styles.tabItem}>
            <Ionicons  name="clipboard-outline" size={24} color="#8e9aaf" />
            <Text style={styles.tabText}>Saúde</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="chatbubble-outline" size={24} color="#8e9aaf" />
            <Text style={styles.tabText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="medical-outline" size={24} color="#8e9aaf" />
            <Text style={styles.tabText}>Clínica</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    backgroundColor: "#eb9a22",
    padding: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,

  
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",

  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: {
    marginLeft: 15,
  },
  welcomeTitle:{
    fontSize: 20,
    fontWeight:"bold",
    color: "#1F2937"
  },
  petName: {
    fontSize: 22,
    fontWeight: "500",
    color: "#1F2937",
  },
  petInfo: {
    fontSize: 16,
    fontWeight: "semibold",
    color: "#1F2937",
  },
  content: {
    padding: 20,
    marginTop: -20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A3258",
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 10,
  },
  alertCard: {
    borderLeftWidth: 6,
    borderLeftColor: "#E53E3E",
  },
  treatmentCard: {
    borderLeftWidth: 6,
    borderLeftColor: "#3182CE",
  },
  iconContainer: {
    marginRight: 15,
  },
  checkboxContainer: {
    marginRight: 15,
  },
  cardTextContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A202C",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#718096",
  },
  indicatorsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: "30%",
    alignItems: "center"
  },
  indicatorBox: {
    backgroundColor: "white",
    width: "48%",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    elevation: 2,
    height:"65%",
    justifyContent: "center"
  },
  indicatorLabel: {
    color: "#718096",
    fontSize: 12,
    marginBottom: 5,
  },
  indicatorValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2B6CB0",
  },
  indicatorTrend: {
    fontSize: 11,
    color: "#48BB78",
    marginTop: 4,
  },
  indicatorStatus: {
    fontSize: 11,
    color: "#48BB78",
    marginTop: 4,
  },
  iaButton: {
    marginTop: 30,
    backgroundColor: "#E6FFFA",
    borderWidth: 1,
    borderColor: "#81E6D9",
    borderStyle: "dashed",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  iaButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C7A7B",
  },
  iaButtonSubtext: {
    fontSize: 12,
    color: "#2C7A7B",
    marginTop: 5,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#EDF2F7",
    backgroundColor: "white",
  },
  tabItem: {
    alignItems: "center",
  },
  tabText: {
    fontSize: 10,
    color: "#8e9aaf",
    marginTop: 2,
  },
});
