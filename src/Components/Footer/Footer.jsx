import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo_big.png'
import fb_icon from '../Assets/facebook_icon.png'
import instagram_icon from '../Assets/instagram_icon.png'
import tiktok_icon from '../Assets/tiktok_icon.png'

const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer-logo">
                <img src={footer_logo} alt="" />
                <p>GunĐàm</p>
            </div>
            <ul className="footer-links">
                <li>Công ty</li>
                <li>Sản phẩm</li>
                <li>Văn phòng</li>
                <li>Thông tin</li>
                <li>Liên hệ</li>
            </ul>
            <div className="footer-social-icon">
                <div className="footer-icons-container">
                <a
        href="https://www.facebook.com/profile.php?id=100011586374194" // Thay bằng URL Facebook của bạn
        target="_blank" // Mở liên kết trong tab mới
        rel="noopener noreferrer" // Đảm bảo an toàn cho liên kết
        aria-label="Facebook"
      >
                    <img src={fb_icon} alt="Facebook" />
                    </a>
                </div>
                <div className="footer-icons-container">
                <a
        href="https://www.instagram.com/duongvanhung2002.hn/" // Thay bằng URL Facebook của bạn
        target="_blank" // Mở liên kết trong tab mới
        rel="noopener noreferrer" // Đảm bảo an toàn cho liên kết
        aria-label="Instagram"
      >
                    <img src={instagram_icon} alt="Instagram" />
                    </a>
                </div>
                <div className="footer-icons-container">
                <a
        href="https://www.tiktok.com/@user4157124300746" // Thay bằng URL Facebook của bạn
        target="_blank" // Mở liên kết trong tab mới
        rel="noopener noreferrer" // Đảm bảo an toàn cho liên kết
        aria-label="TikTok"
      >
                    <img src={tiktok_icon} alt="TikTok" />
                    </a>
                </div>
            </div>
            <div className="footer-copyright">
                <hr />
                <p>Copyright @Dương Văn Hưng - 29/11/2002@ </p>
            </div>
        </div>
    )
}

export default Footer