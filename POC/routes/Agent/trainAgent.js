
const express = require('express');
const router = express.Router();
const dialogflow = require('dialogflow').v2beta1;

const googleapi = require('googleapis');
const credentials = require('/home/arpan/Dialog/Cred.js');
async function runSample(req,res) {
    
const agentClient = new dialogflow.AgentsClient(credentials);
const projectPath = agentClient.projectPath(projectId);
const agent = {   
    displayName: 'arpan',
    languageCode : 'en-US',   
};
const trainAgentRequest = {
    parent: projectPath,
    agent : agent
    };
    
const responses = await agentClient.trainAgent(trainAgentRequest);
console.log(responses);

const responsetouser = responses;
  let respData = {
    data: responsetouser
  };
  res.send(respData);
}

module.exports = {
 runSample : runSample 
 }
