import httpService from "./httpservice";

export async function getProducts() {
  try {
    return httpService.get(`${localStorage.getItem("API_URL")}/products`);
  } catch (exception) {
    console.log(exception);
  }
}

export async function getProduct(productId) {
  try {
    return httpService.get(
      `${localStorage.getItem("API_URL")}/products/${productId}`
    );
  } catch (exception) {
    console.log(exception);
  }
}

export async function saveProduct(product) {
  try {
    return httpService.post(
      `${localStorage.getItem("API_URL")}/products`,
      product
    );
  } catch (exception) {
    console.log(exception);
  }
}

export function updateProduct(product) {
  try {
    return httpService.put(
      `${localStorage.getItem("API_URL")}/products/${product._id}`,
      product
    );
  } catch (exception) {
    console.log(exception);
  }
}

export function deleteProduct(product) {
  try {
    return httpService.delete(
      `${localStorage.getItem("API_URL")}/products/${product._id}`
    );
  } catch (exception) {
    console.log(exception);
  }
}
