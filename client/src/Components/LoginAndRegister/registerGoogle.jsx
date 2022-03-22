import GoogleLogin from 'react-google-login';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, getLogin, registerGoogle } from '../../REDUX/actions/action';
import { useNavigate } from 'react-router-dom';

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";



export function RegisterGoogle() {
    const navigate = useNavigate()
    // const [loginData, setLoginData] = useState(
    //     localStorage.getItem('loginData')
    //         ? JSON.parse(localStorage.getItem('loginData'))
    //         : null
    // );
    const dispatch = useDispatch()
    const handleFailure = (result) => {
        alert(result);
    };
    useEffect(() => {
        dispatch(getAllUsers())
    }, [])
    const users = useSelector((state) => state.users)
    const handleLogin = async (googleData) => {
        const oneUser = users.filter(e => e.email === googleData.profileObj.email)
        if (!oneUser.length) {
            dispatch(registerGoogle(googleData.profileObj))
            setShowMessage(true)

        } else {
            setShowMessageError(true)
        }
    }

    const handleLogout = () => {
        // setLoginData(null);
    };
    const [showMessage, setShowMessage] = useState(false);
    const [showMessageError, setShowMessageError] = useState(false);

    function handleNavigate() {
        setShowMessage(false)
        navigate("/login")
    }

    const dialogFooter = (
        <div className="flex justify-content-center" >
            <Button
                label="OK"
                className="p-button-text"
                autoFocus
                onClick={() => handleNavigate()}
            />
        </div>
    );

    return (
        <div className="App">
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
                    <h5>Se registro correctamente!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
                        <b>Bienvenido a Pet-Care</b>.
                    </p>
                </div>
            </Dialog>
            <Dialog
                visible={showMessageError}
                onHide={() => setShowMessageError(false)}
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
                    <h5>Ya posee cuenta inicie sesion!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
                        <b>Bienvenido a Pet-Care</b>.
                    </p>
                </div>
            </Dialog>
            <header className="App-header">
                <div>
                    <GoogleLogin
                        clientId="618049573683-n0hug6dkdnf01ftbjamk6pes6ub3jmv7.apps.googleusercontent.com"
                        buttonText="Regitrarse con Google"
                        onSuccess={handleLogin}
                        onFailure={handleFailure}
                        cookiePolicy={'single_host_origin'}
                    ></GoogleLogin>

                </div>
            </header>
        </div>
    );
}
