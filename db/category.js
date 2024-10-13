const mongoose = require('mongoose');
const categoryShema= new mongoose.Schema({
    name:String
})

const category =mongoose.model('categories',categoryShema);

module.exports = category;
