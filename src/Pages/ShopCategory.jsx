import React, { useContext, useEffect, useState } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'


const ShopCategory = (props) => {
    const { all_product, search, showSearch } = useContext(ShopContext);
    const [filteredProducts, setFilteredProducts] = useState(all_product); // Tạo state để lưu sản phẩm đã lọc

    const handleSearch = () => {
        let productsCopy = all_product.slice();
        if (showSearch && search) {
            productsCopy = productsCopy.filter(item =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
        }
        setFilteredProducts(productsCopy);  // Cập nhật danh sách đã lọc vào state
    };

    useEffect(() => {
        handleSearch();
    }, [search, showSearch, all_product]); // Thêm `all_product` vào dependency để cập nhật khi dữ liệu thay đổi

    
    const [sortType, setSortType] = useState("");                    // State để lưu kiểu sắp xếp

    useEffect(() => {
        handleSort();
    }, [sortType]); // Cập nhật sắp xếp mỗi khi người dùng thay đổi kiểu sắp xếp

    const handleSort = () => {
        let sorted = [...all_product];
        if (sortType === "price-asc") {
            sorted.sort((a, b) => a.new_price - b.new_price);               // Sắp xếp theo giá tăng dần
        } else if (sortType === "price-desc") {
            sorted.sort((a, b) => b.new_price - a.new_price);               // Sắp xếp theo giá giảm dần
        } else if (sortType === "name-asc") {
            sorted.sort((a, b) => a.name.localeCompare(b.name));    // Sắp xếp theo tên từ A-Z
        } else if (sortType === "name-desc") {
            sorted.sort((a, b) => b.name.localeCompare(a.name));    // Sắp xếp theo tên từ Z-A
        }
        setFilteredProducts(sorted); // Cập nhật danh sách sản phẩm đã sắp xếp
    };

    return (
        <div className='shop-category'>
            <img className='shopcategory-banner' src={props.banner} alt="" />
            <div className="shopcategory-indexSort">
                <p>
                    <span>Trang 1-12</span> trong 36 sản phẩm
                </p>
                <div className="product-sort-container">
                <select onChange={(e) => setSortType(e.target.value)}>
                <option value="">Chọn kiểu sắp xếp</option>
                <option value="price-asc">Giá: Thấp đến Cao</option>
                <option value="price-desc">Giá: Cao đến Thấp</option>
                <option value="name-asc">Tên: A-Z</option>
                <option value="name-desc">Tên: Z-A</option>
            </select>
            
                </div>
            </div>
            <div className="shopcategory-products">
                {filteredProducts.map((item,i)=>{
                    if(props.category===item.category){
                        return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
                    }
                    else{
                        return null;
                    }
                })}
               
            </div>
            
            <div className="shopcategory-loadmore">
                Xem thêm
            </div>
        </div>
    )
}

export default ShopCategory