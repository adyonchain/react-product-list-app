import React, { useState, useMemo, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, X } from 'lucide-react';

// Product data loaded from the user's data.json file
const productsData = [
    {
        "id": 1,
        "image": {
            "thumbnail": "./assets/images/image-waffle-thumbnail.jpg",
            "mobile": "./assets/images/image-waffle-mobile.jpg",
            "tablet": "./assets/images/image-waffle-tablet.jpg",
            "desktop": "https://placehold.co/400x300/4F46E5/FFFFFF?text=Waffle+with+Berries"
        },
        "name": "Waffle with Berries",
        "category": "Waffle",
        "price": 6.50
    },
    {
        "id": 2,
        "image": {
            "thumbnail": "./assets/images/image-creme-brulee-thumbnail.jpg",
            "mobile": "./assets/images/image-creme-brulee-mobile.jpg",
            "tablet": "./assets/images/image-creme-brulee-tablet.jpg",
            "desktop": "https://placehold.co/400x300/F97316/FFFFFF?text=Vanilla+Bean+Creme+Brulee"
        },
        "name": "Vanilla Bean Crème Brûlée",
        "category": "Crème Brûlée",
        "price": 7.00
    },
    {
        "id": 3,
        "image": {
            "thumbnail": "./assets/images/image-macaron-thumbnail.jpg",
            "mobile": "./assets/images/image-macaron-mobile.jpg",
            "tablet": "./assets/images/image-macaron-tablet.jpg",
            "desktop": "https://placehold.co/400x300/10B981/FFFFFF?text=Macaron+Mix+of+Five"
        },
        "name": "Macaron Mix of Five",
        "category": "Macaron",
        "price": 8.00
    },
    {
        "id": 4,
        "image": {
            "thumbnail": "./assets/images/image-tiramisu-thumbnail.jpg",
            "mobile": "./assets/images/image-tiramisu-mobile.jpg",
            "tablet": "./assets/images/image-tiramisu-tablet.jpg",
            "desktop": "https://placehold.co/400x300/3B82F6/FFFFFF?text=Classic+Tiramisu"
        },
        "name": "Classic Tiramisu",
        "category": "Tiramisu",
        "price": 5.50
    },
    {
        "id": 5,
        "image": {
            "thumbnail": "./assets/images/image-baklava-thumbnail.jpg",
            "mobile": "./assets/images/image-baklava-mobile.jpg",
            "tablet": "./assets/images/image-baklava-tablet.jpg",
            "desktop": "https://placehold.co/400x300/A855F7/FFFFFF?text=Pistachio+Baklava"
        },
        "name": "Pistachio Baklava",
        "category": "Baklava",
        "price": 4.00
    },
    {
        "id": 6,
        "image": {
            "thumbnail": "./assets/images/image-meringue-thumbnail.jpg",
            "mobile": "./assets/images/image-meringue-mobile.jpg",
            "tablet": "./assets/images/image-meringue-tablet.jpg",
            "desktop": "https://placehold.co/400x300/EF4444/FFFFFF?text=Lemon+Meringue+Pie"
        },
        "name": "Lemon Meringue Pie",
        "category": "Pie",
        "price": 5.00
    },
    {
        "id": 7,
        "image": {
            "thumbnail": "./assets/images/image-cake-thumbnail.jpg",
            "mobile": "./assets/images/image-cake-mobile.jpg",
            "tablet": "./assets/images/image-cake-tablet.jpg",
            "desktop": "https://placehold.co/400x300/94A3B8/FFFFFF?text=Red+Velvet+Cake"
        },
        "name": "Red Velvet Cake",
        "category": "Cake",
        "price": 4.50
    },
    {
        "id": 8,
        "image": {
            "thumbnail": "./assets/images/image-brownie-thumbnail.jpg",
            "mobile": "./assets/images/image-brownie-mobile.jpg",
            "tablet": "./assets/images/image-brownie-tablet.jpg",
            "desktop": "https://placehold.co/400x300/6B7280/FFFFFF?text=Salted+Caramel+Brownie"
        },
        "name": "Salted Caramel Brownie",
        "category": "Brownie",
        "price": 4.50
    },
    {
        "id": 9,
        "image": {
            "thumbnail": "./assets/images/image-panna-cotta-thumbnail.jpg",
            "mobile": "./assets/images/image-panna-cotta-mobile.jpg",
            "tablet": "./assets/images/image-panna-cotta-tablet.jpg",
            "desktop": "https://placehold.co/400x300/0F766E/FFFFFF?text=Vanilla+Panna+Cotta"
        },
        "name": "Vanilla Panna Cotta",
        "category": "Panna Cotta",
        "price": 6.50
    }
];

