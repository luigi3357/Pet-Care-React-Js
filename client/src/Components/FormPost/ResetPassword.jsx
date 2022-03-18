import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default function ResetPassword() {
 const  idautor = useSelector((state)=> state.login)
 const dispatch = useDispatch()
return (
    <div>
            <div>
<h3>Contraseña anterior</h3>
        <input/>
            </div>

        <div>
        <h3>Contraseña nueva</h3>
        <input/>
        </div>
        <div>
            <h3>Repetir contraseña anterior</h3>
            <input/>
        </div>


    </div>
)

}