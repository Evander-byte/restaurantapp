import React, { useReducer } from "react"
import OrderContext from "./ordersContext"
import orderReducer from "./orderReducer"
import { 
    SELECT_PRODUCT,
    CONFIRM_ORDER_DISH,
    SHOW_SUMARRY 
} from "../../types"



const OrderState = props => {
    const initialState = {
        order: [],
        dishe: null,
        total: 0
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
 
    return(
        <OrderContext.Provider
            value={{
                order: state.order,
                dish: state.dish,
                total: state.total,
                selectDish,
                saveOrder,
                showSummary
            }}
        >
            {props.children}
        </OrderContext.Provider>
    )
}

export default OrderState