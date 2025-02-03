import { useNavigation } from '@react-navigation/native'
import React, { useContext } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import globalStyles from '../../styles/global'
import OrderContext from '../../context/orders/ordersContext'

const SummaryButton = () => {
    const navigation = useNavigation()
    const { order } = useContext(OrderContext)
    if(order.length === 0) return null
  return (
    <Pressable
        style={[globalStyles.button, styles.button]}
        onLongPress={() => navigation.navigate('SummaryOrder')}
    >
        <Text
            style={[globalStyles.buttonText, styles.buttonText]}
        >Go to Order</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        width: '70%',
        marginRight: 10
    },
    buttonText: {
        fontSize: 10
    }
})

export default SummaryButton