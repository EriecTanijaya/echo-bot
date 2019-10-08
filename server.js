// server.js
// where your node app starts

// init project
const line = require("@line/bot-sdk");
const express = require("express");
const app = express();

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
}

const client = new line.Client(config);

app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.log(err);
  })
})

function handleEvent(event){
  if (event.type !== 'message' || event.message.type !== 'text'){
    return Promise.resolve(null);
  }
  
  let text = event.message.text;
  client.replyMessage(event.replyToken, {
    type: 'text',
    text: text
  })
  
}

// listen for requests :)
const port = 3000;
app.listen(port, () => {
  console.log("Your app is listening on port " + port);
});
