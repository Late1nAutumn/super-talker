const Discord = require("discord.js");
const messageBot = require("./features/onMessage/bot");
const deleteChaser = require("./features/deleteChaser");
const updateHarness = require("./features/updateHarness");

const WAKEUP_DURATION = 30 * 1000;
const MINUTES_PER_COUNT = WAKEUP_DURATION / 60 / 1000;

class Bot {
  constructor() {
    this.info = {
      // public values
      BOT_BIRTHDAY: null,
      WAKEUP_COUNT: 0,
      featureUsed: {
        rollBot: 0,
        deleteChaser: 0,
        updateHarness: 0,
      },
    };

    const client = new Discord.Client({
      intents: ["GUILDS", "GUILD_MESSAGES"],
    });

    client.on("ready", () => {
      this.info.BOT_BIRTHDAY = new Date();
      console.log("Discord bot login successful!");

      if (process.env.PORT)
        // while not in dev
        setInterval(() => {
          // prevent heroku sleeping
          console.log(
            "Waking minutes: " + this.info.WAKEUP_COUNT * MINUTES_PER_COUNT
          );
          this.info.WAKEUP_COUNT++;
        }, WAKEUP_DURATION);
    });

    client.on("messageCreate", (MSG) => messageBot(MSG, client, this));

    client.on("messageDelete", (MSG) => deleteChaser(MSG, client, this));

    client.on("messageUpdate", (oldMSG, newMSG) =>
      updateHarness(oldMSG, newMSG, client, this)
    );

    client.login(process.env.DISCORD_TOKEN);
  }
}

module.exports = Bot;
