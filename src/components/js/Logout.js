import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import "../css/Logout.css"

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {makeStyles} from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles(() => ({
    menu: {
        "& .MuiMenu-paper": { 
            marginTop: '40px',
            marginLeft: '-45px',
            border: '3px solid rgb(85, 105, 255)',     
            borderRadius: '8px',
        }
    },
    menuItem: {
        
    }
    
}));

function Logout() {

    const styles= useStyles();
    const history = useHistory();
    const token = localStorage.token
    const [anchorEl, setAnchorEl] = useState(null);

    var delete_cookie = (name1, name2) => {
        document.cookie = name1 + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        document.cookie = name2 + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
    setAnchorEl(null);
    };

    const Logout = async() => {

        const config = {     
            "X-CSRFToken": token,
            withCredentials: true
        }

        await axios.post('http://localhost:8000/api/auth/administrator/logout/', config).then(
            resp => {
            
                console.log(resp);
                localStorage.removeItem("token");        
                history.push("/login");
                delete_cookie('csrftoken', 'sessionid');
            
            }

        ).catch(
            error => console.log(error)
        )

    }

    return (
        <div className="Logout-Container">

            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <ExitToAppIcon />
            </Button>
            <Menu
                className={styles.menu}
                disableScrollLock={ true }
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => Logout()}>Logout</MenuItem>
            </Menu>
            
        </div>
    )
}

export default Logout
