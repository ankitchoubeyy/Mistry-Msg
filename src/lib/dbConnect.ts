import { log } from "console";
import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already connected to a database")
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {})

        connection.isConnected = db.connections[0].readyState
        console.log("DB connected successfully")
    } catch (error) {
        console.log(`DB connection is failed: ${error}`)
        process.exit();

    }
}

export default dbConnect;