import session from "express-session";
import ConnectMongoDBSession from "connect-mongodb-session";

const mongoDBSession = ConnectMongoDBSession(session);

const dbName = "BlogDB";


    const store = new mongoDBSession({
    uri: "mongodb://127.0.0.1:27017/BlogDB",
     collection: "session"
})

export default store;


