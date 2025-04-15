// AddProductPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css-file/ProductPage.css";

const AddProductPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    title: "",
    code: "",
    price: "",
    salePrice: "",
    shortDetails: "",
    description: "",
    quantity: "",
    discount: "",
    isNew: 0,
    isSale: 0,
    categoryId: 0,
    colorId: 0,
    sizeId: 0,
    tagId: 0,
    status: null,
    createdBy: null,
    modifiedBy: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? (checked ? 1 : 0) : value });
  };

  const handleSubmit = async () => {
    try {
      await fetch("http://apparels360.in/api/Product/InsertProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      alert("Product added successfully");
      navigate("/");
    } catch (error) {
      alert("Error adding product");
    }
  };

  return (
    <div className="add-product-page">
      <h2>Add New Product</h2>
      <div className="form-grid">
        {Object.entries({
          name: "Name",
          title: "Title",
          code: "Code",
          price: "Price",
          salePrice: "Sale Price",
          shortDetails: "Short Details",
          description: "Description",
          quantity: "Quantity",
          discount: "Discount",
          categoryId: "Category ID",
          colorId: "Color ID",
          sizeId: "Size ID",
          tagId: "Tag ID",
        }).map(([key, label]) => (
          <div key={key}>
            <label>{label}</label>
            <input name={key} value={form[key]} onChange={handleChange} />
          </div>
        ))}

        <label>
          <input type="checkbox" name="isNew" checked={form.isNew === 1} onChange={handleChange} />
          Is New
        </label>
        <label>
          <input type="checkbox" name="isSale" checked={form.isSale === 1} onChange={handleChange} />
          Is Sale
        </label>
      </div>
      <div className="form-actions">
        <button className="submit-btn" onClick={handleSubmit}>Submit</button>
        <button className="cancel-btn" onClick={() => navigate("/")}>Cancel</button>
      </div>
    </div>
  );
};

export default AddProductPage;
