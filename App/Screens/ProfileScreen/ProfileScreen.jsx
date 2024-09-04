import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
  SafeAreaView
} from "react-native";
import React from "react";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";
import { useAuth } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";


export default function ProfileScreen() {
  const { user } = useUser();

  const navigation = useNavigation()

  
    const { signOut } = useAuth();

    const handleEmailPress = () => {
      const email = 'mailto:someone@example.com'; // E-posta adresini belirleyin
      Linking.openURL(email);
    };
 

  const profileMenu = [
    {
      id: 1,
      name: "Home",
      icon: "home",
      route:'Home'
    },
    {
      id: 2,
      name: "My Booking",
      icon: "bookmark-sharp",
      route:'booking'
    },
    {
      id: 3,
      name: "Contact Us",
      icon: "mail",
      route:''
    },
    {
      id: 4,
      name: "Logout",
      icon: "log-out",
      route:''
    },
  ];

  const renderItem=({item})=>{
    return(
      <View style={styles.card}>
      <View style={styles.leftContent}>
        <Ionicons name={item.icon} size={32} color="#8E3FFF" />
        <Text style={styles.cardHeader}>{item.name}</Text>
        </View>
        <TouchableOpacity style={{marginRight:8}} 
       onPress={() => {
          if (item.name === 'Contact Us') {
            handleEmailPress();
          } else if (item.name === "Logout") {
            signOut();
          } else {
            navigation.navigate(`${item.route}`);
          }
        }}
        >
        <FontAwesome5 name="arrow-right" size={24} color="#8E3FFF" />
        </TouchableOpacity>
        
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
    {/* <StatusBar backgroundColor="rgba(0, 0, 0, 0)" translucent={true} /> */}
      <View>
        <ImageBackground
          source={require("../../../assets/images/gradient-bg.jpeg")}
          resizeMode="cover"
          style={styles.bgImage}
        >
          <Text style={styles.header}>Profile</Text>
        </ImageBackground>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: user.imageUrl }} style={styles.avatar} />
        </View>
      </View>
      <View>
        <Text style={styles.name}>{user.fullName}</Text>
        <Text style={styles.email}>{user.primaryEmailAddress.emailAddress}</Text>
      </View>
      <View style={{margin:20}}>
        <FlatList
          data={profileMenu}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
  },
  header: {
    color: "white",
    fontFamily: "Outfit-medium",
    fontSize: 25,
    padding: 20,
  },
  bgImage: {
    width: "100%",
    height: 200,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 99,
  },
  avatarContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'white',
    padding:6,
    
    width:100,
    borderRadius:99,
    marginTop: -50,
    alignSelf:'center'
  },
  name:{
    fontFamily:'Outfit-medium',
    fontSize:22,
    textTransform:'capitalize',
    textAlign:'center',
    marginTop:12,
  },
  email:{
    fontFamily:'Outfit',
    fontSize:18,
    textAlign:'center',
    marginTop:8,
    color:'#858585'
  },
  card:{
    borderWidth:0.5,
    borderColor:'#858585',
    borderRadius:16,
    padding:16,
    marginVertical:8,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  leftContent:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:16
  },
  cardHeader:{
    fontFamily:'Outfit',
    fontSize:18,
    color:'#858585'
  }

});
