import axios from "axios";

import ACTION_TYPES from "../actionTypes/actionTypes";

export const localhost = 'http://localhost:3001'


//mercadopago

export function postPayment(payload) {
  return async function (dispatch) {
    const json = await axios.post(
      `${localhost}/mercadoPago/checkout/`,
      payload
    );
    console.log(json);
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
