const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String },
    //img: { type: String },
    //imgTitle: { type: String },
    //imgSm: { type: String },
    //trailer: { type: String },
    //video: { type: String },
    file: { type: String },
    year: { type: String },
    limit: { type: Number },
    //genre: { type: String },
    classify: { type: String },
    isSeries: { type: Boolean, default: false },
    uploadby: { type: String, default: "anonymous"}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", DocumentSchema);
