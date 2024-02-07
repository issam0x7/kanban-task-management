const { default: mongoose } = require("mongoose");
const validator = require('validator');

const tokenShema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.SchemaType.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: [
        TOKEN_TYPES.ACCESS,
        TOKEN_TYPES.ACCESS,
        TOKEN_TYPES.REFRESH,
        TOKEN_TYPES.RESET_PASSWORD,
      ],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);


const Token = mongoose.model('Token', tokenShema);


module.exports = Token;