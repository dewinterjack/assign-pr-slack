require('dotenv').config();
const { App } = require('@slack/bolt');

const { assignPullRequest } = require('./assignPullRequest');

// Change this to any emoji in slack
const reactionToCheck = 'eyes';

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN
});

app.event('reaction_added', async ({ event, client }) => {
    const response = await client.users.info({
        user: event.user
    });
    if(event.reaction === reactionToCheck && response.user.name === process.env.SLACK_USERNAME) {
      const result = await client.conversations.history({
        channel: event.item.channel,
        latest: event.item.ts,
        inclusive: true,
        limit: 1
      });

      const message = result.messages[0];
      assignPullRequest(message.text);
    }
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();