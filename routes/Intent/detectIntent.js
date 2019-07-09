const express = require('express')
const router  = express.Router()
const cors = require('cors')
const credentials = require ('Enter Credentials file path');

//runSample is the function to detect intent
async function runSample (req,res) {
const dialogflow = require('dialogflow');
const uuid = require('uuid');
let text = req.body.text; //process.argv.slice(2);

// A unique identifier for the given session
const sessionId = uuid.v4();
// Create a new session
const sessionClient = new dialogflow.SessionsClient(credentials);
const sessionPath = sessionClient.sessionPath(projectId, sessionId);
// The text query request.
const request = {
  session: sessionPath,
  queryInput: {
    text: {
      // The query to send to the dialogflow agent
      text: `${text}`,
      // The language used by the client (en-US)
      languageCode: 'en-US',
    },
  },
};
// Send request and log result
const responses = await sessionClient.detectIntent(request);
console.log('Detected intent');
const result = responses[0].queryResult;
console.log(`  Query: ${result.queryText}`);
console.log(`  Response: ${result.fulfillmentText}`);
if (result.intent) {
  console.log(`  Intent: ${result.intent.displayName}`);
} else {
  console.log(`  No intent matched.`);
}
const responsetouser = result.fulfillmentText;
//  return responsetouser;
let respData = {
data: responsetouser
};
res.send(respData);
}

module.exports = {
runSample : runSample
}
