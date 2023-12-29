const { default: mongoose } = require("mongoose")

const categories = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    amountOfSpend: { type: String, default: "0" },
    userID: { type: mongoose.Types.ObjectId },
    parent: { type: mongoose.Types.ObjectId },
    children: { type: [ mongoose.Types.ObjectId ], default: [] }
}, {
    timestamps: true
});

categories.index({title: "text"})

const CategoryModel = mongoose.model('categories', categories)

module.exports = { CategoryModel }