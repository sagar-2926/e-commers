import express from 'express';
import mongoose,{model,Schema} from 'mongoose';
const app = express();
app.use(express.json());

import dotenv from "dotenv";
dotenv.config();

const PORT = 3000;

const connectMongoDB = async()=>{
    const conn =  await mongoose.connect(process.env.MONGOODB_URI);
if (conn){
    console.log("Connecting to MongoDB successfully ...");
}
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

app.get('/product', async (req, res) => {
 const {id} = req.query ;

    const products = await Product.findById(id);
     res.json({
        success: true,
        data:products,
        message:'Successfully got Products'
    })
});

app.post('/product', async (req, res) => {
    const {name,description,price, productImage,brand} =req.body ;
 
    if (!name){
    return res.json({
        success: false,
        message:'Plese enter product name',
   });
  }
  if (!description){
    return res.json({
        success: false,
        message:'Plese enter product description',
   });
  }
  if (!price){
    return res.json({
        success: false,
        message:'Plese enter product price',
   });
  }
  if (!productImage){
    return res.json({
        success: false,
        message:'Plese enter product product Url',
   });
  }
  if (!brand){
    return res.json({
        success: false,
        message:'Plese enter product brand',
   });
  }
  const newProduct = new Product({
         name:name,
         description:description,
         price:price,
         productImage:productImage,
         brand:brand
  });
  const savedProduct = await newProduct.save();
   res.json({
    success:true,
    data: savedProduct,
    message: 'Product saved successfully',
  })

});

app.get('/products',async (req, res) => {

    const products = await Product.find();
  
      res.json({
          success: true,
          data: products,
          message:'Successfully fetch all product',
        })
  });

app.listen(PORT,() =>{
    console.log(`Server is runing on ${PORT}`);

});
