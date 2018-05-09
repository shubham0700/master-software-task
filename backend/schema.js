let mongoose = require("mongoose");
let userschema = mongoose.Schema(
  {
    name: { type: String },
    payperiod: { type: String },
    grossincome: { type: String },
    incometax: { type: String },
    netincome: { type: String },
    superamount: { type: String }
  },
  { versionKey: false }
);

module.exports = mongoose.model("userslip", userschema);
