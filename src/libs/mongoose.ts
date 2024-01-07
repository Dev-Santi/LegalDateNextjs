import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL;

export async function connectDB() {
    if (!MONGO_URL) {
        throw new Error('Variable de entorno MONGO_URL no definida.');
    }

    try {
        const { connection } = await mongoose.connect(MONGO_URL);
        if (connection.readyState === 1) {
            return Promise.resolve(true);
        }
    } catch (e) {
        console.log(e);
        return Promise.reject(false);
    }
}
