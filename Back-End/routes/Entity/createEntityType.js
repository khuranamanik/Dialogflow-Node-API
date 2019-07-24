const express = require('express');
const router = express.Router();
const credentials = require ("Complete Path to your credentials file");

async function runSample(projectId='Enter projectID here', displayName='', kind='') {
    // [START dialogflow_create_entity_type]
    // Imports the Dialogflow library
    const dialogflow = require('dialogflow');
    // Instantiates clients
    const entityTypesClient = new dialogflow.EntityTypesClient(credentials);
  
    // The path to the agent the created entity type belongs to.
    const agentPath = entityTypesClient.projectAgentPath(projectId);
  
    const createEntityTypeRequest = {
      parent: agentPath,
      entityType: {
        displayName: displayName,
        kind: kind,
      },
    };
  
    const responses = await entityTypesClient.createEntityType(createEntityTypeRequest);
    console.log(`Created ${responses[0].name} entity type`);
    console.log(responses);
    // [END dialogflow_create_entity_type]
  
    const responsetouser = responses[0].name;
  let respData = {
    data: responsetouser
  };
  res.send(respData);
}

 module.exports = {
 runSample : runSample 
 } 
