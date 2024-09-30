import mongoose from 'mongoose';

const uri = "mongodb+srv://lolicon2544:m8RDkLfcItib0RMx@cluster0.gd6p4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


let cachedDb: mongoose.Connection | null = null;

export default async function connectToDatabase() {
  if (cachedDb && cachedDb.readyState === 1) return cachedDb;

  if (!cachedDb) {
    try {
      const opts = { dbName: 'Ledger' };
      await mongoose.connect(uri, opts);
      cachedDb = mongoose.connection;
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw new Error('MongoDB connection failed');
    }
  }

  return cachedDb;
}
