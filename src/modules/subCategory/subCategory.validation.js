import { generalFields } from "../../utils/generalFields.js";
import joi from "joi";





export const createsubCategory={
    body:joi.object({ 
      name:joi.string().min(3).max(30).required(),
      // category: generalFields.id.required(),
       
    }).required(),
    file: generalFields.file.required(),
    params:joi.object({
      categoryId: generalFields.id.required(),
    }),
    headers:generalFields.headers.required(),
}

