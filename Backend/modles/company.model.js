import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required: true
    },
    description:{
        type:String,

    },
    website:{
        type:String,
    },

    location:{
        type:String,
    },
    logo:{
        type:String,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "User"
    }
},{timestamps:true})

export const Company = mongoose.model("Company", companySchema)