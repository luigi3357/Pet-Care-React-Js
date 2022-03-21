import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import {
  FaDog,
  FaCrow,
  FaCat,
  FaSortNumericDown,
  FaSortNumericUpAlt,
  FaRegStar,
  FaStar,
} from "react-icons/fa";
import { MdPestControlRodent } from "react-icons/md";
import { useDispatch } from "react-redux";
import { getFiltered } from "../REDUX/actions/action";
import style from "./../Pages/global.module.css";
import SearchBar from "./SearchBar";

export default function Filters() {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    dispatch(getFiltered(filter));
  }, [filter]);
  useEffect(() => {
    dispatch(getFiltered(size));
  }, [size]);
  useEffect(() => {
    dispatch(getFiltered(price));
  }, [price]);
  useEffect(() => {
    dispatch(getFiltered(rating));
  }, [rating]);

  function handleFilterChange(e) {
    setFilter(e);
  }

  function handleSizeChange(e) {
    setSize(e);
  }

  function handlePriceChange(e) {
    setPrice(e);
  }

  function handleRatingChange(e) {
    setRating(e);
  }

  function cleanFilters() {
    setFilter("");
    setPrice("");
    setSize("");
    setRating("");
    dispatch(getFiltered("all"));
  }

  return (
    <div className={style.filterContainer}>
      <SearchBar />
      <div className={style.filterSubContainer}>
        <div>
          <div className={style.buttonTitleContainer}>
            <p className={style.title}>Especie</p>
            <div className={style.buttonContainer}>
              <Button
                className="p-button-rounded p-button-info p-button-outlined"
                onClick={() => handleFilterChange("perros")}
              >
                <FaDog className="text-3xl" />
              </Button>
              <Button
                className="p-button-rounded p-button-info p-button-outlined"
                onClick={() => handleFilterChange("gatos")}
              >
                <FaCat className="text-3xl" />
              </Button>
              <Button
                className="p-button-rounded p-button-info p-button-outlined"
                onClick={() => handleFilterChange("roedores")}
              >
                <MdPestControlRodent className="text-3xl" />
              </Button>
              <Button
                className="p-button-rounded p-button-info p-button-outlined"
                onClick={() => handleFilterChange("aves")}
              >
                <FaCrow className="text-3xl" />
              </Button>
            </div>
          </div>

          <div className={style.buttonTitleContainer}>
            <p className={style.title}>Tamaño</p>
            <div className={style.buttonContainer}>
              <Button
                className="p-button-outlined p-button-info flex flex-column"
                onClick={() => handleSizeChange("pequeño")}
              >
                {" "}
                <p>Pequeño</p>
                <p>0 a 25cm</p>
              </Button>
              <Button
                className="p-button-outlined p-button-info flex flex-column "
                onClick={() => handleSizeChange("mediano")}
              >
                {" "}
                <p>Mediano</p>
                <p>25 a 60cm</p>
              </Button>
              <Button
                className="p-button-outlined p-button-info flex flex-column"
                onClick={() => handleSizeChange("grande")}
              >
                {" "}
                <p>Grande</p>
                <p>60 a 120cm</p>
              </Button>
            </div>
          </div>
        </div>
        <div>
          <div className={style.buttonTitleContainer}>
            <p className={style.title}>Precio</p>
            <div className={style.buttonContainer}>
              <Button
                className="p-button-outlined p-button-info"
                onClick={() => handlePriceChange("precioDesc")}
              >
                <FaSortNumericDown className="text-3xl" />
              </Button>
              <Button
                className="p-button-outlined p-button-info"
                onClick={() => handlePriceChange("precioAsc")}
              >
                <FaSortNumericUpAlt className="text-3xl" />
              </Button>
            </div>
          </div>
          <div className={style.buttonTitleContainer}>
            <p className={style.title}>Rating</p>
            <div className={style.buttonContainer}>
              <Button
                className="p-button-outlined p-button-info p-button-outlined"
                onClick={() => handleRatingChange("ratingDesc")}
              >
                <FaStar className="text-1xl" />
                <FaRegStar className="text-1xl" />
                <FaRegStar className="text-1xl" />
              </Button>
              <Button
                className="p-button-outlined p-button-info p-button-outlined"
                onClick={() => handleRatingChange("ratingAsc")}
              >
                <FaStar className="text-1xl" />
                <FaStar className="text-1xl" />
                <FaStar className="text-1xl" />
              </Button>
            </div>
          </div>

          <div>
            <Button
              label="Limpiar filtros"
              className="p-button-raised p-button-info"
              onClick={() => cleanFilters()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
