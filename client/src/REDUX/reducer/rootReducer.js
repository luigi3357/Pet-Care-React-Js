import ACTION_TYPES from "../actionTypes/actionTypes";


const initialState = {
    users: "", 
    login:[],
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        
        case ACTION_TYPES.GET_ALL_USERS:  
            return {
                ...state,
                users: action.payload
            };
            case ACTION_TYPES.GET_LOGIN:
                console.log(action.payload);
                return {
                  ...state,
                  login: action.payload,
                };
            
        default:
            return state
    }
}
export default rootReducer