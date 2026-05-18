import React, { useState } from "react";
import { View, Text, StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SafeAreaProvider } from "react-native-safe-area-context";


type HeaderFormPros = {
  stepText: string  
  title: string;
  subtitle: string;
};

export default function HeaderForm({stepText, title, subtitle }: HeaderFormPros) {
  return (
    <View style={styles.header}>
      <Text style={styles.stepText}>{stepText}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { marginBottom: 22},
  stepText: {
    color: "#eb9a22",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 8,
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#111827" },
  subtitle: { fontSize: 14, color: "#6B7280", marginTop: 8 },
});
