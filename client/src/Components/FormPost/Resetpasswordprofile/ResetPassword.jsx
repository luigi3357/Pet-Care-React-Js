import React, { useState, useMemo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllUsers, resetPassword } from '../../../REDUX/actions/action'
import './Resetpassword.css'
import { Link } from "react-router-dom";
import bcrypt from "bcryptjs";

export default function ResetPassword() {

    
    // const  idautor = useSelector((state)=> state.login)
    // const  user = useSelector((state)=> state.users)
    const author = JSON.parse(localStorage.getItem("login"))
    const users = useSelector((state) => state.users);
    function validate() { }

    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
        email: author.email,
        password: '',
        newpassword: '',
        repeatnewpassword: '',
    })
    const [submit, setSubmit] = useState({
        password: '',
        email: author.email,
    })
    function validate(form) {
        let errors = {};
        if (!form.email) {
            errors.email = 'Se requiere un Email'

        }
        if (form.password.length < 8) {
            errors.password = 'La contraseña debe tener 8 o mas caracteres'
        } if (form.newpassword.length < 8) {
            errors.newpassword = 'La contraseña debe tener 8 o mas caracteres'
        } if (form.repeatnewpassword.length < 8) {
            errors.repeatnewpassword = 'La contraseña debe tener 8 o mas caracteres'
        }


        if (form.password === form.newpassword) {
            errors.newpassword = 'La contraseña nueva debe ser diferente'
        }
        if (form.newpassword !== form.repeatnewpassword) {
            errors.repeatnewpassword = 'Las nuevas contraseñas deben coincidir'
        }

        return errors;
    }

    const disableSubmit = useMemo(() => {
        if (
            form.email.length >= 3
            && form.email.length < 30
            && form.password.length >= 8
            && form.password.length < 30
            && form.newpassword.length >= 8
            && form.newpassword.length < 30
            && form.repeatnewpassword.length >= 8
            && form.repeatnewpassword.length < 30
            && form.password !==
            form.newpassword

            && form.newpassword.length ===
            form.repeatnewpassword.length
            && form.newpassword ===
            form.repeatnewpassword
        ) {
            return false;
        } else {
            return true;
        }
    }, [form]);



    function handleChange(e) {
        if (e.target.name === 'repeatnewpassword') {
            setForm({
                ...form,
                [e.target.name]: e.target.value
            })
            setSubmit({
                ...submit,
                password: e.target.value
            })
            setErrors(validate({
                ...form,
                [e.target.name]: e.target.value
            }))
        } else {
            setForm({
                ...form,
                [e.target.name]: e.target.value
            })

            setErrors(validate({
                ...form,
                [e.target.name]: e.target.value
            }))
        }

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...form,
            [e.target.name]: e.target.value
        }))


    }
    useEffect(() => {
        dispatch(getAllUsers())
    },[])
    
    async function  resetSubmit (e) {
        e.preventDefault()
        // const oneUser = user.filter(e => e.id === idautor.id)
    const oneUser = users.filter((e) => e.email === author.email);
    const passVerify = oneUser.map((e) => e.password).toString();


        // const onePass =oneUser.map(e => e.password)
    const verifyPassword = await bcrypt.compare(form.password,passVerify);
    if(verifyPassword === false){
        alert('Su contraseña actual no coincide')  
       
    }else{
        dispatch(getAllUsers())
        dispatch(resetPassword(submit))
            alert('Contraseña cambiada')
    }
}
    return (
        <body className='bodyforms'>
            <div>
                <div>
                    <form className='formpublic' onSubmit={e=>resetSubmit(e)}>
                        <div className='form_container'>
                            <div>
                                <h1 className='form_title'>Cambiar contraseña</h1>
                            </div>



                            <div className='form_group'>
                                <label className='form_label'>Contraseña Actual</label>
                                <input className='form_input' type='password' value={form.password} name='password' onChange={(e) => handleChange(e)} />
                                {
                                    errors.password && (<p className='errortxt'>{errors.password}</p>)

                                }
                            </div>

                            <div className='form_group'>
                                <label className='form_label'>Contraseña nueva</label>
                                <input className='form_input' type='password' value={form.newpassword} name='newpassword' onChange={(e) => handleChange(e)} />
                                {
                                    errors.newpassword && (<p className='errortxt'>{errors.newpassword}</p>)
                                }
                            </div>
                            <div className='form_group'>
                                <label className='form_label'>Repetir contraseña anterior</label>
                                <input className='form_input' type='password' value={form.repeatnewpassword} name='repeatnewpassword' onChange={(e) => handleChange(e)} />
                                {
                                    errors.repeatnewpassword && (<p className='errortxt'> {errors.repeatnewpassword}</p>)
                                }
                            </div>
                            <div>

                            </div>
                            <div>

                                <button className={disableSubmit ? 'form_submiterr' : 'form_submitone'} type='submit' disabled={disableSubmit} >Confirmar</button>
                            </div>


                        </div>
                        <Link to={`/PersonalProfile/${author.id}`}>
                            <button className='form_backp' type='button'>
                                Volver
                            </button>
                        </Link>
                    </form>

                    <div>

                    </div>
                </div>
            </div>
        </body>

    )

}