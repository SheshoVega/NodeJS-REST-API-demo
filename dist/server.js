'use strict';

var _http = require('http');

var http = _interopRequireWildcard(_http);

var _url = require('url');

var url = _interopRequireWildcard(_url);

var _bodyParser = require('body-parser');

var bodyParser = _interopRequireWildcard(_bodyParser);

var _projectData = require('./control/project.data.service');

var DataService = _interopRequireWildcard(_projectData);

var _project = require('./models/project');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');


var app = express();

//CORS Setup
var whiteList = []; //add domains
var corsOptions = {
    origin: function origin(_origin, callback) {
        if (_origin === undefined || whiteList.indexOf(_origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }

    // // configure app to use bodyParser()
    // // this will let us get the data from a POST
    // // app.use(bodyParser.urlencoded({ extended: true }));
};app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/NodeJS-REST-API-demo', { useMongoClient: true });
var db = mongoose.connection;

app.get('/projects', cors(corsOptions), function (request, response) {
    var get_params = url.parse(request.url, true).query;
    if (Object.keys(get_params).length === 0) {
        response.setHeader('content-type', 'application/json');
        DataService.getProjects(function (err, projects) {
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
        DataService.queryByArgs(get_params, function (err, projects) {
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

app.get('/projects/:id', cors(corsOptions), function (request, response) {
    response.setHeader('content-type', 'application/json');
    DataService.getProject(request.params.id, function (err, project) {
        if (err) {
            console.log(err);
            if (err instanceof mongoose.Error.CastError) {
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

app.put('/projects/', cors(corsOptions), function (request, response) {
    response.setHeader('content-type', 'application/json');
    DataService.createProject(request.body, function (err, projectId) {
        if (err) {
            console.log(err);
            if (err instanceof mongoose.Error.ValidationError) {
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

app.delete('/projects/:id', cors(corsOptions), function (request, response) {
    response.setHeader('content-type', 'application/json');
    DataService.deleteProject(request.params.id, function (err, result) {
        if (err) {
            console.log(err);
            if (err instanceof mongoose.Error.CastError) {
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

app.post('/projects', cors(corsOptions), function (request, response) {
    response.setHeader('content-type', 'application/json');
    if (!request.body.hasOwnProperty('_id')) {
        response.writeHead(400, { 'Content-Type': 'text/plain' });
        response.end('Bad request');
    } else {
        DataService.updateProject(request.body, function (err, result) {
            if (err) {
                console.log(err);
                if (err instanceof mongoose.Error.ValidationError) {
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
//# sourceMappingURL=server.js.map