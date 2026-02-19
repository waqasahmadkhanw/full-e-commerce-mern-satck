const asyncHandler=(reqHandler)=>{
return (req,res,next)=>{
    Promise.resolve(newFunction(req,res,next)).catch((error)=> next(error))
}
}
export default asyncHandler