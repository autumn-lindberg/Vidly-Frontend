import httpService from "./httpservice";
import config from "../config.json";

export async function getProducts() {
  try {
    return httpService.get(`${config.apiEndpoint}/products`);
  } catch (exception) {
    console.log(exception);
  }
}

export async function getProduct(productId) {
  try {
    return httpService.get(`${config.apiEndpoint}/products/${productId}`);
  } catch (exception) {
    console.log(exception);
  }
}

export async function saveProduct(product) {
  try {
    return httpService.post(`${config.apiEndpoint}/products`, product);
  } catch (exception) {
    console.log(exception);
  }
}

export function updateProduct(product) {
  try {
    return httpService.put(
      `${config.apiEndpoint}/products/${product._id}`,
      product
    );
  } catch (exception) {
    console.log(exception);
  }
}

export function deleteProduct(product) {
  try {
    return httpService.delete(`${config.apiEndpoint}/products/${product._id}`);
  } catch (exception) {
    console.log(exception);
  }
}
