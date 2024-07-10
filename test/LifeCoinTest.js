const LifeCoin = artifacts.require("LifeCoin");
const { expectRevert } = require('@openzeppelin/test-helpers');
const { assert } = require('chai');

contract("LifeCoin", accounts => {
    const [deployer, recipient] = accounts;

    beforeEach(async () => {
        this.lifeCoin = await LifeCoin.new();
    });

    it("should mint LifeCoins correctly", async () => {
        await this.lifeCoin.mint(deployer, 100);
        const balance = await this.lifeCoin.balanceOf(deployer);
        assert.equal(balance.toNumber(), 100, "Balance should be 100");
    });

    it("should transfer LifeCoins correctly", async () => {
        await this.lifeCoin.mint(deployer, 100);
        await this.lifeCoin.transfer(recipient, 50, { from: deployer });
        const balanceDeployer = await this.lifeCoin.balanceOf(deployer);
        const balanceRecipient = await this.lifeCoin.balanceOf(recipient);
        assert.equal(balanceDeployer.toNumber(), 50, "Deployer balance should be 50");
        assert.equal(balanceRecipient.toNumber(), 50, "Recipient balance should be 50");
    });

    it("should not transfer LifeCoins if balance is insufficient", async () => {
        await this.lifeCoin.mint(deployer, 100);
        await expectRevert(
            this.lifeCoin.transfer(recipient, 150, { from: deployer }),
            "Insufficient balance"
        );
    });
});
