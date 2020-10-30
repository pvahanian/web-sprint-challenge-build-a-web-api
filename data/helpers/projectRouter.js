const express = require('express');

const Project = require('./projectModel')
const mappers = require('./mappers');

const router = express.Router();
router.get('/', (req, res) => {
    Project.get()
    .then(response =>{
        res.status(200).json(response)
    })
  });     
router.get('/:id', validateProjectId, (req, res) => {
        res.status(200).json(res.project)
  });      

router.put('/:id', validateProjectId,validateProject, (req, res) => {
      Project.update(req.params.id, req.body)
      .then(response => {
          console.log("this is my response", response)
          res.status(200).json({message:'The Project has been updated'}
      )})
  }); 

router.post('/', validateProject, (req, res) => {
    Project.insert(req.body)
    .then(response => {
        res.status(200).json({message:'The Action has been added'}
    )})
});

router.delete('/:id', validateProjectId, (req, res) => {
    Project.remove(req.params.id)
    .then(response => {res.status(200).json({message:'The post has been deleted'})})
});    

// middleware babies

function validateProject(req, res, next) {
    
    if(Object.keys(req.body).includes("description") && req.body.description)
    {
        if(Object.keys(req.body).includes("name") && req.body.name)
        {
        next()
        }
        else{
                res.status(404).json({
                message:"Error getting Project Project Name, give it a value of ZIGGS"
            }) 
        }
    }
    else
    {
        res.status(404).json({
            message:"Error getting Project Description, need a Zoe and Ziggs!"
        }) 
    }
}
function validateProjectId(req, res, next) {
    const { id } = req.params
    Project.get(id)
    .then(post =>{
        console.log("this is going through validator",post)
        if(post){
            res.project = post
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