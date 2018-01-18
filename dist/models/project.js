'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    tecnologies: {
        type: [String],
        required: true
    },
    state: {
        type: String,
        required: true
    },
    product: {
        type: String,
        required: true
    }
}, { versionKey: false });

var Project = mongoose.model('Project', projectSchema);

function newProject(body) {
    return new Project({
        title: body.title,
        type: body.type,
        tecnologies: body.tecnologies,
        state: body.state,
        product: body.product
    });
}

exports.Project = Project;
exports.newProject = newProject;
//# sourceMappingURL=project.js.map