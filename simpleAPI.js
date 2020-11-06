const express = require('express');
const path = require('path');
const app = express();
const fs = require("fs");


const profilesFile = path.join(__dirname ,"models", "profiles.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());



app.get('/api/profiles',  (_, res) => {
    fs.readFile( profilesFile, 'utf8', function (_, data) {
        res.setHeader('Content-Type', 'application/json');
        res.end( data);
    });
 });

 
app.get('/api/profiles/:id',  (req, res) => {
    fs.readFile( profilesFile, 'utf8', function (_, data) {
        res.setHeader('Content-Type', 'application/json');
        let profiles = JSON.parse( data );
        let profile = profiles["profile" + req.params.id];
        if(profile){
            console.log( profile);
            res.end( JSON.stringify(profile));
        }
        else{
            res.status(404).send('Profile Not Found');
        }
    });
 });

app.put('/api/profiles/', (req, res) => {
    console.log(req.body);
    let text = JSON.stringify(req.body); 
    fs.appendFile("file.txt", text, (err, data) => {
        if(err) {return "cannot write " + data; }
    })
    res.send("data received, thank you");
});


// 
 app.listen(5000, function () {
    console.log('Node server is running...http://localhost:5000/api/profiles ...');
});