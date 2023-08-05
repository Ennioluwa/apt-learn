import mongoose from "mongoose";

const db =
  "mongodb+srv://daniel:HHOFJu578pp0eR3s@cluster0.o7skfq2.mongodb.net/classroomNext";

// const MONGO_URI = "<your_mongo_uri>";

// if (!MONGO_URI) {
//   throw new Error("Define the MONGO_URI environmental variable");
// }

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentiatlly
 * during API Route usage.
 */
declare global {
  //   var prisma: PrismaClient | undefined;
  var mongoose: any | undefined;
}

// const prismadb = globalThis.prisma || new PrismaClient();
let cached = globalThis.mongoose;

if (!cached) {
  cached = globalThis.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(db, opts).then((mongoose) => {
      console.log("db connected", db);

      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
