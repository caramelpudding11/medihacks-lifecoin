import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import LifeCoin from './LifeCoin.json';

const Dashboard = ({ token }) => {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const fetchBalance = async () => {
            const web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = LifeCoin.networks[networkId];
            const instance = new web3.eth.Contract(LifeCoin.abi, deployedNetwork && deployedNetwork.address);
            const accounts = await web3.eth.getAccounts();
            const account = accounts[0];
            const balance = await instance.methods.balanceOf(account).call();
            setBalance(balance);
        };

        fetchBalance();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Your LifeCoin Balance: {balance} LC</p>
        </div>
    );
};

export default Dashboard;
