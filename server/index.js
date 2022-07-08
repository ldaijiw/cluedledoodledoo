const express = require("express");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();

const VALID_ANSWERS = fs
  .readFileSync(path.resolve(__dirname, "data/answers.txt"))
  .toString()
  .split("\n");

const VALID_GUESSES = fs
  .readFileSync(path.resolve(__dirname, "data/guesses.txt"))
  .toString()
  .split("\n");

// serve the files for the React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/validAnswers", (_req, res) => {
  res.json({ validAnswers: VALID_ANSWERS });
});

app.get("/validGuesses", (_req, res) => {
  res.json({ validGuesses: VALID_GUESSES });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// all other GET requests not handled before will return the React app
app.get("*", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
