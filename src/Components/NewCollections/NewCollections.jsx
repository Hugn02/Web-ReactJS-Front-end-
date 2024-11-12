import React, { useEffect, useRef } from 'react'
import './NewCollections.css'
import new_collection from '../Assets/new_collections'
import Item from '../Item/Item'
import { useLocation } from 'react-router-dom'

const NewCollections = () => {
    const scrollToRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        // Kiểm tra nếu URL chứa hash và phần tử mục tiêu tồn tại
        if (location.hash === scrollToRef.current) {
            scrollToRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [location]);
    return (
        <div ref={scrollToRef} className='new-collections'>
            <h1>Bộ sưu tập mới nhất</h1>
            <hr />
            <div className="collections">
                {new_collection.map((item,i)=>{
                   return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
                })}
            </div>
        </div>
    )
}

export default NewCollections