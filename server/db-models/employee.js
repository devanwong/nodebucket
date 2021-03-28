/*
============================================
; Title: employee.js
; Author: Devan Wong
; Date: 17 March 2021
; Description: employee js page
;===========================================
*/
// imports moongoose library 
const mongoose = require('mongoose');
// import item
const Item = require('./item');
// This is a schema which allows us to define fields, templates for documents in collection
let employeeSchema = mongoose.Schema({
    // has to be a unique ID
    empId: { type: String, unique: true },
    // an array of item from importing item.js
    todo: [ Item ],
    done: [ Item ]
    // passing in the collection we created 
}, { collection: "employees"});

// This is accessing and exporting 
module.exports = mongoose.model("Employee", employeeSchema);