import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import Backdrop from '@material-ui/core/Backdrop';
import Grid from '@material-ui/core/Grid';


import "../css/NewUser.css";

const Register = ({drizzle, drizzleState, isAuthenticated}) => {

    const navigate = useNavigate();
    const accountAddress = drizzleState.accounts[0];

    useEffect(() => {
        if(isAuthenticated){
        navigate('/');
        }
    }, []);

    return (
        <div className="new-user-body">
            <h1><center>Welcome to the LifeCoin Patient Portal</center></h1>
            <Backdrop open className="backdrop-design">
                <Paper elevation={0} className="new-user-paper">
                    <center>
                        <Typography component="h1" variant="h5" style={{ fontWeight: "500" }}>Login</Typography>
                        <p>Account Address <b>{accountAddress}</b></p>
                        <Grid 
                            container 
                            color="secondary" 
                            justifyContent="center" 
                            direction={'column'} 
                            spacing={2}
                        >
                            <Grid item xs={12}>
                                <Tooltip arrow title="" placement="right">
                                    <Button style={{ width: 200 }}
                                        variant="contained"
                                        color="primary"
                                        className="nf-button"
                                        onClick={() => navigate("/registration-success", {
                                            
                                        })}
                                    >
                                        Login
                                    </Button>
                                </Tooltip>
                            </Grid>
                            
                        </Grid>
                        
                            <br/>
                            
                    </center>
                </Paper>
            </Backdrop>
        </div>
    );
 };

 export default Register;