import React,{useState, useMemo,useEffect} from 'react'
import { useDispatch,useSelector, } from 'react-redux';
import { editProfilePost } from '../../REDUX/actions/action';

export default function FormPayData () {

    const dispatch = useDispatch()
    const  idautor = useSelector((state)=> state.login)


    function validate(form){ 
        let errors = {};
        if(!form.name){
            errors.name = 'Se requiere un nombre'
      
        } 
         if (form.name.length > 50 ){
            errors.name = 'Caracteres maximos superados'
        }
        if(!form.lastname){
            errors.lastname = 'Se requiere su Apellido'
      
        } 
         if (form.lastname.length > 50 ){
            errors.lastname = 'Caracteres maximos superados'
        }
         
       
         if (form.location.length > 50 ){
            errors.location = 'Caracteres maximos superados'
        }  if(!form.location){
            errors.location = 'Se requiere su Direccion'
      
        } 
         if (!form.phone){
            errors.phone = 'Se requiere su numero de telefono'
        } 
        if (form.phone.length > 50 ){
            errors.phone = 'Caracteres maximos superados'
        } 
        if (!form.bio){
            errors.bio = 'Se requiere una breve descripcion de su persona'
        } 
        if (form.bio.length > 130 ){
            errors.bio = 'Caracteres maximos superados'
        } 
        if (!form.email){
            errors.email = 'Se requiere su Email'
        } 
        if (form.email.length > 30 ){
            errors.email = 'Caracteres maximos superados'
        } 
        return errors;
    }
    
    const [errors,setErrors]= useState({})
    const [form,setForm]= useState({
        name:'',
        lastname:'',
        location:'',
        phone:'',
        bio:'',
        email:'',
        myImages:"",
      })
      
      const disableSubmit = useMemo(() =>{
        if(
            form.name.length > 0 &&
            form.name.length < 50 &&
            form.lastname.length > 0 &&
            form.lastname.length < 50 &&
            form.location.length > 0 &&
            form.location.length < 50 &&
            form.phone.length > 0 &&
            form.phone.length < 50 &&
            form.bio.length > 0 &&
            form.bio.length < 250 



          
            ){
               return false;
            }else{
                return true;
            }
        },[form]);
        useEffect(() => {
      
       }, [errors, form]);

      //hacemos lo de base64 para guardar la imagen que el usuario quiere de perfil
      const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };
      const handleFileUpload = async (e) => {
        const file = e.target.myImages[0];
        const base64 = await convertToBase64(file);
        dispatch(editProfilePost({ ...form, myImages: base64 }))
        
      };
    
           




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

       function handleSubmit(e){
        if(
      



               !form.lastname 
            && !form.location 
            && !form.phone
            && !form.bio 
            && !form.name 
            && !form.email
         ){
            alert('FORMULARIO VACIO')
        }
        
    else  {
         e.preventDefault()
        dispatch(editProfilePost(form))
        alert('Su perfil a sido editado!')
        setForm({
            name:'',
            last_name:'',
            location:'', 
            phone:'',
            bio:'',
            email:'',
            myImages:'',
          
        })
        console.log(form)
    }
 
   }




    return (
        <div>
<form  onSubmit={(e)=> handleSubmit(e)}>
    <section>
    <div  className='entero'>
      <h1>Edita tu perfil!</h1>
      </div>    
        
      <div >
        <label>Foto de perfil</label>
        <input   type='file' accept=".jpeg, .png, .jpg"  value={form.myImages} name='myImages' onChange={(e) => handleFileUpload(e)}/>
         {/*   aca va el error que le quieran validar */}
       
        </div>    
    <div >
        <label>Nombre</label>
        <input   type='text'  value={form.name} name='name' onChange={(e) =>handleChange(e)}/>
        {
                errors.name && (<p>{errors.name}</p>)
            }    
       
        </div>
        <div >
        <label>Apellido</label>
        <input   type='text'  value={form.lastname} name='lastname' onChange={(e) =>handleChange(e)}/>
        {
                errors.lastname && (<p>{errors.lastname}</p>)
            }    
       
        </div>

        <div >
        <label>Email</label>
        <input   type='text'  value={form.email} name='email' onChange={(e) =>handleChange(e)}/>
        {
                errors.email && (<p>{errors.email}</p>)
            }    
       
        </div>



      
        <div >
        <label>Tu direccion</label>
        <input   type='text'   value={form.location} name='location' onChange={(e) =>handleChange(e)}/>
        {
                errors.location && (<p>{errors.location}</p>)
            }    
       
        </div>


        <div >
        <label>Telefono</label>
        <input   type='text'  value={form.phone} name='phone' onChange={(e) =>handleChange(e)}/>
        {
                errors.phone && (<p>{errors.phone}</p>)
            }    
       
        </div>


        <div >
        <label>Biografia</label>
        <input   type='text'  value={form.bio} name='bio' onChange={(e) =>handleChange(e)}/>
        {
                errors.bio && (<p>{errors.bio}</p>)
            }    
       
        </div>
    




        <div> 
                <button  type='submit' disabled={disableSubmit}>Confirmar</button>
       </div>
       <div> 
                <button  type='submit' >Cancelar</button>
       </div>










    </section>
</form>
        </div>


    )
}
