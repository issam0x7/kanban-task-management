import mongoose from "mongoose";
import MongoSchema from "../config/mongoSchema";
import { TOKEN_TYPES } from "../config/tokens";

const tokenShema = new MongoSchema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
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

export default Token;
