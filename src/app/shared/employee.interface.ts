
/*
============================================
; Title: employee.interface.ts
; Author: Devan Wong
; Date: 31 March 2021
; Description: task.service.ts
;===========================================
*/


import { Item } from "./item.interface";

export interface Employee {
    empId: string;
    todo: Item[];
    done: Item[];
}