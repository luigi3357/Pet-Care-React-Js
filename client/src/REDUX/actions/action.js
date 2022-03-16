import axios from "axios"
import ACTION_TYPES from "../actionTypes/actionTypes";



const localhost = 'http://localhost:3001'


//register

export default function register (payload){
    
      return async (dispatch) => {
        let json = await axios.post(`${localhost}/register`, payload);
        return json;
      };   
  };

// Login and AllUsers

  export function getAllUsers() {
    return function (dispatch) {
      axios
        .get(`${localhost}/users`)
        .then((response) => {
          dispatch({
            type: ACTION_TYPES.GET_ALL_USERS,
            payload: response.data,
          });
        })
        .catch((e) => {
          throw new Error("No se pudo conectar al servidor");
        });
    };
  }

  // Login

  export const getLogin = (email) => {    
      return async (dispatch) => {
        console.log(email, "soy el action");
        await axios
          .get(`${localhost}/login/` + email)
          .then((response) => {
            dispatch({
              type: ACTION_TYPES.GET_LOGIN,
              payload: response.data,
            });
          });
      };   
  };

  //forgot password
  
  export const forgotPassword = (payload) => {    
      return async (dispatch) => {
        let json = await axios.put(
          `http://${localhost}:3001/forgot-password`,
          payload
        );
        return json;
      };   
  };  