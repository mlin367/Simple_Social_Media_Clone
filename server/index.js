const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');
const redisClient = redis.createClient();

const app = express();

redisClient.on('error', err => console.error('Redis error: ', err));

app.use(session({
  secret: 'shhhhhcatz',
  name: 'social_media_clone',
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({
    client: redisClient
  })
}))

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.use(express.static(path.join(__dirname, '/../client/dist/')));

app.post('/Login', (req, res) => {
  res.status(201).send('/home.html');
})

app.listen(2400, () => console.log('app is listening on port 2400'));