const express = require('express');
const port = 8000;
const db = require('./config/mongoose');

// starting the app
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))

// Redirecting Routes
app.use('/',require('./routes'));


app.listen(port, function(err){
    if(err){
        console.log('error');
        return;
    }
    console.log(`server is running on ${port}`);
})


