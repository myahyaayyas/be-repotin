const express = require("express");
const router = express.Router();

module.exports = (users) => {
  router.post("/", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email dan password harus diisi");
    }

    const user = users.find((user) => user.email === email);

    if (!user || user.password !== password) {
      return res.status(401).send("Email atau password salah");
    }

    res.status(200).send("Login berhasil");
  });

  return router;
};
