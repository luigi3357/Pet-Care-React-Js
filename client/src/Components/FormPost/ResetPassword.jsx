import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default function ResetPassword() {
    function validate (){}
 const  user = useSelector((state)=> state.login)
 const dispatch = useDispatch()
 const [erorrs,setErrors] = useState({})
const [form,setForm] = useState({
    email:'',
    password:'',
    newpassword:'',
    repeatnewpassword:'',
})
function handleChange (e) {
    setForm({
        ...form,
        [e.target.name]: e.target.value
    })
    setErrors(validate({
        ...form,
        [e.target.name]: e.target.value
    }))
}
function onSubmit () {
 if (user){
     dispatch(ResetPassword(form))
 }
}
return (
    <div>
        <form>
            <section>
            <div>
         <h3>E-mail</h3>
         <input   type='text'  value={form.email} name='email' onChange={(e) =>handleChange(e)}/>
            </div>

            <div>
<h3>Contraseña anterior</h3>
<input   type='text'  value={form.password} name='password' onChange={(e) =>handleChange(e)}/>
        
            </div>

        <div>
        <h3>Contraseña nueva</h3>
        <input   type='text'  value={form.newpassword} name='newpassword' onChange={(e) =>handleChange(e)}/>
        </div>
        <div>
            <h3>Repetir contraseña anterior</h3>
            <input   type='text'  value={form.repeatnewpassword} name='repeatnewpassword' onChange={(e) =>handleChange(e)}/>
          
        </div>



        <button  type='submit' >Confirmar</button>
        </section>
        </form>
    </div>
)

}