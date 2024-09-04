import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { FontAwesome } from '@expo/vector-icons'; 

export default function Header() {
  const { user, isLoading } = useUser();

  return (
    user && (
      <View style={styles.container}>
        <View style={styles.profileMainContainer}>
          <View style={styles.profileContainer}>
            <Image source={{ uri: user?.imageUrl }} style={styles.userImage} />
            <View>
              <Text style={{ color: "white" }}>Welcome, </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  textTransform: "capitalize",
                  fontFamily:'Outfit'
                }}
              >
                {user?.fullName}
              </Text>
            </View>
          </View>
          <FontAwesome name="bookmark-o" size={32} color={'white'} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Search" style={styles.textInput}/>
          <FontAwesome name="search" size={24} color={'grey'} style={styles.searchIcon}/>
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 99,
  },
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#8E3FFF",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  profileContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profileMainContainer:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'space-between',
  },
  inputContainer:{
    marginTop:20,
    display:"flex",
    flexDirection:"row",
    justifyContent:'space-between',
  },
  textInput:{
    padding:10,
    backgroundColor:'white',
    borderRadius:10,
    width:'85%'
  },
  searchIcon:{
    padding:10,
    backgroundColor:'white',
    borderRadius:10,
   
  },
});
