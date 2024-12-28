import React, { useEffect } from "react";
import './ChatPlugin.css'
import mess_icon from '../../Components/Assets/mess.png'
import zalo_icon from '../../Components/Assets/zalo.png'
import tuvan_icon from '../../Components/Assets/tuvan.png'
import map_icon from '../../Components/Assets/map.png'
import phone_icon from '../../Components/Assets/phone.png'
const ChatPlugin = () => {
    
  return (
    <>
    <div class="contact-widget">
  <button>
    Để lại SĐT Tư vấn
    <img src={tuvan_icon} alt="Icon" />
  </button>
  <button>
    Nhắn tin Zalo
    <img src={zalo_icon} alt="Zalo Icon" />
  </button>
  <button>
    Chỉ đường bản đồ
    <img src={map_icon} alt="Map Icon" />
  </button>
  <button>
    Nhắn tin Messenger
    <img src={mess_icon} alt="Messenger Icon" />
  </button>
  <div class="call-button">
    <img src={phone_icon} alt="Call Icon" />
    <span>0929026661</span>
  </div>
</div>
    </>
  );
};

export default ChatPlugin;
