import { BASE_URL, endpoints } from "../constants/constants.js";
import { getData } from "../services/services.js";

async function displayEvents(filter = null) {
  const eventsContainer = document.querySelector(".eventCards");
  let events;
  if (!filter) {
    events = await getData(`${endpoints.events}`);
  } else {
    events = await getData(`${endpoints.events}?${filter}`);
  }
  events.forEach((event) => {
    const eventCard = document.createElement("div");
    eventCard.className = "rounded-xl overflow-hidden eventCard";
    eventCard.innerHTML = `<div class="relative">
                <img
                  class="rounded-xl home__eventImage"
                  src="./src/assets/images/banner_1.png"
                  alt=""
                />
                <p
                  class="bg-[#FFDD00] font-semibold absolute bottom-3 right-3 home__eventPrice"
                >
                  ${event.price}$
                </p>
              </div>

              <div class="eventContent">
                <p class="text-xl font-medium home__eventName">
                  ${event.name}
                </p>
                <p class="text-[#212121] home__eventDate">${event.dateTime.slice(
                  0,
                  10
                )}</p>
              </div>`;

    eventsContainer.appendChild(eventCard);
  });
}

displayEvents();

function signinupDisplay() {
  const signinupModal = document.querySelector(".signinup__modal");
  signinupModal.classList.toggle("hidden");
}

const registerBtn = document.querySelector("#registerBtn");
registerBtn.addEventListener("click", (e) => {
  signinupDisplay();
});

const registerCloseBtn = document.querySelector("#registerCloseBtn");
registerCloseBtn.addEventListener("click", (e) => {
  signinupDisplay();
});

export function registerDisplay() {
  const modal__header = document.querySelector(".modal__header");
  const modal__footer = document.querySelector(".modal__footer");
  const registerNowBtn = document.querySelector("#registerNowBtn");

  const signupinBtn = document.querySelector(".signupinBtn");
  const forgotPasswordBtn = document.querySelector("#forgotPasswordBtn");

  const nameInput = document.querySelector("#name");
  const surnameInput = document.querySelector("#surname");
  const phoneInput = document.querySelector("#phone");
  const confirmPasswordInput = document.querySelector("#confirmPassword");

  if (signupinBtn.innerHTML == "Log in") {
    // changing to register modal
    modal__header.textContent = "Register";
    signupinBtn.textContent = "Register";

    modal__footer.textContent = "Already Registered?";
    registerNowBtn.textContent = "Sign in here";
  } else {
    // changing to login modal
    modal__header.textContent = "Login";
    signupinBtn.textContent = "Log in";

    modal__footer.textContent = "New to iTicket.az?";
    registerNowBtn.textContent = "Sign up now";
  }

  forgotPasswordBtn.classList.toggle("hidden");
  nameInput.classList.toggle("hidden");
  surnameInput.classList.toggle("hidden");
  phoneInput.classList.toggle("hidden");
  confirmPasswordInput.classList.toggle("hidden");
}

function profileContentDisplay(content) {
  const signinupModal = document.querySelector(".profile__content__main");
  if (content.toLowerCase() == "account") {
    const contentDiv = document.createElement("div");
    const profile__content__header = document.querySelector(
      ".profile__content__header"
    );

    profile__content__header.textContent = "Account";

    contentDiv.className = "w-full profile__content__main";

    contentDiv.innerHTML = `<div class="w-full profile__content__main">
                <div
                  class="text-3xl font-bold text-black !p-6 shadow shadow-[#ffffff25] profile__content__header"
                >
                  Account
                </div>
                <div class="w-full h-[1px] bg-[#00000025] hr"></div>
                <div class="!p-6 profile__content__content">
                  <div class="flex flex-col profile__content__content__main">
                    <div class="flex flex-col gap-4">
                      <div class="flex items-center justify-between">
                        <p class="text-lg font-medium">Profile Image</p>
                        <input type="file" />
                      </div>
                      <div class="flex items-center justify-between">
                        <p class="text-lg font-medium">User Name</p>
                        <input
                          type="text"
                          class="border-2 border-[#00000025] rounded-md p-2"
                        />
                      </div>
                      <div class="flex items-center justify-between">
                        <p class="text-lg font-medium">User Surname</p>
                        <input
                          type="text"
                          class="border-2 border-[#00000025] rounded-md p-2"
                        />
                      </div>
                      <div class="flex items-center justify-between">
                        <p class="text-lg font-medium">Email</p>
                        <input
                          type="text"
                          class="border-2 border-[#00000025] rounded-md p-2"
                        />
                      </div>
                      <div class="flex items-center justify-between">
                        <p class="text-lg font-medium">Password</p>
                        <button class="bg-[#FFDD00] text-black font-bold p-2 rounded-md">
                          Change
                        </button>
                      </div>
                  </div>
                </div>
              </div>`;
  } else if (content.toLowerCase() == "favorites") {
  } else if (content.toLowerCase() == "settings") {
  }
}

export { signinupDisplay };
