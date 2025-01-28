
import { asyncHandler } from './../../utils/globalErrorHandling.js';
import { AppError } from './../../utils/classError.js';
import brandModel from '../../../db/models/brand.model.js';

import cloudinary from "../../utils/cloudinary.js "
import { nanoid } from 'nanoid';
import slugify from 'slugify';



//================================ createBrand =================================================

export const createBrand= asyncHandler(async(req, res, next)=>{
    const {name} = req.body

    const brandExist = await brandModel.findOne({name:name.toLowerCase()
       
})
if(brandExist){


    return next(new AppError("brand already exists",409))
}
if(!req.file){
    return next(new AppError("image is required",409))

}
const customId=nanoid(5)
const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
    folder:`EcommerceC42/brands/${customId}`
})

const Brand=await brandModel.create({
    name,
    slug:slugify(name,
        {replacement:"_",
        lower:true
    }),
    image:{secure_url,public_id},
    customId,
    createdBy:req.user._id
})
return res.status(201).json({msg:"done",Brand})
})



 



















