import React, { useReducer } from 'react'


import _ from 'lodash'
import FirebaseReducer from './firebaseReducer'
import FirebaseContext from './firebaseContext'
import firebase from '../../firebase'
import { 
    SUCCESS_GET_PRODUCTS 
} from '../../types'

const FirebaseState = props => {

    //Initial state
    const initialState = {
        menu: []
    }

    //Function to get products
    const getProducts = () => {

        //
        firebase.db
        .collection('products')
        .where('avalible', '==', true)
        .onSnapshot(handleSnapshot)

        function handleSnapshot (snapshot){
            let dishes = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })
            //Order by category with lodash
            dishes = _.sortBy(dishes, 'category')

            dispatch({
                type: SUCCESS_GET_PRODUCTS,
                payload: dishes
            })
        }

        



    }

    //useReducer with despatch for execute functions
    const [state, dispatch] = useReducer(FirebaseReducer, initialState)
    return (
        <FirebaseContext.Provider
            value={{
                menu: state.menu,
                firebase,
                getProducts
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseState
