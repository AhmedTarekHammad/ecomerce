import mongoose from "mongoose";

const connectionDB= async()=>{
    return await mongoose.connect(process.env.DB_URL_Online)
    .then(()=>{
        console.log(`connected to database on ${process.env.DB_URL_Online}`);
    }).catch((err)=>{
        console.log({msg:"failed to connect to database",err});
    })
}


export default connectionDB