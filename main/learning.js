// TODO classを使って同じインスタンスを生成してコードの短縮をする

const client = require("./client");
const fs = require("fs");

module.exports = {
  async learnTokens() {
    /** @type {{text: string, pos: string}[]} */ let result = [];

    let timeline = await twitter.getUserTimeline("1441436363304300553");
    // let timeline = await twitter.getTimeline();
    /** @type {import('twitter-api-v2').TweetV2[]} */ let filtered_timeline =
      [];

    timeline.forEach((tweet) => {
      if (tweet.text.slice(0, 3) === "RT ") return;

      filtered_timeline[filtered_timeline.length] = tweet;
    });

    const Client = new client.TwitterClient(filtered_timeline);

    for (let i = 0; i < 2; i++) {
      await Client.get();
      result[result.length] = Client.learn();
    }

    /** @type {{dict: {text: string}[]}} */
    let file = JSON.parse(fs.readFileSync(`${__dirname}/../dictionary.db`));

    let saveData = {
      dict: [...file.dict, ...result],
    };

    fs.writeFileSync(
      `${__dirname}/../dictionary.db`,
      JSON.stringify(saveData, null, "\t")
    );
  },
};
