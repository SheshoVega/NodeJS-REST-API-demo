import { Project, newProject } from "../models/project";

function getProjects(callback) {
    Project.find({}).sort({created_at: -1}).exec(callback);
};

function getProject(id, callback) {
    Project.findOne({ _id: id }, callback);
};

function queryByArgs(params, callback) {

    if (Object.keys(params).length === 1) {
        Project.find(params, callback);
    } else {
        let query = { $or: [] };
        for (const key in params) {
            let obj = { [key]: params[key] };
            query.$or.push(obj);
        }
        Project.find(query, callback);
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
    let project = newProject(body);
    Project.create(project, callback);
}

function deleteProject(id, callback) {
    Project.deleteOne({ _id: id }, callback);
}

function updateProject(body, callback) {
    let project = toProject(body);
    Project.findOneAndUpdate(
        { _id: project._id },
        {
            title: project.title, 
            type: project.type,
            tecnologies: project.tecnologies,
            state: project.state,
            product: project.product
        }, 
        { new: true, runValidators: true }, 
        callback
    );
}

export { getProjects, getProject, queryByArgs, createProject, deleteProject, updateProject };