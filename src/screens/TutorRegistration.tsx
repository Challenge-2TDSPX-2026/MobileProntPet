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
import { RegisterRequest } from "../services/authService";


export default function TutorRegistration({ navigation }: any) {
  const registerMutation = useRegister();

  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    phone: "",
    email: "",
    senha: "",
    password: "",
    address: "",
  });

  const [focusedInput, setFocusedInput] = useState("");

  const [errors, setErrors] = useState<Record<string, string>> ({});

  function validateForm() {
  let newErrors: Record<string, string> = {};

  // validação para nome
  if (!formData.name.trim()) {
    newErrors.name = "O nome é obrigatório!";
  }

  // validação para CPF
  if (formData.cpf.trim().length < 11) {
    newErrors.cpf = "CPF inválido!";
  }

  // validação de telefone
  if (!formData.phone.trim()) {
    newErrors.phone = "O Telefone é obrigatório!";
  }

  // validação para endereço
  if (!formData.address.trim()) {
    newErrors.address = "O endereço é obrigatório!";
  }

  // validação para email
  if (!formData.email.trim()) {
    newErrors.email = "O email é obrigatório!";
  }

  // validação de senha
  if (formData.senha.length < 6) {
    newErrors.senha = "A senha deve ter no mínimo 6 caracteres.";
  }

  // validação de confirmação de senha
  if (formData.senha !== formData.password) {
    newErrors.password = "As senhas não coincidem.";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
}

async function handleRegister() {
  const isValid = validateForm();

  if (!isValid) {
    return;
  }

  try {
    const role = await AsyncStorage.getItem("selectedRole");

    if (role !== "ROLE_USER") {
      console.log("Role de tutor não encontrada.");
      return;
    }

    const data: RegisterRequest = {
      email: formData.email,
      password: formData.senha,
      role: "ROLE_USER",
      owner: {
        name: formData.name,
        cpf: formData.cpf,
        email:formData.email,
        phone: formData.phone,

      },
    };

    await registerMutation.mutateAsync(data);

    navigation.navigate("LoginScreen");
  } catch (error) {
    console.error("Erro ao cadastrar tutor:", error);
  }
}

  function clearForm() {
    setFormData({
      name: "",
      cpf: "",
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
                  onPress={() => navigation.navigate("LoginScreen")}>
                  <Text style={styles.alreadyLogin}>Já possuo conta!</Text>
                  
                  </TouchableOpacity>
                </View>
              </View>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === "Nome" && styles.inputFocused,
                  errors.name && styles.inputError
                ]}
                value={formData.name}
                onFocus={() => setFocusedInput("Nome")}
                onBlur={() => setFocusedInput(" ")}
                placeholder="Ex: Iago..."
                onChangeText={(txt) => {
                  setFormData({ ...formData, name: txt });
                  if (errors.name) setErrors({ ...errors, name: "" });
                }}
              />
              {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

              <View style={styles.row}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <Text style={styles.label}>CPF:</Text>
                  <TextInput
                    style={[
                      styles.input,
                      focusedInput === "CPF" && styles.inputFocused,
                      errors.cpf && styles.inputError
                    ]}
                    value={formData.cpf}
                    onFocus={() => setFocusedInput("CPF")}
                    onBlur={() => setFocusedInput(" ")}
                    placeholder="000.000.000-00"
                    keyboardType="numeric"
                    onChangeText={(txt) => {
                      setFormData({ ...formData, cpf: txt });
                      if (errors.cpf) setErrors({ ...errors, cpf: "" });
                    }}
                  />
                  {errors.cpf && <Text style={[styles.errorText, { marginTop: 4 }]}>{errors.cpf}</Text>}                
                  </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>Telefone:</Text>
                  <TextInput
                    style={[
                      styles.input,
                      focusedInput === "Telefone" && styles.inputFocused,
                      errors.phone && styles.inputError
                    ]}
                    value={formData.phone}
                    onFocus={() => setFocusedInput("Telefone")}
                    onBlur={() => setFocusedInput(" ")}
                    placeholder="(11) 99999-9999"
                    keyboardType="phone-pad"
                    onChangeText={(txt) => {
                      setFormData({ ...formData, phone: txt });
                      if (errors.phone) setErrors({ ...errors, phone: "" });
                    }}
                  />
                  {errors.phone && <Text style={[styles.errorText, { marginTop: 4 }]}>{errors.phone}</Text>}                
                </View>
              </View>

              <Text style={styles.label}>Endereço Residencial:</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === "Endereco" && styles.inputFocused,
                  errors.address && styles.inputError
                ]}
                value={formData.address}
                onFocus={() => setFocusedInput("Endereco")}
                onBlur={() => setFocusedInput(" ")}
                placeholder="Rua, número, bairro e cidade"
                multiline
                onChangeText={(txt) => {
                  setFormData({ ...formData, address: txt });
                  if (errors.address) setErrors({ ...errors, address: "" });
                }}
              />
              {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}                

              <Text style={styles.label}>E-mail:</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === "Email" && styles.inputFocused,
                  errors.email && styles.inputError
                ]}
                value={formData.email}
                onFocus={() => setFocusedInput("Email")}
                onBlur={() => setFocusedInput(" ")}
                placeholder="seu@email.com"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={(txt) => { 
                  setFormData({ ...formData, email: txt });
                  if (errors.email) setErrors({ ...errors, email: "" });
              }}               
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}                
              <Text style={styles.label}>Senha:</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === "Senha" && styles.inputFocused,
                  errors.senha && styles.inputError
                ]}
                value={formData.senha}
                onFocus={() => setFocusedInput("Senha")}
                onBlur={() => setFocusedInput(" ")}
                placeholder="Digite sua senha "
                autoCapitalize="none"
                secureTextEntry
                onChangeText={(txt) => { 
                  setFormData({ ...formData, senha: txt });
                  if (errors.senha) setErrors({ ...errors, senha: "" });
              }}
              />
              {errors.senha && <Text style={styles.errorText}>{errors.senha}</Text>}
              <Text style={styles.label}>Confirme sua senha: </Text>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === "ConfSenha" && styles.inputFocused,
                  errors.password && styles.inputError
                ]}
                value={formData.password}
                onFocus={() => setFocusedInput("ConfSenha")}
                onBlur={() => setFocusedInput(" ")}
                placeholder="Confirme sua senha "
                autoCapitalize="none"
                secureTextEntry
                onChangeText={(txt) => {
                  setFormData({ ...formData, password: txt });
                  if (errors.password) setErrors({ ...errors, password: "" });
                }}
              />
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
              <View style={styles.tutorFormButton}>
                <MainButton title="Limpar" onPress={() => clearForm()} />
                <MainButton
                  title="Criar Conta"
                  onPress={handleRegister}
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

  inputError: {
    borderColor: "#EF4444", 
    borderWidth: 1,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: -10, 
    marginBottom: 10,
    marginLeft: 4,
  },

  alreadyLogin: { 
    color: "#eb9a22",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 8,
    textDecorationLine: "underline"
  },

  form: { gap: 15 },
  label: { fontSize: 14, fontWeight: "600", color: "#374151", marginBottom: 4 },
  labelName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 4,
    width: 150,
   
  },

  tutorFormButton: {
    flexDirection: "row",
    justifyContent: "space-between",
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
