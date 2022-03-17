import React from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";

export const NavBar = () => {
  return (
    <div className="flex justify-content-end  w-50">
      <Link to="/">
        <Button
          label="Home"
          icon="pi pi-fw pi-home"
          className="p-button-rounded p-button-info p-button-outlined"
        />
      </Link>
      <div className="flex">
        <Link to="/Register">
          <Button label="Registrarse" className="p-button-rounded" />
        </Link>
        <Link to="/Login">
          <Button
            label="Iniciar Sesion"
            className="p-button-secondary p-button-rounded"
          />
        </Link>
      </div>

      <Avatar label="P" shape="circle" size="large" />
    </div>
  );
};
