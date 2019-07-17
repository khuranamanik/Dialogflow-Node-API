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
const {Admin} = require('./APIDB/sequelize')
const intentCreate = require('./routes/createIntent.js')
const intentDelete = require('./routes/deleteIntent.js')
const entityTypeCreate = require('./routes/createEntityType.js')
const entityCreate = require('./routes/createEntity.js')
const intentDetect= require('./routes/detectIntent.js')
const intentList= require('./routes/listIntent.js')
const createKB= require('./routes/createKB.js')
const deleteKB= require('./routes/deleteKB.js')
const getKB= require('./routes/getKB.js')
const getAgent= require('./routes/getAgent.js')
const trainAgent= require('./routes/trainAgent.js')
router.use(bodyParser());


const getUser = async obj => {
  return await Admin.findOne({
    where: obj,
  });
};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow';

// lets create our strategy for web token
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
      let payload = { id: user.id };
      let token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({ msg: 'ok', token: token ,user:user});
    } else {
      res.status(401).json({ message: 'Password is incorrect'});
    }
  }
});

// protected route
router.get('/protected', passport.authenticate('jwt', { session: false }), function(req, res) {
  res.json('Success! You can now see this without a token.');
});

router.post('/api/create',(req,res)=>{
  Admin.create(req.body)
  .then(result=>res.json(result));

})

var corsOptionsDelegate = function (req, callback) {
  var corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  callback(null, corsOptions); // callback expects two parameters: error and options
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

router.options('*', cors(corsOptionsDelegate))
router.post('/createIntent', cors(corsOptionsDelegate), ensureToken, intentCreate.createIntent); //Write like this one to add functionalities
router.post('/deleteIntent', cors(corsOptionsDelegate), ensureToken, intentDelete.deleteIntent);
router.post('/createEntityType', cors(corsOptionsDelegate), ensureToken, entityTypeCreate.runSample);
router.post('/createEntity', cors(corsOptionsDelegate), ensureToken, entityCreate.runSample);
router.post('/detectIntent', cors(corsOptionsDelegate), ensureToken, intentDetect.runSample);
router.post('/listIntent', cors(corsOptionsDelegate), ensureToken,intentList.listIntents);
router.post('/createKB', cors(corsOptionsDelegate), ensureToken,createKB.createKnowledgeBase);
router.post('/deleteKB', cors(corsOptionsDelegate), ensureToken,deleteKB.deleteKnowledgeBase);
router.post('/getKB', cors(corsOptionsDelegate), ensureToken,getKB.getKnowledgeBase);
router.post('/getAgent', cors(corsOptionsDelegate), ensureToken,getAgent.runSample);
router.post('/trainagent',cors(corsOptionsDelegate), ensureToken,trainAgent.runSample);
router.use(function(req,res,next)
{
res.header("Access-Control-Allow-Origin","*");
res.header("Access-Control-Allow-Headers", "Origin,X-requested-With,Content-Type,Authorization,Accept");
next();
})


const port = 3001
app.use(router)
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})