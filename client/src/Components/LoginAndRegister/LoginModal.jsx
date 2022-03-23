import React, { Component, useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getLogin, secondaryVerification } from "../../REDUX/actions/action";
import bcrypt from "bcryptjs";
import { Toast } from "primereact/toast";
import { NavBar } from "../NavBar";
import './FormDemo.css'
import style from '../../Pages/global.module.css'
import {Google} from './google'
import '../../index.css'
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

export const Login = () => {
  const navigate = useNavigate()
  const [showMessage, setShowMessage] = useState(false);
  const [showExist, setShowExist] = useState(false);
  const [showBan, setShowBan] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const defaultValues = {
    email: "",
    password: "",
  };

  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  async function onSubmit(data) {
    const oneUser = users.filter((e) => e.email === data.email);
    const passVerify = oneUser.map((e) => e.password).toString();
    const verifyPassword = await bcrypt.compare(data.password, passVerify);
    const data2 = {
      email: oneUser.map(e => e.email),
      name: oneUser.map(e => e.name)
    }
    const validar = oneUser.map(e => { return e.key_2fa })

    if (!oneUser.length) {
      setShowExist(true);
    } else {     
      if (oneUser.map(e => e.deleted)[0] === true) {
        setShowBan(true)
        return
      }
      if (verifyPassword === true) {
        if (oneUser.map(e => e.Admin)[0] === true) {
          dispatch(getAllUsers())
          dispatch(getLogin(data.email));
          setTimeout(() => {
            navigate("/adminHome")
          })
        }
        if (validar[0] === true) {
          dispatch(secondaryVerification(data2))
          setShowVerify(true)
          dispatch(getLogin(data.email));
          reset();
          setTimeout(() => {
            navigate("/verificacion")
          }, 2000);
        } else {
          setShowMessage(true);
          dispatch(getLogin(data.email));
          navigate("/")
          reset();
        }

      } else {
        shownotmatch();
      }
    }
  }
  const notmatch = useRef(null);
  const shownotmatch = () => {
    notmatch.current.show({
      severity: "error",
      summary: "Error",
      detail: "Las contanseñas no coinciden",
      life: 3000,
    });
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const dialogFooter = (
    <div className="flex justify-content-center" >
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => setShowMessage(false)}
      />
    </div>
  );
  const dialogFooterExist = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => setShowExist(false)}
      />
    </div>
  );
  const dialogFooterBan = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => setShowBan(false)}
      />
    </div>
  );

  return (
  <div >

    <NavBar/>
    
    <div>
      <div style={{ display:"flex", flexDirection:'column', alignItems:"center"}}>
        <i
        className="pi pi-user"
        style={{ fontSize: "5rem", color: "var(--green-500)",}}>
        </i>
      </div>
  
      
        <div className="form-demo">

          <Toast ref={notmatch} />
         

            <Dialog
              visible={showMessage}
              onHide={() => setShowMessage(false)}
              position="top"
              footer={dialogFooter}
              showHeader={false}
              breakpoints={{ "960px": "80vw" }}
              style={{ width: "30vw" }}
            >
              <div className="flex justify-content-center flex-column pt-6 px-3">
                <i
                  className="pi pi-check-circle"
                  style={{ fontSize: "5rem", color: "var(--green-500)" }}
                ></i>
                <h5>Ingreso correctamente!</h5>
                <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
                  <b>Bienvenido a Pet-Care</b>.
                </p>
              </div>
            </Dialog>

            <Dialog
              visible={showMessage}
              onHide={() => setShowVerify(false)}
              position="top"
              footer={dialogFooter}
              showHeader={false}
              breakpoints={{ "960px": "80vw" }}
              style={{ width: "30vw" }}
            >
              <div className="flex justify-content-center flex-column pt-6 px-3">
                <i
                  className="pi pi-check-circle"
                  style={{ fontSize: "5rem", color: "var(--green-500)" }}
                ></i>
                <h5>Redirigiendo !</h5>
                <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
                  <b>Debes validar tu codigo</b>.
                </p>
              </div>
            </Dialog>

            <Dialog
              visible={showExist}
              onHide={() => setShowExist(false)}
              position="top"
              footer={dialogFooterExist}
              showHeader={false}
              breakpoints={{ "960px": "80vw" }}
              style={{ width: "30vw" }}
            >
              <div className="flex justify-content-center flex-column pt-6 px-3">
                <i
                  className="pi pi-times-circle"
                  style={{ fontSize: "5rem", color: "var(--orange-500)" }}
                ></i>
                <h5>Error</h5>
                <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
                  <b>El email no tiene una cuenta creada. Registrate!</b>.
                </p>
              </div>
            </Dialog>

            <Dialog
              visible={showBan}
              onHide={() => setShowBan(false)}
              position="top"
              footer={dialogFooterBan}
              showHeader={false}
              breakpoints={{ "960px": "80vw" }}
              style={{ width: "30vw" }}
            >
              <div className="flex justify-content-center flex-column pt-6 px-3">
                <i
                  className="pi pi-times-circle"
                  style={{ fontSize: "5rem", color: "var(--orange-500)" }}
                ></i>
                <h5>Error</h5>
                <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
                  <b>Su cuenta fue desactivada o baneada si cree que hay un error comuniquese con PetCare3456789@gmail.com!</b>.
                </p>
              </div>
            </Dialog>
        
            
            <div className="flex justify-content-center">
              <div className="card">
                <h5 className="text-center"> Iniciar Sesion </h5>
                <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                  <div className="field">
                    <span className="p-float-label p-input-icon-right">
                      <i className="pi pi-envelope" />
                      <Controller
                        name="email"
                        control={control}
                        rules={{
                          required: "Email es requerido.",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "Email Invalido. E.g. example@email.com",
                          },
                        }}
                        render={({ field, fieldState }) => (
                          <InputText
                            id={field.name}
                            {...field}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                          />
                        )}
                      />
                      <label
                        htmlFor="email"
                        className={classNames({ "p-error": !!errors.email })}
                      >
                        Email*
                      </label>
                    </span>
                    {getFormErrorMessage("email")}
                  </div>

                  <div className="field">
                    <span className="p-float-label">
                      <Controller
                        name="password"
                        control={control}
                        rules={{ required: "La contraseña es requerida." }}
                        render={({ field, fieldState }) => (
                          <Password
                            id={field.name}
                            {...field}
                            toggleMask
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                          />
                        )}
                      />
                      <label
                        htmlFor="password"
                        className={classNames({ "p-error": errors.password })}
                      >
                        Contraseña*
                      </label>
                    </span>
                    {getFormErrorMessage("password")}
                  </div>
                  <Button type="submit" label="Enviar" />
                </form>
                <div style={{ textAlign: "center" }}>
                  <div>
                    <div style={{marginTop:10}}>
                    <Link to="/forgotPassword">Olvidaste tu contraseña?</Link>
                    </div>
                    <h6>No tienes cuenta?</h6>
                    <Link to="/register">
                      <h4>REGISTRATE</h4>
                    </Link>
                  </div>
                    
                          <div>
                            <Google/>
                          </div>

                  
                </div>
             </div>
          </div>
      </div>
    </div>
 </div>   
   

     
      
      
      
  );
};