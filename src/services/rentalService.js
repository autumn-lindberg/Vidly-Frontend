import httpService from "./httpservice";

export async function getRentals() {
  try {
    return httpService.get(`${localStorage.getItem("API_URL")}/rentals`);
  } catch (exception) {
    console.log(exception);
  }
}

export async function getRental(rentalId) {
  try {
    return httpService.get(
      `${localStorage.getItem("API_URL")}/rentals/${rentalId}`
    );
  } catch (exception) {
    console.log(exception);
  }
}

export async function saveRental(rental) {
  try {
    return httpService.post(
      `${localStorage.getItem("API_URL")}/rentals`,
      rental
    );
  } catch (exception) {
    console.log(exception);
  }
}

export function updateRental(rental) {
  try {
    return httpService.put(
      `${localStorage.getItem("API_URL")}/rentals/${rental._id}`,
      rental
    );
  } catch (exception) {
    console.log(exception);
  }
}

export function deleteRental(rental) {
  try {
    return httpService.delete(
      `${localStorage.getItem("API_URL")}/rentals/${rental._id}`
    );
  } catch (exception) {
    console.log(exception);
  }
}
