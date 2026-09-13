import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import BackButton from "../components/BackButton";

import HeaderForm from "../components/HeaderForm";
import MainButton from "../components/MainButton";
import { useLogin } from "../hooks/useAuth";

export default function LoginVet({ navigation }: any) {
  const loginMutation = useLogin();

  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const [focusedInput, setFocusedInput] = useState("");

  async function handleLogin() {
    try {
      const data = {
        email: formData.email,
        password: formData.senha,
      };

      console.log("Dados de login:", data);

      await loginMutation.mutateAsync(data);

      navigation.navigate("VetDashboardScreen");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  }

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
            <BackButton goBackTo="VetRegistration" params={{}} />
            <HeaderForm
              stepText="Passo 2 de 3"
              title="Bem-vindo ao Pront Pet"
              subtitle="Preencha os campos abaixo para acessar sua conta"
            />

            <View style={styles.form}>
              <Text style={styles.label}>E-mail:</Text>

              <TextInput
                style={[
                  styles.input,
                  focusedInput === "Email" && styles.inputFocused,
                ]}
                value={formData.email}
                onFocus={() => setFocusedInput("Email")}
                onBlur={() => setFocusedInput("")}
                placeholder="Digite seu e-mail"
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
                value={formData.senha}
                onFocus={() => setFocusedInput("Senha")}
                onBlur={() => setFocusedInput("")}
                placeholder="Digite sua senha"
                autoCapitalize="none"
                secureTextEntry
                onChangeText={(txt) => setFormData({ ...formData, senha: txt })}
              />

              <MainButton
                title={loginMutation.isPending ? "Entrando..." : "Login"}
                onPress={handleLogin}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  scrollContent: {
    padding: 24,
  },

  header: {
    marginBottom: 32,
    marginTop: 20,
  },

  stepText: {
    color: "#eb9a22",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 8,
  },

  form: {
    gap: 15,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 4,
  },

  input: {
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  row: {
    flexDirection: "row",
  },

  inputFocused: {
    borderColor: "#eb9a22",
  },
});
