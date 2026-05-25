const mongoose = require("mongoose")
const dotenv = require("dotenv")
process.on("uncaughtException",(err)=>{
    console.log("UNCAUGHT EXCEPTION !!!!!!!!!")
    console.log(err.name,err.message)
    process.exit(1);
})
dotenv.config({path:"./.env"})
const app = require("./app")
const DB = process.env.MONGO_URI;
mongoose.connect(DB).then(()=>console.log("CONNECTED SUCCESSFULLY")).catch((e)=>console.log(e))
const PORT = process.env.PORT;
const server = app.listen(PORT,()=>{
    console.log(`App Running on PORT ${PORT}`);
})
process.on("unhandledRejection",(err)=>{
    console.log("UNHANDLE REJECTION  !!!!!!!!!")
    console.log(err.name,err.message)
    process.exit(1);
})