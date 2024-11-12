import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'
import cart_credit from '../Assets/cart_credit.png'
import cart_truck from '../Assets/cart_truck.png'
import cart_shieldcheck from '../Assets/cart_shieldcheck.png'

const ProductDisplay = (props) => {
    const {product} = props;
    const{addToCart} = useContext(ShopContext);
    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">${product.old_price}</div>
                    <div className="productdisplay-right-price-new">${product.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                <p><img className="pro-policy-icon" src={cart_shieldcheck} alt="" /><span>{product.infor1}</span></p>
                <p><img className="pro-policy-icon" src={cart_truck} alt="" /><span>{product.infor2}</span></p>
                <p><img className="pro-policy-icon" src={cart_credit} alt="" /><span>{product.infor3}</span></p>
                </div>
                <div className="productdisplay-right-size">
                    <h1>Size</h1>
                    <div className="productdisplay-right-sizes">
                        <div>SD</div>
                        <div>HG</div>
                        <div>RG</div>
                        <div>MG</div>
                        <div>PG</div>
                    </div>
                </div>
                <button onClick={()=>{addToCart(product.id)}}>Thêm giỏ hàng</button>
                <p className='productdisplay-right-category'><span>Loại :</span>Metal Build Action Figure, Model Kit Figure, Chibi Figure, Blindbox Figure</p>
                <p className='productdisplay-right-category'><span>Nhãn :</span>#motornuclear, #inera, #moshow</p>
            </div>
            
        </div>
        
    )
}

export default ProductDisplay