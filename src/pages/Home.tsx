
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PillAnimation from '../components/PillAnimation';

const Home = () => {
  // Effect to enable animations after component mounts
  useEffect(() => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-0">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-pharma-secondary leading-tight">
                Modern Healthcare<br/>For Your Family's Wellbeing
              </h1>
              <p className="text-pharma-darkgray text-lg mb-8">
                PharmaCare provides comprehensive pharmaceutical services, 
                personalized health consultations, and high-quality medical supplies
                all in one place.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  to="/shop" 
                  className="px-8 py-3 bg-pharma-primary text-white font-semibold rounded-lg hover:bg-pharma-secondary transition-colors duration-300 text-center"
                >
                  Shop Medicines
                </Link>
                <Link 
                  to="/appointments" 
                  className="px-8 py-3 border-2 border-pharma-primary text-pharma-primary font-semibold rounded-lg hover:bg-pharma-primary hover:text-white transition-colors duration-300 text-center"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="w-full max-w-lg h-80 relative">
                <div className="animate-float">
                  <PillAnimation size={3} color="#0078C8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-20 bg-pharma-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl font-bold text-pharma-secondary mb-4">Our Services</h2>
            <p className="text-pharma-darkgray max-w-3xl mx-auto">
              We offer a comprehensive range of pharmaceutical and healthcare services to ensure your wellbeing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover-elevate animate-on-scroll">
              <div className="w-16 h-16 rounded-full bg-pharma-primary/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-pharma-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-pharma-secondary mb-3">Prescription Filling</h3>
              <p className="text-pharma-darkgray mb-4">
                Fast and accurate prescription filling with expert pharmacist consultation on medication usage.
              </p>
              <Link to="/shop" className="text-pharma-primary font-medium hover:underline inline-flex items-center">
                Learn more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
            
            {/* Service 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover-elevate animate-on-scroll">
              <div className="w-16 h-16 rounded-full bg-pharma-green/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-pharma-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-pharma-secondary mb-3">Medication Analysis</h3>
              <p className="text-pharma-darkgray mb-4">
                Our AI-powered medication bot analyzes your prescriptions and provides detailed information about your medications.
              </p>
              <Link to="/bot" className="text-pharma-green font-medium hover:underline inline-flex items-center">
                Try Med Bot
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
            
            {/* Service 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover-elevate animate-on-scroll">
              <div className="w-16 h-16 rounded-full bg-pharma-primary/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-pharma-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-pharma-secondary mb-3">Online Appointments</h3>
              <p className="text-pharma-darkgray mb-4">
                Schedule consultations with healthcare professionals and pharmacists through our convenient online system.
              </p>
              <Link to="/appointments" className="text-pharma-primary font-medium hover:underline inline-flex items-center">
                Book now
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0 animate-on-scroll">
              <h2 className="text-3xl font-bold text-pharma-secondary mb-6">Why Choose PharmaCare?</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-pharma-primary/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-pharma-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-pharma-secondary mb-2">Trusted Expertise</h3>
                    <p className="text-pharma-darkgray">
                      Our team of licensed pharmacists and healthcare professionals bring years of experience and knowledge.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-pharma-green/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-pharma-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-pharma-secondary mb-2">Fast Service</h3>
                    <p className="text-pharma-darkgray">
                      We value your time with quick prescription filling, online ordering, and convenient delivery options.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-pharma-primary/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-pharma-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-pharma-secondary mb-2">Personalized Care</h3>
                    <p className="text-pharma-darkgray">
                      We provide tailored healthcare solutions that address your specific needs and concerns.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 flex justify-center animate-on-scroll">
              <div className="w-4/5 h-80 relative">
                <div className="animate-float">
                  <PillAnimation size={2.5} color="#16A34A" speed={0.8} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-pharma-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="max-w-3xl mx-auto opacity-80">
              Read testimonials from our satisfied customers who have experienced our quality service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl animate-on-scroll">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-pharma-primary text-xl font-bold mr-4">
                  S
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm opacity-80">Regular Customer</p>
                </div>
              </div>
              <p className="opacity-90">
                "The Med Bot feature is amazing! It helped me understand my prescription completely. The pharmacists are always so helpful and take time to answer all my questions."
              </p>
              <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl animate-on-scroll">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-pharma-primary text-xl font-bold mr-4">
                  M
                </div>
                <div>
                  <h4 className="font-semibold">Michael Brown</h4>
                  <p className="text-sm opacity-80">Monthly Subscriber</p>
                </div>
              </div>
              <p className="opacity-90">
                "The online appointment booking is so convenient. I no longer have to wait on the phone. Their delivery service has been a lifesaver during my recovery!"
              </p>
              <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl animate-on-scroll">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-pharma-primary text-xl font-bold mr-4">
                  E
                </div>
                <div>
                  <h4 className="font-semibold">Emily Rodriguez</h4>
                  <p className="text-sm opacity-80">New Customer</p>
                </div>
              </div>
              <p className="opacity-90">
                "The staff at PharmaCare is incredibly knowledgeable. They helped me find the right over-the-counter medications for my allergies after taking the time to understand my symptoms."
              </p>
              <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="bg-pharma-gray rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-2xl md:text-3xl font-bold text-pharma-secondary mb-4">Ready to Experience Better Healthcare?</h2>
              <p className="text-pharma-darkgray">
                Join thousands of satisfied customers who trust PharmaCare for their healthcare needs.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/shop" 
                className="px-8 py-3 bg-pharma-primary text-white font-semibold rounded-lg hover:bg-pharma-secondary transition-colors duration-300 text-center"
              >
                Shop Now
              </Link>
              <Link 
                to="/contact" 
                className="px-8 py-3 border-2 border-pharma-primary text-pharma-primary font-semibold rounded-lg hover:bg-pharma-primary hover:text-white transition-colors duration-300 text-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;
