import React, { useContext, useEffect } from 'react'
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import OrderContext from '../context/orders/ordersContext'
import globalStyles from '../styles/global'
import { useNavigation } from '@react-navigation/native'
import firebase from '../firebase'


const SummaryOrder = () => {

  const { 
    order,
    total,
    showSummary,
    removeDish,
    orderPlaced 
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

  const confirmOrder = () => {
    Alert.alert(
      'Do you want confirm whole the order?',
      'A confirmed order cannot be canceled',
      [
        {
          text: 'Cancel'
        },
        {
          text: 'Confirm',
              onPress: async() => {

                //create a object
                const orderObj = {
                  deliveryTime: 0,
                  complete: false,
                  totalPay: Number(total),
                  order: order, //Array
                  createdAt: Date.now()
                }
                //Store in firebase
                try {
                  const order = await firebase.db.collection('orders').add(orderObj)
                  orderPlaced(order.id)
                } catch (error) {
                  console.log(error)
                }

                navigation.navigate('ProgressOrder')
              }
        }
      ]
    )
  }

  // Delete a dish on the order
  const deleteDish = id => {
    Alert.alert(
      'Do you want delete this dish on the order?',
      '',
      [
        {
          text: 'Cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            // Delete on the state and recalculate
            removeDish(id)
          }
        }
      ]
    )
  }

  return (
    <>
      <ScrollView 
          style={globalStyles.container}
        >
          <View>
            <View
              style={globalStyles.content}
            >
              <Text style={globalStyles.titles}>A sumarry of your orders</Text>
              <Pressable
              style={globalStyles.button}
              onPress={() => navigation.navigate('Menu')}
              >
                <Text
                  style={globalStyles.buttonText}
                >Continue Ordering</Text>
              </Pressable>
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
                      <Pressable
                        style={[globalStyles.button, {marginTop: 20}]}
                        onLongPress={() => deleteDish(id)}
                      >
                        <Text style={globalStyles.buttonText}>Delete</Text>
                      </Pressable>
                    </View>
                  </View>
                )
              })}
            </View>
            <Text style={globalStyles.amount}>Total to pay: ${total}</Text>
          </View>
      </ScrollView>
      <View style={styles.footerButton}>
        <Pressable
            style={[globalStyles.button, styles.button]}
            onPress={() => confirmOrder()}
          >
            <Text
              style={[globalStyles.buttonText, styles.buttonText]}
            >Confirm Order</Text>
        </Pressable>
      </View>
    </>
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
  },
  footerButton: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    bottom: 0
  },
  button: {
    backgroundColor: '#000',
    height: 80,
    width: '100%',
    marginHorizontal: 0,
    borderRadius: 0,
  },
  buttonText: {
    color: '#FFDA00',
    fontSize: 24
  }
  
})

export default SummaryOrder