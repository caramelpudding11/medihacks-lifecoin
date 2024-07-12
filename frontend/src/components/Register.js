import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import Backdrop from '@material-ui/core/Backdrop';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import Divider from '@material-ui/core/Divider';

import { USER_TYPES } from "./enum/UsersEnum";

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
                                <Tooltip arrow title="Create batches of various products." placement="right">
                                    <Button style={{ width: 200 }}
                                        variant="contained"
                                        color="primary"
                                        className="nf-button"
                                        onClick={() => navigate("/confirm-registration", {
                                            
                                        })}
                                    >
                                        Login
                                    </Button>
                                </Tooltip>
                            </Grid>
                            
                        </Grid>
                        <Divider style={{ marginBottom: 20 }} />
                            <br/>
                            Powered by <Link className="ModalLink" href="https://mui.com/" target="_blank" >material-ui</Link> and 
                            <Link className="ModalLink" href="https://reactjs.org/" target="_blank" 
                            > {" "}React</Link> &copy; {new Date().getFullYear()} 
                    </center>
                </Paper>
            </Backdrop>
        </div>
    );
 };

 export default Register;