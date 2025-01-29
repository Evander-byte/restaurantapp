import { SELECT_PRODUCT } from "../../types";



export default (state, action) => {
    switch(action.type){
        case SELECT_PRODUCT:
            return{
                ...state,
                dish: action.payload
            }
        default:
            return state;
    }
}