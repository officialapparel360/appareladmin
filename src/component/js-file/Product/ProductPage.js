import React, { useEffect, useState } from "react";
import "../../css-file/ProductPage.css";
import AddProductModal from "./AddProductPage";
import ProductList from "./ProductList";

const ProductPage = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await fetch("http://apparels360.in/api/Product/GetProductList");
            const data = await response.json();
            setProducts(data.data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("⚠️ Warning:\n\nOnce this product is deleted, all associated data will be permanently lost and cannot be recovered.\n\nAre you sure you want to delete this product?")) return;

        try {
            await fetch("http://apparels360.in/api/Product/Delete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id
                })
            });
            fetchProducts();
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const [showAddModal, setShowAddModal] = useState(false);


    return (
        <div className="product-page">
            <div className="product-header">
                <h2>Products</h2>
                <button className="add-btn"
                    onClick={() => setShowAddModal(true)}
                >
                    ➕ Add Product
                </button>
            </div>

            {showAddModal && (
                <AddProductModal
                    onClose={() => setShowAddModal(false)}
                    onSuccess={() => {
                        fetchProducts();
                        setShowAddModal(false);
                    }}
                />
            )}

            <ProductList
                handleDelete={handleDelete}
                products={products}
            />
        </div>
    );
};

export default ProductPage;
