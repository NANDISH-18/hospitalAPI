const mongoose = require('mongoose');

// Database connection with mongoose
mongoose.connect('mongodb://localhost/hospital_API');
const db = mongoose.connection;
// Connection error handling
db.on('error', console.error.bind(console, "Error in connecting to the database"));

// Connection error successful
db.once('open', function(){
    console.log("Successfully connected to the database");
})


