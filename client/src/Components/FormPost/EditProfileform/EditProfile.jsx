import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editProfilePost, getLogin } from "../../../REDUX/actions/action";
import AddressAutocom from "../../AddressAutocom";
import {Link} from 'react-router-dom'
import './EditProfile.css'
export default function FormPayData() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [formLocation,setFormLocation]= useState(null)

  
  const author= JSON.parse(localStorage.getItem("login"))
  // function validate(form) {
  //   let errors = {};
  //   if (!form.name) {
  //     errors.name = "Se requiere un nombre";
  //   }
  //   if (form.name.length > 50) {
  //     errors.name = "Caracteres maximos superados";
  //   }
  //   if (!form.lastname) {
  //     errors.lastname = "Se requiere su Apellido";
  //   }
  //   if (form.lastname.length > 50) {
  //     errors.lastname = "Caracteres maximos superados";
  //   }

  //   if (form.location.length > 50) {
  //     errors.location = "Caracteres maximos superados";
  //   }
  //   if (!form.location) {
  //     errors.location = "Se requiere su Direccion";
  //   }
  //   if (!form.phone) {
  //     errors.phone = "Se requiere su numero de telefono";
  //   }
  //   if (form.phone.length > 50) {
  //     errors.phone = "Caracteres maximos superados";
  //   }
    
  //   if (form.bio.length > 130) {
  //     errors.bio = "Caracteres maximos superados";
  //   }
  //   if (!form.email) {
  //     errors.email = "Se requiere su Email";
  //   }
  //   if (form.email.length > 30) {
  //     errors.email = "Caracteres maximos superados";
  //   }
  //   return errors;
  // }

  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    last_name:"",
    location: [],
    phone: "",
    bio: "",
    email: author.email,
    profileImgURL:''
  });

  
  useEffect(() => {}, [errors, form]);

  //hacemos lo de base64 para guardar la imagen que el usuario quiere de perfil
  const convertToBase64Profile = (file) => {
    Array.from(file).forEach(file=>{
        var reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload=function(){
            var base64 = reader.result;
        //    return base64;
            setForm({
                ...form,
                profileImgURL:base64 
            })
        }
    })
   };
 

  function handleChange(e) {
    
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  //   setErrors(
  //     validate({
  //       ...form,
  //       [e.target.name]: e.target.value,
  //     })
  //   );
   }
   
   function handleSubmit(e) {
    e.preventDefault();
    const newLocation = window.localStorage.getItem("newLocation");
    if (newLocation) {
      let form2={...form, location: [JSON.parse(newLocation)]} 
      dispatch(editProfilePost(form2));
    }else{
      dispatch(editProfilePost(form));
    }
    
    setTimeout(() => {
    dispatch(getLogin(form.email));
      alert("Su perfil a sido editado!");
        navigate(`/PersonalProfile/${JSON.parse(localStorage.login).id}`)
      }, 1000);

      setForm({
        name: "",
        last_name: "",
        location:[],
        phone: "",
        bio: "",
        email: "",
        profileImgURL: "",
      });
    }
  

  return (
      <body className="bodyforms">
      <div>
    <div>
      <form  className='formpublic' onSubmit={(e) => handleSubmit(e)}>
        <div className='form_container'>
          <div>
            <h1  className='form_title'>Edita tu perfil!</h1>
          </div>

       
          <div className='form_group'>
            <label  className='form_label'>Nombre</label>
            <input className='form_input'
              type="text"
              maxLength="15"
              placeholder={
                  JSON.parse(localStorage.login).name
              }
              value={form.name}
              name="name"
              onChange={(e) => handleChange(e)}
              />
            {errors.name && <p   className='errortxt'>{errors.name}</p>}
          </div>
          <div className='form_group'>
            <label className='form_label'>Apellido</label>
            <input  className='form_input'
            maxLength="15"
              type="text"
              value={form.last_name}
              name="last_name"
              placeholder={
                  JSON.parse(localStorage.login).last_name
              }
              onChange={(e) => handleChange(e)}
              />
            {errors.lastname && <p  className='errortxt'>{errors.lastname}</p>}
          </div>

          <div className='form_group'>
           
            <label  className='form_label'>Tu direccion</label>
              <AddressAutocom />
          

          </div>

          <div className='form_group'>
            <label className='form_label'>Telefono</label>
            <input  className='form_input'
             maxLength="15"
              type="text"
              value={form.phone}
              name="phone"
              placeholder={
                  JSON.parse(localStorage.login).phone
              }
              onChange={(e) => handleChange(e)}
              />
            {errors.phone && <p  className='errortxt'>{errors.phone}</p>}
          </div>

          <div className='form_group'>
            <label className='form_label'>Cambiar foto de perfil</label>
            <input  className='form_input'
              type="file"
              accept=".jpeg, .png, .jpg"
          
              name="profileImgURL"
              onChange={(e) => convertToBase64Profile(e.target.files)}
            />
            {   
            form.profileImgURL ?
          <div className="imgcontent">
           {form.profileImgURL ? (
             
           <img className='imageselect' src={form.profileImgURL} alt='img perfil' width='100' height='100'/>
           ) : null
           
          }
          </div>
          : 
          null

        }
            { errors.profileImgURL && (<p  className='errortxt'>{errors.profileImgURL}</p>)}
          </div>

          <div className='form_group'>
            <label className='form_label'>Biografia</label>
            <textarea className='form_inputdes'
            maxLength="150"
              type="text"
              value={form.bio}
              name="bio"
              onChange={(e) => handleChange(e)}
              />
            {errors.bio && <p  className='errortxt'>{errors.bio}</p>}
          </div>
{/* <div>
  <label>Tips</label>
  <p>Para encontrar mas rapido lo que estas buscando tratá de ser lo mas exacto posible con tu informacion!</p>
</div> */}
          <div className="form_group">
            <button className='form_submit'type="submit" >
              Realizar cambios
            </button>
          </div>

         
       
          

        </div>
        <Link to={`/PersonalProfile/${author.id}`}>
        <button className='form_backep' type='button'>
                Volver
            </button>
        </Link>
      </form>
    </div>
    </div>
    </body>
  );
}