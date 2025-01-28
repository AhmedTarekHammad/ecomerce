import { generalFields } from "../../utils/generalFields.js";
import joi from "joi";






export const createCart  ={
    body:joi.object({ 
      productId: generalFields.id.required(),
      quantity: joi.number().integer().required()  
    
    }),
    
    headers:generalFields.headers.required()
}


export const removeCart  ={
    body:joi.object({ 
      productId: generalFields.id.required()
    
    }),
    
    headers:generalFields.headers.required()
}

export const clearCart  ={
   
    
    headers:generalFields.headers.required()
}

