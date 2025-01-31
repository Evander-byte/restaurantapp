import React, { useContext, useEffect } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import OrderContext from '../context/orders/ordersContext'
import globalStyles from '../styles/global'
import { useNavigation } from '@react-navigation/native'

const SummaryOrder = () => {

  const { 
    order,
    total,
    showSummary 
  } = useContext(OrderContext) 

  const navigation = useNavigation()

  useEffect(() => {
    calculateTotal()
  }, [order])

  const calculateTotal = () => {
    let newTotal = 0
    newTotal = order.reduce((newTotal, article) => newTotal + article.total, 0)
    showSummary(newTotal)
  }
  return (
    <ScrollView 
      style={globalStyles.container}
    >
      <View
        style={globalStyles.content}
      >
        <Text style={globalStyles.titles}>A sumarry of your orders</Text>
        {order.map((dish, i) => {
          const {
            quantity,
            name,
            photo,
            id, 
            price
          } = dish
          return(
            <View
              key={id + i}
              style={styles.flex}
            >
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={{uri: photo}}
                />
              </View>
              <View
                style={styles.textContainer}
              >
                <Text>{name}</Text>
                <Text>Quantity: {quantity}</Text>
                <Text>Unit price: ${price}</Text>
                <Text style={styles.subtotalText}>Subtotal: ${quantity * price}</Text>
              </View>
            </View>
          )
        })}
      </View>
      <Text style={globalStyles.amount}>Total to pay: ${total}</Text>
      <Pressable
        style={globalStyles.button}
        onPress={() => navigation.navigate('Menu')}
      >
        <Text
          style={globalStyles.buttonText}
        >Continue Ordering</Text>
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: '#FFFF',
    borderRadius: 10,
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  imageContainer: {
    width: '50%'
  },
  image: {
    height: 150,
    width: '100%',
    resizeMode: 'contain',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  textContainer: {
    padding: 10,
  },
  subtotalText: {
    fontWeight: 'bold',
    fontSize: 15
  }
  
})

export default SummaryOrder