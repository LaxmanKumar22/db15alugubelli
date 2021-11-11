const mongoose = require("mongoose") 
const kiteSchema = mongoose.Schema({ 
    Brand: String, 
    color: String, 
    price: Number 
}) 
 
module.exports = mongoose.model("kite", kiteSchema)