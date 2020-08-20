'use strict';

// the config file contains the following information:
// "callbackKey" - the secret callback key for verification
// "app.protocol", "app.host", "app.port" - configuration parameters for the http server
global.config = require('./config.json');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// callback endpoint
app.post('/callback',
  async (req, res) => {
    // proper Authoriization header value
    const key = `Api-Key ${global.config.callbackKey}`;

    // verify the Authoriization header value
    if (req.headers && req.headers.authorization) {
      if (key !== req.headers.authorization) {
        res.status(401).json({ error: 'Wrong callback key' });
        return;
      }
    } else {
      res.status(401).json({ error: 'No callback key' });
      return;
    }

    // get the annotation data
    const data = req.body;

    console.log(`Package ${data.id} annotation for ${data.pictures.length} picture(s) has been received`);

    // save the annotation data
    console.log(data);

    res.status(200).json({});
  });

// start the http server
app.listen
  (
    global.config.app.port,
    global.config.app.host,
    () =>
      console.info(`tagias callback sample server is working on port ${global.config.app.port}!`),
  );
