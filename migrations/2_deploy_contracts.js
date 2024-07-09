var LifeCoin = artifacts.require("./LifeCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(LifeCoin);
};