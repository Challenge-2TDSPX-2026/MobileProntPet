import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";


type MainButton ={
    title: string,
    onPress: () => void;
}

export default function MainButton({title, onPress} : MainButton) {
  return (
    <TouchableOpacity
      style={styles.mainButton}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    mainButton: {
    backgroundColor: "#eb9a22",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#eb9a22",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
})