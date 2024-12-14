import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';



export const ShopContext = createContext(null);


const getDefaultCart = () => {
  return {};
};


const ShopContextProvider = (props) => {

    const [search,setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems,setCartItems] = useState(getDefaultCart());
    const url = "http://localhost:4000"
    const [token,setToken] = useState("");
    const [all_product,setProductList] = useState([])
   
    const addToCart = (itemId, selectedSize, productDetails) => {
        setCartItems((prev) => {
          const existingItem = prev[itemId];
          return {
            ...prev,
            [itemId]: {
              ...productDetails,
              selectedSize,
              quantity: existingItem ? existingItem.quantity + 1 : 1, // Đảm bảo quantity là số
              new_price: productDetails.new_price || 0, // Đảm bảo new_price tồn tại
            },
          };
        });
      };
      
      const removeToCart = (itemId) => {
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
              quantity: existingItem.quantity - 1, // Đảm bảo quantity là số
            },
          };
        });
      };
      
      const removeFromCart = (itemId) => {
        setCartItems((prev) => {
          const { [itemId]: _, ...rest } = prev;
          return rest;
        });
      };
      
    

      const getTotalCartAmount = () => {
        return Object.values(cartItems).reduce((total, item) => {
          const price = item.new_price || 0; 
          const quantity = item.quantity || 0; 
          return total + price * quantity;
        }, 0);
      };
      
      const increaseQuantity = (itemId) => {
        setCartItems((prev) => {
          const updatedCart = {
            ...prev,
            [itemId]: {
              ...prev[itemId],
              quantity: prev[itemId].quantity + 1,
            },
          };
          console.log("Giỏ hàng sau khi tăng số lượng:", updatedCart); // Kiểm tra state
          return updatedCart;
        });
      };

      const getTotalCartItems = () => {
        console.log("cartItems:", cartItems);
      
        let totalItem = 0;
        for (const itemId in cartItems) {
          const item = cartItems[itemId];
          console.log("Item:", item);
          const quantity = item.quantity || 0;
          console.log("Quantity:", quantity);
      
          totalItem += quantity;
        }
      
        return totalItem;
      };

      const fetchProductList = async () => {
        try {
          console.log("Fetching product list...");
          const response = await axios.get(url + "/api/product/list");
          console.log("Response:", response.data);
          if (response.data.success) {
            setProductList(response.data.data);
          } else {
            console.error("Failed to fetch products:", response.data.message);
          }
        } catch (error) {
          console.error("Error fetching product list:", error);
        }
      };
      
      
      
      
      useEffect(() => {
        async function loadData() {
          await fetchProductList();
        }
        loadData();
      }, []);
      
     
      
      useEffect(() => {
        const initializeCart = () => {
          const cart = {};
          all_product.forEach((product) => {
            cart[product.id] = {
              quantity: 0,
              selectedSize: null,
              new_price: product.new_price || 0,
            };
          });
          setCartItems(cart);
        };
      
        if (all_product.length > 0) {
          initializeCart();
        }
      }, [all_product]);
      

    

    const contextValue = {all_product,getTotalCartItems,getTotalCartAmount,cartItems,addToCart,removeFromCart,search,setSearch,showSearch,setShowSearch,removeToCart,increaseQuantity,url,token,setToken};
    useEffect(() => {
      console.log("All products loaded:", all_product);
    }, [all_product]);
    
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;