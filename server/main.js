const express = require('express')
const app = express()
let postBody
var request = require('request');
 function updateClient(postData){
            var clientServerOptions = {
                uri: 'http://192.168.0.142',
                body: JSON.stringify(postBody),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            request(clientServerOptions, function (error, response) {
                console.log(error,);
                return;
            });
        }



        postBody = 'aaaaaaaaaaa'
        updateClient()