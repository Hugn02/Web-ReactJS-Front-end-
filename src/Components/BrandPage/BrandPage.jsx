import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import Item from '../Item/Item';


const BrandPage = () => {
    const { brand } = useParams(); // Lấy tên hãng từ URL
    const { brandProducts, fetchProductsByBrand } = useContext(ShopContext);

    useEffect(() => {
        fetchProductsByBrand(brand);
    }, [brand]);

    return (
        <div className="brand-page">
            <h1>Sản phẩm của {brand.toUpperCase()}</h1>
            <div className="brand-products">
                {brandProducts[brand]?.length > 0 ? (
                    brandProducts[brand].map((item) => (
                        <Item key={item._id} id={item._id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                    ))
                ) : (
                    <p>Không có sản phẩm nào cho hãng này.</p>
                )}
            </div>
        </div>
    );
};

export default BrandPage;
