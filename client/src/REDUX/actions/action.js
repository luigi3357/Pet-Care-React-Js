import axios from "axios";

import ACTION_TYPES from "../actionTypes/actionTypes";

export const localhost = "https://petcare2000.herokuapp.com";

//usersCoordinates

export function usersCoordinates(){
  return async function (dispatch) {
    
      var json = await axios.get(`${localhost}/users/usersCoordinates`)
      return dispatch({
        type: ACTION_TYPES.GET_USERS_COORDINATES,
        payload: json.data
      })
    
  }
}

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

export function register(payload) {
  return async (dispatch) => {
    let json = await axios.post(`${localhost}/register`, payload)
    .then((response)=>{
      localStorage.setItem('login', JSON.stringify(response.data))
      dispatch({
        type: ACTION_TYPES.REGISTER_LOGIN,
        payload: response.data[0]
      })
    });
  };
}
//register google
export function registerGoogle(payload) {
  return async (dispatch) => {
    let json = await axios.post(`${localhost}/registerGoogle`, payload)
    .then((response)=>{
      localStorage.setItem('login', JSON.stringify(response.data))
      dispatch({
        type: ACTION_TYPES.REGISTER_LOGIN,
        payload: response.data
      })
    });
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

export function getAdminAll() {
  return function (dispatch) {
    axios
      .get(`${localhost}/users/adminAll`)
      .then((response) => {
        dispatch({
          type: ACTION_TYPES.GET_ADMIN_ALL,
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
export const getLoginForgot = (email) => {
  return async (dispatch) => {
    await axios.get(`${localhost}/login/` + email).then((response) => {
      dispatch({
        type: ACTION_TYPES.GET_LOGIN_FORGOT,
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
    let json = await axios.put(`https://petcare2000.herokuapp.com/reset`, payload);
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
};
// añade favoritos
export const addFavoritos = (payload) => {
  return async (dispatch) => {
    let json = await axios.put(`${localhost}/users/fav`, payload);
    return json;
  };
};
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
export const editPost = (payload) => {
  return async (dispatch) => {
    let json = await axios.put(`${localhost}/posts/edit` ,  payload);
    return json;
  };
};
// eliminar posteos

export function deletePost(id) {
  return async (dispatch) => {
    let json = await axios.delete(`${localhost}/posts/delete/` + id);
    return json;
  };
}

//eliminar usuarios

export function deleteUsers(id) {
  return async (dispatch) => {
    let json = await axios.delete(`${localhost}/users/delete/` + id);
    return json;
  };
}

export function getFiltered(payload) {
  return function (dispatch) {
    dispatch({
      type: ACTION_TYPES.GET_FILTERED,
      payload,
    });
  };
}

export const verification2fa = (payload) => {
  return async (dispatch) => {
    let json = await axios.put(`${localhost}/users/security/`, payload);
    return json;
  };
};

export function getSearch(keywords) {
  return async function (dispatch) {
    let result = await axios.get(`${localhost}/search?keyword=` + keywords.replace(" ", "+") );
    dispatch({
      type: ACTION_TYPES.GET_SEARCH,
      payload: result.data,
    });
  };
}

export function getLogOut() {
  return async function (dispatch) {
    dispatch({
      type: ACTION_TYPES.GET_LOGOUT,
    });
  };
}

//delete usuario desde admin
export function adminDeleteUsers(id){
  return async (dispatch) => {
    let json = await axios.put(`${localhost}/admindelete` , id);
    return json;
  };
}

export function adminDeletePosts(id) {
  return async (dispatch) => {
    let json = await axios.delete(`${localhost}/Admin/delete/` + id);
    return json;
  };
}

export function adminDeleteReviews(id) {
  return async (dispatch) => {
    let json = await axios.delete(`${localhost}/Admin/delete/` + id);
    return json;
  };
}
