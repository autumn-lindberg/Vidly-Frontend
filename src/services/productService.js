import httpService from "./httpservice";

export async function getProducts() {
  try {
    return httpService.get(`${process.env.REACT_APP_API_ENDPOINT}/products`);
  } catch (exception) {
    console.log(exception);
  }
}

export async function getProduct(productId) {
  try {
    return httpService.get(
      `${process.env.REACT_APP_API_ENDPOINT}/products/${productId}`
    );
  } catch (exception) {
    console.log(exception);
  }
}

export async function saveProduct(product) {
  try {
    return httpService.post(
      `${process.env.REACT_APP_API_ENDPOINT}/products`,
      product
    );
  } catch (exception) {
    console.log(exception);
  }
}

export function updateProduct(product) {
  try {
    return httpService.put(
      `${process.env.REACT_APP_API_ENDPOINT}/products/${product._id}`,
      product
    );
  } catch (exception) {
    console.log(exception);
  }
}

export function deleteProduct(product) {
  try {
    return httpService.delete(
      `${process.env.REACT_APP_API_ENDPOINT}/products/${product._id}`
    );
  } catch (exception) {
    console.log(exception);
  }
}
