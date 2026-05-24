import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import HeaderForm from "../components/HeaderForm";
import MainButton from "../components/MainButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function PetFormScreen({ navigation }: any) {
  const [form, setForm] = useState({
    name: "",
    species: "Cachorro",
    customSpecies: "",
    breed: "",
    birthDate: new Date(),
    age: "",
    weight: "",
    sex: "Macho",
    temperature: "",
  });

  const [focusedInput, setFocusedInput] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  function calculateAge(birthDate: Date) {
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDiferrence = today.getMonth() - birthDate.getMonth();

    if (
      monthDiferrence < 0 ||
      (monthDiferrence == 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return (form.age = age.toString());
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{
            paddingBottom: 40,
          }}
        >
          <HeaderForm
            stepText="Passo 3 de 3"
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

            {form.species == "Outro" && (
              <>
                <Text style={styles.label}> Qual a espécie do pet?</Text>

                <TextInput
                  style={[
                    styles.input,
                    focusedInput === "OutraEspecie" && styles.inputFocused,
                  ]}
                  placeholder="Ex: Coelho, Papagaio..."
                  value={form.customSpecies}
                  onFocus={()=> setFocusedInput("OutraEspecie")}
                  onBlur={()=> setFocusedInput("")}
                  onChangeText={(t)=> setForm({...form, customSpecies:t})}
                /> 

                
              </>
            )}
          

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

          <Text style={styles.label}>Temperatura</Text>
          <TextInput
            style={[
              styles.input,
              focusedInput === "Temperatura" && styles.inputFocused,
            ]}
            onFocus={() => setFocusedInput("Temperatura")}
            onBlur={() => setFocusedInput(" ")}
            keyboardType="numeric"
            value={form.temperature}
            onChangeText={(t) => setForm({ ...form, temperature: t })}
          />

          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Data de nascimento:</Text>

              <TextInput
                style={styles.input}
                value={form.birthDate.toLocaleDateString("pt-BR")}
                editable={true}
                onTouchStart={() => setShowDatePicker(true)}
              />
              {showDatePicker && (
                <DateTimePicker
                  value={form.birthDate}
                  mode="date"
                  display="default"
                  maximumDate={new Date()}
                  onChange={(event, selectDate) => {
                    setShowDatePicker(false);

                    if (selectDate) {
                      setForm({ ...form, birthDate: selectDate });
                    }
                  }}
                />
              )}
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

          <View style={styles.line}></View>

          <View>
            <HeaderForm
              stepText=""
              title="Informações do Pet"
              subtitle="Confira as informações de cadastro, antes de adicionar seu Pet."
            />

            <Text style={styles.label}>
              <Text>Nome: {form.name}</Text>
            </Text>

            <Text style={styles.label}>Espécie: {form.species === "Outro" ? form.customSpecies : form.species}</Text>

            <Text style={styles.label}>Raça: {form.breed}</Text>

            <Text style={styles.label}>Temperatura: {form.temperature}</Text>

            <Text style={styles.label}>
              Data de Nascimento:
              {form.birthDate.toLocaleDateString("pt-BR")}
            </Text>

            <Text style={styles.label}>
              Idade: {calculateAge(form.birthDate)} anos
            </Text>

            <Text style={styles.label}>Peso: {form.weight}</Text>
            <Text style={styles.label}>Sexo: {form.sex}</Text>
          </View>
          <MainButton
            title="Adicionar Novo Pet "
            onPress={async () => {
              const newPet = {
                ...form,
                id: Date.now(),
              };

              try {
                const storedPets = await AsyncStorage.getItem("pets");

                const pets = storedPets ? JSON.parse(storedPets) : [];

                const updatedPets = [...pets, newPet];

                await AsyncStorage.setItem("pets", JSON.stringify(updatedPets));

                navigation.navigate("MyPetsScreen");
              } catch (error) {
                console.log(error);
              }
            }}
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
  line: {
    borderTopColor: "black",
    marginTop: 10,
    borderWidth: 0.5,
  },
});
