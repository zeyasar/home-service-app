import { FlatList, StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import Heading from '../../components/Heading'
import GlobalApi from '../../Utils/GlobalApi'
import BusinessListItemSmall from './BusinessListItemSmall';

export default function BusinessList() {

    const [businessList, setBusinessList] = useState([]);
    const [showAll, setShowAll] = useState(false);

    const getBusinessList =()=>{
        GlobalApi.getBusinessList().then(resp=>{
            setBusinessList(resp?.businessLists)
        })
    }

    useEffect(() => {
     getBusinessList()
    }, [])
    
    const maxItemCount = showAll ? businessList.length : 3;

    const renderItem = ({ item, index }) => {
      if (index < maxItemCount) {
        return (
          <View style={{marginRight:10}}>
            <TouchableOpacity >
            <BusinessListItemSmall business={item} />
            </TouchableOpacity>
          </View>
        );
      }
      return null;
    };

    const handleViewAllPress = () => {
        setShowAll(!showAll);
      };

  return (
    <View style={{ marginTop: 20 }}>
      <Heading text='Latest Business'  isViewAll={true} onPressViewAll={handleViewAllPress} />
      <FlatList
        data={businessList}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        
      />
    </View>
  )
}

const styles = StyleSheet.create({})