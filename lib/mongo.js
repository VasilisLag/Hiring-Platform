// lib/mongo.js
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

export async function connectToDatabase() {
  // If already connected, no need to connect again
  if (mongoose.connection.readyState >= 1) return;

  // Create an in-memory MongoDB instance
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();  // Get the connection string for the in-memory server

  // Connect to the in-memory MongoDB instance
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

// Optionally, to stop the in-memory server after usage
export async function closeDatabase() {
  if (mongoServer) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  }
}