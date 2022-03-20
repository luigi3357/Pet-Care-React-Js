import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../index.css';
import ReactDOM from 'react-dom';

import React, { Component } from 'react';
import { Button } from 'primereact/button';
import './ButtonDemo.css';
import { deleteUsers, fetchAllPosts } from "../../REDUX/actions/action";
import { useDispatch, useSelector } from "react-redux";

export function DeletePost ({id}) {

    const dispatch =useDispatch()

    function handleDelete(e){
        e.preventDefault();        
        dispatch(deleteUsers(id));
        dispatch(fetchAllPosts())
    }

        return (
            <div className="button-demo">
                <div className="card">
                    <span className="p-buttonset">                       
                        <Button onClick={(e)=>{handleDelete(e)}} label="Delete" icon="pi pi-trash" />                       
                    </span>                 
                   
                </div>
            </div>
        )
}
                
