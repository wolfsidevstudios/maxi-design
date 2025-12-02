
import React from 'react';
import { Template } from '../types';
import { Zap, Copy, Lock, Users, Smartphone, Monitor } from './Icons';

interface CommunityPageProps {
  onCloneTemplate: (template: Template) => void;
}

const MobilePreviewUI = ({ gradient }: { gradient: string }) => (
   <div className={`w-32 h-56 bg-white border-2 border-black rounded-xl overflow-hidden shadow-lg relative flex flex-col`}>
      <div className={`h-12 bg-gradient-to-r ${gradient}`}></div>
      <div className="p-3 space-y-2">
         <div className="h-2 w-16 bg-gray-200 rounded"></div>
         <div className="h-20 bg-gray-100 rounded-lg"></div>
         <div className="flex gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-200"></div>
            <div className="flex-1 space-y-1">
               <div className="h-2 w-full bg-gray-200 rounded"></div>
               <div className="h-2 w-2/3 bg-gray-200 rounded"></div>
            </div>
         </div>
      </div>
      <div className="mt-auto p-2 border-t border-gray-100 flex justify-around">
         <div className="w-4 h-4 rounded bg-gray-200"></div>
         <div className="w-4 h-4 rounded bg-gray-200"></div>
         <div className="w-4 h-4 rounded bg-gray-200"></div>
      </div>
   </div>
);

const WebPreviewUI = ({ gradient }: { gradient: string }) => (
   <div className={`w-48 h-32 bg-white border-2 border-black rounded-xl overflow-hidden shadow-lg relative flex`}>
      <div className="w-12 bg-gray-50 border-r border-gray-100 flex flex-col items-center py-2 gap-2">
         <div className="w-6 h-6 rounded bg-gray-200"></div>
         <div className="w-4 h-4 rounded bg-gray-200 mt-2"></div>
         <div className="w-4 h-4 rounded bg-gray-200"></div>
      </div>
      <div className="flex-1 flex flex-col">
         <div className={`h-8 bg-gradient-to-r ${gradient} border-b border-gray-100`}></div>
         <div className="p-2 grid grid-cols-2 gap-2">
            <div className="h-12 bg-gray-100 rounded"></div>
            <div className="h-12 bg-gray-100 rounded"></div>
            <div className="col-span-2 h-6 bg-gray-100 rounded"></div>
         </div>
      </div>
   </div>
);

// Helper to create simple HTML content for new templates to save space
const createMobileTemplate = (title: string, color: string, icon: string): string => `
<div class="bg-gray-50 min-h-screen font-sans">
  <div class="bg-${color}-600 text-white p-6 rounded-b-[2rem] shadow-lg mb-6">
    <div class="flex justify-between items-center mb-6">
       <div class="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">${icon}</div>
       <div class="w-10 h-10 rounded-full bg-white/20"></div>
    </div>
    <h1 class="text-3xl font-black mb-2">${title}</h1>
    <div class="h-1 w-12 bg-white/50 rounded"></div>
  </div>
  <div class="px-6 space-y-4">
     <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div class="w-12 h-12 bg-${color}-100 rounded-lg"></div>
        <div class="flex-1">
           <div class="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
           <div class="h-3 w-1/2 bg-gray-100 rounded"></div>
        </div>
     </div>
      <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div class="w-12 h-12 bg-${color}-100 rounded-lg"></div>
        <div class="flex-1">
           <div class="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
           <div class="h-3 w-1/2 bg-gray-100 rounded"></div>
        </div>
     </div>
  </div>
</div>
`;

