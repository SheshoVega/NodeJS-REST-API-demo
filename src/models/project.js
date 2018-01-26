const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title:{
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
    },
    created_at: { 
        type: Date, 
        default: Date.now() 
    }
}, { versionKey: false });

const Project = mongoose.model('Project', projectSchema);

function newProject(body) {
    return new Project({
        title: body.title,
        type: body.type,
        tecnologies: body.tecnologies,
        state: body.state,
        product: body.product
    });
}

export { Project, newProject };