const User = require("../models/userModel");

const createUser = async (req, res) => {
   try {
      const { firstName, lastName, email, password } = req.body;

      if (!/\b\w+\@\w+\.\w+(?:\.\w+)?\b/.test(email)) {
         return res
            .status(401)
            .json({ success: false, message: "Enter a valid Email address" });
      } else if (password.length < 5) {
         return res.status(401).json({
            success: false,
            message: "Password must be between more than  5 ",
         });
      }

      const userExist = await User.findOne({ email: email }).exec();
      console.log(userExist)
      if (userExist) {
         return res.status(409).json({
            success: false,
            message: "the user already exist",
         });
      }

      const user = new User({
         email: email,
         password: password,
         first_name: firstName,
         last_name: lastName,
         name: `${firstName} ${lastName}`,
      });

      user.save();

      return res.status(201).json({
         success: true,
         message: "user created with successed",
         user
      });
   } catch (err) {
      console.log(err);
   }
};

module.exports = {
   createUser,
};
