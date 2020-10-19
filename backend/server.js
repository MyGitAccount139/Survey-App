const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config=require('config')
require('dotenv').config();
const app=express();

app.use(cors());
app.use(express.json({extended:false}));

// mongodb connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("mongodb conncetion established");
});


// app.get('/',(req,res)=>{
//     res.send('hello');
// })


app.use('/api/users',require('./routes/users'))

// connection to server
const port = process.env.port || 4000;
app.listen(port, () => {
    console.log(`server is runnning on port:${port}`);
})
// const connection = mongoose.connection;
// connection.once('open', () => {
//     console.log("mongodb conncetion established");
// });

