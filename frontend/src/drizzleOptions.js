import LifeCoin from "./contracts/LifeCoin.json";
import Web3 from 'web3';
 

const options = {
    web3: {
        block: false,
        fallback: {
            type: "ws",
            url: "ws://localhost:7545"
        }
    },
    contracts: [LifeCoin],
};

export default options;
