const { default: mongoose } = require("mongoose")

const setTime = new mongoose.Schema({
    type: { type: String, required: true },
    userID: { type: mongoose.Types.ObjectId },
    description: { type: String },
    when: { type: Object, required: true,  default: { startDate: 0, endDate:0 }  },
 }, {
    timestamps: true
});


const SetTimeModel = mongoose.model('setTime', setTime)

module.exports = { SetTimeModel }