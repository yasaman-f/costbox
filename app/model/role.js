const mongoose = require("mongoose")


const role = new mongoose.Schema({
    title: {type: String, required: true},
    permissions: {type: [mongoose.Types.ObjectId], ref: "permissions", default: []},
    description: {type: String, default: ""}
},{
    toJSON: {
        virtuals: true
    }
})

module.exports = {
    RoleModel: mongoose.model("role", role)
}