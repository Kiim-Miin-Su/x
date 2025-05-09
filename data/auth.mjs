import { db } from "../db/database.mjs"; // promise를 반환 한다는게 무슨 뜻이야 도대체...?
import { config } from "../config.mjs";
import bcrypt from "bcrypt";

const users = [];


export async function createUser(user_id, hashed_pw, name, email, url) {
    return await db.execute( // 객체로 반환되는거야?
        "INSERT INTO users (user_id, user_pw, name, email, url) VALUES (?, ?, ?, ?, ?)",
        [user_id, hashed_pw, name, email, url]
    ).then((result) => result[0].insertId);
}

export async function login(input_id, input_pw) {
    const [user] = await db.execute(
        "SELECT * FROM users WHERE user_id = ?",
        [input_id]
    );
    if (!user) {
        throw new Error("존재하지 않는 아이디입니다.");
    }
    if (!bcrypt.compareSync(input_pw, user.user_pw)) {
        throw new Error("비밀번호가 일치하지 않습니다.");
    }
    return user;
}

export async function findByUserid(input_id) {
    return await db
        .execute(
            "select * from users where user_id = ?", [input_id])
        .then((result) => result[0][0]);
}

export async function findByid(idx) {
    return await db
        .execute(
            "select * from users where idx = ?", [idx]
        )
        .then((result) => result[0][0]);
}

