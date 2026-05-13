import React, { useContext } from 'react'
import './Item.css'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

const Item = (props) => {
    const { url } = useContext(ShopContext);
    
    // URL ảnh placeholder khi ảnh thật bị lỗi hoặc không tồn tại
    const placeholderUrl = "https://placehold.co/500x500?text=No+Image";

    // Xử lý URL ảnh: 
    // 1. Nếu props.image là một link tuyệt đối (bắt đầu bằng http), dùng luôn.
    // 2. Nếu là tên file, nối với đường dẫn backend.
    // 3. Nếu không có ảnh, dùng placeholder.
    const imageUrl = props.image 
        ? (props.image.startsWith('http') ? props.image : `${url}/images/${props.image}`) 
        : placeholderUrl;

    return (
        <div className='item'>
            <Link to={`/product/${props.id}`}>
                <img 
                    onClick={() => window.scrollTo(0, 0)} 
                    src={imageUrl} 
                    alt={props.name} 
                    onError={(e) => {
                        if (e.target.src !== placeholderUrl) {
                            e.target.src = placeholderUrl;
                        }
                    }}
                />
            </Link>
            <p>{props.name}</p>
            <div className="item-prices">
                <div className="item-price-new">
                    ${props.new_price}
                </div>
                <div className="item-price-old">
                    ${props.old_price}
                </div>
            </div>

        </div>
    )
}

export default Item