const { default: mongoose } = require("mongoose");
const MongoSchema = require("../config/mongoSchema");

const { ObjectId } = mongoose.Types;

const profileShema = MongoSchema({
  user: {
    typeof: ObjectId,
    ref: "User",
    reqiured: true,
  },
  lastLogin: {
    type: Date,
  },
  ip: {
    type: String,
  },
  device: {
    type: String,
  },
  browser: {
    type: String,
  },
  os: {
    type: String,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  region: {
    type: String,
  },
  postal: {
    type: String,
  },
  timezone: {
    type: String,
  },
});

/**
 * @typedef Profile
 */

const Profile = mongoose.model("Profile", profileShema);

module.exports = Profile;
