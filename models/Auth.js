const mongoose = require('mongoose');

const {Schema} = mongoose;

const Admins = new Schema(
    {
        firstName: {
            required: true,
            type: String,
            min:3
        },
        lastName: {
            required: true,
            type: String,
            min:3

        },
        email: 
        {
            required: true,
            type: String,
            min: 8
        },
        mobileNumber: 
        {
            required: true,
            type: String,
            min: 10,
            max:10
        },
        isActive: 
        {
            type: Boolean,
            default: true
        },
        password: 
        {
            type: String,
            required : true,
            min: 8
        },
        title: 
        {
            type: String,            
            default: "Mr"

        },
        salt : {
            type: String,
            required: true,
            

        }

    },{timestamps: true}
)

const Admin = mongoose.model("Admin", Admins);

exports.Admin = Admin;

const AdminSessionSchema = new Schema({
    token : {
        type : String,
        minLength : 256,
    
        required : true
    },
    userID : {
        type: Schema.Types.ObjectId,
        ref: 'Teacher' 
    },
    lastAccessedAt : {
        type : Date,
        default : new Date()
    },
    isActive : {
        type : Boolean,
        default : true
    },
    tokenCreationDetails : {
        ip : {
            type : String,
            default : ''
        },
        useragent : {
            type : String,
            default : ''
        },
        os : {
            type : String,
            default : ''
        }
    },
    sessionLogs : [
        {
            type : String
        }
    ]
}, {timestamps : true});
const AdminSessionModel = mongoose.model("admin-session", AdminSessionSchema);
exports.AdminSessionModel = AdminSessionModel;
