import httpService from "./httpservice";
import config from "../config.json";

export async function getRentals() {
  try {
    return httpService.get(`${config.apiEndpoint}/rentals`);
  } catch (exception) {
    console.log(exception);
  }
}

export async function getRental(rentalId) {
  try {
    return httpService.get(`${config.apiEndpoint}/rentals/${rentalId}`);
  } catch (exception) {
    console.log(exception);
  }
}

export async function saveRental(rental) {
  try {
    return httpService.post(`${config.apiEndpoint}/rentals`, rental);
  } catch (exception) {
    console.log(exception);
  }
}

export function updateRental(rental) {
  try {
    return httpService.put(
      `${config.apiEndpoint}/rentals/${rental._id}`,
      rental
    );
  } catch (exception) {
    console.log(exception);
  }
}

export function deleteRental(rental) {
  try {
    return httpService.delete(`${config.apiEndpoint}/rentals/${rental._id}`);
  } catch (exception) {
    console.log(exception);
  }
}
