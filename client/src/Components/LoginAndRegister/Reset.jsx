import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import "./FormDemo.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";
import { useDispatch, useSelector } from "react-redux";
import register, { getAllUsers, resetPassword } from "../../REDUX/actions/action";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../NavBar";

export const Reset = () => {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [showExist, setShowExist] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const defaultValues = {   
    password: "",
    repeatPassword: "",   
  };
  const users = useSelector((state) => state.users);
  const use = useSelector((state) => state.login2);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);






  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  function handleNavigate() {    
    setShowExist(false);
    navigate("/");
  }

  const onSubmit = (data) => {
    const oneUser = users.filter((e) => e.email === use.email);
    const data1 = {
      password: data.password,
      email: oneUser.map(e=> e.email)[0],
      token: oneUser.map(e=>e.token)[0]
    }
    if(data.password.length < 8 ){
       showminpass(true)
      reset()}
      else if(data.password === data.repeatPassword){
    setShowExist(true)
    dispatch(resetPassword(data1))    
    }else{
      shownotmatch(true)
      setShowExist(false)
      reset()
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
  const minpass = useRef(null);
  const showminpass = () => {
    minpass.current.show({
      severity: "error",
      summary: "Error",
      detail: "La contraseña debe ser mayor a 8 caracteres",
      life: 3000,
    });
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const dialogFooterExist = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => handleNavigate()}
      />
    </div>
  );
  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Sugerencias</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
        <li>Al menos una minuscula</li>
        <li>Al menos una mayuscula</li>
        <li>Al menos un numero</li>
      </ul>
      <p className="mt-2">Condicion</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
        <li>Minimo 8 caracteres</li>
      </ul>
    </React.Fragment>
  );

  return (
    <div className="form-demo">
      <Toast ref={notmatch} />
      <Toast ref={minpass} />

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
            className="pi pi-check-circle"
            style={{ fontSize: "5rem", color: "var(--orange-500)" }}
          ></i>
          <h5>Realizado</h5>
          <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
            <b>Contraseña cambiada</b>.
          </p>
        </div>
      </Dialog>

      <div className="flex justify-content-center">
        <div className="card">
          <h5 className="text-center">Resetea tu contraseña</h5>
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">

            <div className="field">
              <span className="p-float-label">
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: "Password is required." }}
                  render={({ field, fieldState }) => (
                    <Password
                      id={field.name}
                      {...field}
                      toggleMask
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                      header={passwordHeader}
                      footer={passwordFooter}
                    />
                  )}
                />
                <label
                  htmlFor="password"
                  className={classNames({ "p-error": errors.password })}
                >
                  Password*
                </label>
              </span>
              {getFormErrorMessage("password")}
            </div>

            <div className="field">
              <span className="p-float-label">
                <Controller
                  name="repeatPassword"
                  control={control}
                  rules={{ required: "repeatPassword is required." }}
                  render={({ field, fieldState }) => (
                    <Password
                      id={field.name}
                      {...field}
                      toggleMask
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                      header={passwordHeader}
                      footer={passwordFooter}
                    />
                  )}
                />
                <label
                  htmlFor="repeatPassword"
                  className={classNames({ "p-error": errors.repeatPassword })}
                >
                  Repeat Password*
                </label>
              </span>
              {getFormErrorMessage("repeatPassword")}
            </div>

           

            <Button type="submit" label="Submit" className="mt-2" />
          </form>
        </div>
      </div>
    </div>
  );
};