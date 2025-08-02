'use client';

import React, { useState } from 'react';
import { Menu, X, Activity, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router= useRouter();
  return (
    <header className="bg-white/90 backdrop-blur-md fixed w-full top-0 z-50 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-green-500 p-2 rounded-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">UptimeGuard</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
                <span>Features</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#docs" className="text-gray-700 hover:text-blue-600 transition-colors">Docs</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-blue-600 transition-colors" onClick={()=>{
              router.push('/signin');
            }}>Sign in</button>
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl" onClick={()=>{
              router.push('/signup');
            }}>
              Start Free Trial
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#docs" className="text-gray-700 hover:text-blue-600 transition-colors">Docs</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a>
              <div className="pt-4 border-t border-gray-200">
                <button className="text-gray-700 hover:text-blue-600 transition-colors block w-full text-left mb-2">Sign in</button>
                <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg w-full">
                  Start Free Trial
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;