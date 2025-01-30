import React, { useContext, useEffect, useState } from 'react'
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import OrderContext from '../context/orders/ordersContext'
import globalStyles from '../styles/global'
import { useNavigation } from '@react-navigation/native'


const FormDish = () => {
  const [quantity, setQuantity] = useState(1)
  const [total, setTotal] = useState(0)

  const {
    dish,
    saveOrder
  } = useContext(OrderContext)
  const {
    name, 
    price
  } = dish

  const navigation = useNavigation()

  useEffect(() => {
    totalCalculated()
  }, [quantity])

  //calculate the total of the dish by the quantity
  const totalCalculated = () => {
    const totalPay = quantity * price
    setTotal(totalPay)
  }

  //local state for the quantity

  const decreaseOne = () => {
    if(quantity > 1){
      const newQuantity = parseInt(quantity) - 1
      setQuantity(newQuantity)
    }
    return
  }

  const increaseOne = () => {
     const newQuantity = parseInt(quantity) + 1
     setQuantity(newQuantity)
  }

  const orderConfirm = () => {
    Alert.alert(
      'Do you want to confirm this part of your order?',
      '',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            //Store the order in the general order
            const order = {
              ...dish,
              quantity,
              total
            }
            //Send to context the order
            saveOrder(order)
            //Navigate to summary
            navigation.navigate('SummaryOrder')
          }
        }
      ]
    )
  }

  return (
    <>
    <View>
      <Text style={globalStyles.titles}>Quantity</Text>
          <View style={styles.grid}>
            <Pressable
              style={[globalStyles.button, styles.button]}
              onPress={() => decreaseOne()}
            >
              <Text style={globalStyles.buttonText}>-</Text>
            </Pressable>
            <TextInput 
              style={styles.quantityText}
              value={quantity.toString()}
              onChangeText={quantity => setQuantity(quantity)}
              keyboardType='numeric'
            />
            <Pressable
              style={[globalStyles.button, styles.button]}
              onPress={() => increaseOne()}
            >
              <Text style={globalStyles.buttonText}>+</Text>
            </Pressable>
          </View>
    </View>
    <View>
      <Text style={globalStyles.amount}>Subtotal: ${total}</Text>
      <Pressable
        style={globalStyles.button}
        onPress={() => orderConfirm()}
      >
        <Text
          style={globalStyles.buttonText}
        >Add to order</Text>
      </Pressable>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    width: '20%',
    padding: 10
  },
  quantityText: {
    fontSize: 20
  }
})

export default FormDish