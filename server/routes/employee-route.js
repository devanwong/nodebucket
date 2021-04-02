/*
============================================
; Title: employee-routes.js
; Author: Devan Wong
; Date: 17 March 2021
; Description: employee-routes js page
;===========================================
*/
const express = require('express');
const Employee = require("../db-models/employee");
const BaseResponse = require('../service/base-response');
// const Item = require('../db-models/item');
const router = express.Router();
// const { $ } = require('protractor');
/** 
API: findEmployeeId
@param empId
@returns Employee Document (MongoDb) or null
*/

//FindEmployeeById API-test passed
router.get('/:empId', async(req, res) => {
    // error handling 
    // when we do not have a catch error
    try {
        // stored in the params -- 1007-1012
        // Callback of the response for and error assiocate with the cluster errors, any collection goes into the second arguement  
        Employee.findOne({'empId':req.params.empId}, function(err, employee){
            // database level error message 
            if(err){
                console.log(err); //log file or database, to tracking any process or errors and what message was received 
                const mongoDBErrorResponse = new BaseResponse('500', `MongoDB native Error: ${err}`, null) //base response message  
                res.json(mongoDBErrorResponse.toObject());
            }
            // this is a success response. 
            else {
                console.log(employee);
                const employeeResponse = new BaseResponse('200', 'Successful query', employee);
                res.json(employeeResponse.toObject());
            }
        })
    } 
    // if error then it will define this code.
    catch (e) {
        console.log(e);
        const findEmployeeCatchError = new BaseResponse('500', `Internal Server Error: ${e.message}`, null)
        res.json(findEmployeeCatchError.toObject());
    }

})

// API: create task 
// try/catch for edge cases for server errors 
router.post('/:empId/tasks', async(req, res) => { 

    try {
        // Find the user by ID.
        Employee.findOne({'empId': req.params.empId }, function(err, employee){
            // Error response.
            if(err){
                console.log(err)
                // create an object that we can send back to the application 
                const createTaskMongoDbError = new BaseResponse('500', `MongoDB Exceptions: ${err.message}`, null)
                // SEND BACK TO THE API 
                res.status(500).send(createTaskMongoDbError.toObject());
            } else {
                console.log("here")
                console.log(req.params.empId);

                // This checks if the employee exists
                if(employee){
                     // Accessing the todo item 
                // Creating the object item to match the schema 
                const item = {
                    text: req.body.text
                };
                // pushed the item to the todo array 
                employee.todo.push(item);
                // Save item to database
                employee.save(function(err, updatedEmployee) {
                    // Error response
                    if (err) {
                        console.log(err);
                        const createTaskOnSaveMongoDbError = new BaseResponse('500', `MongoDB onSave() exception: ${err.message}`, null);
                        // response 
                        res.status(500).send(createTaskOnSaveMongoDbError.toObject());
                    } else {
                        console.log(updatedEmployee);
                        // if no error then it was successful 
                        const createTaskOnSaveSuccessResponse = new BaseResponse('200', 'Successful Query', updatedEmployee);
                        // response status 
                        res.status(200).send(createTaskOnSaveSuccessResponse.toObject());
                    }
                })
                // If employeeId does not exist 
                } else {
                    console.log('invalid employeeId');
                    const invalidEmployeeIdResponse = new BaseResponse('200', 'Invalid employeeId', null);
                    res.status(200).send(invalidEmployeeIdResponse.toObject()); 
                }
               
            }
        })
    } catch(e) {
        console.log(e);
        const createTaskCatchException = new BaseResponse('500', `Internal Server Error ${e.message}`, null);
        res.status(500).send(createTaskCatchException.toObject());
    }
})

// API: findAllTasks 
router.get('/:empId/tasks', async(req, res) => {
    try {
        Employee.findOne({'empId': req.params.empId}, 'empId todo done', function(err, employee) {
            if(err)
            {
              console.log(err);
              const mongoDBFindAllTasksException = new BaseResponse ('500', `Internal server error ${err.message}`, null);
              res.status(500).send(mongoDBFindAllTasksException.toObject());
            }
            //if errors does not occur
            else {
                console.log(employee);
                const employeeTaskResponse = new BaseResponse('200', 'Query successful', employee);
                res.status(200).send(employeeTaskResponse.toObject());
             }
        })
    }
    catch (e){
        console.log(e);
        const errorCatchResponse = new BaseResponse('500', `Internal server error ${e.message}`, null);
        res.status(500).send(errorCatchResponse.toObject());
    }
})

