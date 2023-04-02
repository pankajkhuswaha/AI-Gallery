import mongoose from "mongoose";
mongoose.set("strictQuery", false);
const connectDb = async () => {

    // todo working code
    // * return await mongoose.connect(process.env.MONGO_ADRESS,{useNewurlParser:true, useUnifiedTopology:true});
    if (mongoose.connections[0].readyState) {
        console.log("Database is connected already");
        return "connected"
    }else{
        try {
            await mongoose.connect(process.env.MONGO_DB_URI,{useNewurlParser:true, useUnifiedTopology:true})
            console.log("Database is connected.")
            return "connected"
        } catch (error) {
            return error.message
        }
    }
}
export default connectDb;
