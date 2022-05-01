const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, require: true },
    file: { type: String, require: true },
    year: { type: String },
    classify: { type: String, require: true },
    uploadby: { type: String },
    verify: { type: String },
    author: { type: String, require: true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", DocumentSchema);
