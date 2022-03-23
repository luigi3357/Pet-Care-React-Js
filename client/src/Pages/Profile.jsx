import { Image } from "primereact/image";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { NavBar } from "../Components/NavBar";
import profileDefault from "./../assets/profile.jpg";
import style from "./global.module.css";
import ReviewCard from "../Components/ReviewCard";
import { Rating } from "primereact/rating";
import { FaDog, FaCrow, FaCat } from "react-icons/fa";
import { MdPestControlRodent } from "react-icons/md";
import { Button } from "primereact/button";
import { CreateBooking } from "../Components/CreateBooking";
import MapDetail from "./MapDetail";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import { localhost } from "../REDUX/actions/action";
import { Card } from "primereact/card";
import { Link } from "react-router-dom";
import {fetchAllPosts} from '../REDUX/actions/action'
export const Profile = (post) => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch()
  // const { description, title, author, updatedAt, type, size, address, price } =
  //   location.state;
  const loginUser = useSelector((state) => state.login);
  const loginUser2 = JSON.parse(localStorage.login)
  const [logged, setLogged] = useState(null);
  useEffect(() => {
    const logStorage = window.localStorage.getItem("login");

    if (logStorage) {
      const loggedStorage = JSON.parse(logStorage);
      setLogged(loggedStorage);
    }
  }, [loginUser]);
  const [fullInfo, setfullInfo] = useState();
  console.log(fullInfo, "APENAS RENDERIZA");
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
  function editPublic (e){
    dispatch(fetchAllPosts())
  }
  return (
    <div className={style.container}>
      <NavBar />
      {fullInfo? <div className={style.subContainer}>
        <div className={style.photoMap}>
          <div className={style.photoMap}>
            <Image
              src={fullInfo ? fullInfo.profileImgURL : profileDefault}
              alt="Image"
              width="250"
              preview
            />
            <div className={style.map}></div>
          </div>
        </div>
        <div className={style.profileCardContainer}>
          <div className={style.data}>
            <div className={style.subData}>
              <h3>{fullInfo.name.toUpperCase() +' '+ fullInfo.last_name.toUpperCase()}</h3>
              <p className={style.description}>
                {fullInfo.bio}
              </p>
              {/* <p>Fecha: {updatedAt.slice(0, 10)}</p> */}
              <p>Contrataciones: {fullInfo.bookings}</p>
              <p>Rating:</p>
              <Rating
                className="text-white"
                value={fullInfo.rating}
                readOnly
                stars={5}
                cancel={false}
              />
              {/* <p>Precio: ${price}</p> */}
              <p>Direccion: {fullInfo.location? fullInfo.location[0].address: null}</p>
            </div>
          </div>
          <h4>Posteos</h4>
          {fullInfo
            ? fullInfo.posteos.map((p) => {
                return (
                  <Card>
                    <p>Descripcion: {p.description}</p>
                    <p>Price: $ {p.price}</p>

                    {logged ? (
                      <CreateBooking
                        keeper={fullInfo}
                        price={p.price}
                        client={loginUser2}
                        info={fullInfo}
                        post_id={p.id}
                      />
                    ) : (
                      <div>
                        <Link className={style.link} to="/Register">
                          <Button
                            label="Registrarse para reservar"
                            className="p-button-sm p-button-info p-button-rounded"
                          />
                        </Link>
                      </div>
                    )}
                    <p>Tamaño: {p.size}</p>
                    <p>Tipo: {p.type}</p>
             
                  </Card>
                );
              })
            : null}
           

          <h4>Comentarios</h4>
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
            <h5>El usuario aún no posee reviews</h5>
          )}
        </div>
      </div>
      :null}
    </div>
  );
};
