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

// DB_HOST=mongodb+srv://vasyl:k8opJ3kpTZ9JbsUb@cluster0.v95caoh.mongodb.net/db-contacts?retryWrites=true&w=majority
// DB_HOST1=mongodb+srv://zlatovvd:fSuQR7JLhKlRWnaZ@cluster0.kkhlnud.mongodb.net/
// SECRET_KEY=yNa(xLVwrB@}+_(bh3gD]MJ.~K?D:F
// LOGIN=vasyl
// PASSWORD=k8opJ3kpTZ9JbsUb
