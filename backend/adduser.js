const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User"); // Adjust the path accordingly

mongoose.connect("mongodb://localhost:27017/lifecoin", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const addUser = async () => {
  const username = "test";
  const password = "password";
  const hashedPassword = bcrypt.hashSync(password, 8);

  const user = new User({
    username,
    password: hashedPassword
  });

  await user.save();
  console.log("User added successfully");
  mongoose.disconnect();
};

addUser().catch(error => {
  console.error("Error adding user:", error);
  mongoose.disconnect();
});
