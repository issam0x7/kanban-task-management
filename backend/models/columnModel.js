const MongoSchema = require("../config/mongoSchema");

const columnSchema = new MongoSchema({
  name: String,
  color: String,
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

module.exports = mongoose.model("Column", columnSchema);
