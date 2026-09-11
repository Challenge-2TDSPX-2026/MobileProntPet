import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons"; 
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginButton from "../components/LoginButton";

export default function AuthScreen({navigation} : any) {
  const [userRole, setUserRole] = useState<"tutor" | "vet" | null>(null);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Bem-vindo ao Pet Pront</Text>
          <Text style={styles.subtitle}>
            Escolha como deseja acessar a plataforma
          </Text>
        </View>

        <View style={styles.roleContainer}>
          <LoginButton
            text="Sou Tutor"
            icon="paw"
            selected={userRole === "tutor"}
            onPress={() => {
              setUserRole("tutor"); 
              navigation.navigate('TutorForm')}}
          />
          
          <LoginButton
            text="Sou Veterinário"
            icon="medical"
            selected={userRole === "vet"}
            onPress={() => {setUserRole("vet");
            navigation.navigate('VetRegistration')}
            
            }
          />
   
        </View>

        {/* Opções de Login Social */}
        <View style={styles.authActions}>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-google" size={20} color="#000" />
            <Text style={styles.socialButtonText}>Entrar com Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-apple" size={20} color="#000" />
            <Text style={styles.socialButtonText}>Entrar com Apple</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity style={styles.phoneButton}>
            <Text style={styles.phoneButtonText}>
              Acessar via Telefone (SMS)
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB", paddingHorizontal: 20 },
  header: { marginTop: 60, marginBottom: 40, alignItems: "center" },
  title: { fontSize: 26, fontWeight: "bold", color: "#1F2937" },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 8,
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },

  
  roleText: { marginTop: 10, fontWeight: "600", color: "#4B5563" },
  selectedText: { color: "#FFF" },
  authActions: { width: "100%", height: "50%", justifyContent: "center", },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    marginBottom: 12,
  },
  socialButtonText: { marginLeft: 10, fontWeight: "500", fontSize: 16 },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: { flex: 1, height: 1, backgroundColor: "#E5E7EB" },
  dividerText: { marginHorizontal: 10, color: "#9CA3AF" },
  phoneButton: { alignItems: "center", padding: 10 },
  phoneButtonText: { color: "#eb9a22", fontWeight: "600" },
});
