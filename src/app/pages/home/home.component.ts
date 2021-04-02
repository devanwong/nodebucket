/*
============================================
; Title: home.component.ts
; Author: Devan Wong
; Date: 31 March 2021
; Description: home component page
;===========================================
*/
// this was auto generated. 
import { Component, OnInit } from '@angular/core';
// Item from variables  
import { Item } from 'src/app/shared/item.interface';
import { Employee } from 'src/app/shared/employee.interface';
// Imported for the constructor. 
import { TaskService } from 'src/app/shared/task.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from 'src/app/shared/create-task-dialog/create-task-dialog.component';
// Import for CDK 
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Creating variables 
  todo: Item[]; //item array
  done: Item[]; //item array 
  employee: Employee; //Object and imported at top
  empId: string; //Holds the data

  // task: Requests to the API
  constructor(private taskService: TaskService, private cookieService: CookieService, private dialog: MatDialog) {
    // Use the cookieservice for the API call.
    this.empId = this.cookieService.get('session_user');
    
    // findAllTasks STARTS
    // API call from task.service.ts --> subscribing to the event taking the response 
    this.taskService.findAllTasks(this.empId).subscribe(res => {
      console.log('--Server response from findAllTasks--');
      console.log(res);

      // Data we are getting back from the API call from BaseResponse from employee-route.js
      // res.data accessing the data response object 
      this.employee = res.data; 
      console.log('-- Employee object --');
      //Response back from the client.
      console.log(this.employee);
      // Use case error handling
    }, err => { 
      // Log error message. 
      console.log(err);
      // Handler for complete.
    }, () => {
      //On complete, populated because res.data was not null. 
      this.todo = this.employee.todo;
      this.done = this.employee.done;
      console.log('--This is in the complete section--');
      console.log(this.todo);
      console.log(this.done);
    })
   }
  //  findAllTasks ENDS

  ngOnInit(): void {
  }

  // CreateTask STARTS 
  // Function for when the user want to create a task 
  openCreateTaskDialog(){
    // Variable used to open up the dialog
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      // When dialog box opens, clicking outside the dialog will not auto close.
      disableClose: true
    })
    // When it closes we will subscribe to an event and the data we get back
    dialogRef.afterClosed().subscribe(data => {
      // Response data from the API BaseResponse 
      if (data)
      {
        this.taskService.createTask(this.empId, data.text).subscribe(res => {
          this.employee = res.data;
          // Error handling 
        }, err => {
          console.log(err);
          // On complete. Updated data 
        }, () => {
          this.todo = this.employee.todo;
          this.done = this.employee.done;
        })
      }
    })  
  }
  // CreateTask ENDS
  // CDK Drop event. This will invoke the drop event in the home.component.html
  drop(event: CdkDragDrop<any>){
    // If the current item is being moved from the current array 
    if(event.previousContainer === event.container){
    //Take the current data, take the previous index, where was it previously and where is it being moved too
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log("Reordered item in an existing column/array");
      // Call updateTaskList function below.
      this.updateTaskList(this.empId, this.todo, this.done);
    } 
    // Else transfer the item. Take the previous container data, and the item that is being moved, the previous position, and moving the current position.
    else 
    {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      console.log("Moved Task item to a different column/array");
      // Call updateTaskList function below.
      this.updateTaskList(this.empId, this.todo, this.done);
    } 
  }
  // end CDK Drop event.

  // **PRIVATE FUNCTIONS** 

  // Delete task function 
  /**
   * @param taskId string for the taskId
   */

  deleteTask(taskId: string): void {
    // Check the validity 
    if(taskId)
    {
      console.log(`--Task item ${taskId} was deleted--`);
      this.taskService.deleteTask(this.empId, taskId).subscribe(res => {
        this.employee = res.data;
        // Error handling
      }, err => {
        console.log(err);
         // On complete 
      }, () => {
        this.todo = this.employee.todo;
        console.log(this.todo);
        this.done = this.employee.done;
        console.log(this.done);
      })
    }
  }
  // End of delete task 

  // Call the update API when the item is dropped 
    /**
   * @param empId string for the employee
   * @param todo array of Item for the todo
   * @param done array of Item for the done
   */
  private updateTaskList(empId: string, todo: Item[], done: Item[]): void {
    // Calling the taskService from task.service.ts
    this.taskService.updateTask(empId, todo, done).subscribe(res => {
      this.employee = res.data;
      // Error handling 
    }, err => {
      console.log(err);
       // On complete 
    }, () => {
      this.todo = this.employee.todo;
      this.done = this.employee.done;
    })
  }
  // End updateTaskList
}