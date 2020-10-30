const express = require('express');

const Action = require('./actionModel')
const mappers = require('./mappers')

const router = express.Router();




router.put('/:id', validateActionId,validateAction, (req, res) => {
    Action.update(req.params.id, req.body)
    .then(response => {
        console.log("this is my response", response)
        res.status(200).json({message:'The action has been updated'}
    )})
}); 

router.get('/:id', validateActionId, (req, res) => {
        res.status(200).json(res.post)
  });      

router.get('/', (req, res) => {
        res.status(200).json(res.post)
  });      
  
router.delete('/:id', validateActionId, (req, res) => {
    Action.remove(req.params.id)
    .then(response => {res.status(200).json({message:'The post has been deleted'})})
});    

// middleware babies

function validateAction(req, res, next) {
    console.log(req.body.project_id)
    if(Object.keys(req.body).includes("description") && req.body.description)
    {
        if(Object.keys(req.body).includes("project_id") && req.body.project_id==1)
        {
        next()
        }
        else{
            res.status(404).json({
                message:"Error getting Action Project ID, must equal 1"
            }) 
        }
    }
    else
    {
        res.status(404).json({
            message:"Error getting Action Description, need description and text"
        }) 
    }
}
function validateActionId(req, res, next) {
    const { id } = req.params
    Action.get(id)
    .then(post =>{
        console.log("this is going through validator",post)
        if(post){
            res.post = post
            next()
        }
        else
        {
        res.status(404).json({
        message:"Error loading action, cant find that id"
        })
        }
    })
}
module.exports = router;