const createWebTemplate = (title: string, color: string): string => `
<div class="min-h-screen bg-gray-50 font-sans flex">
   <div class="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
      <div class="h-8 w-32 bg-${color}-600 rounded mb-8"></div>
      <div class="space-y-4">
         <div class="h-4 w-full bg-gray-100 rounded"></div>
         <div class="h-4 w-full bg-gray-100 rounded"></div>
         <div class="h-4 w-3/4 bg-gray-100 rounded"></div>
      </div>
   </div>
   <div class="flex-1 p-8">
      <div class="flex justify-between items-center mb-8">
         <h1 class="text-2xl font-bold text-gray-900">${title}</h1>
         <button class="bg-${color}-600 text-white px-4 py-2 rounded-lg font-bold">Action</button>
      </div>
      <div class="grid grid-cols-3 gap-6 mb-8">
         <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-32"></div>
         <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-32"></div>
         <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-32"></div>
      </div>
      <div class="bg-white rounded-xl border border-gray-200 shadow-sm h-96"></div>
   </div>
</div>
`;

const TEMPLATES: Template[] = [
  // --- EXISTING TEMPLATES ---
  {
    id: 'crypto-1',
    name: 'Neo-Crypto Wallet',
    description: 'A modern, high-contrast wallet dashboard.',
    category: 'Finance',
    thumbnailGradient: 'from-purple-500 to-indigo-600',
    type: 'mobile',
    theme: { fontBody: 'Inter', fontHeading: 'Space Grotesk', radius: 16, mode: 'dark', primaryColor: '#8B5CF6' },
    code: createMobileTemplate('Crypto Wallet', 'purple', '₿')
  },
  {
    id: 'ecommerce-1',
    name: 'Streetwear Drop',
    description: 'Minimalistic product detail page.',
    category: 'E-Commerce',
    thumbnailGradient: 'from-orange-400 to-red-500',
    type: 'mobile',
    theme: { fontBody: 'Inter', fontHeading: 'Space Grotesk', radius: 0, mode: 'light', primaryColor: '#000000' },
    code: createMobileTemplate('Streetwear', 'orange', '🛍️')
  },
  
  // --- 20 NEW MOBILE TEMPLATES ---
  { id: 'mobile-1', name: 'Fitness Pro', description: 'Dark mode workout tracker', category: 'Health', thumbnailGradient: 'from-emerald-500 to-green-600', type: 'mobile', theme: {fontBody:'Inter', fontHeading:'Inter', radius:20, mode:'dark', primaryColor:'#10B981'}, code: createMobileTemplate('Fitness Pro', 'emerald', '💪') },
  { id: 'mobile-2', name: 'Meditation Zen', description: 'Calming mindfulness app', category: 'Health', thumbnailGradient: 'from-teal-200 to-cyan-300', type: 'mobile', theme: {fontBody:'Inter', fontHeading:'Playfair Display', radius:32, mode:'light', primaryColor:'#14B8A6'}, code: createMobileTemplate('Zen Mind', 'teal', '🧘') },
  { id: 'mobile-3', name: 'Food Delivery', description: 'Vibrant food ordering feed', category: 'Food', thumbnailGradient: 'from-yellow-400 to-orange-500', type: 'mobile', theme: {fontBody:'Inter', fontHeading:'Inter', radius:16, mode:'light', primaryColor:'#F59E0B'}, code: createMobileTemplate('Tasty Eats', 'yellow', '🍔') },
  { id: 'mobile-4', name: 'Travel Guide', description: 'Immersive travel destination', category: 'Travel', thumbnailGradient: 'from-blue-400 to-indigo-500', type: 'mobile', theme: {fontBody:'Inter', fontHeading:'Inter', radius:24, mode:'light', primaryColor:'#3B82F6'}, code: createMobileTemplate('Wanderlust', 'blue', '✈️') },
  { id: 'mobile-5', name: 'Chat App', description: 'Clean messaging interface', category: 'Social', thumbnailGradient: 'from-violet-400 to-purple-500', type: 'mobile', theme: {fontBody:'Inter', fontHeading:'Inter', radius:12, mode:'light', primaryColor:'#8B5CF6'}, code: createMobileTemplate('Messenger', 'violet', '💬') },
  { id: 'mobile-6', name: 'Music Player', description: 'Gradient heavy music player', category: 'Media', thumbnailGradient: 'from-pink-500 to-rose-600', type: 'mobile', theme: {fontBody:'Inter', fontHeading:'Inter', radius:24, mode:'dark', primaryColor:'#EC4899'}, code: createMobileTemplate('Groove', 'pink', '🎵') },
  { id: 'mobile-7', name: 'Task Manager', description: 'Productivity todo list', category: 'Productivity', thumbnailGradient: 'from-gray-700 to-gray-900', type: 'mobile', theme: {fontBody:'Inter', fontHeading:'Inter', radius:8, mode:'light', primaryColor:'#1F2937'}, code: createMobileTemplate('Tasks', 'gray', '✅') },
  { id: 'mobile-8', name: 'News Feed', description: 'Editorial style news reader', category: 'News', thumbnailGradient: 'from-gray-200 to-gray-400', type: 'mobile', theme: {fontBody:'Georgia', fontHeading:'Times New Roman', radius:0, mode:'light', primaryColor:'#000000'}, code: createMobileTemplate('Daily News', 'gray', '📰') },
  { id: 'mobile-9', name: 'Smart Home', description: 'IoT device controller', category: 'Utility', thumbnailGradient: 'from-blue-600 to-cyan-600', type: 'mobile', theme: {fontBody:'Inter', fontHeading:'Inter', radius:20, mode:'dark', primaryColor:'#0284C7'}, code: createMobileTemplate('Home OS', 'cyan', '🏠') },
  { id: 'mobile-10', name: 'Event Ticket', description: 'Ticket booking and QR code', category: 'Events', thumbnailGradient: 'from-purple-600 to-blue-600', type: 'mobile', theme: {fontBody:'Inter', fontHeading:'Inter', radius:16, mode:'dark', primaryColor:'#7C3AED'}, code: createMobileTemplate('Tickets', 'purple', '🎟️') },
  { id: 'mobile-11', name: 'Recipe Book', description: 'Cooking steps and ingredients', category: 'Food', thumbnailGradient: 'from-orange-100 to-amber-200', type: 'mobile', theme: {fontBody:'Inter', fontHeading:'Playfair Display', radius:12, mode:'light', primaryColor:'#D97706'}, code: createMobileTemplate('Cookbook', 'orange', '🍳') },
  { id: 'mobile-12', name: 'Podcast App', description: 'Audio streaming interface', category: 'Media', thumbnailGradient: 'from-indigo-800 to-violet-900', type: 'mobile', theme: {fontBody:'Inter', fontHeading:'Inter', radius:16, mode:'dark', primaryColor:'#6366F1'}, code: createMobileTemplate('Podcasts', 'indigo', '🎙️') },
  { id: 'mobile-13', name: 'Budget Tracker', description: 'Personal finance charts', category: 'Finance', thumbnailGradient: 'from-green-400 to-teal-500', type: 'mobile', theme: {fontBody:'Inter', fontHeading:'Inter', radius:12, mode:'light', primaryColor:'#10B981'}, code: createMobileTemplate('Budget', 'green', '💰') },
  { id: 'mobile-14', name: 'Learning App', description: 'Course progress and lessons', category: 'Education', thumbnailGradient: 'from-blue-300 to-sky-400', type: 'mobile', theme: {fontBody:'Inter', fontHeading:'Inter', radius:20, mode:'light', primaryColor:'#0EA5E9'}, code: createMobileTemplate('Learn', 'sky', '📚') },
  { id: 'mobile-15', name: 'Dating Profile', description: 'Swipe card interface', category: 'Social', thumbnailGradient: 'from-rose-400 to-pink-500', type: 'mobile', theme: {fontBody:'Inter', fontHeading:'Inter', radius:24, mode:'light', primaryColor:'#F43F5E'}, code: createMobileTemplate('Spark', 'rose', '❤️') },
  { id: 'mobile-16', name: 'Weather App', description: 'Glassmorphism weather', category: 'Utility', thumbnailGradient: 'from-sky-500 to-blue-600', type: 'mobile', theme: {fontBody:'Inter', fontHeading:'Inter', radius:24, mode:'light', primaryColor:'#38BDF8'}, code: createMobileTemplate('Weather', 'sky', '☀️') },
  { id: 'mobile-17', name: 'Ride Sharing', description: 'Map based booking', category: 'Travel', thumbnailGradient: 'from-gray-800 to-black', type: 'mobile', theme: {fontBody:'Inter', fontHeading:'Inter', radius:0, mode:'light', primaryColor:'#000000'}, code: createMobileTemplate('Go Ride', 'gray', '🚗') },
  { id: 'mobile-18', name: 'NFT Market', description: 'Digital art gallery', category: 'Crypto', thumbnailGradient: 'from-indigo-600 to-purple-600', type: 'mobile', theme: {fontBody:'Space Grotesk', fontHeading:'Space Grotesk', radius:0, mode:'dark', primaryColor:'#6366F1'}, code: createMobileTemplate('NFTs', 'indigo', '💎') },
  { id: 'mobile-19', name: 'Fashion Store', description: 'Image heavy retail', category: 'E-Commerce', thumbnailGradient: 'from-stone-200 to-stone-300', type: 'mobile', theme: {fontBody:'Inter', fontHeading:'Playfair Display', radius:0, mode:'light', primaryColor:'#44403C'}, code: createMobileTemplate('Vogue', 'stone', '👗') },
  { id: 'mobile-20', name: 'Blog Reader', description: 'Minimal text reading', category: 'News', thumbnailGradient: 'from-white to-gray-100', type: 'mobile', theme: {fontBody:'Merriweather', fontHeading:'Inter', radius:8, mode:'light', primaryColor:'#111827'}, code: createMobileTemplate('Reader', 'gray', '📖') },

  // --- 10 NEW WEB TEMPLATES ---
  { id: 'web-1', name: 'SaaS Dashboard', description: 'Analytics & Admin Panel', category: 'Dashboard', thumbnailGradient: 'from-blue-600 to-indigo-700', type: 'web', theme: {fontBody:'Inter', fontHeading:'Inter', radius:6, mode:'light', primaryColor:'#2563EB'}, code: createWebTemplate('Analytics', 'blue') },
  { id: 'web-2', name: 'Landing Page', description: 'High conversion hero section', category: 'Marketing', thumbnailGradient: 'from-purple-500 to-pink-500', type: 'web', theme: {fontBody:'Inter', fontHeading:'Inter', radius:8, mode:'light', primaryColor:'#9333EA'}, code: createWebTemplate('Product', 'purple') },
  { id: 'web-3', name: 'CRM System', description: 'Customer management table', category: 'Business', thumbnailGradient: 'from-slate-600 to-slate-800', type: 'web', theme: {fontBody:'Inter', fontHeading:'Inter', radius:4, mode:'light', primaryColor:'#475569'}, code: createWebTemplate('CRM', 'slate') },
  { id: 'web-4', name: 'Doc Site', description: 'Documentation sidebar layout', category: 'Docs', thumbnailGradient: 'from-green-500 to-teal-500', type: 'web', theme: {fontBody:'Inter', fontHeading:'Inter', radius:6, mode:'light', primaryColor:'#10B981'}, code: createWebTemplate('Docs', 'green') },
  { id: 'web-5', name: 'Kanban Board', description: 'Project management tool', category: 'Productivity', thumbnailGradient: 'from-orange-400 to-amber-500', type: 'web', theme: {fontBody:'Inter', fontHeading:'Inter', radius:6, mode:'light', primaryColor:'#F59E0B'}, code: createWebTemplate('Kanban', 'orange') },
  { id: 'web-6', name: 'Inbox', description: 'Email client interface', category: 'Social', thumbnailGradient: 'from-cyan-500 to-blue-500', type: 'web', theme: {fontBody:'Inter', fontHeading:'Inter', radius:8, mode:'light', primaryColor:'#06B6D4'}, code: createWebTemplate('Inbox', 'cyan') },
  { id: 'web-7', name: 'File Drive', description: 'Cloud storage grid', category: 'Utility', thumbnailGradient: 'from-yellow-400 to-orange-400', type: 'web', theme: {fontBody:'Inter', fontHeading:'Inter', radius:12, mode:'light', primaryColor:'#FBBF24'}, code: createWebTemplate('Drive', 'yellow') },
  { id: 'web-8', name: 'Video Platform', description: 'Streaming layout', category: 'Media', thumbnailGradient: 'from-red-600 to-red-800', type: 'web', theme: {fontBody:'Inter', fontHeading:'Inter', radius:12, mode:'dark', primaryColor:'#DC2626'}, code: createWebTemplate('Stream', 'red') },
  { id: 'web-9', name: 'Code Editor', description: 'IDE web interface', category: 'Dev', thumbnailGradient: 'from-gray-800 to-black', type: 'web', theme: {fontBody:'JetBrains Mono', fontHeading:'Inter', radius:4, mode:'dark', primaryColor:'#3B82F6'}, code: createWebTemplate('Editor', 'gray') },
  { id: 'web-10', name: 'Settings Panel', description: 'User profile management', category: 'Utility', thumbnailGradient: 'from-gray-200 to-gray-300', type: 'web', theme: {fontBody:'Inter', fontHeading:'Inter', radius:8, mode:'light', primaryColor:'#4B5563'}, code: createWebTemplate('Settings', 'gray') },
];

