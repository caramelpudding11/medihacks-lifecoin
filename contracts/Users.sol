

/**
 * @title Users
 * @dev Stores user addresses for different types of users.
 */
library Users {

    struct User {
        mapping(address => bool) userAddresses;
    }

}