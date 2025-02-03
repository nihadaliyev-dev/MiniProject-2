import { BASE_URL, endpoints } from "../../constants/constants.js";
import { getData } from "../../services/services.js";
async function addEvent(event) {
  const data = await axios.post(`${BASE_URL}/${endpoints.events}`, event);
}

const admin__eventForm = document.querySelector("#admin__eventForm");

admin__eventForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const category = document.querySelector("#admin__eventForm__category").value;
  const name = document.querySelector("#admin__eventForm__name").value;
  const dateTime = document.querySelector("#admin__eventForm__date").value;
  const description = document.querySelector(
    "#admin__eventForm__description"
  ).value;
  const venue = document.querySelector("#admin__eventForm__venue").value;
  const venueAddress = document.querySelector(
    "#admin__eventForm__venue"
  ).selected;

  const image = document.querySelector("#admin__eventForm__image").files[0];
  const organizer = document.querySelector(
    "#admin__eventForm__organizer"
  ).value;
  const ticketCount = document.querySelector(
    "#admin__eventForm__avaiableTickets"
  );
  const ticketPrice = document.querySelector("#admin__eventForm__price");
  const eventDuration = document.querySelector("#admin__eventForm__duration");
  const eventAgeRestriction = document.querySelector(
    "#admin__eventForm__ageRestriction"
  );

  const newEvent = {
    category,
    name,
    dateTime,
    description,
    venue,
    venueAddress,
    image,
    ticketPrice,
    ticketCount,
    eventDuration,
    eventAgeRestriction,
    organizer,
  };

  addEvent(newEvent).then((response) => {
    console.log(response.data); // do something with the response data
  });

  admin__eventForm.classList.add("hidden");
});
