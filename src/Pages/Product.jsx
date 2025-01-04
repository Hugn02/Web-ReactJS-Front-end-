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
        if (all_product.length > 0) {
            const product = all_product.find((item) => item._id === id);
            setCurrentProduct(product);
        }
    }, [id, all_product]);

    console.log("Params from URL:", { id });
    console.log("Current Product:", currentProduct);

    if (!id) {
        return <p>Không tìm thấy sản phẩm. Vui lòng thử lại!</p>;
    }else if(!currentProduct){
        return <p>Đang tải sản phẩm...</p>;
    }

    return (
        <div>
            <ProductDisplay product={currentProduct} />
            <DescriptionBox product={currentProduct} />
            <RelatedProducts product={currentProduct} />
        </div>
    );
};

export default Product;
