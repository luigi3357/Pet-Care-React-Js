import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../index.css';
import ReactDOM from 'react-dom';
import { NavBar } from "../NavBar";
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
            const chg = users
            setSelectedUsers(null)
            console.log(chg)
          
        }

function deletePost(){
          const id = selectedPost.map(e=>e.id)
          dispatch(adminDeletePosts(id))
          const deleted = posts.filter(e=>!selectedPost.includes(e))
          setPosts(deleted);
          setSelectedPost(null);
          setPostdeleted(emptyProduct);

      }


    const headerTemplate = (data) => {
        return (
            <React.Fragment>    
                <span className="image-text">{data.name}</span>
            </React.Fragment>
        );
    }


    const onRowGroupExpand = (event) => {
        toast.current.show({ severity: 'info', summary: 'Row Group Expanded', detail: 'Value: ' + event.data.name, life: 3000 });
    }

    const onRowGroupCollapse = (event) => {
        toast.current.show({ severity: 'success', summary: 'Row Group Collapsed', detail: 'Value: ' + event.data.name, life: 3000 });
    }
    const items = [
        {
            label: 'File',
            icon: 'pi pi-fw pi-file',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-plus',
                    items: [
                        {
                            label: 'Bookmark',
                            icon: 'pi pi-fw pi-bookmark'
                        },
                        {
                            label: 'Video',
                            icon: 'pi pi-fw pi-video'
                        },

                    ]
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-fw pi-trash'
                },
                {
                    separator: true
                },
                {
                    label: 'Export',
                    icon: 'pi pi-fw pi-external-link'
                }
            ]
        },
        {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
                {
                    label: 'Left',
                    icon: 'pi pi-fw pi-align-left'
                },
                {
                    label: 'Right',
                    icon: 'pi pi-fw pi-align-right'
                },
                {
                    label: 'Center',
                    icon: 'pi pi-fw pi-align-center'
                },
                {
                    label: 'Justify',
                    icon: 'pi pi-fw pi-align-justify'
                },

            ]
        },
        {
            label: 'Users',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-user-plus',

                },
                {
                    label: 'Delete',
                    icon: 'pi pi-fw pi-user-minus',

                },
                {
                    label: 'Search',
                    icon: 'pi pi-fw pi-users',
                    items: [
                        {
                            label: 'Filter',
                            icon: 'pi pi-fw pi-filter',
                            items: [
                                {
                                    label: 'Print',
                                    icon: 'pi pi-fw pi-print'
                                }
                            ]
                        },
                        {
                            icon: 'pi pi-fw pi-bars',
                            label: 'List'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Events',
            icon: 'pi pi-fw pi-calendar',
            items: [
                {
                    label: 'Edit',
                    icon: 'pi pi-fw pi-pencil',
                    items: [
                        {
                            label: 'Save',
                            icon: 'pi pi-fw pi-calendar-plus'
                        },
                        {
                            label: 'Delete',
                            icon: 'pi pi-fw pi-calendar-minus'
                        }
                    ]
                },
                {
                    label: 'Archieve',
                    icon: 'pi pi-fw pi-calendar-times',
                    items: [
                        {
                            label: 'Remove',
                            icon: 'pi pi-fw pi-calendar-minus'
                        }
                    ]
                }
            ]
        },
        {
            label: 'Quit',
            icon: 'pi pi-fw pi-power-off'
        }
    ];

    return (
        
        
        <div className={style.container}>
              <div className={style.container}>
                  <NavBar/>
              </div>
            <Toast ref={toast} />
            <div className={s.containerAdmin} >
            <DataTable value={users} rowGroupMode="subheader" groupRowsBy="name"
                    selection={selectedUsers} onSelectionChange={e => setSelectedUsers(e.value)}
                    sortMode="single" sortField="name" sortOrder={1} responsiveLayout="scroll"
                    expandableRowGroups expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                    onRowExpand={onRowGroupExpand} onRowCollapse={onRowGroupCollapse}
                    rowGroupHeaderTemplate={headerTemplate}
                    size="small" scrollable scrollHeight="400px" style={{width:1040}}>
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
                <Button onClick={()=>{banUser()}}  icon="pi pi-times" 
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
                        <Column field="id" header="Id" style={{ minWidth: '100px' }}></Column>
                    </DataTable>
                <div className={s.btn}>
                <Button onClick={()=>{deletePost()}}  icon="pi pi-times" 
                className="p-button-rounded p-button-danger" 
                disabled={!selectedPost|| !selectedPost.length}/>
                </div> 

            </div>
        </div>
       


        );
    }

                
export default  AdminHome







