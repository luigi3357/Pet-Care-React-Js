import ACTION_TYPES from "../actionTypes/actionTypes";

const initialState = {
  users: "",
  login: [],
  all_posts: [],
  filtered_posts: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "POST_PAYMENT":
      return {
        ...state,
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
    case ACTION_TYPES.GET_FILTERED:
      switch(action.payload){
        case "all":
          return{
            ...state,
            filtered_posts: state.all_posts
          }
        case "perros":
          return{
            ...state,
            filtered_posts: state.all_posts.filter(i => i.type === "perro")
          }
        case "aves":
          return{
            ...state,
            filtered_posts: state.all_posts.filter(i => i.type === "aves")
          }
        case "roedores":
          return{
            ...state,
            filtered_posts: state.all_posts.filter(i => i.type === "roedores")
          }
        case "gatos":
          return{
            ...state,
            filtered_posts: state.all_posts.filter(i => i.type === "gato")
          }
        case "pequeño":
          return{
            ...state,
            filtered_posts: state.all_posts.filter(i => i.size === "pequeño")
          }
        case "mediano":
          return{
            ...state,
            filtered_posts: state.all_posts.filter(i => i.size === "mediano")
          }
        case "grande":
          return{
            ...state,
            filtered_posts: state.all_posts.filter(i => i.size === "grande")
          }
        case "precioDesc":
          return{
            ...state,
            filtered_posts: state.filtered_posts.sort((a,b)=>{
              if(a.price > b.price) return 1;
              if(b.price >= a.price) return -1;
            })
          }
        case "precioAsc":
          return{
            ...state,
            filtered_posts: state.filtered_posts.sort((a,b)=>{
              if(a.price > b.price) return -1;
              if(b.price >= a.price) return 1;
            })
          }
        case "ratingAsc":
          return{
            ...state,
            filtered_posts: state.filtered_posts.sort((a,b)=>{
              if(a.author.rating > b.author.rating) return -1; 
              if(b.author.rating >= a.author.rating) return 1; 
            })
          }
        case "ratingDesc":
          return{
            ...state,
            filtered_posts: state.filtered_posts.sort((a,b)=>{
              if(a.author.rating > b.author.rating) return 1; 
              if(b.author.rating >= a.author.rating) return -1; 
            })
          }
        default:
          return {
            ...state
          }
      }
    default:
      return state;
  }
}
export default rootReducer;
