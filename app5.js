const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor(Math.random() * 6 + 1);
  let luck = '';
  if (num == 1) luck = '大吉';
  else if (num == 2) luck = '吉';
  else if (num == 3) luck = '中吉';
  else if (num == 4) luck = '小吉';
  else if (num == 5) luck = '末吉';
  else if (num == 6) luck = '凶';

  res.render('luck', { number: num, luck: luck });
});


app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = parseInt(req.query.win) || 0;
  let total = parseInt(req.query.total) || 0;
  const num = Math.floor(Math.random() * 3) + 1;
  let cpu = '';
  if (num === 1) cpu = 'グー';
  else if (num === 2) cpu = 'チョキ';
  else cpu = 'パー';
  let judgement = '';
  if ((cpu === 'グー' && hand === 'パー') ||
      (cpu === 'チョキ' && hand === 'グー') ||
      (cpu === 'パー' && hand === 'チョキ')) {
    judgement = '勝ち';
    win += 1;
  } else if (cpu === hand) {
    judgement = 'あいこ';
  } else {
    judgement = '負け';
  }
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  };
  console.log(display);
  res.render('janken', display);
});


app.get("/reverse", (req, res) => {
  const input = req.query.text || "";
  const reversed = input.split("").reverse().join("");
  res.render("reverse", { input, reversed });
});

app.get("/count", (req, res) => {
  const input = req.query.text || '';
  const charCount = input.length;
  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;
  res.render('count', { input, charCount, wordCount });
});



app.listen(8080, () => console.log("Example app listening on port 8080!"));
