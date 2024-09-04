import { Text, StyleSheet, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import GlobalApi from '../../Utils/GlobalApi';
import { useUser } from '@clerk/clerk-expo';
import BookingItem from './BookingItem';

export default function BookingScreen() {

  const [bookingList, setBookingList] = useState([])
  const [loading, setLoading] = useState(false)

  const {user} = useUser()
  const userEmail = user.primaryEmailAddress.emailAddress

  const getUserBookings = () => {
    setLoading(true)
    GlobalApi.getBookingInformation(userEmail).then((resp) => {
      setBookingList(resp?.bookings);
      // console.log(bookingList)
    setLoading(false)
    });
  };

  useEffect(() => {
    user && getUserBookings()
  }, [user])
  

  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={<Text style={styles.header}>My Bookings</Text>}
      onRefresh={getUserBookings}
      refreshing={loading}
      data={bookingList}
      renderItem={({item})=>(
        <BookingItem bookingItem={item}/>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  )
}

const styles = StyleSheet.create({
  container:{
    padding:20
  },
  header:{
    fontSize: 20,
    fontFamily: "Outfit-medium",
    marginBottom:20
  }
})
