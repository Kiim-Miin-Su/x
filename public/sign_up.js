const try_sign_up = document.getElementById("try_sign_up");

try_sign_up.addEventListener("click", () => {
    console.log("try_sign_up");

    if (!isAddressVerified) {
        alert("주소를 다시 선택해주세요.");
        user_address1.focus();
        return;
    }

    const user_id = document.getElementById("user_id").value;
    const user_pw = document.getElementById("user_pw").value;
    const user_name = document.getElementById("user_name").value;
    const user_ssn1 = document.getElementById("user_ssn1").value;
    const user_ssn2 = document.getElementById("user_ssn2").value;
    const user_email = document.getElementById("user_email").value;
    const user_phone = document.getElementById("user_phone").value;
    const user_address1 = document.getElementById("user_address1").value;
    const user_address2 = document.getElementById("user_address2").value;
    const user_birth = document.getElementById("user_birth").value;
    const user_gender = document.getElementById("user_gender").value;

    const id_regex = /^[a-zA-Z0-9]{4,}$/;
    const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const name_regex = /^[가-힣]{2,4}$/;

    const ssn_validation = (user_ssn1, user_ssn2) => {
        if (user_ssn1.length !== 6 || user_ssn2.length !== 7) {
            alert("주민등록번호 자리수가 올바르지 않습니다.");
            return false;
        }

        const ssn = user_ssn1 + user_ssn2;
        const weights = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
        let sum = 0;

        for (let i = 0; i < 12; i++) {
            sum += parseInt(ssn[i], 10) * weights[i];
        }

        const checkDigit = (11 - (sum % 11)) % 10;

        if (checkDigit !== parseInt(ssn[12], 10)) {
            alert("유효하지 않은 주민등록번호입니다.");
            return false;
        }

        return true;
    };

    const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phone_regex = /^\d{3}-\d{3,4}-\d{4}$/;

    if (!id_regex.test(user_id)) {
        alert("아이디는 4자 이상의 영문자 또는 숫자로 입력해주세요.");
        return;
    }
    if (!pwRegex.test(user_pw)) {
        alert("비밀번호는 8자 이상의 영문자, 숫자, 특수문자를 포함해야 합니다.");
        return;
    }
    if (!name_regex.test(user_name)) {
        alert("이름은 2~4자의 한글로 입력해주세요.");
        return;
    }
    if (!ssn_validation(user_ssn1, user_ssn2)) {
        alert("주민등록번호가 유효하지 않습니다.");
        return;
    }
    if (!email_regex.test(user_email)) {
        alert("이메일 형식이 올바르지 않습니다.");
        return;
    }
    if (!phone_regex.test(user_phone)) {
        alert("전화번호 형식이 올바르지 않습니다.");
        return;
    }

    fetch("http://127.0.0.1:8080/auth/sign_up", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_id,
            user_pw,
            user_name,
            user_ssn1,
            user_ssn2,
            user_email,
            user_phone,
            user_address1,
            user_address2,
            user_birth,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.token) {
                alert("회원가입 성공");
                localStorage.setItem("token", data.token);
            } else {
                alert(data.message);
            }
            window.location.href = "./posts.html"
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("회원가입 실패");
            console.log("회원가입 실패");
            console.log(error);
        })
})
