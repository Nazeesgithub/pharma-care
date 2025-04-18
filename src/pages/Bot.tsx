import { useState, useRef, ChangeEvent } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PillAnimation from '../components/PillAnimation';
import MedChat from '../components/MedChat';

const Bot = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<null | {
    medications: Array<{
      name: string;
      dosage: string;
      frequency: string;
      description: string;
      sideEffects: string[];
      interactions: string[];
    }>;
  }>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    
    if (selectedFile) {
      setFile(selectedFile);
      
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(selectedFile);
      
      setResults(null);
    }
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    const droppedFile = e.dataTransfer.files?.[0] || null;
    
    if (droppedFile) {
      setFile(droppedFile);
      
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(droppedFile);
      
      setResults(null);
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const handleAnalyze = () => {
    if (!file) return;
    
    setAnalyzing(true);
    
    setTimeout(() => {
      const mockResults = {
        medications: [
          {
            name: "Lisinopril",
            dosage: "10mg",
            frequency: "Once daily",
            description: "Used to treat high blood pressure (hypertension) and heart failure.",
            sideEffects: [
              "Dry cough",
              "Dizziness",
              "Headache",
              "Fatigue"
            ],
            interactions: [
              "NSAIDs (like ibuprofen)",
              "Potassium supplements",
              "Salt substitutes",
              "Lithium"
            ]
          },
          {
            name: "Metformin",
            dosage: "500mg",
            frequency: "Twice daily with meals",
            description: "Used to manage type 2 diabetes by improving blood sugar control.",
            sideEffects: [
              "Nausea",
              "Vomiting",
              "Diarrhea",
              "Stomach pain",
              "Metal taste in mouth"
            ],
            interactions: [
              "Alcohol",
              "Iodinated contrast materials",
              "Certain antibiotics",
              "Other diabetes medications"
            ]
          },
          {
            name: "Atorvastatin",
            dosage: "20mg",
            frequency: "Once daily at bedtime",
            description: "Used to lower cholesterol and reduce the risk of heart attack and stroke.",
            sideEffects: [
              "Muscle pain or weakness",
              "Joint pain",
              "Nausea",
              "Diarrhea"
            ],
            interactions: [
              "Grapefruit juice",
              "Certain antibiotics",
              "Antifungal medications",
              "HIV medications"
            ]
          }
        ]
      };
      
      setResults(mockResults);
      setAnalyzing(false);
    }, 3000);
  };
  
  const resetUpload = () => {
    setFile(null);
    setPreviewUrl(null);
    setResults(null);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 md:px-0">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-pharma-secondary">Med Bot</h1>
          <p className="text-pharma-darkgray text-lg max-w-3xl mx-auto">
            Upload your prescription or medication list to get detailed information, potential side effects, and interaction warnings.
          </p>
        </div>
      </section>
      
      {/* Main Content Grid */}
      <section className="py-12 px-4 md:px-0">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Prescription Upload Section */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Upload Area */}
                <div className="p-8 md:p-12 order-2 lg:order-1">
                  <h2 className="text-2xl font-bold text-pharma-secondary mb-6">Upload Your Prescription</h2>
                  
                  {!file ? (
                    <div 
                      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-pharma-primary transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                    >
                      <svg className="w-16 h-16 text-pharma-gray mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <h3 className="text-lg font-semibold text-pharma-secondary mb-2">Drag & Drop or Click to Upload</h3>
                      <p className="text-pharma-darkgray text-sm mb-4">
                        Supported file types: JPG, PNG, PDF<br />
                        Max file size: 5MB
                      </p>
                      <button className="px-6 py-2 bg-pharma-primary text-white rounded-lg hover:bg-pharma-secondary transition-colors">
                        Select File
                      </button>
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        className="hidden" 
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={handleFileChange}
                      />
                    </div>
                  ) : (
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-pharma-secondary">File Uploaded</h3>
                        <button 
                          onClick={resetUpload}
                          className="text-pharma-primary hover:text-pharma-secondary"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      </div>
                      
                      <div className="flex items-center p-4 bg-pharma-gray rounded-lg">
                        <div className="flex-shrink-0 mr-4">
                          <svg className="w-8 h-8 text-pharma-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                          </svg>
                        </div>
                        <div className="overflow-hidden">
                          <p className="font-medium text-pharma-secondary truncate">{file.name}</p>
                          <p className="text-sm text-pharma-darkgray">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <button 
                          onClick={handleAnalyze}
                          disabled={analyzing}
                          className={`w-full px-6 py-3 rounded-lg text-white font-semibold ${
                            analyzing 
                              ? 'bg-pharma-gray text-pharma-darkgray cursor-not-allowed' 
                              : 'bg-pharma-primary hover:bg-pharma-secondary transition-colors'
                          }`}
                        >
                          {analyzing ? (
                            <span className="flex items-center justify-center">
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Analyzing Prescription...
                            </span>
                          ) : "Analyze Prescription"}
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Privacy Notice */}
                  <div className="mt-8 bg-blue-50 text-blue-800 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Privacy Notice
                    </h3>
                    <p className="text-sm">
                      Your prescription data is processed securely and is not stored on our servers after analysis. This tool is for informational purposes only and should not replace professional medical advice.
                    </p>
                  </div>
                </div>
                
                {/* Animation/Preview Area */}
                <div className="bg-pharma-gray p-8 md:p-12 flex items-center justify-center order-1 lg:order-2">
                  {previewUrl ? (
                    <div className="w-full">
                      <h3 className="text-lg font-semibold text-pharma-secondary mb-4">Prescription Preview</h3>
                      <div className="w-full h-64 bg-white rounded-lg overflow-hidden">
                        <img 
                          src={previewUrl} 
                          alt="Prescription preview" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-64">
                      <PillAnimation size={2.5} color="#0078C8" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Chat Section */}
            <div>
              <MedChat />
            </div>
          </div>
        </div>
      </section>
      
      {/* Results Section */}
      {results && (
        <section className="py-12 px-4 md:px-0">
          <div className="container mx-auto max-w-5xl">
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
              <h2 className="text-2xl font-bold text-pharma-secondary mb-8">Analysis Results</h2>
              
              <div className="space-y-8">
                {results.medications.map((medication, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-pharma-primary text-white p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold">{medication.name}</h3>
                          <p className="opacity-90">{medication.dosage} - {medication.frequency}</p>
                        </div>
                        <div className="w-12 h-12">
                          <PillAnimation size={1} color="#ffffff" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-pharma-secondary mb-2">Description</h4>
                        <p className="text-pharma-darkgray">{medication.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold text-pharma-secondary mb-2">Potential Side Effects</h4>
                          <ul className="list-disc pl-5 text-pharma-darkgray">
                            {medication.sideEffects.map((effect, i) => (
                              <li key={i}>{effect}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-semibold text-pharma-secondary mb-2">Potential Interactions</h4>
                          <ul className="list-disc pl-5 text-pharma-darkgray">
                            {medication.interactions.map((interaction, i) => (
                              <li key={i}>{interaction}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 bg-yellow-50 text-yellow-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Important Disclaimer
                </h3>
                <p className="text-sm">
                  This analysis is for informational purposes only and is not a substitute for professional medical advice. Always consult with your healthcare provider or pharmacist about your medications and potential interactions.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Features Section */}
      <section className="py-16 px-4 md:px-0 bg-pharma-gray">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-pharma-secondary mb-4">Med Bot Features</h2>
            <p className="text-pharma-darkgray max-w-3xl mx-auto">
              Our intelligent medication analysis tool helps you better understand your prescriptions and medications.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover-elevate">
              <div className="w-16 h-16 rounded-full bg-pharma-primary/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-pharma-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-pharma-secondary mb-3">Medication Recognition</h3>
              <p className="text-pharma-darkgray">
                Our advanced AI technology can identify medications from prescriptions, even with difficult handwriting or partial information.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover-elevate">
              <div className="w-16 h-16 rounded-full bg-pharma-green/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-pharma-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-pharma-secondary mb-3">Interaction Warnings</h3>
              <p className="text-pharma-darkgray">
                Automatically detects potential drug interactions, food interactions, and lifestyle factors that could affect your medications.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover-elevate">
              <div className="w-16 h-16 rounded-full bg-pharma-primary/10 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-pharma-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-pharma-secondary mb-3">Personalized Information</h3>
              <p className="text-pharma-darkgray">
                Get detailed information about dosages, side effects, and usage instructions specific to your medications.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Bot;
