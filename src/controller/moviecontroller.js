const moviemodel = require('../model/moviesmodel')
const theatremodel = require('../model/theatremodel')
const usermodel = require('../model/usermodel')
const {isValid , isValidMixed ,isvalidObjectId  } = require('../validation/validator')



const createmovies = async function(req,res){
  try {
    let data = req.body
    let { moviename , theatreId } = data

    if(!moviename){
        return res.status(400).send({status:false , message:"MovieName is required!"})
    }

    if(!isValid(moviename)){
        return res.status(400).send({ status: false, message: "Moviename is not valid" })
    }

    if(!isValidMixed(moviename)){
        return res.status(400).send({ status: false, message: "Moviename should not have special character!" })
    }
  
    if(!theatreId){
        return res.status(400).send({status:false , message:"TheatreId is required!"})
    }

    if (!isvalidObjectId(theatreId)) {
        return res.status(400).send({ status: false, message: "theatreId must be of 13 String!" })
    }

    let existtheatre = await theatremodel.findOne({_id:theatreId})
    if(!existtheatre){
        return res.status(400).send({status:false , message:"Theatre not present!"})
    }
    
     let create = await moviemodel.create(data)
     return res.status(201).send({status:true , message:"Successfully schuled movie", data:create})

  } catch (error) {
    return res.status(500).send({status:false , message:error.message})
  }
}

const getmovies = async function(req,res){
  try{

    let data = req.body
    let {moviename} = data
    let userId = req.params.userId

        if (!userId) {
            return res.status(400).send({ status: false, message: "userId is required" })
        }

        if (!isvalidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "userId must be of 13 String!" })
        }

        let userexists = await usermodel.findOne({ _id: userId })
        if (!userexists) {
            return res.status(400).send({ status: false, message: "UserId does n't exists!" })
        }


    if(Object.keys(data).length == 0){
        let getby = await moviemodel.find({isDeleted:false}) 
        if(getby.length == 0){
            return res.status(404).send({status:false , message:"Moviename not founded!"})
        }
        return res.status(200).send({status:true, message:"Movie founded", data:getby})
    }

    let getbymovie = await moviemodel.find({moviename:{$regex:moviename,$options:"i"}})
    if (getbymovie.length == 0) {
        return res.status(404).send({ status: false, message: "Movie not founded!" })
    }

    return res.status(200).send({ status: true, message: "Movie  founded successfully", data: getbymovie })

       
  } catch (error) {
    return res.status(500).send({status:false , message:error.message})
  }
}
module.exports = {createmovies,getmovies}