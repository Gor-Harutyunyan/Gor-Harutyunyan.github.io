const loginInput = document.querySelector(".loginInput");
const passInput = document.querySelector(".passInput");
const loginAlert = document.querySelector(".login-alert");
const passAlert = document.querySelector(".pass-alert");
const button = document.querySelector(".btn");

const user = {
  isLogin: true,
  login: "",
  password: "",
};

function validate(value, elem) {
  elem.innerText = "";
  if (value.trim().length < 5) {
    elem.innerText = "Your input must contain more than 5 symbols";
    if (value.trim().length === 0) {
      setTimeout(() => {
        elem.innerText = "";
      }, 2000);
    }
  }
}

loginInput.addEventListener("input", (e) => {
  user.login = e.target.value;
  validate(user.login, loginAlert);
});

passInput.addEventListener("input", (e) => {
  user.password = e.target.value;
  validate(user.password, passAlert);
});

button.addEventListener("click", (e) => {
  if (
    loginAlert.innerText !== "" ||
    passAlert.innerText !== "" ||
    loginInput.value === "" ||
    passInput.value === ""
  ) {
    validate(user.login, loginAlert);
    validate(user.password, passAlert);
    e.preventDefault();
  }
  localStorage.setItem("user", JSON.stringify(user));
});

function isLoginUser() {
  let isLogin = JSON.parse(localStorage.getItem("user")).isLogin;
  if (isLogin) {
    window.location.href = "../countries.html";
  }
}

isLoginUser();
