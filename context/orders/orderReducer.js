import { 
    SELECT_PRODUCT,
    CONFIRM_ORDER_DISH, 
    SHOW_SUMARRY
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
        default:
            return state;
    }
}