import mongoose from 'mongoose'

export const ConnectDB = async () => 
{
    await mongoose.connect('mongodb+srv://shivagundeti1403:wPbC5qWyeBTGwvee@cluster0.kd5bnex.mongodb.net/blog-app?retryWrites=true&w=majority&appName=Cluster0')
    console.log("✅ mongo Connected")
}