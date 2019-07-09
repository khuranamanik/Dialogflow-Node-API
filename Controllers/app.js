const express = require('express');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const intentCreate = require('./routes/createIntent.js')
const intentDelete = require('./routes/deleteIntent.js')
const entityTypeCreate = require('./routes/createEntityType.js')
const entityCreate = require('./routes/createEntity.js')
const intentDetect= require('./routes/detectIntent.js')
const intentList= require('./routes/listIntent.js')
router.use(bodyParser());

var corsOptionsDelegate = function (req, callback) {
  var corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  callback(null, corsOptions); // callback expects two parameters: error and options
}
router.options('*', cors(corsOptionsDelegate))
router.post('/createIntent', cors(corsOptionsDelegate), intentCreate.createIntent); //Write like this one to add functionalities
router.post('/deleteIntent', cors(corsOptionsDelegate), intentDelete.deleteIntent); // routeName.functionName
router.post('/createEntityType', cors(corsOptionsDelegate), entityTypeCreate.runSample);
router.post('/createEntity', cors(corsOptionsDelegate), entityCreate.runSample);
router.post('/detectIntent', cors(corsOptionsDelegate), intentDetect.runSample);
router.post('/listIntent', cors(corsOptionsDelegate), intentList.listIntents);
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
