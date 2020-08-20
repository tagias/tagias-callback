'use strict';

const axios = require('axios');

// the config file contains the following information:
// "callbackKey" - the secret callback key for verification
// "app.protocol", "app.host", "app.port" - configuration parameters to build the callback endpoint url
global.config = require('./config.json');

/**
 * Function that posts test data to the callback endpoint
 */
async function test() {
  try {
    // callback endpoint is constructed using the config file properties
    const url = `${global.config.app.protocol}://${global.config.app.host}:${global.config.app.port}/callback`;

    // secret callback key for verification
    const callbackKey = global.config.callbackKey;

    // sample annotation data
    const data =
    {
      "id": "d762b7c0-c0eb-11ea-81e2-9fb69e6d7645",
      "finished": "2020-07-16T05:17:56.359Z",
      "baseurl": "https://p.tagias.com/samples/",
      "pictures": [
        {
          "name": "dog.8001.jpg",
          "result": [
            {
              "type": "BoundingBoxes",
              "id": "38cd1a96-437b-4647-8157-5a522ae904cf",
              "x": 19,
              "y": 3,
              "width": 431,
              "height": 409
            }
          ]
        },
        {
          "name": "dog.8002.jpg",
          "result": [
            {
              "type": "BoundingBoxes",
              "id": "c991069e-12fa-4d7f-bcd2-044465179dba",
              "x": 20,
              "y": 0,
              "width": 349,
              "height": 374
            }
          ]
        },
        {
          "name": "dog.8003.jpg",
          "result": [
            {
              "type": "BoundingBoxes",
              "id": "45e8e8b2-8321-43d3-84a5-fbb00b0067f1",
              "x": 11,
              "y": 12,
              "width": 453,
              "height": 482
            }
          ]
        }
      ]
    };

    // axios instance
    const instance = axios.create({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Api-Key ${callbackKey}`
      }
    });

    // send test data to the callback endpoint
    const result = await instance.post(url, data);

    console.log(`Success, response code: ${result.status}`);
  } catch (e) {
    if (e.response) {
      console.log(`Status: ${e.response.status}, Data: ${JSON.stringify(e.response.data)}, ${e}`);
    } else {
      console.log(e);
    }
  }
}

(async () => await test())();
