/*
============================================
; Title: app-routing.module.ts
; Author: Devan Wong
; Date: 18 March 2021
; Description: Routing page
;===========================================
*/
// this was grabbed from https://github.com/buwebdev/web-450/tree/master/starter-projects/nodebucket
import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

// this is the routes to connect to the different pages. 
const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'session',
    component: AuthLayoutComponent,
    children: [
      {
        path:'login',
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
