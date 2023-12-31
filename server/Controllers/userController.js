const userModel=require("../Models/userModel")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const validator=require("validator");

const createToken=(_id)=>{
    return jwt.sign({_id},process.env.JWT_SECRET_KEY,{expiresIn:"3d"})
}

const registerUser=async (req,res)=>{

  try {
    const {name,email,password}=req.body;
    console.log(req.body)
    let user=await userModel.findOne({email});
    if(user){
        return res.status(400).send({message:"User already exists"});
    }
    if(!validator.isEmail(email)){
        return res.status(400).send({message:"Invalid Email"});
    }
 
    if(!name || !email||!password){
        return res.status(400).send({message:"All fields are required"});
    }

    const salt=await bcrypt.genSalt(10);
    const hashPassword=await bcrypt.hash(password,salt);
    user=new userModel({
        name:name,
        email:email,
        password:hashPassword
    })
    await user.save();
    const token=createToken(user._id)
    res.status(200).json({_id:user._id,name,email,token})
  } catch (error) {
    console.log(error)
    res.status(500).json({error})
  }
}

const loginUser=async(req,res)=>{
const {email,password}=req.body;
    
    try {
        
        let user=await userModel.findOne({email});
        if(!user){
            return res.status(400).send({message:"Invalid Email or Password"});
        }
        const isValidPassword=await bcrypt.compare(password,user.password);


        if(!isValidPassword){
            return res.status(400).send({message:"Invalid Email or Password"});
        }

        const token=createToken(user._id)
    res.status(200).json({_id:user._id,name:user.name,email,token})

    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }

}
const findUser=async(req,res)=>{
    console.log(req.params)
    const userId=req.params.userId
    console.log(userId)
    try {
        const user=await userModel.findById(userId);
        res.status(200).json({user});

    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}

const getUsers=async(req,res)=>{
 

    
    try {
        const users=await userModel.find();
        res.status(200).json(users);

    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
}


module.exports={
    registerUser,loginUser,findUser,getUsers
}