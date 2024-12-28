import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { ShopContext } from '../../Context/ShopContext';
import axios from 'axios';
import parcel_icon from '../../Components/Assets/parcel_icon.png'
const MyOrders = () => {

    const {url,token} = useContext(ShopContext);
    const [data,setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
        setData(response.data.data); 
    }
    useEffect(()=>{
        if (token) {
            fetchOrders();
        }
    },[token])

    return (
        <div className='my-orders'>
            <h2>Đơn đã mua</h2>
            <div className="container">
                {data.map((order,index)=>{
                    return (
                        <div key={index} className='my-orders-order'>
                            <img src={parcel_icon} alt="" />
                            <p>{order.items.map((item,index)=>{
                                if(index === order.items.length - 1){
                                    return item.name+" X "+item.quantity
                                }else{
                                     return item.name+" X "+item.quantity+", "
                                }
                            })}</p>
                            <p>${order.totalAmount}.00</p>
                            <p>Sản phẩm: {order.items.length}</p>
                            <p><span>&#x25cf;</span><b>{order.status}</b></p>
                            <button onClick={fetchOrders}>Theo dõi đơn hàng</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyOrders