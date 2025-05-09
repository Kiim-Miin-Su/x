import { db } from "../db/database.mjs";

const SELECT_JOIN = "select u.user_id, u.name, u.url, p.idx, p.user_idx, p.text, p.create_at from users as u join posts as p on u.idx = p.user_idx";

const ORDER_DESC = "order by p.create_at desc";

export async function getAll() {
  return db
    .execute
    (
      `${SELECT_JOIN} ${ORDER_DESC}`
    )
    .then((result) => result[0]);
}

// 사용자 아이디(userid)에 대한 포스트를 리턴
// 조건을 만족하는 모든 요소를 배열로 리턴
export async function getAllByUserid(userid) {
  return db
    .execute
    (
      `${SELECT_JOIN} where u.user_id = ? ${ORDER_DESC}`, [userid]
    )
    .then((result) => result[0]);
}

// 글 번호(id)에 대한 포스트를 리턴
// 조건을 만족하는 첫 번째 요소 하나를 리턴
export async function getById(idx) {
  return await db
    .execute
    (
      `${SELECT_JOIN} where p.idx = ?`, [idx]
    )
    .then((result) => result[0][0]);
}

// 포스트 작성
export async function create(text, user_idx) {
  return await db
    .execute(
      "insert into posts (text, user_idx) values (?, ?)",
      [text, user_idx]
    )
    .then((result) => getById(result[0].insertId));
}

// 포스트 변경
export async function update(idx, text) {
  return await db
    .execute
    (
      "update posts set text=? where idx=?", [text, idx]
    )
    .then(() => getById(idx));
}

// 포스트 삭제
export async function remove(idx) {
  return await db
    .execute
    (
      "delete from posts where idx=?", [idx]
    )
}

