const { signUpHandler, signInHandler } = require("../src/handler");

const routes = [
  {
    method: "POST",
    path: "/signup",
    handler: signUpHandler,
  },
  {
    method: "POST",
    path: "/signin",
    handler: signInHandler,
  },
];

module.exports = routes;
