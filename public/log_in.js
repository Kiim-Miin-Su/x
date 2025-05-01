const button_log_in = document.getElementById("log_in");

button_log_in.addEventListener("click", function () {
    const user_id = document.getElementById("user_id").value;
    const user_pw = document.getElementById("user_pw").value;

    if (user_id === "" || user_pw === "") {
        alert("아이디와 비밀번호를 입력하세요");
        return;

    }
    const data = {
        user_id,
        user_pw
    }
    console.log(data);

    fetch("http://127.0.0.1:8080/auth/log_in", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("아이디 또는 비밀번호를 확인하세요");
            }
        })
        .then((data) => {
            console.log(data);
            if (data) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user_id", data.user_id);
                alert("로그인 성공");
                window.location.href = "./posts.html";
            }
        })
        .catch((err) => {
            console.error(err);
            alert("로그인 실패");
        });
})