const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const ticketschema = new mongoose.Schema({
     showId:{
        type:ObjectId,
        ref:"show"
     },
     movieName:{
        type:String,
        require:true
     },
     timeslot:{
        type:String,
        require:true
     },
     Seat:{
        type:Number,
        require:true
     }
},{timestamps:true})

module.exports = mongoose.model('ticket',ticketschema)
