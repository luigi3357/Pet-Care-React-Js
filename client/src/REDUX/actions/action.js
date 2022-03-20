import axios from "axios";

import ACTION_TYPES from "../actionTypes/actionTypes";

export const localhost = "http://localhost:3001";

//mercadopago

export function postPayment(payload) {
  return function (dispatch) {
    axios
      .post(`${localhost}/mercadoPago/checkout/`, payload)
      .then((response) => {
        dispatch({
          type: ACTION_TYPES.POST_PAYMENT,
          payload: response.data,
        });
      });
  };
}
//CHECKOUT DETAILS
export function fetchCheckOutDetails(id) {
  return function (dispatch) {
    axios.get(`${localhost}/bookings/details?id=` + id).then((response) => {
      dispatch({
        type: ACTION_TYPES.FETCH_CHECKOUTS_DETAILS,
        payload: response.data,
      });
    });
  };
}

//Changing status booking
export function changeBookingStatus(payload) {
  return async (dispatch) => {
    let json = await axios.put(`${localhost}/bookings/update`, payload);
    return json;
  };
}

//register

export default function register(payload) {
  return async (dispatch) => {
    let json = await axios.post(`${localhost}/register`, payload);
    return json;
  };
}

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
    await axios.get(`${localhost}/login/` + email).then((response) => {
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
    let json = await axios.put(`${localhost}/forgot-password`, payload);
    return json;
  };
};
  //verification 2
  export const secondaryVerification = (payload) => {
    return async (dispatch) => {
      let json = await axios.put(`${localhost}/mensaje/sms`, payload);
      return json;
    };
  };

    //reset
    export const resetPassword = (payload) => {
      return async (dispatch) => {
        let json = await axios.put(`${localhost}/reset`, payload);
        return json;
      };
    };
  
/*               HomeScreen             */

export function fetchAllPosts() {
  return function (dispatch) {
    axios
      .get(`${localhost}/posts/all`)
      .then((response) => {
        dispatch({
          type: ACTION_TYPES.FETCH_ALL_POSTS,
          payload: response.data,
        });
      })
      .catch((e) => {
        throw new Error("No se pudo conectar al servidor");
      });
  };
}

// cambiar informacion del perfil
export const editProfilePost = (payload) => {
  return async (dispatch) => {
    let json = await axios.put(`${localhost}/users/edit`, payload);
    return json;
  };
}
  //crear posteos
  export const createPost = (payload) => {
    return async (dispatch) => {
      let json = await axios.post(`${localhost}/posts/create/`, payload);
      return json;
    };
  };

  // cambiar info de publicaciones
  //deberia enviar si o si el id el resto de los cambios opcionales
  //title, description, price, type, size, address, phone 
  export const editPost = (id, payload) => {
    return async (dispatch) => {
      let json = await axios.put(`${localhost}/posts/edit/`+ id, payload);
      return json;
    };
  };
// eliminar posteos

export function deletePost(id) {
  return async (dispatch) => {
    let json = await axios.delete(`${localhost}/posts/delete/`+id);
    return json;
  };
}

//eliminar usuarios

export function deleteUsers(id) {
  return async (dispatch) => {
    let json = await axios.delete(`${localhost}/users/delete/`+id);
    return json;
  };
}
  


export function getFiltered(payload){
  return function(dispatch){
    dispatch({
      type: ACTION_TYPES.GET_FILTERED,
      payload
    })
  }
}

export function getSearch(payload){
  return async function(dispatch){
    let result = await axios.get(`${localhost}/search`, { payload })
    dispatch({
      type: ACTION_TYPES.GET_SEARCH,
      payload : result
    })
  }
}
