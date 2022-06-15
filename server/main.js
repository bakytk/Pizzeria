
require('dotenv').config()

const port = process.env.PORT; 
var express = require('express');
var app = express();

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

//const helmet = require('helmet');
//app.use(helmet());
//app.use(helmet.frameguard({ action: 'deny' }))

const cors = require('cors');
const bodyParser= require('body-parser');
const jsonParser = bodyParser.json();
//const urlParser = bodyParser.urlencoded({ extended: true })

const redis = require("redis"), client = redis.createClient();
client.on('connect', () => console.log('db is up') );
const Bluebird = require('bluebird');
Bluebird.promisifyAll (redis);

//const config = require('./config');
const MongoClient = require("mongodb");
//app.set('secretKey', config.secret);

//const base64 = require('base64url');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const multer = require('multer');
const fs = require('fs');
const formData = require('form-data');
const axios = require('axios').default;

app.set('trust proxy', 1); //true
app.use(express.static('dist'));
app.use(cors())

var session = require('./sub/session')(app, client);
var home = require('./sub/home')(app, client, jsonParser);
var cart = require('./sub/cart')(app, client, MongoClient, jsonParser); 
var filter = require('./sub/filter')(app, jsonParser, jwt);
var login = require('./sub/login')(app, MongoClient, jsonParser, jwt, nodemailer); 
var dash = require('./sub/dash')(app, MongoClient, jsonParser); 
var edit = require('./sub/edit')(app, client, jsonParser, multer, fs, formData, axios); 
 
// ------------------- RUN ------------------------------
// ======================================================

app.listen(port,function(){
  console.log("Starting app ...");
});

