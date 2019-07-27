
// const credentials = require ('../../Cred');
const express = require('express');
const router = express.Router();  
const bodyParser = require('body-parser')
const {Intent} = require('../../APIDB/sequelize');
const {Agent} = require('../../APIDB/sequelize');
const jwt_Decode = require('jwt-decode');
// var config;
async function createIntent(req,res)
{
  // [START dialogflow_create_intent]
  // Imports the Dialogflow library
  const token = req.token;
  const decoded = jwt_Decode(token);
  const projectId = decoded.project_id;


  Agent.findAll ({
    where : {
      
      projectId : decoded.project_id
    },
    raw:true

  }).then(async function(results) {
   
    const config = {
     credentials: {
    private_key: results[0].private_key,
    client_email: results[0].client_email
     }
    }
  const dialogflow = require('dialogflow');
  text = req.body.displayName;
  let displayName;
  // Instantiates the Intent Client
  const intentsClient = new dialogflow.IntentsClient(config);

  // The path to identify the agent that owns the created intent.
  const agentPath = intentsClient.projectAgentPath(decoded.project_id);

  const intent = {
    displayName:`${text}`
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
  const newOject={"intentId": seperate[4],"projectId":seperate[1],"displayName":req.body.displayName};
  // console.log(newOject);
    Intent.create(newOject)
        .then(response => "")

const responsetouser = responses[0].name;
let respData = {
    data: responsetouser
  };
  res.send(respData);
})
}
  
module.exports={
  createIntent : createIntent
}
