import { getData } from "../../services/services.js";
import { endpoints } from "../../constants/constants.js";
async function displayEvents() {
  const containerHeader = document.querySelector(".admin__content__header");
  containerHeader.textContent = "Events";
  const eventsContainer = document.querySelector(
    ".admin__content__content__main"
  );
  eventsContainer.innerHTML = "";
  eventsContainer.classList.add("gap-3");
  const events = await getData(`${endpoints.events}`);

  events.forEach((event) => {
    const eventCard = document.createElement("div");

    eventCard.className =
      "w-full shadow-lg border-2 border-[#ffffff50] rounded-2xl shadow-[#ffffff25] flex gap-3 items-center gap-3 !p-3 justify-between admin__event";
    eventCard.innerHTML = `
              <div class="flex items-center">
                <div class="w-[128px] h-[128px] admin__eventBanner">
                  <img
                    class="w-[128px] h-[128px] rounded-2xl"
                    src="../images/banner_1.png"
                    alt=""
                  />
                </div>
              </div>
              <div
                class="w-full h-full rounded-2xl flex items-center !p-3 justify-between admin__event"
              >
                <div class="text-white text-lg admin__eventName">
                  ${event.name}
                </div>
                <div class="text-white text-lg admin__eventDate">
                  ${event.dateTime.slice(0, 10)}
                </div>
                <div class="text-white text-lg admin__eventVenue">${
                  event.venueName
                }</div>
                <div class="admin__eventDetailsBtn">
                  <button
                    class="!p-4 rounded-lg border-2 border-white admin__eventDetailsBtn__btn"
                  >
                    <svg
                      fill="#fbfbfb"
                      height="18px"
                      width="18px"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 330 330"
                      xml:space="preserve"
                    >
                      <path
                        id="XMLID_222_"
                        d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
               c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
               C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
               C255,161.018,253.42,157.202,250.606,154.389z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            `;
    eventsContainer.appendChild(eventCard);
  });
}

const eventsBtn = document.querySelector("#admin__eventsBtn");

eventsBtn.addEventListener("click", (e) => {
  displayEvents();
});

async function displayUsers() {
  const containerHeader = document.querySelector(".admin__content__header");
  containerHeader.textContent = "Users";
  const usersContainer = document.querySelector(
    ".admin__content__content__main"
  );
  usersContainer.innerHTML = "";
  const users = await getData(`${endpoints.users}`);

  users.forEach((user) => {
    const userCard = document.createElement("div");

    userCard.className =
      "w-fulsl shadow-lg border-2 border-[#ffffff50] rounded-2xl shadow-[#ffffff25] flex gap-3 items-center gap-3 !p-3 justify-between admin__event";
    userCard.innerHTML = `
              <div class="flex items-center">
                <div class="w-[128px] h-[128px] admin__eventBanner">
                  <img
                    class="w-[128px] h-[128px] rounded-2xl"
                    src="${user.profilePictureURL}"
                    alt=""
                  />
                </div>
              </div>
              <div
                class="w-full h-full rounded-2xl flex items-center !p-3 justify-between admin__event"
              >
                <div class="text-white text-lg admin__eventName">
                  ${user.username}
                </div>
                <div class="text-white text-lg admin__eventDate">
                  ${user.email}
                </div>
                <div class="text-white text-lg admin__eventVenue">${user.venueName}</div>
                <div class="admin__eventDetailsBtn">
                  <button
                    class="!p-4 rounded-lg border-2 border-white admin__eventDetailsBtn__btn"
                  >
                    <svg
                      fill="#fbfbfb"
                      height="18px"
                      width="18px"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 330 330"
                      xml:space="preserve"
                    >
                      <path
                        id="XMLID_222_"
                        d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
               c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
               C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
               C255,161.018,253.42,157.202,250.606,154.389z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            `;
    usersContainer.appendChild(userCard);
  });
}

const usersBtn = document.querySelector("#admin__usersBtn");

usersBtn.addEventListener("click", (e) => {
  displayUsers();
});

const logOutBtn = document.querySelector("#admin__logoutBtn");

logOutBtn.addEventListener("click", (e) => {
  localStorage.removeItem("user");
  window.location.replace("http://127.0.0.1:5500/");
});

const closeEventForm = document.getElementById("closeEventForm");
const admin__eventForm__div = document.getElementById("admin__eventForm__div");
closeEventForm.addEventListener("click", (e) => {
  admin__eventForm__div.classList.add("hidden");
});

const addEventBtn = document.querySelector("#admin__addEvent");
addEventBtn.addEventListener("click", (e) => {
  admin__eventForm__div.classList.remove("hidden");
});

const admin__eventForm__category = document.getElementById(
  "admin__eventForm__category"
);
async function getCategories() {
  const categories = await getData(`${endpoints.categories}`);
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.name;
    option.textContent = category.name;
    admin__eventForm__category.appendChild(option);
  });
}
getCategories();

const admin__eventForm__venue = document.getElementById(
  "admin__eventForm__venue"
);
async function getVenues() {
  const venues = await getData(`${endpoints.venues}`);
  venues.forEach((venue) => {
    const option = document.createElement("option");
    option.value = venue.name;
    option.setAttribute("venue-address", venue.address);
    option.setAttribute("venue-id", venue.id);
    option.textContent = venue.name;
    admin__eventForm__venue.appendChild(option);
  });
}
getVenues();
