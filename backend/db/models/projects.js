const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema(
    {
        title: String,
        description: String,
        apiKey: String,
        securityType: Number,
        deviceIds:[String],
        active: { type: Boolean, default: true },
        isDeleted: { type: Boolean, default: false },
    },
    {
        timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" },
    }
)

projectSchema.statics.setProject = function (project) {
    return new Promise((resolve,reject)=>{
        if (project._id && project._id !== "") {
            this.findById(project._id, (err, res) => {
                if (err) reject({ message: "Project Not Found" });
                else {
                    res.set(project);
                    res.save((saveErr, queryRes) => {
                        if (saveErr) { reject({ message: "Project Update Fail" }) }
                        else {resolve(queryRes) }
                    })
                }
            })
        }
        else {
            let newProject = new ProjectModel(project);
            newProject.save((saveErr, queryRes) => {
                if (saveErr) { reject({ message: "Project Save Fail" }) }
                else {resolve(queryRes) }
            });
        }
    })
}

projectSchema.statics.deleteProject=function (_id) {
    if(_id && _id!==""){
        return this.findOneAndUpdate(
            { _id: _id },
            { isDeleted: true },
            { fields: { _id: 1 }, new: true }
          ).lean();
    }
    else{
        Promise.reject({message:"id not found"});
    }
}

projectSchema.statics.getProjects=function(){
    return this.aggregate([
        { $match:{isDeleted:false} },
        {
            $set: {
                "deviceCount":"0",
                "dataCount":"0",
              }
        }
    ])
}

const ProjectModel = mongoose.model("projects", projectSchema);
module.exports = ProjectModel;