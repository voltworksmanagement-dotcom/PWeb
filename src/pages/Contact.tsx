import { Phone, Mail, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        firstName: '',
        lastName: '',
        company: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
      });
      alert('Demo request submitted successfully!');
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Top Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-16">
          
          {/* Left Column: Contact Info */}
          <div className="lg:col-span-5 space-y-12">
            
            {/* Contact Us Section */}
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl md:text-4xl text-[#333333] mb-3 font-normal">Contact Us</h1>
                <div className="h-1.5 w-16 bg-[#0066cc]"></div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border-2 border-[#0066cc] flex items-center justify-center text-[#0066cc] shrink-0">
                    <Phone size={18} fill="currentColor" className="text-[#0066cc]" />
                  </div>
                  <a href="tel:+919651184831" className="text-[15px] font-sans text-[#333333] hover:text-[#0066cc] transition-colors">
                    (+91) 965-118-4831
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0066cc] flex items-center justify-center text-white shrink-0">
                    <Mail size={18} />
                  </div>
                  <a href="mailto:info@voltworks.in" className="text-[15px] font-sans text-[#333333] hover:text-[#0066cc] transition-colors">
                    info@voltworks.in
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
                {/* Corporate Office */}
                <div className="space-y-4">
                  <h3 className="text-[22px] font-bold text-[#333333]">Corporate Office</h3>
                  <div className="text-[15px] text-[#333333] leading-[1.8] space-y-1 font-sans">
                    <p>Plot No.1, Ecotech - II</p>
                    <p>Knowledge Park - III</p>
                    <p>Greater Noida, GB Nagar</p>
                    <p>Uttar Pradesh - 201306</p>
                  </div>
                </div>

                {/* Manufacturing Unit */}
                <div className="space-y-4">
                  <h3 className="text-[22px] font-bold text-[#333333]">Manufacturing Unit</h3>
                  <div className="text-[15px] text-[#333333] leading-[1.8] space-y-1 font-sans">
                    <p>Plot No. 63, Ecotech - II</p>
                    <p>Udyog Vihar Extension</p>
                    <p>Greater Noida, GB Nagar</p>
                    <p>Uttar Pradesh - 201306</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Demo Form */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl text-[#333333] mb-3 font-normal">Get in Touch for Demo</h2>
              <div className="h-1.5 w-16 bg-[#0066cc]"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 pt-2 font-sans text-[15px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-x-12 sm:gap-y-8">
                {/* First Name */}
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-[#333333] block">
                    First Name <span className="text-[#333333]">*</span>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full border border-slate-400 px-3 py-2 mt-1 focus:outline-none focus:border-[#0066cc] transition-colors bg-transparent"
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-[#333333] block">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full border border-slate-400 px-3 py-2 mt-1 focus:outline-none focus:border-[#0066cc] transition-colors bg-transparent"
                  />
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <label htmlFor="company" className="text-[#333333] block">
                    Company
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full border border-slate-400 px-3 py-2 mt-1 focus:outline-none focus:border-[#0066cc] transition-colors bg-transparent"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-[#333333] block">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-slate-400 px-3 py-2 mt-1 focus:outline-none focus:border-[#0066cc] transition-colors bg-transparent"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[#333333] block">
                    Email <span className="text-[#333333]">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-slate-400 px-3 py-2 mt-1 focus:outline-none focus:border-[#0066cc] transition-colors bg-transparent"
                  />
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-[#333333] block">
                    Subject <span className="text-[#333333]">*</span>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full border border-slate-400 px-3 py-2 mt-1 focus:outline-none focus:border-[#0066cc] transition-colors bg-transparent"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-3 pt-2">
                <label htmlFor="message" className="text-[#333333] block">
                  Leave us a message...
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="I would like to get the technical details for 2 Wheeler L2 Powertrain"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-slate-400 px-4 py-3 mt-1 focus:outline-none focus:border-[#0066cc] transition-colors resize-none placeholder:text-[#333333] placeholder:opacity-90 bg-transparent text-[15px]"
                ></textarea>
              </div>

              {/* Loader and Submit Box */}
              <div className="flex flex-col items-center sm:items-start gap-4 pt-6 pb-2">
                <div className="flex justify-center w-full sm:w-[130px] mb-2 sm:mb-0 h-6">
                  {isSubmitting && (
                    <Loader2 className="animate-spin text-[#0066cc]" size={24} />
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-b from-[#4a5568] to-[#2d3748] text-white px-10 py-3 rounded-md hover:from-[#3a4454] hover:to-[#1a202c] transition-all font-medium min-w-[130px] w-full sm:w-auto disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Section: Mailing List */}
        <div className="mt-8 lg:-mt-16">
          <div className="max-w-[400px]">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl text-[#333333] mb-3 font-normal">Join the Mailing List</h2>
                <div className="h-1.5 w-16 bg-[#0066cc]"></div>
              </div>
              
              <form className="space-y-6 pt-2 font-sans">
                <div className="space-y-2">
                  <label htmlFor="mailing-email" className="text-[#333333] text-[15px] block">
                    Enter your email here <span className="text-[#333333]">*</span>
                  </label>
                  <input
                    id="mailing-email"
                    type="email"
                    required
                    className="w-full border border-slate-400 px-4 py-2 mt-1 focus:outline-none focus:border-[#0066cc] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-b from-[#4a5568] to-[#2d3748] text-white px-10 py-3 rounded-md hover:from-[#3a4454] hover:to-[#1a202c] transition-all font-medium text-[15px] w-full sm:w-auto min-w-[130px]"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
