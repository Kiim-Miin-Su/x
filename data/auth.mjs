let users = [
  {
    id: "1",
    user_id: "apple",
    user_pw: "1111",
    user_name: "김사과",
    user_email: "apple@apple.com",
    url: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    id: "2",
    user_id: "banana",
    user_pw: "2222",
    user_name: "반하나",
    user_email: "banana@banana.com",
    url: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "3",
    user_id: "orange",
    user_pw: "3333",
    user_name: "오렌지",
    user_email: "orange@orange.com",
    url: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    id: "4",
    user_id: "berry",
    user_pw: "4444",
    user_name: "배애리",
    user_email: "orange@orange.com",
    url: "https://randomuser.me/api/portraits/women/52.jpg",
  },
  {
    id: "5",
    user_id: "melon",
    user_pw: "5555",
    user_name: "이메론",
    user_email: "orange@orange.com",
    url: "https://randomuser.me/api/portraits/men/29.jpg",
  },
];

export async function createUser(user_id, user_pw, user_name, user_email) {
  const user = {
    id: Date.now().toString(),
    user_id,
    user_pw,
    user_name,
    user_email,
    url: "https://randomuser.me/api/portraits/men/29.jpg",
  };
  users = [user, ...users];
  return users;
}

export async function login(user_id, user_pw) {
  const user = users.find(
    (user) => user.user_id === user_id && user.user_pw === user_pw
  );
  return user;
}

export async function findByUserid(user_id) {
  return users.find((user) => user.user_id === user_id);
}

export async function findByid(id) {
  return users.find((user) => user.id === id);
}
