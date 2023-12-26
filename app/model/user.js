const { default: mongoose } = require("mongoose")

const user = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String, lowercase: true },
    phoneNumber: { type: String },
    email: { type: String, lowercase: true },
    password: { type: String },
    categories: { type: [String] },
    otp: { type: Object, default: { code: 0, expire:0 } },
    role: { type: String, default: "USER" },
}, {
    timestamps: true
});

const UserModel = mongoose.model('user', user)

module.exports = { UserModel }