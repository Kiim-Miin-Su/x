window.onload = () => {
    fetch("http://127.0.0.1:8080/posts", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);

            const posts = document.querySelector(".posts");
            const post_list = document.getElementById("post_list");

            data.forEach((post) => {
                const user_name = document.createElement("p");
                const post_item = document.createElement("li");

                post_item.className = "post";
                post_item.textContent = post.text;
                user_name.textContent = post.user_name;

                post_item.addEventListener("click", () => {
                    window.location.href = `/posts/${post.id}`;
                });
                post_list.appendChild(post_item);
                post_item.appendChild(user_name);
                posts.appendChild(post_list);
            })
        })
}
