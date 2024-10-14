const express = require('express');
const mongoose= require('mongoose');
const path= require('path');
const fs = require('fs');
const bodyParser=require('body-parser');
const cors=require('cors');
const app = express();
const categoryRouter = require('./routes/category');
const brandRouter = require('./routes/brand')
const productRouter = require('./routes/product');
const customerRouter= require('./routes/customer');
const orderRouter= require('./routes/order');
const authRouter= require('./routes/auth');


const { verifyToken, isAdmin } = require('./middleware/auth-middleware');
app.use(cors())
app.use(express.json());
app.use(bodyParser.json());
// Increase request size limits for body-parser
app.use(bodyParser.json({ limit: '50mb' }));    // Increase JSON size limit
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true,parameterLimit:100000 }));  // Increase URL-encoded data size limit
// Set the limit size (e.g., 10mb)
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true,parameterLimit:100000 }));
app.use('/uploads',express.static(path.join('uploads')))



app.use('/category',verifyToken,isAdmin,categoryRouter);
app.use('/brand',verifyToken,isAdmin,brandRouter);
app.use('/product',verifyToken,isAdmin,productRouter);
app.use('/orders',verifyToken,isAdmin,orderRouter)
app.use('/customer',customerRouter);
app.use('/auth',authRouter);
app.use(verifyToken,isAdmin);
app.get('/',(req,res)=>{
    res.send("server is runing");
})


async function connectDB(){
    // mongodb+srv://selvaweb95:8mOqex2oeyfhjIfW@cluster0.rtwa8.mongodb.net/
    // use env file will be added for secrity purpose
    await mongoose.connect('mongodb+srv://selvaweb95:8mOqex2oeyfhjIfW@cluster0.rtwa8.mongodb.net/')
//    await mongoose.connect('mongodb://localhost:27017',{
//         dbName:'e-com-store-db',
//     })
}

connectDB().catch(err => console.error(err))

// db= mongodb://localhost:27017
const port = 3000;
app.listen(port,() => {
    console.log("server runing");
    
})