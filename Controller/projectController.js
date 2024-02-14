const projects = require('../Models/projectShema')

exports.addUserProject = async (req,res) => {
    console.log("Inside AddUserProject");
    //res.status(200).json('Add user project Request')
    // user id get
    const userId = req.payload
    // get Add project details
    const { title, language, github, link, overview } = req.body
    // get the image
    projectImage = req.file.filename
    console.log(projectImage);
    // logic of adding new user project
    try {
        const existingProject = await projects.findOne({ github })
        if (existingProject) {
            res.status(406).json("Project Already exists")
        } else {
            const newProject = new projects({ title, language, github, link, overview, projectImage, userId })
            await newProject.save()
            res.status(200).json(newProject)
        }
    }
    catch(err){
        res.status(404).json({message:err.message})
    }
}

//1.get user project
exports.getUserProject= async(req,res)=>{
    //get userId
    const userId = req.payload
    //api request
    try{
        const userProject =await projects.find({userId})
        console.log(userProject);
        res.status(200).json(userProject)//send response to the client
    }
    catch(err){
        res.status(401).json(err.message)
    }
}
//2.get all projects
exports.getAllProjects = async(req,res)=>{
    const searchKey = req.query.search
    const query ={
        language:{
            $regex:searchKey,
            $options:"i"
        }
    }
    try{
        const AllProjects =await projects.find()
        res.status(200).json(AllProjects)//send response to the client
    }
    catch(err){
        res.status(401).json(err.message)
    }
}

// 3. Get home projects (limit to 3)
exports.getHomeProjects = async (req, res) => {
    try {
        const HomeProjects = await projects.find().limit(3); // Limit the result to 3 projects
        res.status(200).json(HomeProjects); // Send response to the client
    } catch (err) {
        res.status(401).json(err.message);
    }
};

//4. edit user project
exports.editUserProjects = async (req,res)=>{
    const { title, language, github, link, overview, projectImage } = req.body

    const uploadedImage = req.file? req.file.filename:projectImage;
    const userId = req.payload
    const {id}=req.params

    try{
        const updatedProject = await projects.findByIdAndUpdate({_id:id},
            {title,language,github,link,overview,projectImage:uploadedImage,userId},{new:true})
        //save the updated project details
        await updatedProject.save()
        //response send back to the client
        res.status(200).json(updatedProject)
    }   
    catch(err){
        res.status(401).json(err)
    }
 
}

//delete project
exports.deleteUserProject = async(req,res)=>{
    const {pid} = req.params
    try{
        const deleteData = await projects.findByIdAndDelete({_id:pid})//projects id
        res.status(200).json(deleteData)
    }
    catch(err){
        res.status(401).json(err)
    }
}

