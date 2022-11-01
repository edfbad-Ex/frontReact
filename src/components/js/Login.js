import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom"
import axios from "axios";
import "../css/Login.css"

function Login(props) {

  const history = useHistory("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const Login = async(event) => {

    event.preventDefault();

    const credentials = {

      "email" :email,
      "password": password

    }

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
      }

      // spinning start to show
      // UPDATE: Add this code to show global loading indicator
      document.body.classList.add('loading-indicator');

      if (email === "" || password === "") {
        
        alert(`Faltan algunos datos ${email}.`);
        return false;

    }
    else{

      const config = {     
        withCredentials: true
    }

      await axios.post('http://localhost:8000/api/auth/administrator/login/', credentials, config)
      .then(

        (response) => {

          document.body.classList.remove('loading-indicator'); 
          alert("Iniciando Session");
          var csrftoken = getCookie('csrftoken');
          localStorage.setItem("token", csrftoken);
          let token = localStorage.token;      
          props.userLogin(token);
          history.push("/");
          console.log(response.data);
          }
        
      )
      .catch(

        (error) => {
          
         // Error
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            if (error.response.status === 404){

              document.body.classList.remove('loading-indicator');
              alert("Credenciales de acceso incorrectas");

            }

            else if (error.response.status === 403){

              document.body.classList.remove('loading-indicator');
              alert("Antes de inciar otra sesión tienes que cerrar la sesión que ya tienes iniciada");

            }

          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the 
            // browser and an instance of
            // http.ClientRequest in node.js
            console.log("Servidor inactivo");
        
          } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error desconocido', error.message);
        
          }
          //console.log(error.config);
          
          }        

      )

    }

  }

  return (
    <div className="Login-Container">

      <form onSubmit={Login} className="Login-Container-Form"> 

          <div className="Login-Container-Form-Child">

            <div className="Login-Container-Form-Child-Circle">

              <svg className="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></svg>

            </div>
            
            <span className="Login-Container-Form-Child-Text">Login</span>
            

          </div>

          <div className="Login-Container-Form-Child">
            
            <div className="Container-placeholderR">
              <span className="placeholderR">Email*</span>
            </div>
            <input className="Login-Container-Form-Child-Input" type="text" value={email} onChange={(event => setEmail(event.target.value))} required autoComplete="off" pattern="^[a-zA-Z0-9.!#$%’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"/>

            <div className="Container-placeholderR">
              <span className="placeholderR">Contraseña*</span>
            </div>
            <input className="Login-Container-Form-Child-Input" type="password" value={password} onChange={(event => setPassword(event.target.value))} required autoComplete="off" />

          </div>

          <div className="Login-Container-Form-Child">

            <button className="Login-Container-Form-Child-Button" type="submit">Login</button>

          </div>

          <div className="Login-Container-Form-Child">

            <Link className="Login-Container-Form-Child-Text" to="/reset">

              <span>Forgot password?</span>            

            </Link>

            <Link className="Login-Container-Form-Child-Text" to="/register">

              <span>Don't have an account? Sign Up</span>

            </Link>

          </div>

      </form>


    </div>
  );
}

export default Login;