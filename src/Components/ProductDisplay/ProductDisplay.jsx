// src/Components/ProductDisplay/ProductDisplay.jsx

import React, { useContext, useEffect, useState } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import cart_credit from '../Assets/cart_credit.png';
import cart_truck from '../Assets/cart_truck.png';
import cart_shieldcheck from '../Assets/cart_shieldcheck.png';
import arrow_icon from '../Assets/breadcrum_arrow.png';

const ProductDisplay = ({ product }) => {
    const { addToCart } = useContext(ShopContext);

    const [selectedSize, setSelectedSize] = useState("");

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Vui lòng chọn kích thước!");
            return;
        }

        addToCart(product._id, selectedSize, {
            id: product._id, // Sử dụng _id thay vì id nếu cần
            name: product.name,
            new_price: product.new_price,
            image: product.image,
            selectedSize,
        });
        alert("Đã thêm vào giỏ hàng!");
    };

    return (
        <div>
            {/* Breadcrumb */}
            <div className='breadcrum'>
                Trang chủ <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> {product.category} <img src={arrow_icon} alt="" /> {product.name}
            </div>

            <div className="productdisplay">
                <div className="productdisplay-left">
                    <div className="productdisplay-img-list">
                        {[...Array(4)].map((_, idx) => (
                            <img key={idx} src={product.image} alt="" />
                        ))}
                    </div>
                    <div className="productdisplay-img">
                        <img className="productdisplay-main-img" src={product.image} alt="" />
                    </div>
                </div>
                <div className="productdisplay-right">
                    <h1>{product.name}</h1>
                    <div className="productdisplay-right-stars">
                        {[...Array(4)].map((_, idx) => <img key={idx} src={star_icon} alt="star" />)}
                        <img src={star_dull_icon} alt="star-dull" />
                        <p>(122)</p>
                    </div>
                    <div className="productdisplay-right-prices">
                        <div className="productdisplay-right-price-old">${product.old_price}</div>
                        <div className="productdisplay-right-price-new">${product.new_price}</div>
                    </div>
                    <div className="productdisplay-right-description">
                        <p><img className="pro-policy-icon" src={cart_shieldcheck} alt="" /><span>Hàng chất lượng cao</span></p>
                        <p><img className="pro-policy-icon" src={cart_truck} alt="" /><span>Giao hàng toàn quốc</span></p>
                        <p><img className="pro-policy-icon" src={cart_credit} alt="" /><span>Miễn phí dùng thẻ</span></p>
                    </div>
                    <div className="productdisplay-right-size">
                        <h1>Size</h1>
                        <div>
                            {product.sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    style={{
                                        background: selectedSize === size ? "lightblue" : "#eaeaea",
                                        color: "black",
                                        fontSize: "16px",
                                        margin: "10px 10px 30px 0",
                                        padding: "10px",
                                        borderRadius: "5px",
                                        width: "50px",
                                        textAlign: "center",
                                    }}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button 
                        onClick={handleAddToCart} 
                        disabled={!selectedSize}
                        style={{
                            backgroundColor: !selectedSize ? "gray" : "red",
                            color: "white",
                            padding: "20px 20px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: !selectedSize ? "not-allowed" : "pointer",
                        }}
                    >
                        Thêm giỏ hàng
                    </button>
                    <p className="productdisplay-right-category"><span>Loại:</span> Metal Build Action Figure, Model Kit Figure, Chibi Figure, Blindbox Figure</p>
                    <p className="productdisplay-right-category"><span>Nhãn:</span> #motornuclear, #inera, #moshow</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDisplay;
