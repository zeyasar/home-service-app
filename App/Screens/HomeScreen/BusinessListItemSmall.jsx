import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function BusinessListItemSmall({business}) {
    const navigation = useNavigation()
  return (
    <TouchableOpacity style={styles.container} onPress={()=> navigation.push('BusinessDetails', {business:business})}>
      <Image source={{uri:business?.images[0]?.url}} style={styles.image}/>
      <View style={styles.infoContainer}>
      <Text style={styles.name}>{business?.name}</Text>
      <Text style={styles.contactName}>{business?.contactPerson}</Text>
      <Text style={styles.categoryName}>{business?.category?.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    image:{
        width:160,
        height:100,
        borderRadius:10,
    },
    container:{
        padding:10,
        backgroundColor:'white',
        borderRadius:10,
    },
    name:{
        fontFamily:'Outfit-medium',
        fontSize:17,
        marginTop:5
    },
    contactName:{
        fontFamily:'Outfit',
        fontSize:13,
        color:'#858585'
    },
    categoryName:{
        fontFamily:'Outfit',
        fontSize:10,
        padding:3,
        color:'#8E3FFF',
        backgroundColor:'#ecdcf7',
        borderRadius:3,
        alignSelf:'flex-start',
        paddingHorizontal:7,
    },
    infoContainer:{
        padding:7,
        display:'flex',
        gap:3
    }
})