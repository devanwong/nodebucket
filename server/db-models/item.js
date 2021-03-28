/*
============================================
; Title: item.js
; Author: Devan Wong
; Date: 22 March 2021
; Description: item js page
;===========================================
*/
// How to map to the employee
const mongoose = require('mongoose');
// Create a new item schema, define fields, templates for documents in collections   
const Schema = mongoose.Schema;

//create model and specify which collection in the database to connect it to
let itemSchema = new Schema ({
    text: { type: String }
});

// Accesible throughout the application 
module.exports = itemSchema;