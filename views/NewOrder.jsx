import React from 'react'
import { SafeAreaView, StyleSheet, View, Pressable, Text } from 'react-native'
import globalStyles from '../styles/global'



const NewOrder = () => {
  return (
    <View style={globalStyles.container}>
      <View style={[globalStyles.content, styles.content]}>
        <Pressable
          style={globalStyles.button}
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