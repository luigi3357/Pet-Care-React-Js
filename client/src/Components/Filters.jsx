import React, { useEffect, useState } from "react";
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
import { Card } from "primereact/card";
import { useDispatch } from "react-redux";
import { getFiltered } from "../REDUX/actions/action";

export default function Filters() {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");

  useEffect(()=>{
    dispatch(getFiltered(filter))
  },[filter]);
  useEffect(()=>{
    dispatch(getFiltered(size))
  },[size]);
  useEffect(()=>{
    dispatch(getFiltered(price))
  },[price]);

  function handleFilterChange(e) {
    setFilter(e);
  }

  function handleSizeChange(e) {
    setSize(e);
  }

  function handlePriceChange(e) {
    setPrice(e);
  }

  function cleanFilters() {
    setFilter("");
    setPrice("");
    setSize("");
    dispatch(getFiltered("all"));
  }

  return (
    <Card className="w-screen">
      <p>FILTROS</p>
      <div className="flex flex-column align-items-center text-center justify-content-center w-auto">
        <div className="flex flex-column align-items-center text-center justify-content-center w-auto">
          <div className="flex">
            <div className=" m-2">
              <p>POR ESPECIE</p>
              <div className="flex">
                <Button
                  className="p-button-rounded p-button-info p-button-outlined m-1"
                  onClick={() => handleFilterChange("perros")}
                >
                  <FaDog className="text-3xl" />
                </Button>
                <Button
                  className="p-button-rounded p-button-info p-button-outlined  m-1"
                  onClick={() => handleFilterChange("gatos")}
                >
                  <FaCat className="text-3xl" />
                </Button>
                <Button
                  className="p-button-rounded p-button-info p-button-outlined  m-1"
                  onClick={() => handleFilterChange("roedores")}
                >
                  <MdPestControlRodent className="text-3xl" />
                </Button>
                <Button
                  className="p-button-rounded p-button-info p-button-outlined  m-1"
                  onClick={() => handleFilterChange("aves")}
                >
                  <FaCrow className="text-3xl" />
                </Button>
              </div>
            </div>

            <div className=" m-2">
              <p>POR PRECIO</p>
              <div className="flex">
                <Button
                  className="p-button-outlined p-button-info  m-1"
                  onClick={() => handlePriceChange("precioDesc")}
                >
                  <FaSortNumericDown className="text-3xl" />
                </Button>
                <Button
                  className="p-button-outlined p-button-info  m-1"
                  onClick={() => handlePriceChange("precioAsc")}
                >
                  <FaSortNumericUpAlt className="text-3xl" />
                </Button>
              </div>
            </div>
          </div>
          <div className=" m-2">
            <p>POR TAMAÑO</p>
            <div className="flex">
              <Button
                className="p-button-outlined p-button-info  m-1"
                onClick={() => handleSizeChange("pequeño")}
              >
                <AiOutlineColumnHeight className="text-1xl" />
              </Button>
              <Button
                className="p-button-outlined p-button-info  m-1"
                onClick={() => handleSizeChange("mediano")}
              >
                <AiOutlineColumnHeight className="text-3xl" />
              </Button>
              <Button
                className="p-button-outlined p-button-info  m-1"
                onClick={() => handleSizeChange("grande")}
              >
                <AiOutlineColumnHeight className="text-6xl" />
              </Button>
            </div>
            <Button
              className="p-button-raised p-button-info mt-2"
              label="Limpiar filtros"
              onClick={() => cleanFilters()}
            />
          </div>
        </div>
      </div>
    </Card>
    // <div className="flex flex-column align-items-center justify-content-start min-w-full">

    //   <Button
    //     className="min-w-full p-button-raised p-button-info"
    //     label="Filtros y ordenamiento"
    //     onClick={() => handleShowFilters()}
    //   />

    //   {showFilters ? (
    //     <div className="flex flex-column align-items-center justify-content-start min-w-full">
    //       <Button
    //         className="min-w-full p-button-raised p-button-info"
    //         label="Limpiar filtros"
    //         onClick={() => cleanFilters()}
    //       />

    //       <div className="flex flex-column align-items-center justify-content-start min-w-full">
    //         <Button
    //           className="min-w-full p-button-raised p-button-info"
    //           label="Filtrar por especie"
    //           onClick={() => handleShowSpecies()}
    //         />

    //         {showSpecies ? (
    //           <div className="flex">
    //             <Button
    //               className="p-button-rounded p-button-info p-button-outlined"
    //               onClick={() => handleFilterChange("perros")}
    //             >
    //               <FaDog className="text-3xl" />
    //             </Button>
    //             <Button
    //               className="p-button-rounded p-button-info p-button-outlined"
    //               onClick={() => handleFilterChange("gatos")}
    //             >
    //               <FaCat className="text-3xl" />
    //             </Button>
    //             <Button
    //               className="p-button-rounded p-button-info p-button-outlined"
    //               onClick={() => handleFilterChange("roedores")}
    //             >
    //               <MdPestControlRodent className="text-3xl" />
    //             </Button>
    //             <Button
    //               className="p-button-rounded p-button-info p-button-outlined"
    //               onClick={() => handleFilterChange("aves")}
    //             >
    //               <FaCrow className="text-3xl" />
    //             </Button>
    //           </div>
    //         ) : null}
    //       </div>

    //       <div className="flex flex-column align-items-center justify-content-start min-w-full">
    //         <Button
    //           className="min-w-full p-button-raised p-button-info"
    //           label="Filtrar por tamaño"
    //           onClick={() => handleShowSizes()}
    //         />

    //         {showSizes ? (
    //           <div className="flex">
    //             <Button
    //               className="p-button-outlined p-button-info"
    //               onClick={() => handleSizeChange("pequeño")}
    //             >
    //               <AiOutlineColumnHeight className="text-1xl" />
    //             </Button>
    //             <Button
    //               className="p-button-outlined p-button-info"
    //               onClick={() => handleSizeChange("mediano")}
    //             >
    //               <AiOutlineColumnHeight className="text-3xl" />
    //             </Button>
    //             <Button
    //               className="p-button-outlined p-button-info "
    //               onClick={() => handleSizeChange("grande")}
    //             >
    //               <AiOutlineColumnHeight className="text-6xl" />
    //             </Button>
    //           </div>
    //         ) : null}
    //       </div>

    //       <div className="flex flex-column align-items-center justify-content-start min-w-full">
    //         <Button
    //           className="min-w-full p-button-raised p-button-info"
    //           label="Ordenar por precio"
    //           onClick={() => handleShowPrices()}
    //         />

    //         {showPrices ? (
    //           <div className="flex">
    //             <Button
    //               className="p-button-outlined p-button-info "
    //               onClick={() => handlePriceChange("precioDesc")}
    //             >
    //               <FaSortNumericDown className="text-3xl" />
    //             </Button>
    //             <Button
    //               className="p-button-outlined p-button-info "
    //               onClick={() => handlePriceChange("precioAsc")}
    //             >
    //               <FaSortNumericUpAlt className="text-3xl" />
    //             </Button>
    //           </div>
    //         ) : null}
    //       </div>
    //     </div>
    //   ) : null}
    // </div>
  );
}
