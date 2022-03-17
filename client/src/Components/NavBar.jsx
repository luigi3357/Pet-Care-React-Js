import React from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";

export const NavBar = () => {
  return (
    <div className="flex justify-content-end  w-50 mb-3">
      <Link to="/">
        <Button
          label="Home"
          icon="pi pi-fw pi-home"
          className="p-button-rounded p-button-info p-button-outlined ml-1 mr-1"
        />
      </Link>
      <div className="flex">
        <Link to="/Register">
          <Button label="Registrarse" className="p-button-rounded ml-1 mr-1" />
        </Link>
        <Link to="/Login">
          <Button
            label="Iniciar Sesion"
            className="p-button-secondary p-button-rounded ml-1 mr-1-"
          />
        </Link>
      </div>

      <Avatar label="P" shape="circle" size="large" className="ml-1 mr-1" />
    </div>
  );
};
