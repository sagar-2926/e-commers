import express from 'express';
import mongoose,{model,Schema} from 'mongoose';
const app = express();
app.use(express.json());

import dotenv from "dotenv";
dotenv.config();

const PORT = 3000;

const connectMongoDB = async()=>{
    const conn =  await mongoose.connect(process.env.MONGOODB_URI)
};
connectMongoDB();

const productSchema = new Schema({
    name:String,
    description:String,
    price:Number,
    productImage:String,
    brand:String,
});

const Product = model('Product', productSchema);
const products = [];
 

app.get('/product', async (req, res) => {
    const {name,description, price, productImage,brand} =req.body ;

    const prod = new Product({
         name:name,
        description:description,
         price:price,
         productImage:productImage,
         brand:brand
     })
     const savedProduct = await prod.save();
     res.json({
        success: true,
        data: savedProduct,
        message:'Successfully got Products'
    })
});

app.post('/product', (req, res) => {
    const {name,description, price, productImage,brand} =req.body ;
  if (!name){
    
  }
  return res.json({
   success: false,
   message:'Plese enter product name',
});

});

app.get('/products',async (req, res) => {

    const {}=req.query;
  
    const product = await Product.find();
  
      res.json({
          success: true,
          data: product,
          message:'Successfully fetch all product',
        })
  });

app.listen(PORT,() =>{
    console.log(`Server is runing on ${PORT}`);

});