const CommunityPage: React.FC<CommunityPageProps> = ({ onCloneTemplate }) => {
  return (
    <div className="min-h-screen bg-[#FDFBD4] pt-32 px-6 pb-20 w-full flex flex-col items-center">
      <div className="max-w-6xl w-full mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#60A5FA] border-2 border-black px-4 py-1.5 rounded-full shadow-[4px_4px_0px_0px_black] text-white">
            <Users size={16} strokeWidth={2.5} />
            <span className="text-xs font-black uppercase tracking-widest">Community Hub</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter">
            Community Templates
          </h1>
          <p className="text-xl font-medium text-gray-700 max-w-2xl mx-auto">
            Explore ready-made designs. Clone any template to start building instantly with pre-written code.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEMPLATES.map((template) => (
            <div 
              key={template.id}
              className="group bg-white border-2 border-black rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_black] hover:translate-y-[-4px] hover:translate-x-[-4px] hover:shadow-[12px_12px_0px_0px_black] transition-all flex flex-col"
            >
              {/* Thumbnail with Mini UI */}
              <div className={`h-48 bg-gradient-to-br ${template.thumbnailGradient} relative border-b-2 border-black flex items-center justify-center p-8 overflow-hidden`}>
                 <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:16px_16px] opacity-30"></div>
                 
                 <div className="transform group-hover:scale-105 transition-transform duration-500 origin-center drop-shadow-2xl">
                    {template.type === 'web' 
                       ? <WebPreviewUI gradient={template.thumbnailGradient} /> 
                       : <MobilePreviewUI gradient={template.thumbnailGradient} />
                    }
                 </div>

                 <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-white/20 flex items-center gap-1">
                    {template.type === 'web' ? <Monitor size={10} /> : <Smartphone size={10} />}
                    {template.category}
                 </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                 <h3 className="text-2xl font-black uppercase tracking-tight mb-2">{template.name}</h3>
                 <p className="text-gray-600 font-medium text-sm mb-6 flex-1">{template.description}</p>
                 
                 <button 
                   onClick={() => onCloneTemplate(template)}
                   className="w-full py-3 bg-[#A3E635] hover:bg-[#8CD321] text-black font-black uppercase tracking-widest rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_black] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all flex items-center justify-center gap-2"
                 >
                    <Zap size={18} fill="black" /> Use Template
                 </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CommunityPage;
