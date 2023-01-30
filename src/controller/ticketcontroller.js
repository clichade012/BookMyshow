const ticketmodel = require('../model/ticketmodel')
const showmodel = require('../model/showmodel')
const { isValid,isvalidObjectId } = require('../validation/validator')
const moviesmodel = require('../model/moviesmodel')
const usermodel = require('../model/usermodel')


const bookTicket = async function(req,res){
    try {
        let data = req.body
        let {showId , movieName ,timeSlots, Seat } = data

        if(!showId){
            return res.status(400).send({status:false , message:"Show Id is required"})
        }
        if (!isvalidObjectId(showId)) {
            return res.status(400).send({ status: false, message: "showId must be of 13 String!" })
        }

        let showexists = await showmodel.findOne({ _id: showId })
        if (!showexists) {
            return res.status(400).send({ status: false, message: "showId does n't exists!" })
        }

        if(!movieName){
            return res.status(400).send({status:false , message:"movieName is required"})
        }

        if(!isValid(movieName)){
            return res.status(400).send({status: false, message: "The input string cannot be empty!"})
        }

        let movie = await moviesmodel.findOne({movieName:movieName})
        
        if(!movie){
            return res.status(404).send({status: false, message: "Movie not found!"})
        }else{
            let shows = await showmodel.findOne({movieId:movie._id})
          let slots = shows.timeSlotsandSeat
       
          let noseat = (currentvalue) => currentvalue == 0

          let values = Object.values(slots)

          if(values.every(noseat)){
            return  res.status(403).send({status: false, message: "No timeslots available for this movie!"})
          }

          if(!timeSlots){
            return res.status(403).send({status:false , message:"TimeSlots is required!"})
          }

          if(!Seat){
            return res.status(403).send({status:false , message:"Seat is required!"})
          }


          for(let keys in slots){
            if(keys == timeSlots){
                if(slots[keys]> Seat){
                    let data = slots[keys]-Seat
                    //console.log(data);
                    await showmodel.findOneAndUpdate({_id:shows._id}, {timeSlotsAndSeats: data},{new:true})
                    console.log(data);
                      }else{
                        return res.status(404).send({status: false, message: "No seats available for this time"})
                    }
                }
                return res.status(404).send({status: false, message: "No slot available for this time"})
               
            }
            
         }
        
         let create = await ticketmodel.create(data)
        return  res.status(201).send({status: true, message: `Movie ticket successfully booked `, data: create})
    } catch (error) {
        return res.status(500).send({status:false ,  message:error.message})
    }
}

const updateTicket = async function (req, res){
    try{
        let userId = req.params.userId
        let ticketId = req.params.ticketId
        let body = req.body
        let {timeslot, seats, showId} = body

       
        if(!isvalidObjectId(userId)) return res.status(400).send({status: false, message: "Invalid userId!"})
        let user = await usermodel.findOne({_id: userId})
        if(!user) return res.status(404).send({status: false, message: "User not found"})

        if(!isvalidObjectId(ticketId)) return res.status(400).send({status: false, message: "Invalid ticketId!"})
        let ticket = await ticketmodel.findOne({_id: ticketId})
        if(!ticket) return res.status(404).send({status: false, message: "Ticket not found"})

        
        if(timeslot == ticket.timeslot) {
        return res.status(403).send({status: false, message: "The time slot you've mentioned is the same as you current ticket's time slot!"})
        }

        
        let show = showmodel.findOne({_id: showId})
        let obj = show.timeSlotsAndSeat

        for(let keys in obj){
            if(keys == timeslot){
                if(obj[keys] > seats){
                    let data =  obj[keys] - seats
                    await showmodel.findOneAndUpdate({_id: show._id}, {timeSlotsAndSeats: data})
                    res.status(200).send({status: true, message: "Ticket successfully updated!"})
                }else{
                   return res.status(400).send({status: false, message: "No seats available with this time slot!"})
                }
            }
        }
       return res.status(404).send({status: false, message: "No slot found with this time!"})
    }
    catch(error){
        return res.status(500).send({status:false ,  message:error.message})
    }
}

module.exports= {bookTicket,updateTicket}