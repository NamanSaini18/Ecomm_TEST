// Name
// Image URL
// Price
// Description
// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         maxLength: 25,
//     },

//     imgURL: {
//        type: String,
//        required: [true,"Please upload image"],
//     },
//     price: {
//        type: Number,
//        required: [true,"Price is mandatory"],
//     },
//     description: {
//        type: String,
//        required: [true,"Please upload description"],
        
//     }

// })


// const Product = mongoose.model("Product",productSchema)

// module.exports = Product;
const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({

    name: String,

    price: Number,

    desc: String,

    img: String,

    review: [

        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
})


const Product = mongoose.model("Product", productSchema);



module.exports = Product;