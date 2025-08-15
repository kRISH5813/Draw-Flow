"use client";

import React, { useState, useEffect } from 'react';
import { PenTool, Plus, Users, LogOut, Hash, User, ArrowRight, Copy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Dashboard() {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [createRoomData, setCreateRoomData] = useState({
    roomSlug: ''
  });
  const [joinRoomData, setJoinRoomData] = useState({
    roomSlug: ''
  });
  const [errors, setErrors] = useState({});
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const createRoomWithAuth = () => {
      const token = localStorage.getItem('token');

      if (!token) {
        window.location.href = '/';
        return;
      }
    }
    createRoomWithAuth();       
  }, []);

  const handleCreateRoomChange = (e: any) => {
    const { name, value } = e.target;
    setCreateRoomData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleJoinRoomChange = (e: any) => {
    const { name, value } = e.target;
    setJoinRoomData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateCreateRoom = () => {
    const validationErrors = {};

    if (!createRoomData.roomSlug.trim()) {
      // @ts-ignore
      validationErrors.roomSlug = 'Room slug is required';
    } else if (createRoomData.roomSlug.length < 3) {
      // @ts-ignore
      validationErrors.roomSlug = 'Room slug must be at least 3 characters';
    }

    return validationErrors;
  };

  const validateJoinRoom = () => {
    const validationErrors = {};

    if (!joinRoomData.roomSlug.trim()) {
      // @ts-ignore
      validationErrors.joinRoomSlug = 'Room slug is required';
    } else if (joinRoomData.roomSlug.length < 3) {
      // @ts-ignore
      validationErrors.joinRoomSlug = 'Room slug must be at least 3 characters';
    }

    return validationErrors;
  };

  const handleCreateRoom = async () => {
    const validationErrors = validateCreateRoom();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsCreating(true);
    setErrors({});

    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:3001/room', {
          name: createRoomData.roomSlug.toString(),
        }, {
          headers: {
            'Authorization': `${token}`
          }
        })

        // recentRooms.push(response.data.roomId)
        router.push(`/canvas/${response.data.roomId}`)
    } catch(e) {
      console.log({ message: "try another name"})
    }
  };

  const handleJoinRoom = async () => {
    const validationErrors = validateJoinRoom();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsJoining(true);
    setErrors({});

    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3001/chat/id/${joinRoomData.roomSlug}`, {
          headers: {
            'Authorization': `${token}`
          }
        })

        // recentRooms.push(response.data.roomId.id);
        router.push(`/canvas/${response.data.room.id}`);
    } catch(e) {
      console.log({ message: "try another name"})
    }
  };

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    
    // Redirect to landing page or login
    console.log('Logging out...');
    router.push('/');
    // window.location.href = '/';
  };

  const copyToClipboard = (text: any) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
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
      <nav className="relative z-10 px-6 py-4 bg-white/60 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <PenTool className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              DrawFlow
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors px-4 py-2 rounded-lg hover:bg-red-50 cursor-pointer"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:block">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Your Creative Space
              </span>
            </h1>
            <p className="text-xl text-gray-600">Create a new drawing room or join an existing one</p>
          </div>

          {/* Action Cards */}
          <div className="mb-12">
            {/* Create Room Card */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden mb-10">
              {/* Card Header - Always Visible */}
              <div 
                className="p-8 cursor-pointer hover:bg-white/90 transition-colors"
                onClick={() => setShowCreateForm(!showCreateForm)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center animate-pulse">
                      <Plus className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-left">
                      <h2 className="text-2xl font-bold mb-1">
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                          Create Room
                        </span>
                      </h2>
                      <p className="text-gray-600">Start a new drawing session</p>
                    </div>
                  </div>
                  <div className={`transform transition-transform duration-200 ${showCreateForm ? 'rotate-45' : ''}`}>
                    <Plus className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Collapsible Form Content */}
              <div className={`transition-all duration-300 ease-in-out ${showCreateForm ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="px-8 pb-8 pt-0">
                  <div className="space-y-6">
                    {/* Room Slug Input */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Room Slug</label>
                      <div className="relative">
                        <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="roomSlug"
                          value={createRoomData.roomSlug}
                          onChange={handleCreateRoomChange}
                          className={`w-full pl-11 pr-10 py-3 border-2 rounded-lg focus:outline-none transition-colors bg-white/50 hover:bg-white/70 ${
                            // @ts-ignore
                            errors.roomSlug 
                              ? 'border-red-400 focus:border-red-500' 
                              : 'border-gray-200 focus:border-purple-400'
                          }`}
                          placeholder="my-awesome-room"
                        />
                        <button
                          type="button"
                          onClick={() => copyToClipboard(createRoomData.roomSlug)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      {/* @ts-ignore */}
                      {errors.roomSlug && (
                        <p className="text-red-500 text-sm flex items-center space-x-1">
                          <span>⚠️</span>
                          {/* @ts-ignore */}
                          <span>{errors.roomSlug}</span>
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        Only lowercase letters, numbers, and hyphens allowed.
                      </p>
                    </div>

                    {/* Create Room Error */}
                    {/* @ts-ignore */}
                    {errors.createRoom && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-red-600 text-sm flex items-center space-x-1">
                          <span>⚠️</span>
                          {/* @ts-ignore */}
                          <span>{errors.createRoom}</span>
                        </p>
                      </div>
                    )}

                    {/* Create Button */}
                    <button
                      onClick={handleCreateRoom}
                      disabled={isCreating}
                      className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 transform flex items-center justify-center space-x-2 ${
                        isCreating
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:scale-105 active:scale-95'
                      }`}
                    >
                      {isCreating ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Creating Room...</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-5 h-5" />
                          <span>Create Room</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
            </div>

            {/* Join Room Card */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden">
              {/* Card Header - Always Visible */}
              <div 
                className="p-8 cursor-pointer hover:bg-white/90 transition-colors"
                onClick={() => setShowJoinForm(!showJoinForm)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center animate-pulse" style={{ animationDelay: '0.5s' }}>
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-left">
                      <h2 className="text-2xl font-bold mb-1">
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          Join Room
                        </span>
                      </h2>
                      <p className="text-gray-600">Enter an existing room</p>
                    </div>
                  </div>
                  <div className={`transform transition-transform duration-200 ${showJoinForm ? 'rotate-45' : ''}`}>
                    <Plus className="w-6 h-6 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Collapsible Form Content */}
              <div className={`transition-all duration-300 ease-in-out ${showJoinForm ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="px-8 pb-8 pt-0">
                  <div className="space-y-6">
                    {/* Room Slug Input */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Room Slug</label>
                      <div className="relative">
                        <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="roomSlug"
                          value={joinRoomData.roomSlug}
                          onChange={handleJoinRoomChange}
                          className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors bg-white/50 hover:bg-white/70 ${
                            // @ts-ignore
                            errors.joinRoomSlug 
                              ? 'border-red-400 focus:border-red-500' 
                              : 'border-gray-200 focus:border-purple-400'
                          }`}
                          placeholder="enter-room-slug"
                        />
                      </div>
                      {/* @ts-ignore */}
                      {errors.joinRoomSlug && (
                        <p className="text-red-500 text-sm flex items-center space-x-1">
                          <span>⚠️</span>
                          {/* @ts-ignore */}
                          <span>{errors.joinRoomSlug}</span>
                        </p>
                      )}
                    </div>

                    {/* Join Room Error */}
                    {/* @ts-ignore */}
                    {errors.joinRoom && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-red-600 text-sm flex items-center space-x-1">
                          <span>⚠️</span>
                          {/* @ts-ignore */}
                          <span>{errors.joinRoom}</span>
                        </p>
                      </div>
                    )}

                    {/* Join Button */}
                    <button
                      onClick={handleJoinRoom}
                      disabled={isJoining}
                      className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 transform flex items-center justify-center space-x-2 ${
                        isJoining
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105 active:scale-95'
                      }`}
                    >
                      {isJoining ? (
                        <div className={"flex gap-2 justify-center items-center"}>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <div>Joining Room...</div>
                        </div>
                      ) : (
                        <>
                          <ArrowRight className="w-5 h-5" />
                          <span>Join Room</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative Element */}
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}