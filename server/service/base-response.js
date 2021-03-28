/*
============================================
; Title:base-response.js
; Author: Devan Wong
; Date: 18 March 2021
; Description: base response page
;===========================================
*/

// creating a class to be exported 
class BaseResponse { 
    constructor(httpCode, message, data, timestamp){
        this.httpCode = httpCode;
        this.message = message;
        this.data = data;
        this.timestamp = timestamp;
    }
    // transforming into an object literal 
    toObject() {
        return {
            'httpCode': this.httpCode,
            'message': this.message,
            'data': this.data,
            'timestamp': new Date().toLocaleDateString('en-US')
        }
    }
}

module.exports = BaseResponse;
