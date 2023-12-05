const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const app = express();
const port = 5000;

app.use(bodyParser.json());

const pool = new Pool({
  user: "username",
  host: "localhost",
  database: "reportin",
  password: "password",
  port: 5432,
});

app.post('/register', async (req, res) => {
  try {
    const { nama, email, password } = req.body;

    const result = await pool.query('INSERT INTO users (nama, email, password) VALUES ($1, $2, $3) RETURNING *', [nama, email, password]);

    res.status(201).json({ message: 'Pendaftaran berhasil', user: result.rows[0] });
  } catch (error) {
    console.error('Error saat mendaftar:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mendaftar', detail: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query("SELECT * FROM users WHERE email = $1 AND password = $2", [
      email,
      password,
    ]);

    if (result.rows.length > 0) {
      res.json({ message: "Login berhasil", user: result.rows[0] });
    } else {
      res.status(401).json({ error: "Email atau password salah" });
    }
  } catch (error) {
    console.error("Error saat login:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat login" });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
