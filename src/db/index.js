import mongoose from "mongoose";
const DbConnection=async()=>{
try {
    const mogodbconnection=await mongoose.connect(process.env.MONGODB_URI)
    console.log(`mongodb connected successfully${mogodbconnection.connection.host}`)
} catch (error) {
    console.log("mongodb connection failed",error)
    process.exit(1)
}
}
export default DbConnection