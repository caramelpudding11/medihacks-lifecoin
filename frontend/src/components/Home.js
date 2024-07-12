import React from "react";
import { Navigate } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from "@material-ui/core/Paper";
import { CircularProgress } from '@material-ui/core';

import "../css/App.css";

export default class Home extends React.Component {
    state = {
        recipient: '',
        amount: '',
        balance: 0,
        transactionSuccess: null,
        isAuthenticated: null,
        loading: false,
        error: null,
        mintLoading: false
    };

    componentDidMount() {
        this.fetchBalance();
    }

    fetchBalance = async () => {
        const { drizzle } = this.props;
        const contract = drizzle.contracts.LifeCoin;
        const balance = await contract.methods.balanceOf(this.props.drizzleState.accounts[0]).call();
        this.setState({ balance });
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
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

    render() {
        const { drizzleState } = this.props;
        
        return (
            <div className="main-body" color="primary">
                <Paper className="app" style={{ backgroundColor: "#92869f63", minHeight: 600 }} elevation={3}>
                    <h2>LifeCoin Wallet</h2>
                    <div>
                        <p>Your Account: {drizzleState.accounts[0]}</p>
                        <p>Your Balance: {this.state.balance} LC</p>
                        <TextField
                            label="Recipient Address"
                            name="recipient"
                            value={this.state.recipient}
                            onChange={this.handleInputChange}
                            fullWidth
                            margin="normal"
                            variant="outlined"
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
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.transferLifeCoins}
                            disabled={this.state.loading}
                        >
                            {this.state.loading ? <CircularProgress size={24} /> : 'Send LifeCoins'}
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={this.mintLifeCoins}
                            disabled={this.state.mintLoading}
                            style={{ marginLeft: '10px' }}
                        >
                            {this.state.mintLoading ? <CircularProgress size={24} /> : 'Mint 100 LifeCoins'}
                        </Button>
                        {this.state.transactionSuccess && <p>Transaction successful!</p>}
                        {this.state.transactionSuccess === false && <p>Transaction failed: {this.state.error}</p>}
                    </div>
                </Paper>
            </div>
        );
    }
}
