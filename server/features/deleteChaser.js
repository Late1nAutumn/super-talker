module.exports = (MSG, client, bot) => {
  if (MSG.author.bot) return;

  const { channelId, content, createdTimestamp } = MSG;
  const userId = MSG.author.id;

  const reply =
    `The following message posted ${new Date(
      createdTimestamp
    ).toLocaleString("zh-CN", {
      timeZone: "America/New_York",
      timeZoneName: "short",
    })} has just been deleted by <@${userId}>. What a <:ilt_gou3:944716319570423838>` +
    "\n```" +
    content +
    "```";

  const channel = client.channels.cache.get(channelId);
  channel.send(reply);

  bot.info.featureUsed.deleteChaser++;
  console.log(`DeleteChaser triggered ${bot.info.featureUsed.deleteChaser} times`);
};
