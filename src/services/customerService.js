import httpService from "./httpservice";

export async function getCustomers() {
  try {
    return httpService.get(`${process.env.REACT_APP_API_ENDPOINT}/customers`);
  } catch (exception) {
    console.log(exception);
  }
}

export async function getCustomer(customerId) {
  try {
    return httpService.get(
      `${process.env.REACT_APP_API_ENDPOINT}/customers/${customerId}`
    );
  } catch (exception) {
    console.log(exception);
  }
}

export async function saveCustomer(customer) {
  try {
    return httpService.post(
      `${process.env.REACT_APP_API_ENDPOINT}/customers`,
      customer
    );
  } catch (exception) {
    console.log(exception);
  }
}

export function updateCustomer(customer) {
  try {
    return httpService.put(
      `${process.env.REACT_APP_API_ENDPOINT}/customers/${customer._id}`,
      customer
    );
  } catch (exception) {
    console.log(exception);
  }
}

export function deleteCustomer(customer) {
  try {
    return httpService.delete(
      `${process.env.REACT_APP_API_ENDPOINT}/customers/${customer._id}`
    );
  } catch (exception) {
    console.log(exception);
  }
}
