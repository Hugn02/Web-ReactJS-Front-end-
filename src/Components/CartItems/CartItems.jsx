import React, { useContext } from 'react'
import './CartItems.css'
import {ShopContext} from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'
import { useNavigate } from 'react-router-dom'
import add_product from '../Assets/add_icon_green.png'
import remove_product from '../Assets/remove_icon_red.png'

const CartItems = () => {
    const {getTotalCartAmount,all_product,cartItems,removeFromCart,addToCart,removeToCart} = useContext(ShopContext);
    const navigate = useNavigate();
    return (
        <div className="cartitems">
            <div className="cartitems-format-main">
                <p>Sản phẩm</p>
                <p>Tên sản phẩm</p>
                <p>Giá</p>
                <p className="hidden-text">Tăng</p>
                <p>Số lượng</p>
                <p className="hidden-text">Giảm</p>
                <p>Tổng</p>
                <p>Xóa</p>
            </div>
            <hr />
            {all_product.map((e)=>{
                if(cartItems[e.id]>0){
                    return <div>
                    <div className="cartitems-format cartitems-format-main">
                        <img src={e.image} alt="" className='carticon-product-icon' />
                        <p>{e.name}</p>
                        <p>${e.new_price}</p>
                        <img className='icon' src={add_product} onClick={()=>{addToCart(e.id)}} alt="" />
                        <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                        <img className='icon' src={remove_product} onClick={()=>{removeToCart(e.id)}} alt="" />
                        <p>${e.new_price*cartItems[e.id]}</p>
                        <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
                    </div>
                    <hr />
                </div>
                }
                return null;
            })}
            <div className="cartitems-down">
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
                    <button onClick={()=>navigate('/shipping')}>Mua hàng</button>
                </div>
                <div className="cartitems-promocode">
                    <p>Nếu bạn có mã giảm giá, Nhập mã tại đây</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder='Nhập mã' />
                        <button>Đặt hàng</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems