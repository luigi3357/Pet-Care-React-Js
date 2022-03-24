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
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { localhost } from "../REDUX/actions/action";
import { Card } from "primereact/card";
import { Link } from "react-router-dom";
import {fetchAllPosts} from '../REDUX/actions/action'
import "./stylesProfileTerceros.css"


export const Profile = (post) => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  // const { description, title, author, updatedAt, type, size, address, price } =
  //   location.state;
  const loginUser = useSelector((state) => state.login);
  const loginUser2 = JSON.parse(localStorage.login);
  const [logged, setLogged] = useState(null);

  //para los estilos:
  const [comentariosTerceros, setComentariosTerceros] = useState(false);
  const [posteosTerceros, setPosteosTerceros] = useState(false);
  const [mapa, setMapa] = useState(false);
  function handlePost(){
    setComentariosTerceros(false);
    setPosteosTerceros(!posteosTerceros);
    setMapa(false)
  }
  function handleComent(){
    setComentariosTerceros(!comentariosTerceros)
    setPosteosTerceros(false)
    setMapa(false)
  }
  function handleMap(){
    setComentariosTerceros(false);
    setPosteosTerceros(false)
    setMapa(!mapa)
  }
  useEffect(() => {
    const logStorage = window.localStorage.getItem("login");

    if (logStorage) {
      const loggedStorage = JSON.parse(logStorage);
      setLogged(loggedStorage);
    }
  }, [loginUser]);
  const [fullInfo, setfullInfo] = useState();
  let petIcon;
  let sizeText;

  useEffect(() => {
    axios
      .get(`${localhost}/users/profile/` + id)
      .then((r) => setfullInfo(r.data));
  }, []);

  // switch () {
  //   case "gato":
  //     petIcon = <FaCat className="text-5xl" />;
  //     break;
  //   case "perro":
  //     petIcon = <FaDog className="text-6xl" />;
  //     break;
  //   case "roedores":
  //     petIcon = <MdPestControlRodent className="text-6xl" />;
  //     break;
  //   case "aves":
  //     petIcon = <FaCrow className="text-6xl" />;
  //     break;
  //   default:
  //     break;
  // }

  // switch (size) {
  //   case "pequeño":
  //     sizeText = "0 a 25cm";
  //     break;
  //   case "mediano":
  //     sizeText = "25 a 60cm";
  //     break;
  //   case "grande":
  //     sizeText = "60 a 120cm";
  //     break;

  //   default:
  //     break;
  // }
  function editPublic(e) {
    dispatch(fetchAllPosts());
  }
  return (
    <div className="container5">
      <NavBar />
      {fullInfo? <div className="containerAuxiliar5">
        <div className="photoMapPrincipal5">
          <div className="photoMapPrincipal5">
            
             <div className="subData5">
             <div className="photoMap5">
            <img className="imgPerfil5"
              src={fullInfo ? fullInfo.profileImgURL : profileDefault}
              alt="Image"
              width="250"
              preview
            />
            </div>
              <h4>{fullInfo.name.toUpperCase() +' '+ fullInfo.last_name.toUpperCase()}</h4>
              {fullInfo && fullInfo.bio ?
              <p className="pDeBio5">
                {fullInfo.bio}
              </p> :null
              }
              {/* <p>Fecha: {updatedAt.slice(0, 10)}</p> */}
              <p className="pDePerfilContrataciones5">Contrataciones: {fullInfo.bookings}</p>
              <div className="pDePerfilRating5">
              <p className="pDePerfilContrataciones5">Calificación:</p>
              <Rating
                className="text-white"
                value={fullInfo.rating}
                readOnly
                stars={5}
                cancel={false}
              />
              </div> 
              {/* <p>Precio: ${price}</p> */}
              <p className="pDePerfilContrataciones5">Direccion: {fullInfo.location? fullInfo.location[0].address: null}</p>
            </div>
          </div>
        </div>
        <div>
        <div className="contrainerTitelh4Perfil5">
        <h4 className="DespliegueDeInfo5" onClick={(e) => {handleComent()}}>Comentarios</h4>
        <h4 className="DespliegueDeInfo5" onClick={(e) => {handlePost()}}>Publicaciones</h4>
        <h4 className="DespliegueDeInfo5" onClick={(e) => {handleMap()}}>Mapa</h4>
        </div>
        
        <div className="profileCardContainer5">
          
        <div className={posteosTerceros === true ? 'notDisabled' : 'Disabled'}>
          {fullInfo
            ? fullInfo.posteos.map((p) => {
                return (
                  <div className="cardConstainer5">
                    <h5 className="typeh5">Descripcion:</h5><p className="pInfoCard5"> {p.description}</p>
                    <h5 className="typeh5">Precio: </h5><p className="pInfoCard5"> ${p.price}</p>
                    <h5 className="typeh5">Tamaño:</h5><p className="pInfoCard5"> {p.size}</p>
                    <h5 className="typeh5">Tipo:</h5><p className="pInfoCard5"> {p.type}</p>
                    {logged ? (
                      <CreateBooking
                        keeper={fullInfo}
                        price={p.price}
                        client={loginUser2}
                        info={fullInfo}
                        post_id={p.id}
                      />
                    ) : (
                      <div className="containerButtom">
                        <Link className="link2" to="/Register">
                          <button
                           label="Registrarse para reservar"
                           className="test5">
                            Registrate
                            </button>
                        </Link>
                      </div>
                    )}
                    
             
                  </div>
                );
              })
            : null}
          </div>

          <div className="containerComentarios5">      
          
          {fullInfo.reviews ? (
            fullInfo.reviews.map((i) => {
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
            <h5>El usuario aún no posee comentarios</h5>
          )}
        </div>
        <div className={mapa === true ? 'notDisabled' : 'Disabled'}>
        
        {/* <MapDetail /> */}
       
        </div>
        </div>
        </div>    
        

      </div>
      :null}
    </div>
  );
};