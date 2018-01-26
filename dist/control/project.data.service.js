"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateProject = exports.deleteProject = exports.createProject = exports.queryByArgs = exports.getProject = exports.getProjects = undefined;

var _project = require("../models/project");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getProjects(callback) {
    _project.Project.find({}).sort({ created_at: -1 }).exec(callback);
};

function getProject(id, callback) {
    _project.Project.findOne({ _id: id }, callback);
};

function queryByArgs(params, callback) {

    if (Object.keys(params).length === 1) {
        _project.Project.find(params, callback);
    } else {
        var query = { $or: [] };
        for (var key in params) {
            var obj = _defineProperty({}, key, params[key]);
            query.$or.push(obj);
        }
        _project.Project.find(query, callback);
    }
};

function toProject(body) {
    return {
        _id: body._id,
        title: body.title,
        type: body.type,
        tecnologies: body.tecnologies,
        state: body.state,
        product: body.product
    };
}

function createProject(body, callback) {
    var project = (0, _project.newProject)(body);
    _project.Project.create(project, callback);
}

function deleteProject(id, callback) {
    _project.Project.deleteOne({ _id: id }, callback);
}

function updateProject(body, callback) {
    var project = toProject(body);
    _project.Project.findOneAndUpdate({ _id: project._id }, {
        title: project.title,
        type: project.type,
        tecnologies: project.tecnologies,
        state: project.state,
        product: project.product
    }, { new: true, runValidators: true }, callback);
}

exports.getProjects = getProjects;
exports.getProject = getProject;
exports.queryByArgs = queryByArgs;
exports.createProject = createProject;
exports.deleteProject = deleteProject;
exports.updateProject = updateProject;
//# sourceMappingURL=project.data.service.js.map