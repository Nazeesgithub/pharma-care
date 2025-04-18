
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface ServiceType {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
}

const Appointments = () => {
  // Sample service types
  const serviceTypes: ServiceType[] = [
    {
      id: 'consultation',
      name: 'Medication Consultation',
      description: 'Discuss your medications with a pharmacist to ensure proper usage and understand potential side effects.',
      duration: '30 min',
      price: 45
    },
    {
      id: 'review',
      name: 'Prescription Review',
      description: 'Comprehensive review of all your medications to identify potential interactions or issues.',
      duration: '45 min',
      price: 65
    },
    {
      id: 'wellness',
      name: 'Wellness Checkup',
      description: 'Basic health screening including blood pressure, blood sugar, and cholesterol check.',
      duration: '40 min',
      price: 75
    },
    {
      id: 'vaccination',
      name: 'Vaccination Services',
      description: 'Administration of vaccines with pre-vaccination assessment and post-vaccination monitoring.',
      duration: '20 min',
      price: 35
    }
  ];

  // Sample dates for next 7 days
  const getDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  };
  
  // Generate time slots from 9 AM to 5 PM
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const startHour = 9;
    const endHour = 17;
    
    for (let hour = startHour; hour < endHour; hour++) {
      const available = Math.random() > 0.3; // Randomly set availability for demo purposes
      slots.push({
        id: `${hour}-00`,
        time: `${hour % 12 === 0 ? 12 : hour % 12}:00 ${hour < 12 ? 'AM' : 'PM'}`,
        available
      });
      
      const available2 = Math.random() > 0.3; // Randomly set availability for demo purposes
      slots.push({
        id: `${hour}-30`,
        time: `${hour % 12 === 0 ? 12 : hour % 12}:30 ${hour < 12 ? 'AM' : 'PM'}`,
        available: available2
      });
    }
    
    return slots;
  };
  
  const dates = getDates();
  
  // State for selected options
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(generateTimeSlots());
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: ''
  });
  
  // Current step
  const [currentStep, setCurrentStep] = useState(1);
  
  // Booking state
  const [isBooking, setIsBooking] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle date selection
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    // In a real app, you would fetch available time slots for the selected date
    setTimeSlots(generateTimeSlots());
    setSelectedTimeSlot(null);
  };
  
  // Handle time slot selection
  const handleTimeSlotSelect = (timeSlotId: string) => {
    setSelectedTimeSlot(timeSlotId);
  };
  
  // Handle service selection
  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
  };
  
  // Navigate to next step
  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  
  // Navigate to previous step
  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  // Submit booking
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsBooking(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsBooking(false);
      setBookingComplete(true);
    }, 2000);
  };
  
  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Get selected service object
  const getSelectedService = () => {
    return serviceTypes.find(service => service.id === selectedService);
  };
  
  // Get selected time slot object
  const getSelectedTimeSlot = () => {
    return timeSlots.find(slot => slot.id === selectedTimeSlot);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 md:px-0">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-pharma-secondary">Book an Appointment</h1>
          <p className="text-pharma-darkgray text-lg max-w-3xl mx-auto">
            Schedule a consultation with our healthcare professionals for personalized care and advice.
          </p>
        </div>
      </section>
      
      {/* Booking Section */}
      <section className="py-12 px-4 md:px-0">
        <div className="container mx-auto max-w-4xl">
          {bookingComplete ? (
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-pharma-secondary mb-4">Appointment Booked Successfully!</h2>
              <p className="text-pharma-darkgray mb-8">
                Your appointment has been confirmed. We've sent a confirmation email to <span className="font-semibold">{formData.email}</span> with all the details.
              </p>
              <div className="bg-pharma-gray p-6 rounded-lg max-w-md mx-auto mb-8">
                <h3 className="font-semibold text-pharma-secondary mb-4">Appointment Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-sm text-pharma-darkgray">Service</p>
                    <p className="font-medium text-pharma-secondary">{getSelectedService()?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-pharma-darkgray">Duration</p>
                    <p className="font-medium text-pharma-secondary">{getSelectedService()?.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-pharma-darkgray">Date</p>
                    <p className="font-medium text-pharma-secondary">{selectedDate ? formatDate(selectedDate) : ''}</p>
                  </div>
                  <div>
                    <p className="text-sm text-pharma-darkgray">Time</p>
                    <p className="font-medium text-pharma-secondary">{getSelectedTimeSlot()?.time}</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-pharma-primary text-white font-semibold rounded-lg hover:bg-pharma-secondary transition-colors"
              >
                Book Another Appointment
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Progress Steps */}
              <div className="bg-pharma-gray px-8 py-4">
                <div className="flex justify-between">
                  <div className={`flex flex-col items-center ${currentStep >= 1 ? 'text-pharma-primary' : 'text-pharma-darkgray'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-pharma-primary text-white' : 'bg-gray-300'}`}>
                      1
                    </div>
                    <span className="text-xs mt-1">Select Service</span>
                  </div>
                  <div className="flex-1 flex items-center mx-2">
                    <div className={`h-1 w-full ${currentStep >= 2 ? 'bg-pharma-primary' : 'bg-gray-300'}`}></div>
                  </div>
                  <div className={`flex flex-col items-center ${currentStep >= 2 ? 'text-pharma-primary' : 'text-pharma-darkgray'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-pharma-primary text-white' : 'bg-gray-300'}`}>
                      2
                    </div>
                    <span className="text-xs mt-1">Choose Date & Time</span>
                  </div>
                  <div className="flex-1 flex items-center mx-2">
                    <div className={`h-1 w-full ${currentStep >= 3 ? 'bg-pharma-primary' : 'bg-gray-300'}`}></div>
                  </div>
                  <div className={`flex flex-col items-center ${currentStep >= 3 ? 'text-pharma-primary' : 'text-pharma-darkgray'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-pharma-primary text-white' : 'bg-gray-300'}`}>
                      3
                    </div>
                    <span className="text-xs mt-1">Your Information</span>
                  </div>
                </div>
              </div>
              
              <div className="p-8 md:p-12">
                {/* Step 1: Select Service */}
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold text-pharma-secondary mb-6">Select a Service</h2>
                    <div className="grid grid-cols-1 gap-4">
                      {serviceTypes.map((service) => (
                        <div 
                          key={service.id}
                          onClick={() => handleServiceSelect(service.id)}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            selectedService === service.id 
                              ? 'border-pharma-primary bg-pharma-primary/5' 
                              : 'border-gray-200 hover:border-pharma-primary'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-pharma-secondary">{service.name}</h3>
                              <p className="text-sm text-pharma-darkgray mt-1">{service.description}</p>
                              <div className="flex items-center mt-3">
                                <div className="flex items-center mr-4">
                                  <svg className="w-4 h-4 text-pharma-primary mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                  </svg>
                                  <span className="text-xs">{service.duration}</span>
                                </div>
                                <div className="flex items-center">
                                  <svg className="w-4 h-4 text-pharma-primary mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                  </svg>
                                  <span className="text-xs">${service.price}</span>
                                </div>
                              </div>
                            </div>
                            {selectedService === service.id && (
                              <div className="w-6 h-6 bg-pharma-primary rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 flex justify-end">
                      <button 
                        onClick={goToNextStep}
                        disabled={!selectedService}
                        className={`px-6 py-2 rounded-lg text-white font-semibold ${
                          selectedService 
                            ? 'bg-pharma-primary hover:bg-pharma-secondary transition-colors' 
                            : 'bg-gray-300 cursor-not-allowed'
                        }`}
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Step 2: Choose Date & Time */}
                {currentStep === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold text-pharma-secondary mb-6">Choose Date & Time</h2>
                    
                    {/* Date Selection */}
                    <div className="mb-8">
                      <h3 className="font-semibold text-pharma-secondary mb-4">Select a Date</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                        {dates.map((date, index) => (
                          <div 
                            key={index}
                            onClick={() => handleDateSelect(date)}
                            className={`border rounded-lg p-2 text-center cursor-pointer transition-colors ${
                              selectedDate && date.toDateString() === selectedDate.toDateString()
                                ? 'border-pharma-primary bg-pharma-primary/5' 
                                : 'border-gray-200 hover:border-pharma-primary'
                            }`}
                          >
                            <p className="text-xs text-pharma-darkgray">{date.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                            <p className="font-semibold">{date.getDate()}</p>
                            <p className="text-xs text-pharma-darkgray">{date.toLocaleDateString('en-US', { month: 'short' })}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Time Selection */}
                    {selectedDate && (
                      <div>
                        <h3 className="font-semibold text-pharma-secondary mb-4">Select a Time</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                          {timeSlots.map((slot) => (
                            <div 
                              key={slot.id}
                              onClick={() => slot.available ? handleTimeSlotSelect(slot.id) : null}
                              className={`border rounded-lg p-3 text-center cursor-pointer transition-colors ${
                                slot.available
                                  ? selectedTimeSlot === slot.id
                                    ? 'border-pharma-primary bg-pharma-primary/5'
                                    : 'border-gray-200 hover:border-pharma-primary'
                                  : 'border-gray-200 bg-gray-100 cursor-not-allowed'
                              }`}
                            >
                              <p className={`${
                                slot.available 
                                  ? 'text-pharma-secondary' 
                                  : 'text-gray-400'
                              }`}>
                                {slot.time}
                              </p>
                              {!slot.available && (
                                <p className="text-xs text-gray-400">Unavailable</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-8 flex justify-between">
                      <button 
                        onClick={goToPreviousStep}
                        className="px-6 py-2 border border-pharma-primary text-pharma-primary rounded-lg hover:bg-pharma-primary hover:text-white transition-colors"
                      >
                        Back
                      </button>
                      <button 
                        onClick={goToNextStep}
                        disabled={!selectedDate || !selectedTimeSlot}
                        className={`px-6 py-2 rounded-lg text-white font-semibold ${
                          selectedDate && selectedTimeSlot
                            ? 'bg-pharma-primary hover:bg-pharma-secondary transition-colors' 
                            : 'bg-gray-300 cursor-not-allowed'
                        }`}
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Step 3: Your Information */}
                {currentStep === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold text-pharma-secondary mb-6">Your Information</h2>
                    
                    {/* Appointment Summary */}
                    <div className="bg-pharma-gray p-4 rounded-lg mb-6">
                      <h3 className="font-semibold text-pharma-secondary mb-2">Appointment Summary</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-pharma-darkgray">Service</p>
                          <p className="font-medium text-pharma-secondary">{getSelectedService()?.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-pharma-darkgray">Duration</p>
                          <p className="font-medium text-pharma-secondary">{getSelectedService()?.duration}</p>
                        </div>
                        <div>
                          <p className="text-sm text-pharma-darkgray">Date</p>
                          <p className="font-medium text-pharma-secondary">{selectedDate ? formatDate(selectedDate) : ''}</p>
                        </div>
                        <div>
                          <p className="text-sm text-pharma-darkgray">Time</p>
                          <p className="font-medium text-pharma-secondary">{getSelectedTimeSlot()?.time}</p>
                        </div>
                        <div>
                          <p className="text-sm text-pharma-darkgray">Price</p>
                          <p className="font-medium text-pharma-secondary">${getSelectedService()?.price}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Contact Form */}
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-pharma-darkgray mb-1">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pharma-primary focus:border-pharma-primary"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-pharma-darkgray mb-1">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pharma-primary focus:border-pharma-primary"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-pharma-darkgray mb-1">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pharma-primary focus:border-pharma-primary"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-pharma-darkgray mb-1">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pharma-primary focus:border-pharma-primary"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="notes" className="block text-sm font-medium text-pharma-darkgray mb-1">
                          Additional Notes
                        </label>
                        <textarea
                          id="notes"
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-pharma-primary focus:border-pharma-primary"
                          placeholder="Please provide any additional information that might be helpful for your appointment."
                        ></textarea>
                      </div>
                      
                      <div className="flex justify-between">
                        <button 
                          type="button"
                          onClick={goToPreviousStep}
                          className="px-6 py-2 border border-pharma-primary text-pharma-primary rounded-lg hover:bg-pharma-primary hover:text-white transition-colors"
                        >
                          Back
                        </button>
                        <button 
                          type="submit"
                          disabled={isBooking}
                          className="px-6 py-2 bg-pharma-primary text-white font-semibold rounded-lg hover:bg-pharma-secondary transition-colors"
                        >
                          {isBooking ? (
                            <span className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing...
                            </span>
                          ) : "Confirm Booking"}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Why Book Online Section */}
      <section className="py-16 px-4 md:px-0 bg-pharma-gray">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-pharma-secondary mb-4">Why Book Online?</h2>
            <p className="text-pharma-darkgray max-w-3xl mx-auto">
              Our online booking system offers convenience and flexibility for all your healthcare needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover-elevate">
              <div className="w-16 h-16 rounded-full bg-pharma-primary/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-pharma-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-pharma-secondary mb-3">24/7 Booking</h3>
              <p className="text-pharma-darkgray">
                Book appointments anytime, day or night, without having to call during business hours.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover-elevate">
              <div className="w-16 h-16 rounded-full bg-pharma-green/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-pharma-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-pharma-secondary mb-3">Real-time Availability</h3>
              <p className="text-pharma-darkgray">
                See exactly which time slots are available and choose the most convenient option for you.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover-elevate">
              <div className="w-16 h-16 rounded-full bg-pharma-primary/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-pharma-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-pharma-secondary mb-3">Reminder Notifications</h3>
              <p className="text-pharma-darkgray">
                Receive automated email and text reminders to ensure you never miss an appointment.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover-elevate">
              <div className="w-16 h-16 rounded-full bg-pharma-green/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-pharma-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-pharma-secondary mb-3">Easy Rescheduling</h3>
              <p className="text-pharma-darkgray">
                Need to change your appointment? Easily reschedule online without making a phone call.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 px-4 md:px-0">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pharma-secondary mb-4">Frequently Asked Questions</h2>
            <p className="text-pharma-darkgray">
              Find answers to common questions about our appointment services.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-pharma-secondary mb-2">What types of appointments do you offer?</h3>
              <p className="text-pharma-darkgray">
                We offer various appointment types including medication consultations, prescription reviews, wellness checkups, and vaccination services. Each appointment type is tailored to address specific healthcare needs.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-pharma-secondary mb-2">How long before my appointment should I arrive?</h3>
              <p className="text-pharma-darkgray">
                We recommend arriving 10-15 minutes before your scheduled appointment time to complete any necessary paperwork and ensure a smooth check-in process.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-pharma-secondary mb-2">What should I bring to my appointment?</h3>
              <p className="text-pharma-darkgray">
                Please bring a valid ID, insurance information (if applicable), a list of current medications, and any relevant medical records or prescription information. For medication consultations, bring all medications you're currently taking.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-pharma-secondary mb-2">Can I reschedule or cancel my appointment?</h3>
              <p className="text-pharma-darkgray">
                Yes, you can reschedule or cancel your appointment up to 24 hours before your scheduled time without any fee. Please use our online portal or contact us directly to make changes to your appointment.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-pharma-secondary mb-2">Do you accept insurance for consultations?</h3>
              <p className="text-pharma-darkgray">
                We accept most major insurance plans for our consultation services. You can verify your insurance coverage when booking your appointment or contact our office for specific information regarding your plan.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Appointments;
