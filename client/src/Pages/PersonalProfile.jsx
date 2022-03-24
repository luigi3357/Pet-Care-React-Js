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
//import { CreateBooking } from "../Components/CreateBooking";
//import MapDetail from "./MapDetail";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getLogin, localhost, verification2fa } from "../REDUX/actions/action";
import { Card } from "primereact/card";
import { Link, useNavigate } from "react-router-dom";
import { BookingDatatables } from "../Components/BookingTable";
import "./stylesPerfil.css";
import MapView from "../Components/MapView";
import MapDetail from "./MapDetail";
import DeletePost from "../Components/Botones/DeletePost"
export const PersonalProfile = () => {
  const { id } = useParams(); // recibo el id por params para buscar la info con la ruta /users/profile/id
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.login); // obtengo la info del estado login para saber si entro a un perfil estando logeado o no. se usa para botones de reserva y para saber si el logeado esta viendo su perfil, para renderizar los botones de editar perfil y seguridad

  const [logged, setLogged] = useState(null); // estado local para guardar la info del logeado (usado para el localstorage)

  const [fullInfo, setfullInfo] = useState(); // el estado para guardar toda la info del id con el que se entro al perfil
  const userData = JSON.parse(localStorage.login);
  useEffect(() => {
    const logStorage = window.localStorage.getItem("login");
    if (logStorage) {
      const loggedStorage = JSON.parse(logStorage);
      setLogged(loggedStorage);
    }
  }, [loginUser]);
  const userData2 = useSelector((state) => state.login)

  const [comentarios, setComentarios] = useState(false);
  const [posteos, setPosteos] = useState(false);
  const [contrataciones, setContrataciones] = useState(false);
  const [mapa, setMapa] = useState(false);
  const [coordinates, setCoordinates] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setCoordinates({
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        });
      },
      function (error) {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, []);
  function handleMap(){
    setComentarios(false);
    setContrataciones(false);
    setPosteos(false);
    setMapa(!mapa)
  }
  function handlePost() {
    setPosteos(!posteos);
    setComentarios(false);
    setContrataciones(false);
    setMapa(false)
  }
  function handleComent() {
    setPosteos(false);
    setComentarios(!comentarios);
    setMapa(false)
    setContrataciones(false);
  }
  function handleContrataciones() {
    setPosteos(false);
    setComentarios(false);
    setContrataciones(!contrataciones);
    setMapa(false)
  }
  let petIcon;
  let sizeText;
  function handleCheck() {
    const data = {
      email: userData.email,
      key_2fa: userData2.key_2fa === true ? false : true
    }
    dispatch(verification2fa(data))
    setTimeout(() => {

      dispatch(getLogin(userData.email))

    }, 2000)
  }
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
  function handleReset() {
    navigate("/resetPassword")
  }

  return (
    <div className="containerPrincipal">
      <NavBar />
      <div className="container">
        <div className="containerAuxiliar">
          <div className="photoMap">
            <div className="photoMap">
              <div className="photoMap2">
                <img
                  className="imgPerfil"
                  src={
                    fullInfo
                      ? fullInfo.profileImgURL
                        ? fullInfo.profileImgURL
                        : profileDefault
                      : profileDefault
                  }
                  alt="Image"
                  preview
                />
              </div>
              <div className="EditPerfil">
                <Link to={`/editProfile`} className="buttomPerfile">
                  <buttom label="Editar perfil">Editar Perfil</buttom>
                </Link>

                <Link
                  to={
                    userData.keeper === true ? `/formpublic` : "/formpublicServ"
                  }
                  className="buttomPerfile"
                >
                  <buttom label="Crear post">Crear Post</buttom>
                </Link>
                <button
                  onClick={(e) => {
                    handleReset();
                  }}
                  label="Cambiar contraseña"
                  className="buttomPerfile2"
                >
                  Cambiar contraseña
                </button>

                <label className="buttomPerfile">
                  <input
                    type="checkbox"
                    onChange={e => { handleCheck() }}
                    label="Verificacion en 2 pasos"
                    className="buttomPerfile"
                  />Verificacion 2FA
                </label>

                {/*  <Link to={`/editProfile`} className="link">
                <Button
                  label="asd"
                  className="p-button-sm p-button-warning p-button-rounded"
                  />
              </Link> */}
              </div>
              {/*  <div style={{ height: '50vh', width: '50vh' }}>
                <MapView 
                    coordinates={coordinates}
                />
            </div>  */}
            </div>
            <div className="PerfilData">
              <h3>{fullInfo ? fullInfo.title : null}</h3>
              {fullInfo && fullInfo.bio ?
              <p className="pDeBio">{fullInfo ? fullInfo.bio : null}</p>
              :null
              }
              {/* <p>Fecha: {updatedAt.slice(0, 10)}</p> */}
              {fullInfo ? (
                <>
                  {fullInfo.keeper ? (
                    <p className="pDePerfilContrataciones">
                      Contrataciones: {fullInfo.bookings}
                    </p>
                  ) : (
                    <p className="pDePerfilContrataciones">
                      Reservaciones:{" "}
                      {
                        fullInfo.reservaciones.filter((v) => {
                          return (
                            v.status == "approved" || v.status == "completed"
                          );
                        }).length
                      }
                    </p>
                  )}
                </>
              ) : null}
              <div className="pDePerfilRating">
                <p className="styleratingP">Calificación:</p>
                <Rating
                  className="text-white"
                  value={fullInfo ? fullInfo.rating : null}
                  readOnly
                  stars={5}
                  cancel={false}
                />
              </div>
              {/* <p>Precio: ${price}</p> */}
              <p className="pDePerfilDireccion">
                Direccion: {fullInfo ? (fullInfo.location? (fullInfo.location.length>0 ? fullInfo.location[0].address : null):null):null }
              </p>
              {/* <p>Tipo:</p> {petIcon}
              <p>Tamaño:</p> {sizeText} */}
            </div>
          </div>

          <div className="probandoSiEsContenedor">
            <div className="contrainerTitelh4">
              <h4
                className="DespliegueDeInfo"
                onClick={(e) => {
                  handleComent();
                }}
              >
                Comentarios
              </h4>
              <h4
                className="DespliegueDeInfo"
                onClick={(e) => {
                  handlePost();
                }}
              >
                Publicaciones
              </h4>
              <h4
                className="DespliegueDeInfo"
                onClick={(e) => {
                  handleContrataciones();
                }}
              >
                Contrataciones
              </h4>
              <h4 className="DespliegueDeInfo" onClick={(e) => {handleMap()}}>Mapa</h4>
            </div>
            <div>
              <div className={posteos === true ? "notDisabled" : "Disabled"}>
                {fullInfo
                  ? fullInfo.posteos.map((p) => {
                      return (
                        <div className="pDePerfilPosteosContainer">
                          <Card className="pDePerfilPosteos">
                            <h4 className="pDePerfilPosteos">Descripcion:</h4>
                            <p className="pDePerfilPosteos"> {p.description}</p>
                            <h4 className="pDePerfilPosteos">Price: $</h4>
                            <p className="pDePerfilPosteos">{p.price}</p>
                            <h4 className="pDePerfilPosteos">Tamaño:</h4>
                            <p className="pDePerfilPosteos">{p.size}</p>
                            <h4 className="pDePerfilPosteos">Tipo:</h4>
                            <p className="pDePerfilPosteos">{p.type}</p>
                            <Link to={`/editForm/${p.id}`}>
                              <button className="buttomPerfile3">Editar Publicación</button>
                            </Link>
                            <DeletePost className="buttomPerfile3" id={p.id}/>
                          </Card>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
            <div className="containerComentarios">
              <div
                className={comentarios === true ? "notDisabled" : "Disabled"}
              >
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
            <div>
              <div
                className={contrataciones === true ? "notDisabled" : "Disabled"}
              >
                {fullInfo ? (
                  fullInfo.keeper ? (
                    <BookingDatatables
                      title={"Contrataciones"}
                      data={fullInfo ? fullInfo.contrataciones : null}
                    />
                  ) : (
                    <BookingDatatables
                      title={"Reservaciones"}
                      data={fullInfo ? fullInfo.reservaciones : null}
                    />
                  )
                ) : null}
              </div>
            </div>
            <div className={mapa === true ? 'notDisabled' : 'Disabled'}>
            {/* <MapDetail /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
