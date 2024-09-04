import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from '@expo/vector-icons';


export default function BookingItem({ bookingItem }) {
//   console.log(bookingItem?.businessList?.images[0].url);
const getStatusStyle = (status) => {
    switch (status) {
      case 'Booked':
        return {
          backgroundColor: '#ecdcf7',
        };
      case 'Completed':
        return {
          backgroundColor: '#C2FFE3',
        };
      case 'Canceled':
        return {
          backgroundColor: '#FFA69E',
        };
      default:
        return {
          backgroundColor: '#ecdcf7',
        };
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
      <Text style={styles.fullName}>{bookingItem?.businessList?.contactPerson}</Text>
          <Text style={styles.businessName} >{bookingItem?.businessList?.name}</Text>
          
          <Text style={[styles.status, getStatusStyle(bookingItem?.bookingStatus)]}>{bookingItem?.bookingStatus}</Text>
          <Text style={styles.date}>
            <AntDesign name="calendar" size={14} color="#8E3FFF" />{"  "}
            {bookingItem?.date}
          </Text>
          <Text style={styles.date}>
            <AntDesign name="clockcircleo" size={14} color="#8E3FFF" />{"  "}
            {bookingItem?.time}
          </Text>
          <Text numberOfLines={2} style={{fontFamily:'Outfit'}}>&#9998; {bookingItem?.userNote}</Text>
      </View>
      <View style={{alignSelf:'center'}}>
        <Image 
        source={{uri:bookingItem?.businessList?.images[0].url}}
            style={{width:150, height:150, borderRadius:16}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        padding:20,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'white',
        marginBottom:20,
        borderRadius:16
    },
    infoContainer:{
        display:'flex',
        gap:4
    },
    date: {
        fontFamily: "Outfit",
        fontSize: 14,
        color: "#858585",
    },
    fullName:{
        fontFamily:'Outfit',
        fontSize:14,
        color:'#858585'
    },
      businessName:{
        fontFamily:'Outfit-medium',
        fontSize:20
    },
    status:{
        fontFamily:'Outfit',
        fontSize:12,
        padding:3,
        color:'black',
        borderRadius:3,
        alignSelf:'flex-start',
        paddingHorizontal:7,
        marginVertical:6
    },
});
