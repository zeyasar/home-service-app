import { StyleSheet, Text, View, TouchableOpacity, ScrollView, KeyboardAvoidingView, TextInput, ToastAndroid } from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
import CalendarPicker from "react-native-calendar-picker";
import {Picker} from '@react-native-picker/picker';
import GlobalApi from "../../Utils/GlobalApi";
import { useUser } from "@clerk/clerk-expo";
import moment from 'moment';

export default function BookingModal({ setShowModal, businessId }) {

  const [timeList, setTimeList] = useState();
  const [getTimeCalled, setGetTimeCalled] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [note, setNote] = useState();

  const {user} = useUser()

  const getTime = useCallback(() => {
    const hours = [];
    for (let i = 8; i <= 20; i++) {
      const hour12 = i > 12 ? i - 12 : i;
      const amPm = i >= 12 ? 'PM' : 'AM';
      hours.push(`${hour12 === 0 ? 12 : hour12}:00 ${amPm}`);
      hours.push(`${hour12 === 0 ? 12 : hour12}:30 ${amPm}`);
    }
    setTimeList(hours);
  }, []);
  
// console.log(businessId)
  // const navigation = useNavigation();
  // console.log(selectedStartDate)


  const onDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  useEffect(() => {
    if (!getTimeCalled) {
      getTime();
      setGetTimeCalled(true);
    }
  }, [getTime, getTimeCalled]);
 

    const createNewBooking =()=>{
      if (!selectedTime || !selectedStartDate) {
        ToastAndroid.show('Please select date and time!', ToastAndroid.LONG)
        return 
        
      }
      const data ={
        userName:user?.fullName,
        userEmail:user?.primaryEmailAddress.emailAddress,
        time:selectedTime,
        date:moment(selectedStartDate).format('DD-MM-YYYY'),
        note:note,
        businessid:businessId
      }
      GlobalApi.createBooking(data).then(resp=>{
        ToastAndroid.show('Booking Created Successfully!', ToastAndroid.LONG)
        setShowModal(false)
      })
    }

  return (
    <ScrollView>
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => setShowModal(false)}>
          <Ionicons name="chevron-back-outline" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Booking</Text>
      </View>
      <Text style={styles.subHeader}>Pick a date</Text>
      <View style={styles.calenderContainer}>
        <CalendarPicker 
          onDateChange={onDateChange} 
          width={340} 
          minDate={Date.now()}
          todayBackgroundColor={'#858585'}
          todayTextStyle={{color:'white'}}
          selectedDayColor={'#8E3FFF'}
          selectedDayTextStyle={{color:'white'}}
        />
      </View>
      <View>
      <Text style={styles.subHeader}>Time Selection</Text>
      <Picker
          selectedValue={selectedTime}
          style={{ height: 50, width: 200 }}
          onValueChange={(itemValue, itemIndex) => handleTimeChange(itemValue)}
          dropdownIconColor={'#8E3FFF'}
          dropdownIconRippleColor={'#ecdcf7'}
        >
          {timeList && timeList.map((time, index) => (
            <Picker.Item key={index} label={time} value={time} style={{fontSize:20, fontFamily:'Outfit'}}/>
          ))}
        </Picker>
      </View>
      <View>
      <Text style={styles.subHeader}>What do we need to know?</Text>
      <TextInput 
        onChangeText={(text)=>setNote(text)}
        placeholder="Note"
        editable
        multiline
        numberOfLines={4}
        style={styles.noteInput}
        cursorColor={'#8E3FFF'}
      />
      </View>
      <TouchableOpacity style={{marginVertical:20}} onPress={()=>createNewBooking()}>
        <Text style={styles.confirmButton}>Confirm & Book</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
    </ScrollView>
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
  calenderContainer:{
    borderRadius:15,
    backgroundColor:'#ecdcf7',
    padding:20
  },
  subHeader:{
    fontSize: 20,
    fontFamily: "Outfit",
    marginBottom: 10,
    marginTop: 20,
    textAlign: "center",
  },
  noteInput:{
    padding:16,
    borderWidth:1,
    borderColor:'#ecdcf7',
    borderRadius:16,
    textAlignVertical:'top'
  },
  confirmButton:{
    textAlign:'center',
    fontFamily:"Outfit-medium",
    fontSize:20,
    backgroundColor:'#8E3FFF',
    color:'white',
    padding:16,
    borderRadius:99
  }
});
