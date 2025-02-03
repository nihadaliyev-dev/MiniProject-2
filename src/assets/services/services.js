import { BASE_URL, endpoints } from "../constants/constants.js";
async function getData(endpoint) {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`);
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

getData(endpoints.events);

export { getData };
