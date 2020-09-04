const express = require("express")

const { get,insert,update,remove,getProjectActions } = require("../data/helpers/projectModel")

const router = express.Router();

router.get("/", (req,res) => {
    get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => {
        console.log(err)
    })
})

router.post("/", validateProject, (req,res) => {
    console.log(req.body)
    insert(req.body)
    .then(res.status(200).json(req.body))
    .catch(err => {
        console.log(err)
    })
})

router.put("/:id", (req,res) => {
    update(Number(req.params.id), req.body)
    .then(res.status(200).json(req.body))
    .catch(err => {
        console.log(err)
    })
})

router.delete("/:id", (req,res) => {
    remove(Number(req.params.id))
    .then(res.status(200).json({message: "project has been deleted"}))
    .catch(err => {
        console.log(err)
    })
})

router.get("/:id/actions", (req,res) => {
    getProjectActions(Number(req.params.id))
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        console.log(err)
    })
})

function validateProject(req,res,next) {
    if(req.body.name == undefined || req.body.description == undefined){
        res.status(400).json({message: "request must have all requirements in body (name and description)"})
    } else {
        next()
    }
}

module.exports = router; 