require('dotenv').config({ path: '/home/salad/http-lcd/server/process.env'})
const express = require('express')
var LastFmNode = require('lastfm').LastFmNode;

var lfm = new LastFmNode({
  api_key: process.env.LFM_API_KEY,
  secret: process.env.LFM_SECRET,
});
const app = express()
console.log(process.env)

let postBody
var request = require('request');
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
        }
    function updateClient(postData){
            var clientServerOptions = {
                uri: 'http://192.168.89.196',
                body: JSON.stringify(postBody),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            request(clientServerOptions, function (error, response) {
                return;
            });
        }


            function printTrack(username) {
            let trackStream = lfm.stream(username)
            trackStream.on('nowPlaying', function(track) {
                console.log(track)
                let aa = track.artist
                aa = JSON.stringify(aa)
                aa = aa.replace("#", "")
                aa = JSON.parse(aa)
                console.log(aa)
                postBody = aa.text + " - " + track.name
                updateClient()
            })
            trackStream.start(username)
            
            }-
        
            printTrack("salad-6969")