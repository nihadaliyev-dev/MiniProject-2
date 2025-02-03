import { registerDisplay, signinupDisplay } from "./index.js";
import { BASE_URL, endpoints } from "../constants/constants.js";

const registerBtn = document.querySelector("#registerBtn");
function loginSuccesful() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    registerBtn.classList.toggle("hidden");
    profileBtn.classList.toggle("hidden");
    profileBtn.addEventListener("click", (e) => {
      if (user.role == "admin") {
        window.location.replace("./src/assets/admin/index.html");
      } else {
        window.location.replace("./profile.html");
      }
    });
  }
}

loginSuccesful();

async function accountLogin(email, password) {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoints.users}`);
    const users = response.data;
    const status = users.find(
      (user) => user.email == email && user.password == password
    );

    if (status) {
      // signed in
      if (status.role == "admin") {
        window.location.replace("./src/assets/admin/index.html");
      }
      localStorage.setItem("user", JSON.stringify(status));
      loginForm.reset();
      signinupDisplay();
    } else {
      // wrong email or password
      alert("Wrong email or password");
    }
  } catch (error) {
    console.log(error);
  }
}

async function accountRegister(
  name,
  surname,
  phone,
  email,
  password,
  confirmPassword
) {
  const now = new Date();

  const formattedDate = now
    .toLocaleDateString("az-AZ", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\./g, "-");

  const formattedTime = now.toLocaleTimeString("az-AZ", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const formattedDateTime = `${formattedDate}, ${formattedTime}`;
  const user = {
    name,
    surname,
    username: name + "_" + surname,
    phone,
    email,
    password,
    confirmPassword,
    role: "client",
    profilePictureURL: "../images/default_profile.jpg",
    balance: 0,
    favorites: [],
    accountCreationDate: formattedDateTime,
  };

  const response = await axios.post(`${BASE_URL}/${endpoints.users}`, user);
  console.log(user);
}

const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");

const nameInput = document.querySelector("#name");
const surnameInput = document.querySelector("#surname");
const phoneInput = document.querySelector("#phone");
const emailInput = document.querySelector("#email");
const confirmPasswordInput = document.querySelector("#confirmPassword");
const passwordInput = document.querySelector("#password");

const registerNowBtn = document.querySelector("#registerNowBtn");
registerNowBtn.addEventListener("click", (e) => {
  registerDisplay();
});

const signupinBtn = document.querySelector(".signupinBtn");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (signupinBtn.textContent == "Register") {
    if (
      nameInput.value == "" ||
      surnameInput.value == "" ||
      phoneInput.value == "" ||
      emailInput.value == "" ||
      passwordInput.value == "" ||
      confirmPasswordInput.value == ""
    ) {
      alert("Please fill in all the fields.");
    } else {
      accountRegister(
        nameInput.value,
        surnameInput.value,
        phoneInput.value,
        emailInput.value,
        passwordInput.value,
        confirmPasswordInput.value
      );
    }
  } else if (signupinBtn.textContent == "Log in") {
    if (emailInput.value == "" || passwordInput.value == "") {
      alert("Please fill in all the fields.");
    } else {
      if (passwordInput.value.length < 6) {
        alert("Password must be at least 6 characters long.");
      }
      accountLogin(emailInput.value, passwordInput.value);
    }
  }
});

// async function hashPassword(password, passwordNew) {
//   const hashed = argon2.hash({ pass: password, salt: "somesalt" }).then((h) => {
//     argon2
//       .verify({
//         pass: passwordNew,
//         encoded:
//           "$argon2d$v=19$m=1024,t=1,p=1$c29tZXNhbHQ$GixDoGKC6qR4ZERa7hnwS8A0YXxzR0mc",
//       })
//       .then(() => console.log("ok"))
//       .catch((err) => console.log(err));
//     return h.encoded;
//   });
//   return hashed;
// }

// async function verifyPassword(hash, password) {
//   try {
//     argon2
//       .verify({ pass: password, encoded: hash })
//       .then(() => console.log("ok"));
//   } catch (err) {
//     console.error("Error verifying password:", err);
//   }
// }

// async function testVerify() {
//   try {
//     const hashed = await hashPassword("salamlar");
//     console.log(hashed);
//     console.log("Final verification result:");
//   } catch (err) {
//     console.error("Error in testVerify function:", err);
//   }
// }

// hashPassword("salamlar", "salamlar");
