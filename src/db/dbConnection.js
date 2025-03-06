const mongoose = require("mongoose")

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("connected to database");
    })
    .catch((err) => {
        console.log("connection failed", err);
    })