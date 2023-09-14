const express = require("express");
const cors = require("cors");

const { authRouter, productsRouter, dailyRouter } = require("./routes");


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/products", productsRouter);
app.use("/users", authRouter);
app.use("/daily", dailyRouter);

app.use((req, res) => {
  res.status(404).json({message: 'Not found'})
})

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
})

module.exports = app;
