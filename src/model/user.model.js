import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    salary : {
        type : String,
        required : true
    },
    createdBy : {
        type : String,
        ref : "Admin"
    }
},{
    timestamps : true
})

const User = mongoose.model('User',userSchema);

export default User;