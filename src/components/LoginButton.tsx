import React, { useState } from "react";
import {  Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type LoginButtonProps = {
  text: string;
  icon: keyof typeof Ionicons.glyphMap;
  selected: boolean;
  onPress: () => void;
};

export default function LoginButton({
  text,
  icon,
  selected,
  onPress,
}: LoginButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.roleCard, selected && styles.selectedCard]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={32} color={selected ? "#FFF" : "#eb9a22"} />

      <Text style={[styles.roleText, selected && styles.selectedText]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  roleCard: {
    width: "48%",
    height: 120,
    backgroundColor: "#FFF",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    
  },

  selectedCard: {
    backgroundColor: "#eb9a22",
    borderColor: "#eb9a22",
  },

  roleText: {
    marginTop: 10,
    fontWeight: "600",
    color: "#4B5563",
  },

  selectedText: {
    color: "#FFF",
  },
});
