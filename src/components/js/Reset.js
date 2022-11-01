import React, { useState } from "react";
import { useHistory} from "react-router-dom"
import axios from "axios";
import "../css/Reset.css"

function Reset() {

  const history = useHistory("");
  const [email, setEmail] = useState('');

  const Send = async(event) => {

    event.preventDefault();

    const credentials = {

      "email" :email

    }

    // spinning start to show
    // UPDATE: Add this code to show global loading indicator
    document.body.classList.add('loading-indicator');

    if (email === "") {
        
        alert(`Faltan algunos datos.`);
        return false;

    }
    else{

      await axios({

        method: 'post',
        withCredentials: true,
        url: 'http://localhost:8000/api/auth/administrator/reset/',
        data: credentials,

      })
      .then(

        () => {

          document.body.classList.remove('loading-indicator'); 
          alert("El token fue enviado a tu correo electronico.");
          history.push("/confirm");
      
          }
        
      )
      .catch(

        () => {
          
          document.body.classList.remove('loading-indicator');
          alert("Este correo no esta registrado.");
      
        }        

      )

    }

  }

  return (
    <div className="Reset-Container">

      <form onSubmit={Send} className="Reset-Container-Form"> 

          <div className="Reset-Container-Form-Child">

            <div className="Reset-Container-Form-Child-Circle">

              <svg className="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></svg>

            </div>
            
            <span className="Reset-Container-Form-Child-Text">Reset password</span>
            

          </div>

          <div className="Reset-Container-Form-Child">
            
            <span id="placeholder1">Email Address*</span>
            <input id="Reset-Container-Form-Child-Email" className="Reset-Container-Form-Child-Input" type="text" value={email} onChange={(event => setEmail(event.target.value))} required autoComplete="off" pattern="^[a-zA-Z0-9.!#$%’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"/>

          </div>

          <div className="Reset-Container-Form-Child">

            <button className="Reset-Container-Form-Child-Button" type="submit">Send</button>

          </div>

      </form>


    </div>
  );
}

export default Reset;
