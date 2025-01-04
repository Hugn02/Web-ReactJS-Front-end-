import React, { useState, useEffect } from "react";
import "./ScrollToTop.css";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Kiểm tra vị trí cuộn
    const toggleVisibility = () => {
        if (window.pageYOffset > 1500) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Cuộn lên đầu trang
    const scrollToTop = () => {
        window.scrollTo({
            top: 0, // Đầu trang
            behavior: "smooth", // Hoạt ảnh mượt mà
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <div className={`scroll-to-top ${isVisible ? "show" : ""}`}>
            {isVisible && (
                <button onClick={scrollToTop} className="scroll-btn">
                    ↑
                </button>
            )}
        </div>
    );
    
};

export default ScrollToTop;
