const initialState = {
   login:""
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "":
            return{

            }                    
        default:
            return state
    }
}
export default rootReducer