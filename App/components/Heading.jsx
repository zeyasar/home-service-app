import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

export default function Heading({ text, isViewAll = false, onPressViewAll }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{text}</Text>
      {isViewAll && (
        <TouchableOpacity onPress={onPressViewAll}>
          <Text style={{ color: "#726E71" }}>View All</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontFamily: "Outfit-medium",
    fontSize: 18,
    marginBottom: 10,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
