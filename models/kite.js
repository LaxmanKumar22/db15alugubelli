const mongoose = require("mongoose") 
const fanSchema = mongoose.Schema({ 
 Brand: {
    type: String,
    minlength: 4
},
 price: Number, 
 color: {
    type: String,
    minlength: 5
}, 
}) 
 
module.exports = mongoose.model("fan", 
fanSchema)