const express=require("express")
const cors=require("cors")
const app=express()
const mongoose=require("mongoose")
const userRoutes=require("./Routes/userRoutes")


require("dotenv").config()

app.use(express.json())
app.use(cors())
app.use("/api/users",userRoutes)


app.get("/",(req,res)=>{
    console.log("Welcome to the app")
})






const port=process.env.PORT || 5000
const uri=process.env.ATLAS_URI

app.listen(port,(req,res)=>{
    console.log(`Server is running on port ${port}`)
})



mongoose.connect(uri,{useNewUrlParser:true}).then(()=>{
    console.log("MongoDB is connected")
}).catch((e)=> console.log(`Mongodb connection failed with error:  ${e}`))