import React from 'react'
import './OurPolicy.css'
import exchange_icon from '../Assets/exchange_icon.png'
import quality_icon from '../Assets/quality_icon.png'
import support_icon from '../Assets/support_img.png'
const OurPolicy = () => {
    return (
        <div className="custom-container">
            <div>
                <img src={exchange_icon} className='custom-element' alt="" />
                <p className='custom-text'>Chính sách đổi trả dễ dàng</p>
                <p className='custom-text1'>Chúng tôi cung cấp chính sách đổi trả dễ dàng</p>
            </div>
            <div>
                <img src={quality_icon} className='custom-element' alt="" />
                <p className='custom-text'>Chính sách trả hàng trong vòng 7 ngày</p>
                <p className='custom-text1'>Chúng tôi cung cấp chính sách trả hàng miễn phí trong 7 ngày</p>
            </div>
            <div>
                <img src={support_icon} className='custom-element' alt="" />
                <p className='custom-text'>Hỗ trợ khách hàng tốt nhất</p>
                <p className='custom-text1'>Chúng tôi cung cấp dịch vụ hỗ trợ khách hàng 24/7</p>
            </div>
        </div>
    )
}

export default OurPolicy