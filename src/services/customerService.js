import httpService from "./httpservice";

export async function getCustomers() {
  try {
    return httpService.get(`${localStorage.getItem("API_URL")}/customers`);
  } catch (exception) {
    console.log(exception);
  }
}

export async function getCustomer(customerId) {
  try {
    return httpService.get(
      `${localStorage.getItem("API_URL")}/customers/${customerId}`
    );
  } catch (exception) {
    console.log(exception);
  }
}

export async function saveCustomer(customer) {
  try {
    return httpService.post(
      `${localStorage.getItem("API_URL")}/customers`,
      customer
    );
  } catch (exception) {
    console.log(exception);
  }
}

export function updateCustomer(customer) {
  try {
    return httpService.put(
      `${localStorage.getItem("API_URL")}/customers/${customer._id}`,
      customer
    );
  } catch (exception) {
    console.log(exception);
  }
}

export function deleteCustomer(customer) {
  try {
    return httpService.delete(
      `${localStorage.getItem("API_URL")}/customers/${customer._id}`
    );
  } catch (exception) {
    console.log(exception);
  }
}
