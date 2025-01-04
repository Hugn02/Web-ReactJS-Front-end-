import React, { useContext, useEffect, useState } from 'react'
import './PlaceShipping.css'
import { ShopContext } from '../../Context/ShopContext'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const PlaceShipping = () => {
    const {getTotalCartAmount,token,all_product,cartItems,url,setCartItems} = useContext(ShopContext);
    const navigate = useNavigate();
    const [data,setData] = useState({
          name:"",
          email:"",
          street:"",
          city:"",
          state:"",
          zipcode:"",
          country:"",
          phone:""
        })
    
        const onChangeHandler = (event) => {
          const name = event.target.name;
          const value = event.target.value;
          setData(data=>({...data,[name]:value}))
        }

        const PlaceShipping = async (event) => {
            event.preventDefault();
        
            const orderItems = Object.entries(cartItems)
                .filter(([itemId, itemDetails]) => itemDetails.quantity > 0)
                .map(([itemId, itemDetails]) => {
                    const product = all_product.find((prod) => prod._id === itemId);
                    return {
                        ...itemDetails,
                        name: product?.name || "",
                        new_price: product?.new_price || 0,
                    };
                });
        
            const orderData = {
                customer: data,
                items: orderItems,
                totalAmount: getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2),
            };
        
            try {
                const response = await axios.post(`${url}/api/order/create`, orderData, {
                    headers: { token }, // Truyền token trong headers
                });
        
                if (response.data.success) {
                    alert("Đặt hàng thành công!");
                    navigate("/cart");
                    localStorage.removeItem("cartItems");
                    setCartItems({});
                } else {
                    alert(`Đặt hàng thất bại: ${response.data.message}`);
                }
            } catch (error) {
                console.error("Lỗi khi gửi đơn hàng:", error.response?.data || error.message);
                alert("Đã xảy ra lỗi khi gửi đơn hàng!");
            }
        };
        
        
        useEffect(()=>{
            if (!token) {
                navigate("/cart"); 
            }else if(getTotalCartAmount()===0){
                navigate("/cart");
            }
        },[token])
        
    return(
        <div>
            <form onSubmit={PlaceShipping} className="place-shipping">
                <div className="place-shipping-left">
                    <p className="title">Thông tin giao hàng</p>
                    <div className="multi-fields">
                        <input required name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Họ và tên'/>
                    </div>
                    <div className="multi-fields">
                    <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email'/>
                    <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Địa chỉ'/>
                    </div>
                    <div className="multi-fields">
                        <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='Thành phố'/>
                        <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='Loại địa chỉ'/>
                    </div>
                    <div className="multi-fields">
                        <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Mã bưu chính'/>
                        <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Quốc gia'/>
                    </div>
                    <div className="multi-fields">
                    <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Số điện thoại' />
                    </div>
                </div>
                <div className="place-shipping-right">
                <div className="cartitems-total">
                    <h1>Tổng số giỏ hàng</h1>
                    <div>
                    <div className="cartitems-total-item">
                            <p>Tổng cộng</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Phí vận chuyển</p>
                            <p>${getTotalCartAmount()===0?0:2}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Tổng</h3>
                            <h3>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</h3>
                        </div>
                    </div>
                    <button type='submit'>Đặt hàng</button>
                </div>
                </div>
            </form>
        </div>
    )
}

export default PlaceShipping