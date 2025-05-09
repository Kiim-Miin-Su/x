import { config } from "../config.mjs";
import MongoDb from "mongodb";

let db;

export async function connectDB() {
    return MongoDb.MongoClient.connect(config.db.host)
        .then((client) => {
            db = client.db();
            console.log(db);
        })
        .catch((err) => {
            console.error("DB 연결 실패", err);
        });
}

export function getUsers() {
    return db.collection("users");
}

export function getPosts() {
    return db.collection("posts");
}