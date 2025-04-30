let posts = [
  {
    id: "1",
    user_name: "김사과",
    user_id: "apple",
    text: "Node.js 배우는 중인데 Express 진짜 편하다! 🚀",
    createdAt: Date.now().toString(),
    url: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    id: "2",
    user_name: "반하나",
    user_id: "banana",
    text: "오늘의 커피 ☕️ + 코딩 = 최고의 조합!",
    createdAt: Date.now().toString(),
    url: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "3",
    user_name: "오렌지",
    user_id: "orange",
    text: "Elasticsearch 연동 완료! 실시간 검색 API 짜릿해 🔍",
    createdAt: Date.now().toString(),
    url: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    id: "4",
    user_name: "배애리",
    user_id: "berry",
    text: "JavaScript 비동기 너무 어렵다... Promises, async/await, 뭐가 뭔지 😭",
    createdAt: Date.now().toString(),
    url: "https://randomuser.me/api/portraits/women/52.jpg",
  },
  {
    id: "5",
    user_name: "이메론",
    user_id: "melon",
    text: "새 프로젝트 시작! Express + MongoDB + EJS 조합 좋아요 💡",
    createdAt: Date.now().toString(),
    url: "https://randomuser.me/api/portraits/men/29.jpg",
  },
];

// 모든 포스트를 리턴
export async function getAll() {
  return posts;
}

// 사용자 아이디(userid)에 대한 포스트를 리턴
// 조건을 만족하는 모든 요소를 배열로 리턴
export async function getAllByUserid(user_id) {
  return posts.filter((post) => post.user_id === user_id);
}

// 글 번호(id)에 대한 포스트를 리턴
// 조건을 만족하는 첫 번째 요소 하나를 리턴
export async function getById(id) {
  return posts.find((post) => post.id === id);
}

// 포스트 작성
export async function create(user_id, user_name, text) {
  const post = {
    id: Date.now().toString(),
    user_id,
    user_name,
    text,
    createdAt: Date.now().toString(),
  };
  posts = [post, ...posts];
  return posts;
}

// 포스트 변경
export async function update(id, text) {
  const post = posts.find((post) => post.id === id);
  if (post) {
    post.text = text;
  }
  return post;
}

// 포스트 삭제
export async function remove(id) {
  posts = posts.filter((post) => post.id !== id);
}
