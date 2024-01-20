import httpService from "./httpservice";

export async function getRentals() {
  try {
    return httpService.get(`${process.env.REACT_APP_API_ENDPOINT}/rentals`);
  } catch (exception) {
    console.log(exception);
  }
}

export async function getRental(rentalId) {
  try {
    return httpService.get(
      `${process.env.REACT_APP_API_ENDPOINT}/rentals/${rentalId}`
    );
  } catch (exception) {
    console.log(exception);
  }
}

export async function saveRental(rental) {
  try {
    return httpService.post(
      `${process.env.REACT_APP_API_ENDPOINT}/rentals`,
      rental
    );
  } catch (exception) {
    console.log(exception);
  }
}

export function updateRental(rental) {
  try {
    return httpService.put(
      `${process.env.REACT_APP_API_ENDPOINT}/rentals/${rental._id}`,
      rental
    );
  } catch (exception) {
    console.log(exception);
  }
}

export function deleteRental(rental) {
  try {
    return httpService.delete(
      `${process.env.REACT_APP_API_ENDPOINT}/rentals/${rental._id}`
    );
  } catch (exception) {
    console.log(exception);
  }
}
