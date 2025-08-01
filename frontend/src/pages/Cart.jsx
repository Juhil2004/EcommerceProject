import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title'; // Assuming Title component exists
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        if (cartItems[item][size] > 0) {
          tempData.push({
            _id: item,
            size: size,
            quantity: cartItems[item][size],
            product: products.find((prod) => prod._id === item),
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems, products]);

  const handleRemoveItem = (itemId, size) => {
    updateQuantity(itemId, size, 0);
  };

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      <div>
        {cartData.length === 0 ? (
          <div className='text-center py-8'>
            <p className='text-gray-500 text-lg'>Your cart is empty</p>
            <p className='text-gray-400 text-sm mt-2'>Add some products to get started!</p>
          </div>
        ) : (
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            
            // Skip rendering if product data is not found
            if (!productData) {
              return null;
            }
            
            return (
              <div
                key={index}
                className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'
              >
                <div className='flex items-center gap-6'>
                  <img src={productData.image[0]} className='w-16 sm:w-20' alt='' />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency}{productData.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                    </div>
                  </div>
                </div>

                <input
                  className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
                  type='number'
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    e.target.value === '' || e.target.value === '0'
                      ? null
                      : updateQuantity(item._id, item.size, Number(e.target.value))
                  }
                />

                <img
                  onClick={() => handleRemoveItem(item._id, item.size)}
                  src={assets.bin_icon}
                  className='w-4 mr-4 sm:w-5 cursor-pointer'
                  alt='Remove item'
                />
              </div>
            );
          })
        )}
      </div>
      {cartData.length > 0 && (
        <div className='flex justify-end my-20'>
          <div className='w-full sm:w-[450px]'>
            <CartTotal />
            <div className='w-full text-end'>
              <button onClick = {() => navigate('/place-order')}className='bg-black text-white text-sm my-8 px-8 py-3'>PROCEED TO CHECKOUT</button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
