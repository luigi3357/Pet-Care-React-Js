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
import register, { getAllUsers } from '../../REDUX/actions/action';




export const Register = () => {
    const [showMessage, setShowMessage] = useState(false);
    const[showExist,setShowExist]=useState(false);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch()
    const defaultValues = {
        name: '',
        last_name:'',        
        email: '',
        password: '',
        repeatPassword:'',
        keeper: false,               
    }
    const users = useSelector((state)=>state.users)    

    useEffect(()=>{
        dispatch(getAllUsers());        
    },[dispatch])

    console.log(users)
      

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
    

    const onSubmit = (data) => {
        const oneUser = users.filter(e=> e.email === data.email)
        if(oneUser.length){
            console.log('existe')
            setShowExist(true)
            }else{
                setShowExist(false)
                if(data.password !== data.repeatPassword){
                    shownotmatch()
                  }else if(data.password.length<8){
                    showminpass()
                    
                  }else{
                dispatch(register(data)); 
                dispatch(getAllUsers());
                setFormData(data);
                setShowMessage(true);
                console.log('hice todo bien')
            console.log("las pass no coinciden")
            reset();
            }   }     
                          
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
                                <Controller name="name" control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Name*</label>
                            </span>
                            {getFormErrorMessage('name')}
                        </div>

                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="last_name" control={control} rules={{ required: 'last_name is required.' }} render={({ field, fieldState }) => (
                                    <InputText id={field.last_name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="last_name" className={classNames({ 'p-error': errors.name })}>last_name*</label>
                            </span>
                            {getFormErrorMessage('last_name')}
                        </div>

                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <Controller name="email" control={control}
                                    rules={{ required: 'Email is required.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' }}}
                                    render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                )} />
                                <label htmlFor="email" className={classNames({ 'p-error': !!errors.email })}>Email*</label>
                            </span>
                            {getFormErrorMessage('email')}
                        </div>

                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="password" control={control} rules={{ required: 'Password is required.' }} render={({ field, fieldState }) => (
                                    <Password id={field.name} {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} header={passwordHeader} footer={passwordFooter} />
                                )} />
                                <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Password*</label>
                            </span>
                            {getFormErrorMessage('password')}
                        </div>

                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="repeatPassword" control={control} rules={{ required: 'repeatPassword is required.' }} render={({ field, fieldState }) => (
                                    <Password id={field.name} {...field} toggleMask className={classNames({ 'p-invalid': fieldState.invalid })} header={passwordHeader} footer={passwordFooter} />
                                )} />
                                <label htmlFor="repeatPassword" className={classNames({ 'p-error': errors.repeatPassword })}>Repeat Password*</label>
                            </span>
                            {getFormErrorMessage('repeatPassword')}
                        </div>
                      
                        <div className="field-checkbox">
                            <Controller name="keeper" control={control} render={({ field, fieldState }) => (
                                <Checkbox inputId={field.name} onChange={(e) => field.onChange(e.checked)} checked={field.value} className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                            <label htmlFor="accept" className={classNames({ 'p-error': errors.accept })}>Cuidador*</label>
                        </div>

                        <div className="field-checkbox">
                            <Controller name="accept" control={control}  render={({ field, fieldState }) => (
                                <Checkbox inputId={field.name} onChange={(e) => field.onChange(e.checked)} checked={field.value} className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                            <label htmlFor="accept" className={classNames({ 'p-error': errors.accept })}>Solicitante*</label>
                        </div>

                        <Button type="submit" label="Submit" className="mt-2" />
                    </form>
                </div>
            </div>
        </div>
    );
}