import React from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  useRoute,
} from "@react-navigation/native";

export default function AppointmentDetailsScreen() {

  const route = useRoute<any>();

  const appointment = route.params?.appointment;

  return (

    <SafeAreaView style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        {/* HEADER */}

        <View style={styles.header}>

          <Text style={styles.title}>
            {appointment.consultationType}
          </Text>

          <Text style={styles.date}>
            {appointment.consultationDate}
          </Text>

        </View>

        {/* CARD */}

        <View style={styles.card}>

          <Text style={styles.label}>
            Sintomas
          </Text>

          <Text style={styles.content}>
            {appointment.symptoms}
          </Text>

        </View>

        <View style={styles.card}>

          <Text style={styles.label}>
            Diagnóstico
          </Text>

          <Text style={styles.content}>
            {appointment.diagnosis}
          </Text>

        </View>

        <View style={styles.card}>

          <Text style={styles.label}>
            Observações
          </Text>

          <Text style={styles.content}>
            {appointment.observations}
          </Text>

        </View>

        <View style={styles.card}>

          <Text style={styles.label}>
            Veterinário ID
          </Text>

          <Text style={styles.content}>
            #{appointment.idVeterinarian}
          </Text>

        </View>

      </ScrollView>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  header: {
    backgroundColor: "#eb9a22",
    padding: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1F2937",
  },

  date: {
    marginTop: 5,
    fontSize: 15,
    color: "#374151",
  },

  card: {
    backgroundColor: "white",

    marginHorizontal: 15,
    marginTop: 15,

    padding: 18,

    borderRadius: 18,

    elevation: 3,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#374151",
  },

  content: {
    fontSize: 15,
    color: "#6B7280",
    lineHeight: 22,
  },

});