import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../index.css';
import ReactDOM from 'react-dom';
import { NavBar } from "../NavBar";
import React, { useState, useEffect, useRef } from 'react';
import { PickList } from 'primereact/picklist';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './PickListDemo.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPosts, getAllUsers } from '../../REDUX/actions/action';
import { ListBox } from 'primereact/listbox';
import { Button } from 'primereact/button';
import { SpeedDial } from 'primereact/speeddial';
import { Tooltip } from 'primereact/tooltip';
import { Toast } from 'primereact/toast';


 function AdminHome(){
    const [selectedReview, setSelectedReview] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState(null);
    const [selectedPost, setSelectedPost]=useState(null);
    const dispatch = useDispatch()
    const users = useSelector((state) => state.users);
    const posts = useSelector((state) => state.filtered_posts)
    const toast = useRef(null);
    
    
   
    useEffect(()=>{
        dispatch(getAllUsers())   
    },[dispatch]) 
    
    useEffect(()=>{
        dispatch(fetchAllPosts())   
    },[dispatch]) 
    
    const actionBodyTemplate = () => {
       
      
        return  <Button icon="pi pi-times" className="p-button-rounded p-button-danger p-button-outlined" />
   
        
    }

    const items =[
        {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: () => {
                toast.current.show({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
            }
        }
    ]
  
    return (
        
        
        <div>
            <Toast ref={toast} />
            <NavBar/>
            <DataTable value={users} selection={selectedUsers} onSelectionChange={e => setSelectedUsers(e.value)} dataKey="id" responsiveLayout="scroll">
                    <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                    <Column field="last_name" header="Apellido"></Column>
                    <Column field="name" header="Nombre"></Column>
                    <Column field="id" header="Id"></Column>
                    <Column field="email" header="Email"></Column>
                    <Column field="rating" header="Rating"></Column>
                    <Column field="keeper" header="Rol"></Column>
                    <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                </DataTable>
        </div>
       


        );
    }

                
export default  AdminHome







