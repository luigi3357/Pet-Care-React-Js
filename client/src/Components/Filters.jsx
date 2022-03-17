import React, { useState } from 'react'

export default function Filters() {

    const [showFilters,setShowFilters] = useState(false);
    const [showSpecies, setShowSpecies] = useState(false);
    const [filter, setFilter] = useState('');
    const [showSizes, setShowSizes] = useState(false);
    const [size, setSize] = useState('');
    const [showPrices, setShowPrices] = useState(false);
    const [price, setPrice] = useState('');



    function handleShowFilters(){
        setShowFilters(!showFilters);
    }
    function handleShowSpecies(){
        setShowSpecies(!showSpecies);
        setShowSizes(false);
        setShowPrices(false);
    }
    function handleShowSizes(){
        setShowSizes(!showSizes);
        setShowSpecies(false);
        setShowPrices(false);
    }
    function handleShowPrices(){
        setShowPrices(!showPrices);
        setShowSpecies(false);
        setShowSizes(false);
    }
    function handleFilterChange(e){
        setFilter(e);
        handleShowFilters();
    }
    function handleSizeChange(e){
        setSize(e);
        handleShowFilters();
    }
    function handlePriceChange(e){
        setPrice(e);
        handleShowFilters();
    }
    function cleanFilters(){
        setFilter("");
        setPrice("");
        setSize("");
        handleShowFilters();
    }

  return (
    <>
        <input type="button" value="Filtrar y ordenar" onClick={()=> handleShowFilters()}></input>

        {showFilters?
        <div >
                <input type="button" value="Limpiar filtros" onClick={()=> cleanFilters()}></input>

            <div>
            <input type="button" value={`Filtrar por especie`} onClick={()=> handleShowSpecies()} ></input>

                { showSpecies?
                <div  style={{display:"flex", flexDirection:"column"}}>
                    <input type="button" value="Perros" onClick={()=> handleFilterChange("perros")}></input>
                    <input type="button" value="Gatos" onClick={()=> handleFilterChange("gatos")}></input>
                    <input type="button" value="Roedores" onClick={()=> handleFilterChange("roedores")}></input>
                    <input type="button" value="Aves" onClick={()=> handleFilterChange("aves")}></input>
                </div>
                :null}
            </div>

            <div>
                <input type="button"  value="Filtrar por tamaño" onClick={()=> handleShowSizes()}></input>

                { showSizes?
                <div  style={{display:"flex", flexDirection:"column"}}>
                    <input type="button" value="Pequeño" onClick={()=>handleSizeChange("pequeño")}></input>
                    <input type="button" value="Mediano" onClick={()=>handleSizeChange("mediano")}></input>
                    <input type="button" value="Grande" onClick={()=>handleSizeChange("grande")}></input>
                </div>
                :null}
            </div>

            <div>
                <input
                 type="button"
                 value="Ordenar por precio"
                 onClick={()=> handleShowPrices()}></input>

                { showPrices?
                <div style={{display:"flex", flexDirection:"column"}}>
                    <input type="button" value="Precio mayor" onClick={()=>handlePriceChange("precioDesc")}/>
                    <input type="button" value="Precio menor" onClick={()=>handlePriceChange("precioAsc")}/>
                </div>
                :null}
                
            </div>
        </div>
        :null}
    </>
  )
}
