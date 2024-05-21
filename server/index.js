const express = require("express");

const app = express();

const router = require("./routes");
app.use("/api", router);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
