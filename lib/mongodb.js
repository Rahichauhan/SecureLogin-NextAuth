// import mongoose from "mongoose";

// export const connectMongodb = async () => {
//     try {
//         await mongoose.connect("mongodb+srv://lakshaybogal:MONGO.Rajputbogal@mern.k63yjtq.mongodb.net/authapp"
//         , { useNewUrlParser: true, useCreateIndex: true });
//         console.log("Connected to MongoDB");
//     } catch (error) {
//         console.log("Error connecting to MongoDB:", error);
//     }
// }

import mongoose from "mongoose";
let isConnected = false;

export const connectMongodb = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log("All ready connected");
        return;
    }
    try {

        await mongoose.connect('mongodb://localhost:27017'
        , {
            dbName: 'authapp',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true;
        console.log("DB is connected");
    } catch (error) {
        console.log({
           " error": error
        })
    }
}
