
const express = require('express')
const router  = express.Router()
const cors = require('cors')
const credentials = require ('/home/arpan/Dialog/dserver/Cred.js');

//runSample is the function to detect intent
async function runSample(req,res) {
const dialogflow = require('dialogflow');
const uuid = require('uuid');
entityTypeId = "vdksdsskb";
entityValue = "FirsttEntity";
synonyms = ["first", "second", "third"];
 

// A unique identifier for the given session
const sessionId = uuid.v4();

//include the above in all apis

//const dialogflow = require('dialogflow');

  // Instantiates clients
  const entityTypesClient = new dialogflow.EntityTypesClient(credentials);

  // The path to the agent the created entity belongs to.
  const agentPath = entityTypesClient.entityTypePath(projectId, entityTypeId);

  const entity = {
    value: entityValue,
    synonyms: synonyms,
  };

  const createEntitiesRequest = {
    parent: agentPath,
    entities: [entity],
  };

  const [response] = await entityTypesClient.batchCreateEntities(
    createEntitiesRequest
  );// Create a new session
  console.log('Created entity type:');
  console.log(response);
  // [END dialogflow_create_entity]
}

module.exports = {
    runSample: runSample
    };
