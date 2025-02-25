
import { asyncHandler } from './../../utils/globalErrorHandling.js';
import { AppError } from './../../utils/classError.js';
import categoryModel from '../../../db/models/category.model.js';

import cloudinary from "../../utils/cloudinary.js "
import { nanoid } from 'nanoid';
import slugify from 'slugify';
import subCategoryModel from '../../../db/models/subCategory.model .js';



//================================ createCategory =================================================

export const createCategory= asyncHandler(async(req, res, next)=>{
    const {name} = req.body

    const categoryExist = await categoryModel.findOne({name:name.toLowerCase()
       
})
if(categoryExist){


    return next(new AppError("category already exists",409))
}
if(!req.file){
    return next(new AppError("image is required",409))

}
const customId=nanoid(5)
const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
    folder:`EcommerceC42/categories/${customId}`
})

req.filePath =`EcommerceC42/categories/${customId}`



const category=await categoryModel.create({
    name,
    slug:slugify(name,{replacement:"_",
        lower:true
    }),
    image:{secure_url,public_id},
    customId,
    createdBy:req.user._id
})


req.data={
    model:categoryModel,
    id:category._id
}



const x=4
x=5
return res.status(201).json({msg:"done",category})
})



//================================ updateCategory =================================================

export const updateCategory= asyncHandler(async(req, res, next)=>{
    const {name} = req.body
    const {id} = req.params

    const category = await categoryModel.findOne({_id:id,createdBy:req.user._id})
       
if(!category){


    return next(new AppError("category not exists",404))
}

if(name){
    if(name.toLowerCase()===category.name){
return next (new AppError("name should be different",400))
    }
    if(await categoryModel.findOne({name:name.toLowerCase()})){
        return next (new AppError("name already exists",400))
    }
    category.name = name.toLowerCase()
    category.slug=slugify(name,{
        replacement:"_",
        lower:true

    })
}

if(req.file){
    await cloudinary.uploader.destroy(category.image.public_id)
    const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
         folder:`EcommerceC42/categories/${category.customId}`
})
   

        category.image={secure_url,public_id}
}


await category.save()

return res.status(200).json({msg:"done",category})
})

 

 

//================================ getCategories =================================================

export const getCategories= asyncHandler(async(req, res, next)=>{
   

    const categories = await categoryModel.find({}).populate([
        {
        path:"subCategories",
    }])
    // let list=[]
//     for (const category of categories) {

// const subCategories =await subCategoryModel.find({category: category._id})
// const newCategory= category.toObject()
// newCategory.subCategories= subCategories
// list.push(newCategory)
//     }
 





res.status(201).json({msg:"done",categories})
})

 




//================================ deleteCategory =================================================

export const deleteCategory= asyncHandler(async(req, res, next)=>{
   
    const {id}=req.params

   
    const category = await categoryModel.findOneAndDelete({_id:id,createdBy:req.user._id})

if(!category){
    return next (new AppError("category not exist or you don'y have permission",401))
}
//delete category.subCategories
await subCategoryModel.deleteMany({category:category._id})


//delete from cloudinary
await cloudinary.api.delete_resources_by_prefix(`EcommerceC42/categories/${category.customId}`)
await cloudinary.api.delete_folder(`EcommerceC42/categories/${category.customId}`)

res.status(201).json({msg:"done"})
})

 














