import fs from 'fs';
import express from 'express';
import path from 'path';
import Post from './post';

import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// Use native promises
mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://${process.env.MONGO_HOST || 'localhost'}/mikeyockey`);
const db = mongoose.connection;

const app = express();
app.use(bodyParser.json());
app.post('/post', (req, res) => {
  new Post(req.body.post).save((err) => {
    if(err) {
      res.status(500).send({ error: 'Could not save post.' });
    } else {
      res.status(201).send();
    }
  });
});

app.get('/posts', (req, res) => {
  Post.find().sort({ createdAt: -1 }).then((posts) => {
    res.status(200).send(posts);
  });
});

db.on('error', console.error.bind(console, 'Could not connect to MongoDB'));
db.once('open', () => {
  app.listen(process.env.PORT || 3100);
});
