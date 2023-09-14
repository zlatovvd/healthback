const mongoose = require("mongoose");
const app = require("./app");

//name zlatovvd
//const password = "fSuQR7JLhKlRWnaZ";
// const connect =
//   "mongodb+srv://zlatovvd:fSuQR7JLhKlRWnaZ@cluster0.kkhlnud.mongodb.net/health?retryWrites=true&w=majority";

const connect = "mongodb://localhost:27017/health";

mongoose
  .connect(connect)
  .then(() => {
    console.log("connect OK");
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch((err) => {
    console.log("error", err.message);
    process.exit(1);
  });