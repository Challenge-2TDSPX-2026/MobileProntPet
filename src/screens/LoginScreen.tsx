import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity
} from "react-native";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import HeaderForm from "../components/HeaderForm";
import MainButton from "../components/MainButton";
import { useLogin } from "../hooks/useAuth";

export default function LoginScreen({ navigation }: any) {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const [focusedInput, setFocusedInput] = useState("");

  const loginMutation = useLogin();

  const handleLogin = () => {
    if (!formData.email || !formData.senha) {
      Alert.alert("Atenção", "Preencha o e-mail e a senha.");
      return;
    }

    loginMutation.mutate(
      {
        email: formData.email,
        password: formData.senha,
      },
      {
        onSuccess: () => {
          navigation.reset({
            index: 1,
            routes: [{ name: "AuthScreen" }, { name: "MyPetsScreen" }],
          });
        },

        onError: (error) => {
          Alert.alert("Erro ao fazer login", error.message);
        },
      },
    );
  };

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
              stepText="Passo 2 de 3"
              title="Bem-vindo ao Pront Pet"
              subtitle="Preencha os campos abaixo para acessar sua conta"
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("TutorForm")}
            >
              <Text style={styles.alreadyLogin}>Já possuo conta!</Text>
            </TouchableOpacity>

            <View style={styles.form}>
              <Text style={styles.label}>E-mail:</Text>

              <TextInput
                style={[
                  styles.input,
                  focusedInput === "Email" && styles.inputFocused,
                ]}
                onFocus={() => setFocusedInput("Email")}
                onBlur={() => setFocusedInput("")}
                placeholder="seu@email.com"
                autoCapitalize="none"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(txt) =>
                  setFormData({
                    ...formData,
                    email: txt,
                  })
                }
              />

              <Text style={styles.label}>Senha:</Text>

              <TextInput
                style={[
                  styles.input,
                  focusedInput === "Senha" && styles.inputFocused,
                ]}
                onFocus={() => setFocusedInput("Senha")}
                onBlur={() => setFocusedInput("")}
                placeholder="Digite sua senha"
                autoCapitalize="none"
                secureTextEntry
                value={formData.senha}
                onChangeText={(txt) =>
                  setFormData({
                    ...formData,
                    senha: txt,
                  })
                }
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
  alreadyLogin: { 
    color: "#eb9a22",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 8,
    textDecorationLine: "underline"
  },
});
