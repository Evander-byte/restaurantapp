import React, { useContext, useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import OrderContext from '../context/orders/ordersContext'
import { useNavigation } from '@react-navigation/native'
import firebase from '../firebase'
import globalStyles from '../styles/global'
import Countdown from 'react-countdown'


const ProgressOrder = () => {
  
  const {
    idorder,
    order
  } = useContext(OrderContext)

  const [time, setTime] = useState(0)
  const [completed, setCompleted] = useState(false)


  const navigation = useNavigation()
  useEffect(() => {
    const getProduct = () => {
      firebase.db.collection('orders')
                 .doc(idorder)
                 .onSnapshot(
                    function(doc){
                      setTime(doc.data().deliveryTime)
                      setCompleted(doc.data().complete)
                    }
                 )
    }
    getProduct()
  }, [])

  const setColor = num => {
    let color = ''
    if(num < 10)
      color = 'green'
    else if(num < 15)
      color = 'blue'
    else
      color = 'red'
    return color
  }

  const renderer = ({minutes, seconds}) => {
    return(
      <Text style={[globalStyles.titles, {color: setColor(minutes)}]}>{minutes}:{seconds}</Text>
    )
  }
  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.content}>
        {time === 0 && (
          <>
            <Text style={globalStyles.titles}>We've your order</Text>
            <Text style={globalStyles.titles}>We are doing define a estimate time to delivery</Text>
          </>
        )}
        {time > 0 && !completed && (
          <View>
            <Text style={globalStyles.titles}>Your order will be ready in...
            </Text>
            <Text style={[globalStyles.titles, {color: 'red'}]}>
              <Countdown
                date={Date.now() + time * 60000}
                renderer={renderer}
              />
            </Text>
          </View>
        )}
        {completed && (
          <View>
            <Text style={globalStyles.titles}>Your order was done!</Text>
            <Text style={globalStyles.titles}>You can pickup at the store</Text>
            <Pressable 
              style={globalStyles.button}
              onPress={() => navigation.navigate('NewOrder')}
            >
              <Text style={globalStyles.buttonText}>Start a new Order</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  )
}

export default ProgressOrder