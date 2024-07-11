import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from '../Dashboard';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    const handleSetToken = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };

    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <Login setToken={handleSetToken} />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/dashboard">
                    {token ? <Dashboard token={token} /> : <Redirect to="/login" />}
                </Route>
                <Route path="/">
                    <Redirect to="/login" />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
