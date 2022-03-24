import React, { useEffect, useState } from "react";
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
      <div className={style.filterSubContainer}>
        <div className={style.titleAndButton2}>
          <SearchBar />
          <button className={style.filterButton} onClick={() => cleanFilters()}>
            <p className={style.textButton}>Limpiar Filtros</p>
          </button>
        </div>
        <div className={style.titleAndButton}>
          <p className={style.textButton}>Especie</p>
          <div className={style.buttonGroup}>
            <button
              className={style.filterButton}
              onClick={() => handleFilterChange("perros")}
            >
              <FaDog className="text-3xl" />
            </button>
            <button
              className={style.filterButton}
              onClick={() => handleFilterChange("gatos")}
            >
              <FaCat className="text-3xl" />
            </button>
            <button
              className={style.filterButton}
              onClick={() => handleFilterChange("roedores")}
            >
              <MdPestControlRodent className="text-3xl" />
            </button>
            <button
              className={style.filterButton}
              onClick={() => handleFilterChange("aves")}
            >
              <FaCrow className="text-3xl" />
            </button>
          </div>
        </div>

        <div className={style.titleAndButton}>
          <p className={style.textButton}>Precio</p>
          <div className={style.buttonGroup}>
            <button
              className={style.filterButton}
              onClick={() => handlePriceChange("precioDesc")}
            >
              <FaSortNumericDown className="text-3xl" />
            </button>
            <button
              className={style.filterButton}
              onClick={() => handlePriceChange("precioAsc")}
            >
              <FaSortNumericUpAlt className="text-3xl" />
            </button>
          </div>
        </div>

        <div className={style.titleAndButton}>
          <p className={style.textButton}>Calificación</p>
          <div className={style.buttonGroup}>
            <button
              className={style.filterButton}
              onClick={() => handleRatingChange("ratingDesc")}
            >
              <FaStar className="text-1xl" />
              <FaRegStar className="text-1xl" />
              <FaRegStar className="text-1xl" />
            </button>
            <button
              className={style.filterButton}
              onClick={() => handleRatingChange("ratingAsc")}
            >
              <FaStar className="text-1xl" />
              <FaStar className="text-1xl" />
              <FaStar className="text-1xl" />
            </button>
          </div>
        </div>

        <div className={style.titleAndButton}>
          <p className={style.textButton}>Tamaño</p>
          <div className={style.buttonGroup}>
            <button
              className={style.filterButton}
              onClick={() => handleSizeChange("pequeño")}
            >
              <p className={style.textButton}>Pequeño</p>
              <p className={style.textButton}>0 a 25cm</p>
            </button>
            <button
              className={style.filterButton}
              onClick={() => handleSizeChange("mediano")}
            >
              <p className={style.textButton}>Mediano</p>
              <p className={style.textButton}>25 a 60cm</p>
            </button>
            <button
              className={style.filterButton}
              onClick={() => handleSizeChange("grande")}
            >
              <p className={style.textButton}>Grande</p>
              <p className={style.textButton}>60 a 120cm</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
