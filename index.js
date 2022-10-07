const generate = require("./main/generate");
const emotion = require("./main/emotion");
const learn = require("./main/learning");
const action = require("./main/action");
const fs = require("fs");
const express = require("express");
const banned_word = require("./banned_word.json");

const app = express();


const isIncludes = (arr, target) => arr.some((el) => target.includes(el));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all("/api/v1/generate/random", async (req, res) => {
  let template = await generate.connect();

  if (isIncludes(banned_word.banned, template.result)) {
    res.json({
      error: -1,
      detail: `Inappropriate sentences were generated.
              Please try again.`
    });

    return;
  }
  res.json({
    result: template
  });
});

app.listen(3000, () => {
  console.log('サーバーが起動しました');
});