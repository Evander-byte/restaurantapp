import React, { Fragment, useContext, useEffect } from 'react'
import { View, ScrollView, Text, Image, StyleSheet } from 'react-native'
import FirebaseContext from '../context/firebase/firebaseContext'
import globalStyles from '../styles/global'

const Menu = () => {

  //Context of firebase
  const {
    menu,
    getProducts
  }
  = useContext(FirebaseContext)

  useEffect(() => {
    getProducts()
  }, [])


  return (
    <ScrollView style={styles.container}>
        {menu.map(dish => {
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
              <View style={styles.itemContainer}>
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
              </View>
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
  }
})

export default Menu