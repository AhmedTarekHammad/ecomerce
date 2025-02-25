import multer from "multer";


export const multerHost=()=>{


const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads")

    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})



const upload= multer({storage})

return upload



}