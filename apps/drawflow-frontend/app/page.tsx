"use client";

import React, { useState, useEffect } from 'react';
import { PenTool, Zap, Users, Layers, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ExcalidrawLanding() {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // @ts-ignore
  const FloatingElement = ({ delay = 0, children, className = "" }) => (
    <div 
      className={`animate-bounce ${className}`}
      style={{ 
        animationDelay: `${delay}s`,
        animationDuration: '3s'
      }}
    >
      {children}
    </div>
  );

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
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <PenTool className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              DrawFlow
            </span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium">
                  <Zap className="w-4 h-4" />
                  <span>New: Real-time collaboration</span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Draw, Design,
                  </span>
                  <br />
                  <span className="text-gray-900">Collaborate</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Create beautiful diagrams, wireframes, and illustrations with our intuitive drawing tool. 
                  Perfect for teams, designers, and anyone who thinks visually.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 cursor-pointer" onClick={() => {
                      router.push('/signup')
                }}>
                  <span>Sign Up</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-purple-400 hover:text-purple-600 transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer" onClick={() => {
                  router.push('/signin');
                }}>
                  <span>Sign In</span>
                </button>
              </div>
            </div>

            {/* Interactive Canvas Preview */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5"></div>
                
                {/* Simulated drawing canvas */}
                <div className="relative h-80 bg-gray-50 rounded-lg overflow-hidden">
                  {/* Floating drawing elements */}
                  <FloatingElement delay={0} className="absolute top-4 left-4">
                    <div className="w-16 h-16 bg-purple-200 rounded-lg flex items-center justify-center">
                      <PenTool className="w-8 h-8 text-purple-600" />
                    </div>
                  </FloatingElement>
                  
                  <FloatingElement delay={1} className="absolute top-12 right-8">
                    <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                      <Layers className="w-6 h-6 text-blue-600" />
                    </div>
                  </FloatingElement>
                  
                  <FloatingElement delay={0.5} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="w-20 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
                  </FloatingElement>

                  {/* Simulated drawing strokes */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200">
                    <path
                      d="M50,150 Q100,50 150,100 T250,80"
                      stroke="url(#gradient)"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      className="animate-pulse"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Everything you need
              </span>
            </h2>
            <p className="text-xl text-gray-600">Powerful tools for visual collaboration</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: PenTool,
                title: "Intuitive Drawing",
                description: "Natural drawing experience with pressure-sensitive strokes and smooth curves"
              },
              {
                icon: Users,
                title: "Real-time Collaboration", 
                description: "Work together seamlessly with live cursors and instant synchronization"
              },
              {
                icon: Layers,
                title: "Infinite Canvas",
                description: "Unlimited space for your ideas with smart organization and layering"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">Ready to start creating?</h2>
              <p className="text-xl mb-8 text-purple-100">
                Join thousands of creators who use DrawFlow for their visual projects
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105 cursor-pointer" onClick={() => {
                router.push('/signup')
              }}>
                  Sign Up
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-200 cursor-pointer" onClick={() => {
                  router.push('/signin');
                }}>
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <PenTool className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">DrawFlow</span>
          </div>
          <p className="text-gray-400">
            © 2025 DrawFlow
          </p>
        </div>
      </footer>
    </div>
  );
}