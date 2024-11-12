import React, { useEffect, useState } from 'react'
import './RelatedProducts.css'
import data1_product from '../Assets/data1'
import Item from '../Item/Item'

const RelatedProducts = (props) => {
    const [filteredProducts, setFilteredProducts] = useState(data1_product,props);

    const handleSearch = () => {
        if (props.product) {  // Kiểm tra nếu `currentProduct` tồn tại
            const productsCopy = data1_product.filter(
                item => item.category === props.product.category && item.id !== props.product.id
            );
            setFilteredProducts(productsCopy);  // Cập nhật danh sách đã lọc vào state
        }
    };

    useEffect(() => {
        handleSearch();
    }, [props.product]);
    
    return (
        <div className='relatedproducts'>
            <h1>Sản phẩm cùng hãng</h1>
            <hr />
            <div className="relatedproducts-item">
            {filteredProducts.map((item, i) => (
                    <Item 
                        key={i} 
                        id={item.id} 
                        name={item.name} 
                        image={item.image} 
                        new_price={item.new_price} 
                        old_price={item.old_price} 
                    />
                ))}
            </div>
        </div>
    )
}

export default RelatedProducts