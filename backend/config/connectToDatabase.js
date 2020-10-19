// const mongoose = require('mongoose');
// const config=require('config');

// // mongodb connection

// console.log('in db');
// const connectionToDatabase = async()=>{
//     try{
//         await mongoose.connect(
//             config.get('mongoURI'),
//             {
//                 useCreateIndex:true,
//                 useFindAndModify:true,
//                 useNewUrlParser: true,
//                 useUnifiedTopology: true
//             }
//         );
//         const conncetion=mongoose.connection;
//         connection.once('open', () => {
//             console.log("mongodb conncetion established");
//         });

//     }catch(error){
//         console.log(error);
//         process.exit(1);
//     }
// }

// module.exports= connectionToDatabase;