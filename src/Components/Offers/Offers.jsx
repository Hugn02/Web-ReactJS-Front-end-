import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/exclusive_image.png'
import { useNavigate } from 'react-router-dom';

const Offers = () => {

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/populars");
    };

    return (
        <div className='offers'>
            <div className="offers-left">
                <h1>Hàng độc quyền</h1>
                <h1>Dành cho bạn</h1>
                <p>Bán chạy nhất</p>
                <button onClick={handleNavigate}>Xem ngay tại đây</button>
            </div>
            <div className="offers-right">
                <img src={exclusive_image} alt="" />
            </div>
        </div>
    )
}

export default Offers