const config = require("../config/auth.config");
const User = require("../models/User");
//const User = db.User;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signin = (req, res) => {

  User.findOne({
    username: req.body.username
  })
    .then((err, user) => {

      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      console.log("hi");
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      console.log("hi2");
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Incorrect Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 
      });
    
    });
};