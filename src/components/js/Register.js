import React, { useState } from "react";
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios';
import "../css/Register.css"

function Register() {

  const history = useHistory("");

  
  const [nombre, setNombre] = useState('');
  const [apellido_paterno, setApellido_paterno] = useState('');
  const [apellido_materno, setApellido_materno] = useState('');
  const [edad, setEdad] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const Signup = async(event) => {

    event.preventDefault();

    const credentials = {

      "nombre": nombre,
      "apellido_paterno": apellido_paterno,
      "apellido_materno": apellido_materno,
      "edad": edad,
      "email": email,
      "password": password

    }

    document.body.classList.add('loading-indicator');
      
    await axios({

      method: 'post',
      withCredentials: true,
      url: 'http://localhost:8000/api/auth/administrator/signup/',
      data: credentials,

    })
    .then(

      () => {

        document.body.classList.remove('loading-indicator');
        alert("Usuario Creado");  
        history.push("/login");  
    
      }
      
    )
    .catch(

      () => {

        document.body.classList.remove('loading-indicator'); 
        alert("Este usuario ya fue registrado");

      }        

    )

  }

  return (
    <div className="Register-Container">

      <form onSubmit={Signup} className="Register-Container-Form"> 

        <div className="Register-Container-Form-Child">

          <div className="Register-Container-Form-Child-Circle">

            <svg className="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></svg>

          </div>
          
          <span className="Register-Container-Form-Child-Text">Register</span>
          

        </div>

        <div className="Register-Container-Form-Child">

          <div className="Container-placeholderR">
            <span className="placeholderR">Nombre*</span>
          </div>
          <input className="Register-Container-Form-Child-Input" type="text" value={nombre} onChange={(event => setNombre(event.target.value))} required autoComplete="off" pattern="[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{5,108}"/>
    
          <div className="Container-placeholderR">
            <span className="placeholderR">Apellido paterno*</span>
          </div>
          <input className="Register-Container-Form-Child-Input" type="text" value={apellido_paterno} onChange={(event => setApellido_paterno(event.target.value))} required autoComplete="off" pattern="[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{5,108}"/>
    
          <div className="Container-placeholderR">
            <span className="placeholderR">Apellido materno*</span>
          </div>
          <input className="Register-Container-Form-Child-Input" type="text" value={apellido_materno} onChange={(event => setApellido_materno(event.target.value))} required autoComplete="off" pattern="[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{5,108}"/>
    
          <div className="Container-placeholderR">
            <span className="placeholderR">Edad*</span>
          </div>
          <input className="Register-Container-Form-Child-Input" type="text" value={edad} onChange={(event => setEdad(event.target.value))} required autoComplete="off"/>
    
          <div className="Container-placeholderR">
            <span className="placeholderR">Email*</span>
          </div>
          <input className="Register-Container-Form-Child-Input" type="text" value={email} onChange={(event => setEmail(event.target.value))} required autoComplete="off" pattern="^[a-zA-Z0-9.!#$%’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"/>
          
          <div className="Container-placeholderR">
            <span className="placeholderR">Contraseña*</span>
          </div>
          <input className="Register-Container-Form-Child-Input" type="password" value={password} onChange={(event => setPassword(event.target.value))} required autoComplete="off"/>

        </div>

        <div className="Register-Container-Form-Child">

          <button className="Register-Container-Form-Child-Button" type="submit">Register</button>

        </div>

        <div className="Register-Container-Form-Child">

          <Link className="Register-Container-Form-Child-Text" to="/login">

            <span>Already have an account? Sign in</span>            

          </Link>

        </div>

      </form>

    </div>
  );
}

export default Register