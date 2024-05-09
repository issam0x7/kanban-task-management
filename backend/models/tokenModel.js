const { default: mongoose } = require("mongoose");
const MongoSchema = require("../config/mongoSchema");

const tokenShema = new MongoSchema(
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
        TOKEN_TYPES.REFRESH,
        TOKEN_TYPES.RESET_PASSWORD,
      ],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Token = mongoose.model("Token", tokenShema);

module.exports = Token;
