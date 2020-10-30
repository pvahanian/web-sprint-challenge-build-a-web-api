const express = require('express');

const Project = require('./projectModel')
const mappers = require('./mappers')

const router = express.Router();

router.put('/:id', validateProjectId,validateProject, (req, res) => {
    Project.update(req.params.id, req.body)
    .then(response => {
        console.log("this is my response", response)
        res.status(200).json({message:'The Project has been updated'}
    )})
}); 

router.get('/:id', validateProjectId, (req, res) => {
        res.status(200).json(res.post)
  });      

router.get('/', (req, res) => {
        res.status(200).json(res.post)
  });      
  
router.delete('/:id', validateProjectId, (req, res) => {
    Project.remove(req.params.id)
    .then(response => {res.status(200).json({message:'The post has been deleted'})})
});    

// middleware babies

function validateProject(req, res, next) {
    console.log(req.body.project_id)
    if(Object.keys(req.body).includes("description") && req.body.description)
    {
        if(Object.keys(req.body).includes("project_id") && req.body.project_id==1)
        {
        next()
        }
        else{
            res.status(404).json({
                message:"Error getting Project Project ID, must equal 1"
            }) 
        }
    }
    else
    {
        res.status(404).json({
            message:"Error getting Project Description, need description and text"
        }) 
    }
}
function validateProjectId(req, res, next) {
    const { id } = req.params
    Project.get(id)
    .then(post =>{
        console.log("this is going through validator",post)
        if(post){
            res.post = post
            next()
        }
        else
        {
        res.status(404).json({
        message:"Error loading Project, cant find that id"
        })
        }
    })
}

module.exports = router;