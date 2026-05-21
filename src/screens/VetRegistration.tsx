import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import HeaderForm from "../components/HeaderForm";
import MainButton from "../components/MainButton";

export default function VetRegistration({ navigation }: any) {
  const [formData, setFormData] = useState({
    name: "",
    crmv: "",
    phone: "",
    email: "",
    senha: "",
    password: "",
    address: "",
  });

  const [focusedInput, setFocusedInput] = useState("");

  function clearForm() {
    setFormData({
      name: "",
      crmv: "",
      phone: "",
      email: "",
      senha: "",
      password: "",
      address: "",
    });
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
            <HeaderForm
              stepText="Passo 1 de 3"
              title="Bem-vindo ao Pront Pet"
              subtitle="Escolha como deseja acessar a plataforma"
            />

            <View style={styles.form}>
              <View style={styles.viewLabel}>
                <View>
                  <Text style={styles.labelName}>Nome Completo:</Text>
                </View>
                <View style={styles.alreadyLogin}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("LoginVet")}
                  >
                    <Text style={styles.alreadyLogin}>Já possuo conta!</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.row}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <Text style={styles.label}>CRMV:</Text>
                  <TextInput
                    style={[
                      styles.input,
                      focusedInput === "CRMV" && styles.inputFocused,
                    ]}
                    value={formData.crmv}
                    onFocus={() => setFocusedInput("CRMV")}
                    onBlur={() => setFocusedInput(" ")}
                    placeholder="000000"
                    keyboardType="numeric"
                    onChangeText={(txt) =>
                      setFormData({ ...formData, crmv: txt })
                    }
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>Telefone:</Text>
                  <TextInput
                    style={[
                      styles.input,
                      focusedInput === "Telefone" && styles.inputFocused,
                    ]}
                    value={formData.phone}
                    onFocus={() => setFocusedInput("Telefone")}
                    onBlur={() => setFocusedInput(" ")}
                    placeholder="(11) 99999-9999"
                    keyboardType="phone-pad"
                    onChangeText={(txt) =>
                      setFormData({ ...formData, phone: txt })
                    }
                  />
                </View>
              </View>

              <Text style={styles.label}>Endereço Residencial:</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === "Endereco" && styles.inputFocused,
                ]}
                value={formData.address}
                onFocus={() => setFocusedInput("Endereco")}
                onBlur={() => setFocusedInput(" ")}
                placeholder="Rua, número, bairro e cidade"
                multiline
                onChangeText={(txt) =>
                  setFormData({ ...formData, address: txt })
                }
              />

              <Text style={styles.label}>E-mail:</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === "Email" && styles.inputFocused,
                ]}
                value={formData.email}
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
                value={formData.senha}
                onFocus={() => setFocusedInput("Senha")}
                onBlur={() => setFocusedInput(" ")}
                placeholder="Digite sua senha "
                autoCapitalize="none"
                secureTextEntry
                onChangeText={(txt) => setFormData({ ...formData, senha: txt })}
              />
              <Text style={styles.label}>Confirme sua senha: </Text>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === "ConfSenha" && styles.inputFocused,
                ]}
                value={formData.password}
                onFocus={() => setFocusedInput("ConfSenha")}
                onBlur={() => setFocusedInput(" ")}
                placeholder="Confirme sua senha "
                autoCapitalize="none"
                secureTextEntry
                onChangeText={(txt) =>
                  setFormData({ ...formData, password: txt })
                }
              />

              <View style={styles.tutorFormButton}>
                <MainButton title="Limpar" onPress={() => clearForm()} />
                <MainButton
                  title="Criar Conta"
                  onPress={() => navigation.navigate("LoginVet")}
                />
              </View>
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

  tutorFormButton: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  labelName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 4,
    width: 150,
   
  },
   alreadyLogin: { 
    color: "#eb9a22",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 8,
    textDecorationLine: "underline"
  },
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
  viewLabel: {
    
    flexDirection: "row",
    gap: 100
  },
});
