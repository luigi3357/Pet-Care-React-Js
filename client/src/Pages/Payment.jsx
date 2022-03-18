import axios from "axios";
import React, {useState, useSelect, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllPosts, getAllUsers, localhost, postPayment} from "../REDUX/actions/action";


export function Payment (){
    const all_posts = useSelector(state=>state.all_posts)
    const link = useSelector(state=>state.urlMP)
    const dispatch = useDispatch()
    
    useEffect(async ()=>{
        dispatch(getAllUsers())
        dispatch(fetchAllPosts())
        await axios.get(`${localhost}/bookings/all`).then((r)=>{
            localStorage.setItem('bookings', JSON.stringify(r.data))
        })
    },[])
    useEffect(()=>{
        localStorage.setItem('posts', JSON.stringify(all_posts))
    },[all_posts])
    useEffect(()=>{
        if(link.length>0){
            window.location.assign(link)
        }
    },[link])


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
        dispatch(postPayment(input))
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