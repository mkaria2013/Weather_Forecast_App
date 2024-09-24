import mongoose from "mongoose";

const dbURL = process.env.DB_URL;
const dbName = process.env.DBNAME;

const dbConnection = async () => {
    try {
        const connection = await mongoose.connect(`${dbURL}/${dbName}`);
        console.log("☁️ "+` Database Connected\n⚡ Host: ${connection.connection.host}`);
    } catch (e) {
        console.log(`❌ Database failed to connect due to error: ${e}`);
    }
}

export default dbConnection;