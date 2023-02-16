const mongoose = require('mongoose')
const {Schema} = mongoose

const photoSchema = new Schema({
    image:String,
    title:String,
    likes:Array,
    comments:Array,
    userId:mongoose.ObjectId,
    userName:String,

},{
    timeseries:true
});

const photo = mongoose.model('Photo',photoSchema);
module.exports = photo