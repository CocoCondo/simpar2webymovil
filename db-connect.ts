import mongoose from 'mongoose';

const uri = "mongodb://localhost:27017/";

const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
        });
        console.log('MongoDB conectado');
    } catch(error){
        console.error('Error conectando al mongo', error);
    }
}

export default connectDB;