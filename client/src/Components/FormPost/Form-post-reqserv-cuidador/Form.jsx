import React,{useState, useMemo,useEffect} from 'react'
import { useDispatch,useSelector, } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {createPost,fetchAllPosts,getAllUsers} from '../../../REDUX/actions/action'
import {Link} from 'react-router-dom'
import AddressAutocom from "../../AddressAutocom";
import './Form.css'
export default function FormCard(){
   
       const dispatch= useDispatch()
       const navigate = useNavigate()
       //   const typesState = useSelector((state)=> state.typePokemon)
       
       
      //  const  idautor = useSelector((state)=> state.login)
      //  const  user = useSelector((state)=> state.users)
      //  const oneUser = user.filter(e => e.id === idautor.id)
      //  const oneEmail =oneUser.map(e => e.email)
      const author= JSON.parse(localStorage.getItem("login"))

        const [form,setForm]= useState({
        title:'',
        description:'',
        price:'',
       email: author.email,
        type:'',
        size:'',
        address:'',
        phone:'',
        author_id:author.id,
      })
      function validate(form){ 
        let errors = {};
        if(!form.title){
          errors.title = 'Se requiere un titulo'
    
      } 
       if (!form.description  ){
          errors.description = 'Se requiere una descripcion'
      } 
       if (!form.price){
          errors.price = 'Introduzca el precio de su servicio'
      }
       if (form.price.length <= 0 ){
          errors.price = 'El precio no puede ser 0 o menor'
      }  if (form.price.length > 6 ){
        errors.price = 'El precio no puede ser mayor a 6 digitos'
    }
       if (!form.type ){
          errors.type = 'Se solicita el tipo de mascota'
      } if (!form.size ){
        errors.type = 'Se solicita el tamaño de mascota'
    } 
      
     if(!form.phone){
      errors.phone = 'Se requiere su numero de telefono'
    }
    if(!form.phone.length > 13){
      errors.phone = 'Su numero contiene demasiado digitos'
    }
         
      return errors;
    }
    const [errors,setErrors]= useState({})
    const [disabled, setDisabled] = useState(true)

    const disableSubmit = useMemo(() =>{
        if(
            form.title.length > 0 &&
            form.title.length < 50 &&
           
            form.description.length > 0 &&
            form.description.length < 400 &&
            form.price.length  >= 1 &&
            form.price.length <= 6&&
            form.price > 0&&
            form.price != 0 && 
            form.phone.length  > 0 &&
            form.phone.length <= 15 &&
            form.phone > 0&&
           form.type.length  >0 &&
           form.size.length > 0
        
          
          
           ){
              return false;
           }else{
               return true;
           }
       },[form]);
       useEffect(() => {
        dispatch(getAllUsers())
      }, []);





     
       function handleChange(e){
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...form,
            [e.target.name]: e.target.value
        }))
       }
   
       function handleCheckType(e){
        
         setForm({
           ...form,
           type: e.target.value
         });
       
       
       setErrors(validate({
        ...form,
         type: e.target.value,
    }))
      }

             //cuando este es seleccionado guarda el tipo en un arreglo
      




        
        
       function handleSelectS(e){
        setForm({
          ...form,
          size: e.target.value
        });
      
      
      setErrors(validate({
       ...form,
        size: e.target.value,
   }))
       }

   

    function handleSubmit(e){
      e.preventDefault()
      const newLocation = window.localStorage.getItem("newLocation");
      if (newLocation) {
        let form2={...form, location: [JSON.parse(newLocation).address].toString()} 
     
        dispatch(createPost(form2))
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
        <form className='formpublic' onSubmit={(e)=> handleSubmit(e)}>
        <div className='form_container'>
    
       
      <div >
      <h1  className='form_title'>Formulario de Publicacion</h1>
      </div> 
      
        <div  className='form_group'>
        <label  className='form_label'>Titulo</label>
        <input className='form_input'  type='text'  value={form.title} name='title' onChange={(e) =>handleChange(e)}/>
        {
            errors.title && (<p  className='errortxt'>{errors.title}</p>)
        }
       
        </div>
     
       
        <div  className='form_group'>
           <label className='form_label' >Descripción</label> 
         <textarea className='form_input' type='text' maxLength={300} cols={5} rows={4}  value={form.description} name='description' onChange={(e) =>handleChange(e)}/>

           {
                errors.description && (<p  className='errortxt'>{errors.description}</p>)
            }
        </div>
        <div className='form_group'>
           <label className='form_label'>Direccion</label> 
           <AddressAutocom/>
        </div>
        <div  className='form_group' >
           <label  className='form_label' >Numero de telefono</label> 
           <input  min="1"  className='form_input'  type='number' value={form.phone} name='phone' onChange={(e) =>handleChange(e)}/>
       {
           errors.phone && (<p  className='errortxt'>{errors.phone}</p>)
       }
        </div>
      
        <div className='form_group'  >
           <label className='form_label' >Costo del servicio</label> 
          <input    className='form_input'   type='number' min="1" value={form.price} name='price' onChange={(e)=>handleChange(e)}/>
                {
                    errors.price && (<p className='errortxt'>{errors.price}</p>)
                } 
        
        </div>
      
    
    
                   
             
        <div>
           
            <h2>Tipo de mascota</h2>
            <div>
             <input  type ="radio" onChange={(e)=>{handleCheckType(e)
         }
        }  name="tipo" value='perro' />
        <label> Perro</label>  
         
            </div>
          <div>
            <input   onChange={handleCheckType}type ="radio"  name="tipo" value='gato'/>
          <label> Gato</label> 
          </div>
                
         <div>
           <input  onChange={handleCheckType}type ="radio"  name="tipo" value='aves' />
         <label> Aves</label> 
         </div>
           <div>
            <input  onChange={handleCheckType} type ="radio"  name="tipo" value= 'roedores' />
           <label> Roedores</label>     
           </div>
          
           
       

        
               
        </div>
              
        
    





        <div>
           
           <h2>Tamaño de mascota</h2>
       <div>
           <input 
         onChange={(e)=>{handleSelectS(e)
         }
        }type ="radio" name="tamaño" value='pequeño' />
        <label>Pequeño</label>
       </div>
       
       <div>
              
           
           <input   onChange={handleSelectS}type ="radio"  name="tamaño" value='mediano'/>
               <label>Mediano</label>
           </div>   
           <div>

           <input  onChange={handleSelectS}type ="radio"  name="tamaño" value='grande' />
           <label>Grande</label>
           </div>
           {
               form.size ?  (<p className='errorarray2'>(Campos obligatorios)</p>)  : (<p className='errorarray'>(Campos obligatorios)</p>) 
              } 
           
       
              
             
       
          
           </div>
       <div>






            </div>



       <div> 
                <button className={disableSubmit ?'form_submiterr':'form_submitone'}    disabled={disableSubmit} type='submit'  >Crear Servicio!</button>
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
    </body>
    )
    
   
           
    

    

}