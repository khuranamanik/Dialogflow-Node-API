const express = require('express');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const passport = require('passport');
const passportJWT = require('passport-jwt');
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
const {Agent} = require('./APIDB/sequelize.js')
const {Admin} = require('./APIDB/sequelize.js')
const Intents = require('./APIDB/sequelize.js')
const intentCreate = require('./routes/Intent/createIntent.js')
const intentDelete = require('./routes/Intent/deleteIntent.js')
const entityTypeCreate = require('./routes/Entity/createEntityType.js')
const entityCreate = require('./routes/Entity/createEntity.js')
const intentDetect= require('./routes/Intent/detectIntent.js')
const intentTextDetect= require('./routes/Intent/detectTextIntent.js')
const intentList= require('./routes/Intent/listIntent.js')
const createKB= require('./routes/KnowledgeBase/createKB.js')
const deleteKB= require('./routes/KnowledgeBase/deleteKB.js')
const getKB= require('./routes/KnowledgeBase/getKB.js')
const getAgent= require('./routes/Agent/getAgent.js')
const trainAgent= require('./routes/Agent/trainAgent.js')
const jwt_Decode = require('jwt-decode');
var mytoken = {}
router.use(bodyParser());
router.use(function(req,res,next)
{
res.header("Access-Control-Allow-Origin","*");
res.header("Access-Control-Allow-Headers", "*");
res.header("Access-Control-Expose-Headers", "token");
next();
})
var corsOptionsDelegate = function (req, callback) {
  var corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  callback(null, corsOptions); // callback expects two parameters: error and options
}

const getUser = async obj => {
  const agent= await Agent.findOne({
    where: obj
  });
  if(agent){
    return agent;
  }else{
    return await Admin.findOne({
      where: obj
    });
  }
};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'my secret token';

//lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
console.log('payload received', jwt_payload);
let user = getUser({ id: jwt_payload.id });
if (user) {
  console.log('my userrr data with payload is',user);
  next(null, user);
} else {
  next(null, false);
}
});
// use the strategy
passport.use(strategy);
app.use(passport.initialize());

router.post('/login', async function(req, res, next) {
  const { email, password } = req.body;
  if (email && password) {
    let user = await getUser({ email: email });
    console.log('my user is',user);
    if (!user) {
      res.status(401).json({ message: 'No such user found' });
    }
    if (user.password === password) {
      // from now on we'll identify the user by the id and the id is the 
      // only personalized value that goes into our token
      let payload = { id: user.id , project_id: user.projectId};
      let token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({ msg: 'ok', token: token ,user:user});
    } else {
      res.status(401).json({ message: 'Password is incorrect'});
    }
  }
});


function verifyToken(req, res, next) {
  console.log("req=>" + req.headers["token"]);
  mytoken = req.headers["token"];
  const bearerHeader = req.headers["token"];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(req.token, 'my secret token', function(err, data) {
      if (err) {
        res.sendStatus(403);
      } else {
      next();
      }  
  })
    }
  
  else {
    res.sendStatus(400);
  }
}

function auth(req, res, next) {
  const user = { id: 73673930709 };

      const token = jwt.sign({ user: user.id }, 'my secret key');{
      // if (typeof token !== 'undefined') {
        res.header("token",token);
        next();  
      }
  }
  function ensureToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      jwt.verify(req.token, 'my secret key', function(err, data) {
        if (err) {
          res.sendStatus(403);
        } else {
        next();
        }  
    }) 
      }
    
    else {
      res.sendStatus(400);
    }
  }


// function to extract client_email and private_key from database.
  function property(req, res, next) {
    const decoded = jwt_Decode(mytoken);
    console.log("function property contains===========>",decoded);
    const projectId = decoded.project_id;
    
    Agent.findAll ({
      where : {
        
        projectId : projectId
      },
    raw : true
    }).then(async function(results, err) {
      console.log("My results are",results);

      var config = {
                private_key: results[0].private_key,
                client_email: results[0].client_email
      }
        if(err){
          res.sendStatus(403);
        }else{
          next();
        }
      
      });
  }
      



 
// protected route
router.get('/protected', passport.authenticate('jwt', { session: false }), function(req, res) {
  res.json('Success! You can now see this without a token.');
});

router.post('/api/Agentcreate',(req,res)=>{
  Agent.create(req.body)
  .then(result=>res.json(result));

})

router.post('/api/create',(req,res)=>{
  Admin.create(req.body)
  .then(result=>res.json(result));

})

function Create(req, res, next) {
  Intents.create(req.body)
  .then(result=>res.json(result));

}

router.options('*', cors(corsOptionsDelegate))
router.post('/createIntent', cors(corsOptionsDelegate), verifyToken, property, intentCreate.createIntent); //Write like this one to add functionalities
router.post('/deleteIntent', cors(corsOptionsDelegate), verifyToken, intentDelete.deleteIntent);
router.post('/createEntityType', cors(corsOptionsDelegate),verifyToken, entityTypeCreate.runSample);
router.post('/createEntity', cors(corsOptionsDelegate), verifyToken, entityCreate.runSample);
router.get('/detectIntent', cors(corsOptionsDelegate), ensureToken,intentDetect.runSample);
router.get('/detectTextIntent', cors(corsOptionsDelegate), intentTextDetect.detectTextIntent);
router.get('/listIntent', cors(corsOptionsDelegate), verifyToken, intentList.listIntents);
router.post('/createKB', cors(corsOptionsDelegate), verifyToken, createKB.createKnowledgeBase);
router.post('/deleteKB', cors(corsOptionsDelegate), verifyToken, deleteKB.deleteKnowledgeBase);
router.get('/getKB', cors(corsOptionsDelegate), verifyToken, getKB.getKnowledgeBase);
router.get('/getAgent', cors(corsOptionsDelegate), verifyToken, getAgent.runSample);
router.post('/trainagent',cors(corsOptionsDelegate), verifyToken, trainAgent.runSample);
router.post('/firstmessage',cors(corsOptionsDelegate), auth, function(req,res) {
  const response = JSON.stringify({message:"Hello"});
  res.send(response);
})
//pr

const port = 3000
app.use(router)
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})
