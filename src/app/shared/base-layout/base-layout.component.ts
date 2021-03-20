/*
============================================
; Title: base-layout.component.ts
; Author: Devan Wong
; Date: 18 March 2021
; Description: baselayout components page
;===========================================
*/
// this was grabbed from https://github.com/buwebdev/web-450/tree/master/starter-projects/nodebucket
import { Component, OnInit } from '@angular/core';
// Importing cookie service
import { CookieService } from 'ngx-cookie-service';
// Importing the router
import { Router } from '@angular/router';
@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})

export class BaseLayoutComponent implements OnInit {
  // this is to show the current date.
  year: number = Date.now();
  
  constructor(private cookieService: CookieService, private router: Router) {}

  ngOnInit(): void {
  }
  // this is to sign out from login
  signOut() {
    //  calling the cookie service to delete all entries inside of the cooke inside the browser. -- call the delete all function with the cookie service .
    this.cookieService.deleteAll();
    // navigate to the signin page.
    this.router.navigate(['/session/login']);
   }

}
