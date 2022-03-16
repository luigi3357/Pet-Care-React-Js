import axios from "axios";


export function postPayment(payload){
    return async function (dispatch) {
        const json = await axios.post("http://localhost:3001/mercadoPago/checkout/", payload);
        console.log(json)
        return json;
    }
}