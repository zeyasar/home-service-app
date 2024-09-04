import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View , Dimensions} from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../Utils/GlobalApi'
import Heading from '../../components/Heading';

const {width} = Dimensions.get('window')

export default function Slider() {

    const [slider, setSlider] = useState([]);
    // console.log(slider)

    const getSliders =()=>{
        GlobalApi.getSlider().then(resp=>{
            // console.log("resp", resp)
            setSlider(resp?.sliders)
        })
    }

    useEffect(()=>{
        getSliders()
    }, [])

  return (
    <View>
      <Heading text='Offers For You'/>
      <FlatList
        data={slider}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index})=>(
          <TouchableOpacity style={{marginRight:20}}>
            <View style={{marginTop:10}}>
              <Image source={{uri:item?.image?.url}} style={styles.sliderImage}/>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  sliderImage:{
    width:width*0.8,
    height:150,
    borderRadius:20
  }
})