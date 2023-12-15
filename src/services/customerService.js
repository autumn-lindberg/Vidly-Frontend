import httpService from "./httpservice";
import config from "../config.json";

export async function getCustomers() {
  try {
    return httpService.get(`${config.apiEndpoint}/customers`);
  } catch (exception) {
    console.log(exception);
  }
}

export async function getCustomer(customerId) {
  try {
    return httpService.get(`${config.apiEndpoint}/customers/${customerId}`);
  } catch (exception) {
    console.log(exception);
  }
}

export async function saveCustomer(customer) {
  try {
    return httpService.post(`${config.apiEndpoint}/customers`, customer);
  } catch (exception) {
    console.log(exception);
  }
}

export function updateCustomer(customer) {
  try {
    return httpService.put(
      `${config.apiEndpoint}/customers/${customer._id}`,
      customer
    );
  } catch (exception) {
    console.log(exception);
  }
}

export function deleteCustomer(customer) {
  try {
    return httpService.delete(
      `${config.apiEndpoint}/customers/${customer._id}`
    );
  } catch (exception) {
    console.log(exception);
  }
}
