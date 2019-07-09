const express = require('express');
const router = express.Router();
const credentials = require ('Enter Credentials file path');
async function deleteIntent(req,res) {
  // [START dialogflow_delete_intent]
  // Imports the Dialogflow library
  const dialogflow = require('dialogflow');
  projectId = ('Enter ProjectID'),
  intentId = ('Enter Intent ID');
  
  // Instantiates clients
  const intentsClient = new dialogflow.IntentsClient(credentials);

  const intentPath = intentsClient.intentPath(projectId, intentId);

  const request = {name: intentPath};

  // Send the request for deleting the intent.
  const result = await intentsClient.deleteIntent(request);
  console.log(`Intent ${intentPath} deleted`);
  // [END dialogflow_delete_intent]
const responsetouser = intentPath;
let respData = {
  data: responsetouser
};
res.send(respData);
}

module.exports = {
  deleteIntent : deleteIntent
}






