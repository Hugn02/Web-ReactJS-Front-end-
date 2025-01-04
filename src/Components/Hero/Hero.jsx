import React from 'react'
import { useNavigate } from 'react-router-dom'
import Slider from 'react-slick'
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
import arrow_icon from '../Assets/arrow.png'
import hand_icon from '../Assets/hand_icon.png'
import slider from '../Assets/slider-background.png'
import slider2 from '../Assets/slider2.png'
import slider3 from '../Assets/slider3.png'
import slider4 from '../Assets/slider4.png'
import slider5 from '../Assets/slider5.png'
import './Hero.css'
const Hero = () => {
    
    

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/newcollections");
    };
   


    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
      };
      return (
        
        <Slider {...settings} className="slider-container">
          <div className="hero">
          <img  className='slider' src={slider} alt="slider" />
            <div className="hero-left">
                <h2>Hàng mới về</h2>
                <div>
                    <div className="hero-hand-icon">
                        <p>Mới nhất</p>
                        <img src={hand_icon} alt="" />
                    </div>
                    <p>Bộ sưu tập</p>
                    <p>Dành cho mọi người</p>
                </div>
                <div className="hero-lastest-btn">
                    <button className='bt' onClick={handleNavigate}>Bộ sưu tập mới nhất</button>
                    <img src={arrow_icon} alt="" />
                </div>
            </div>   
            <div className="hero-right">
              <img src={slider4} alt="slider" />
            </div>
          </div>
          <div className='slider'>
          <img src={slider2} alt="slider" />
          </div>
          <div className='slider'>
          <img src={slider3} alt="slider" />
          </div>
          <div className='slider'>
          <img src={slider5} alt="slider" />
          </div>
        </Slider>
        
      );
    }

export default Hero
