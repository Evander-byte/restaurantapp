import React, { Fragment, useContext, useEffect } from 'react'
import { View, ScrollView, Text, Image, StyleSheet, Pressable } from 'react-native'
import FirebaseContext from '../context/firebase/firebaseContext'
import OrderContext from '../context/orders/ordersContext'
import { useNavigation } from '@react-navigation/native'

const Menu = () => {

  //Context of firebase
  const {
    menu,
    getProducts
  }
  = useContext(FirebaseContext)

  //Context of order
  const {
    selectDish
  } = useContext(OrderContext)

  //Navigation
  const navigation = useNavigation()

  useEffect(() => {
    getProducts()
  }, [])

  const showHeading = (category, i) => {
    if(i > 0){
      const lastCategory = menu[i-1].category
      if(lastCategory !== category){
        return (
          <View style={styles.separator}>
            <Text style={styles.separatorText}>{category}</Text>
          </View>
        )
      }
    } else {
      return(
        <View style={styles.separator}>
        <Text style={styles.separatorText}>{category}</Text>
      </View>
      )
    }
  }

  return (
    <ScrollView style={styles.container}>
        {menu.map((dish, i) => {
          const {
            id,
            name,
            price,
            photo,
            category,
            description
          } = dish
          return (
            <Fragment
              key={id}
            >
              {showHeading(category, i)}
              <Pressable 
                style={styles.itemContainer}
                onLongPress={() => {
                  //Delete properties on the dish
                  const { avalible, ...dish2 } = dish
                  selectDish(dish2)
                  navigation.navigate('DishDetail')
                }}
              >
                <View>
                  <Image 
                    style={styles.image}
                    source={{uri: photo}}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{name}</Text>
                  <Text style={styles.description}>{description}</Text>
                  <Text style={styles.description}>${price}</Text>
                </View>
              </Pressable>
            </Fragment>
          )
        })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  itemContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    border: 'blue',
    overflow: 'hidden',
    backgroundColor: '#FFFF',
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  textContainer: {
    padding: 10
  },
  separator: {
    backgroundColor: '#000'
  },
  separatorText: {
    color: '#FFDA00',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
})

export default Menu