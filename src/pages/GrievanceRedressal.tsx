import { Phone, Mail, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function GrievanceRedressal() {
  const [formData, setFormData] = useState({
    name: '',
    contactDetails: '',
    categoryOfIssue: '',
    descriptionOfComplaint: '',
    supportingDocuments: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Page Title */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl text-[#333333] mb-3 font-normal">Grievance Redressal</h1>
          <div className="h-1.5 w-16 bg-[#0066cc]"></div>
        </div>

        {/* Top Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-16">
          
          {/* Left Column: Contact Info */}
          <div className="lg:col-span-5 space-y-12">
            
            {/* Grievance Officer Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl text-[#333333] mb-6 font-semibold">Grievance Officer</h2>
              </div>

              {/* Name */}
              <div className="space-y-4">
                <h3 className="text-[18px] font-bold text-[#333333]">Name</h3>
                <p className="text-[15px] text-[#555555] font-sans">Himanshu Sahu</p>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                <h3 className="text-[18px] font-bold text-[#333333]">Contact Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail size={18} className="text-[#0066cc] mt-1 shrink-0" />
                    <div>
                      <p className="text-[12px] text-[#666666] mb-1">Email</p>
                      <a href="mailto:grievance.officer@voltworks.com" className="text-[15px] font-sans text-[#333333] hover:text-[#0066cc] transition-colors break-all">
                        grievance.officer@voltworks.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone size={18} className="text-[#0066cc] mt-1 shrink-0" />
                    <div>
                      <p className="text-[12px] text-[#666666] mb-1">Phone</p>
                      <a href="tel:+917840014902" className="text-[15px] font-sans text-[#333333] hover:text-[#0066cc] transition-colors">
                        +91 78400 14902
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-[#0066cc] mt-1 shrink-0" />
                    <div>
                      <p className="text-[12px] text-[#666666] mb-1">Postal Address</p>
                      <p className="text-[15px] text-[#333333] leading-[1.8] space-y-1 font-sans">
                        Plot No.1, Ecotech - II,<br />
                        Knowledge Park - III,<br />
                        Greater Noida, GB Nagar,<br />
                        Uttar Pradesh - 201306
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resolution Timeline */}
              <div className="space-y-4 pt-6 border-t border-slate-300">
                <h3 className="text-[18px] font-bold text-[#333333]">Resolution Timeline</h3>
                <p className="text-[15px] text-[#555555] font-sans leading-relaxed">
                  We acknowledge complaints within 48 hours and resolve them within 30 days.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Complaint Submission Form */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl text-[#333333] mb-3 font-semibold">Complaint Submission Form</h2>
              <div className="h-1.5 w-16 bg-[#0066cc]"></div>
            </div>

            <form action="https://formsubmit.co/grievance.officer@voltworks.com" method="POST" className="space-y-6 pt-2 font-sans text-[15px]">
              <input type="hidden" name="_subject" value="VoltWorks Grievance Redressal Form Submission" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-x-12 sm:gap-y-8">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[#333333] block">
                    Name <span className="text-[#333333]">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-slate-400 px-3 py-2 mt-1 focus:outline-none focus:border-[#0066cc] transition-colors bg-transparent"
                    placeholder="Your full name"
                  />
                </div>

                {/* Contact Details */}
                <div className="space-y-2">
                  <label htmlFor="contactDetails" className="text-[#333333] block">
                    Contact Details <span className="text-[#333333]">*</span>
                  </label>
                  <input
                    id="contactDetails"
                    name="contactDetails"
                    type="text"
                    required
                    value={formData.contactDetails}
                    onChange={handleChange}
                    className="w-full border border-slate-400 px-3 py-2 mt-1 focus:outline-none focus:border-[#0066cc] transition-colors bg-transparent"
                    placeholder="Email or phone number"
                  />
                </div>
              </div>

              {/* Category of Issue */}
              <div className="space-y-2">
                <label htmlFor="categoryOfIssue" className="text-[#333333] block">
                  Category of Issue <span className="text-[#333333]">*</span>
                </label>
                <select
                  id="categoryOfIssue"
                  name="categoryOfIssue"
                  required
                  value={formData.categoryOfIssue}
                  onChange={handleChange}
                  className="w-full border border-slate-400 px-3 py-2 mt-1 focus:outline-none focus:border-[#0066cc] transition-colors bg-white"
                >
                  <option value="">Select a category</option>
                  <option value="Product Quality">Product Quality</option>
                  <option value="Delivery Issue">Delivery Issue</option>
                  <option value="Service Issue">Service Issue</option>
                  <option value="Billing Discrepancy">Billing Discrepancy</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Description of Complaint */}
              <div className="space-y-2">
                <label htmlFor="descriptionOfComplaint" className="text-[#333333] block">
                  Description of Complaint <span className="text-[#333333]">*</span>
                </label>
                <textarea
                  id="descriptionOfComplaint"
                  name="descriptionOfComplaint"
                  required
                  value={formData.descriptionOfComplaint}
                  onChange={handleChange}
                  rows={5}
                  className="w-full border border-slate-400 px-3 py-2 mt-1 focus:outline-none focus:border-[#0066cc] transition-colors bg-transparent resize-none"
                  placeholder="Please provide detailed information about your complaint..."
                />
              </div>

              {/* Supporting Documents/Screenshots */}
              <div className="space-y-2">
                <label htmlFor="supportingDocuments" className="text-[#333333] block">
                  Supporting Documents/Screenshots
                </label>
                <input
                  id="supportingDocuments"
                  name="supportingDocuments"
                  type="text"
                  value={formData.supportingDocuments}
                  onChange={handleChange}
                  className="w-full border border-slate-400 px-3 py-2 mt-1 focus:outline-none focus:border-[#0066cc] transition-colors bg-transparent"
                  placeholder="Describe any attachments or reference URLs"
                />
              </div>

              {/* Submit Button */}
              <div className="flex flex-col items-center sm:items-start gap-4 pt-6 pb-2">
                <button
                  type="submit"
                  className="bg-gradient-to-b from-[#4a5568] to-[#2d3748] text-white px-10 py-3 rounded-md hover:from-[#3a4454] hover:to-[#1a202c] transition-all font-medium min-w-[130px] w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  Submit Complaint
                </button>
              </div>
            </form>

            <p className="text-[13px] text-[#666666] font-sans mt-6">
              <span className="font-semibold">Note:</span> All fields marked with <span className="text-[#333333]">*</span> are required. We appreciate your patience as we work to resolve your concern.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
