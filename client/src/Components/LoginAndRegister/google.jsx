import GoogleLogin from 'react-google-login';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, getLogin, registerGoogle } from '../../REDUX/actions/action';
import { useNavigate } from 'react-router-dom';


export function Google() {
  const navigate = useNavigate()
  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData'))
      : null
  );
const dispatch = useDispatch()
  const handleFailure = (result) => {
    alert(result);
  };
useEffect(() => {
  dispatch(getAllUsers())
},[])
const users = useSelector((state) => state.users)
  const handleLogin = async (googleData) => {
    const oneUser = users.filter(e=>e.email === googleData.profileObj.email)
    if(oneUser.length){
      dispatch(getLogin(googleData.profileObj.email))
      navigate("/")
    }  
  };
  const handleLogout = () => {
    localStorage.removeItem('loginData');
    setLoginData(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Google Login App</h1>
        <div>
          {loginData ? (
            <div>
              <h3>You logged in as {loginData.email}</h3>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <GoogleLogin
              clientId="618049573683-n0hug6dkdnf01ftbjamk6pes6ub3jmv7.apps.googleusercontent.com"
              buttonText="inicia sesion con Google"
              onSuccess={handleLogin}
              onFailure={handleFailure}
              cookiePolicy={'single_host_origin'}
            ></GoogleLogin>
          )}
        </div>
      </header>
    </div>
  );
}
