const initialState = {
   login:""
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "POST_PAYMENT":
            return{
                ...state
            }                    
        default:
            return state
    }
}
export default rootReducer