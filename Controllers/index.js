const express = require('express');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const intentCreate = require('./routes/createIntent.js')
const intentDelete = require('./routes/deleteIntent.js')
const entityTypeCreate = require('./routes/createEntityType.js')
const entityCreate = require('./routes/createEntity.js')
const intentList= require('./routes/listIntent.js')
const createKB= require('./routes/createKB.js')
const deleteKB= require('./routes/deleteKB.js')
const getKB= require('./routes/getKB.js')
const getAgent= require('./routes/getAgent.js')
const trainAgent= require('./routes/trainAgent.js')
router.use(bodyParser());

var corsOptionsDelegate = function (req, callback) {
  var corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  callback(null, corsOptions); // callback expects two parameters: error and options
}
router.options('*', cors(corsOptionsDelegate))
router.post('/createIntent', cors(corsOptionsDelegate), intentCreate.createIntent); //Write like this one to add functionalities
router.post('/deleteIntent', cors(corsOptionsDelegate), intentDelete.deleteIntent);
router.post('/createEntityType', cors(corsOptionsDelegate), entityTypeCreate.runSample);
router.post('/createEntity', cors(corsOptionsDelegate), entityCreate.runSample);
router.post('/listIntent', cors(corsOptionsDelegate), intentList.listIntents);
router.post('/createKB', cors(corsOptionsDelegate), createKB.createKnowledgeBase);
router.post('/deleteKB', cors(corsOptionsDelegate), deleteKB.deleteKnowledgeBase);
router.post('/getKB', cors(corsOptionsDelegate), getKB.getKnowledgeBase);
router.post('/getAgent', cors(corsOptionsDelegate), getAgent.runSample);
router.post('/trainagent',cors(corsOptionsDelegate), trainAgent.runSample);
router.use(function(req,res,next)
{
res.header("Access-Control-Allow-Origin","*");
res.header("Access-Control-Allow-Headers", "Origin,X-requested-With,Content-Type,Authorization,Accept");
})


const port = 3001
app.use(router)
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})
