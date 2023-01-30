const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const showschema = new mongoose.Schema({
    movieId:{
        type:ObjectId,
        ref:"movie",
        require:true
    },
    timeSlotsandSeat:{
        type:Object,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('show',showschema)