import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AboutAppScreen({ navigation }: any) {
  // Substitua pelo hash de referência da versão publicada.
  const commitHash = "COLE_AQUI_O_HASH_DO_COMMIT";

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>‹ Voltar</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>P</Text>
        </View>

        <Text style={styles.title}>Sobre o ProntPet</Text>

        <Text style={styles.description}>
          O ProntPet ajuda tutores a cuidar da saúde dos seus
          animais, organizando consultas veterinárias e
          informações importantes em um só lugar.
        </Text>

        <View style={styles.infoCard}>
          <Text style={styles.label}>Aplicativo</Text>
          <Text style={styles.value}>ProntPet</Text>

          <View style={styles.divider} />

          <Text style={styles.label}>Versão</Text>
          <Text style={styles.value}>1.0.0</Text>

          <View style={styles.divider} />

          <Text style={styles.label}>
            Hash do commit de referência
          </Text>

          <Text selectable style={styles.hash}>
            {commitHash}
          </Text>
        </View>

        <Text style={styles.footer}>
          ProntPet © 2026
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backText: {
    fontSize: 16,
    color: "#E99A22",
    fontWeight: "600",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: "#E99A22",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "bold",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#263238",
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 23,
    color: "#657078",
    textAlign: "center",
    marginBottom: 28,
  },
  infoCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 20,
    elevation: 2,
  },
  label: {
    fontSize: 13,
    color: "#78838B",
    marginBottom: 6,
  },
  value: {
    fontSize: 17,
    color: "#263238",
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#E8ECEF",
    marginVertical: 16,
  },
  hash: {
    fontSize: 13,
    lineHeight: 21,
    color: "#263238",
  },
  footer: {
    marginTop: 28,
    marginBottom: 16,
    color: "#89939A",
    fontSize: 12,
  },
});