import express from "express";
import * as CC from "./order.controller.js"
import {validation} from './../../middleware/validation.js'
import {auth} from './../../middleware/auth.js'
import * as  CV from "./order.validation.js";
import { systemRoles } from "../../utils/systemRoles.js";




const orderRouter= express.Router()


orderRouter.post("/",
validation(CV.createOrder),
auth(Object.values(systemRoles.admin))
,CC.createOrder)

orderRouter.put("/:id",
validation(CV.cancelOrder),
auth(Object.values(systemRoles.admin))
,CC.cancelOrder)









export default orderRouter