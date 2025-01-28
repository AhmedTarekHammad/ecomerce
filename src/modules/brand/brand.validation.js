import { generalFields } from "../../utils/generalFields.js";
import joi from "joi";





export const createBrand={
    body:joi.object({ 
      name:joi.string().min(3).max(30).required()  
    }).required(),
    file: generalFields.file.required(),
    headers:generalFields.headers.required(),
}

