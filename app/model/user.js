const { default: mongoose } = require("mongoose")

const user = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String, lowercase: true },
    phoneNumber: { type: String },
    email: { type: String, lowercase: true },
    password: { type: String },
    categories: { type: [String], ref: "categories" },
    profile: { type: String },
    otp: { type: Object, default: { code: 0, expire:0 } },
    role: { type: String, default: "USER" },
    income: { type: String, default: "0" },
    saving: { type: String, default: "0" },
    bank: { type: String, default: "0" },
    cash: { type: String, default: "0" },
}, { 
    timestamps: true
});

user.index({userName: "text"}, {firstName: "text"}, {lastName: "text"}, {phoneNumber: "text"})


const UserModel = mongoose.model('user', user)

module.exports = { UserModel }