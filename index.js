const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const CHANNEL_ACCESS_TOKEN = 'kAItEvXs8PhCFooH3Pcx/FJ2wMVw/M8JYGpne9KmNE4TMlpdwQSq2x1CPgGHEiD/By+baZs/i23G2NYG5IRg1NMP6X1eMbWUdRkjkILX2fSrADZY6rOUcYw7kpKqSX4/maS7I41d05gsZgaNwRPyTgdB04t89/1O/w1cDnyilFU=';

app.post('/webhook', async (req, res) => {
  const events = req.body.events;

  events.forEach(async (event) => {
    // Check if the message is text
    if (event.type === 'message' && event.message.type === 'text') {
      if (event.message.text === 'show_plans') {
        await sendPlans(event.replyToken);
      }
    }
  });

  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.send('Hello, this is the LINE bot server.');
});

async function sendPlans(replyToken) {
  const message = {
    replyToken: replyToken,
    messages: [
      {
        type: "flex",
        altText: "各種プラン",
        contents: {
          type: "carousel",
          contents: [
            {
              type: "bubble",
              hero: { type: "image", url: "https://drive.google.com/file/d/1uci5o5J0uoVDKPVFZG5j_FD-yxIljU3k/view?usp=sharing", size: "full", aspectMode: "cover", aspectRatio: "20:13" },
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  { type: "text", text: "プラン1", weight: "bold", size: "xl" },
                  { type: "text", text: "プラン1の説明です", wrap: true, margin: "md" }
                ]
              }
            },
          ]
        }
      }
    ]
  };

  await axios.post('https://api.line.me/v2/bot/message/reply', message, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`
    }
  });
}

app.listen(3000, () => console.log('Server running on port 3000'));
