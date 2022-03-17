import React, { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import './FormDemo.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../index.css';
import { useDispatch, useSelector } from "react-redux";
import  { getLogin } from '../../REDUX/actions/action';
import { useNavigate } from 'react-router-dom';




export const MailCode = () => {
    const navigate = useNavigate()
    const [showMessage, setShowMessage] = useState(false);
    const[showExist,setShowExist]=useState(false);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch()
    const defaultValues = {
       token: '',        
    }
    const users = useSelector((state)=>state.login)    

    useEffect(() => {
        dispatch(getLogin(users.email));
      }, [dispatch]);

    console.log(users)
      

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
    

    const onSubmit = (data) => {
        navigate("/home")
        if (data.token) {

            dispatch(getLogin(users.email));
            console.log(users.token, "soy el token guardado") 
                 
            const tokenVerify = users.token;
      
            if (tokenVerify === data.token) {
             showMessage()
            } else {
            //  showExist()
            console.log("hola")
            }
          }
    };
    const notmatch = useRef(null);
    const shownotmatch = () => {
        notmatch.current.show({severity:'error', summary: 'Error', detail:'Las contanseñas no coinciden', life: 3000});
    }
    const minpass = useRef(null);
    const showminpass = () => {
        minpass.current.show({severity:'error', summary: 'Error', detail:'La contraseña debe ser mayor a 8 caracteres', life: 3000});
    }

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
    const dialogFooterExist = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowExist(false)} /></div>;
    const passwordHeader = <h6>Pick a password</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </React.Fragment>
    );

    return (
        <div className="form-demo">
            <Toast ref={notmatch} />
            <Toast ref={minpass} />
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex justify-content-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Registration Successful!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Bienvenido <b>{formData.name}</b>! 
                    </p>
                </div>
            </Dialog>
          
            <Dialog visible={showExist} onHide={() => setShowExist(false)} position="top" footer={dialogFooterExist} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex justify-content-center flex-column pt-6 px-3">
                    <i className="pi pi-times-circle" style={{ fontSize: '5rem', color: 'var(--orange-500)' }}></i>
                    <h5>Error</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                       <b>El email ya tiene una cuenta creada. Logueate!</b>.
                    </p>
                </div>
            </Dialog>

            <div className="flex justify-content-center">
                <div className="card">
                    <h5 className="text-center">Register</h5>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">

                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="token" control={control} rules={{ required: 'Token is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.token} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="token" className={classNames({ 'p-error': errors.token })}>Name*</label>
                            </span>
                            {getFormErrorMessage('name')}
                        </div>

                        <Button type="submit" label="Submit" className="mt-2" />
                    </form>
                </div>
            </div>
        </div>
    );
}