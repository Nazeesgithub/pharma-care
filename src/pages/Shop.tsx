
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PillAnimation from '../components/PillAnimation';

// Define product type
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  discountPrice?: number;
  image: string;
  prescription: boolean;
  inStock: boolean;
  rating: number;
  description: string;
}

const Shop = () => {
  // Sample product data
  const allProducts: Product[] = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      category: "Pain Relief",
      price: 8.99,
      image: "paracetamol.jpg",
      prescription: false,
      inStock: true,
      rating: 4.7,
      description: "Effective pain relief and fever reducer."
    },
    {
      id: 2,
      name: "Amoxicillin 250mg",
      category: "Antibiotics",
      price: 15.99,
      image: "amoxicillin.jpg",
      prescription: true,
      inStock: true,
      rating: 4.5,
      description: "Broad-spectrum antibiotic for bacterial infections."
    },
    {
      id: 3,
      name: "Vitamin D3 1000IU",
      category: "Vitamins",
      price: 12.99,
      discountPrice: 9.99,
      image: "vitamind.jpg",
      prescription: false,
      inStock: true,
      rating: 4.8,
      description: "Supports bone health and immune function."
    },
    {
      id: 4,
      name: "Ibuprofen 200mg",
      category: "Pain Relief",
      price: 7.49,
      image: "ibuprofen.jpg",
      prescription: false,
      inStock: true,
      rating: 4.6,
      description: "Anti-inflammatory pain reliever."
    },
    {
      id: 5,
      name: "Cetirizine 10mg",
      category: "Allergy",
      price: 10.99,
      image: "cetirizine.jpg",
      prescription: false,
      inStock: true,
      rating: 4.4,
      description: "24-hour allergy relief medication."
    },
    {
      id: 6,
      name: "Omeprazole 20mg",
      category: "Digestive Health",
      price: 14.99,
      discountPrice: 11.99,
      image: "omeprazole.jpg",
      prescription: false,
      inStock: true,
      rating: 4.5,
      description: "Reduces stomach acid production."
    },
    {
      id: 7,
      name: "Multivitamin Complex",
      category: "Vitamins",
      price: 19.99,
      image: "multivitamin.jpg",
      prescription: false,
      inStock: true,
      rating: 4.9,
      description: "Complete daily vitamin and mineral supplement."
    },
    {
      id: 8,
      name: "Lisinopril 10mg",
      category: "Blood Pressure",
      price: 16.99,
      image: "lisinopril.jpg",
      prescription: true,
      inStock: false,
      rating: 4.7,
      description: "ACE inhibitor for high blood pressure management."
    },
    {
      id: 9,
      name: "Aspirin 81mg",
      category: "Heart Health",
      price: 8.49,
      image: "aspirin.jpg",
      prescription: false,
      inStock: true,
      rating: 4.6,
      description: "Low-dose aspirin for heart health maintenance."
    },
    {
      id: 10,
      name: "Melatonin 5mg",
      category: "Sleep Aid",
      price: 11.99,
      image: "melatonin.jpg",
      prescription: false,
      inStock: true,
      rating: 4.4,
      description: "Natural sleep aid supplement."
    },
    {
      id: 11,
      name: "Loratadine 10mg",
      category: "Allergy",
      price: 9.99,
      image: "loratadine.jpg",
      prescription: false,
      inStock: true,
      rating: 4.5,
      description: "Non-drowsy allergy relief."
    },
    {
      id: 12,
      name: "Metformin 500mg",
      category: "Diabetes",
      price: 13.99,
      image: "metformin.jpg",
      prescription: true,
      inStock: true,
      rating: 4.7,
      description: "Oral medication for type 2 diabetes."
    }
  ];

  const [products, setProducts] = useState<Product[]>(allProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<{product: Product, quantity: number}[]>([]);
  const [showCart, setShowCart] = useState(false);
  
  // Get unique categories from products
  const categories = ['All', ...new Set(allProducts.map(product => product.category))];
  
  // Filter products based on search term and selected category
  useEffect(() => {
    let filtered = allProducts;
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.description.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
      );
    }
    
    setProducts(filtered);
  }, [searchTerm, selectedCategory]);
  
  // Add product to cart
  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };
  
  // Calculate total cart items
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate total cart price
  const totalCartPrice = cart.reduce((total, item) => {
    const price = item.product.discountPrice || item.product.price;
    return total + (price * item.quantity);
  }, 0);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 md:px-0">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-pharma-secondary">Online Pharmacy</h1>
              <p className="text-pharma-darkgray text-lg mb-8">
                Browse our extensive selection of over-the-counter medications, vitamins, and health products. Prescription medications also available with valid prescriptions.
              </p>
              
              {/* Search */}
              <div className="relative max-w-xl">
                <input
                  type="text"
                  placeholder="Search for medications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-5 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-pharma-primary focus:border-pharma-primary"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-6 h-6 text-pharma-darkgray" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-full h-72">
                <PillAnimation size={3} color="#0078C8" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Shop Section */}
      <section className="py-12 px-4 md:px-0">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar */}
            <div className="w-full lg:w-1/4 lg:pr-8 mb-8 lg:mb-0">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold text-pharma-secondary mb-6">Categories</h2>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category
                          ? 'bg-pharma-primary text-white'
                          : 'text-pharma-darkgray hover:bg-pharma-gray'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 my-6 pt-6">
                  <h2 className="text-xl font-bold text-pharma-secondary mb-4">Your Cart</h2>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-pharma-darkgray">{totalCartItems} items</p>
                      <p className="font-semibold text-pharma-secondary">${totalCartPrice.toFixed(2)}</p>
                    </div>
                    <button 
                      onClick={() => setShowCart(!showCart)}
                      className="px-4 py-2 bg-pharma-primary text-white rounded-lg hover:bg-pharma-secondary transition-colors"
                    >
                      View Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="w-full lg:w-3/4">
              {products.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                  <svg className="w-16 h-16 text-pharma-primary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <h3 className="text-xl font-semibold text-pharma-secondary mb-2">No products found</h3>
                  <p className="text-pharma-darkgray">Try adjusting your search or filter criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover-elevate">
                      <div className="h-48 bg-pharma-gray flex items-center justify-center">
                        {/* Product image placeholder */}
                        <div className="w-24 h-24">
                          <PillAnimation color={product.category === "Pain Relief" ? "#0078C8" : product.category === "Vitamins" ? "#16A34A" : "#1E3A8A"} size={1.5} />
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-pharma-secondary">{product.name}</h3>
                          <span className="bg-pharma-gray text-pharma-darkgray text-xs font-medium px-2.5 py-0.5 rounded">
                            {product.category}
                          </span>
                        </div>
                        <p className="text-pharma-darkgray text-sm mb-4">{product.description}</p>
                        <div className="flex items-center mb-4">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating) 
                                  ? 'text-yellow-400' 
                                  : 'text-gray-300'
                              }`} 
                              fill="currentColor" 
                              viewBox="0 0 20 20" 
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          ))}
                          <span className="text-xs text-pharma-darkgray ml-1">({product.rating})</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            {product.discountPrice ? (
                              <div className="flex items-center">
                                <span className="text-pharma-darkgray text-sm line-through mr-2">${product.price.toFixed(2)}</span>
                                <span className="text-pharma-secondary font-bold">${product.discountPrice.toFixed(2)}</span>
                              </div>
                            ) : (
                              <span className="text-pharma-secondary font-bold">${product.price.toFixed(2)}</span>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            {product.prescription ? (
                              <button className="px-3 py-1 border border-pharma-primary text-pharma-primary text-sm font-medium rounded hover:bg-pharma-primary hover:text-white transition-colors">
                                Upload Rx
                              </button>
                            ) : product.inStock ? (
                              <button 
                                onClick={() => addToCart(product)}
                                className="px-3 py-1 bg-pharma-primary text-white text-sm font-medium rounded hover:bg-pharma-secondary transition-colors"
                              >
                                Add to Cart
                              </button>
                            ) : (
                              <button disabled className="px-3 py-1 bg-gray-300 text-gray-500 text-sm font-medium rounded cursor-not-allowed">
                                Out of Stock
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-pharma-secondary">Your Cart</h2>
              <button 
                onClick={() => setShowCart(false)}
                className="text-pharma-darkgray hover:text-pharma-secondary"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <svg className="w-16 h-16 text-pharma-gray mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <h3 className="text-xl font-semibold text-pharma-secondary mb-2">Your cart is empty</h3>
                <p className="text-pharma-darkgray mb-4">Add some products to your cart to continue.</p>
                <button 
                  onClick={() => setShowCart(false)}
                  className="px-6 py-2 bg-pharma-primary text-white rounded-lg hover:bg-pharma-secondary transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <div key={item.product.id} className="py-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-16 h-16 bg-pharma-gray rounded-lg flex items-center justify-center mr-4">
                          <div className="w-10 h-10">
                            <PillAnimation color={item.product.category === "Pain Relief" ? "#0078C8" : item.product.category === "Vitamins" ? "#16A34A" : "#1E3A8A"} size={0.8} />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-pharma-secondary">{item.product.name}</h4>
                          <p className="text-sm text-pharma-darkgray">{item.product.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-6">
                          <p className="font-medium text-pharma-secondary">${(item.product.discountPrice || item.product.price).toFixed(2)} x {item.quantity}</p>
                          <p className="text-right font-bold">${((item.product.discountPrice || item.product.price) * item.quantity).toFixed(2)}</p>
                        </div>
                        <div className="flex items-center border border-gray-300 rounded">
                          <button 
                            onClick={() => {
                              if (item.quantity > 1) {
                                setCart(cart.map(cartItem => 
                                  cartItem.product.id === item.product.id 
                                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                                    : cartItem
                                ));
                              } else {
                                setCart(cart.filter(cartItem => cartItem.product.id !== item.product.id));
                              }
                            }}
                            className="px-2 py-1 text-pharma-darkgray hover:text-pharma-primary"
                          >
                            -
                          </button>
                          <span className="px-3 py-1">{item.quantity}</span>
                          <button 
                            onClick={() => {
                              setCart(cart.map(cartItem => 
                                cartItem.product.id === item.product.id 
                                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                                  : cartItem
                              ));
                            }}
                            className="px-2 py-1 text-pharma-darkgray hover:text-pharma-primary"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 mt-4 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-pharma-darkgray">Subtotal</span>
                    <span className="font-medium">${totalCartPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-pharma-darkgray">Shipping</span>
                    <span className="font-medium">$5.99</span>
                  </div>
                  <div className="flex justify-between items-center mb-6 text-lg font-bold">
                    <span className="text-pharma-secondary">Total</span>
                    <span className="text-pharma-secondary">${(totalCartPrice + 5.99).toFixed(2)}</span>
                  </div>
                  <div className="flex space-x-4">
                    <button 
                      onClick={() => setShowCart(false)}
                      className="flex-1 px-6 py-3 border border-pharma-primary text-pharma-primary font-semibold rounded-lg hover:bg-pharma-primary hover:text-white transition-colors"
                    >
                      Continue Shopping
                    </button>
                    <button 
                      onClick={() => {
                        alert('Checkout functionality would be implemented here.');
                        setShowCart(false);
                      }}
                      className="flex-1 px-6 py-3 bg-pharma-primary text-white font-semibold rounded-lg hover:bg-pharma-secondary transition-colors"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Shop;