// API Update task
// Api request 
router.put('/:empId/tasks', async(req, res) => {
    try 
    {
        // Filtering by the empId.
        Employee.findOne({'empId': req.params.empId}, function(err,employee)
    {
        // If error from MongoDB, log it 
        if(err)
        {
            console.log(err);
            // create an update task
            const updateTaskMongodbException = new BaseResponse('500', `Internal server error ${e.message}`, null);
            // return to the client.
            res.status(500).send(updateTaskMongodbException.toObject());
        } 
        // No error check validity 
        else 
        { 
            console.log(employee);
            // If the employee is not empty
            if(employee)
            {
                // This is setting the todo and done to the request body
                employee.set({
                    todo:req.body.todo,
                    done: req.body.done
                });
                //  Save the record to mongoDB 
                employee.save(function(err, updatedEmployee) {
                    // Server-side error
                    if (err) 
                    {
                        console.log(err);
                        // Capture the error  
                        const updateTaskMongDbError = new BaseResponse('200',  `Internal server error ${e.message}`, null);
                        // Return it to the server 
                        res.status(500).send(updateTaskMongDbError.toObject());
                    }
                    // No error
                    else 
                    {
                        // Log it
                        console.log(updatedEmployee);
                        // Create a new response object 
                        const updatedTaskSuccessResponse = new BaseResponse('200', 'Query Successful', updatedEmployee);
                        // Return it to the client
                        res.status(200).send(updatedTaskSuccessResponse.toObject());
                    }
                })
            }
            // If it did not return an employee or NULL
            else 
            {
                // Log the incorrect value that was passed in
                console.log(`Invalid employeeId! The passed-in value was ${req.params.empId}`);
                const invalidEmployeeIdResponse = new BaseResponse('200', 'Invalid employeeId', null);
                // Return it back to the client 
                res.status(200).send(invalidEmployeeIdResponse.toObject());
            }
        }
    })
}
    catch (e)
    {
        console.log(e);
        const updateTaskCatchResponse= new BaseResponse ('500', `Internal Server Error ${e.message}`, null);
        res.status(500).send(updateTaskCatchResponse.toObject());
    }
})

// Api: deleteTask
// API CALL using the delete protocol, filtering by the :empid, and passing in :taskid to look for in our data set 
router.delete('/:empId/tasks/:taskId', async(req, res) => {
    try {
        // Find employee record
        Employee.findOne({'empId': req.params.empId}, function(err, employee) {
            // If there is an error message  
            if(err){
                // Log it to the console.
                console.log(err);
                // Create an error exception
                const deleteTaskMongoDbError = new BaseResponse('500', `Internal Server Error ${e.message}`, null);
                // Send to client
                res.status(500).send(deleteTaskMongoDbError.toObject());
            } 
            // If there is no error.
            else 
            {
                // Log the employee record.
                console.log(employee);
                // Looping over the data to see if taskid exists inside the todo array 
                const todoItem = employee.todo.find(item => item._id.toString() === req.params.taskId);
                // Looping over the data to see if taskid exists inside the done array 
                const doneItem = employee.done.find(item => item._id.toString() === req.params.taskId);
                // if/else statements to see which one is not null
                if (todoItem)
                {
                    // Log it to the console.
                    console.log(todoItem);
                    // If its not empty, remove it from the existing array
                    employee.todo.id(todoItem._id).remove();
                    // Save it to mongoDB.
                    employee.save(function(err, updatedTodoItemEmployee) {
                        if (err) 
                        {
                            console.log(err);
                            const deleteTodoItemMongodbError = new BaseResponse('500', `Internal Error ${e.message}`, null);
                            res.status(500).send(deleteTodoItemMongodbError.toObject());
                        }
                        else 
                        {
                            console.log(updatedTodoItemEmployee);
                            const deleteTodoItemSuccess = new BaseResponse('200', 'Query successful', updatedTodoItemEmployee);
                            res.status(200).send(deleteTodoItemSuccess.toObject());
                        }
                    })
                } 
                // If the todo item was null.
                else if (doneItem) 
                {
                    // Log it to the console.
                    console.log(doneItem);
                    // If its not empty, remove it from the existing array 
                    employee.done.id(doneItem._id).remove();
                    // Save it to mongoDB.
                    employee.save(function(err, updatedDoneItemEmployee) {
                        if(err)
                        {
                            console.log(err)
                                console.log(err);
                                const deleteDoneItemMongodbError = new BaseResponse('500', `Internal Server Error ${e.message}`, null);
                                res.status(500).send(deleteDoneItemMongodbError.toObject());
                        } 
                        else 
                        {
                            console.log(updatedDoneItemEmployee);
                            const deleteDoneItemSuccess =  new BaseResponse('200', 'Query successful', updatedDoneItemEmployee);
                            res.status(200).send(deleteDoneItemSuccess.toObject());
                        }
                    })
                } 
                // If the todo and done items are both empty pass in an invalid message to the server.
                else 
                {
                    //Logs invalid id.
                    console.log(`Invalid taskID! Passed in value ${req.params.taskId}`);
                    const invalidTaskResponse = new BaseResponse('200', 'Invalid taskId', null);
                    res.status(200).send(invalidTaskResponse.toObject());
                }
            }
        })
    }

    catch (e) 
    {
        // Log the error
        console.log(e);
        // Error response object.
        const deleteTaskCatchError = new BaseResponse('500', `Internal Server Error ${e.message}`, null);
        // Return to client. 
        res.status(500).send(deleteTaskCatchError.toObject());
    }
})

module.exports = router;