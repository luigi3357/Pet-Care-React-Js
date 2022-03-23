import { Image } from "primereact/image";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { NavBar } from "../Components/NavBar";
import profileDefault from "./../assets/profile.jpg";
import ReviewCard from "../Components/ReviewCard";
import { Rating } from "primereact/rating";
import { FaDog, FaCrow, FaCat } from "react-icons/fa";
import { MdPestControlRodent } from "react-icons/md";
import { Button } from "primereact/button";
import { CreateBooking } from "../Components/CreateBooking";
import MapDetail from "./MapDetail";
import { useSelector } from "react-redux";
import axios from "axios";
import { localhost } from "../REDUX/actions/action";
import { Card } from "primereact/card";
import { Link } from "react-router-dom";
import { BookingDatatables } from "../Components/BookingTable";
import "./stylesPerfil.css"

export const PersonalProfile = () => {
  const { id } = useParams(); // recibo el id por params para buscar la info con la ruta /users/profile/id

  const location = useLocation();

  const loginUser = useSelector((state) => state.login); // obtengo la info del estado login para saber si entro a un perfil estando logeado o no. se usa para botones de reserva y para saber si el logeado esta viendo su perfil, para renderizar los botones de editar perfil y seguridad

  const [logged, setLogged] = useState(null); // estado local para guardar la info del logeado (usado para el localstorage)

  const [fullInfo, setfullInfo] = useState(); // el estado para guardar toda la info del id con el que se entro al perfil
  const userData = JSON.parse(localStorage.login) 
  useEffect(() => {
    const logStorage = window.localStorage.getItem("login");
    if (logStorage) {
      const loggedStorage = JSON.parse(logStorage);
      setLogged(loggedStorage);
    }
  }, [loginUser]);
  
  const [comentarios, setComentarios] = useState(true);
  const [posteos, setPosteos] = useState(false);
  const [contrataciones, setContrataciones] = useState(false);

  function handlePost(){
    setPosteos(!posteos);
    setComentarios(false)
    setContrataciones(false)
  }
  function handleComent(){
    setPosteos(false);
    setComentarios(!comentarios)
    setContrataciones(false)
  }
  function handleContrataciones(){
    setPosteos(false);
    setComentarios(false)
    setContrataciones(!contrataciones);
  }
  let petIcon;
  let sizeText;
  
  useEffect(() => {
    axios
    .get(`${localhost}/users/profile/` + id)
    .then((r) => setfullInfo(r.data));
  }, [id]);

  switch (fullInfo ? fullInfo.type : null) {
    case "gato":
      petIcon = <FaCat className="text-5xl" />;
      break;
    case "perro":
      petIcon = <FaDog className="text-6xl" />;
      break;
    case "roedores":
      petIcon = <MdPestControlRodent className="text-6xl" />;
      break;
    case "aves":
      petIcon = <FaCrow className="text-6xl" />;
      break;
    default:
      break;
  }

  switch (fullInfo ? fullInfo.size : null) {
    case "pequeño":
      sizeText = "0 a 25cm";
      break;
    case "mediano":
      sizeText = "25 a 60cm";
      break;
    case "grande":
      sizeText = "60 a 120cm";
      break;
    default:
      break;
  }

  return (
    <div className="containerPrincipal">
       <NavBar />
    <div className="container">
      <div className="containerAuxiliar">
      <div className="photoMap">
     
          <div className="photoMap">
            <div className="photoMap2">
              <Image
              src={
                fullInfo
                ? fullInfo.profileImgURL
                ? fullInfo.profileImgURL
                : profileDefault
                : profileDefault
              }
              alt="Image"
              width="230px"
              height="290px"
              preview
              />
            </div>
            <div className="map">
              <Link to={`/editProfile`} className="link">
                <Button
                  label="Editar perfil"
                  className="p-button-sm p-button-info p-button-rounded"
                  />
              </Link>
              <Button
                label="Verificacion en 2 pasos"
                className="p-button-sm p-button-warning p-button-rounded"
                />
              <Button
                label="Cambiar contraseña"
                className="p-button-sm p-button-warning p-button-rounded"
                />

              <Link to={`/formpublic`} className="link">
                <Button
                  label="Crear post"
                  className="p-button-sm p-button-warning p-button-rounded"
                  />
              </Link>

             {/*  <Link to={`/editProfile`} className="link">
                <Button
                  label="asd"
                  className="p-button-sm p-button-warning p-button-rounded"
                  />
              </Link> */}
            </div>
          </div>
          <div className="subData">
              <h3>{fullInfo ? fullInfo.title : null}</h3>
              <p className="pDePerfilPosteos"> 
                {fullInfo ? fullInfo.bio : null}
              </p>
              {/* <p>Fecha: {updatedAt.slice(0, 10)}</p> */}
              {fullInfo?
                <>
                {fullInfo.keeper?
                  <p className="pDePerfil">Contrataciones: {fullInfo.bookings}</p>
                  :
                  <p className="pDePerfil">Reservaciones: {fullInfo.reservaciones.filter((v)=>{return (v.status=='approved' || v.status=='completed')}).length}</p>
                } 
                </>
              :null}
              <p className="pDePerfil">Rating:</p>
              <Rating
                className="text-white"
                value={fullInfo ? fullInfo.rating : null}
                readOnly
                stars={5}
                cancel={false}
                />
              {/* <p>Precio: ${price}</p> */}
              <p className="pDePerfil">Direccion: {fullInfo ? fullInfo.address : null}</p>
              {/* <p>Tipo:</p> {petIcon}
              <p>Tamaño:</p> {sizeText} */}
            </div>
        </div>

      <div>
      <div className="contrainerTitelh4">
      <h4 onClick={(e) => {handleComent()}}>Comentarios</h4>
      <h4 onClick={(e) => {handlePost()}}>Posteos</h4>
      <h4 onClick={(e) => {handleContrataciones()}}>Contrataciones</h4>
      </div>
        <div >
          <div className={posteos === true ? 'notDisabled' : 'Disabled'}>
          {fullInfo
            ? fullInfo.posteos.map((p) => {
              return (
                <div className="pDePerfilPosteosContainer">
                <Card className="pDePerfilPosteos">
                    <h4 className="pDePerfilPosteos">Descripcion:</h4><p className="pDePerfilPosteos"> {p.description}</p>
                    <h4 className="pDePerfilPosteos">Price: $</h4><p className="pDePerfilPosteos">{p.price}</p>
                    <h4 className="pDePerfilPosteos">Tamaño:</h4><p className="pDePerfilPosteos">{p.size}</p>
                    <h4 className="pDePerfilPosteos">Tipo:</h4><p className="pDePerfilPosteos">{p.type}</p>
                  </Card>
                </div>  
                );
              })
              : null}
          </div>    
        </div>      
        <div className="containerComentarios">
          <div className={comentarios === true ? 'notDisabled' : 'Disabled'}>
          {fullInfo ? (
            fullInfo.reviews?.map((i) => {
              return (
                <div>
                  <ReviewCard
                    id={i.id}
                    key={i.id}
                    rating={i.rate}
                    message={i.message}
                    
                    />
                </div>
              );
            })
          ) : (
            <h5>El usuario aún no posee reviews</h5>
            )}
          </div>
        </div>
  <div >
  
  <div className={contrataciones === true ? 'notDisabled' : 'Disabled'}>
  {
  fullInfo? 
  fullInfo.keeper ? <BookingDatatables title={'Contrataciones'} data={fullInfo?fullInfo.contrataciones:null} /> :
  <BookingDatatables title={'Reservaciones'}  data={fullInfo?fullInfo.reservaciones:null}  />
  :null}
  </div>
  </div>
      </div>
    </div>
  </div>
</div>
  );
  
};
