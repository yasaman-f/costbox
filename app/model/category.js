const { default: mongoose } = require("mongoose")

const categories = new mongoose.Schema({
    title: { type: String },
    minimumConsumption: { type: String, default: "10000" },
    maximumConsumption: { type: String, default: "10000000000" },
    userID: { type: String, lowercase: true }
}, {
    timestamps: true
});

categories.index({title: "text"})

const CategoryModel = mongoose.model('categories', categories)

module.exports = { CategoryModel }