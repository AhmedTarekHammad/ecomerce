import categoryModel from '../../../db/models/category.model.js';

import brandModel from '../../../db/models/brand.model.js';
import subCategoryModel from '../../../db/models/subCategory.model .js';
import { asyncHandler } from './../../utils/globalErrorHandling.js';
import { AppError } from './../../utils/classError.js';
import productModel from '../../../db/models/product.model.js';

import cloudinary from "../../utils/cloudinary.js " 
import { nanoid } from 'nanoid';
import slugify from 'slugify';
import { ApiFeatures } from './../../utils/apiFeatures.js';





//================================ createProduct =================================================

export const createProduct= asyncHandler(async(req, res, next)=>{
    const {stock,discount,price,brand,subCategory,category,description,title} = req.body

    const categoryExist = await categoryModel.findOne({_id:category}) 
   
    if(!categoryExist){
    
    
        return next(new AppError("category not exists",404))
    }
    

    const subCategoryExist = await subCategoryModel.findOne({_id:subCategory,category}) 
    if(!subCategoryExist){
    
    
        return next(new AppError("subCategory not exists",404))
    }


    const brandExist = await brandModel.findOne({_id:brand}) 
if(!brandExist){


    return next(new AppError("brand not exists",404))
}


    const productExist = await productModel.findOne({title:title.toLowerCase()}) 
if(productExist){


    return next(new AppError("product not exists",409))
}




    const subPrice = price -(price*discount || 0/100)

if (!req.files){
    return next(new AppError("image is required",404))
}
const customId=nanoid(5)
let list=[]

for (const file of req.files.coverImages){
const {secure_url,public_id}=await cloudinary.uploader.upload(file.path,{
    folder: `EcommerceC42/categories/${categoryExist.customId}/subCategories/${subCategoryExist.customId}/products/${customId}/coverImages`
})

list.push({secure_url,public_id})
}

const {secure_url,public_id}=await cloudinary.uploader.upload( req.files.image[0].path,{
   folder: `EcommerceC42/categories/${categoryExist.customId}/subCategories/${subCategoryExist.customId}/products/${customId}/mainImage`

})

const product= await productModel.create({
    title,
    slug:slugify(title,{
        lower:true,
        replacement:"_"
    }),
    description,
    price,
    discount,
    subPrice,
    stock,
    category,
    subCategory,
    brand,
    image:{secure_url,public_id},
    coverImages:list,
    customId,
    createdBy:req.user._id

})



     res.status(201).json({msg:"done",product})
})

//======================================== getProducts ===========================================

export const getProducts = asyncHandler(async (req, res,next) => {
    




const apiFeatures = new ApiFeatures(productModel.find(),req.query)
.pagination()
.filter()
.search()
.sort()
.select()

const products = await apiFeatures.mongooseQuery






   
    res.status(200).json({msg:"done",page:apiFeatures.page,products})


})

//================================ updateProduct =================================================

export const updateProduct= asyncHandler(async(req, res, next)=>{
    const {stock,discount,price,brand,subCategory,category,description,title} = req.body
const {id}=req.params
    const categoryExist = await categoryModel.findOne({_id:category}) 
   
    if(!categoryExist){
    
    
        return next(new AppError("category not exists",404))
    }
    

    const subCategoryExist = await subCategoryModel.findOne({_id:subCategory,category}) 
    if(!subCategoryExist){
    
    
        return next(new AppError("subCategory not exists",404))
    }


    const brandExist = await brandModel.findOne({_id:brand}) 
if(!brandExist){


    return next(new AppError("brand not exists",404))
}


    const product = await productModel.findOne({_id:id,createdBy:req.user._id}) 
if(!product){


    return next(new AppError("product not exists",409))
}
if(title){
    if(title.lowerCase==product.title){
        return next(new AppError("title matches old title",404))
    }
    if(await productModel.findOne({title:title.toLowerCase()})){
        return next (new AppError("title already exists",409))
    }

    product.title=title.toLowerCase()
    product.slug=slugify(title,{
        lower:true,
        replacement:"_"
    })
}

if(description){
    product.description=description
}

if(stock){
    product.stock=stock
}


if(price& discount){
    product.subPrice= price -(price*(discount /100))
    product.price=price
    product.discount=discount
}else if(price){
    product.subPrice=price-(price*(product.discount/100))
    product.price=price
}else if(discount){
    product.subPrice= product.price - ( product.price*(discount/100))
    product.discount=discount
}



if(req.files){
    if(req.files?.image?.length){
        await cloudinary.uploader.destroy(product.image.public_id)
        const{secure_url,public_id}= await cloudinary.uploader.upload(req.files.image[0].path,{
            folder:`EcommerceC42/categories/${categoryExist.customId}/subCategories/${subCategoryExist.customId}/products/${product.customId}/mainImage`
        })
product.image={secure_url,public_id}
    }

    if(req.files?.coverImages?.length){
        await cloudinary.api.delete_resources_by_prefix(`EcommerceC42/categories/${categoryExist.customId}/subCategories/${subCategoryExist.customId}/products/${customId}/coverImages`
)
let list=[]

for (const file of req.files.coverImages){
const {secure_url,public_id}=await cloudinary.uploader.upload(file.path,{
    folder: `EcommerceC42/categories/${categoryExist.customId}/subCategories/${subCategoryExist.customId}/products/${product.customId}/coverImages`
})

list.push({secure_url,public_id})
}
product.coverImages=list

    }

}
    





await product.save()




     res.status(201).json({msg:"done",product})
})    

