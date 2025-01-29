import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { useAlert } from "../../context/GlobalAlertContext";
import OrderProgress from "../../components/OrderProgress/OrderProgress";
import "./cart.css"; // Ensure this CSS file reflects the grid-based styling

const Cart = () => {
  // Local state for cart and shipping
  const [cart, setCart] = useState({ items: [] });
  // const [debounceCart,setDebounceCart] = useState({ items: [] });
  const [shipping, setShipping] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  //Context states
  const { cartItems, removeFromCart, fetchCart } = useContext(CartContext);
  const { showAlert } = useAlert();
  //Navigate Object
  const navigate = useNavigate();


  // Effect to update local state when cartItems from CartContext change
  useEffect(() => {
    setCart({ items: cartItems });
    // setDebounceCart({ items: cartItems });
  }, [cartItems]);

  
  //Calculate Part
  // Calculate subtotal
  const calculateSubtotal = () => {
    return cart?.items.reduce((total, item) => {
      return total + item.quantity * (item.productDetails.price || 0);
    }, 0);
  };

  const handleShippingChange = (cost) => {
    setShipping(cost);
  };


  useEffect(() => {
    const newSubtotal = calculateSubtotal(cart); // Recalculate subtotal
    setSubtotal(newSubtotal);

    // Recalculate total (e.g., subtotal + shipping/taxes)
    setTotal(newSubtotal + shipping);
  }, [cart, calculateSubtotal]); // Dependencies


  // const trackChanged = () =>{
  //   const changedItems = cart.items.filter((item, index) => {
  //     return item.quantity !== debounceCart.items[index]?.quantity;
  //   });

  //   if (changedItems.length > 0) {
  //     console.log("Changed items:", changedItems);
  //   }
  //   return changedItems;
  // }

  // const debounceApiCall =async () =>{
  //   try {
  //     const result = await addToCart(productId, quantity); // Use the quantity state

  //     if (result.success) {
  //       showAlert("Item added to cart successfully");
  //     } else {
  //       showAlert("Failed to Add to Cart");
  //     }
  //   } catch (error) {
  //     console.error("Error adding item to cart:", error);
  //     showAlert("An error occurred while adding the item to the cart.");
  //   } 
  // }

  // const checkForRemove = () =>{
  //   if(changedItems){
      
  //   }
  // // }

  // //Deboucing and Add Items After Increment or decrement - Handling Quantity Change
  // useEffect(() => {
  //   if (cart.items.length !== debounceCart.items.length) {
  //     console.log("Item has been removed");
  //   } else {
  //     trackChanged();
      
  //   }
  
  //   // const timer = setTimeout(() => {
  //   //   if (JSON.stringify(debouncedCart) !== JSON.stringify(cart)) {
  //   //     setDebounceCart(cart); // Update debounced state
  //   //     updateCartInDatabase(cart);
  //   //   }
  //   // }, 500);
  
  //   // return () => clearTimeout(timer); // Cleanup previous timer
  // }, [cart]); // Runs when cart changes
  
//Handling the Quantity Change
  const handleQuantityChange = (productId, delta) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      );
      return { ...prevCart, items: updatedItems };
    });
  };



  //Removing a Item from a Cart
  const handleRemoveItem = async (productId) => {
    try {
      const result = await removeFromCart(productId); //Use Context function to remove
      if (result.success) {
        showAlert("Item Removed Successfully");
      }
    } catch (error) {
      console.error("Failed to remove item from cart", error);
      showAlert("An error occurred while removing the item from the cart.");
    }
  };

  //Proceed to Payment Step

  const proceedToPay = () => {
    const fee = {
      shipping: shipping,
      subtotal: subtotal,
      total: total,
    };
    // Save the fee details in localStorage
    localStorage.setItem("feeDetails", JSON.stringify(fee));
    // Navigate to the checkout page
    navigate("/checkout");
  };

  return (
    <div className="cart-container">
      {/* Progress Bar */}
      <OrderProgress step={1} />

      <div className="grid-wrapper">
        {/* Cart Section */}
        <div className="cart-grid">
          {/* Cart Items */}
          <div className="cart-item">
            <div className="grid-headings">Product</div>
            <div className="grid-headings">Quantity</div>
            <div className="grid-headings">Price</div>
            <div className="grid-headings">Sub Total</div>
          </div>
          {cart.items.map((item) => (
            <div className="cart-item" key={item.productId}>
              <div className="cart-item-info">
                <img
                  src={item.productDetails.images[0]}
                  alt={item.productDetails.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h4>{item.productDetails.name}</h4>
                  <p>Category: {item.productDetails.category}</p>
                  <p>
                    Color: {item.productDetails.variations[0]?.options[0].value}
                  </p>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveItem(item.productId)}
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="cart-item-actions">
                <div className="cart-item-quantity">
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.productId, -1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.productId, 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cart-item-price">
                Rs. {item.productDetails.price.toFixed(2)}
              </div>

              <div className="cart-item-price">
                Rs. {(item.productDetails.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="cart-summary">
          <h3>Cart summary</h3>
          <div className="shipping-options">
            <label>
              <span>
                <input
                  type="radio"
                  name="shipping"
                  checked={shipping === 0}
                  onChange={() => handleShippingChange(0)}
                  className="shipping-radio"
                />
                <span>Free shipping</span>
              </span>
              <span className="price">Rs. 0.00</span>
            </label>
            <label>
              <span>
                <input
                  type="radio"
                  name="shipping"
                  checked={shipping === 245}
                  onChange={() => handleShippingChange(245)}
                  className="shipping-radio"
                />
                <span>Express shipping</span>
              </span>
              <span className="price">+Rs. 245.00</span>
            </label>
            <label>
              <span>
                <input
                  type="radio"
                  name="shipping"
                  checked={shipping === 21}
                  onChange={() => handleShippingChange(21)}
                  className="shipping-radio"
                />
                <span>Pick Up</span>
              </span>
              <span className="price">+Rs. 21.00</span>
            </label>
          </div>
          <div className="summary-totals">
            <div className="subtotal">
              <span>Subtotal:</span>
              <span>Rs. {subtotal.toFixed(2)}</span>
            </div>
            <hr />
            <div className="total">
              <span>Total:</span>
              <span>Rs. {total.toFixed(2)}</span>
            </div>
          </div>
          <button className="checkout-btn" onClick={() => proceedToPay()}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
