import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../index.css';
import ReactDOM from 'react-dom';
import { NavBarAdmin } from "../NavBarAdmin";
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './PickListDemo.css';
import { useDispatch, useSelector } from 'react-redux';
import { adminDeletePosts, adminDeleteUsers, fetchAllPosts, getAdminAll,} from '../../REDUX/actions/action';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import style from '../../Pages/global.module.css'
import s from './admin.module.css'
import { Dialog } from "primereact/dialog";
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';

function AdminHome(){
    let emptyProduct = {
        id: '',
        type: '',
        description: '',
        size: '',
        title: '',
    };
    let emptyProduct2 = {
        deleted:false,
    };
    const [selectedReview, setSelectedReview] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState(null);
    const [selectedPost, setSelectedPost]=useState(null);
    const dispatch = useDispatch()
    const dataUsers = useSelector((state) => state.users);
    const dataPosts = useSelector((state) => state.filtered_posts)
    const toast = useRef(null);
    const [expandedRows, setExpandedRows] = useState([]);
    const [postdeleted, setPostdeleted] = useState(emptyProduct);
    const [posts, setPosts] = useState(null);
    const [users, setUsers] = useState(null)
    const [showBan, setShowBan] = useState(false);
    const [showPost, setShowPost] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [userbaneado, setUserBaneado] = useState(emptyProduct2);
    const [lol, setLol] = useState(null)
    
    useEffect(()=>{
        dispatch(getAdminAll())   
    },[dispatch]) 
    
    useEffect(()=>{
        dispatch(fetchAllPosts())   
    },[dispatch]) 
    
    useEffect(()=>{
        setPosts(dataPosts)   
    },[setPosts,dataPosts]) 
    
    useEffect(()=>{
        setUsers(dataUsers)   
    },[setUsers,dataUsers]) 

function banUser(){
        const id = selectedUsers.map(e=>e.id)
        dispatch(adminDeleteUsers(id))
        selectedUsers.forEach(e => {
            e.deleted='true'
        });
        onRowGroupCollapse()
        setShowBan(false)
        setUserBaneado(emptyProduct2)
        }
function bann(){
    setShowBan(true)

}
function deletee(){
    setShowPost(true)

}               



function deletePost(){
          const id = selectedPost.map(e=>e.id)
          dispatch(adminDeletePosts(id))
          const deleted = posts.filter(e=>!selectedPost.includes(e))
          setPosts(deleted);
          setSelectedPost(null);
          setPostdeleted(emptyProduct);
          onRowGroupExpand()
          setShowPost(false)

      }
      const dialogFooter = (
        <div className="flex justify-content-center" >
          <Button
            label="OK"
            className="p-button-text"
           
            onClick={() => banUser()}
          />
          <Button
            label="Cancelar"
            className="p-button-text"
            
            onClick={() => setShowBan(false)}
          />
        </div>
      )
      const dialogFooterPost = (
        <div className="flex justify-content-center" >
          <Button
            label="OK"
            className="p-button-text"
           
            onClick={() => deletePost()}
          />
          <Button
            label="Cancelar"
            className="p-button-text"
            
            onClick={() => setShowPost(false)}
          />
        </div>
      )
   const header = (
        <div className="table-header">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    
      const headerTemplate = (data) => {
        return (
            <React.Fragment>    
                <span className="image-text">{data.name}</span>
            </React.Fragment>
        );
    }


    const onRowGroupExpand = (event) => {
        toast.current.show({ severity: 'error', summary: 'Posteo eliminado', detail: 'Eliminado', life: 3000 });
    }

    const onRowGroupCollapse = (event) => {
        toast.current.show({ severity: 'error', summary: 'Usuario baneado', detail: 'Baneado' , life: 3000 });
    }

    return (
        
        
        <div className={style.container}>
              <div className={style.container}>
                  <NavBarAdmin/>
              </div>
              <Dialog
              visible={showBan}
              onHide={() => setShowBan(false)}
              position="center"
              footer={dialogFooter}
              showHeader={false}
              breakpoints={{ "960px": "80vw" }}
              style={{ width: "30vw" }}
            >
              <div className="flex justify-content-center flex-column pt-6 px-3">
                <i
                  className="pi pi-times-circle"
                  style={{ fontSize: "5rem", color: "var(--orange-500)" }}
                ></i>
                <h5>Error</h5>
                <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
                  <b>Desea banear al usuario?</b>.
                </p>
              </div>
            </Dialog>
            <Dialog
              visible={showPost}
              onHide={() => setShowPost(false)}
              position="center"
              footer={dialogFooterPost}
              showHeader={false}
              breakpoints={{ "960px": "80vw" }}
              style={{ width: "30vw" }}
            >
              <div className="flex justify-content-center flex-column pt-6 px-3">
                <i
                  className="pi pi-times-circle"
                  style={{ fontSize: "5rem", color: "var(--orange-500)" }}
                ></i>
                <h5>Error</h5>
                <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
                  <b>Desea eliminar el posteo?</b>.
                </p>
              </div>
            </Dialog>
            <Toast ref={toast} />
            <div className={s.containerAdmin} >
            <DataTable value={users} rowGroupMode="subheader" groupRowsBy="name"
                    selection={selectedUsers} onSelectionChange={e => setSelectedUsers(e.value)}
                    sortMode="single" sortField="name" sortOrder={1} responsiveLayout="scroll"
                    expandableRowGroups expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                    rowGroupHeaderTemplate={headerTemplate} style={{width:850}} globalFilter={globalFilter}
                    header={header} 
                    size="small" scrollable scrollHeight="400px" >
                    <Column selectionMode="multiple" headerStyle={{ width: '3em' }} style={{ minWidth: '50px' }}></Column>
                    <Column field="last_name" header="Apellido" style={{ minWidth: '100px'}}></Column>
                    <Column field="name" header="Nombre" style={{ minWidth: '100px' }}></Column>
                    <Column field="id" header="Id" style={{ minWidth: '100px' }}></Column>
                    <Column field="email" header="Email" style={{ minWidth: '200px' }}></Column>
                    <Column field="rating" header="Rating" style={{ minWidth: '50px' }}></Column>
                    <Column field="keeper" header="Rol" style={{ minWidth: '50px' }}></Column>
                    <Column field="deleted" header="Baneado" style={{ minWidth: '50px' }}></Column>
                </DataTable>
                <div className={s.btn}>
                <Button onClick={()=>{bann()}}  icon="pi pi-times" 
                className="p-button-rounded p-button-danger" 
                disabled={!selectedUsers|| !selectedUsers.length}  />
                </div>
            </div>
            <div className={s.posts}>
            <DataTable value={posts} selectionMode="multiple" dragSelection selection={selectedPost}
             onSelectionChange={e => setSelectedPost(e.value)} dataKey="id" responsiveLayout="scroll"
             size="small" style={{width:850}} scrollable scrollHeight="400px">
                        <Column field="description" header="Post" style={{ minWidth: '400px' }}></Column>
                        <Column field="size" header="Tamaño" style={{ minWidth: '100px' }}></Column>
                        <Column field="title" header="Titulo" style={{ minWidth: '200px' }}></Column>
                        <Column field="type" header="Tipo" style={{ minWidth: '100px' }}></Column>
                        <Column field="id" header="Id Post" style={{ minWidth: '150px' }}></Column>
                        <Column field="author.name" header="Autor" style={{ minWidth: '100px' }}></Column>
                        <Column field="author.id" header="Id autor" style={{ minWidth: '100px' }}></Column>
                    </DataTable>
                <div className={s.btn}>
                <Button onClick={()=>{deletee()}}  icon="pi pi-times" 
                className="p-button-rounded p-button-danger" 
                disabled={!selectedPost|| !selectedPost.length}/>
                </div> 

            </div>
        </div>
       


        );
    }

                
export default  AdminHome