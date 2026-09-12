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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRegister } from "../hooks/useAuth";

export default function VetRegistration({ navigation }: any) {
  const registerMutation = useRegister();

  const [formData, setFormData] = useState({
    name: "",
    cnpj: "",
    phone: "",
    email: "",
    senha: "",
    password: "",
    address: "",
    openingHours: "",
    closingHours: "",
  });

  async function handleRegister() {
    try {
      const role = await AsyncStorage.getItem("selectedRole");

      if (role !== "ROLE_VET") {
        console.log("Role de veterinário não encontrada.");
        return;
      }

      if (formData.senha !== formData.password) {
        console.log("As senhas não coincidem.");
        return;
      }

      const data = {
        email: formData.email,
        password: formData.senha,
        role: "ROLE_VET" as const,
        clinic: {
          name: formData.name,
          cnpj: formData.cnpj,
          address: formData.address,
          phone: formData.phone,
          openingHours: formData.openingHours,
          closingHours: formData.closingHours,
        },
      };

      console.log("Dados enviados:", data);

      await registerMutation.mutateAsync(data);

      navigation.navigate("LoginVet");
    } catch (error) {
      console.error("Erro ao cadastrar veterinário:", error);
    }
  }

  const [focusedInput, setFocusedInput] = useState("");

  function clearForm() {
    setFormData({
      name: "",
      cnpj: "",
      phone: "",
      email: "",
      senha: "",
      password: "",
      address: "",
      openingHours: "",
      closingHours: "",
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
                  <Text style={styles.labelName}>Nome da clinica:</Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("LoginVet")}
                  >
                    <Text style={styles.alreadyLogin}>Já possuo conta!</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === "Nome" && styles.inputFocused,
                ]}
                value={formData.name}
                onFocus={() => setFocusedInput("Nome")}
                onBlur={() => setFocusedInput(" ")}
                placeholder="Ex: Iago..."
                onChangeText={(txt) => setFormData({ ...formData, name: txt })}
              />

              {/* CNPJ + Telefone */}
              <View style={styles.row}>
                <View style={styles.columnLeft}>
                  <Text style={styles.label}>CNPJ:</Text>

                  <TextInput
                    style={[
                      styles.input,
                      styles.inputSmall,
                      focusedInput === "CNPJ" && styles.inputFocused,
                    ]}
                    value={formData.cnpj}
                    onFocus={() => setFocusedInput("CNPJ")}
                    onBlur={() => setFocusedInput("")}
                    placeholder="00.000.000/0000-00"
                    keyboardType="numeric"
                    onChangeText={(txt) =>
                      setFormData({ ...formData, cnpj: txt })
                    }
                  />
                </View>

                <View style={styles.column}>
                  <Text style={styles.label}>Telefone:</Text>

                  <TextInput
                    style={[
                      styles.input,
                      styles.inputSmall,
                      focusedInput === "Telefone" && styles.inputFocused,
                    ]}
                    value={formData.phone}
                    onFocus={() => setFocusedInput("Telefone")}
                    onBlur={() => setFocusedInput("")}
                    placeholder="(11) 99999-9999"
                    keyboardType="phone-pad"
                    onChangeText={(txt) =>
                      setFormData({ ...formData, phone: txt })
                    }
                  />
                </View>
              </View>

              {/* Horário */}
              <View style={styles.row}>
                <View style={styles.columnLeft}>
                  <Text style={styles.label}>Abertura:</Text>

                  <TextInput
                    style={[
                      styles.input,
                      styles.inputSmall,
                      focusedInput === "Abertura" && styles.inputFocused,
                    ]}
                    value={formData.openingHours}
                    onFocus={() => setFocusedInput("Abertura")}
                    onBlur={() => setFocusedInput("")}
                    placeholder="08:00"
                    keyboardType="numeric"
                    onChangeText={(txt) =>
                      setFormData({ ...formData, openingHours: txt })
                    }
                  />
                </View>

                <View style={styles.column}>
                  <Text style={styles.label}>Fechamento:</Text>

                  <TextInput
                    style={[
                      styles.input,
                      styles.inputSmall,
                      focusedInput === "Fechamento" && styles.inputFocused,
                    ]}
                    value={formData.closingHours}
                    onFocus={() => setFocusedInput("Fechamento")}
                    onBlur={() => setFocusedInput("")}
                    placeholder="18:00"
                    keyboardType="numeric"
                    onChangeText={(txt) =>
                      setFormData({ ...formData, closingHours: txt })
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
                <MainButton title="Criar Conta" onPress={handleRegister} />
              </View>
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
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },

  form: {
    gap: 16,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },

  labelName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },

  viewLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  alreadyLogin: {
    color: "#eb9a22",
    fontWeight: "600",
    fontSize: 13,
    textDecorationLine: "underline",
  },

  input: {
    backgroundColor: "#F8F9FA",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    color: "#111827",
  },

  inputSmall: {
    minHeight: 48,
  },

  inputFocused: {
    borderColor: "#eb9a22",
    backgroundColor: "#FFF",
  },

  row: {
    flexDirection: "row",
    width: "100%",
  },

  columnLeft: {
    flex: 1,
    marginRight: 8,
  },

  column: {
    flex: 1,
    marginLeft: 8,
  },

  tutorFormButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 8,
  },
});
