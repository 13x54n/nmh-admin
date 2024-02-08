import React, { useState } from "react";
import PropTypes from "prop-types";
import RichTextEditor from "react-rte";
import { FileUploader } from "react-drag-drop-files";
import { TagsInput } from "react-tag-input-component";
import { useNavigate } from "react-router-dom";

const fileTypes = ["JPG", "PNG", "WEBP"];

function MyStatefulEditor({ onChange, value, setValue }) {
  const handleOnChange = (newValue) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue.toString("html"));
    }
  };

  return <RichTextEditor value={value} onChange={handleOnChange} />;
}

MyStatefulEditor.propTypes = {
  onChange: PropTypes.func,
};

export default function AddProduct({ setState }) {
  const [value, setValue] = useState(RichTextEditor.createEmptyValue());
  const [file, setFile] = useState(null);

  const handleFileChange = async (file) => {
    setFile(file);
  };

  const [option, setOptions] = useState([
    { name: "Veg" },
    { name: "Chicken", price: 1.0 },
  ]);

  const navigate = useNavigate();

  return (
    <div className="mx-[5vw] py-5 text-sm">
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
        {/* <button className="bg-gray-800 text-white px-3">Bulk Upload</button> */}
      </div>

      <form className="mt-3" action="">
        <table>
          <tbody>
            <tr className="flex flex-row items-top gap-4">
              <td className="flex flex-col gap-2 flex-1 w-[50%]">
                <label className="text-sm" htmlFor="">
                  Product Name
                </label>
                <input
                  className="border p-2"
                  type="text"
                  placeholder="e.g. Air Jordan 1"
                />
                <label className="text-sm" htmlFor="">
                  Product Description
                </label>
                <textarea name="" id="" cols="70" rows="2"></textarea>
                <label className="text-sm" htmlFor="">
                  Selling Price
                </label>
                <input className="border p-2" type="number" placeholder="0" />

                <label className="text-sm" htmlFor="">
                  Status
                </label>
                <select className="border p-2" name="" id="">
                  <option value="">In Stock</option>
                  <option value="">Out of Stock</option>
                </select>

                <button className="bg-purple-600 text-white py-2">
                  Save Product
                </button>
              </td>
              <td className="flex flex-col gap-2 flex-1 w-[50vw]">
                <label className="text-sm" htmlFor="">
                  Product Image
                </label>
                <FileUploader
                  handleChange={handleFileChange}
                  name="file"
                  types={fileTypes}
                />
                <label className="text-sm" htmlFor="">
                  Categories
                </label>
                <select className="border p-2" name="" id="">
                  <option value="">Clothing</option>
                  <option value="">Electronics</option>
                </select>
                <label className="text-sm" htmlFor="">
                  Product Options
                </label>

                {option.map((item, index) => {
                  return (
                    <div
                      className="bg-gray-100 p-2 text-sm flex flex-row items-center justify-between"
                      key={index}
                    >
                      <div>
                        {item.name} {item.price && <>- {item.price}</>}
                      </div>
                      <button className="text-[red]">
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
                <input type="text" placeholder="Name" />
                <label htmlFor="Price">Price</label>
                <input type="text" placeholder="0" />
                <button className="text-white bg-black py-3">Add Option</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
