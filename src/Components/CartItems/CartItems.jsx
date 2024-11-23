import React, { useContext } from 'react'
import './CartItems.css'
import {ShopContext} from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'
import { useNavigate } from 'react-router-dom'
import add_product from '../Assets/add_icon_green.png'
import remove_product from '../Assets/remove_icon_red.png'

const CartItems = () => {
    const {getTotalCartAmount,all_product,cartItems,removeFromCart,addToCart,removeToCart,increaseQuantity} = useContext(ShopContext);
    const navigate = useNavigate();
    
    
    const handleCheckout = () => {
        if (Object.keys(cartItems).length === 0) {
          alert("Giỏ hàng của bạn hiện đang trống!");
          return;
        }
        navigate('/shipping');
      };
    //   const applyPromoCode = (code) => {
    //     const discount = code === "SALE20" ? 0.2 : 0; // Giảm giá 20% nếu mã đúng
    //     setTotal((prevTotal) => prevTotal - prevTotal * discount);
    //     alert(discount > 0 ? "Áp dụng mã giảm giá thành công!" : "Mã giảm giá không hợp lệ.");
    //   };
    return (
        <div className="cartitems">
            <div className="cartitems-format-main">
                <p>Sản phẩm</p>
                <p>Tên sản phẩm</p>
                <p>Giá</p>
                <p>Size</p>
                <p className="hidden-text">Tăng</p>
                <p>Số lượng</p>
                <p className="hidden-text">Giảm</p>
                <p>Tổng</p>
                <p>Xóa</p>
            </div>
            <hr />
            
            {all_product.map((e) => {
  const cartItem = cartItems[e.id];
  if (cartItem && cartItem.quantity > 0) {
    return (
      <div key={e.id}>
        <div className="cartitems-format cartitems-format-main">
          <img src={cartItem.image} alt="" className="carticon-product-icon" />
          <p>{cartItem.name}</p>
          <p>${cartItem.new_price}</p>
          <p>{cartItem.selectedSize || "Chưa chọn size"}</p>
          <img
            className="icon"
            src={add_product}
            onClick={() => increaseQuantity(e.id)} // Gọi hàm tăng số lượng
            alt=""
          />
          <button className="cartitems-quantity">{cartItem.quantity}</button>
          <img
            className="icon"
            src={remove_product}
            onClick={() => removeToCart(e.id)} // Gọi hàm giảm số lượng
            alt=""
          />
          <p>${cartItem.new_price * cartItem.quantity}</p>
          <img
            className="cartitems-remove-icon"
            src={remove_icon}
            onClick={() => removeFromCart(e.id)} // Xóa sản phẩm
            alt=""
          />
        </div>
        <hr />
      </div>
    );
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
                     <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>

                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Tổng</h3>
                            <h3>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</h3>
                        </div>
                    </div>
                    <button onClick={handleCheckout}>Mua hàng</button>



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