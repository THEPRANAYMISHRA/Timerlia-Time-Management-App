let form1 = document.getElementById("form");


  form1.addEventListener("submit", (e) =>{
        e.preventDefault();
            const payload = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };
    console.log(payload)
    fetch(`https://timerlia.onrender.com/user/signup`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
        .then((res) => {
            if(res.msg === "SignUp successful") 
            {
                // window.open("signin.html");
                window.open("./sigin.html");
               
            } 
            else if(res.msg === "user is already register") 
            {
                alert("user already register");
                // window.open("signin.html");
                window.open("./signin.html");
            }
            else{
                // window.open("otp.html");
                window.open("./otp.html");
                localStorage.setItem("userInfo", JSON.stringify(payload));
            }
        })
        .catch(err => console.log(err));
});

// const googleAuthBtn = document.getElementById('google-auth-btn');
// googleAuthBtn.addEventListener('click', () => {
//     const authLink = 'https://timerlia.onrender.com/auth/google';
//     window.location.href = authLink;
// });