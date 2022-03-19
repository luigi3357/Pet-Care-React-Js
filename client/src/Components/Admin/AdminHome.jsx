import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../index.css';
import ReactDOM from 'react-dom';

import React, { useState, useEffect } from 'react';
import { PickList } from 'primereact/picklist';

import './PickListDemo.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPosts, getAllUsers } from '../../REDUX/actions/action';

 function AdminHome(){
     
    const [source, setSource] = useState([]);
    const [target, setTarget] = useState([]);
    const dispatch = useDispatch()
    const users = useSelector((state) => state.filtered_posts);
    console.log(users)
    useEffect(()=>{
        dispatch(fetchAllPosts())
    },[dispatch])
      
    
    useEffect(()=>{
        setSource(users)
    },[setSource])
    
    const onChange = (event) => {
        setSource(event.source);
        setTarget(event.target);
    }


    function itemTemplate(item){

    
        return (
   
    
            <div className="product-item">
                <div className="image-container">
                    <img onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item.id} />
                </div>
                <div className="product-list-detail">
                    <h5 className="mb-2">{item.id}</h5>
                    <i className="pi pi-tag product-category-icon"></i>
                    <span className="product-category">{item.size}</span>
                </div>
                <div className="product-list-action">
                    <h6 className="mb-2">${item.price}</h6>
                    <span className={`product-badge status-${item.id.toLowerCase()}`}>{item.size}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="picklist-demo">
            <div className="card">
                <PickList source={source} target={target} itemTemplate={itemTemplate}
                    sourceHeader="Available" targetHeader="Selected"
                    sourceStyle={{ height: '342px' }} targetStyle={{ height: '342px' }}
                    onChange={onChange}></PickList>
            </div>
        </div>
    );

}
                
export default  AdminHome