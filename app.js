require('dotenv').config();
const { App } = require('@slack/bolt');

// Change this to any emoji in slack
const reactionToCheck = 'eyes';

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN
});

app.event('reaction_added', async ({ event, client, context }) => {
    const response = await client.users.info({
        user: event.user
    });
    if(event.reaction === reactionToCheck && response.user.name === process.env.SLACK_USERNAME) {
      console.log(`User with GitHub id ${process.env.GITHUB_USERNAME} wants to assign themselves to the PR.`);
    }
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();