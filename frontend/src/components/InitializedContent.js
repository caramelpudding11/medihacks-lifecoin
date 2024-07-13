
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomeWrapper from "./wrapper/HomeWrapper";

import Register from "./Register";
import Footer from "./static/Footer";
import RegistrationSuccess from "./static/RegistrationSuccess";


import "../css/App.css";

/**
 * Includes conditional application routing and user registration logic after app initialization.
 * 
 * @author syuki
 */
export const InitializedContent = ({drizzle, drizzleState}) => {

    const [isAuth, setIsAuth] = useState();
    const [userType, setUserType] = useState();

    const contract = drizzle.contracts.LifeCoin;

    //If the user is registered as at least one role, they're allowed access to the application content.

    function updateIsAuth(newIsAuth){
        setIsAuth(newIsAuth);
    }

    function updateUserType(newUserType){
        setUserType(newUserType);
    }

    //Registered users are redirected to the home page, un-registered users go to the sign-up page.

        return (
            <Router>
                
                <div>
                    <Routes>    
                        <Route exact path="/" element={<Register drizzle={drizzle} drizzleState={drizzleState} isAuthenticated={isAuth} />} /> 
                        <Route exact path="/registration-success" element={<RegistrationSuccess isAuthenticated={isAuth} />} />   
                        <Route exact path="/home" element={<HomeWrapper drizzle={drizzle} drizzleState={drizzleState} isAuthenticated={isAuth} userType={userType} updateAuth={updateIsAuth} updateUserType={updateUserType} />} /> 
                    </Routes>
                </div>
                <Footer isAuthenticated={isAuth} />
            </Router>
        );

}
