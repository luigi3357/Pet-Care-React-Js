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
import { useDispatch, useSelector } from "react-redux";
import  { getLoginForgot } from '../../REDUX/actions/action';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../NavBar';




export const MailCode = () => {
    const navigate = useNavigate()
    const [showMessage, setShowMessage] = useState(false);
    const[showExist,setShowExist]=useState(false);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch()
    const defaultValues = {
       token: '',                     
    }
    const users = useSelector((state)=>state.login2)    

    useEffect(() => {
        dispatch(getLoginForgot(users.email));
      }, [dispatch]);

      

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
    
    const onSubmit = (data) => {
        if (data.token) {
            dispatch(getLoginForgot(users.email)); 
            if (users.token === data.token) {
           setShowMessage(true)
            } else {
            setShowExist(true)
            }
          }
    };

    function handleNavigate() {
        setShowMessage(false)
        navigate("/reset")
    }
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

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => handleNavigate()} /></div>;
    const dialogFooterExist = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowExist(false)} /></div>;

    return (
        <div>
            <div style={{marginTop:30}}>
            <div style={{ display:"flex", flexDirection:'column', alignItems:"center"}}>
                <i
                className="pi pi-key"
                style={{ fontSize: "5rem", color: "var(--green-500)",}}>
                </i>
            </div>
        <div className="form-demo">
            <Toast ref={notmatch} />
            <Toast ref={minpass} />
            <Dialog visible={showMessage} onHide={() => handleNavigate()} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex justify-content-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Bien</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Verificacion Correcta! <b>{formData.name}</b>! 
                    </p>
                </div>
            </Dialog>
          
            <Dialog visible={showExist} onHide={() => setShowExist(false)} position="top" footer={dialogFooterExist} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex justify-content-center flex-column pt-6 px-3">
                    <i className="pi pi-times-circle" style={{ fontSize: '5rem', color: 'var(--orange-500)' }}></i>
                    <h5>Error</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                       <b>Verifique su token</b>.
                    </p>
                </div>
            </Dialog>

            <div className="flex justify-content-center">
                <div className="card">
                    <h5 className="text-center">Ingrese el codigo</h5>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">

                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="token" control={control} rules={{ required: 'Token is required.' }} render={({ field, fieldState }) => (
                                    <InputText 
                                    id={field.token} 
                                    {...field} 
                                    autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} 
                                    />
                                )} />
                                <label 
                                htmlFor="token" 
                                className={classNames({ 'p-error': errors.token })}>Ingrese el token*</label>
                            </span>
                            {getFormErrorMessage('name')}
                        </div>

                        <Button type="submit" label="Submit" className="mt-2" />
                    </form>
                </div>
            </div>
        </div>
        </div>
        </div>
    );
}