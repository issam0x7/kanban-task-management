import mongoose from "mongoose";
import MongoSchema from "../config/mongoSchema";

const { ObjectId } = mongoose.Types;

const profileShema = new MongoSchema({
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

export default Profile;
