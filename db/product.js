const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: { 
        type: String, 
        required: true // Required field
    },
    shotDescription: { 
        type: String, 
        required: true // Required field
    },
    description: { 
        type: String, 
        required: true // Required field
    },
    price: { 
        type: Number, 
        required: true, // Required field
        min: 0 // Minimum value
    },
    discount: { 
        type: Number, 
        default: 0 // Default value
    },
    images: [{ 
        data: Buffer,
        contentType: String
    }],
    categoryId: { 
        type: Schema.Types.ObjectId, 
        ref: 'categories', 
        required: true // Required field
    },
    brandId: { 
        type: Schema.Types.ObjectId, 
        ref: 'brands', 
        required: true // Required field
    },
    isFeatured: { 
        type: Boolean, 
        default: false // Default value
    },
    isNewProduct: { 
        type: Boolean, 
        default: false // Default value
    }
});

const product= mongoose.model('products',productSchema);

module.exports = product;