const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
import * as http from 'http';
import * as url from 'url';
import * as bodyParser from 'body-parser';
import * as DataService from "./control/project.data.service";
import { Project } from './models/project';

const app = express();

//CORS Setup
let whiteList = [
    'http://localhost:4200' //angular app
]; //add domains
let corsOptions = {
    origin: function (origin, callback) {
        if (origin === undefined || whiteList.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

// // configure app to use bodyParser()
// // this will let us get the data from a POST
// // app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost/NodeJS-REST-API-demo', { useMongoClient: true });
var db = mongoose.connection;


app.get('/projects', cors(corsOptions), (request, response) => {
    var get_params = url.parse(request.url, true).query;
    if (Object.keys(get_params).length === 0) {
        response.setHeader('content-type', 'application/json');
        DataService.getProjects((err, projects) => {
            if (err) {
                console.log(err);
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.end('Internal server error');
                return;
            } else {
                if (!projects || projects.length === 0) {
                    if (response != null) {
                        response.writeHead(404, { 'Content-Type': 'text/plain' });
                        response.end('Not Found');
                    }
                    return;
                }
                if (response != null) {
                    response.end(JSON.stringify(projects));
                } 
            }
        });
    } else {
        response.setHeader('content-type', 'application/json');
        DataService.queryByArgs(get_params, (err, projects) => {
            if (err) {
                console.log(err);
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.end('Internal server error');
                return;
            } else {
                if (!projects || projects.length === 0) {
                    if (response != null) {
                        response.writeHead(404, { 'Content-Type': 'text/plain' });
                        response.end('Not Found');
                    }
                    return;
                }
                if (response != null) {
                    response.end(JSON.stringify(projects));
                }                
            }
        });
    }
});

app.get('/projects/:id', cors(corsOptions), (request, response) => {
    response.setHeader('content-type', 'application/json');
    DataService.getProject(request.params.id, (err, project) => {
        if (err) {
            console.log(err);
            if(err instanceof mongoose.Error.CastError){
                if (response != null) {
                    response.writeHead(404, { 'Content-Type': 'text/plain' });
                    response.end('Not Found');
                }
                return;
            } else {
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.end('Internal server error');
                return;
            }            
        } else {
            if (!project) {
                if (response != null) {
                    response.writeHead(404, { 'Content-Type': 'text/plain' });
                    response.end('Not Found');
                }
                return;
            }
            if (response != null) {
                response.end(JSON.stringify(project));
            }
        }
    });
});

app.options('/projects/', cors(corsOptions));
app.put('/projects/', cors(corsOptions), (request, response) => {
    response.setHeader('content-type', 'application/json');
    DataService.createProject(request.body, (err, projectId) => {
        if (err) {
            console.log(err);
            if(err instanceof mongoose.Error.ValidationError){
                if (response != null) {
                    response.writeHead(400, { 'Content-Type': 'text/plain' });
                    response.end('Bad request');
                }
                return;
            } else {
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.end('Internal server error');
                return;
            } 
        } else if (projectId) {
            response.writeHead(201);
            response.end(JSON.stringify(projectId));
        }
    });

});

app.options('/projects/:id', cors(corsOptions));
app.delete('/projects/:id', cors(corsOptions), (request, response) => {
    response.setHeader('content-type', 'application/json');
    DataService.deleteProject(request.params.id, (err, result) => {
        if (err) {
            console.log(err);
            if(err instanceof mongoose.Error.CastError){
                if (response != null) {
                    response.writeHead(404, { 'Content-Type': 'text/plain' });
                    response.end('Not Found');
                }
                return;
            } else {
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.end('Internal server error');
                return;
            }
        } else if (result) {
            response.end(JSON.stringify(result));
        }
    });
});

app.post('/projects', cors(corsOptions), (request, response) => {
    response.setHeader('content-type', 'application/json');    
    if (!request.body.hasOwnProperty('_id')) {
        response.writeHead(400, { 'Content-Type': 'text/plain' });
        response.end('Bad request');
    } else {
        DataService.updateProject(request.body, (err, result) => {
            if (err) {
                console.log(err);
                if(err instanceof mongoose.Error.ValidationError){
                    if (response != null) {
                        response.writeHead(400, { 'Content-Type': 'text/plain' });
                        response.end('Bad request');
                    }
                    return;
                } else {
                    response.writeHead(500, { 'Content-Type': 'text/plain' });
                    response.end('Internal server error');
                    return;
                }
            } else if (result) {
                response.end(JSON.stringify(result));
            }
        });
    }
});

http.createServer(app).listen(3000, function () {
    console.log('Server listening on port 3000');
});