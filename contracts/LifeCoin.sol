// SPDX-License-Identifier: MIT


contract LifeCoin {
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
}
