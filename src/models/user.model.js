import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema=new Schema({
name:{
    type:String,
    reuired:true,
    trim:true
},
email:{
 type:String,
    reuired:true,
    trim:true,
    lowercase:true,
    unique:true
},
password:{
 type:String,
 reuired:[true,"Please enter password"],
 select:false
},
image:{
type:String,
},
refreshToken:{
type:String
},
},{timestamps:true})
//hashing password
userSchema.pre("save",async function(next){
if(!this.isModified("password")) return next()
this.password=await bcrypt.hash(this.password,10)
next()
})
//check password
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}
//generate accesstoken
userSchema.methods.generateAccessToken=function(){
return jwt.sign({
 _id:this._id,
 email:this.email,
 name:this.name
},process.env.ACCESS_TOKEN_SECRET , { expiresIn:process.env.ACCESS_TOKEN_EXPIRY})};
//generate refresh token
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign({
 _id:this._id,
}, process.env.REFRESH_TOKEN_SECRET, { expiresIn:process.env.REFRESH_TOKEN_EXPIRY});
}
export const User=mongoose.model("User",userSchema)