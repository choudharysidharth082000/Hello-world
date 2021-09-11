const mongoose = require('mongoose');

const {Schema} = mongoose;


const createStore = new Schema({
    heading: {
        type: String,
        required: true,
        min: 3,
        unique: true
    },
    discription : 
    {
        type: String,
        min: 10
    },
    ImageURL: {
        type: String,
        required: true,
        min: 5
    }
    ,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'userModel'
    }
}, {timestamps: true})  




const Store = mongoose.model("Store", createStore);

exports.Store = Store;