const credentials = require ("Enter path for Credentials file");
const express = require('express');
const router = express.Router();  
async function createIntent(req,res)
{
  // [START dialogflow_create_intent]
  // Imports the Dialogflow library
  const dialogflow = require('dialogflow');
  text = req.body.text;
  let displayName;
  // Instantiates the Intent Client
  const intentsClient = new dialogflow.IntentsClient(credentials);

  // The path to identify the agent that owns the created intent.
  const agentPath = intentsClient.projectAgentPath(projectId);

  const intent = {
    displayName:`${text}`
      

    //trainingPhrases: trainingPhrases,
    //messages: [message],
  };

  console.log('this issssssss',intent);
  const createIntentRequest = {
    parent: agentPath,
    intent: intent
  };

  // Create the intent
  const responses = await intentsClient.createIntent(createIntentRequest);
  console.log(`Intent ${responses[0].name} created`);
  // [END dialogflow_create_intent]

const responsetouser = responses[0].name;
let respData = {
    data: responsetouser
  };
  res.send(respData);
}
   
module.exports={
  createIntent : createIntent
}
