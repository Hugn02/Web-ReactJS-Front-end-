import React, { useContext } from 'react'
import './PlaceShipping.css'
import { ShopContext } from '../../Context/ShopContext'

const PlaceShipping = () => {
    const {getTotalCartAmount} = useContext(ShopContext);
    return(
        <div>
            <form className="place-shipping">
                <div className="place-shipping-left">
                    <p className="title">Thông tin giao hàng</p>
                    <div className="multi-fields">
                        <input type="text" placeholder='Họ và tên'/>
                    </div>
                    <div className="multi-fields">
                    <input type="email" placeholder='Email'/>
                    <input type="text" placeholder='Địa chỉ'/>
                    </div>
                    <div className="multi-fields">
                        <input type="text" placeholder='Thành phố'/>
                        <input type="text" placeholder='Loại địa chỉ'/>
                    </div>
                    <div className="multi-fields">
                        <input type="text" placeholder='Mã bưu chính'/>
                        <input type="text" placeholder='Quốc gia'/>
                    </div>
                    <div className="multi-fields">
                    <input type="text" placeholder='Số điện thoại' />
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
                    <button>Đặt hàng</button>
                </div>
                </div>
            </form>
        </div>
    )
}

export default PlaceShipping