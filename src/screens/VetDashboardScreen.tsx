import React from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getClinicAppointments,
  deleteAppointment,
} from "../services/appointmentService";
import { logout } from "../services/authService";

export default function VetDashboardScreen({ navigation }: any) {
  // =========================
  // CONSULTAS DA CLÍNICA
  // =========================

  const {
    data: appointments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["clinicAppointments"],
    queryFn: getClinicAppointments,
  });

  // =========================
  // REACT QUERY
  // =========================

  const queryClient = useQueryClient();

  // =========================
  // CANCELAR CONSULTA
  // =========================

  const deleteAppointmentMutation = useMutation({
    mutationFn: (appointmentId: number) => deleteAppointment(appointmentId),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["clinicAppointments"],
      });

      Alert.alert(
        "Consulta cancelada",
        "A consulta foi cancelada com sucesso.",
      );
    },

    onError: (error: any) => {
      if (error?.status === 403) {
        Alert.alert("Acesso negado", "Você não pode cancelar esta consulta.");
        return;
      }

      if (error?.status === 409) {
        Alert.alert(
          "Não é possível cancelar",
          "Essa consulta já aconteceu e não pode ser cancelada.",
        );
        return;
      }

      Alert.alert(
        "Erro",
        error?.message || "Não foi possível cancelar a consulta.",
      );
    },
  });

  // =========================
  // INFORMAÇÕES DA CLÍNICA
  // =========================

  const clinicName = appointments[0]?.clinic?.name || "Sua clínica";

  const now = new Date();

  // =========================
  // CARREGANDO
  // =========================

  if (isLoading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.centerContent}>
            <Text>Carregando consultas...</Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // =========================
  // ERRO
  // =========================

  if (isError) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.centerContent}>
            <Text>Não foi possível carregar as consultas.</Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // =========================
  // SEPARAR CONSULTAS
  // =========================

  const upcomingConsultations = appointments.filter(
    (appointment) => new Date(appointment.appointmentDate) >= now,
  );

  const pastConsultations = appointments.filter(
    (appointment) => new Date(appointment.appointmentDate) < now,
  );

  // =========================
  // FORMATAR DATA
  // =========================

  const formatShortDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");

    return `${day}/${month}`;
  };

  // =========================
  // CONFIRMAR CANCELAMENTO
  // =========================

  const handleDeleteAppointment = (appointmentId: number) => {
    Alert.alert(
      "Cancelar consulta",
      "Tem certeza que deseja cancelar esta consulta?",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim, cancelar",
          style: "destructive",
          onPress: () => {
            deleteAppointmentMutation.mutate(appointmentId);
          },
        },
      ],
    );
  };

  const handleLogout = async () => {
    await logout();
    queryClient.clear();
    navigation.replace("LoginVet");
  };

  // =========================
  // TELA
  // =========================

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          contentContainerStyle={styles.scrollContent}
        >
          {/* =========================
              HEADER
          ========================= */}

          <View style={styles.header}>
            <View style={styles.profileRow}>
              <View style={styles.avatarContainer}>
                <Text style={{ fontSize: 35 }}>👨‍⚕️</Text>
              </View>

              <View style={styles.profileText}>
                <Text style={styles.welcomeTitle}>Bom dia,</Text>

                <Text style={styles.vetName}>{clinicName}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={22} color="#1F2937" />

              <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            {/* =========================
                ACESSO RÁPIDO
            ========================= */}

            <View style={styles.quickAccessRow}>
              <TouchableOpacity
                onPress={() => navigation.navigate("TutorsListScreen")}
                style={styles.quickAccessCard}
              >
                <Ionicons name="people" size={32} color="#eb9a22" />

                <Text style={styles.quickAccessText}>Tutores{"\n"}& Pets</Text>
              </TouchableOpacity>
            </View>

            {/* =========================
                PRÓXIMAS CONSULTAS
            ========================= */}

            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Próximas Consultas</Text>
            </View>

            {upcomingConsultations.map((item) => (
              <View key={item.id} style={styles.upcomingCardContainer}>
                {/* CARD DA CONSULTA */}

                <TouchableOpacity
                  style={styles.upcomingCard}
                  onPress={() =>
                    navigation.navigate("PostAppointmentScreen", {
                      appointment: item,
                    })
                  }
                >
                  {/* DATA */}

                  <View style={styles.dateContainer}>
                    <Ionicons
                      name="calendar-outline"
                      size={18}
                      color="#3182CE"
                    />

                    <Text style={styles.dateText}>
                      {formatShortDate(item.appointmentDate)}
                    </Text>
                  </View>

                  {/* INFORMAÇÕES */}

                  <View style={styles.appointmentInfo}>
                    <View style={styles.titleRow}>
                      <Text style={styles.appointmentType}>
                        Consulta veterinária
                      </Text>
                    </View>

                    <View style={styles.clinicInfoRow}>
                      <Ionicons name="business" size={14} color="#94A3B8" />

                      <Text style={styles.clinicText}>
                        Clínica {item.clinic.name}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>

                {/* =========================
                    BOTÃO CANCELAR
                ========================= */}

                <TouchableOpacity
                  style={styles.cancelButton}
                  disabled={deleteAppointmentMutation.isPending}
                  onPress={() => handleDeleteAppointment(item.id)}
                >
                  <Ionicons
                    name="close-circle-outline"
                    size={18}
                    color="#DC2626"
                  />

                  <Text style={styles.cancelButtonText}>
                    {deleteAppointmentMutation.isPending
                      ? "Cancelando..."
                      : "Cancelar consulta"}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}

            {/* =========================
                HISTÓRICO
            ========================= */}

            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
              Últimos Atendimentos
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScroll}
              contentContainerStyle={{
                paddingRight: 20,
              }}
            >
              {pastConsultations.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.pastCard}
                  onPress={() =>
                    navigation.navigate("PostAppointmentScreen", {
                      appointment: item,
                    })
                  }
                >
                  <View style={styles.pastCardHeader}>
                    <Text style={styles.pastDateText}>
                      {formatShortDate(item.appointmentDate)}
                    </Text>

                    <Ionicons
                      name="checkmark-circle"
                      size={18}
                      color="#059669"
                    />
                  </View>

                  <Text style={styles.pastRecord}>{item.clinic.name}</Text>

                  <View style={styles.divider} />

                  <Text style={styles.pastDiagnosis} numberOfLines={2}>
                    <Text
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      Diag:{" "}
                    </Text>

                    {item.diagnosis}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ScrollView>

        {/* =========================
            TAB BAR
        ========================= */}

        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="home" size={24} color="#0056b3" />

            <Text style={[styles.tabText, { color: "#0056b3" }]}>Início</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="people-outline" size={24} color="#8e9aaf" />

            <Text style={styles.tabText}>Pacientes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabItem}>
            <Ionicons
              name="add-circle"
              size={42}
              color="#eb9a22"
              style={styles.fabIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="calendar-outline" size={24} color="#8e9aaf" />

            <Text style={styles.tabText}>Agenda</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="person-outline" size={24} color="#8e9aaf" />

            <Text style={styles.tabText}>Perfil</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  // =========================
  // CONTAINER
  // =========================

  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // =========================
  // HEADER
  // =========================

  header: {
    backgroundColor: "#eb9a22",
    padding: 30,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: "column",
    gap:15
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },

  profileText: {
    marginLeft: 15,
  },

  welcomeTitle: {
    fontSize: 16,
    color: "#FFF",
    opacity: 0.9,
  },

  vetName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 2,
  },

  vetInfo: {
    fontSize: 14,
    color: "#FFF",
    opacity: 0.8,
    marginTop: 2,
  },

  // =========================
  // CONTENT
  // =========================

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  // =========================
  // ACESSO RÁPIDO
  // =========================

  quickAccessRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -5,
  },

  quickAccessCard: {
    backgroundColor: "white",
    width: "100%",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  quickAccessText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
    color: "#1A3258",
    textAlign: "center",
  },

  // =========================
  // TÍTULOS
  // =========================

  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 15,
   
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A3258",
    marginRight: 10,
  },

  countBadge: {
    backgroundColor: "#EFF6FF",
    color: "#3182CE",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    fontSize: 12,
    fontWeight: "bold",
    overflow: "hidden",
  },

  // =========================
  // CONTAINER DO CARD
  // =========================

  upcomingCardContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    marginBottom: 12,

    elevation: 2,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,

    overflow: "hidden",
    borderLeftWidth: 4,
    borderLeftColor: "#3182CE",
  },

  // =========================
  // CARD DA CONSULTA
  // =========================

  upcomingCard: {
    backgroundColor: "white",
    padding: 16,
    flexDirection: "row",
  },

  dateContainer: {
    backgroundColor: "#F1F5F9",
    padding: 10,
    borderRadius: 10,
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: 60,
  },

  dateText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#3182CE",
    marginTop: 4,
  },

  appointmentInfo: {
    flex: 1,
    justifyContent: "center",
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },

  appointmentType: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    flex: 1,
  },

  recordBadge: {
    fontSize: 11,
    backgroundColor: "#F3F4F6",
    color: "#6B7280",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: "hidden",
  },

  symptomsText: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 6,
  },

  clinicInfoRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  clinicText: {
    fontSize: 12,
    color: "#94A3B8",
    marginLeft: 4,
    fontWeight: "500",
  },

  // =========================
  // BOTÃO CANCELAR
  // =========================

  cancelButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",

    paddingHorizontal: 10,
    paddingVertical: 7,

    marginRight: 12,
    marginBottom: 10,

    borderRadius: 8,
    backgroundColor: "#FEF2F2",
  },

  cancelButtonText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "600",
    color: "#DC2626",
  },

  // =========================
  // HISTÓRICO
  // =========================

  horizontalScroll: {
    paddingVertical: 20,
    marginTop: 20,
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },

  pastCard: {
    backgroundColor: "white",
    width: 180,
    padding: 15,
    borderRadius: 15,
    marginRight: 12,

    elevation: 2,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },

  pastCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  pastDateText: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "bold",
  },

  pastType: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1F2937",
  },

  pastRecord: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 2,
  },

  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 10,
  },

  pastDiagnosis: {
    fontSize: 13,
    color: "#475569",
  },

  // =========================
  // TAB BAR
  // =========================

  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    paddingVertical: 10,

    borderTopWidth: 1,
    borderTopColor: "#EDF2F7",

    backgroundColor: "white",

    paddingBottom: 20,
  },

  tabItem: {
    alignItems: "center",
    flex: 1,
  },

  tabText: {
    fontSize: 10,
    color: "#8e9aaf",
    marginTop: 2,
  },

  fabIcon: {
    marginTop: -25,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    width: 100,
  },

  logoutText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "bold",
    color: "#1F2937",
  },
});
