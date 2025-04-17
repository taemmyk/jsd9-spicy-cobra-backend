import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  download: {
    type: Number,
    required: true
  },
  discountprice: {
    type: Number,
    required: true
  },
  categories: {
    type: String,
    required: true
  }
}, { timestamps: true, versionKey: false });


const Product = mongoose.model('Product', productSchema);


const products = [
  { id: "1", name: "Product A", description: "This is a fantastic product A.", price: 20, rating: 5, download: 500, discountprice: 0, categories: "text" },
  { id: "2", name: "Product B", description: "This is a fantastic product B.", price: 20, rating: 5, download: 500, discountprice: 0, categories: "text" },
  { id: "3", name: "Product C", description: "This is a fantastic product C.", price: 20, rating: 5, download: 500, discountprice: 0, categories: "text" },
  { id: "4", name: "Product D", description: "This is a fantastic product D.", price: 20, rating: 5, download: 500, discountprice: 0, categories: "text" },
  { id: "5", name: "Product E", description: "This is a fantastic product E.", price: 20, rating: 5, download: 500, discountprice: 0, categories: "text" },
  { id: "6", name: "Product F", description: "This is a fantastic product F.", price: 20, rating: 5, download: 500, discountprice: 0, categories: "text" },
  { id: "7", name: "Product G", description: "This is a fantastic product G.", price: 20, rating: 5, download: 500, discountprice: 0, categories: "text" },
  { id: "8", name: "Product H", description: "This is a fantastic product H.", price: 20, rating: 5, download: 500, discountprice: 0, categories: "text" },
  { id: "9", name: "Product I", description: "This is a fantastic product I.", price: 20, rating: 5, download: 500, discountprice: 0, categories: "text" },
  { id: "10", name: "Product J", description: "This is a fantastic product J.", price: 20, rating: 5, download: 500, discountprice: 0, categories: "text" },
  { id: "11", name: "Product K", description: "This is a fantastic product K.", price: 20, rating: 5, download: 500, discountprice: 0, categories: "text" },
  { id: "12", name: "Product L", description: "This is a fantastic product L.", price: 20, rating: 5, download: 500, discountprice: 0, categories: "text" },
  { id: "13", name: "Product M", description: "This is a fantastic product M.", price: 20, rating: 5, download: 500, discountprice: 0, categories: "text" }
];


export default Product;
