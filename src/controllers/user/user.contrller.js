//make an arrow fun
//get data from req.body

import { User } from "../../models/user.model.js";
import ApiErrorHandling from "../../utils/ApiErrorHndling.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asynhandler.js";
import uploadOnCloudinary from "../../utils/cloudinary.js";

//validation
const registerUser=asyncHandler(async(req,res)=>{
const {name,email,password}=req.body
if([name,email,password].some((filed)=>filed.trim()==="")){
    throw new ApiErrorHandling(403,"All fields are required")
}
const existeduser=await User.findOne({
    $or:[{email},{password}]
})
if(existeduser){
    throw new ApiErrorHandling(403,"User with this email or password already existed")
}
const loacalfilepath=req.file?.image[0].path
if(!loacalfilepath){
    new ApiResponse(200,user,"loacalfile is required")
}
//upload on cloudinary
const image=await uploadOnCloudinary(loacalfilepath)
if(!image){
    new ApiResponse(200,user,"Image is required")
}
const user=await User.create({
   name,email,password ,image
})
const createdUser=await User.findById(user?._id).select("-password -refreshToken")
if(!createdUser){
    new ApiResponse(200,user,"User creation failed")
}
return res.status(201).json(
    new ApiResponse(200,user,"User registered successfully!!")
)


})
export default registerUser