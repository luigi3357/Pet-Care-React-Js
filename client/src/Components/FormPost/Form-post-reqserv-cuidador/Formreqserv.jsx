import React,{useState, useMemo,useEffect} from 'react'
import { useDispatch,useSelector, } from 'react-redux';

export default function FormCard(){
   
      //  const dispatch= useDispatch()
       
    //   const typesState = useSelector((state)=> state.typePokemon)
        
       
        const  idautor = useSelector((state)=> state.login)

        const [form,setForm]= useState({
        title:'',
        description:'',
        price:'',
        image:[],
        type:[],
        size:[],
        address:'',
        phone:'',
        author_id:idautor.id,
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
         if (form.price <= 0 ){
            errors.price = 'El precio no puede ser 0 o menor'
        } if (form.type.length <= 0 ){
            errors.type = 'Se solicita el tipo de mascota'
        } if (form.type.length > 5 ){
            errors.type = 'No puede seleccionar 2 veces el mismo'
        } if (form.size.length <= 0  ){
          errors.size = 'Se solicita el tamaño de mascota'
      } if (form.size.length > 3 ){
          errors.size = 'No puede seleccionar 2 veces el mismo'
      } if(!form.address){
        errors.address = 'Se requiere su direccion'
      } if(!form.phone){
        errors.phone = 'Se requiere su numero de telefono'
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
            form.price.length <= 5000 &&
            form.phone.length  >= 1 &&
            form.phone.length <= 50 &&
           form.type.length >= 1 &&
           form.type.length < 5 &&
           form.size.length >= 1 &&
           form.size.length < 4 &&
           form.address.length > 0 &&
           form.address.length < 150 
           ){
              return false;
           }else{
               return true;
           }
       },[form]);
       useEffect(() => {
     
      }, [errors, form]);





     
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
       // dispatch(postPublic(form))
        alert('Servicio creado!')
        setForm({
            title:'',
            description:'',
            price:'',
            image:[],
            type:[],
            size:[],
            address:'',
            phone:'',
            author_id:'idautor.id',
          
        })
    }
   //     dispatch(fetchAllPosts())
   }

    
   
    return (
        <div>
           
        <div>
        <form  onSubmit={(e)=> handleSubmit(e)}>
        <section >
    
       
      <div  className='entero'>
      <h1>Formulario de Publicacion</h1>
      </div> 
      
        <div  className='entero'>
        <label>Titulo de su publicacion</label>
        <input   type='text'  value={form.title} name='title' onChange={(e) =>handleChange(e)}/>
        {
            errors.title && (<p>{errors.title}</p>)
        }
       
        </div>
     
       
        <div>
           <label>Describa lo que solicita</label> 
           <input type='text'  value={form.description} name='description' onChange={(e) =>handleChange(e)}/>
           {
                errors.description && (<p>{errors.description}</p>)
            }
        </div>
        <div>
           <label>Direccion</label> 
           <input type='text'  value={form.address} name='address' onChange={(e) =>handleChange(e)}/>
           {
                errors.addres && (<p>{errors.address}</p>)
            }
        </div>
        <div>
           <label>Numero de telefono</label> 
           <input type='number' value={form.phone} name='phone' onChange={(e) =>handleChange(e)}/>
       {
           errors.phone && (<p>{errors.phone}</p>)
       }
        </div>
      
        <div>
           <label>Costo del servicio</label> 
          <input type='number' min="1" value={form.price} name='price' onChange={(e)=>handleChange(e)}/>
                {
                    errors.price && (<p>{errors.price}</p>)
                } 
        
        </div>
      
        <div  >
            <label>Imagenes de su mascota</label>
            <input type='text' value={form.image} name='image' onChange={(e)=>handleChange(e)} />
            {
                errors.image &&  (<p>{errors.image}</p>)
            }
        </div>
    
                   
             
        <div>
           
            <h1>¿Que tipo de mascota posee?</h1>
            
          Perro  <input 
          onChange={(e)=>{handleCheckType(e)
         }
          } type="checkbox" name="perro" value='perro' />
                
            Gato<input   onChange={handleCheckType}type="checkbox"  name="gato" value='gato'/>
                
            Aves<input  onChange={handleCheckType} type="checkbox"  name="aves" value='aves' />
                
            Roedores<input  onChange={handleCheckType} type="checkbox"  name="roedores" value= 'roedores' />
            {
            errors.type && 
            (
              <p>{errors.type}</p>
            ) 
            }
       

        
               
        </div>
              
        
    





        <div>
           
           <h1>Defina el tamaño de su mascota</h1>
           
         Pequeño  <input 
         onChange={(e)=>{handleSelectS(e)
        }
         } type="checkbox" name="pequeño" value='pequeño' />
               
           Mediano<input   onChange={handleSelectS}type="checkbox"  name="mediano" value='mediano'/>
               
           Grande<input  onChange={handleSelectS} type="checkbox"  name="grande" value='grande' />
               
           {
            errors.size && 
            (
              <p>{errors.size}</p>
            ) 
            }
       
              
             
       
          
           </div>
       <div>






            </div>



       <div> 
                <button  type='submit' disabled={disableSubmit}>Crear Servicio!</button>
       </div>
    
       </section>
       </form>

   



       </div>
     
    </div>

    )
    
   
           
    

    

}