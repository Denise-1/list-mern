require("dotenv").config();

const express = require("express");
const { connect } = require("./db");

const path = require("path");

const app = express();
// middleware
app.use(express.json());

//deployment
app.use(express.static(path.join(__dirname, "build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,"build/index.html"))
})

const router = require("./routes");
app.use("/api", router);

const PORT = process.env.PORT || 4000;

async function startServer() {
  await connect();

  app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
  });
}

startServer();
