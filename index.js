const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req, res) => {
  return res.send("hello everyone");
});

app.listen(port, () => {
  console.log("server listen on port " + port);
});
console.log("hello");
