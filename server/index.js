const express = require("express");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();

// serve the files for the React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// all other GET requests not handled before will return the React app
app.get("*", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
