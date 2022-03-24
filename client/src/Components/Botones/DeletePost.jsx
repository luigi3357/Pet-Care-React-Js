import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../index.css';
import ReactDOM from 'react-dom';
import "../../Pages/stylesProfileTerceros.css"
import React, { Component } from 'react';
import { Button } from 'primereact/button';
import './ButtonDemo.css';
import { deletePost, fetchAllPosts } from "../../REDUX/actions/action";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
export default function DeletePost ({id}) {

    const dispatch =useDispatch()
    const navigate = useNavigate();
    function handleDelete(e){
        e.preventDefault();        
        dispatch(deletePost(id));
        dispatch(fetchAllPosts())
        navigate("/")
    }

        return (
            <div>
                <div>
                    <span>                       
                        <button className="buttomPerfile3" onClick={(e)=>{handleDelete(e)}} label="Delete">Eliminar</button>                     
                    </span>                 
                   
                </div>
            </div>
        )
}
                
