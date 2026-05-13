// src/Components/ProductDisplay/ProductDisplay.jsx

import React, { useContext, useState } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
// import star_dull_icon from '../Assets/star_dull_icon.png'; // Không dùng nên bỏ
import { ShopContext } from "../../Context/ShopContext";
import cart_credit from "../Assets/cart_credit.png";
import cart_truck from "../Assets/cart_truck.png";
import cart_shieldcheck from "../Assets/cart_shieldcheck.png";
import arrow_icon from "../Assets/breadcrum_arrow.png";

const ProductDisplay = ({ product }) => {
  // Lấy thêm url từ ShopContext để hiển thị ảnh đúng từ backend
  const { addToCart, url } = useContext(ShopContext);

  const [selectedSize, setSelectedSize] = useState("");

  // Định nghĩa URL ảnh mặc định (Placeholder) - Sử dụng URL tuyệt đối
  const placeholderUrl = "https://placehold.co/500x500?text=No+Image";

  // Tạo URL ảnh đầy đủ
  const imageUrl = product.image 
    ? (product.image.startsWith('http') || product.image.startsWith('/static') ? product.image : `${url}/images/${product.image}`) 
    : placeholderUrl;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Vui lòng chọn kích thước!");
      return;
    }

    addToCart(product._id, selectedSize, {
      id: product._id,
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
      <div className="breadcrum">
        Trang chủ <img src={arrow_icon} alt="" />
        SHOP <img src={arrow_icon} alt="" />
        {product.category} <img src={arrow_icon} alt="" />
        {product.name}
      </div>

      <div className="productdisplay">
        <div className="productdisplay-left">
          {/* Thumbnail images */}
          <div className="productdisplay-img-list">
            {[...Array(4)].map((_, idx) => (
              <img
                key={idx}
                src={imageUrl}
                alt={product.name}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ))}
          </div>

          {/* Main image */}
          <div className="productdisplay-img">
            <img
              className="productdisplay-main-img"
              src={imageUrl}
              alt={product.name}
              onError={(e) => {
                // Kiểm tra để tránh vòng lặp vô tận nếu ảnh placeholder cũng lỗi
                if (e.target.src !== placeholderUrl) {
                  e.target.src = placeholderUrl;
                }
              }}
            />
          </div>
        </div>

        <div className="productdisplay-right">
          <h1>{product.name}</h1>

          {/* Rating */}
          <div className="productdisplay-right-stars">
            {[...Array(5)].map((_, idx) => (
              <img key={idx} src={star_icon} alt="star" />
            ))}
          </div>

          {/* Prices */}
          <div className="productdisplay-right-prices">
            <div className="productdisplay-right-price-old">
              ${product.old_price}
            </div>
            <div className="productdisplay-right-price-new">
              ${product.new_price}
            </div>
          </div>

          {/* Description */}
          <div className="productdisplay-right-description">
            <p>
              <img className="pro-policy-icon" src={cart_shieldcheck} alt="" />
              <span>Hàng chất lượng cao</span>
            </p>
            <p>
              <img className="pro-policy-icon" src={cart_truck} alt="" />
              <span>Giao hàng toàn quốc</span>
            </p>
            <p>
              <img className="pro-policy-icon" src={cart_credit} alt="" />
              <span>Miễn phí dùng thẻ</span>
            </p>
          </div>

          {/* Size selection */}
          <div className="productdisplay-right-size">
            <h1>Size</h1>
            <div>
              {(product.sizes || []).map((size) => (
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
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            disabled={(product.sizes || []).length > 0 && !selectedSize}
            style={{
              backgroundColor:
                (product.sizes || []).length > 0 && !selectedSize
                  ? "gray"
                  : "red",
              color: "white",
              padding: "20px",
              border: "none",
              borderRadius: "5px",
              cursor:
                (product.sizes || []).length > 0 && !selectedSize
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            Thêm giỏ hàng
          </button>

          <p className="productdisplay-right-category">
            <span>Loại:</span> Metal Build Action Figure, Model Kit Figure,
            Chibi Figure, Blindbox Figure
          </p>

          <p className="productdisplay-right-category">
            <span>Nhãn:</span> #motornuclear, #inera, #moshow
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
