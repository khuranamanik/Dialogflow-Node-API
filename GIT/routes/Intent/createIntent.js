// const express = require('express');
// const router = express.Router();
// const app = express();
// const bodyParser = require('body-parser');
// const cors = require('cors');
//const path = require('path');
//router.use(bodyParser());
const credentials = require ('Your credential file');
const express = require('express');
const router = express.Router();  
const bodyParser = require('body-parser')
const {Intent} = require('../../APIDB/sequelize');

// /home/arpan/APIDialogflow/POC/APIDB/sequelize.js
//const routes = require('/home/arpan/Dialog/dserver/controller.js')
async function createIntent(req,res)
{
  // [START dialogflow_create_intent]
  // Imports the Dialogflow library
  const dialogflow = require('dialogflow');
  text = req.body.displayName;
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

  const createIntentRequest = {
    parent: agentPath,
    intent: intent
  };

  // Create the intent
  const responses = await intentsClient.createIntent(createIntentRequest);
  console.log(`Intent ${responses[0].name} created`);
  
  const response = responses[0].name;
  const seperate = response.split ('/');
  const newOject={"IntentId": seperate[4],"ProjectId":seperate[1],"displayName":req.body.displayName};
  console.log(newOject);
    Intent.create(newOject)
        .then(Intent => "")

const responsetouser = responses[0].name;
let respData = {
    data: responsetouser
  };
  res.send(respData);
}
   
module.exports={
  createIntent : createIntent
}
