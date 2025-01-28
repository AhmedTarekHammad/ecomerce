import express from "express";
import * as CC from "./brand.controller.js"
import{multerHost} from './../../middleware/multer.js'
import {validation} from './../../middleware/validation.js'
import {auth} from './../../middleware/auth.js'
import * as  CV from "./brand.validation.js";
import { systemRoles } from "../../utils/systemRoles.js";




const brandRouter= express.Router()


brandRouter.post("/",multerHost(multerHost.image).single("image"),
validation(CV.createBrand),
auth([systemRoles.admin])
,CC.createBrand)






export default brandRouter