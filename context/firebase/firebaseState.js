import React, { useReducer } from 'react'

import FirebaseReducer from './firebaseReducer'
import FirebaseContext from './firebaseContext'

const FirebaseState = props => {

    //Initial state
    const initialState = {
        menu: []
    }

    //useReducer with despatch for execute functions
    const [state, dispatch] = useReducer(FirebaseReducer, initialState)
    return (
        <FirebaseContext.Provider
            value={{
                menu: state.menu
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseState
