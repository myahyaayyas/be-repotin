const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());

const users = [];

app.use("/signup", require("./routes/signin")(users));

app.use("/signin", require("./routes/signin")(users));

app.get("/", (req, res) => {
  res.send("Selamat datang di server Express!");
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
