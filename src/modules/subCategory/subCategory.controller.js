
import { asyncHandler } from './../../utils/globalErrorHandling.js';
import { AppError } from './../../utils/classError.js';
import subCategoryModel from '../../../db/models/subCategory.model .js';

import cloudinary from "../../utils/cloudinary.js "
import { nanoid } from 'nanoid';
import slugify from 'slugify';
import categoryModel from '../../../db/models/category.model.js';



//================================ createsubCategory =================================================

export const createsubCategory= asyncHandler(async(req, res, next)=>{
    const {name} = req.body
    console.log(req.params);           
    console.log(req.originalUrl); 
    

    const categoryExist = await categoryModel.findById(req.params.categoryId) 
if(!categoryExist){


    return next(new AppError("category not exists",409))
}

    const subCategoryExist = await subCategoryModel.findOne({name:name.toLowerCase()})
if(subCategoryExist){


    return next(new AppError("subCategory already exists",409))
}


if(!req.file){
    return next(new AppError("image is required",409))

}
const customId=nanoid(5)
const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
    folder:`EcommerceC42/categories/${categoryExist.customId}/subCategories/${customId}`
})

const subCategory=await subCategoryModel.create({
    name,
    slug:slugify(name,{replacement:"_",
        lower:true
    }),
    image:{secure_url,public_id},
    customId,
    category:req.params.categoryId,
    createdBy:req.user._id
})
return res.status(201).json({msg:"done",subCategory})
})





//================================ getsubCategories =================================================

export const getsubCategories= asyncHandler(async(req, res, next)=>{
   

    const subCategories = await subCategoryModel.find({}).populate([
        {path:"category",
            select:"name-_id"

        },{
            path:"createdBy",
            select:"name-_id"
            
        }
    ])




res.status(201).json({msg:"done",subCategories})
})

 

 



















