import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
import axios from 'axios';

const Product = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const { all_product, url } = useContext(ShopContext); // Lấy danh sách sản phẩm từ context
    const [currentProduct, setCurrentProduct] = useState(null);
    const [reviews, setReviews] = useState([]);

    // Lấy đánh giá sản phẩm từ API
    const fetchReviews = async (productId) => {
        try {
            const token = localStorage.getItem("token"); // Lấy token từ localStorage
            if (!token) {
                console.error("Token không tồn tại.");
                return;
            }
    
            const response = await axios.get(`${url}/api/review/${productId}`, {
                headers: {
                    token, // Gửi token qua header `token`
                },
            });
    
            if (response.data.success) {
                setReviews(response.data.reviews);
            } else {
                console.error("Không thể lấy đánh giá:", response.data.message);
            }
        } catch (error) {
            console.error("Lỗi khi lấy đánh giá:", error.response?.data || error.message);
        }
    };
    
    // Xác định sản phẩm hiện tại và lấy đánh giá
    useEffect(() => {
        if (all_product.length > 0) {
            const product = all_product.find((item) => item._id === id);
            setCurrentProduct(product);
            if (product) {
                fetchReviews(product._id);
            }
        }
    }, [id, all_product]);

    if (!currentProduct) {
        return <p>Đang tải sản phẩm...</p>;
    }

    return (
        <div>
            <ProductDisplay product={currentProduct} />
            <DescriptionBox reviews={reviews} />
            <RelatedProducts product={currentProduct} />
        </div>
    );
};

export default Product;
