const { default: mongoose } = require("mongoose")

const income = new mongoose.Schema({
    withWhat: { type: String, required: true },
    howMuch: { type: String, default: "0", required: true },
    description: { type: String, required: true },
    userID: { type: mongoose.Types.ObjectId },
 }, {
    timestamps: true
});

income.index({userID: "text"})

const IncomeModel = mongoose.model('income', income)

module.exports = { IncomeModel }