import { Link } from 'react-router-dom';
import { Linkedin, Twitter } from 'lucide-react';
import logo from '../public/Voltworks logo horizontal.svg';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6 md:px-16 w-full">
        <div className="mb-12">
          <Link to="/">
            <img
              src={logo}
              alt="Voltworks Logo"
              className="h-8 md:h-10 w-auto object-contain"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Products Column */}
          <div>
            <h4 className="text-xl font-bold text-slate-900 mb-4 inline-block">
              Products
              <div className="h-1 w-12 bg-primary mt-2"></div>
            </h4>
            <ul className="space-y-4 text-slate-600 font-body">
              <li>
                <Link to="/products" className="hover:text-primary transition-colors">
                  Electric Motors
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-primary transition-colors">
                  Motor Controller
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-xl font-bold text-slate-900 mb-4 inline-block">
              Company
              <div className="h-1 w-12 bg-primary mt-2"></div>
            </h4>
            <ul className="space-y-4 text-slate-600 font-body">
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-primary transition-colors">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Spacer for layout (if you want the right section pushed far right, or just span 2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xl font-bold text-slate-900 mb-4 inline-block">
              Ready to Get Started?
              <div className="h-1 w-12 bg-primary mt-2"></div>
            </h4>
            <p className="text-slate-600 mb-6 font-body">
              Connect to learn more about the tech
            </p>
            <Link to="/contact" className="inline-block bg-slate-800 text-white font-sans text-sm font-bold px-8 py-3 rounded-md hover:bg-slate-700 transition-all shadow-md mb-10">
              Contact
            </Link>

            <h4 className="text-xl font-bold text-slate-900 mb-4 block">
              Get Connected
              <div className="h-1 w-12 bg-primary mt-2"></div>
            </h4>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/voltworks/" title="LinkedIn" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-700 text-white rounded-md flex items-center justify-center hover:bg-primary transition-colors hover:-translate-y-1 transform duration-200">
                <Linkedin size={20} />
              </a>
              <a href="https://x.com/voltworks_in" title="Twitter" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-700 text-white rounded-md flex items-center justify-center hover:bg-primary transition-colors hover:-translate-y-1 transform duration-200">
                <Twitter size={20} />
              </a>
              <a href="https://wa.me/919651184831" target="_blank" rel="noopener noreferrer" title="WhatsApp" className="w-10 h-10 bg-slate-700 text-white rounded-md flex items-center justify-center hover:bg-primary transition-colors hover:-translate-y-1 transform duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 text-center text-slate-500 font-body text-sm">
          <p>Copyright Â© 2024. All Rights Reserved.</p>
          <p>VoltWorks Technologies Private Limited</p>
        </div>
      </div>
    </footer>
  );
}
