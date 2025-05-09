import * as postRepository from "../data/post.mjs";

// 모든 포스트 / 해당 아이디에 대한 포스트를 가져오는 함수
export async function getPosts(req, res, next) {
  const user_id = req.query.user_id;
  const data = await (user_id
    ? postRepository.getAllByUserid(user_id)
    : postRepository.getAll());
  res.status(200).json(data);
}

// id를 받아 하나의 포스트를 가져오는 함수
export async function getPost(req, res, next) {
  const id = req.params.id;
  const post = await postRepository.getById(id);
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: `${id}의 포스트가 없습니다.` });
  }
}

// 포스트를 생성하는 함수
export async function createPost(req, res, next) {
  const { text } = req.body;
  console.log("req.user_idx: ", req.user_idx);
  const posts = await postRepository.create(text, req.user_idx);
  res.status(201).json(posts);
}

// 포스트를 변경하는 함수
export async function updatePost(req, res, next) {
  const id = req.params.id;
  const text = req.body.text;
  const post = await postRepository.update(id, text);
  if (post) {
    res.status(201).json(post);
  } else {
    res.status(404).json({ message: `${id}의 포스트가 없습니다.` });
  }
}

// 포스트를 삭제하는 함수
export async function deletePost(req, res, next) {
  const id = req.params.id;
  const post = await postRepository.getById(id);
  if (!post) {
    res.status(404).json({ message: `${id}의 포스트가 없습니다.` });
  }
  if (post.user_idx !== req.user_idx) {
    res.status(403).json({ message: "권한이 없습니다." });
  }
  await postRepository.remove(id);
  res.sendStatus(204);
}
