import ACTION_TYPES from "../actionTypes/actionTypes";

const initialState = {
  users: "",
  login: [],
  all_posts: [],
  filtered_posts: [],
  urlMP:'',
  checkout_details: ''
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.POST_PAYMENT:
      return {
        ...state,
        urlMP: action.payload
      };
    case ACTION_TYPES.GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case ACTION_TYPES.GET_LOGIN:
      console.log(action.payload);
      return {
        ...state,
        login: action.payload,
      };
    case ACTION_TYPES.FETCH_ALL_POSTS:
      return {
        ...state,
        all_posts: action.payload,
        filtered_posts: action.payload,
      };
    case ACTION_TYPES.FETCH_CHECKOUTS_DETAILS:
      console.log(action.payload)
      return {
        ...state,
        checkout_details: action.payload
      };
    default:
      return state;
  }
}
export default rootReducer;
