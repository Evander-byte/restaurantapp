import React, { useReducer } from "react"
import OrderContext from "./ordersContext"
import orderReducer from "./orderReducer"
import { 
    SELECT_PRODUCT,
    CONFIRM_ORDER_DISH 
} from "../../types"



const OrderState = props => {
    const initialState = {
        order: [],
        dishe: null
    }

    // useReducer with dispatch to execute the functions
    const [state, dispatch] = useReducer(orderReducer, initialState)

    //Dish selected by the user
    const selectDish = dish => {
        dispatch({
            type: SELECT_PRODUCT,
            payload: dish
        })
    }

    //When the user confirm a dish
    const saveOrder = order => {
        dispatch({
            type: CONFIRM_ORDER_DISH,
            payload: order
        })
    }
 
    return(
        <OrderContext.Provider
            value={{
                order: state.order,
                dish: state.dish,
                selectDish,
                saveOrder
            }}
        >
            {props.children}
        </OrderContext.Provider>
    )
}

export default OrderState