import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";

import { useMyPets } from "../hooks/usePets";
import {
  useClinics,
  useCreateAppointment,
} from "../hooks/useAppointments";

export default function AppointmentFormScreen({
  navigation,
}: any) {
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
  const [selectedClinicId, setSelectedClinicId] = useState<number | null>(
    null
  );

  const [appointmentDate, setAppointmentDate] = useState<Date>(
    new Date(Date.now() + 60 * 60 * 1000)
  );

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const { data: petsData, isLoading: petsLoading } = useMyPets();

  const {
    data: clinics,
    isLoading: clinicsLoading,
    isError: clinicsError,
  } = useClinics();

  const createAppointmentMutation = useCreateAppointment();

  const pets = petsData?.content ?? [];

  const selectedClinic = useMemo(() => {
    return clinics?.find(
      (clinic) => clinic.id === selectedClinicId
    );
  }, [clinics, selectedClinicId]);

  function formatDate(date: Date) {
    return date.toLocaleDateString("pt-BR");
  }

  function formatTime(date: Date) {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function handleDateChange(
    event: any,
    date?: Date
  ) {
    setShowDatePicker(false);

    if (date) {
      setAppointmentDate((current) => {
        const updated = new Date(date);

        updated.setHours(
          current.getHours(),
          current.getMinutes(),
          0,
          0
        );

        return updated;
      });
    }
  }

  function handleTimeChange(
    event: any,
    date?: Date
  ) {
    setShowTimePicker(false);

    if (date) {
      setAppointmentDate((current) => {
        const updated = new Date(current);

        updated.setHours(
          date.getHours(),
          date.getMinutes(),
          0,
          0
        );

        return updated;
      });
    }
  }

  function handleSchedule() {
    if (!selectedPetId) {
      Alert.alert(
        "Atenção",
        "Selecione um pet."
      );
      return;
    }

    if (!selectedClinicId) {
      Alert.alert(
        "Atenção",
        "Selecione uma clínica."
      );
      return;
    }

    if (appointmentDate.getTime() < Date.now()) {
      Alert.alert(
        "Data inválida",
        "Escolha uma data e horário futuros."
      );
      return;
    }

    const appointmentDateISO = formatAppointmentDate(
      appointmentDate
    );

    createAppointmentMutation.mutate(
      {
        petId: selectedPetId,
        clinicId: selectedClinicId,
        appointmentDate: appointmentDateISO,
      },
      {
        onSuccess: () => {
          Alert.alert(
            "Consulta agendada",
            "Sua consulta foi agendada com sucesso.",
            [
              {
                text: "OK",
                onPress: () => navigation.goBack(),
              },
            ]
          );
        },

        onError: (error: any) => {
          console.log(
            "ERRO AO AGENDAR:",
            error
          );

          Alert.alert(
            "Não foi possível agendar",
            getErrorMessage(error)
          );
        },
      }
    );
  }

  if (petsLoading || clinicsLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.loadingText}>
            Carregando informações...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (clinicsError) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.errorText}>
            Não foi possível carregar as clínicas.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          Marcar consulta
        </Text>

        <Text style={styles.subtitle}>
          Escolha o pet, a clínica e o horário.
        </Text>

        {/* PET */}
        <Text style={styles.label}>
          Pet
        </Text>

        <View style={styles.optionsContainer}>
          {pets.map((pet) => {
            const selected =
              selectedPetId === pet.id;

            return (
              <TouchableOpacity
                key={pet.id}
                style={[
                  styles.option,
                  selected && styles.optionSelected,
                ]}
                onPress={() =>
                  setSelectedPetId(pet.id)
                }
              >
                <Text
                  style={[
                    styles.optionTitle,
                    selected &&
                      styles.optionTitleSelected,
                  ]}
                >
                  {pet.name}
                </Text>

                <Text style={styles.optionSubtitle}>
                  {pet.species} • {pet.breed}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {pets.length === 0 && (
          <Text style={styles.emptyText}>
            Você ainda não possui pets cadastrados.
          </Text>
        )}

        {/* CLÍNICA */}
        <Text style={styles.label}>
          Clínica
        </Text>

        <View style={styles.optionsContainer}>
          {(clinics ?? []).map((clinic) => {
            const selected =
              selectedClinicId === clinic.id;

            return (
              <TouchableOpacity
                key={clinic.id}
                style={[
                  styles.option,
                  selected && styles.optionSelected,
                ]}
                onPress={() =>
                  setSelectedClinicId(clinic.id)
                }
              >
                <Text
                  style={[
                    styles.optionTitle,
                    selected &&
                      styles.optionTitleSelected,
                  ]}
                >
                  {clinic.name}
                </Text>

                <Text style={styles.optionSubtitle}>
                  {clinic.address}
                </Text>

                <Text style={styles.optionSubtitle}>
                  {clinic.openingHours} às{" "}
                  {clinic.closingHours}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* DATA */}
        <Text style={styles.label}>
          Data
        </Text>

        <TouchableOpacity
          style={styles.dateButton}
          onPress={() =>
            setShowDatePicker(true)
          }
        >
          <Text style={styles.dateButtonText}>
            {formatDate(appointmentDate)}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={appointmentDate}
            mode="date"
            minimumDate={new Date()}
            onChange={handleDateChange}
          />
        )}

        {/* HORÁRIO */}
        <Text style={styles.label}>
          Horário
        </Text>

        <TouchableOpacity
          style={styles.dateButton}
          onPress={() =>
            setShowTimePicker(true)
          }
        >
          <Text style={styles.dateButtonText}>
            {formatTime(appointmentDate)}
          </Text>
        </TouchableOpacity>

        {showTimePicker && (
          <DateTimePicker
            value={appointmentDate}
            mode="time"
            onChange={handleTimeChange}
          />
        )}

        {/* RESUMO */}
        {selectedPetId &&
          selectedClinicId && (
            <View style={styles.summary}>
              <Text style={styles.summaryTitle}>
                Resumo
              </Text>

              <Text style={styles.summaryText}>
                Pet:{" "}
                {
                  pets.find(
                    (pet) =>
                      pet.id === selectedPetId
                  )?.name
                }
              </Text>

              <Text style={styles.summaryText}>
                Clínica:{" "}
                {selectedClinic?.name}
              </Text>

              <Text style={styles.summaryText}>
                Data:{" "}
                {formatDate(appointmentDate)}
              </Text>

              <Text style={styles.summaryText}>
                Horário:{" "}
                {formatTime(appointmentDate)}
              </Text>
            </View>
          )}

        <TouchableOpacity
          style={[
            styles.scheduleButton,
            createAppointmentMutation.isPending &&
              styles.scheduleButtonDisabled,
          ]}
          onPress={handleSchedule}
          disabled={
            createAppointmentMutation.isPending
          }
        >
          <Text style={styles.scheduleButtonText}>
            {createAppointmentMutation.isPending
              ? "Agendando..."
              : "Agendar consulta"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function formatAppointmentDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");
  const day = String(
    date.getDate()
  ).padStart(2, "0");

  const hours = String(
    date.getHours()
  ).padStart(2, "0");

  const minutes = String(
    date.getMinutes()
  ).padStart(2, "0");

  const seconds = String(
    date.getSeconds()
  ).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

function getErrorMessage(error: any): string {
  if (
    error?.message?.includes(
      "outside clinic opening hours"
    )
  ) {
    return "O horário escolhido está fora do horário de funcionamento da clínica.";
  }

  if (
    error?.message?.includes(
      "already has an appointment"
    )
  ) {
    return "Este pet já possui uma consulta nesse dia e horário.";
  }

  if (
    error?.message?.includes(
      "only schedule appointments"
    )
  ) {
    return "Você só pode agendar consultas para seus próprios pets.";
  }

  return (
    error?.message ||
    "Ocorreu um erro ao agendar a consulta."
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  loadingText: {
    fontSize: 16,
    color: "#6B7280",
  },

  errorText: {
    fontSize: 16,
    color: "#DC2626",
    textAlign: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    marginBottom: 28,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 10,
    marginTop: 18,
  },

  optionsContainer: {
    gap: 10,
  },

  option: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 15,
  },

  optionSelected: {
    borderColor: "#EB9A22",
    borderWidth: 2,
  },

  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },

  optionTitleSelected: {
    color: "#EB9A22",
  },

  optionSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },

  emptyText: {
    color: "#6B7280",
    fontSize: 14,
    marginTop: 5,
  },

  dateButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 16,
  },

  dateButtonText: {
    fontSize: 16,
    color: "#111827",
  },

  summary: {
    marginTop: 25,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  summaryTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },

  summaryText: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 5,
  },

  scheduleButton: {
    marginTop: 25,
    backgroundColor: "#EB9A22",
    borderRadius: 12,
    padding: 17,
    alignItems: "center",
  },

  scheduleButtonDisabled: {
    opacity: 0.6,
  },

  scheduleButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});