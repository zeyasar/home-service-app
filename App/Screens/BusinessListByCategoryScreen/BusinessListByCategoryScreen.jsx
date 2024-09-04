import { View, Text, StyleSheet, TouchableOpacity, FlatList,Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import GlobalApi from "../../Utils/GlobalApi";
import BusinessListItem from "./BusinessListItem";
import image from '../../../assets/images/portrait.png'

export default function BusinessListByCategoryScreen() {
  const navigation = useNavigation();
  const param = useRoute().params;
  const [businessList, setBusinessList] = useState([]);

  const getBusinessListByCategory = () => {
    GlobalApi.getBusinessListByCategory(param.category).then((resp) => {
      setBusinessList(resp?.businessLists);
      // console.log(resp?.businessLists)
    });
  };

  useEffect(() => {
    param && getBusinessListByCategory();
  }, [param]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>{param?.category}</Text>
      </View>
      {
        businessList?.length > 0 ? (
          <FlatList
            data={businessList}
            renderItem={({item})=>(
              <BusinessListItem business={item}/>
             )}
          />
        ) : (
          <View style={{ height:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontFamily:'Outfit-medium', fontSize:20}}>Oooops! We cant find that business.</Text>
            <Image source={image} style={{height:'50%', width:'50%'}}/>
          </View>
        )
      }
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 30,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  header: {
    fontSize: 25,
    fontFamily: "Outfit-medium",
  },
});
