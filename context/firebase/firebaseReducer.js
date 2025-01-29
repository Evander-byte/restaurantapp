import { 
    SUCCESS_GET_PRODUCTS 
} from "../../types"


export default (state, action) => {
    switch (action.type) {
        case SUCCESS_GET_PRODUCTS:
            return {
                ...state,
                menu: action.payload
            }
        default:
            return state
    }
    
}