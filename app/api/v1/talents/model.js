const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const talentSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Nama harus diisi"],
    },
    role: {
      type: String,
      default: "-",
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "Organizer",
      required: true,
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: "image",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Talent", talentSchema);
