let allbtn = document.querySelectorAll("form .btn input");
let result = document.querySelector("form .result input");

allbtn.forEach(btn => {
    btn.addEventListener("click", e => {
        if (e.target.value == "AC") {
            result.value = "";
        } else if (e.target.value == "DE") {
            result.value = result.value.toString().slice(0, -1);
        } else if (e.target.value == "=") {
            result.value = eval(result.value);
        } else {
            result.value += e.target.value
        }
     })
})


// start check username and password
let signUp = document.querySelector(".over-lay .box.signup");
let sginIn = document.querySelector(".over-lay .box.signin");
let resetPass = document.querySelector(".over-lay .box.resetpass");
let overLay = document.querySelector(".container .over-lay");

// start signup process
let btnUp = document.querySelector(".over-lay .box .btn-in.signup");
let btnBack = document.querySelector(".over-lay .box.signup .btn-in.back");


btnUp.addEventListener("click", e => {
    signUp.style.display = "flex";
    sginIn.style.display = "none";
})


btnBack.addEventListener("click", e => {
    signUp.style.display = "none";
    sginIn.style.display = "flex";
})


let btnSignUp = document.querySelector(".over-lay .box.signup .sign-up");
btnSignUp.addEventListener("click", e => {
    let userName = document.querySelector(".over-lay .box.signup .signupUser").value;
    let password = document.querySelector(".over-lay .box.signup .signupPassword").value;
    if (userName == "" || password == "") {
        Swal.fire({
            icon: 'error',
            title: 'Access denied',
            text: ` Please Write Username And Password ??`
        })
    } else {
        if (window.localStorage.getItem("users") === null) {
            window.localStorage.setItem("users", "[]");
        }
        let oldUsers = JSON.parse(window.localStorage.getItem("users"));
        oldUsers.push({ "userName": userName, "password": password });
        window.localStorage.setItem("users", JSON.stringify(oldUsers));
        signUp.style.display = "none";
        sginIn.style.display = "flex";
    }

});

// start sgin in process

let btnSignIn = document.querySelector(".over-lay .box.signin .signin");
btnSignIn.addEventListener("click", e => {
    let userName = document.querySelector(".over-lay .box .signinUser").value;
    let password = document.querySelector(".over-lay .box .signinPassword").value;
    if (userName == "" || password == "") {
        Swal.fire({
            icon: 'error',
            title: 'Access denied',
            text: ` Please Write Username And Password ??`
        })
    } else {
        if (window.localStorage.getItem("users") === null) {
            Swal.fire({
                icon: 'error',
                title: 'Access denied',
                text: ` Please Sign Up First`
            })
        } else {
            let allUsers = JSON.parse(window.localStorage.getItem("users"));
            loop:allUsers.forEach(user => {
                if (user.userName == userName && user.password == password) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Access Done',
                        text: `Lets Start`
                    });
                    overLay.style.display = "none";
                    return loop;
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Access denied',
                        text: ` Sorry Username  Or Password Is Incorrect `
                    });
                }
            });
        }
    }
});

// start reset password
let resetInSign = document.querySelector(".over-lay .box .btn-in.reset")
let btnReset = document.querySelector(".over-lay .box.resetpass .search");
let btnBackToSginUp = document.querySelector(".over-lay .box.resetpass .btn-in.back");

resetInSign.addEventListener("click", e => {
    sginIn.style.display = "none";
    resetPass.style.display = "flex";
});

btnBackToSginUp.addEventListener("click", e => {
    resetPass.style.display = "none";
    signUp.style.display = "flex";
})


btnReset.addEventListener("click", e => {
    let userName = document.querySelector(".over-lay .box .resetsearch").value;
    let newPass = document.querySelector(".over-lay .box .newPassInput").value;
    if (userName == "" || newPass == "") {
        Swal.fire({
            icon: 'error',
            title: 'Access denied',
            text: ` Please Write Username And Password ? `
        })
    } else {
        if (window.localStorage.getItem("users") === null) {
            Swal.fire({
                icon: 'error',
                title: 'Access denied',
                text: ` Please Sign Up First No User In Database`
            })
        } else {
            let allUsers = JSON.parse(window.localStorage.getItem("users"));
            loop:allUsers.forEach(user => {
                if (user.userName == userName) {
                    user.password = newPass;
                    window.localStorage.setItem("users", JSON.stringify(allUsers));
                    Swal.fire({
                        icon: 'success',
                        title: 'password Reset',
                        text: `Lets Start!`
                    });
                    resetPass.style.display = "none";
                    sginIn.style.display = "flex";
                    return loop;
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Access denied',
                        text: `  User Name incorrect `
                    })
                }
            });
        }
    }
})
