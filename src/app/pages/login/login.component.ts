/*
============================================
; Title: login.component.ts
; Author: Devan Wong
; Date: 18 March 2021
; Description: login component page
;===========================================
*/
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private cookieService: CookieService, private http: HttpClient, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      empId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
    })
  }
  login() {
    const empId = this.loginForm.controls['empId'].value;
    console.log(empId);

    this.http.get('/api/employees/' + empId).subscribe(res => {
      // If data is there add to the cookie
      if (res['data'])
      {
        this.cookieService.set('session_user', empId, 1);
        this.router.navigate(['/']);
      }
      // If no data pass message and warning 
      else if (!(res['data']) && (res['httpCode'] === '200'))
      { 
        this.openSnackBar('Invalid employeeId, please try again', 'WARNING');
      }
      // Error.
      else 
      {
        this.openSnackBar(res['message'], 'ERROR');
      }
    })
  }
  //** pass in a message, and pass in a notification type */ 
  openSnackBar(message: string, notificationType: string) : void
  {
    // 
    this.snackBar.open(message, notificationType, {
      duration: 3000,
      verticalPosition: 'top'
    })
  } 
}



