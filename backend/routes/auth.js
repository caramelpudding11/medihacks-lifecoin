
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Origin",
        "http://localhost:3000",
      );
      next();
    });
// User registration

// User login
app.post("/api/auth/login", controller.signin);

};

