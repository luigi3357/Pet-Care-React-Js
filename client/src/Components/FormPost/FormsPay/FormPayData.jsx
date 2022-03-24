// email  // name last name // DNI/CPF // REMARK(OPCIONAL)/alias/Tips(noimput)
import React,{useState, useMemo,useEffect} from 'react'
import { useDispatch,useSelector, } from 'react-redux';


export default function FormPayData () {
    function validate(form){ 
        let errors = {};
        if(!form.name){
            errors.name = 'Se requiere un nombre y apellido'
      
        } 
         if (form.name.length > 50 ){
            errors.name = 'Caracteres maximos superados'
        }  if(!form.cbu){
            errors.cbu = 'Se requiere su numero de cbu'
      
        } 
         if (form.cbu.length > 50 ){
            errors.cbu = 'Caracteres maximos superados'
        }  if(!form.cuitcuil){
            errors.cuitcuil = 'Se requiere su CUIT/CUIL'
      
        } 
         if (form.cuitcuil.length > 50 ){
            errors.cuitcuil = 'Caracteres maximos superados'
        }  if(!form.email){
            errors.email = 'E-mail opcional'
      
        } 
         if (form.email.length > 50 ){
            errors.email = 'Caracteres maximos superados'
        }  if(!form.id){
            errors.id = 'Se requiere su ID'
      
        } 
       
         
        return errors;
    }
    const [errors,setErrors]= useState({})
    const [form,setForm]= useState({
        name:'',
        cbu:'',
        cuitcuil:'',
        email:'',
       
        author_id:'idautor',
      })
      const disableSubmit = useMemo(() =>{
        if(
            form.name.length > 0 &&
            form.name.length < 50 &&
            form.cbu.length > 0 &&
            form.cbu.length < 50 &&
            form.cuitcuil.length > 0 &&
            form.cuitcuil.length < 50 &&
         
            form.email.length > 0 &&
            form.email.length < 50 



          
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

       function handleSubmit(e){
        if(!form.name 
            && !form.cbu 
            && !form.cuitcuil 
            && !form.email 
          
         ){
            alert('FORMULARIO VACIO')
        }
        
    else  {
         e.preventDefault()
    
       // dispatch(postPublic(form))
        alert('Paga enviada!')
        setForm({
            name:'',
            cbu:'',
            cuitcuil:'',
            email:'',
            
            author_id:'idautor',
          
        })
    }
   //     dispatch(fetchAllPosts())
   }




    return (
        <div>
<form  onSubmit={(e)=> handleSubmit(e)}>
    <section>
    <div  className='entero'>
      <h1>Transferencia Bancaria</h1>
      </div>    
        
    <div >
        <label>Nombre y Apellido</label>
        <input   type='text'  value={form.name} name='name' onChange={(e) =>handleChange(e)}/>
        {
                errors.name && (<p>{errors.name}</p>)
            }    
       
        </div>
        <div >
        <label>CBU</label>
        <input   type='text'  value={form.cbu} name='cbu' onChange={(e) =>handleChange(e)}/>
        {
                errors.cbu && (<p>{errors.cbu}</p>)
            }    
       
        </div>
        <div >
        <label>CUIL/CUIT</label>
        <input   type='text'   value={form.cuitcuil} name='cuitcuil' onChange={(e) =>handleChange(e)}/>
        {
                errors.cuitcuil && (<p>{errors.cuitcuil}</p>)
            }    
       
        </div>


        <div >
        <label>E-mail</label>
        <input   type='text'  value={form.email} name='email' onChange={(e) =>handleChange(e)}/>
        {
                errors.email && (<p>{errors.email}</p>)
            }    
       
        </div>


      
        <div>
<h3>Tips</h3>
<p>La informacion brindada corre por su cuenta, para una correcta realizacion de la transaccion 
    supervise la informacion creada
</p>

</div>




        <div> 
                <button  type='submit' disabled={disableSubmit}>Confirmar</button>
       </div>
       <div> 
                <button  type='submit' disabled={disableSubmit}>Cancelar</button>
       </div>










    </section>
</form>
        </div>


    )
}

