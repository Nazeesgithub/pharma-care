
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PillAnimation from '../components/PillAnimation';

const About = () => {
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
      <section className="pt-32 pb-12 px-4 md:px-0">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-pharma-secondary">About PharmaCare</h1>
          <p className="text-pharma-darkgray text-lg max-w-3xl mx-auto">
            Your trusted partner in healthcare, delivering quality pharmaceutical services since 2010.
          </p>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16 px-4 md:px-0">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0 animate-on-scroll">
              <h2 className="text-3xl font-bold text-pharma-secondary mb-6">Our Story</h2>
              <p className="text-pharma-darkgray mb-4">
                PharmaCare was founded in 2010 with a simple yet powerful mission: to make healthcare more accessible, understandable, and personalized for everyone. What began as a small neighborhood pharmacy has grown into a comprehensive healthcare provider with multiple locations and innovative digital services.
              </p>
              <p className="text-pharma-darkgray mb-4">
                Our founder, Dr. Elizabeth Chen, recognized the gaps in pharmaceutical care where patients often left with medications but without a clear understanding of their treatment. She envisioned a pharmacy that would not only dispense medications but also provide education, support, and personalized care.
              </p>
              <p className="text-pharma-darkgray">
                Over the years, we've expanded our services to include online prescription ordering, medication information through our Med Bot, and convenient appointment scheduling with healthcare professionals. Throughout our growth, we've remained committed to our core values of care, quality, and innovation.
              </p>
            </div>
            <div className="lg:w-1/2 flex justify-center animate-on-scroll">
              <div className="w-full max-w-lg h-80 relative">
                <div className="animate-float">
                  <PillAnimation size={2.5} color="#1E3A8A" speed={0.6} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission & Vision Section */}
      <section className="py-16 bg-pharma-gray px-4 md:px-0">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl font-bold text-pharma-secondary mb-4">Our Mission & Vision</h2>
            <p className="text-pharma-darkgray max-w-3xl mx-auto">
              We're guided by our commitment to better healthcare for all.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover-elevate animate-on-scroll">
              <div className="w-16 h-16 rounded-full bg-pharma-primary/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-pharma-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-pharma-secondary mb-4">Our Mission</h3>
              <p className="text-pharma-darkgray mb-4">
                To provide accessible, high-quality pharmaceutical care and health services that empower people to better understand and manage their health. We strive to:
              </p>
              <ul className="space-y-2 text-pharma-darkgray list-disc pl-5 mb-4">
                <li>Deliver personalized healthcare solutions for every individual</li>
                <li>Ensure all patients understand their medications and treatment plans</li>
                <li>Make quality healthcare accessible through both physical and digital channels</li>
                <li>Continuously innovate to meet evolving healthcare needs</li>
              </ul>
              <p className="text-pharma-darkgray">
                We believe that informed patients are healthier patients, and we're committed to providing the knowledge, products, and support needed for optimal health outcomes.
              </p>
            </div>
            
            {/* Vision */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover-elevate animate-on-scroll">
              <div className="w-16 h-16 rounded-full bg-pharma-green/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-pharma-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-pharma-secondary mb-4">Our Vision</h3>
              <p className="text-pharma-darkgray mb-4">
                To be the most trusted healthcare partner in our communities, known for excellence in pharmaceutical care, technological innovation, and personalized service. We envision:
              </p>
              <ul className="space-y-2 text-pharma-darkgray list-disc pl-5 mb-4">
                <li>A future where healthcare is proactive, preventative, and personalized</li>
                <li>Communities where everyone has access to the information and resources they need for optimal health</li>
                <li>Seamless integration of traditional pharmacy services with cutting-edge digital health solutions</li>
                <li>A healthcare ecosystem that treats the whole person, not just symptoms</li>
              </ul>
              <p className="text-pharma-darkgray">
                We're working toward a world where technology enhances the human touch in healthcare, making quality care more accessible to all.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="py-16 px-4 md:px-0">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl font-bold text-pharma-secondary mb-4">Our Core Values</h2>
            <p className="text-pharma-darkgray max-w-3xl mx-auto">
              These principles guide our interactions, decisions, and innovations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="p-6 border border-gray-200 rounded-xl hover-elevate animate-on-scroll">
              <div className="w-12 h-12 rounded-full bg-pharma-primary/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-pharma-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-pharma-secondary mb-2">Care & Compassion</h3>
              <p className="text-pharma-darkgray">
                We approach every patient interaction with genuine care and empathy, recognizing that behind every prescription is a person with unique needs and concerns.
              </p>
            </div>
            
            {/* Value 2 */}
            <div className="p-6 border border-gray-200 rounded-xl hover-elevate animate-on-scroll">
              <div className="w-12 h-12 rounded-full bg-pharma-green/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-pharma-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-pharma-secondary mb-2">Quality & Excellence</h3>
              <p className="text-pharma-darkgray">
                We maintain the highest standards in everything we do, from medication accuracy to customer service, never compromising on the quality of care we provide.
              </p>
            </div>
            
            {/* Value 3 */}
            <div className="p-6 border border-gray-200 rounded-xl hover-elevate animate-on-scroll">
              <div className="w-12 h-12 rounded-full bg-pharma-primary/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-pharma-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-pharma-secondary mb-2">Innovation</h3>
              <p className="text-pharma-darkgray">
                We embrace new technologies and approaches that enhance patient care, constantly seeking better ways to serve our community's health needs.
              </p>
            </div>
            
            {/* Value 4 */}
            <div className="p-6 border border-gray-200 rounded-xl hover-elevate animate-on-scroll">
              <div className="w-12 h-12 rounded-full bg-pharma-green/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-pharma-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-pharma-secondary mb-2">Education & Empowerment</h3>
              <p className="text-pharma-darkgray">
                We believe knowledge is power in healthcare, and we're committed to educating our patients so they can make informed decisions about their health.
              </p>
            </div>
            
            {/* Value 5 */}
            <div className="p-6 border border-gray-200 rounded-xl hover-elevate animate-on-scroll">
              <div className="w-12 h-12 rounded-full bg-pharma-primary/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-pharma-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-pharma-secondary mb-2">Community</h3>
              <p className="text-pharma-darkgray">
                We're an integral part of the communities we serve, committed to being good neighbors and contributing to community health and wellbeing.
              </p>
            </div>
            
            {/* Value 6 */}
            <div className="p-6 border border-gray-200 rounded-xl hover-elevate animate-on-scroll">
              <div className="w-12 h-12 rounded-full bg-pharma-green/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-pharma-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-pharma-secondary mb-2">Integrity & Trust</h3>
              <p className="text-pharma-darkgray">
                We operate with transparency and honesty in all our dealings, building trust through consistent ethical practices and reliable service.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 bg-pharma-gray px-4 md:px-0">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl font-bold text-pharma-secondary mb-4">Our Leadership Team</h2>
            <p className="text-pharma-darkgray max-w-3xl mx-auto">
              Meet the experienced professionals leading PharmaCare into the future.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover-elevate animate-on-scroll">
              <div className="h-64 bg-gray-300"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-pharma-secondary mb-1">Dr. Elizabeth Chen</h3>
                <p className="text-pharma-primary font-medium mb-3">Founder & CEO</p>
                <p className="text-pharma-darkgray text-sm">
                  With over 25 years in pharmacy practice and healthcare management, Dr. Chen leads with a vision of personalized healthcare for all.
                </p>
              </div>
            </div>
            
            {/* Team Member 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover-elevate animate-on-scroll">
              <div className="h-64 bg-gray-300"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-pharma-secondary mb-1">Dr. Marcus Rodriguez</h3>
                <p className="text-pharma-primary font-medium mb-3">Chief Pharmacy Officer</p>
                <p className="text-pharma-darkgray text-sm">
                  Dr. Rodriguez ensures the highest standards of pharmaceutical care across all our locations and digital platforms.
                </p>
              </div>
            </div>
            
            {/* Team Member 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover-elevate animate-on-scroll">
              <div className="h-64 bg-gray-300"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-pharma-secondary mb-1">Sarah Johnson</h3>
                <p className="text-pharma-primary font-medium mb-3">CTO</p>
                <p className="text-pharma-darkgray text-sm">
                  Leading our technology initiatives, Sarah combines healthcare knowledge with technical expertise to drive our digital innovation.
                </p>
              </div>
            </div>
            
            {/* Team Member 4 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover-elevate animate-on-scroll">
              <div className="h-64 bg-gray-300"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-pharma-secondary mb-1">Dr. James Wilson</h3>
                <p className="text-pharma-primary font-medium mb-3">Medical Director</p>
                <p className="text-pharma-darkgray text-sm">
                  Dr. Wilson oversees our clinical services, ensuring they integrate seamlessly with our pharmaceutical care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
