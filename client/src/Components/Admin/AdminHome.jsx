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
import { adminDeletePosts, adminDeleteUsers, fetchAllPosts, getAllUsers } from '../../REDUX/actions/action';
import { ListBox } from 'primereact/listbox';
import { Button } from 'primereact/button';
import { SpeedDial } from 'primereact/speeddial';
import { Tooltip } from 'primereact/tooltip';
import { Toast } from 'primereact/toast';
import style from '../../Pages/global.module.css'

 function AdminHome(){
    const [selectedReview, setSelectedReview] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState(null);
    const [selectedPost, setSelectedPost]=useState(null);
    const dispatch = useDispatch()
    const users = useSelector((state) => state.users);
    const posts = useSelector((state) => state.filtered_posts)
    const toast = useRef(null);
    const [expandedRows, setExpandedRows] = useState([]);
    console.log(posts)
   
    useEffect(()=>{
        dispatch(getAllUsers())   
    },[dispatch]) 
    
    useEffect(()=>{
        dispatch(fetchAllPosts())   
    },[dispatch]) 

    const banUser = () => {
          function banUser(){
            const id = selectedUsers.map(e=>e.id)
            console.log(id)
            dispatch(adminDeleteUsers(id))
        }
        return  <Button onClick={()=>{banUser()}}  icon="pi pi-times" className="p-button-rounded p-button-danger p-button-outlined" />
    }
    const deletePost = () => {
        function deleteUser(){
          const id = selectedPost.map(e=>e.id)
          console.log(id)
          dispatch(adminDeletePosts(id))
      }
      return  <Button onClick={()=>{deleteUser()}}  icon="pi pi-times" className="p-button-rounded p-button-danger p-button-outlined" />
  }

    const headerTemplate = (data) => {
        return (
            <React.Fragment>    
                <span className="image-text">{data.name}</span>
            </React.Fragment>
        );
    }
    const footerTemplate = (data) => {
        return (
            <React.Fragment>
                <td colSpan="4" style={{ textAlign: 'right' }}>Total Customers</td>
            </React.Fragment>
        );
    }

    const onRowGroupExpand = (event) => {
        toast.current.show({ severity: 'info', summary: 'Row Group Expanded', detail: 'Value: ' + event.data.name, life: 3000 });
    }

    const onRowGroupCollapse = (event) => {
        toast.current.show({ severity: 'success', summary: 'Row Group Collapsed', detail: 'Value: ' + event.data.name, life: 3000 });
    }
  
    return (
        
        
        <div className={style.container}>
            <Toast ref={toast} />
            <NavBar/>
            <div>
            <DataTable value={users} rowGroupMode="subheader" groupRowsBy="name"
                    selection={selectedUsers} onSelectionChange={e => setSelectedUsers(e.value)}
                    sortMode="single" sortField="name" sortOrder={1} responsiveLayout="scroll"
                    expandableRowGroups expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                    onRowExpand={onRowGroupExpand} onRowCollapse={onRowGroupCollapse}
                    rowGroupHeaderTemplate={headerTemplate} rowGroupFooterTemplate={footerTemplate}>
                    <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                    <Column field="last_name" header="Apellido"></Column>
                    <Column field="name" header="Nombre"></Column>
                    <Column field="id" header="Id"></Column>
                    <Column field="email" header="Email"></Column>
                    <Column field="rating" header="Rating"></Column>
                    <Column field="keeper" header="Rol"></Column>
                    <Column field="deleted" header="Baneado"></Column>
                    <Column headerStyle={{ width: '4rem', textAlign: 'center' }} 
                    bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={banUser} />
                </DataTable>
            </div>
            <div>
            <DataTable value={posts} selectionMode="multiple" dragSelection selection={selectedPost}
             onSelectionChange={e => setSelectedPost(e.value)} dataKey="id" responsiveLayout="scroll">
                        <Column field="description" header="Post"></Column>
                        <Column field="size" header="Tamaño"></Column>
                        <Column field="title" header="Titulo"></Column>
                        <Column field="type" header="Tipo"></Column>
                        <Column headerStyle={{ width: '4rem', textAlign: 'center' }}
                        bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={deletePost} />
                    </DataTable>
            </div>
        </div>
       


        );
    }

                
export default  AdminHome







