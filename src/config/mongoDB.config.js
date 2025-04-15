import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
      mongoose.connect("mongodb+srv://davidgarciaf0404:0T3WIaUO33fO0vHR@cluster0.kojjgtt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
      console.log("MongoDB connected");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}