require("dotenv").config();

const express = require("express");
const { connect } = require("./db");

const app = express();

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
