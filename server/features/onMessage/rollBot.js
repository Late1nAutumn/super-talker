module.exports = (Param, MSG, client, bot) => {
  var low = 0,
    high = 100,
    param = Param.trim();
  if (param) {
    var space = param.indexOf(" ");
    if (space === -1) {
      var number = parseFloat(param);
      if (number >= 0) high = Math.ceil(number); // ignore negative when single param
    } else {
      var p1 = parseFloat(param.slice(0, space).trim()),
        p2 = parseFloat(param.slice(space).trim());
      if (p1 !== NaN) {
        if (p2 === NaN) high = Math.ceil(p1);
        else {
          low = Math.floor(p1);
          high = Math.ceil(p2);
        }
      }
    }
  }
  var roll = Math.floor(Math.random() * (high - low) + low);
  MSG.reply(`**${MSG.author.username}** rolled **${roll}** (${low} to ${high})`);
  
  bot.info.featureUsed.rollBot++;
  console.log(`RollBot triggered ${bot.info.featureUsed.rollBot} times`);
};
