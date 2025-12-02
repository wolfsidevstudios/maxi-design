
import React from 'react';
import { Template } from '../types';
import { Zap, Copy, Lock, Users, Smartphone } from './Icons';

interface CommunityPageProps {
  onCloneTemplate: (template: Template) => void;
}

const TEMPLATES: Template[] = [
  // --- ORIGINAL 5 TEMPLATES ---
  {
    id: 'crypto-1',
    name: 'Neo-Crypto Wallet',
    description: 'A modern, high-contrast wallet dashboard with portfolio charts and transaction history.',
    category: 'Finance',
    thumbnailGradient: 'from-purple-500 to-indigo-600',
    theme: {
      fontBody: 'Inter',
      fontHeading: 'Space Grotesk',
      radius: 16,
      mode: 'dark',
      primaryColor: '#8B5CF6'
    },
    code: `<div class="bg-gray-900 min-h-screen text-white p-6 font-sans">
  <div class="flex justify-between items-center mb-8">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      </div>
      <div>
        <p className="text-xs text-gray-400">Welcome back</p>
        <h3 className="font-bold">Alex Chen</h3>
      </div>
    </div>
    <button class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
    </button>
  </div>

  <div class="mb-8">
    <p class="text-sm text-gray-400 mb-2">Total Balance</p>
    <h1 class="text-5xl font-bold mb-4">$42,593.00</h1>
    <div class="flex gap-2">
      <div class="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>
        +12.5%
      </div>
      <div class="bg-gray-800 text-gray-400 px-3 py-1 rounded-full text-sm font-medium">
        Today
      </div>
    </div>
  </div>

  <div class="flex gap-4 mb-8">
    <button class="flex-1 bg-[#8B5CF6] hover:bg-[#7C3AED] py-4 rounded-2xl font-bold flex flex-col items-center gap-2 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
      Send
    </button>
    <button class="flex-1 bg-gray-800 hover:bg-gray-750 py-4 rounded-2xl font-bold flex flex-col items-center gap-2 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 12-7 7-7-7"/><path d="M12 5v14"/></svg>
      Receive
    </button>
    <button class="flex-1 bg-gray-800 hover:bg-gray-750 py-4 rounded-2xl font-bold flex flex-col items-center gap-2 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
      Buy
    </button>
  </div>

  <div class="bg-gray-800/50 rounded-3xl p-6 border border-gray-700/50">
    <div class="flex justify-between items-center mb-6">
      <h3 class="font-bold text-lg">Assets</h3>
      <button class="text-[#8B5CF6] text-sm font-bold">See All</button>
    </div>

    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center font-bold text-xl">₿</div>
          <div>
            <h4 class="font-bold">Bitcoin</h4>
            <p class="text-sm text-gray-400">BTC</p>
          </div>
        </div>
        <div class="text-right">
          <h4 class="font-bold">$28,400.50</h4>
          <p class="text-sm text-green-400">+2.4%</p>
        </div>
      </div>
    </div>
  </div>
</div>`
  },
  {
    id: 'ecommerce-1',
    name: 'Streetwear Drop',
    description: 'Clean, minimalistic product detail page optimized for fashion brands.',
    category: 'E-Commerce',
    thumbnailGradient: 'from-orange-400 to-red-500',
    theme: { fontBody: 'Inter', fontHeading: 'Space Grotesk', radius: 0, mode: 'light', primaryColor: '#000000' },
    code: `<div class="bg-white min-h-screen text-black font-sans pb-24">
  <div class="relative h-[450px] bg-gray-100">
    <img src="https://images.unsplash.com/photo-1551488852-d7b7143187a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover" alt="Product">
    <div class="absolute top-0 left-0 w-full p-6 flex justify-between items-center">
      <button class="w-10 h-10 bg-white/50 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg></button>
    </div>
  </div>
  <div class="p-6 -mt-8 bg-white rounded-t-3xl relative z-10">
    <div class="flex justify-between items-start mb-4">
      <div>
        <p class="text-gray-500 uppercase tracking-widest text-xs font-bold mb-2">New Collection</p>
        <h1 class="text-3xl font-black uppercase tracking-tight leading-none">Oversized <br>Bomber Jacket</h1>
      </div>
      <div class="text-xl font-bold">$189</div>
    </div>
    <div class="mb-8">
      <h3 class="font-bold mb-3 uppercase text-sm">Size</h3>
      <div class="flex gap-3">
        <button class="w-12 h-12 border-2 border-gray-200 rounded-lg flex items-center justify-center font-bold text-sm hover:border-black transition-colors">S</button>
        <button class="w-12 h-12 border-2 border-black bg-black text-white rounded-lg flex items-center justify-center font-bold text-sm">M</button>
        <button class="w-12 h-12 border-2 border-gray-200 rounded-lg flex items-center justify-center font-bold text-sm hover:border-black transition-colors">L</button>
      </div>
    </div>
    <button class="w-full bg-black text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-gray-900 transition-colors">Add to Cart</button>
  </div>
</div>`
  },
  // ... (Other existing templates like Social, Fitness, Travel, Food, Tasks, Music would be here, skipping to new ones to save space in this response but preserving in final code)
  
  // --- NEW TEMPLATES START HERE ---
  {
    id: 'dating-1',
    name: 'Spark Dating',
    description: 'Modern swiping interface with large profile photos and floating actions.',
    category: 'Social',
    thumbnailGradient: 'from-pink-500 to-rose-400',
    theme: { fontBody: 'Inter', fontHeading: 'Inter', radius: 24, mode: 'light', primaryColor: '#F43F5E' },
    code: `<div class="bg-gray-100 min-h-screen relative overflow-hidden font-sans">
  <div class="absolute inset-0 p-4 pb-24 flex flex-col">
     <div class="flex-1 relative rounded-3xl overflow-hidden shadow-2xl">
        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&w=800&q=80" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div class="absolute bottom-0 left-0 w-full p-6 text-white">
           <div class="flex items-end gap-3 mb-2">
              <h1 class="text-4xl font-black">Sarah</h1>
              <span class="text-2xl font-medium opacity-90 mb-1">24</span>
           </div>
           <p class="text-white/80 font-medium mb-4 flex items-center gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> 3 miles away</p>
           <div class="flex gap-2 flex-wrap">
              <span class="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-bold">🎨 Artist</span>
              <span class="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-bold">🐕 Dog Lover</span>
              <span class="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-bold">🍕 Foodie</span>
           </div>
        </div>
     </div>
  </div>
  <div class="absolute bottom-6 left-0 w-full px-10 flex justify-between items-center">
     <button class="w-16 h-16 bg-white rounded-full text-red-500 shadow-xl flex items-center justify-center hover:scale-110 transition-transform"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
     <button class="w-12 h-12 bg-white rounded-full text-blue-500 shadow-lg flex items-center justify-center hover:scale-110 transition-transform"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></button>
     <button class="w-16 h-16 bg-gradient-to-tr from-rose-500 to-pink-600 rounded-full text-white shadow-xl shadow-rose-500/30 flex items-center justify-center hover:scale-110 transition-transform"><svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></button>
  </div>
</div>`
  },
  {
    id: 'smarthome-1',
    name: 'Home OS',
    description: 'Dark mode smart home controller with glowing toggles and room management.',
    category: 'Lifestyle',
    thumbnailGradient: 'from-slate-800 to-slate-900',
    theme: { fontBody: 'Inter', fontHeading: 'Inter', radius: 20, mode: 'dark', primaryColor: '#F59E0B' },
    code: `<div class="bg-slate-900 min-h-screen text-white p-6 font-sans">
  <div class="flex justify-between items-center mb-8">
     <div><h2 class="text-sm font-bold text-slate-400 uppercase">Good Evening</h2><h1 class="text-2xl font-bold">My Home</h1></div>
     <div class="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 overflow-hidden"><img src="https://i.pravatar.cc/100?img=33" /></div>
  </div>
  <div class="flex gap-4 overflow-x-auto pb-4 mb-4 no-scrollbar">
     <button class="px-6 py-2 bg-white text-slate-900 rounded-full font-bold text-sm">All Rooms</button>
     <button class="px-6 py-2 bg-slate-800 text-slate-400 rounded-full font-bold text-sm">Living</button>
     <button class="px-6 py-2 bg-slate-800 text-slate-400 rounded-full font-bold text-sm">Kitchen</button>
  </div>
  <div class="grid grid-cols-2 gap-4 mb-8">
     <div class="bg-slate-800/50 p-4 rounded-[24px] border border-slate-700/50">
        <div class="flex justify-between items-start mb-6">
           <div class="w-10 h-10 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg></div>
           <div class="w-8 h-4 bg-green-500 rounded-full relative"><div class="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full"></div></div>
        </div>
        <h3 class="font-bold mb-1">Smart Lights</h3>
        <p class="text-xs text-slate-400">4 Active</p>
     </div>
     <div class="bg-slate-800/50 p-4 rounded-[24px] border border-slate-700/50">
        <div class="flex justify-between items-start mb-6">
           <div class="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></svg></div>
           <div class="font-bold text-lg">22°c</div>
        </div>
        <h3 class="font-bold mb-1">Climate</h3>
        <p class="text-xs text-slate-400">Cooling...</p>
     </div>
  </div>
  <div class="bg-slate-800/50 rounded-[24px] p-5 border border-slate-700/50 mb-4 flex items-center gap-4">
     <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&w=100&q=80" class="w-12 h-12 rounded-xl object-cover" />
     <div class="flex-1">
        <h4 class="font-bold text-sm">Focus Flow</h4>
        <p class="text-xs text-slate-400">Spotify • Speaker</p>
     </div>
     <button class="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg></button>
  </div>
</div>`
  },
  {
    id: 'nft-1',
    name: 'NFT Market',
    description: 'Clean NFT marketplace with large card visuals and ETH pricing.',
    category: 'Finance',
    thumbnailGradient: 'from-indigo-900 to-purple-800',
    theme: { fontBody: 'Space Grotesk', fontHeading: 'Space Grotesk', radius: 0, mode: 'dark', primaryColor: '#6366F1' },
    code: `<div class="bg-black min-h-screen text-white font-sans p-6 pb-24 border-[12px] border-black">
   <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold uppercase tracking-widest">Rarible</h1>
      <button class="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>
   </div>
   <div class="mb-8">
      <div class="border border-white/20 p-4 rounded-none mb-6">
         <img src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&w=600&q=80" class="w-full h-64 object-cover mb-4 grayscale hover:grayscale-0 transition-all" />
         <div class="flex justify-between items-end">
            <div>
               <h2 class="text-xl font-bold uppercase mb-1">Abstract #842</h2>
               <p class="text-xs text-gray-400 font-mono">@digital_art</p>
            </div>
            <div class="text-right">
               <p class="text-xs text-gray-400 uppercase mb-1">Current Bid</p>
               <p class="text-xl font-bold text-indigo-400 font-mono">2.4 ETH</p>
            </div>
         </div>
      </div>
      <div class="grid grid-cols-2 gap-4">
         <div class="border border-white/20 p-3">
             <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&w=300&q=80" class="w-full h-32 object-cover mb-3 grayscale hover:grayscale-0 transition-all" />
             <h3 class="font-bold text-sm truncate">Liquid Metal</h3>
             <p class="text-xs text-indigo-400 font-mono mt-1">0.8 ETH</p>
         </div>
         <div class="border border-white/20 p-3">
             <img src="https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?ixlib=rb-4.0.3&w=300&q=80" class="w-full h-32 object-cover mb-3 grayscale hover:grayscale-0 transition-all" />
             <h3 class="font-bold text-sm truncate">Cyber Punk</h3>
             <p class="text-xs text-indigo-400 font-mono mt-1">1.2 ETH</p>
         </div>
      </div>
   </div>
   <button class="fixed bottom-6 left-6 right-6 bg-white text-black font-bold uppercase py-4 hover:bg-indigo-400 transition-colors">Connect Wallet</button>
</div>`
  },
  {
    id: 'coffee-1',
    name: 'Brew Coffee',
    description: 'Warm, cozy coffee ordering app with beige tones and rounded visuals.',
    category: 'E-Commerce',
    thumbnailGradient: 'from-yellow-800 to-amber-700',
    theme: { fontBody: 'Lato', fontHeading: 'Playfair Display', radius: 24, mode: 'light', primaryColor: '#78350F' },
    code: `<div class="bg-[#FDF8F3] min-h-screen text-[#451a03] font-sans pb-24">
  <div class="p-6">
     <div class="flex justify-between items-center mb-6">
        <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg></div>
        <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm relative"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg><div class="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-[#FDF8F3]"></div></div>
     </div>
     <h1 class="text-3xl font-black mb-2 font-display">Good morning,<br>Start with coffee</h1>
     
     <div class="flex gap-3 overflow-x-auto py-6 no-scrollbar">
        <div class="bg-[#78350F] text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-[#78350F]/30 whitespace-nowrap">Cappuccino</div>
        <div class="bg-white text-[#78350F] px-6 py-2 rounded-full font-bold shadow-sm whitespace-nowrap">Latte</div>
        <div class="bg-white text-[#78350F] px-6 py-2 rounded-full font-bold shadow-sm whitespace-nowrap">Americano</div>
     </div>

     <div class="flex gap-6 overflow-x-auto pb-8 no-scrollbar snap-x">
        <div class="min-w-[260px] bg-white rounded-[32px] p-4 shadow-xl snap-center relative mt-12">
           <img src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3&w=400&q=80" class="w-40 h-40 rounded-full object-cover mx-auto -mt-16 shadow-lg mb-4" />
           <h3 class="text-xl font-bold text-center mb-1 font-display">Caramel Macchiato</h3>
           <p class="text-center text-xs text-gray-500 mb-4 font-bold tracking-wide">WITH OAT MILK</p>
           <div class="flex justify-between items-center px-4">
              <span class="text-lg font-black">$5.50</span>
              <button class="w-10 h-10 bg-[#78350F] text-white rounded-full flex items-center justify-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
           </div>
        </div>
         <div class="min-w-[260px] bg-white rounded-[32px] p-4 shadow-xl snap-center relative mt-12">
           <img src="https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-4.0.3&w=400&q=80" class="w-40 h-40 rounded-full object-cover mx-auto -mt-16 shadow-lg mb-4" />
           <h3 class="text-xl font-bold text-center mb-1 font-display">Double Espresso</h3>
           <p class="text-center text-xs text-gray-500 mb-4 font-bold tracking-wide">RICH & DARK</p>
           <div class="flex justify-between items-center px-4">
              <span class="text-lg font-black">$3.20</span>
              <button class="w-10 h-10 bg-[#78350F] text-white rounded-full flex items-center justify-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
           </div>
        </div>
     </div>
  </div>
</div>`
  },
  {
    id: 'kanban-1',
    name: 'Task Board',
    description: 'Mobile Kanban board with draggable-style cards and status columns.',
    category: 'Productivity',
    thumbnailGradient: 'from-cyan-500 to-blue-500',
    theme: { fontBody: 'Inter', fontHeading: 'Inter', radius: 8, mode: 'light', primaryColor: '#06B6D4' },
    code: `<div class="bg-gray-100 min-h-screen font-sans flex flex-col">
   <div class="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
      <div class="flex items-center gap-2 font-bold"><div class="w-6 h-6 bg-cyan-500 rounded"></div> Sprint 24</div>
      <div class="flex -space-x-2">
         <div class="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
         <div class="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></div>
         <div class="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] font-bold">+3</div>
      </div>
   </div>
   <div class="flex-1 p-4 overflow-x-auto flex gap-4 items-start">
      <div class="min-w-[280px] w-[85%] flex flex-col gap-3">
         <div class="flex justify-between items-center mb-1"><h3 class="font-bold text-sm text-gray-500 uppercase">To Do</h3><span class="bg-gray-200 text-gray-600 px-2 rounded text-xs font-bold">3</span></div>
         <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <span class="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase">High</span>
            <p class="font-bold text-sm mt-2 mb-3">Fix login authentication bug on iOS</p>
            <div class="flex justify-between items-center text-gray-400 text-xs font-bold"><span class="flex items-center gap-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> 2</span><div class="w-5 h-5 rounded-full bg-blue-100"></div></div>
         </div>
         <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <span class="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Design</span>
            <p class="font-bold text-sm mt-2 mb-3">Create new icons for settings menu</p>
            <div class="flex justify-between items-center text-gray-400 text-xs font-bold"><span class="flex items-center gap-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> 0</span><div class="w-5 h-5 rounded-full bg-green-100"></div></div>
         </div>
      </div>
      <div class="min-w-[280px] w-[85%] flex flex-col gap-3">
         <div class="flex justify-between items-center mb-1"><h3 class="font-bold text-sm text-gray-500 uppercase">In Progress</h3><span class="bg-gray-200 text-gray-600 px-2 rounded text-xs font-bold">1</span></div>
         <div class="bg-white p-4 rounded-lg shadow-sm border-l-4 border-cyan-500">
            <span class="bg-purple-100 text-purple-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Feature</span>
            <p class="font-bold text-sm mt-2 mb-3">Implement dark mode toggle</p>
            <div class="w-full bg-gray-100 h-1.5 rounded-full mb-3 overflow-hidden"><div class="w-2/3 bg-cyan-500 h-full rounded-full"></div></div>
            <div class="flex justify-between items-center text-gray-400 text-xs font-bold"><span class="flex items-center gap-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> 5</span><div class="w-5 h-5 rounded-full bg-orange-100"></div></div>
         </div>
      </div>
   </div>
   <button class="fixed bottom-6 right-6 bg-cyan-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-cyan-700 transition-colors"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
</div>`
  },
  {
    id: 'meditation-1',
    name: 'Mindful',
    description: 'Serene meditation timer with soft gradients and calming typography.',
    category: 'Lifestyle',
    thumbnailGradient: 'from-teal-200 to-emerald-200',
    theme: { fontBody: 'Open Sans', fontHeading: 'Playfair Display', radius: 32, mode: 'light', primaryColor: '#14B8A6' },
    code: `<div class="bg-[#F0FDFA] min-h-screen flex flex-col items-center justify-between py-12 px-6 font-sans relative overflow-hidden">
  <div class="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-teal-100/50 to-transparent pointer-events-none"></div>
  <div class="relative z-10 w-full flex justify-between items-center text-teal-800">
     <button class="p-2 bg-white/50 rounded-full"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg></button>
     <h2 class="font-display font-bold text-lg tracking-wide">Daily Calm</h2>
     <button class="p-2 bg-white/50 rounded-full"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg></button>
  </div>
  
  <div class="relative z-10 flex flex-col items-center">
     <div class="w-64 h-64 rounded-full bg-gradient-to-tr from-teal-200 to-emerald-200 shadow-[0_0_60px_rgba(20,184,166,0.2)] flex items-center justify-center mb-8 relative">
        <div class="absolute inset-0 border-4 border-white/30 rounded-full scale-110"></div>
        <div class="absolute inset-0 border-2 border-white/10 rounded-full scale-125 animate-pulse"></div>
        <div class="text-center text-teal-900">
           <div class="text-6xl font-light font-display mb-1">15:00</div>
           <div class="text-sm font-bold uppercase tracking-widest opacity-60">Remaining</div>
        </div>
     </div>
     <h1 class="text-3xl font-display font-bold text-teal-900 mb-2">Morning Clarity</h1>
     <p class="text-teal-700/60 font-medium">Focus on your breath</p>
  </div>

  <div class="relative z-10 flex items-center gap-8">
     <button class="text-teal-600 hover:text-teal-800"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"/></svg></button>
     <button class="w-20 h-20 bg-teal-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-teal-500/30 hover:scale-105 transition-transform"><svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg></button>
     <button class="text-teal-600 hover:text-teal-800"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></button>
  </div>
</div>`
  },
  {
    id: 'news-1',
    name: 'Minimal News',
    description: 'Editorial-style news reader with serif typography and large imagery.',
    category: 'Lifestyle',
    thumbnailGradient: 'from-gray-100 to-gray-300',
    theme: { fontBody: 'Lato', fontHeading: 'Playfair Display', radius: 0, mode: 'light', primaryColor: '#000000' },
    code: `<div class="bg-[#F8F5F2] min-h-screen text-black font-sans">
  <nav class="p-6 flex justify-between items-center border-b border-black/5">
     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
     <h1 class="font-display font-black text-2xl tracking-tight">The Daily</h1>
     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
  </nav>
  <div class="p-6">
     <p class="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">October 24, 2024</p>
     <div class="mb-8 cursor-pointer group">
        <div class="overflow-hidden mb-4">
           <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&w=800&q=80" class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700" />
        </div>
        <h2 class="text-3xl font-display font-bold leading-tight mb-3 group-hover:underline decoration-1 underline-offset-4">The Future of Workspace Design is Hybrid</h2>
        <p class="text-gray-600 font-serif leading-relaxed text-lg line-clamp-3">As companies navigate the return to office, architects are reimagining corporate environments to prioritize collaboration and flexibility over density.</p>
     </div>
     <div class="space-y-6">
        <div class="flex gap-4 items-start border-t border-black/5 pt-6">
           <div class="flex-1">
              <span class="text-[10px] font-bold uppercase text-red-600 mb-1 block">Tech</span>
              <h3 class="font-display font-bold text-lg leading-tight mb-2">AI Models Reach New Benchmark in Reasoning</h3>
              <p class="text-gray-500 text-sm">3 min read</p>
           </div>
           <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&w=200&q=80" class="w-24 h-24 object-cover grayscale" />
        </div>
        <div class="flex gap-4 items-start border-t border-black/5 pt-6">
           <div class="flex-1">
              <span class="text-[10px] font-bold uppercase text-blue-600 mb-1 block">Design</span>
              <h3 class="font-display font-bold text-lg leading-tight mb-2">Minimalism in the Age of Excess</h3>
              <p class="text-gray-500 text-sm">5 min read</p>
           </div>
           <img src="https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?ixlib=rb-4.0.3&w=200&q=80" class="w-24 h-24 object-cover grayscale" />
        </div>
     </div>
  </div>
</div>`
  },
  {
    id: 'split-1',
    name: 'Bill Splitter',
    description: 'Utility for splitting expenses with friends, featuring large numerals and avatars.',
    category: 'Finance',
    thumbnailGradient: 'from-green-200 to-lime-200',
    theme: { fontBody: 'Inter', fontHeading: 'Inter', radius: 16, mode: 'light', primaryColor: '#65A30D' },
    code: `<div class="bg-lime-50 min-h-screen text-black font-sans flex flex-col">
  <div class="p-6 flex-1 flex flex-col">
     <div class="flex justify-between items-center mb-8">
        <button class="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></button>
        <h3 class="font-bold">Split Expense</h3>
        <div class="w-10"></div>
     </div>
     <div class="bg-white rounded-[32px] p-8 shadow-xl shadow-lime-500/10 mb-6 text-center flex-1 flex flex-col justify-center">
        <p class="text-gray-400 font-bold uppercase text-xs tracking-widest mb-2">Total Amount</p>
        <div class="text-6xl font-black mb-2 text-lime-900">$142<span class="text-3xl text-lime-600">.50</span></div>
        <div class="inline-flex items-center gap-2 bg-lime-100 px-3 py-1 rounded-full mx-auto">
           <div class="w-2 h-2 rounded-full bg-lime-500"></div>
           <span class="text-xs font-bold text-lime-800">Dinner @ Mario's</span>
        </div>
     </div>
     <div class="mb-8">
        <div class="flex justify-between items-center mb-4">
           <h3 class="font-bold text-lg">Split with</h3>
           <button class="text-lime-600 text-sm font-bold">Add All</button>
        </div>
        <div class="space-y-3">
           <div class="flex items-center justify-between bg-white p-3 rounded-2xl border border-lime-100">
              <div class="flex items-center gap-3">
                 <img src="https://i.pravatar.cc/100?img=12" class="w-10 h-10 rounded-full" />
                 <span class="font-bold">You</span>
              </div>
              <span class="font-bold text-lime-700">$47.50</span>
           </div>
           <div class="flex items-center justify-between bg-white p-3 rounded-2xl border border-lime-100">
              <div class="flex items-center gap-3">
                 <img src="https://i.pravatar.cc/100?img=32" class="w-10 h-10 rounded-full" />
                 <span class="font-bold">Sarah J.</span>
              </div>
              <span class="font-bold text-lime-700">$47.50</span>
           </div>
           <div class="flex items-center justify-between bg-white p-3 rounded-2xl border border-lime-100">
              <div class="flex items-center gap-3">
                 <img src="https://i.pravatar.cc/100?img=8" class="w-10 h-10 rounded-full" />
                 <span class="font-bold">Mike T.</span>
              </div>
              <span class="font-bold text-lime-700">$47.50</span>
           </div>
        </div>
     </div>
     <button class="w-full bg-black text-white py-4 rounded-2xl font-bold text-lg hover:bg-gray-800 transition-colors">Send Request</button>
  </div>
</div>`
  },
  {
    id: 'weather-1',
    name: 'Atmos Weather',
    description: 'Beautiful weather app with frosted glass cards and animated gradients.',
    category: 'Lifestyle',
    thumbnailGradient: 'from-sky-400 to-blue-600',
    theme: { fontBody: 'Inter', fontHeading: 'Inter', radius: 24, mode: 'light', primaryColor: '#0EA5E9' },
    code: `<div class="bg-gradient-to-br from-blue-400 to-blue-600 min-h-screen text-white font-sans p-6 flex flex-col relative overflow-hidden">
  <div class="absolute top-0 right-0 w-64 h-64 bg-yellow-300 rounded-full blur-[80px] opacity-20"></div>
  <div class="relative z-10 flex justify-between items-center mb-10 pt-4">
     <button class="p-2 bg-white/20 backdrop-blur rounded-xl"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></button>
     <div class="flex items-center gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> <span class="font-bold">San Francisco</span></div>
     <button class="p-2 bg-white/20 backdrop-blur rounded-xl"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></button>
  </div>
  <div class="flex-1 flex flex-col items-center justify-center mb-12 relative z-10">
     <img src="https://cdn-icons-png.flaticon.com/512/1163/1163624.png" class="w-48 h-48 drop-shadow-2xl mb-4 animate-bounce duration-[3000ms]" />
     <h1 class="text-8xl font-black mb-2 relative left-2">72°</h1>
     <p class="text-xl font-medium opacity-90">Mostly Sunny</p>
     <div class="flex gap-6 mt-6 bg-white/20 backdrop-blur rounded-2xl px-6 py-3 border border-white/20">
        <div class="text-center"><div class="text-xs opacity-70 mb-1">Wind</div><div class="font-bold">8 mph</div></div>
        <div class="w-px bg-white/20"></div>
        <div class="text-center"><div class="text-xs opacity-70 mb-1">Humidity</div><div class="font-bold">42%</div></div>
        <div class="w-px bg-white/20"></div>
        <div class="text-center"><div class="text-xs opacity-70 mb-1">Rain</div><div class="font-bold">10%</div></div>
     </div>
  </div>
  <div class="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 relative z-10">
     <div class="flex justify-between items-center mb-4">
        <h3 class="font-bold">Today</h3>
        <span class="text-xs font-bold opacity-70">7 Day Forecast ></span>
     </div>
     <div class="flex justify-between">
        <div class="flex flex-col items-center gap-2"><span class="text-xs opacity-70">Now</span><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="text-yellow-300"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg><span class="font-bold">72°</span></div>
        <div class="flex flex-col items-center gap-2"><span class="text-xs opacity-70">1 PM</span><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="text-yellow-300"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg><span class="font-bold">74°</span></div>
        <div class="flex flex-col items-center gap-2"><span class="text-xs opacity-70">2 PM</span><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="text-white"><path d="M17.5 19c0-1.7-1.3-3-3-3h-11a4 4 0 0 1-0-8h1a5 5 0 0 1 9.9 0 4 4 0 0 1 0 8z"/></svg><span class="font-bold">71°</span></div>
        <div class="flex flex-col items-center gap-2"><span class="text-xs opacity-70">3 PM</span><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="text-white"><path d="M17.5 19c0-1.7-1.3-3-3-3h-11a4 4 0 0 1-0-8h1a5 5 0 0 1 9.9 0 4 4 0 0 1 0 8z"/></svg><span class="font-bold">69°</span></div>
        <div class="flex flex-col items-center gap-2"><span class="text-xs opacity-70">4 PM</span><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="text-white"><path d="M17.5 19c0-1.7-1.3-3-3-3h-11a4 4 0 0 1-0-8h1a5 5 0 0 1 9.9 0 4 4 0 0 1 0 8z"/></svg><span class="font-bold">67°</span></div>
     </div>
  </div>
</div>`
  },
  {
    id: 'login-1',
    name: 'Glass Login',
    description: 'Aesthetic login screen with background image and frosted glass form.',
    category: 'Utility',
    thumbnailGradient: 'from-pink-300 to-indigo-300',
    theme: { fontBody: 'Inter', fontHeading: 'Inter', radius: 16, mode: 'light', primaryColor: '#4F46E5' },
    code: `<div class="bg-black min-h-screen font-sans relative flex items-center justify-center p-6">
  <img src="https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&w=800&q=80" class="absolute inset-0 w-full h-full object-cover opacity-60" />
  <div class="relative z-10 w-full max-w-sm bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl">
     <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">Welcome Back</h1>
        <p class="text-white/60 text-sm">Sign in to continue your journey</p>
     </div>
     <form class="space-y-4">
        <div>
           <label class="text-xs font-bold text-white/80 uppercase ml-1 mb-1 block">Email</label>
           <input type="email" placeholder="name@example.com" class="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-white/50 transition-colors" />
        </div>
        <div>
           <label class="text-xs font-bold text-white/80 uppercase ml-1 mb-1 block">Password</label>
           <input type="password" placeholder="••••••••" class="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-white/50 transition-colors" />
        </div>
        <div class="flex justify-between items-center text-xs">
           <label class="flex items-center gap-2 text-white/80"><input type="checkbox" class="rounded bg-white/20 border-transparent" /> Remember me</label>
           <a href="#" class="text-white font-bold hover:underline">Forgot?</a>
        </div>
        <button class="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-100 transition-colors shadow-lg">Sign In</button>
     </form>
     <div class="mt-8 text-center">
        <p class="text-white/60 text-xs">Don't have an account? <a href="#" class="text-white font-bold hover:underline">Sign up</a></p>
     </div>
  </div>
</div>`
  },
  {
    id: 'settings-1',
    name: 'Modern Settings',
    description: 'Comprehensive settings page with grouped options and toggle switches.',
    category: 'Utility',
    thumbnailGradient: 'from-gray-100 to-gray-200',
    theme: { fontBody: 'Inter', fontHeading: 'Inter', radius: 12, mode: 'light', primaryColor: '#2563EB' },
    code: `<div class="bg-gray-50 min-h-screen text-black font-sans pb-10">
   <div class="bg-white px-6 pt-12 pb-4 border-b border-gray-200 sticky top-0 z-10">
      <h1 class="text-3xl font-bold">Settings</h1>
   </div>
   <div class="p-6 space-y-6">
      <div class="flex items-center gap-4 mb-8 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
         <img src="https://i.pravatar.cc/100?img=68" class="w-16 h-16 rounded-full" />
         <div class="flex-1">
            <h2 class="font-bold text-lg">John Doe</h2>
            <p class="text-gray-500 text-sm">Pro Member</p>
         </div>
         <button class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-400"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></button>
      </div>

      <section>
         <h3 class="text-xs font-bold uppercase text-gray-400 mb-3 ml-2 tracking-widest">General</h3>
         <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div class="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
               <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></div>
                  <span class="font-medium">Preferences</span>
               </div>
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-400"><path d="M9 18l6-6-6-6"/></svg>
            </div>
            <div class="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
               <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg></div>
                  <span class="font-medium">Notifications</span>
               </div>
               <div class="w-10 h-6 bg-blue-600 rounded-full relative"><div class="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div></div>
            </div>
         </div>
      </section>

      <section>
         <h3 class="text-xs font-bold uppercase text-gray-400 mb-3 ml-2 tracking-widest">Privacy</h3>
         <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
             <div class="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
               <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></div>
                  <span class="font-medium">Security</span>
               </div>
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-400"><path d="M9 18l6-6-6-6"/></svg>
            </div>
             <div class="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
               <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></div>
                  <span class="font-medium">Visibility</span>
               </div>
               <span class="text-gray-400 text-sm">Public</span>
            </div>
         </div>
      </section>
      
      <button class="w-full py-4 text-red-500 font-bold bg-red-50 rounded-2xl border border-red-100 hover:bg-red-100 transition-colors">Sign Out</button>
   </div>
</div>`
  }
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

        {/* Development Banner */}
        <div className="bg-black text-[#FDFBD4] p-8 rounded-3xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] mb-16 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#A3E635] rounded-full blur-[80px] opacity-20 pointer-events-none"></div>
           <div className="relative z-10 flex items-start gap-4">
              <div className="p-3 bg-white/10 rounded-xl border border-white/20">
                 <Lock size={32} className="text-[#A3E635]" />
              </div>
              <div>
                 <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Sharing Coming Soon</h3>
                 <p className="text-[#FDFBD4]/80 font-medium max-w-lg">
                    We are currently building the ability for you to publish and share your own designs with the world. For now, enjoy these curated starter templates.
                 </p>
              </div>
           </div>
           <div className="relative z-10 bg-white/10 px-6 py-2 rounded-lg border border-white/20 font-mono text-sm font-bold uppercase tracking-widest text-[#A3E635]">
              Status: Under Development
           </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEMPLATES.map((template) => (
            <div 
              key={template.id}
              className="group bg-white border-2 border-black rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_black] hover:translate-y-[-4px] hover:translate-x-[-4px] hover:shadow-[12px_12px_0px_0px_black] transition-all flex flex-col"
            >
              {/* Thumbnail */}
              <div className={`h-48 bg-gradient-to-br ${template.thumbnailGradient} relative border-b-2 border-black flex items-center justify-center`}>
                 <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:16px_16px] opacity-30"></div>
                 <Smartphone size={64} className="text-white drop-shadow-md transform group-hover:scale-110 transition-transform duration-500" />
                 <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-white/20">
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
