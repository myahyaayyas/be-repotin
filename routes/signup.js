const express = require("express");
const router = express.Router();

module.exports = (users) => {
  router.post("/", (req, res) => {
    const { id, nama, email, password } = req.body;

    if (!id || !nama || !email || !password) {
      return res.status(400).send("Semua field harus diisi");
    }

    if (users.some((user) => user.email === email)) {
      return res.status(400).send("Email sudah terdaftar");
    }

    const newUser = { id, nama, email, password };
    users.push(newUser);

    res.status(201).json(newUser);
  });

  return router;
};
