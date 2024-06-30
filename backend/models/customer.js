import mongoose from "mongoose";

const maxDate = () =>{
    const today=new Date()
    today.setFullYear(today.getFullYear()-18)
    return today;
}

const buildingSchema=new mongoose.Schema({
    buildingName:{
        type:String,
    },
    subBuilding:{
        type:String,
    },
    buildingNumber:{
        type:String,
    },
})

const addressSchema=new mongoose.Schema({
    building:{
        type:buildingSchema,
        required:true,
    },
    street:{
        type:String,
        required:true,
    },
    secondaryStreet:{
        type:String,
    },
    city:{
        type:String,
        required:true,
    },
    postcode:{
        type:String,
        required:true,
    },
    country:{
        type:String,
    },
    isSixMonthOrOlder:{
        type:Boolean,
        required:true,
    }
})

const customerSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"First name is required"],
    },
    middleName:{
        type:String,
    },
    lastName:{
        type:String,
        required:[true,"Last Name is required"],
    },
    dob:{
        type: Date,
        required:true,
        max:[maxDate(),"user must be above 18 years of age"],
    },
    address:{
        type:addressSchema,
        required:true,
    },
    email:{
        type:String
    },
    mobile:{
        type:String
    },
    employmentDetails:{
        status:{
            type:String,
            enum:["full-time employment","part-time employment","self-employed","retired","student","not-employed"]
        },
        details:{
            key:{type:String},
            value:{type:String}
        }
    }
})

const customer= mongoose.model('customer',customerSchema)

export default customer