import joi from "joi";


export const signUpValidation =joi.object({
    name:joi.string().alphanum().min(3).max(30).required(),
    email:joi.string().email().required(),
    password:joi.string().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$")).required(),
    age:joi.number().min(18).max(60).required()
})