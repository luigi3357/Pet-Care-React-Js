import React from 'react'
import {useState} from 'react'
import {useDispatch} from 'react-redux'

export default function SearchInput (){
    const dispatch = useDispatch()
    const [name, setName]= useState("")
    
    function handleSearch(e){
        e.preventDefault()
        setName(e.target.value)
    }
        
    function handleSubmit(e){
        // e.preventDefault(e)
        
        // dispatch((name))
        // setName("")
    }


return (
    <div>
    <input type= 'text'
    placecholder= 'Buscar...'
    onChange={(e) => handleSearch(e)}
    />
    <button type='submit'   onClick={(e)=> handleSubmit(e)}>Buscar</button>
</div>
)

}