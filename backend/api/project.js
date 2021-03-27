const express = require("express");
const router = express.Router();
const ProjectModel = require("../db/models/projects");

router
  .route("/")
  .all(function (req, res, next) {
    next();
  })
  .get(function (req, res) {
    let { projectId } = req.query;
    if(projectId && projectId!==""){

    }
    else{
        ProjectModel.getProjects()
        .then((result)=>{res.status(200).json({result});})
        .catch((error)=>{res.status(500).json({ message: "Internal Server Error" });})
    }
  })
  .post(function(req,res){
    let {project}= req.body;
    if(project){
      ProjectModel.setProject(project)
        .then((result)=>{res.status(200).json({});})
        .catch((error)=>{res.status(500).json({ message: "Internal Server Error" });})
    }
    else{res.status(400).json({ message: "Bad Request" });}
  })

module.exports = router;