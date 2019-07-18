const express = require('express');
const router = express.Router();
const credentials = require ('../Cred.js');
const {Intent} = require('../../APIDB/sequelize');


async function deleteIntent(req,res) {
  // [START dialogflow_delete_intent]
  // Imports the Dialogflow library
  const dialogflow = require('dialogflow');
  // const Op = Sequelize.Op;
  // Intent.findAll()
  Intent.findAll ({
      where : {
        
        displayName : req.body.displayName
      },
      raw:true

    }).then(async function(results) {

    ProjectId = results[0].ProjectId;//('chatbot-perennial-243513'),
    IntentId = results[0].IntentId; //('cb646b60-b94e-484e-b138-4260952bd92c');

// Instantiates clients
const intentsClient = new dialogflow.IntentsClient(credentials);

const intentPath = intentsClient.intentPath(ProjectId, IntentId);

const request = {name: intentPath};

// Send the request for deleting the intent.
const result = await intentsClient.deleteIntent(request);
console.log(`Intent ${intentPath} deleted`);
Intent.destroy({
  where: {
      IntentId : IntentId
  }
})
// [END dialogflow_delete_intent]
const responsetouser = intentPath;
let respData = {
  data: responsetouser
};
res.send(respData);
    })
  

} 

module.exports = {
  deleteIntent : deleteIntent
}

