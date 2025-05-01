const post = document.querySelector(".post");

window.onload = async () => {
    console.log("onload");
    fetch("http://127.0.0.1:8080/posts")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            data.forEach((post) => {
                const post_list = document.querySelector(".post_list");
                const li = document.createElement("li");
                const user_name = document.createElement("p");

                user_name.classList.add("user_name");
                li.classList.add("post_item");

                li.textContent = post.text;
                user_name.textContent = post.user_name;

                li.appendChild(user_name);
                post_list.appendChild(li);
            })
        })
        .catch((err) => {
            console.log(err);
        });
}

const button_log_in = document.getElementById("button_log_in");
const button_sign_up = document.getElementById("button_sign_up");

button_log_in.addEventListener("click", () => {
    console.log("log_in");
    window.location.href = "./log_in.html"
})

button_sign_up.addEventListener("click", () => {
    console.log("sign_up");
    window.location.href = "./sign_up.html"
})
