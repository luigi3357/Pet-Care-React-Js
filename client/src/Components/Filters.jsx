import React, { useState } from "react";
import { Button } from "primereact/button";
import {
  FaDog,
  FaCrow,
  FaCat,
  FaSortNumericDown,
  FaSortNumericUpAlt,
} from "react-icons/fa";
import { MdPestControlRodent } from "react-icons/md";
import { AiOutlineColumnHeight } from "react-icons/ai";

export default function Filters() {
  const [showFilters, setShowFilters] = useState(false);
  const [showSpecies, setShowSpecies] = useState(false);
  const [filter, setFilter] = useState("");
  const [showSizes, setShowSizes] = useState(false);
  const [size, setSize] = useState("");
  const [showPrices, setShowPrices] = useState(false);
  const [price, setPrice] = useState("");

  function handleShowFilters() {
    setShowFilters(!showFilters);
  }
  function handleShowSpecies() {
    setShowSpecies(!showSpecies);
    setShowSizes(false);
    setShowPrices(false);
  }
  function handleShowSizes() {
    setShowSizes(!showSizes);
    setShowSpecies(false);
    setShowPrices(false);
  }
  function handleShowPrices() {
    setShowPrices(!showPrices);
    setShowSpecies(false);
    setShowSizes(false);
  }
  function handleFilterChange(e) {
    setFilter(e);
    handleShowFilters();
  }
  function handleSizeChange(e) {
    setSize(e);
    handleShowFilters();
  }
  function handlePriceChange(e) {
    setPrice(e);
    handleShowFilters();
  }
  function cleanFilters() {
    setFilter("");
    setPrice("");
    setSize("");
    handleShowFilters();
  }

  return (
    <div className="flex flex-column align-items-center justify-content-start min-w-full">
      <Button
        className="min-w-full p-button-raised p-button-info"
        label="Filtros y ordenamiento"
        onClick={() => handleShowFilters()}
      />

      {showFilters ? (
        <div className="flex flex-column align-items-center justify-content-start min-w-full">
          <Button
            className="min-w-full p-button-raised p-button-info"
            label="Limpiar filtros"
            onClick={() => cleanFilters()}
          />

          <div className="flex flex-column align-items-center justify-content-start min-w-full">
            <Button
              className="min-w-full p-button-raised p-button-info"
              label="Filtrar por especie"
              onClick={() => handleShowSpecies()}
            />

            {showSpecies ? (
              <div className="flex">
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
            ) : null}
          </div>

          <div className="flex flex-column align-items-center justify-content-start min-w-full">
            <Button
              className="min-w-full p-button-raised p-button-info"
              label="Filtrar por tamaño"
              onClick={() => handleShowSizes()}
            />

            {showSizes ? (
              <div className="flex">
                <Button
                  className="p-button-outlined p-button-info"
                  onClick={() => handleSizeChange("pequeño")}
                >
                  <AiOutlineColumnHeight className="text-1xl" />
                </Button>
                <Button
                  className="p-button-outlined p-button-info"
                  onClick={() => handleSizeChange("mediano")}
                >
                  <AiOutlineColumnHeight className="text-3xl" />
                </Button>
                <Button
                  className="p-button-outlined p-button-info "
                  onClick={() => handleSizeChange("grande")}
                >
                  <AiOutlineColumnHeight className="text-6xl" />
                </Button>
              </div>
            ) : null}
          </div>

          <div className="flex flex-column align-items-center justify-content-start min-w-full">
            <Button
              className="min-w-full p-button-raised p-button-info"
              label="Ordenar por precio"
              onClick={() => handleShowPrices()}
            />

            {showPrices ? (
              <div className="flex">
                <Button
                  className="p-button-outlined p-button-info "
                  onClick={() => handlePriceChange("precioDesc")}
                >
                  <FaSortNumericDown className="text-3xl" />
                </Button>
                <Button
                  className="p-button-outlined p-button-info "
                  onClick={() => handlePriceChange("precioAsc")}
                >
                  <FaSortNumericUpAlt className="text-3xl" />
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
