import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

// Dados mockados
const upcomingConsultations = [
  { id: 1, idMedicalRecord: 101, idVeterinarian: 5, consultationType: "Vacina", idClinic: 2, consultationDate: "2026-05-18", symptoms: "Falta de apetite e cansaço", diagnosis: "Infecção intestinal leve", observations: "Iniciado tratamento com antibiótico veterinário e repouso.", attachment: null },
  { id: 2, idMedicalRecord: 101, idVeterinarian: 3, consultationType: "Check-up Anual", idClinic: 1, consultationDate: "2026-03-10", symptoms: "Coceira intensa e irritação na pele", diagnosis: "Dermatite alérgica", observations: "Uso de shampoo dermatológico recomendado por 30 dias.", attachment: null },
  { id: 3, idMedicalRecord: 101, idVeterinarian: 8, consultationType: "Hemograma Completo", idClinic: 4, consultationDate: "2025-12-02", symptoms: "Dificuldade para caminhar", diagnosis: "Inflamação nas articulações", observations: "Iniciado tratamento anti-inflamatório.", attachment: null }
];

const pastConsultations = [
  { id: 101, idMedicalRecord: 1, idVeterinarian: 5, consultationType: "Consulta Clínica", consultationDate: "2026-05-12", symptoms: "Falta de apetite e cansaço", diagnosis: "Infecção intestinal leve", observations: "Repouso e hidratação por 5 dias.", attachment: null },
  { id: 102, idMedicalRecord: 1, idVeterinarian: 3, consultationType: "Vacinação", consultationDate: "2026-04-20", symptoms: "Vacinação anual", diagnosis: "Pet saudável", observations: "Aplicada vacina V10.", attachment: null },
  { id: 103, idMedicalRecord: 1, idVeterinarian: 8, consultationType: "Dermatologia", consultationDate: "2026-03-15", symptoms: "Coceira intensa e queda de pelos", diagnosis: "Dermatite alérgica", observations: "Uso de shampoo terapêutico.", attachment: null },
  { id: 104, idMedicalRecord: 1, idVeterinarian: 6, consultationType: "Ortopedia", consultationDate: "2026-02-08", symptoms: "Dificuldade para caminhar", diagnosis: "Inflamação articular", observations: "Iniciado tratamento anti-inflamatório.", attachment: null },
  { id: 105, idMedicalRecord: 1, idVeterinarian: 4, consultationType: "Retorno", consultationDate: "2026-01-18", symptoms: "Avaliação pós-tratamento", diagnosis: "Melhora significativa", observations: "Continuar medicação por mais 7 dias.", attachment: null }
];

export default function VetDashboardScreen({ navigation }: any) {
  
  const formatShortDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}`;
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.profileRow}>
              <View style={styles.avatarContainer}>
                <Text style={{ fontSize: 35 }}>👨‍⚕️</Text>
              </View>
              <View style={styles.profileText}>
                <Text style={styles.welcomeTitle}>Bom dia,</Text>
                <Text style={styles.vetName}>Dr. Guilherme</Text>
                <Text style={styles.vetInfo}>CRM-V 12345</Text>
              </View>
            </View>
          </View>

          <View style={styles.content}>
            
            {/* Acesso Rápido */}
            <View style={styles.quickAccessRow}>
              <TouchableOpacity onPress={()=> navigation.navigate("TutorsListScreen") } style={styles.quickAccessCard}>
                <Ionicons name="people" size={32} color="#eb9a22" />
                <Text style={styles.quickAccessText}>Tutores{'\n'}& Pets</Text>
              </TouchableOpacity>

            
            </View>

            {/* Consultas a Ocorrer */}
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Próximas Consultas</Text>

            </View>

            {upcomingConsultations.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.upcomingCard}
                // NAVEGAÇÃO ADICIONADA AQUI:
                onPress={() => navigation.navigate("AppointmentDetailsScreen", { appointment: item })}
              >
                <View style={styles.dateContainer}>
                  <Ionicons name="calendar-outline" size={18} color="#3182CE" />
                  <Text style={styles.dateText}>{formatShortDate(item.consultationDate)}</Text>
                </View>
                
                <View style={styles.appointmentInfo}>
                  <View style={styles.titleRow}>
                    <Text style={styles.appointmentType}>{item.consultationType}</Text>
                    <Text style={styles.recordBadge}>Pront. #{item.idMedicalRecord}</Text>
                  </View>
                  
                  <Text style={styles.symptomsText} numberOfLines={2}>
                    <Text style={{fontWeight: "bold", color: "#475569"}}>Motivo: </Text>
                    {item.symptoms}
                  </Text>

                  <View style={styles.clinicInfoRow}>
                    <Ionicons name="business" size={14} color="#94A3B8" />
                    <Text style={styles.clinicText}>Clínica {item.idClinic}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}

            {/* Histórico Recente */}
            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Últimos Atendimentos</Text>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              style={styles.horizontalScroll}
              contentContainerStyle={{ paddingRight: 20 }}
            >
              {pastConsultations.map((item) => (
                <TouchableOpacity // TROCADO DE VIEW PARA TOUCHABLEOPACITY AQUI
                  key={item.id} 
                  style={styles.pastCard}
                  // NAVEGAÇÃO ADICIONADA AQUI:
                  onPress={() => navigation.navigate("AppointmentDetailsScreen", { appointment: item })}
                >
                  <View style={styles.pastCardHeader}>
                    <Text style={styles.pastDateText}>{formatShortDate(item.consultationDate)}</Text>
                    <Ionicons name="checkmark-circle" size={18} color="#059669" />
                  </View>
                  
                  <Text style={styles.pastType}>{item.consultationType}</Text>
                  <Text style={styles.pastRecord}>Pront. #{item.idMedicalRecord}</Text>
                  
                  <View style={styles.divider} />
                  
                  <Text style={styles.pastDiagnosis} numberOfLines={2}>
                    <Text style={{fontWeight: "bold"}}>Diag: </Text>{item.diagnosis}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

          </View>
        </ScrollView>

        {/* Tab Bar do Veterinário */}
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
            <Ionicons name="add-circle" size={42} color="#eb9a22" style={styles.fabIcon} />
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
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    backgroundColor: "#eb9a22",
    padding: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
  content: {
    padding: 20,
    paddingBottom: 40,
  },
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
    shadowOffset: { width: 0, height: 2 },
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
  upcomingCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 16,
    flexDirection: "row",
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    borderLeftWidth: 4,
    borderLeftColor: "#3182CE",
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
  horizontalScroll: {
    marginTop: 15,
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
    shadowOffset: { width: 0, height: 2 },
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
  }
});