import express from "express";
import * as PC from "./product.controller.js"
import{multerHost} from './../../middleware/multer.js'
import {validation} from './../../middleware/validation.js'
import {auth} from './../../middleware/auth.js'
import * as  PV from "./product.validation.js";
import { systemRoles } from "../../utils/systemRoles.js";
import reviewRouter from './../review/review.routes.js';
import wishListRouter from "../wishList/wishList.routes.js";




const productRouter= express.Router()

productRouter.use("/:productId/reviews",reviewRouter);
productRouter.use("/:productId/wishList",wishListRouter),

productRouter.post("/",
    multerHost(multerHost.image).fields([
        {name:"image",maxCount:1},
        {name:"coverImages",maxCount:3},
    ]),
validation(PV.createProduct),
auth([systemRoles.admin] )
,PC.createProduct)

productRouter.put("/:id",
    multerHost(multerHost.image).fields([
        {name:"image",maxCount:1},
        {name:"coverImages",maxCount:3},
    ]),
validation(PV.updateProduct),
auth([systemRoles.admin] )
,PC.updateProduct)

productRouter.get("/",PC.getProducts)




export default productRouter