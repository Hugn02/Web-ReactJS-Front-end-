import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [all_product, setProductList] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const url = "http://localhost:4000";

    // Lưu giỏ hàng vào localStorage mỗi khi có sự thay đổi
    useEffect(() => {
        if (Object.keys(cartItems).length > 0) {
            localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Lưu giỏ hàng vào localStorage
        }
    }, [cartItems]);

    // Tải lại giỏ hàng từ localStorage khi ứng dụng khởi động
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cartItems"));
        if (savedCart) {
            setCartItems(savedCart); // Nếu có giỏ hàng trong localStorage, tải nó vào state
        }
    }, []);

    // Lấy danh sách sản phẩm
    const fetchProductList = async () => {
        try {
            const response = await axios.get(`${url}/api/product/list`);
            if (response.data.success) {
                setProductList(response.data.data);
            } else {
                console.error("Failed to fetch products:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching product list:", error);
        }
    };

    const addToCart = async (itemId, selectedSize, productDetails) => {
        setCartItems((prev) => {
            const existingItem = prev[itemId];
            return {
                ...prev,
                [itemId]: {
                    ...productDetails,
                    selectedSize,
                    quantity: existingItem ? existingItem.quantity + 1 : 1,
                    new_price: productDetails.new_price || 0,
                },
            };
        });

        if (token) {
            await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
        }
    };

    const removeToCart = async (itemId) => {
        setCartItems((prev) => {
            const existingItem = prev[itemId];
            if (!existingItem || existingItem.quantity <= 1) {
                const { [itemId]: _, ...rest } = prev;
                return rest;
            }

            return {
                ...prev,
                [itemId]: {
                    ...existingItem,
                    quantity: existingItem.quantity - 1,
                },
            };
        });

        if (token) {
            await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const { [itemId]: _, ...rest } = prev;
            return rest;
        });

        if (token) {
            await axios.post(`${url}/api/cart/removecart`, { itemId }, { headers: { token } });
        }
    };

    const getTotalCartAmount = () => {
        return Object.values(cartItems).reduce((total, item) => {
            const price = item.new_price || 0;
            const quantity = item.quantity || 0;
            return total + price * quantity;
        }, 0);
    };

    const getTotalCartItems = () => {
        return Object.values(cartItems).reduce((total, item) => {
            const quantity = item.quantity || 0;
            return total + quantity;
        }, 0);
    };

    const increaseQuantity = async (itemId) => {
      setCartItems((prev) => {
          const updatedCart = {
              ...prev,
              [itemId]: {
                  ...prev[itemId],
                  quantity: prev[itemId].quantity + 1,
              },
          };
          return updatedCart;
      });
  
      if (token) {
          await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
      }
  };
  

    useEffect(() => {
        fetchProductList();
    }, []);

    const contextValue = {
        all_product,
        getTotalCartItems,
        getTotalCartAmount,
        cartItems,
        addToCart,
        removeFromCart,
        removeToCart,
        setCartItems,
        url,
        token,
        setToken,
        increaseQuantity,
    };

    return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>;
};

export default ShopContextProvider;
