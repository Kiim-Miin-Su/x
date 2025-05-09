use nodejs;

create table users (
	idx int auto_increment primary key,
    user_id varchar(50) unique not null,
    user_pw varchar(255) not null,
    name varchar(20) not null,
    email varchar(50) not null,
    url varchar(200)
);

create table posts (
	idx int auto_increment primary key,
    user_idx int not null,
    create_at datetime default now(),
    text varchar(2000) not null,
    foreign key (user_idx) references users(idx)
);

select * from users;
select * from posts;

select u.user_id, u.name, u.url, p.idx, p.user_idx, p.text, p.create_at from users as u join posts as p on u.idx = p.user_idx;

update posts set text="바뀐 글" where idx=2;