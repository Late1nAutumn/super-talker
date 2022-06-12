const { minimumEditDistance } = require("./helpers");

const VIPList = ["227954115001450496"];
// const VIPList = ["227954115001450496", "445074759693369346"];

module.exports = (oldMSG, newMSG, client, bot) => {
  if (oldMSG.author.bot || !VIPList.includes(oldMSG.author.id)) return;

  const s1 = oldMSG.content,
    s2 = newMSG.content;

  if (minimumEditDistance(s1, s2) > 3) {
    newMSG.reply(
      "Hmm, if you wonder what was said, that was: ```" + oldMSG.content + "```"
    );
    bot.info.featureUsed.updateHarness++;
    console.log(`UpdateHarness triggered ${bot.info.featureUsed.updateHarness} times`);
  }
};
