import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface BackButtonProps {
  goBackTo?: string;
  params?: Record<string, any>;
  label?: string;
}

export default function BackButton({
  goBackTo,
  params,
  label = "Voltar",
}: BackButtonProps) {
  const navigation = useNavigation<any>();

  const handleBack = () => {
    if (goBackTo) {
      navigation.navigate(goBackTo, params);
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleBack}
      activeOpacity={0.7}
    >
      <Ionicons
        name="arrow-back"
        size={24}
        color="#2D3436"
      />

      <Text style={styles.label}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },

  label: {
    marginLeft: 6,
    fontSize: 16,
    color: "#2D3436",
  },
});

