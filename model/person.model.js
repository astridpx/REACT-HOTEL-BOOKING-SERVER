const mongoose = require("mongoose");

const personSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
    },

    checkIn: {
      type: Date,
      required: true,
    },

    checkOut: {
      type: Date,
      required: true,
    },

    guess: {
      type: Number,
      required: true,
    },

    room: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// supply the name of collection and the schema
const Person = mongoose.model("guess", personSchema);

module.exports = Person;
