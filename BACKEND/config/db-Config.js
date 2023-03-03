import mongoose from "mongoose";


mongoose.set("strictQuery", true);

const dbName = "BlogDB";

const connect = async() => {
    try {
   await mongoose.connect(process.env.MONGO_URI + dbName);
    console.log("connected to db");
} catch (error) {
    // console.log(error);
    console.log("cannot connect to db")
}
}

export default  connect;

