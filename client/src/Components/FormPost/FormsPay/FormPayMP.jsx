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
        }
          if(!form.dnicpf){
            errors.dnicpf = 'Se requiere su numero de identificacion'
      
        } 
         if (form.dnicpf.length > 50 ){
            errors.dnicpf = 'Caracteres maximos superados'
        } 
         if(!form.email){
            errors.email = 'Se requiere su Email MercadoPago'
      
        } 
         if (form.email.length > 50 ){
            errors.email = 'Caracteres maximos superados'
        }  if(!form.alias){
            errors.alias = 'Se requiere su alias'
      
        } 
         if (form.alias.length > 50 ){
            errors.alias = 'Caracteres maximos superados'
        } 
         
        return errors;
    }
    const [errors,setErrors]= useState({})
    const [form,setForm]= useState({
        name:'',
        dnicpf:'',
        email:'',
        alias:'',
        author_id:'idautor',
      })
      
      const disableSubmit = useMemo(() =>{
        if(
            form.name.length > 0 &&
            form.name.length < 50 &&
            form.dnicpf.length > 0 &&
            form.dnicpf.length < 50 &&
            form.alias.length > 0 &&
            form.alias.length < 50 &&
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
            && !form.dnicpf 
            && !form.alias
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
            dnicpf:'',
            alias:'',
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
      <h1>Transferencia MercadoPago</h1>
      </div>    
        
    <div >
        <label>Nombre y Apellido</label>
        <input   type='text'  value={form.name} name='name' onChange={(e) =>handleChange(e)}/>
        {
                errors.name && (<p>{errors.name}</p>)
            }    
       
        </div>
      
        <div >
        <label>DNI/CPF</label>
        <input   type='text'   value={form.dnicpf} name='dnicpf' onChange={(e) =>handleChange(e)}/>
        {
                errors.dnicpf && (<p>{errors.dnicpf}</p>)
            }    
       
        </div>


        <div >
        <label>Mercado Pago E-mail</label>
        <input   type='text'  value={form.email} name='email' onChange={(e) =>handleChange(e)}/>
        {
                errors.email && (<p>{errors.email}</p>)
            }    
       
        </div>


        <div >
        <label>ALIAS</label>
        <input   type='text'  value={form.alias} name='alias' onChange={(e) =>handleChange(e)}/>
        {
                errors.alias && (<p>{errors.alias}</p>)
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
                <button  type='submit' >Cancelar</button>
       </div>










    </section>
</form>
        </div>


    )
}

