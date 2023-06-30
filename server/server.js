const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 3001;
const { connectDB, client } = require('./utils/db');
const openai = require('./utils/openai');

// middleware
app.use(cors());

app.get('/', async (req, res) => {
  try {
    const db = await connectDB('scroller');
    const chatCompletion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Give me an interesting fact.' }],
    });
    const interestingFact = chatCompletion.data.choices[0].message.content;
    db.collection('facts').insertOne({
      fact: chatCompletion.data.choices[0].message.content,
    });
    res.send(interestingFact);
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}.`));
