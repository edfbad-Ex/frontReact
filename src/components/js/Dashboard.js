import React, { useState, useEffect, forwardRef } from "react";
import { useHistory } from 'react-router-dom';
import "../css/Dashboard.css"
import Logout from "./Logout";

function Dashboard() {    
    
    const history = useHistory();
    const token = localStorage.token
    
    useEffect(()=>{
        
        if(token === undefined){
            history.push("/login");
        }
        else if(token === null){
            
            history.push("/login");
    
        }
        else{

            console.log("token activo: ", token)

        }

    }, [])

    return (
        <div className="Dashboard-Container">

            <Logout />
                
        </div>
    )
}

export default Dashboard
