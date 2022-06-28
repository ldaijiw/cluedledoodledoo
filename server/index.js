const express = require("express");
const fs = require("fs");

const PORT = process.env.PORT || 3001;

const app = express();

const VALID_ANSWERS = fs
  .readFileSync("data/answers.txt")
  .toString()
  .split("\n");

const VALID_GUESSES = fs
  .readFileSync("data/guesses.txt")
  .toString()
  .split("\n");

app.get("/validAnswers", (_req, res) => {
  res.json({ validAnswers: VALID_ANSWERS });
});

app.get("/validGuesses", (_req, res) => {
  res.json({ validGuesses: VALID_GUESSES });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
