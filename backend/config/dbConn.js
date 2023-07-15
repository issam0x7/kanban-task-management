const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://mdahni06:8IVaI9BxqVPUPNge@cluster0.fj8i1uj.mongodb.net/?retryWrites=true&w=majority');
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;