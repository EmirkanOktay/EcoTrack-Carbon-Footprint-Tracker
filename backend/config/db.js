const mongoose = require('mongoose');

const db = mongoose.connect(process.env.DB_CONNECTION)
    .then(() => { console.log("database connected") })
    .catch((err) => { console.log("database connection error" + err) })

module.exports = db