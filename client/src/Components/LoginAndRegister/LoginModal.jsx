import React, { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import "./FormDemo.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getLogin } from "../../REDUX/actions/action";
import bcrypt from "bcryptjs";
import { Toast } from "primereact/toast";
import { NavBar } from "../NavBar";

export const Login = () => {
  const navigate = useNavigate()
  const [showMessage, setShowMessage] = useState(false);
  const [showExist, setShowExist] = useState(false);
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

    if (!oneUser.length) {
      setShowExist(true);
    } else {
      if (verifyPassword === true) {
        setShowMessage(true);
        dispatch(getLogin(data.email));
        navigate("/")
        reset();
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
    <div className="flex justify-content-center">
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

  return (
    <div className="form-demo">
      <NavBar />
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
          <h5>Registration Successful!</h5>
          <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
            Your account is registered under name <b>{formData.name}</b>, under
            lastname <b>{formData.name}</b>, and email <b>{formData.email}</b>.
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

      <div className="flex justify-content-center">
        <div className="card">
          <h5 className="text-center"> Login </h5>
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
            <div className="field">
              <span className="p-float-label p-input-icon-right">
                <i className="pi pi-envelope" />
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required.",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address. E.g. example@email.com",
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
                  rules={{ required: "Password is required." }}
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
              </span>
              <label
                htmlFor="password"
                className={classNames({ "p-error": errors.password })}
              >
                Password*
              </label>

              {getFormErrorMessage("password")}
            </div>
            <Button type="submit" label="Submit" />
          </form>

          <div>
            <Link to="/forgotPassword">Forgot Password?</Link>
          </div>

          <div>
            <p>No tienes cuenta?</p>
            <Link to="/register">
              <p>REGISTRATE</p>
            </Link>
          </div>

          <div>
            <a href="http://localhost:3001/Auth/login/federated/google">
              Google
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
