"use client";

import React, { useState, useEffect } from 'react';
import { PenTool, Eye, EyeOff, Mail, Lock, ArrowLeft, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from "axios";

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    //   @ts-ignore
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

    //@ts-ignore
  const validateField = (name, value) => {
    const fieldErrors = {
      email: "",
      password: ""
    };

    switch (name) {
      case 'email':
        if (!value.trim()) {
          fieldErrors.email = 'Email is required';
        }
        break;

      case 'password':
        if (!value) {
          fieldErrors.password = 'Password is required';
        } else if (value.length < 8) {
          fieldErrors.password = 'Password must be at least 8 characters';
        } else if (value.length > 20) {
          fieldErrors.password = 'Password must not exceed 20 characters';
        }
        break;
    }
    return fieldErrors;
  };

//   @ts-ignore
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    if (type !== 'checkbox') {
      const fieldErrors = validateField(name, newValue);
      setErrors(prev => ({
        ...prev,
        //   @ts-ignore
        [name]: fieldErrors[name] || ''
      }));
    }
  }

  const validateAllFields = () => {
    const allErrors = {};
    
    // Validate all fields
    Object.keys(formData).forEach(key => {
      if (key !== 'agreeToTerms') {
        //   @ts-ignore
        const fieldErrors = validateField(key, formData[key]);
        //   @ts-ignore
        if (fieldErrors[key]) {
            //   @ts-ignore
          allErrors[key] = fieldErrors[key];
        }
      }
    });

    return allErrors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateAllFields();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await axios.post('http://localhost:3001/signin', {
        email: formData.email,
        password: formData.password
      }).then((res) => {
        localStorage.setItem("token", res.data.token);
      });
      router.push('/dashboard')
    } catch (e) {
      setErrors({ submit: "Incorrect Credentials. try again!" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (  
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
          style={{
            left: mousePosition.x * 0.02 + 'px',
            top: mousePosition.y * 0.02 + 'px'
          }}
        />
        <div 
          className="absolute w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"
          style={{
            right: mousePosition.x * -0.02 + 'px',
            bottom: mousePosition.y * -0.02 + 'px',
            animationDelay: '1s'
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors" onClick={() => {
              router.push('/');
            }}>
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-2 ml-25">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <PenTool className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              DrawFlow
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-600 hidden sm:block">Don't have an account?</span>
            <button className="text-purple-600 hover:text-purple-700 font-medium transition-colors" onClick={() => {
              router.push('/signup');
            }}>
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          {/* Sign In Card */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 relative">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Welcome Back
                </span>
              </h1>
              <p className="text-gray-600">Sign in to continue creating</p>
            </div>

            <div className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors bg-white/50 hover:bg-white/70 ${
                      // @ts-ignore
                      errors.email 
                        ? 'border-red-400 focus:border-red-500' 
                        : 'border-gray-200 focus:border-purple-400'
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {/* @ts-ignore */}
                {errors.email && (
                  <p className="text-red-500 text-sm flex items-center space-x-1">
                    <span>⚠️</span>
                    {/* @ts-ignore */}
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-11 pr-11 py-3 border-2 rounded-lg focus:outline-none transition-colors bg-white/50 hover:bg-white/70 ${
                      // @ts-ignore
                      errors.password 
                        ? 'border-red-400 focus:border-red-500' 
                        : 'border-gray-200 focus:border-purple-400'
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {/* @ts-ignore */}
                {errors.password && (
                  <p className="text-red-500 text-sm flex items-center space-x-1">
                    <span>⚠️</span>
                    {/* @ts-ignore */}
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>

              {/* general error */}
              {/* @ts-ignore */}
              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm flex items-center space-x-1">
                    <span>⚠️</span>
                    {/* @ts-ignore */}
                    <span>{errors.submit}</span>
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 transform ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:scale-105 active:scale-95'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-8">
              <span className="text-gray-600">New to DrawFlow? </span>
              <button className="text-purple-600 hover:text-purple-700 font-medium transition-colors hover:underline" onClick={() => {
                router.push('/signup')
              }}>
                Create an account
              </button>
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3s' }}></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}