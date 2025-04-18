
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center pharma-gradient">
              <span className="text-white font-bold text-lg">PC</span>
            </div>
            <span className={`font-bold text-xl ${isScrolled ? 'text-pharma-primary' : 'text-pharma-primary'}`}>
              PharmaCare
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-pharma-darkgray hover:text-pharma-primary font-medium transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-pharma-darkgray hover:text-pharma-primary font-medium transition-colors">
              About
            </Link>
            <Link to="/shop" className="text-pharma-darkgray hover:text-pharma-primary font-medium transition-colors">
              Shop
            </Link>
            <Link to="/bot" className="text-pharma-darkgray hover:text-pharma-primary font-medium transition-colors">
              Med Bot
            </Link>
            <Link to="/appointments" className="text-pharma-darkgray hover:text-pharma-primary font-medium transition-colors">
              Appointments
            </Link>
            <Link to="/contact" className="text-pharma-darkgray hover:text-pharma-primary font-medium transition-colors">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-pharma-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16m-7 6h7" 
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col space-y-3 px-4">
              <Link 
                to="/" 
                className="text-pharma-darkgray hover:text-pharma-primary font-medium py-2 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-pharma-darkgray hover:text-pharma-primary font-medium py-2 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/shop" 
                className="text-pharma-darkgray hover:text-pharma-primary font-medium py-2 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                to="/bot" 
                className="text-pharma-darkgray hover:text-pharma-primary font-medium py-2 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Med Bot
              </Link>
              <Link 
                to="/appointments" 
                className="text-pharma-darkgray hover:text-pharma-primary font-medium py-2 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Appointments
              </Link>
              <Link 
                to="/contact" 
                className="text-pharma-darkgray hover:text-pharma-primary font-medium py-2 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
