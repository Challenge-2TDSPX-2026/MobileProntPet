import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import HeaderForm from "../components/HeaderForm";
import MainButton from "../components/MainButton";

export default function PetFormScreen({ navigation }: any) {
  const [form, setForm] = useState({
    id: Math.floor(Math.random() *100),
    name: "",
    species: "Cachorro",
    breed: "",
    age: "",
    weight: "",
    sex: "Macho",
  });

  const [focusedInput, setFocusedInput] = useState("");

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView style={styles.container}>
          <HeaderForm
            stepText="Passo 2 de 2"
            title="Cadastro do Pet"
            subtitle="Insira as informações básicas do seu Pet para ter acesso a plataforma."
          />

          <Text style={styles.label}>Nome do Pet *</Text>
          <TextInput
            style={[
              styles.input,
              focusedInput === "NomePet" && styles.inputFocused,
            ]}
            onFocus={() => setFocusedInput("NomePet")}
            onBlur={() => setFocusedInput(" ")}
            value={form.name}
            onChangeText={(t) => setForm({ ...form, name: t })}
          />

          <Text style={styles.label}>Espécie *</Text>
          <Picker
            selectedValue={form.species}
            onValueChange={(itemValue) =>
              setForm({ ...form, species: itemValue })
            }
          >
            <Picker.Item label="Cachorro" value="Cachorro" />
            <Picker.Item label="Gato" value="Gato" />
            <Picker.Item label="Outro" value="Outro" />
          </Picker>

          <Text style={styles.label}>Raça</Text>
          <TextInput
            style={[
              styles.input,
              focusedInput === "Raca" && styles.inputFocused,
            ]}
            onFocus={() => setFocusedInput("Raca")}
            onBlur={() => setFocusedInput(" ")}
            value={form.breed}
            onChangeText={(t) => setForm({ ...form, breed: t })}
          />

          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Idade (anos)</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === "Idade" && styles.inputFocused,
                ]}
                onFocus={() => setFocusedInput("Idade")}
                onBlur={() => setFocusedInput(" ")}
                keyboardType="numeric"
                value={form.age}
                onChangeText={(t) =>
                  setForm({ ...form, age: t.replace(/[^0-9]/g, "") })
                }
              />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.label}>Peso (kg)</Text>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === "Peso" && styles.inputFocused,
                ]}
                onFocus={() => setFocusedInput("Peso")}
                onBlur={() => setFocusedInput(" ")}
                keyboardType="numeric"
                value={form.weight}
                onChangeText={(t) => setForm({ ...form, weight: t })}
              />
            </View>
          </View>

          <Text style={styles.label}>Sexo *</Text>
          <Picker
            selectedValue={form.sex}
            onValueChange={(itemValue) => setForm({ ...form, sex: itemValue })}
          >
            <Picker.Item label="Macho" value="Macho" />
            <Picker.Item label="Fêmea" value="Fêmea" />
          </Picker>

          <MainButton
            title="Criar Conta "
            onPress={() => navigation.navigate("TutorHomeScreen", { pet: form })}
          />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff" },
  label: { fontWeight: "bold", marginTop: 15, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  inputFocused: {
    borderColor: "#eb9a22",
  },
});
