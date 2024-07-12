import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button, TextField, Paper, CircularProgress, AppBar, Toolbar, IconButton, MenuItem, Menu, Avatar } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import db from '../db.json'; // Import the mock database

import "../css/App.css";
import "../css/Profile.css";

export default class Home extends React.Component {
    state = {
        recipientName: '',
        recipient: '',
        amount: '',
        balance: 0,
        transactionSuccess: null,
        isAuthenticated: true,
        loading: false,
        error: null,
        mintLoading: false,
        userRecipients: [], // Store recipients for the current user
        profileAnchorEl: null, // Anchor for profile menu
    };

    componentDidMount() {
        this.fetchBalance();
        this.loadRecipients();
    }

    fetchBalance = async () => {
        const { drizzle } = this.props;
        const contract = drizzle.contracts.LifeCoin;
        const balance = await contract.methods.balanceOf(this.props.drizzleState.accounts[0]).call();
        this.setState({ balance });
    }

    loadRecipients = () => {
        const { drizzleState } = this.props;
        const userAddress = drizzleState.accounts[0];
        const userRecipients = db[userAddress]?.recipients || [];
        this.setState({ userRecipients });
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value }, () => {
            if (name === 'recipientName') {
                const selectedRecipient = this.state.userRecipients.find(recipient => recipient.name === value);
                if (selectedRecipient) {
                    this.setState({ recipient: selectedRecipient.address });
                }
            }
        });
    }

    transferLifeCoins = async () => {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.LifeCoin;
        const { recipient, amount } = this.state;

        this.setState({ loading: true, error: null });

        try {
            await contract.methods.transfer(recipient, amount).send({ from: drizzleState.accounts[0] });
            this.setState({ transactionSuccess: true });
            this.fetchBalance();
        } catch (error) {
            this.setState({ transactionSuccess: false, error: error.message });
        } finally {
            this.setState({ loading: false });
        }
    }

    mintLifeCoins = async () => {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.LifeCoin;

        this.setState({ mintLoading: true, error: null });

        try {
            await contract.methods.mint(drizzleState.accounts[0], 100).send({ from: drizzleState.accounts[0] });
            this.setState({ transactionSuccess: true });
            this.fetchBalance();
        } catch (error) {
            this.setState({ transactionSuccess: false, error: error.message });
        } finally {
            this.setState({ mintLoading: false });
        }
    }

    handleLogout = () => {
        this.setState({ isAuthenticated: false });
    }

    handleProfileClick = (event) => {
        this.setState({ profileAnchorEl: event.currentTarget });
    };

    handleProfileClose = () => {
        this.setState({ profileAnchorEl: null });
    };

    render() {
        const { drizzleState } = this.props;

        if (!this.state.isAuthenticated) {
            return <Navigate to="/register" />;
        }

        const profileMenuOpen = Boolean(this.state.profileAnchorEl);

        return (
            <div className="main-body" color="primary">
                <AppBar position="static" className="app-bar">
                    <Toolbar>
                        <div className="title"><h1><center>LifeCoin Wallet</center></h1></div>
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={this.handleProfileClick}
                        >
                            <AccountCircleIcon />
                        </IconButton>
                        <Menu
                            anchorEl={this.state.profileAnchorEl}
                            open={profileMenuOpen}
                            keepMounted
                            disableScrollLock={true}
                            onClose={this.handleProfileClose}
                        >
                            <div className="profile-menu">
                                <center>
                                    <Avatar className="profile-picture" alt="Profile Picture" src="/path/to/profile-pic.jpg" />
                                </center>
                                <div className="profile-details">
                                    <div className="profile-item">
                                        <h4>Account Address</h4>
                                        <p>{drizzleState.accounts[0]}</p>
                                    </div>
                                    <div className="profile-item">
                                        <h4>ETH Account Balance</h4>
                                        <p>{drizzleState.accountBalances[drizzleState.accounts[0]]} <b>ETH</b></p>
                                    </div>
                                    <div className="profile-item">
                                        <h4>LifeCoin Account Balance</h4>
                                        <p>{this.state.balance} <b>LC</b></p>
                                    </div>
                                </div>
                            </div>
                        </Menu>
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={this.handleLogout}
                        >
                            <ExitToAppIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Paper className="app" elevation={3}>
                    <div className="info-section">
                        <h1>Transfer LifeCoins</h1>
                    </div>
                    <div className="form-section">
                        <TextField
                            select
                            label="Recipient Name"
                            name="recipientName"
                            value={this.state.recipientName}
                            onChange={this.handleInputChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                        >
                            {this.state.userRecipients.map(recipient => (
                                <MenuItem key={recipient.name} value={recipient.name}>
                                    {recipient.name} ({recipient.role})
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Recipient Address"
                            name="recipient"
                            value={this.state.recipient}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            disabled
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            label="Amount"
                            name="amount"
                            type="number"
                            value={this.state.amount}
                            onChange={this.handleInputChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                        />
                        <div className="button-group">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.transferLifeCoins}
                                disabled={this.state.loading}
                                className="action-button"
                            >
                                {this.state.loading ? <CircularProgress size={24} /> : 'Send LifeCoins'}
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={this.mintLifeCoins}
                                disabled={this.state.mintLoading}
                                className="action-button"
                            >
                                {this.state.mintLoading ? <CircularProgress size={24} /> : 'Mint 100 LifeCoins'}
                            </Button>
                        </div>
                        {this.state.transactionSuccess && <p className="success-message">Transaction successful!</p>}
                        {this.state.transactionSuccess === false && <p className="error-message">Transaction failed: {this.state.error}</p>}
                    </div>
                </Paper>
            </div>
        );
    }
}
