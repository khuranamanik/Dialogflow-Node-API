
const express = require('express')
const router  = express.Router()
const cors = require('cors')
const credentials = require ("Complete Path of the file where you have stored the credentials");

//runSample is the function to detect intent

async function runSample(req,res) {
const dialogflow = require('dialogflow');
entityTypeId = "Paste your EntityType ID here after creating an EntityType";
entityValue = "Enter any Entity Value"; //should be unique
synonyms = ["Enter Synonyms here];
 
  // Instantiates clients
  const entityTypesClient = new dialogflow.EntityTypesClient(credentials);

  // The path to the agent the created entity belongs to.
  const agentPath = entityTypesClient.entityTypePath(projectId, entityTypeId);

  const entity = 
   {
    value: entityValue,
    synonyms: synonyms,
   };

  const createEntitiesRequest = 
   {
    parent: agentPath,
    entities: [entity],
   };

  const [response] = await entityTypesClient.batchCreateEntities(createEntitiesRequest);// Create a new session
  console.log('Created entity type:');
  console.log(response);
  // [END dialogflow_create_entity]

  const responsetouser = responses;
  let respData = {
    data: responsetouser
  };
  res.send(respData);
  }

module.exports = {
    runSample: runSample
    };
