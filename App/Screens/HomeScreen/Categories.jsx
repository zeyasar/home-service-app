import React, { useState, useEffect } from 'react';
import { View, Image, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import GlobalApi from '../../Utils/GlobalApi';
import Heading from '../../components/Heading';
import { useNavigation } from '@react-navigation/native';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const navigation = useNavigation()

  const getCategories = () => {
    GlobalApi.getCategories().then(resp => {
      setCategories(resp?.categories);
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const maxItemCount = showAll ? categories.length : 4;

  const renderItem = ({ item, index }) => {
    if (index < maxItemCount) {
      return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.iconContainer} onPress={()=>navigation.push('BusinessListByCategory', {category:item?.name})}>
            <Image 
              source={{ uri: item?.icon?.url }}
              style={{ width: 30, height: 30 }}
            />
            
          </TouchableOpacity>
          <Text>{item?.name}</Text>
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
      <Heading text='Categories' isViewAll={true} onPressViewAll={handleViewAllPress} />
      <FlatList
        data={categories}
        numColumns={4}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        // columnWrapperStyle={{ gap:30 }}
        contentContainerStyle={{gap:8}}
       
      />
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: '#ededed',
    padding: 17,
    borderRadius: 99,
  },
  container: {
    flex: 1,
    alignItems: 'center',

  },
});
