import React from "react";
import Form from "./common/form";
import HorizontalDivider from "./common/horizontalDivider";
import httpService from "../services/httpservice";
import config from "../config.json";
import { Navigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Compressor from "compressorjs";
const Joi = require("joi-browser");
const ObjectId = require("bson-objectid");

// login form extends form to get all its methods
class ProductForm extends Form {
  // initialize email and password fields to be empy and to have no errors
  state = {
    data: this.props.placeholders
      ? {
          title: this.props.placeholders.title,
          description: this.props.placeholders.description,
          fileName: this.props.placeholders.fileName,
          price: this.props.placeholders.price.toString(),
          stock: this.props.placeholders.stock.toString(),
          imageSrc: this.props.placeholders.imageSrc,
          // add filename here
        }
      : {
          title: "",
          description: "",
          fileName: "",
          price: "",
          stock: "",
          imageSrc: "",
        },
    errors: {},
    navigate: false,
  };

  schema = {
    title: Joi.string().required().min(3).label("Title"),
    description: Joi.string().required().min(5).label("Description"),
    fileName: Joi.string(),
    price: Joi.string()
      .regex(/^[0-9]+$/)
      .required()
      .label("Price"),
    stock: Joi.string()
      .regex(/^[0-9]+$/)
      .required()
      .label("Stock"),
    imageSrc: Joi.any().required().label("Thumbnail"),
  };

  componentDidMount() {
    if (this.props.placeholders) {
      // set initial data
      const { placeholders } = this.props;
      this.setState({ data: placeholders });
      // populate the thumbnail
      const fileInput = document.querySelector('input[type="file"]');
      // take array from props
      const arr = this.props.placeholders.imageSrc.data;
      // convert to uint8array
      const uArray = new Uint8Array(arr);
      // convert uint8array to blob
      const blob = new Blob(uArray, {
        type: "image/jpeg",
      });
      // convert blob to file
      const myFile = new File([blob], `${this.props.placeholders.fileName}`, {
        type: "image/jpeg",
      });
      // create datatransfer
      const dataTransfer = new DataTransfer();
      // add file to datatransfer
      dataTransfer.items.add(myFile);
      // set file input to files in datatransfer
      fileInput.files = dataTransfer.files;
    }
  }

  // form.jsx component requires the submit function to be called doSubmit
  doSubmit = async () => {
    const data = { ...this.state.data };
    if (!this.props.placeholders) {
      // compress file
      new Compressor(data.imageSrc, {
        quality: 0.8,
        success: async (result) => {
          // convert to proper format
          let reader = new FileReader();
          reader.readAsArrayBuffer(result);
          reader.onload = async () => {
            const file = Array.from(new Uint8Array(reader.result));
            const product = {
              _id: ObjectId(),
              title: data.title,
              fileName: data.fileName,
              description: data.description,
              price: data.price,
              stock: data.stock,
              imageSrc: file,
            };
            try {
              this.props.addProduct(product);
              const response = await httpService.post(
                `${config.apiEndpoint}/products`,
                product
              );
              if (response.status === 200)
                toast.success(
                  `Successfully Added ${product.title} To Products!`
                );
              else {
                this.props.removeProduct();
                toast.error("An Error Occurred. Please Try Again Later.");
              }
            } catch (exception) {
              this.props.removeProduct();
              toast.error("An Error Occurred. Please Try Again Later.");
            }
          };
        },
        error: (error) => {
          toast.error(
            "An Error Occurred While Compressing Image. Please Try Again Later."
          );
          console.log(error);
        },
      });
    } else {
      // compress file
      new Compressor(data.imageSrc, {
        quality: 0.8,
        success: async (result) => {
          // convert to proper format
          let reader = new FileReader();
          reader.readAsArrayBuffer(result);
          reader.onload = async () => {
            const file = Array.from(new Uint8Array(reader.result));
            // result has the compressed file.
            const product = {
              _id: this.props.placeholders._id,
              title: data.title,
              fileName: data.fileName,
              description: data.description,
              price: data.price,
              stock: data.stock,
              imageSrc: result,
            };
            try {
              const response = await httpService.put(
                `${config.apiEndpoint}/products/${this.props.placeholders._id}`,
                product
              );
              if (response.status === 200)
                toast.success(`Updated ${product.title} Successfully!`);
              else toast.error("An Error Occurred. Please Try Again Later");
              this.setState({ navigate: true });
            } catch (exception) {
              toast.error("An Error Occurred. Please Try Again Later");
            }
          };
        },
        error: (error) => {
          toast.error(
            "An Error Occurred While Compressing Image. Please Try Again Later."
          );
          console.log(error);
        },
      });
    }
  };

  render() {
    return (
      <div classtype="container">
        {this.state.navigate ? <Navigate to="/products" /> : console.log("")}
        {
          // Submission handler
        }
        <form onSubmit={this.handleSubmit}>
          {
            // inputs
          }
          {this.renderInput("title", "Title")}
          {this.renderInput("description", "Description")}
          {this.renderInput("price", "Price")}
          {this.renderInput("stock", "Stock")}
          {this.renderFileUpload("fileName")}
          <HorizontalDivider />
          <div className="text-center">
            {
              // renderButton is also part of "this" now
              this.renderButton("Submit", "btn btn-success")
            }
            <Link to="/products">
              <button
                type="button"
                className="btn btn-danger ms-2"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default ProductForm;
