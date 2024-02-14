// import express
const express = require('express')

const userController = require('../Controller/userController')
const projectController = require('../Controller/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')

const multerConfig = require('../Middlewares/multerMiddleware')

// create a router object to define paths
const router = new express.Router()

// using router object to define paths
// ****************
// 1 Register API routes -  localhost:4000/register
router.post('/register', userController.register)

// 2 Register API routes - localhost:4000/login
router.post('/login', userController.loginregister)

// 3 add user project api routes
router.post('/project/add', jwtMiddleware, multerConfig.single('projectImage'), projectController.addUserProject)

//get user projects
router.get('/project/user-projects',jwtMiddleware,projectController.getUserProject)

//get all projects
router.get('/project/all-projects',jwtMiddleware,projectController.getAllProjects)

//get all projects
router.get('/project/home-projects',projectController.getHomeProjects)

//update projects - localhost:4000/projects/update-project/:id
router.put('/project/update-project/:id',jwtMiddleware,multerConfig.single('projectImage'),projectController.editUserProjects)

//delete projects
router.delete('/project/delete-project/:pid',jwtMiddleware,projectController.deleteUserProject)


module.exports = router