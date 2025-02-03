import React, { useReducer } from "react"
import OrderContext from "./ordersContext"
import orderReducer from "./orderReducer"
import { 
    SELECT_PRODUCT,
    CONFIRM_ORDER_DISH,
    SHOW_SUMARRY, 
    REMOVE_DISH,
    ORDER_PLACED
} from "../../types"



const OrderState = props => {
    const initialState = {
        order: [],
        dishe: null,
        total: 0,
        idorder: ''
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

    // Calculate total to pay
    const showSummary = total => {
        dispatch({
            type: SHOW_SUMARRY,
            payload: total
        })
    }

    // Delete a dish on the order
    const removeDish = id => {
        dispatch({
            type: REMOVE_DISH,
            payload: id
        })
    }

    const orderPlaced = id => {
        dispatch({
            type: ORDER_PLACED,
            payload: id
        })
    }
 
    return(
        <OrderContext.Provider
            value={{
                order: state.order,
                dish: state.dish,
                total: state.total,
                idorder: state.idorder,
                selectDish,
                saveOrder,
                showSummary,
                removeDish,
                orderPlaced
            }}
        >
            {props.children}
        </OrderContext.Provider>
    )
}

export default OrderState