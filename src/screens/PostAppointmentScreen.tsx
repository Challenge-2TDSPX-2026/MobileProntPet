import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  AppointmentResponse,
  updateAppointment,
} from "../services/appointmentService";


export default function PostAppointmentScreen({
  navigation,
  route,
}: any) {
  const { appointment } = route.params;

  const queryClient = useQueryClient();

  const [symptoms, setSymptoms] = useState(
    appointment.symptoms ?? ""
  );

  const [diagnosis, setDiagnosis] = useState(
    appointment.diagnosis ?? ""
  );

  const [observations, setObservations] = useState(
    appointment.observations ?? ""
  );

  const updateMutation = useMutation({
    mutationFn: () =>
      updateAppointment(appointment.id, {
        petId: appointment.pet.id,
        clinicId: appointment.clinic.id,
        appointmentDate: appointment.appointmentDate,
        symptoms: symptoms.trim(),
        diagnosis: diagnosis.trim(),
        observations: observations.trim(),

        // Mantém o peso atual caso não exista um novo peso.
        updatedWeight:
          appointment.updatedWeight ??
          appointment.pet.weight,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["clinicAppointments"],
      });

      Alert.alert(
        "Consulta finalizada",
        "Os dados da consulta foram salvos com sucesso.",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    },

    onError: (error: any) => {
      console.error("Erro ao finalizar consulta:", error);

      Alert.alert(
        "Erro",
        error?.message ||
          "Não foi possível salvar os dados da consulta."
      );
    },
  });

  function handleFinishAppointment() {
    if (!symptoms.trim()) {
      Alert.alert(
        "Campo obrigatório",
        "Informe os sintomas do pet."
      );
      return;
    }

    if (!diagnosis.trim()) {
      Alert.alert(
        "Campo obrigatório",
        "Informe o diagnóstico."
      );
      return;
    }

    updateMutation.mutate();
  }

  function formatDate(dateString: string) {
    const [date, time] = dateString.split("T");

    if (!date) {
      return dateString;
    }

    const [year, month, day] = date.split("-");

    if (!time) {
      return `${day}/${month}/${year}`;
    }

    const [hour, minute] = time.split(":");

    return `${day}/${month}/${year} às ${hour}:${minute}`;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Pós-consulta</Text>

        <Text style={styles.subtitle}>
          Registre as informações do atendimento.
        </Text>

        {/* DADOS DO PET */}
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>
            Informações da consulta
          </Text>

          <Text style={styles.infoLabel}>Pet</Text>
          <Text style={styles.infoValue}>
            {appointment.pet.name}
          </Text>

          <Text style={styles.infoLabel}>Espécie</Text>
          <Text style={styles.infoValue}>
            {appointment.pet.species}
          </Text>

          <Text style={styles.infoLabel}>Raça</Text>
          <Text style={styles.infoValue}>
            {appointment.pet.breed || "Não informado"}
          </Text>

          <Text style={styles.infoLabel}>Clínica</Text>
          <Text style={styles.infoValue}>
            {appointment.clinic.name}
          </Text>

          <Text style={styles.infoLabel}>Data da consulta</Text>
          <Text style={styles.infoValue}>
            {formatDate(appointment.appointmentDate)}
          </Text>

          <Text style={styles.infoLabel}>Especialidade</Text>
          <Text style={styles.infoValue}>
            {appointment.speciality || "Não informada"}
          </Text>
        </View>

        {/* SINTOMAS */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            Sintomas <Text style={styles.required}>*</Text>
          </Text>

          <TextInput
            style={styles.textArea}
            value={symptoms}
            onChangeText={setSymptoms}
            placeholder="Descreva os sintomas apresentados pelo pet"
            placeholderTextColor="#999"
            multiline
            textAlignVertical="top"
            editable={!updateMutation.isPending}
          />
        </View>

        {/* DIAGNÓSTICO */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            Diagnóstico <Text style={styles.required}>*</Text>
          </Text>

          <TextInput
            style={styles.textArea}
            value={diagnosis}
            onChangeText={setDiagnosis}
            placeholder="Informe o diagnóstico realizado"
            placeholderTextColor="#999"
            multiline
            textAlignVertical="top"
            editable={!updateMutation.isPending}
          />
        </View>

        {/* OBSERVAÇÕES */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Observações</Text>

          <TextInput
            style={styles.textArea}
            value={observations}
            onChangeText={setObservations}
            placeholder="Adicione observações sobre o atendimento"
            placeholderTextColor="#999"
            multiline
            textAlignVertical="top"
            editable={!updateMutation.isPending}
          />
        </View>

        {/* BOTÃO */}
        <TouchableOpacity
          style={[
            styles.button,
            updateMutation.isPending && styles.buttonDisabled,
          ]}
          onPress={handleFinishAppointment}
          disabled={updateMutation.isPending}
        >
          {updateMutation.isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              Finalizar consulta
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
          disabled={updateMutation.isPending}
        >
          <Text style={styles.cancelButtonText}>
            Voltar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#222",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 15,
    color: "#666",
    marginBottom: 24,
  },

  infoCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    marginBottom: 16,
  },

  infoLabel: {
    fontSize: 13,
    color: "#777",
    marginTop: 10,
  },

  infoValue: {
    fontSize: 16,
    color: "#222",
    fontWeight: "500",
    marginTop: 2,
  },

  fieldContainer: {
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },

  required: {
    color: "#d32f2f",
  },

  textArea: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: "#d0d0d0",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#222",
    backgroundColor: "#fff",
  },

  button: {
    height: 52,
    borderRadius: 10,
    backgroundColor:"#eb9a22",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  cancelButton: {
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  cancelButtonText: {
    color: "#555",
    fontSize: 16,
    fontWeight: "600",
  },
});

