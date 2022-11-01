import React, { useState } from "react";
import { useHistory } from "react-router-dom"
import axios from "axios";
import "../css/ResetConfirm.css"

function ResetConfirm() {

  const history = useHistory("");
  const [password, setPassword] = useState('');
  const [restartoken, setRestartoken] = useState('');

  const Send = async(event) => {

    event.preventDefault();

    const credentials = {

        "password": password,
        "token": restartoken

    }

    // spinning start to show
    // UPDATE: Add this code to show global loading indicator
    document.body.classList.add('loading-indicator');

    if (restartoken === "" || password  === "") {
        
        alert(`Faltan algunos datos`);
        return false;

    }
    else{

      await axios({

        method: 'post',
        withCredentials: true,
        url: 'http://localhost:8000/api/auth/administrator/reset/confirm/',
        data: credentials,
      })
      .then(

        () => {

          document.body.classList.remove('loading-indicator'); 
          alert("Contraseña restaurada.");
          history.push("/login");
      
          }
        
      )
      .catch(

        () => {
          
          document.body.classList.remove('loading-indicator');
          alert("Tu contraseña es muy debil o el token no es correcto");
      
        }        

      )

    }

  }

  return (
    <div className="ResetConfirm-Container">

      <form onSubmit={Send} className="ResetConfirm-Container-Form"> 

          <div className="ResetConfirm-Container-Form-Child">

            <div className="ResetConfirm-Container-Form-Child-Circle">

              <svg className="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></svg>

            </div>
            
            <span className="ResetConfirm-Container-Form-Child-Text">Add token</span>
            

          </div>

          <div className="ResetConfirm-Container-Form-Child">

          <span id="placeholder1">Password*</span>
            <input id="ResetConfirm-Container-Form-Child-Password" className="ResetConfirm-Container-Form-Child-Input" type="password" value={password} onChange={(event => setPassword(event.target.value))} required autoComplete="off" />

            <span id="placeholder2">Token*</span>
            <input id="ResetConfirm-Container-Form-Child-Token" className="ResetConfirm-Container-Form-Child-Input" type="text" value={restartoken} onChange={(event => setRestartoken(event.target.value))} required autoComplete="off"/>

          </div>

          <div className="ResetConfirm-Container-Form-Child">

            <button className="ResetConfirm-Container-Form-Child-Button" type="submit">Send</button>

          </div>

      </form>


    </div>
  );
}

export default ResetConfirm;
