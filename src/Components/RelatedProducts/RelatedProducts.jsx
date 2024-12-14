import React, { useEffect, useState } from 'react';
import './RelatedProducts.css';
import data1_product from '../Assets/data1';  // Dữ liệu sản phẩm
import Item from '../Item/Item';  // Component hiển thị sản phẩm

const RelatedProducts = (props) => {
    const [filteredProducts, setFilteredProducts] = useState([]); // Khởi tạo state rỗng cho filteredProducts

    const handleSearch = () => {
        // Kiểm tra nếu `props.product` tồn tại và có category
        if (props.product && props.product.category) {
            console.log("Category:", props.product.category);  // Log category để kiểm tra giá trị
            // Lọc sản phẩm cùng category nhưng loại bỏ sản phẩm hiện tại
            const productsCopy = data1_product.filter(
                item => item.category === props.product.category && item.id !== String(props.product.id) // Đảm bảo so sánh đúng kiểu chuỗi
            );
            console.log("Filtered Products:", productsCopy);  // Log các sản phẩm đã lọc
            setFilteredProducts(productsCopy);  // Cập nhật state filteredProducts
        } else {
            console.log("Không có dữ liệu sản phẩm");  // Log nếu không có product hoặc category
        }
    };

    // Gọi handleSearch mỗi khi props.product thay đổi
    useEffect(() => {
        handleSearch();
    }, [props.product]);  // Lắng nghe sự thay đổi của props.product

    return (
        <div className='relatedproducts'>
            <h1>Sản phẩm cùng hãng</h1>
            <hr />
            <div className="relatedproducts-item">
                {filteredProducts.length > 0 ? (
                    // Hiển thị các sản phẩm được lọc
                    filteredProducts.map((item, i) => (
                        <Item 
                            key={i} 
                            id={item.id} 
                            name={item.name} 
                            image={item.image} 
                            new_price={item.new_price} 
                            old_price={item.old_price} 
                        />
                    ))
                ) : (
                    <p>Không có sản phẩm cùng hãng</p>  // Nếu không có sản phẩm nào thỏa điều kiện
                )}
            </div>
        </div>
    );
};

export default RelatedProducts;
