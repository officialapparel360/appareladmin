// ProductPage.jsx
import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./css-file/ProductPage.css";

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    //   const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const response = await fetch("http://apparels360.in/api/Product/GetProductList");
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await fetch(`http://apparels360.in/api/Product/Delete?id=${id}`, {
                method: "DELETE",
            });
            fetchProducts();
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="product-page">
            <div className="product-header">
                <h2>Product List</h2>
                <button className="add-btn"
                // onClick={() => navigate("/add-product")}
                >
                    ➕ Add Product
                </button>
            </div>
            {products.length === 0 ? (
                <p className="no-product">No products available</p>
            ) : (
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Short Details</th>
                            <th>Price</th>
                            <th>Sale Price</th>
                            <th>Quantity</th>
                            <th>Is New</th>
                            <th>Is Sale</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(products) && products.map((p) => (
                            <tr key={p.id}>
                                <td>{p.name}</td>
                                <td>{p.shortDetails}</td>
                                <td>₹{p.price}</td>
                                <td>₹{p.salePrice}</td>
                                <td>{p.quantity}</td>
                                <td>{p.isNew ? "Yes" : "No"}</td>
                                <td>{p.isSale ? "Yes" : "No"}</td>
                                <td>
                                    <button className="delete-btn" onClick={() => handleDelete(p.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ProductPage;
