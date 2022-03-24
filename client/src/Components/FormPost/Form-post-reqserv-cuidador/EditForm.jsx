import React,{useState, useMemo,useEffect} from 'react'
import { useDispatch,useSelector, } from 'react-redux';
import { editPost,fetchAllPosts,getAllUsers } from '../../../REDUX/actions/action';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import AddressAutocom from '../../AddressAutocom';
import {Link} from 'react-router-dom'
import './Form.css'
export default function FormCard(){
   
        const dispatch= useDispatch()
        const navigate = useNavigate()
    //   const typesState = useSelector((state)=> state.typePokemon)
        
       const {id} = useParams()
       const author= JSON.parse(localStorage.getItem("login"))
       const post = useSelector((state) => state.filtered_posts)
        const filterpostt = post.filter(e => e.author_id === author.id)

    
        const [form,setForm]= useState({
        title:'',
        description:'',
        price:'',
        type:'',
        size:'',
        address:'',
        phone:'',
        id:filterpostt.map(e => e.id).toString(),
        author_id:author.id,
        
        
    })
       
    
    
    const [errors,setErrors]= useState({})
    const [disabled, setDisabled] = useState(true)

    const disableSubmit = useMemo(() =>{
        if(
          
        
          
          
          
          form.title.length < 50 &&
          form.description.length < 400 &&
          form.price.length <= 6&&
           form.price > 0&&
           form.price != 0 && 
           form.phone >= 0 &&
          form.phone.length <= 15 
        
        
         
         
        
        
        
           ){
              return false;
           }else{
               return true;
           }
       },[form]);
       useEffect(() => {
        dispatch(getAllUsers())
      }, [errors, form]);

      // const disableSubmit = useMemo(() =>{
      //   if(
      //     form.title.length > 0 &&
      //     form.title.length < 50 &&
      //     form.price > 0&&
      //     form.description.length > 0 &&
      //     form.description.length < 400 &&
      //     form.price.length  >= 1 &&
      //     form.price.length <= 5&&
      //     form.phone.length  >= 1 &&
      //     form.phone.length <= 15 &&
      //     form.phone > 0&&
      //    form.type.length >= 1 &&
      //    form.type.length < 5 &&
      //    form.size.length >= 1 &&
      //    form.size.length < 4 &&
      //    form.address.length > 0 &&
      //    form.address.length < 150 
      //      ){
      //         return false;
      //      }else{
      //          return true;
      //      }
      //  },[form]);
      //  useEffect(() => {
      //   dispatch(getAllUsers())
      // }, [errors, form]);




     
       function handleChange(e){
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        
       }
   
       function handleCheckType(e){
           
        setForm({
          ...form,
          type: e.target.value
        });
      
      
    
          }
 
      




        
        
       function handleSelectS(e){
        setForm({
          ...form,
          size: e.target.value
        });
      
      
     
       }

   

    function handleSubmit(e){
        e.preventDefault()
        const newLocation = window.localStorage.getItem("newLocation");
        if (newLocation) {
          let form2={...form, location: [JSON.parse(newLocation).address].toString()} 
          dispatch(editPost(form2))
          dispatch(fetchAllPosts())
          navigate(`/`)
          setForm({
            title:'',
            description:'',
            price:'',
           email:  author.email,
            type:'',
            size:'',
            address:'',
            phone:'',
            author_id:author.id,
            
          })
        }else{
          e.preventDefault()
          alert('Se requiere su ubicacion')
        }
      
     }

    
   
    return (
      <body className='bodyforms'>
      <div>
        <div>
           
        <div>
        <form  className='formpublic' onSubmit={(e)=> handleSubmit(e)}>
        <div className='form_container' >
    
       
      <div  className='entero'>
      <h1  className='form_title'>Edita tu  Publicacion</h1>
      </div> 
      
        <div className='form_group' >
        <label  className='form_label'>Titulo</label>
        <input className='form_input'  type='text'  value={form.title} name='title' onChange={(e) =>handleChange(e)}/>
        {
            errors.title && (<p  className='errortxt'>{errors.title}</p>)
        }
       
        </div>
     
       
        <div className='form_group'>
           <label  className='form_label'>Description</label> 
           <input   className='form_input' type='text'  value={form.description} name='description' onChange={(e) =>handleChange(e)}/>
           {
                errors.description && (<p  className='errortxt'>{errors.description}</p>)
            }
        </div>
        <div  className='form_group'>
           <label className='form_label' >Direccion</label> 
           <AddressAutocom/>
           {
                errors.address && (<p className='errortxt'>{errors.address}</p>)
            }
        </div>
        <div className='form_group'>
           <label  className='form_label'>Numero de telefono</label> 
           <input className='form_input' type='number' value={form.phone} name='phone' onChange={(e) =>handleChange(e)}/>
       {
           errors.phone && (<p className='errortxt'> {errors.phone}</p>)
       }
        </div>
      
        <div  className='form_group'>
           <label  className='form_label'>Costo del servicio</label> 
          <input className='form_input' type='number' min="1" value={form.price} name='price' onChange={(e)=>handleChange(e)}/>
                {
                    !form.price ? (<p className='errortxt'>Se requiere actualizar precio y numero de telefono</p>) : null
                } 
        
        </div>
      
     
    
                   
             
        <div>
           
           <h2>Tipo de mascota</h2>
           <div>
            <input  onChange={(e)=>{handleCheckType(e)
        }
       } type="radio" name="tipo" value='perro' />
       <label> Perro</label>  
        
           </div>
         <div>
           <input   onChange={handleCheckType}type="radio"  name="tipo" value='gato'/>
         <label> Gato</label> 
         </div>
               
        <div>
          <input  onChange={handleCheckType} type="radio"  name="tipo" value='aves' />
        <label> Aves</label> 
        </div>
          <div>
           <input  onChange={handleCheckType} type="radio"  name="tipo" value= 'roedores' />
          <label> Roedores</label>     
          </div>
         
          
      
      <div>
           
           <h2>Tamaño de mascota</h2>
       <div>
           <input 
         onChange={(e)=>{handleSelectS(e)
         }
        } type="radio" name="tamaño" value='pequeño' />
        <label>Pequeño</label>
       </div>
       
       <div>
              
           
           <input   onChange={handleSelectS}type="radio"  name="tamaño" value='mediano'/>
               <label>Mediano</label>
           </div>   
           <div>

           <input  onChange={handleSelectS} type="radio"  name="tamaño" value='grande' />
           <label>Grande</label>
           </div>
               
           </div>
              {
               form.size.length >= 1 ? null : (<p className='errorarray'>(Campos obligatorios)</p>) 
              }
       
              
             
       
          
       
              
       </div>
             
       
   


              
        
    





       
       <div>






            </div>



       <div> 
                <button  type='submit' className={disableSubmit ?'form_submiterr' : 'form_submitone'} disabled={disableSubmit}  >Editar publicacion</button>
       </div>
    
       </div>


       <Link to={`/PersonalProfile/${author.id}`}>
        <button className='form_backp' type='button'>
                Volver
            </button>
        </Link>
       </form>

   



       </div>
     
    </div>
    </div>
    </body>
    )
    
   
           
    

    

}