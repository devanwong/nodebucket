
/*
============================================
; Title: task.service.ts
; Author: Devan Wong
; Date: 31 March 2021
; Description: task.service.ts
;===========================================
*/

// This was auto generated. 
import { Injectable } from '@angular/core';
// Imports
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './item.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // Declaring http.
  constructor(private http: HttpClient) {  }

  // findAllTasks service.
  /**
   * @param empId string for the employee
   * @returns an Observable of type any
   */
  findAllTasks(empId: string): Observable<any> {
    return this.http.get(`/api/employees/${empId}/tasks`)
  }

  // createTask service.
  /**
   * @param empId string for the employee
   * @param task string for task
   * @returns an Observable of type any
   */
  createTask(empId: string, task: string): Observable<any> {
    return this.http.post(`/api/employees/${empId}/tasks`, {
      text: task
    })
  }

  // updateTask service.
  /**
   * @param empId string for the employee
   * @param todo array of Item for the todo
   * @param done array of Item for the done
   * @returns an Observable of type any
   */
  updateTask(empId: string, todo: Item[], done: Item[]): Observable<any> {
    return this.http.put(`/api/employees/${empId}/tasks`, {
      todo,
      done
    })
  }

  // deleteTask service.
  /**
   * @param empId string for the employee
   * @param taskId string for the taskId
   * @returns an Observable of type any
   */
  deleteTask(empId: string, taskId: string): Observable<any> {
    return this.http.delete(`/api/employees/${empId}/tasks/${taskId}`)
  }


}
