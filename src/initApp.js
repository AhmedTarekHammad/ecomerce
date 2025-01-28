
import connectionDB  from '../db/models/connection.js';
import { AppError } from '../src/utils/classError.js';
import { globalErrorHandling } from '../src/utils/globalErrorHandling.js';
import * as routers from "../src/modules/index.routes.js"
import { deleteFromCloudinary } from './utils/deleteFromCloudinary.js';
import { deleteFromDb } from './utils/deleteFromDb.js';
import cors from "cors"




export const initApp=(app,express) => {

    
    app.use(cors())

    app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).json({msg:"hello on my project"})
})


    app.use("/users",routers.userRouter)
    app.use("/categories",routers.categoryRouter)
    app.use("/subCategories",routers.subCategoryRouter)
    app.use("/brands",routers.brandRouter)
    app.use("/products",routers.productRouter)
    app.use("/coupons",routers.couponRouter)
    app.use("/cart",routers.cartRouter)
    app.use("/orders",routers.orderRouter)
    app.use("/reviews",routers.reviewRouter)
    
    
    
    connectionDB()
    
    
    


    app.use("*",(req, res,next) => {
    
        return next(new AppError (`invalid url ${req.originalUrl}`))
        })
        
        
        
        
        app.use(globalErrorHandling,deleteFromCloudinary,deleteFromDb)






}

