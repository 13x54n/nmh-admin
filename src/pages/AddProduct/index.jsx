import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useNavigate } from "react-router-dom";
import CategoryList from "../../utils/Categories.json";
import "./style.css";

const fileTypes = ["JPG", "PNG", "WEBP", "JPEG"];

export default function AddProduct() {
  const [file, setFile] = useState(null);

  const handleFileChange = async (file) => {
    setFile(file);
  };

  const [option, setOptions] = useState([
    { name: "Veg" },
    { name: "Chicken", price: 1.0 },
  ]);

  const [optionName, setOptionName] = useState("");
  const [optionPrice, setOptionPrice] = useState("");

  const handleNewOption = (e) => {
    e.preventDefault();

    const newOption = {
      name: optionName,
      price: optionPrice,
    };

    setOptions((prevOptions) => [...prevOptions, newOption]);

    // Reset optionName and optionPrice
    setOptionName("");
    setOptionPrice("");
  };

  const handleDeleteOption = (e, index) => {
    e.preventDefault();
    setOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions.splice(index, 1);
      return updatedOptions;
    });
  };

  const navigate = useNavigate();

  // form handling
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [sellingPrice, setSellingPrice] = useState(0);
  const [category, setCategory] = useState(CategoryList[0]);

  const handleSaveProduct = async (e) => {
    e.preventDefault();

    // Create a new FormData object
    const formData = new FormData();

    // Append the product data to the FormData object
    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("price", sellingPrice);
    formData.append("category", JSON.stringify(category));
    formData.append("image", file);
    formData.append(`options`, JSON.stringify(option));

    console.log(formData);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URI}/product`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Product saved successfully
        const data = await response.json();
        console.log(data);
      } else {
        // Handle the error condition
        console.log("Error saving product");
      }
    } catch (error) {
      console.log("Error saving product", error);
    }
  };

  return (
    <div className="mx-[5vw] py-5 text-sm addProduct__container">
      <div className="flex flex-row align-middle justify-between">
        <div className="flex flex-row gap-2">
          <p className="font-medium text-lg">Add Product</p>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-800 text-md text-white px-3"
          >
            back
          </button>
        </div>
      </div>

      <form className="mt-3">
        <table>
          <tbody>
            <tr className="flex flex-row items-top gap-4">
              <td className="flex flex-col gap-2 flex-1 w-[50%]">
                <label className="text-sm" htmlFor="">
                  Product Image
                </label>

                <FileUploader
                  handleChange={handleFileChange}
                  name="file"
                  types={fileTypes}
                  className="imageUploader"
                />

                <label className="text-sm" htmlFor="">
                  Product Name
                </label>
                <input
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="border p-2"
                  type="text"
                  placeholder="e.g. Air Jordan 1"
                />
                <label className="text-sm" htmlFor="">
                  Product Description
                </label>
                <textarea
                  name=""
                  id=""
                  cols="70"
                  rows="3"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                ></textarea>
                <label className="text-sm" htmlFor="">
                  Selling Price
                </label>
                <input
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value)}
                  className="border p-2"
                  type="number"
                  placeholder="0"
                />
              </td>
              <td className="flex flex-col gap-2 flex-1 w-[50vw]">
                <label className="text-sm" htmlFor="">
                  Categories
                </label>
                <select
                  className="border p-2"
                  name=""
                  id=""
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {CategoryList.map((d, i) => (
                    <option value={d.key} key={i}>
                      {d.name}
                    </option>
                  ))}
                </select>
                <label className="text-sm" htmlFor="">
                  Product Options (e.g. Veg, Chicken)
                </label>

                {option.map((item, index) => {
                  return (
                    <div
                      className="bg-gray-100 p-2 text-sm flex flex-row items-center justify-between"
                      key={index}
                    >
                      <div>
                        {item.name} {item.price && <>- ${item.price}</>}
                      </div>
                      <button
                        className="text-[red]"
                        onClick={(e) => handleDeleteOption(e, index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  );
                })}

                <label htmlFor="Name">Name</label>
                <input
                  type="text"
                  value={optionName}
                  onChange={(e) => setOptionName(e.target.value)}
                  placeholder="Name"
                />
                <label htmlFor="Price">Price</label>
                <input
                  type="number"
                  value={optionPrice}
                  onChange={(e) => setOptionPrice(e.target.value)}
                  placeholder="0"
                />
                <button
                  onClick={(e) => handleNewOption(e)}
                  className="text-white bg-black py-3"
                >
                  Add Option
                </button>

                <button
                  onClick={(e) => handleSaveProduct(e)}
                  className="bg-purple-600 text-white py-2"
                >
                  Save Product
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
