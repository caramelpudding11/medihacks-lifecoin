// SPDX-License-Identifier: MIT

import "./Users.sol";

contract LifeCoin {
    using Users for Users.User;
    Users.User private user;
    string public name = "LifeCoin";
    string public symbol = "LC";
    mapping(address => uint256) public balances;

    event Transfer(address indexed from, address indexed to, uint256 value);

    function mint(address to, uint256 amount) public {
        balances[to] += amount;
        emit Transfer(address(0), to, amount);
    }

    function transfer(address to, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
    }

    function balanceOf(address account) public view returns (uint256) {
        return balances[account];
    }

    function addUser(address userAddress) public {
        mint(userAddress, 100);
        require(!user.userAddresses[userAddress], "User already exists");
        user.userAddresses[userAddress] = true;
        
    }

    function removeUser(address userAddress) public {
        user.userAddresses[userAddress] = false;
    }

    function isExistingUser(address userAddress) public view returns (bool) {
        return user.userAddresses[userAddress];
    }
}
