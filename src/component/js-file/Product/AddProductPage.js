import React, { useState } from "react";
import "../../css-file/AddProduct.css";

const AddProductModal = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    Name: "",
    Title: "",
    Code: "",
    Description: "",
    Price: "",
    SalePrice: "",
    ShortDetails: "",
    Quantity: "",
    Discount: "",
    IsNew: 0,
    IsSale: 0,
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? (checked ? 1 : 0) : value });
  };

  const handleFileChange = (e) => {
    setFile(Array.from(e.target.files));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (file) {
      formData.append("Files", file);
    }

    try {
      const response = await fetch("http://apparels360.in/api/Product/Save", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Product added successfully");
        onSuccess();
      } else {
        const errText = await response.text();
        console.error("Error:", errText);
        alert("Error adding product");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add New Product</h3>
        <div className="form-grid">
          {[
            ["Name", "Name"],
            ["Title", "Title"],
            ["Code", "Code"],
            ["Description", "Description"],
            ["Price", "Price"],
            ["SalePrice", "Sale Price"],
            ["ShortDetails", "Short Details"],
            ["Quantity", "Quantity"],
            ["Discount", "Discount"],
          ].map(([key, label]) => (
            <div key={key}>
              <label>{label} </label>
              <input name={key} value={form[key]} onChange={handleChange} />
            </div>
          ))}

          <div>
            <input
              type="file"
              name="Files"
              multiple
              onChange={handleFileChange}
            />
            <button type="submit">Upload Images</button>
            
            {/* <input type="file" onChange={handleFileChange} accept="image/*" /> */}
          </div>

          <label>
            <input
              type="checkbox"
              name="IsNew"
              checked={form.IsNew === 1}
              onChange={handleChange}
            />
            Is New
          </label>

          {/* <label>
            <input
              type="checkbox"
              name="IsSale"
              checked={form.IsSale === 1}
              onChange={handleChange}
            />
            Is Sale
          </label> */}
        </div>

        <div className="form-actions">
          <button className="submit-btn" onClick={handleSubmit}>Submit</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
