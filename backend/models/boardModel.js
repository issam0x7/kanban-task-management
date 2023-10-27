const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
   title: { type: String, required: true },
   description: { type: String, required: true },
   isCompleted: { type: Boolean, required: true },
   subtasks: [
      {
         title: String,
         isCompleted: Boolean,
      },
   ],
});

const columnSchema = new mongoose.Schema({
   name: String,
   color: String,
});

const boardSchema = new mongoose.Schema(
   {
      name: String,
      columns: [columnSchema],
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
   },
   { _id: true }
); // Include the _id field explicitly

module.exports = mongoose.model("Board", boardSchema);

const registerUser = async (email, password, e) => {
   e.preventDefault();
   const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
   });
   let data = await res.json();
   if (data.message) {
      setMessage(data.name);
   }
   if (data.message == "success") {
      let options = { redirect: false, email, password };
      const res = await signIn("credentials", options);
      return Router.push("/");
   }
};
