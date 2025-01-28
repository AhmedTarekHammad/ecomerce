import { generalFields } from "../../utils/generalFields.js";
import joi from "joi";






export const createOrder  ={
    body:joi.object({ 
      productId: generalFields.id,
      quantity: joi.number().integer(),  
      phone: joi.string().required(),  
      address: joi.string().required(),  
      couponCode: joi.string().min(3),  
      paymentMethod: joi.string().valid("card","cash").required(),  
    
    }),
    
    headers:generalFields.headers.required()
}



export const cancelOrder  ={
    body:joi.object({ 
   reason: joi.string().min(3),
    
    }),
    params: joi.object({
      id: generalFields.id.required()
    }).required(),
    
    headers:generalFields.headers.required()
}


