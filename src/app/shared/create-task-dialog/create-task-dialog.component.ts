/*
============================================
; Title: create-task-dialog.service.ts
; Author: Devan Wong
; Date: 1 April 2021
; Description: create-task-dialog.ts
;===========================================
*/
// This was auto generated. 
import { Component, OnInit } from '@angular/core';
// For the constructor
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css']
})
export class CreateTaskDialogComponent implements OnInit {
  // Create a new form 
  taskForm: FormGroup;
  // Imported for the createTask component 
  constructor(private dialogRef: MatDialogRef<CreateTaskDialogComponent>, private fb: FormBuilder) { }

  ngOnInit(): void {
    // Creating the new form with validators 
    this.taskForm = this.fb.group({
      text: [null, Validators.compose([Validators.required])]
    })
  }
  // CreateTask function
    // Pass the form 
  createTask() {
    // When submit, dialog is closed and the data is on the form value is on the home.component.html 
    this.dialogRef.close(this.taskForm.value);
  }
  // Cancel button 
  cancel(){
    this.dialogRef.close();
  }
}
