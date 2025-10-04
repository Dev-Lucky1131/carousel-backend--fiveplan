const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const CHANNEL_ACCESS_TOKEN = 'kAItEvXs8PhCFooH3Pcx/FJ2wMVw/M8JYGpne9KmNE4TMlpdwQSq2x1CPgGHEiD/By+baZs/i23G2NYG5IRg1NMP6X1eMbWUdRkjkILX2fSrADZY6rOUcYw7kpKqSX4/maS7I41d05gsZgaNwRPyTgdB04t89/1O/w1cDnyilFU=';


app.post('/webhook', async (req, res) => {
  console.log("Webhook received:", JSON.stringify(req.body, null, 2)); // 👈 log full event object

  const events = req.body.events || [];

  events.forEach(async (event) => {
    console.log("Processing event:", event); // 👈 log each event

    if (event.type === 'message' && event.message.type === 'text') {
      console.log("User sent text:", event.message.text); // 👈 log text

      if (event.message.text === 'show_plans') {
        await sendPlans(event.replyToken);
      }
    }
  });

  res.sendStatus(200);
});



async function sendPlans(replyToken) {
  const message = {
    replyToken,
    messages: [
      {
        type: "flex",
        altText: "各種プラン",
        contents: {
          type: "carousel",
          contents: [
            {
              type: "bubble",
              hero: {
                type: "image",
                url: "https://drive.google.com/file/d/1uci5o5J0uoVDKPVFZG5j_FD-yxIljU3k/view?usp=sharing",  // 画像URL
                size: "full",
                aspectRatio: "20:13",
                aspectMode: "cover"
              },
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  { type: "text", text: "プラン1", weight: "bold", size: "xl" },
                  { type: "text", text: "プラン1の説明です", wrap: true }
                ]
              }
            },
            {
              type: "bubble",
              hero: {
                type: "image",
                url: "https://drive.google.com/file/d/1uci5o5J0uoVDKPVFZG5j_FD-yxIljU3k/view?usp=sharing",
                size: "full",
                aspectRatio: "20:13",
                aspectMode: "cover"
              },
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  { type: "text", text: "プラン2", weight: "bold", size: "xl" },
                  { type: "text", text: "プラン2の説明です", wrap: true }
                ]
              }
            },
            {
              type: "bubble",
              hero: {
                type: "image",
                url: "https://drive.google.com/file/d/1uci5o5J0uoVDKPVFZG5j_FD-yxIljU3k/view?usp=sharing",
                size: "full",
                aspectRatio: "20:13",
                aspectMode: "cover"
              },
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  { type: "text", text: "プラン3", weight: "bold", size: "xl" },
                  { type: "text", text: "プラン3の説明です", wrap: true }
                ]
              }
            },
            {
              type: "bubble",
              hero: {
                type: "image",
                url: "https://drive.google.com/file/d/1uci5o5J0uoVDKPVFZG5j_FD-yxIljU3k/view?usp=sharing",
                size: "full",
                aspectRatio: "20:13",
                aspectMode: "cover"
              },
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  { type: "text", text: "プラン4", weight: "bold", size: "xl" },
                  { type: "text", text: "プラン4の説明です", wrap: true }
                ]
              }
            },
            {
              type: "bubble",
              hero: {
                type: "image",
                url: "https://drive.google.com/file/d/1uci5o5J0uoVDKPVFZG5j_FD-yxIljU3k/view?usp=sharing",
                size: "full",
                aspectRatio: "20:13",
                aspectMode: "cover"
              },
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  { type: "text", text: "プラン5", weight: "bold", size: "xl" },
                  { type: "text", text: "プラン5の説明です", wrap: true }
                ]
              }
            }
          ]
        }
      }
    ]
  };

  await axios.post(
    "https://api.line.me/v2/bot/message/reply",
    message,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${CHANNEL_ACCESS_TOKEN}`
      }
    }
  );
}


app.listen(3000, () => console.log('Server running on port 3000'));
