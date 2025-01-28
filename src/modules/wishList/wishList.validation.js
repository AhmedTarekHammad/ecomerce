import { generalFields } from "../../utils/generalFields.js";
import joi from "joi";






export const createWishList  ={
    params:joi.object({ 
      productId: generalFields.id.required()
    
    }).required(),
    
    headers:generalFields.headers.required()
}

