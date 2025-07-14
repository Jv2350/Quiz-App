import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGODB is connected");
  } catch (error) {
    console.error("Mongo connection Failed");
    process.exit(1);
  }
};

export default connectDB;
