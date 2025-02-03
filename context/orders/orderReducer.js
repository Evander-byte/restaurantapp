import { 
    SELECT_PRODUCT,
    CONFIRM_ORDER_DISH, 
    SHOW_SUMARRY,
    REMOVE_DISH,
    ORDER_PLACED
} from "../../types";



export default (state, action) => {
    switch(action.type){
        case SELECT_PRODUCT:
            return{
                ...state,
                dish: action.payload
            }
        case CONFIRM_ORDER_DISH: 
            return{
                ...state,
                order: [...state.order, action.payload]
            }
        case SHOW_SUMARRY:
            return{
                ...state,
                total: action.payload
            }
        case REMOVE_DISH:
            return{
                ...state,
                order: state.order.filter(dish => dish.id !== action.payload)
            }
        case ORDER_PLACED: 
            return{
                ...state,
                order: [],
                dishe: null,
                total: 0,
                idorder: action.payload
            }
        default:
            return state;
    }
}