// App component, containing all the logic and UI
export default function App() {
  // State for the product list (initially loaded from mock data)
  const [products] = useState(productsData);
  // State for the shopping cart items
  const [cartItems, setCartItems] = useState([]);
  
  // Memoized total price calculation to avoid unnecessary re-renders
  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    // Check if the item already exists in the cart
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      // If it exists, update its quantity
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      // If not, add the new item with a quantity of 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Function to increase the quantity of an item in the cart
  const increaseQuantity = (productId) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to decrease the quantity of an item in the cart
  const decreaseQuantity = (productId) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Function to remove an item from the cart
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };
  
  // Tailwind CSS classes for consistent styling
  const containerClasses = "min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 md:p-8 font-sans";
  const headerClasses = "text-3xl md:text-5xl font-extrabold text-center text-indigo-600 dark:text-indigo-400 my-4 md:my-8";
  const sectionTitleClasses = "text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2";
  const productGridClasses = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";
  const productCardClasses = "bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden";
  const productDetailsClasses = "p-6";
  const productTitleClasses = "text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300";
  const productPriceClasses = "text-xl font-bold text-gray-800 dark:text-gray-200";
  const addToCartButtonClasses = "mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200";
  const cartContainerClasses = "bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 lg:p-8 mt-8 lg:mt-0";
  const cartItemClasses = "flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0";
  const cartItemInfoClasses = "flex-grow flex items-center";
  const cartItemNameClasses = "font-medium text-gray-800 dark:text-gray-200";
  const cartItemControlsClasses = "flex items-center gap-2 text-gray-600 dark:text-gray-400";
  const cartControlsButtonClasses = "p-1 rounded-full text-indigo-600 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors duration-150";
  const removeButtonClasses = "p-1 ml-4 text-red-500 hover:text-red-700 transition-colors duration-150";
  const cartSummaryClasses = "mt-6 pt-4 border-t-2 border-indigo-600 dark:border-indigo-400";
  const totalTextClasses = "text-2xl font-bold text-gray-900 dark:text-gray-100";
  const checkoutButtonClasses = "w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200";
  const emptyCartMessageClasses = "text-center text-gray-500 dark:text-gray-400 text-lg py-8";

  return (
    <div className={containerClasses}>
      <h1 className={headerClasses}>My Awesome Product Store</h1>
      
      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        {/* Product List Section */}
        <div className="lg:w-2/3">
          <h2 className={sectionTitleClasses}>Products</h2>
          <div className={productGridClasses}>
            {products.map((product) => (
              <div key={product.id} className={productCardClasses}>
                <img
                  src={product.image.desktop}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className={productDetailsClasses}>
                  <h3 className={productTitleClasses}>{product.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Category: {product.category}</p>
                  <p className={productPriceClasses}>${product.price.toFixed(2)}</p>
                  <button
                    onClick={() => addToCart(product)}
                    className={addToCartButtonClasses}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shopping Cart Section */}
        <div className="lg:w-1/3">
          <div className={cartContainerClasses}>
            <h2 className={sectionTitleClasses}>
              <ShoppingCart size={24} />
              Shopping Cart
            </h2>
            {cartItems.length === 0 ? (
              <p className={emptyCartMessageClasses}>Your cart is empty.</p>
            ) : (
              <div>
                {cartItems.map((item) => (
                  <div key={item.id} className={cartItemClasses}>
                    <div className={cartItemInfoClasses}>
                      <img
                        src={item.image.thumbnail}
                        alt={item.name}
                        className="w-16 h-16 rounded-md object-cover mr-4"
                      />
                      <div>
                        <p className={cartItemNameClasses}>{item.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className={cartItemControlsClasses}>
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className={cartControlsButtonClasses}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-lg font-semibold w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className={cartControlsButtonClasses}
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className={removeButtonClasses}
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                ))}

                <div className={cartSummaryClasses}>
                  <div className="flex justify-between items-center mb-4">
                    <span className={totalTextClasses}>Total:</span>
                    <span className={totalTextClasses}>${totalPrice.toFixed(2)}</span>
                  </div>
                  <button className={checkoutButtonClasses}>
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
