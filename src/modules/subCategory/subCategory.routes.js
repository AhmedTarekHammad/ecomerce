import express from "express";
import * as SCC from "./subCategory.controller.js"
import{multerHost} from './../../middleware/multer.js'
import {validation} from './../../middleware/validation.js'
import {auth} from './../../middleware/auth.js'
import * as  SCV from "./subCategory.validation.js";
import { systemRoles } from "../../utils/systemRoles.js";




const subCategoryRouter= express.Router({mergeParams:true})


subCategoryRouter.post("/",
    multerHost(multerHost.image).single("image"),
validation(SCV.createsubCategory),
auth([systemRoles.admin])
,SCC.createsubCategory)


subCategoryRouter.get("/",

// auth(Object.values(systemRoles))
SCC.getsubCategories)





export default subCategoryRouter