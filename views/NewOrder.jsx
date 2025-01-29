import React from 'react'
import { SafeAreaView, StyleSheet, View, Pressable, Text } from 'react-native'
import globalStyles from '../styles/global'
import { useNavigation } from '@react-navigation/native'



const NewOrder = () => {

  const navigation = useNavigation()
  return (
    <View style={globalStyles.container}>
      <View style={[globalStyles.content, styles.content]}>
        <Pressable
          style={globalStyles.button}
          onLongPress={() => navigation.navigate('Menu')}
        >
          <Text style={globalStyles.buttonText}>New Order</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    justifyContent: "center"
  }
})


export default NewOrder