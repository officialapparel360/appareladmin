import React, { useState } from "react";
import "../../css-file/ProductList.css";

const ProductList = ({ products, handleDelete }) => {
    return (
        <div className="product-gallery">
            {products.length === 0 ? (
                <p className="no-product">No products available</p>
            ) : (
                products.map((p) => <ProductCard key={p.id} product={p} handleDelete={handleDelete} />)
            )}
        </div>
    );
};

const ProductCard = ({ product, handleDelete }) => {
    const [currentImgIndex, setCurrentImgIndex] = useState(0);

    const nextImage = () => {
        setCurrentImgIndex((prev) => (prev + 1) % product.pictures.length);
    };

    const prevImage = () => {
        setCurrentImgIndex((prev) => (prev - 1 + product.pictures.length) % product.pictures.length);
    };

    return (
        <div className="product-card">
            <div className="image-wrapper">
                <img src={product.pictures[currentImgIndex]} alt={""} />
                {/* {product.pictures.length > 1 && (
                    <>
                        <button className="nav-btn left" onClick={prevImage}>◀</button>
                        <button className="nav-btn right" onClick={nextImage}>▶</button>
                    </>
                )} */}
                {product.isSale == 1 ? (
                    <div className="sale-badge">Sale</div>
                ) : null}

            </div>
            <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.shortDetails}</p>
                <div className="price-group">
                    <span className="sale-price">₹{product.salePrice}</span>
                    {product.price > product.salePrice && (
                        <span className="original-price">₹{product.price}</span>
                    )}
                </div>
                <p className="quantity">In stock: {product.stock}</p>
                <button className="delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
        </div>
    );
};

export default ProductList;
