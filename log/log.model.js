const mongoose = require("mongoose");
const LogSchema = new mongoose.Schema({
    LoggerId : {
        type : String ,
        required: true,
    },
    loggerMassage : {
        type : String ,
        required: true
    }
}, { timestamps: true });

const Log = mongoose.model("Log", LogSchema);
module.exports = Log;