import React, { useContext } from 'react'
import { Text, View, Image, StyleSheet, Pressable } from 'react-native'
import OrderContext from '../context/orders/ordersContext'
import globalStyles from '../styles/global'
import { useNavigation } from '@react-navigation/native'


const Detail = () => {

  //Properties of OrderContext
  const {
    dish
  } = useContext(OrderContext)

  const {name, price, photo, description} = dish

  //Redirect
  const navigation = useNavigation()
  return (
    <View>
        <Text style={globalStyles.titles}>{name}</Text>
        <Image
          style={styles.image}
          source={{uri:photo}}
        />
        <Text style={{ marginTop: 20, marginHorizontal: 20}}>{description}</Text>
        <Text style={globalStyles.amount}>Price: ${price}</Text>
        <Pressable
          style={globalStyles.button}
          onPress={() => navigation.navigate('FormDish')}
        >
          <Text style={globalStyles.buttonText}>Order Dish</Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  image:{
    height: 300,
    width: '100%'
  },
  
})

export default Detail