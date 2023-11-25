const { default: mongoose } = require("mongoose")

const user = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String, lowercase: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, lowercase: true },
    password: { type: String },
    otp: { type: Object, default: { code: 0, expire:0 } },
    role: { type: String, default: "USER" },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});

user.index({firstName: "text", lastName: "text", userName:"text", email: "text", phoneNumber: "text"})

const UserModel = mongoose.model('user', user)

module.exports = { UserModel }