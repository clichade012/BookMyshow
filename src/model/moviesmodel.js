const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId


const movieschema = new mongoose.Schema({
    moviename:{
        type:String,
        require:true
    },
    theatreId:{
        type:ObjectId,
        ref:"theatre",
        require:true
    },
    isDeleted:{
        type:Boolean,
        default:false
        
    }
},{timestamps:true})

module.exports = mongoose.model('movie',movieschema)