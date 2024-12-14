import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const { all_product } = useContext(ShopContext); // Lấy danh sách sản phẩm từ context
    const [currentProduct, setCurrentProduct] = useState(null);

    // Tìm sản phẩm với id tương ứng từ all_product
    useEffect(() => {
        const product = all_product.find((item) => item.id === id);
        setCurrentProduct(product); // Cập nhật sản phẩm hiện tại
    }, [id, all_product]);

    console.log("Product ID from URL:", id); // Kiểm tra ID
    console.log("Current Product:", currentProduct); // Kiểm tra dữ liệu sản phẩm

    if (!currentProduct) {
        return <p>Đang tải sản phẩm...</p>; // Hiển thị nếu sản phẩm chưa được tìm thấy
    }

    return (
        <div>
            <ProductDisplay product={currentProduct} /> {/* Truyền dữ liệu sản phẩm vào ProductDisplay */}
            <DescriptionBox product={currentProduct} /> {/* Truyền dữ liệu sản phẩm vào DescriptionBox */}
            <RelatedProducts product={currentProduct} /> {/* Truyền dữ liệu sản phẩm vào RelatedProducts */}
        </div>
    );
};

export default Product;
