

const dataMethod=["body","query","params","header","file","files"]

export const validation =(schema)=>{
  
    return(req, res, next)=>{
        let arrayError=[]
       dataMethod.forEach((key)=>{
    
        if(schema[key]){
            const {error} = schema[key].validate(req[key],{abortEarly:false})
            if(error?.details){
                arrayError.push(...error.details)
            }
    }
    })
           if(arrayError.length){
            return res.json({err:arrayError})
           }
           next()
        }
        
    }
