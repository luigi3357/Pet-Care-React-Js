import ACTION_TYPES from "../actionTypes/actionTypes";  


const initialState = {
  users: "",
  login: [],
  login2:[],
  all_posts: [],
  filtered_posts: [],
  urlMP: "",
  checkout_details: "",
  usersCoordinates: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.GET_USERS_COORDINATES:
      return {
        ...state,
        usersCoordinates: action.payload,
      };
    case ACTION_TYPES.POST_PAYMENT:
      return {
        ...state,
        urlMP: action.payload,
      };
    case ACTION_TYPES.GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
      };
      case ACTION_TYPES.GET_ADMIN_ALL:
        return {
          ...state,
          users: action.payload,
        };
    case ACTION_TYPES.GET_LOGIN:
      localStorage.setItem('login',JSON.stringify(action.payload))
      return {
        ...state,
        login: action.payload,
      };
      case ACTION_TYPES.GET_LOGIN_FORGOT:
        return {
          ...state,
          login2: action.payload,
        };
    case ACTION_TYPES.REGISTER_LOGIN:
      localStorage.setItem('login',JSON.stringify(action.payload))
      return {
        ...state,
        login: action.payload,
      };
    case ACTION_TYPES.GET_LOGOUT:
      localStorage.setItem('login', JSON.stringify(null))
      return {
        ...state,
        login: [],
      };
      case ACTION_TYPES.GET_ADMIN_ALL:
        return {
          ...state,
          users: action.payload,
        };
    
    case ACTION_TYPES.FETCH_ALL_POSTS:
      return {
        ...state,
        all_posts: action.payload,
        filtered_posts: action.payload,
      };
    case ACTION_TYPES.FETCH_CHECKOUTS_DETAILS:
      return {
        ...state,
        checkout_details: action.payload,
      };
    case ACTION_TYPES.GET_SEARCH:
      return {
        ...state,
        filtered_posts: action.payload,
      };
    case ACTION_TYPES.GET_FILTERED:
      switch (action.payload) {
        case "all":
          return {
            ...state,
            filtered_posts: state.all_posts,
          };
        case "perros":
          return {
            ...state,
            filtered_posts: state.all_posts.filter((i) => i.type === "perro"),
          };
        case "aves":
          return {
            ...state,
            filtered_posts: state.all_posts.filter((i) => i.type === "aves"),
          };
        case "roedores":
          return {
            ...state,
            filtered_posts: state.all_posts.filter(
              (i) => i.type === "roedores"
            ),
          };
        case "gatos":
          return {
            ...state,
            filtered_posts: state.all_posts.filter((i) => i.type === "gato"),
          };
        case "pequeño":
          return {
            ...state,
            filtered_posts: state.all_posts.filter((i) => i.size === "pequeño"),
          };
        case "mediano":
          return {
            ...state,
            filtered_posts: state.all_posts.filter((i) => i.size === "mediano"),
          };
        case "grande":
          return {
            ...state,
            filtered_posts: state.all_posts.filter((i) => i.size === "grande"),
          };
        case "precioDesc":
          let filteredCopy = [...state.filtered_posts]
          return {
            ...state,
            filtered_posts: filteredCopy.sort((a, b) => {
              if (a.price > b.price) return -1;
              if (a.price < b.price) return 1;
              return 0;
            }),
          };
          case "precioAsc":
            let filteredCopy2 = [...state.filtered_posts]
            return {
              ...state,
              filtered_posts: filteredCopy2.sort((a, b) => {
                if (a.price > b.price) return 1;
                if (a.price < b.price) return -1;
                return 0;
              }),
            };
            case "ratingAsc":
          let filteredCopy3 = [...state.filtered_posts]
          return {
            ...state,
            filtered_posts: filteredCopy3.sort((a, b) => {
              if (Number(a.author.rating) > Number(b.author.rating)) return -1;
              if (Number(b.author.rating) > Number(a.author.rating)) return 1;
              return 0;
            }),
          };
          case "ratingDesc":
            let filteredCopy4 = [...state.filtered_posts]
            return {
            ...state,
            filtered_posts: filteredCopy4.sort((a, b) => {
              if (a.author.rating > b.author.rating) return 1;
              if (b.author.rating > a.author.rating) return -1;
              return 0;
            }),
          };
        default:
          return {
            ...state,
          };
      }
    default:
      return state;
  }
}
export default rootReducer;
