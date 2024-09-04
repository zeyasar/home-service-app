import {
  Image,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons, Feather } from "@expo/vector-icons";
import BusinessPhotos from "./BusinessPhotos";
import BookingModal from "./BookingModal";

export default function BusinessDetailsScreen() {
  const [isReadMore, setIsReadMore] = useState(false);
  const [showModal, setShowModal] = useState(false)

  const param = useRoute().params;
  // console.log(param.business);
  const navigation = useNavigation();

  const handleMessagePress = () => {
    const email = 'mailto:someone@example.com'; // E-posta adresini belirleyin
    Linking.openURL(email);
  };

  return (
    <View>
      <ScrollView style={{ height: "93%" }}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-outline" size={30} color="#ededed" />
        </TouchableOpacity>
        <Image
          source={{ uri: param?.business?.images[0]?.url }}
          style={{ width: "100%", height: 300 }}
        />
        <View style={styles.infoContainer}>
          <View style={styles.subContainer}>
            <Text style={styles.name}>{param?.business?.name}</Text>
            <Text style={styles.categoryName}>
              {param?.business?.category?.name}
            </Text>
          </View>

          <Text style={styles.contactName}>
            {param?.business?.contactPerson}
          </Text>
          <Text style={styles.adress}>
            <Feather name="map-pin" size={16} color="#8E3FFF" />{" "}
            {param?.business?.adress}
          </Text>
          <View style={styles.divider}></View>
          <Text style={styles.about} numberOfLines={isReadMore ? 20 : 4}>
            {param?.business?.about}
          </Text>
          <TouchableOpacity onPress={() => setIsReadMore(!isReadMore)}>
            <Text style={styles.readMoreButton}>
              {isReadMore ? "Read Less" : "Read More"}
            </Text>
          </TouchableOpacity>
          <View style={styles.divider}></View>
          <BusinessPhotos business={param?.business} />
        </View>
      </ScrollView>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.bottomBtnLeft} onPress={()=>handleMessagePress()}>
          <Text style={styles.btnTextLeft}>Message </Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.bottomBtnRight}
        onPress={()=>setShowModal(true)}
        >
          <Text style={styles.btnTextRight}>Book Now </Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        visible={showModal}
      >
        <BookingModal businessId={param?.business?.id} setShowModal={setShowModal}/>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    position: "absolute",
    zIndex: 10,
    padding: 20,
  },
  infoContainer: {
    padding: 20,
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  divider: {
    width: "40%",
    borderWidth: 1,
    borderColor: "#8E3FFF",
    marginVertical: 20,
  },
  about: {
    fontFamily: "Outfit",
    fontSize: 16,
    lineHeight: 28,
    color: "#858585",
    textAlign: "justify",
  },
  readMoreButton: {
    fontFamily: "Outfit",
    color: "#8E3FFF",
    fontSize: 16,
    marginTop: 8,
  },
  categoryName: {
    fontFamily: "Outfit",
    fontSize: 12,
    paddingVertical: 3,
    color: "#8E3FFF",
    backgroundColor: "#ecdcf7",
    borderRadius: 3,
    alignSelf: "flex-start",
    paddingHorizontal: 7,
  },
  name: {
    fontFamily: "Outfit-bold",
    fontSize: 24,
  },
  contactName: {
    fontFamily: "Outfit",
    fontSize: 16,
    color: "#8E3FFF",
    marginBottom: 4,
  },
  adress: {
    fontFamily: "Outfit",
    fontSize: 14,
    color: "#858585",
  },
  bottomBtnLeft:{
    backgroundColor:'white',
    paddingHorizontal:16,
    paddingVertical:8,
    borderRadius:99,
    borderWidth:1,
    borderColor:"#8E3FFF",
    flex:1
  },
  bottomBtnRight:{
    backgroundColor:"#8E3FFF",
    paddingHorizontal:16,
    paddingVertical:8,
    borderRadius:99,
    borderWidth:1,
    borderColor:"#8E3FFF",
    flex:1
  },
  btnContainer:{
    display:'flex',
    flexDirection:'row',
    margin:5,
    gap:5
  },
  btnTextLeft:{
    fontFamily:'Outfit',
    textAlign:'center',
    fontSize:18,
    color:'#8E3FFF'
  },
  btnTextRight:{
    fontFamily:'Outfit',
    textAlign:'center',
    fontSize:18,
    color:'white'
  }
});
