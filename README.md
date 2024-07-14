# LifeCoin - A blockchain based Healthcare Appreciation Network

## Getting Started

### Install Dependencies
1. Clone the repository and run `npm install` in both the root and `frontend` directory.
2. Install node (v16.20.2) from https://nodejs.org/en/download/package-manager based on your Operating System.
3. Install truffle using `npm install -g truffle`.
4. Install the Ganache client from https://archive.trufflesuite.com/ganache/.
### Set Up
5. Open Ganache and create a new workspace. Verify that the `truffle-config.js` network and the web3 url in `drizzleOptions.js` matches the workspace network details. Go to the workspace settings and add the `truffle-config.js` project file. 
6. Set up your MetaMask account and install the browser extension from https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en. 
7. Create a private network in MetaMask and import an account using the private key from the first address from the Ganache workspace.
8. In the root directory, run `truffle compile` and `truffle migrate` to deploy the smart contracts.
9. Change the keys and addresses in `db.json` to account addresses from your local blockchain environment from Ganache.
### Frontend
10. In the `frontend` directory, run `npm start` to start the application.
