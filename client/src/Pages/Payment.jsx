import React, {useState, useSelect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {postPayment} from "../REDUX/actions/action";


export default function Payment (){

    const dispatch = useDispatch()

    const [input, setInput] = useState({
        title: "",
        unit_price: 0,
        
    })

    function handleInputChange(e){
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit (e){
        e.preventDefault();
        console.log(input)
        dispatch(postPayment(input))
        alert("payment was created successfully")
        setInput({
            title: "",
            unit_price: 0,
        })
        //history.push("/home")
    }
    return (
        <div>
            <h1>BIENVENIDO A PAYMENT</h1>
            <div>
                <h4>Maria Camila Sarmiento</h4>
            </div>
            <div >
                {/* <img src="pictures/Perfil sin fondo.jpeg" alt ="Foto Cuidador" style="width: 100%"/> */}
                <hr/>
                <h5>Descripcion</h5>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                </p>
                <hr/>
                <h4>valor: $200 USD</h4>
                <div>
                    <form onSubmit = {(e) => handleSubmit(e)}>
                        <input type="text" name = "title" value={input.title} onChange={(e)=>handleInputChange(e)}/>
                        <input type="text" name = "unit_price" value={input.unit_price} onChange={(e)=>handleInputChange(e)}/>
                        <button type="submit"  >Paynow</button>
                    </form>
                </div>    
            </div>
                       
        </div>
    );
}