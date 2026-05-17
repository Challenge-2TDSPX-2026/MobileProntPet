import React, { useState } from "react";
import {View,Text,TextInput,StyleSheet,ScrollView,KeyboardAvoidingView,Platform} from "react-native";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import HeaderForm from "../components/HeaderForm";
import MainButton from "../components/MainButton";

export default function TutorRegistration({ navigation }: any) {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const [focusedInput, setFocusedInput] = useState("");

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <HeaderForm
              stepText="Passo 1 de 2"
              title="Bem-vindo ao Pront Pet"
              subtitle="Escolha como deseja acessar a plataforma"
            />

            <View style={styles.form}>
              

              

              
              <Text style={styles.label}>E-mail:</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === "Email" && styles.inputFocused,
                ]}
                onFocus={() => setFocusedInput("Email")}
                onBlur={() => setFocusedInput(" ")}
                placeholder="seu@email.com"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={(txt) => setFormData({ ...formData, email: txt })}
              />
              <Text style={styles.label}>Senha:</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === "Senha" && styles.inputFocused,
                ]}
                onFocus={() => setFocusedInput("Senha")}
                onBlur={() => setFocusedInput(" ")}
                placeholder="Digite sua senha "
                autoCapitalize="none"
                secureTextEntry
                onChangeText={(txt) => setFormData({ ...formData, senha: txt })}
              />
              

              <MainButton
                title="Login "
                onPress={() => navigation.navigate("PetFormScreen")}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  scrollContent: { padding: 24 },
  header: { marginBottom: 32, marginTop: 20 },
  stepText: {
    color: "#eb9a22",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 8,
  },

  form: { gap: 15 },
  label: { fontSize: 14, fontWeight: "600", color: "#374151", marginBottom: 4 },
  input: {
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  row: { flexDirection: "row" },

  inputFocused: {
    borderColor: "#eb9a22",
  },
});
