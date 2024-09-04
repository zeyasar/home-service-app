import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function BusinessListItem({ business }) {

  const navigation = useNavigation()

  return (
    <TouchableOpacity style={styles.container} onPress={()=>navigation.push('BusinessDetails', {business:business})}>
      <Image
        source={{ uri: business?.images[0]?.url }}
        style={{ width: 100, height: 100, borderRadius: 8 }}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.fullName}>{business.contactPerson}</Text>
        <Text style={styles.businessName}>{business.name}</Text>
        <Text style={styles.adress}><Feather name="map-pin" size={20} color="#8E3FFF" />  {business.adress}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    display:'flex',
    flexDirection:'row',
    gap:20,
    marginTop:15
  },
  fullName:{
    fontFamily:'Outfit',
    fontSize:14,
    color:'#858585'
  },
  businessName:{
    fontFamily:'Outfit-medium',
    fontSize:17
  },
  adress:{
    fontFamily:'Outfit',
    color:'#858585'
  },
  infoContainer:{
    display:'flex',
    gap:10
  }
});
