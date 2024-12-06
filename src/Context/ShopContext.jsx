import React, { createContext, useEffect, useState } from 'react'
import all_product from '../Components/Assets/all_product'

export const ShopContext = createContext(null);


const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < all_product.length+1; index++) {
       cart[index] = 0;
    }
    return cart;
}



const ShopContextProvider = (props) => {

    // const [sizeproduct, setSize] = useState([]);

//   const addToSize = (product, size) => {
//     setSize((prev) => [
//       ...prev,
//       { ...product, selectedSize: size, quantity: 1 },
//     ]);
    
//   };

    const [search,setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    
    const [cartItems,setCartItems] = useState(getDefaultCart());
    const url = "http://localhost:4000"
    const [token,setToken] = useState("");
   
    
    // const addToCart = (itemId,size,product) => {
    //     setCartItems((prev)=>({...prev,
    //         ...product,selectedSize: size,
    //         [itemId]:prev[itemId]+1}));
    //     console.log(cartItems);
    // }

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
          const price = item.new_price || 0; // Mặc định giá là 0 nếu undefined
          const quantity = item.quantity || 0; // Mặc định số lượng là 0 nếu undefined
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
      
      useEffect(()=>{
        if(localStorage.getItem("token")){
          setToken(localStorage.getItem("token"));
        }
      },[])

    

    const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart,search,setSearch,showSearch,setShowSearch,removeToCart,increaseQuantity,url,token,setToken};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;