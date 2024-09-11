import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import MongoSchema from "../config/mongoSchema";

const userSchema = new MongoSchema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 40,
    },
    name: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      // enum: roles,
      default: "user",
    },
    permissions: {
      type: String,
    },
    facebookId: {
      type: String,
    },
    googleId: {
      type: String,
    },
    step: {
      type: String,
      default: "register",
      enum: [
        "register",
        "select-plan",
        "complete-profile",
        "complete-payment",
        "complete",
      ],
    },
    // plan: {
    //   type: String,
    //   // enum: Object.keys(plans),
    // },
    // period: {
    //   type: String,
    //   // enum: Object.keys(periods),
    // },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    stripeCustomerId: {
      type: String,
    },
    hasTrial: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    methods: {
      async generateFullName() {
        const user = this;
        user.name = `${user.first_name} ${user.last_name}`;
        await user.save();
      },
    },
  },
);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * check if Password match
 * @param {string} password
 * @returns {boolean}
 */

userSchema.methods.isPasswordMatch = function (password) {
  try {
    const user = this;
    return bcrypt.compare(password, user.password);
  } catch (error) {
    console.log(error);
  }
};

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  try {
    // const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * @typedef User
 */

const User = mongoose.model("User", userSchema);

module.exports = User;
