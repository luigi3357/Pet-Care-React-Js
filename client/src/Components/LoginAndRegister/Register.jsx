import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
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
import { register, getAllUsers } from "../../REDUX/actions/action";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../NavBar";
import { RegisterGoogle } from "./registerGoogle";


export const Register = () => {
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const [showExist, setShowExist] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const defaultValues = {
    name: "",
    last_name: "",
    email: "",
    password: "",
    repeatPassword: "",
    keeper: false,
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
  function handleNavigate() {
    setShowMessage(false);
    navigate("/");
  }

  const onSubmit = (data) => {
    const oneUser = users.filter((e) => e.email === data.email);
    if (oneUser.length) {
      setShowExist(true);
    } else {
      setShowExist(false);
      if (data.password.length < 8) {
        showminpass(true);
      } else if (data.password !== data.repeatPassword) {
        shownotmatch(true);
      } else {
        dispatch(register(data));
        dispatch(getAllUsers());
        setFormData(data);
        setShowMessage(true);
        reset();
      }
    }
  };
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

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => handleNavigate()}
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
  const passwordHeader = <h6>Crea tu contraseña</h6>;
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
    <div>
      <NavBar/>
    <div style={{ display:"flex", flexDirection:'column', alignItems:"center"}}>
    <i
    className="pi pi-users"
    style={{ fontSize: "5rem", color: "var(--green-500)",}}>
    </i>
  </div>
    <div className="form-demo">
      <Toast ref={notmatch} />
      <Toast ref={minpass} />
      
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
          <h5>Registration Successful!</h5>
          <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
            Bienvenido <b>{formData.name} a Pet-Care</b>!
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
            <b>El email ya tiene una cuenta creada. Logueate!</b>.
          </p>
        </div>
      </Dialog>

      <div className="flex justify-content-center">
        <div className="card">
          <h5 className="text-center">Registro</h5>
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
            <div className="field">
              <span className="p-float-label">
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Nombre es requerido." ,
                  pattern: {
                    value: /^.{2,20}$/i,
                    message: "Minimo dos caracteres",
                  },}}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      {...field}
                      keyfilter="alpha"
                      autoFocus
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="name"
                  className={classNames({ "p-error": errors.name })}
                >
                  Nombre*
                </label>
              </span>
              {getFormErrorMessage("name")}
            </div>

            <div className="field">
              <span className="p-float-label">
                <Controller
                  name="last_name"
                  control={control}
                  rules={{ required: "Apellido es requerido.",
                  pattern: {
                    value: /^.{2,20}$/i,
                    message: "Minimo dos caracteres",
                  }, }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.last_name}
                      {...field}
                      keyfilter="alpha"
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="last_name"
                  className={classNames({ "p-error": errors.name })}
                >
                  Apellido*
                </label>
              </span>
              {getFormErrorMessage("last_name")}
            </div>

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
                      message: "Direccion de email invalida. Ej: example@email.com",
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
                  rules={{ required: "Contraseña es requerida.", 
                   }}
                  render={({ field, fieldState }) => (
                    <Password
                      id={field.name}
                      {...field}
                      toggleMask
                      keyfilter={/^[^#<>*!-,._´ç+^{}~`¡°'?¿=()/&%$·"ªº|[+$]/}
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
                  Contraseña*
                </label>
              </span>
              {getFormErrorMessage("password")}
            </div>

            <div className="field">
              <span className="p-float-label">
                <Controller
                  name="repeatPassword"
                  control={control}
                  rules={{ required: "Repetir la contraseña es requerido.", }}
                  render={({ field, fieldState }) => (
                    <Password
                      id={field.name}
                      {...field}
                      toggleMask
                      keyfilter={/^[^#<>*!-,._´ç+^{}~`¡°'?¿=()/&%$·"ªº|[+$]/}
                      
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
                  Repita la contraseña*
                </label>
              </span>
              {getFormErrorMessage("repeatPassword")}
            </div>

            <Controller     
            name="keeper"        
             control={control}
             rules={{ required: "repeatPassword is required." }}
             render={({ field, fieldState }) => (
              <select className="selectChild" defaultValue="disabled" onChange={e => field.onChange(e)}>
              <option value="disabled" disabled>Selecciona que eres</option>
              <option 
                      {...field} 
                      value={true}
                      >
                        Soy Cuidador
                        </option>
              <option 
                      {...field} value={false}>Soy Solicitante</option>
          </select>
             )}/>
            <Button type="submit" label="Registrar" className="mt-2" />
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};