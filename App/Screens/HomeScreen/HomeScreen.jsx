import { View, StyleSheet, ScrollView } from "react-native";
import React from "react";
import Header from "./Header";
import Slider from "./Slider";
import Categories from "./Categories";
import BusinessList from "./BusinessList";

export default function HomeScreen() {
  return (
   
      <ScrollView stickyHeaderIndices={[0]}>
        <Header />

        <View style={{ padding: 20 }}>
          <Slider />
          <Categories />
          <BusinessList />
        </View>
      </ScrollView>
    
  );
}

const styles = StyleSheet.create({});
