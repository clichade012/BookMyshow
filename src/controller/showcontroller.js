const showmodel = require('../model/showmodel')
const moviemodel = require('../model/moviesmodel')
const { isvalidObjectId} = require('../validation/validator')

const showcreate = async function(req,res){
    try {
        let data = req.body
        let { movieId , timeSlotsandSeat } = data
        
        if(!movieId){
            return res.status(400).send({status:false , message:"MovieId is required"})
        }

        if(!isvalidObjectId(movieId)){
            return res.status(400).send({ status: false, message: "MovieId must be of 13 String!" })
        }
         
        let movieexist = await moviemodel.findOne({_id:movieId})
        if(!movieexist){
            return res.status(400).send({ status: false, message: "MovieId does n't exists!" })
        }

        if(!timeSlotsandSeat) return res.status(400).send({status: false, message: "Time slots and seats are required!"})
        if(timeSlotsandSeat.length == 0) {
        return res.status(400).send({status: false, message: "Please provide with the details regarding the time slots and seats!"})
        }

        let createshow  = await showmodel.create(data)
        
        return res.status(201).send({status:true , message:"Show is booked" , data:createshow})

        
    } catch (error) {
        return res.status(500).send({status:false , message:error.message})
    }
}

module.exports = {showcreate}