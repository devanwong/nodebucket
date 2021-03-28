/*
============================================
; Title: app.js
; Author: Devan Wong
; Date: 18 March 2021
; Description: app js page
;===========================================
*/

/**
 * Require statements
 */
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');                        
const path = require('path');
const mongoose = require('mongoose');

// Imported the API
const EmployeeAPI = require('./routes/employee-route');
/**
 * App configurations
 */
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));

/**
 * Variables
 */


// TODO: This line will need to be replaced with your actual database connection string
const conn = 'mongodb+srv://nodebucket_user:admin@buwebdev-cluster-1.w20ui.mongodb.net/nodebucket?retryWrites=true&w=majority';

/**
 * Database connection
 */
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => {
  console.debug(`Connection to the database instance was successful`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`)
}); // end mongoose connection

/**
 * API(s) go here...
 * prefixed API 
 */
app.use('/api/employees', EmployeeAPI);
/**
 * Create and start server
 */
const port = process.env.PORT || 3000; // server port
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function
