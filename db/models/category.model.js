


import mongoose, { Types } from "mongoose";



const categorySchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        lowercase:true,
        minLength:3,
        maxLength:30,
        trim: true,
        unique:true

    },
    slug:{
        type:String,
    minLength:3,
        maxLength:30,
        trim: true,
        unique:true

    },
    createdBy:{
        type:Types.ObjectId,
        ref:"user",
        required:true
    },
    image:{
        secure_url:String,
        public_id:String
    },
    customId:String
    


},{
    timestamps:true,
    versionKey:false,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

categorySchema.virtual("subCategories",{
    ref:"subCategory",
    localField:"_id",
    foreignField:"category",
})


const categoryModel= mongoose.model("category",categorySchema)
export default categoryModel