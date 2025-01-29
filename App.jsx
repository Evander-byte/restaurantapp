import 'react-native-gesture-handler'
import 'react-native-devsettings'
import React from 'react'
import { SafeAreaView, Text, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import NewOrder from './views/NewOrder'
import Menu from './views/Menu'
import Detail from './views/Detail'
import FormDish from './views/FormDish'
import SummaryOrder from './views/SummaryOrder'
import ProgressOrder from './views/ProgressOrder'
//import state of context
import FirebaseState from './context/firebase/firebaseState'
import OrderContext from './context/orders/ordersContext'
import OrderState from './context/orders/ordersState'


const Stack = createStackNavigator()


function App() {

  return (
    <>
    <FirebaseState>
      <OrderState>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#FFDA00'
              },
              headerBackTitleStyle: {
                fontWeight: 'bold'
              },
              headerTintColor: '#000'
            }}
          >
            <Stack.Screen
              name="NewOrder"
              component={NewOrder}
              options={{
                title:"New order"
              }}
            />
            <Stack.Screen
              name="Menu"
              component={Menu}
              options={{
                title:"Our menu"
              }}
            />
            <Stack.Screen
              name="DishDetail"
              component={Detail}
              options={{
                title:"Dish"
              }}
            />
            <Stack.Screen
              name="FormDish"
              component={FormDish}
              options={{
                title:"Order your dish"
              }}
            />
            <Stack.Screen
              name="SummaryOrder"
              component={SummaryOrder}
              options={{
                title:"Summary"
              }}
            />
            <Stack.Screen
              name="ProgressOrder"
              component={ProgressOrder}
              options={{
                title:"Progress order"
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </OrderState>
    </FirebaseState>
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
