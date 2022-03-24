import React,{useState, useMemo,useEffect} from 'react'
import { useDispatch,useSelector, } from 'react-redux';
import { editPost,getAllUsers } from '../../../REDUX/actions/action';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './Form.css'
export default function FormCard(){
   
        const dispatch= useDispatch()
        const navigate = useNavigate()
    //   const typesState = useSelector((state)=> state.typePokemon)
        
       const {id} = useParams()
       const author= JSON.parse(localStorage.getItem("login"))
       const post = useSelector((state) => state.filtered_posts)
        const filterpostt = post.filter(e => e.author_id === author.id)

    console.log(filterpostt.map(e => e.id).toString(), 'soyfilterpost')
    
        const [form,setForm]= useState({
        title:'',
        description:'',
        price:'',
        type:[],
        size:[],
        address:'',
        phone:'',
        id:filterpostt.map(e => e.id).toString(),
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
     if (form.type.length < 1 ){
        errors.type = 'Se solicita el tipo de mascota'
    } if (form.type.length > 5 ){
        errors.type = 'No puede seleccionar 2 veces el mismo'
    } if (form.size.length < 1  ){
      errors.size = 'Se solicita el tamaño de mascota'
  } if (form.size.length > 3 ){
      errors.size = 'No puede seleccionar 2 veces el mismo'
  } if(!form.address){
    errors.address = 'Se requiere su direccion'
  } if(!form.phone){
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
          
          form.title.length < 50 &&
          form.price > 0&&
      
          form.description.length < 400 &&
          
          form.price.length <= 6&&
         
          form.phone.length <= 15 &&
          form.phone > 0&&
      
         form.type.length < 5 &&
    
         form.size.length < 4 &&
      
         form.address.length < 150 
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
        setErrors(validate({
            ...form,
            [e.target.name]: e.target.value
        }))
       }
   
       function handleCheckType(e){
        if(!form.type.includes(e.target.value)){
            setForm({
                ...form,
                type:[...form.type, e.target.value]
            })
           }
           if (e.target.checked) {
             //cuando este es seleccionado guarda el tipo en un arreglo
             setForm({
               ...form,
               type: [...form.type, e.target.value],
             });
           }
           if (!e.target.checked) {
             //cuando el tipo es deselecconado, lo saca del array de tipos
             form.type.splice(form.type.indexOf(e.target.value), 1);
             setForm({
               ...form,
             });
             console.log(form.type)
           }
           setErrors(validate({
            ...form,
            [e.target.name]: e.target.value,
        }))
            console.log(form.type)
          }
 
      




        
        
       function handleSelectS(e){
        if(!form.size.includes(e.target.value)){
            setForm({
                ...form,
                size:[...form.size, e.target.value]
            })
           }
           if (e.target.checked) {
             //cuando este es seleccionado guarda el tipo en un arreglo
             setForm({
               ...form,
               size: [...form.size, e.target.value],
             });
           }
           if (!e.target.checked) {
             //cuando el tipo es deselecconado, lo saca del array de tipos
             form.size.splice(form.size.indexOf(e.target.value), 1);
             setForm({
               ...form,
             });
             console.log(form.size)
           }
           setErrors(validate({
            ...form,
            [e.target.name]: e.target.value,
        }))
            console.log(form.size)
       }

   

    function handleSubmit(e){
        if(!form.title 
            && !form.description 
            && !form.price 
            && !form.phone 
            && !form.size 
            && !form.type 
            && !form.address){
            alert('FORMULARIO VACIO')
        }
        
    else  {
         e.preventDefault()
    
        console.log(form)
        dispatch(editPost(form))
        navigate(`/`)
        alert('Servicio editado!')
        setForm({
            title:'',
            description:'',
            price:'',
            type:[],
            size:[],
            address:'',
            phone:'',
            id:filterpostt.map(e => e.id).toString(),
            author_id: author.id ,
            
          
        })
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
           <input  className='form_input'  type='text'  value={form.address} name='address' onChange={(e) =>handleChange(e)}/>
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
                    errors.price && (<p className='errortxt'>{errors.price}</p>)
                } 
        
        </div>
      
     
    
                   
             
        <div>
           
           <h2>Tipo de mascota</h2>
           <div>
            <input  onChange={(e)=>{handleCheckType(e)
        }
       } type="checkbox" name="perro" value='perro' />
       <label> Perro</label>  
        
           </div>
         <div>
           <input   onChange={handleCheckType}type="checkbox"  name="gato" value='gato'/>
         <label> Gato</label> 
         </div>
               
        <div>
          <input  onChange={handleCheckType} type="checkbox"  name="aves" value='aves' />
        <label> Aves</label> 
        </div>
          <div>
           <input  onChange={handleCheckType} type="checkbox"  name="roedores" value= 'roedores' />
          <label> Roedores</label>     
          </div>
         
          
      
      <div>
           
           <h2>Tamaño de mascota</h2>
       <div>
           <input 
         onChange={(e)=>{handleSelectS(e)
         }
        } type="checkbox" name="pequeño" value='pequeño' />
        <label>Pequeño</label>
       </div>
       
       <div>
              
           
           <input   onChange={handleSelectS}type="checkbox"  name="mediano" value='mediano'/>
               <label>Mediano</label>
           </div>   
           <div>

           <input  onChange={handleSelectS} type="checkbox"  name="grande" value='grande' />
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
       </form>

   



       </div>
     
    </div>
    </div>
    </body>
    )
    
   
           
    

    

}