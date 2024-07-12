import React, { useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import Backdrop from '@material-ui/core/Backdrop';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';

import "../../css/NewUser.css";

/**
 * Renders upon successful registration. 
 * Redirects to the home page after delay.
 * 
 * @author syuki
 */
const RegistrationSuccess = ({isAuthenticated}) => {

    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated){
        navigate('/home');
        }
    }, []);

    //Sends out registration status to the redirected home page.  
    useEffect(() => {
        setTimeout(() => {
        navigate('/', {
            state: {
                auth: true,
            }
          })
        }, 5000)
        console.log("hello");
    }, []);

    return (
        <div className="new-user-body">
            <Backdrop open className="backdrop-design">
                <Paper elevation={0} className="new-user-paper1">
                    <center>
                        <Typography style={{ paddingTop: 30, fontWeight: "500" }} component="h1" variant="h5">Successfully Logged In!</Typography>
                        <CheckCircleOutlineOutlinedIcon style = {{ paddingTop: 40, fontSize: 200, color: "#2D323F"}} 
                            aria-label="success tick" />
                        <p style={{ paddingBottom: "0" }}>Redirecting to home page.</p>
                        <p style={{ fontSize: 12, paddingTop: 0 }}>Please <Link className="ModalLink" href="/">click here</Link> if you're not redirected automatically.</p>
                        <Divider style={{ marginBottom: 20 }} />
                        
                            <br/>
                    </center>
                </Paper>
            </Backdrop>
        </div>
    );
 };

 export default RegistrationSuccess;