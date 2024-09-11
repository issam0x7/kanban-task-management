import { Schema } from "mongoose";

class MongoSchema extends Schema {
  constructor(schema) {
    super(schema);
    this.set("toJSON", {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
      },
    });
  }
}

export default MongoSchema;