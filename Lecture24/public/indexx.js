//signup feature
let signupform = document.querySelector("#signup-form");
let signupName = document.querySelector("#signup-name");
let signupEmail = document.querySelector("#signup-email");
let signupPassword = document.querySelector("#signup-password");

signupform.addEventListener("submit", async function(e) {

    e.preventDefault();
    let nameValue = signupName.value ;
    let emailValue = signupEmail.value ;
    let passwordValue = signupPassword.value ;
let response = await fetch("/users", {
        method: "POST",
        body: JSON.stringify({username: nameValue, email: emailValue, password: passwordValue}),
        headers: {
            "content-type": "application/json"
        }
    })

    let data = await response.json();
    console.log(data)
    if (data.success) {
        alert ("Signup Success, please Login to continue"+" "+data.data.username)
        signupform.reset()
    }
})


//login feature
let loginform = document.querySelector("#login-form");
let loginEmail = document.querySelector("#login-email");
let loginPassword = document.querySelector("#login-password");
loginform.addEventListener("submit", async function(e) {
    e.preventDefault();
    let emailValue = loginEmail.value ;
    let passwordValue = loginPassword.value ;
    let response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({email: emailValue, password: passwordValue}),
        headers: {
            "content-type": "application/json"
        }
    })
    let data = await response.json()
    console.log(data)
    if (data.success) {
        let token = data.token
        localStorage.setItem("token", token);
        alert("login successful")
    }
})