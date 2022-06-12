const express = require("express");
const bParser = require("body-parser");
const path = require("path");

const port = process.env.PORT || 3000;

const Discord = require("./discord");
var BOT_RUNNING = false;

const app = express();
app.use(bParser.json());
app.use(bParser.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, "../client/dist")));
app.listen(port, () => console.log("server online:" + port));

// app.post("/start", (req, res) => {
//   if (BOT_RUNNING) res.send("Bot already running");
//   else {
//     var STalker = new Discord(req.body.token, res);
//     BOT_RUNNING = true;
//   }
// });

const STalker = new Discord();
