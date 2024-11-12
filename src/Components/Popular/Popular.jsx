import React, { useEffect, useRef } from 'react'
import './Popular.css'
import data_product from '../Assets/data'
import Item from '../Item/Item'
import { useLocation } from 'react-router-dom'

const Popular = () => {

  const scrollToRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        // Kiểm tra nếu URL chứa hash và phần tử mục tiêu tồn tại
        if (location.hash === scrollToRef.current) {
            scrollToRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [location]);
    return (
        <div ref={scrollToRef} className='popular'>
          <h1>Phổ biến ở Motor Nuclear</h1>
          <hr />
          <div className="popular-item">
            {data_product.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
          </div>
        </div>
    )
}

export default Popular