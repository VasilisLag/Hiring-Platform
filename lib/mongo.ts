import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer | null = null;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (mongoose.connection.readyState >= 1) return mongoose;

  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  return mongoose.connect(uri, {
    // @ts-expect-error (mongoose types don't always match perfectly here)
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export async function closeDatabase(): Promise<void> {
  if (mongoServer) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
    mongoServer = null;
  }
}