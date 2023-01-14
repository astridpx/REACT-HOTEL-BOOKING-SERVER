const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
  },
});

// adminSchema.methods.generateAuthToken = () => {
//   const token = jwt.sign({ _id: this.id }, process.env.JWTPRIVATEKEY, {
//     expiresIn: 60,
//   });
//   return token;
// };

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
