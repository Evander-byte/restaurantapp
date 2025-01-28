import React, { useReducer } from "react"
import OrderContext from "./ordersContext"
import orderReducer from "./orderReducer"

const OrderState = props => {
    const initialState = {
        order: []
    }

    // useReducer with dispatch to execute the functions
    const [state, dispatch] = useReducer(orderReducer, initialState)

    return(
        <OrderContext.Provider
            value={{
                order: state.order
            }}
        >
            {props.children}
        </OrderContext.Provider>
    )
}

export default OrderState