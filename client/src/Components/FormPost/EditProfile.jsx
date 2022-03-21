import React,{useState, useMemo,useEffect} from 'react'
import { useDispatch,useSelector, } from 'react-redux';
import { editProfilePost, getLogin } from '../../REDUX/actions/action';

export default function FormPayData () {

    const dispatch = useDispatch()
    
    const  idautor = useSelector((state)=> state.login)
    const  user = useSelector((state)=> state.users)
    const oneUser = user.filter(e => e.id === idautor.id)
    const oneEmail =oneUser.map(e => e.email)
   console.log(oneEmail[0])
    function validate(form){ 
        let errors = {};
        if(!form.name){
            errors.name = 'Se requiere un nombre'
      
        } 
         if (form.name.length > 50 ){
            errors.name = 'Caracteres maximos superados'
        }
        if(!form.last_name){
            errors.last_name = 'Se requiere su Apellido'
      
        } 
         if (form.last_name.length > 50 ){
            errors.last_name = 'Caracteres maximos superados'
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
        if (form.bio.length > 180 ){
            errors.bio = 'Caracteres maximos superados'
        } 
        if (!form.myImages){
            errors.bio = 'Se necesita una imagen para su perfil'
        } 
        
        return errors;
    }
    
    const [errors,setErrors]= useState({})
    const [form,setForm]= useState({
        email:oneEmail[0],
        name:'',
        last_name:'',
        location:'',
        phone:'',
        bio:'',
        myImages:[],
        profileImgURL:'',
      })
      
      const disableSubmit = useMemo(() =>{
        if(
            form.name.length > 0 &&
            form.name.length < 50 &&
            form.last_name.length > 0 &&
            form.last_name.length < 50 &&
            form.location.length > 0 &&
            form.location.length < 50 &&
            form.phone.length > 0 &&
            form.phone.length < 50 &&
            form.bio.length > 0 &&
            form.bio.length < 250 && 
            form.myImages.length > 0 &&
            form.myImages.length < 3 &&
            form.profileImgURL


          
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
       Array.from(file).forEach(file=>{
           var reader = new FileReader();
           reader.readAsDataURL(file)
           reader.onload=function(){
               var base64 = reader.result;
              console.log(base64)
           //    return base64;
               setForm({
                   ...form,
                   myImages:[...form.myImages, base64 ]
               })
           }
       })
      };
      console.log(form.myImages, 'soylaimagendelform')
      const convertToBase64Profile = (file) => {
        Array.from(file).forEach(file=>{
            var reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload=function(){
                var base64 = reader.result;
               console.log(base64)
            //    return base64;
                setForm({
                    ...form,
                    profileImgURL:base64 
                })
            }
        })
       };
       console.log(form.profileImgURL, 'soylaimagendePerfil')



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
      



               !form.last_name 
            && !form.location 
            && !form.phone
            && !form.bio 
            && !form.name 
            && !form.email
         ){
            alert('Algun campo esta vacio')
        }
        
    else  {
         e.preventDefault()
        dispatch(editProfilePost(form))
        setTimeout(() => {
            dispatch(getLogin(form.email));       
            alert('Su perfil a sido editado!')
        }, 1000);
        setForm({
            name:'',
            last_name:'',
            location:'', 
            phone:'',
            bio:'',
            email:oneEmail[0],
            myImages:[],
            profileImgURL:'',
          
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
        <label>Nombre</label>
        <input   type='text'  value={form.name} name='name' onChange={(e) =>handleChange(e)}/>
        {
                errors.name && (<p>{errors.name}</p>)
            }    
       
        </div>
        <div >
        <label>Apellido</label>
        <input   type='text'  value={form.last_name} name='last_name' onChange={(e) =>handleChange(e)}/>
        {
                errors.last_name && (<p>{errors.last_name}</p>)
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

        <div >
        <label>Fotos de su hogar </label>
        <input   type='file' accept=".jpeg, .png, .jpg" multiple  name='myImages' onChange={(e) => convertToBase64(e.target.files)}/>
         {
                   errors.myImages && (<p>{errors.myImages}</p>)
         }
             <div >
         {
            form.myImages.map(el => {
                return(
            <img src={el} alt="Myimage" width="50" height="60"/>

                    )
                })
            }
            </div>
        </div>   
     
         <div>
         <label>Foto de Perfil</label>
        <input   type='file' accept=".jpeg, .png, .jpg"   name='profileImgURL' onChange={(e) => convertToBase64Profile(e.target.files)}/>
         {
                   errors.profileImgURL && (<p>{errors.profileImgURL}</p>)
         }
         <div>
         {
            form.myImages ? (<img src={form.profileImgURL} alt="Profilep" width="50" height="60"/>) : null
            }
         </div>
           
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
