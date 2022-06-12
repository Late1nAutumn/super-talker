const { headerCheck } = require("../helpers");
const rollBot = require("./rollBot");

const COMMANDS = {
  BASE: "stalker",
  ROLL: "roll",
};

module.exports = (MSG, client, bot) => {
  // ignore bot messages
  if (MSG.author.bot) return;

  const content = MSG.content;
  // TODO: private mode

  // commands
  let command = headerCheck(content, ";" + COMMANDS.BASE, true); // return value might be ""
  if (command !== false) {
    // roll bot
    let roll = headerCheck(command, COMMANDS.ROLL, true);
    if (roll !== false) rollBot(roll, MSG, client, bot);
    return;
  }

  // roll bot (w/o command)
  let roll = headerCheck(content, ";" + COMMANDS.ROLL, true);
  if (roll !== false) {
    rollBot(roll, MSG, client, bot);
    return;
  }
};
