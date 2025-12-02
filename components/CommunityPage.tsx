
import React from 'react';
import { Template } from '../types';
import { Zap, Copy, Lock, Users, Smartphone } from './Icons';

interface CommunityPageProps {
  onCloneTemplate: (template: Template) => void;
}

const TEMPLATES: Template[] = [
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

      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center font-bold text-xl">Ξ</div>
          <div>
            <h4 class="font-bold">Ethereum</h4>
            <p class="text-sm text-gray-400">ETH</p>
          </div>
        </div>
        <div class="text-right">
          <h4 class="font-bold">$1,850.20</h4>
          <p class="text-sm text-green-400">+1.8%</p>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center font-bold text-xl">◎</div>
          <div>
            <h4 class="font-bold">Solana</h4>
            <p class="text-sm text-gray-400">SOL</p>
          </div>
        </div>
        <div class="text-right">
          <h4 class="font-bold">$142.80</h4>
          <p class="text-sm text-red-400">-0.5%</p>
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
    theme: {
      fontBody: 'Inter',
      fontHeading: 'Space Grotesk',
      radius: 0,
      mode: 'light',
      primaryColor: '#000000'
    },
    code: `<div class="bg-white min-h-screen text-black font-sans pb-24">
  <div class="relative h-[450px] bg-gray-100">
    <img src="https://images.unsplash.com/photo-1551488852-d7b7143187a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover" alt="Product">
    <div class="absolute top-0 left-0 w-full p-6 flex justify-between items-center">
      <button class="w-10 h-10 bg-white/50 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      <button class="w-10 h-10 bg-white/50 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
      </button>
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

    <div class="flex gap-1 mb-8">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="text-yellow-400" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="text-yellow-400" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="text-yellow-400" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="text-yellow-400" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="text-gray-300" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
      <span class="text-xs font-bold text-gray-400 ml-2">(42 reviews)</span>
    </div>

    <div class="mb-8">
      <h3 class="font-bold mb-3 uppercase text-sm">Description</h3>
      <p class="text-gray-600 leading-relaxed text-sm">
        Premium Japanese nylon bomber with dropped shoulders and cropped fit. Features heavy-duty zippers and signature orange lining. Water-resistant finish.
      </p>
    </div>

    <div class="mb-8">
      <h3 class="font-bold mb-3 uppercase text-sm">Size</h3>
      <div class="flex gap-3">
        <button class="w-12 h-12 border-2 border-gray-200 rounded-lg flex items-center justify-center font-bold text-sm hover:border-black transition-colors">S</button>
        <button class="w-12 h-12 border-2 border-black bg-black text-white rounded-lg flex items-center justify-center font-bold text-sm">M</button>
        <button class="w-12 h-12 border-2 border-gray-200 rounded-lg flex items-center justify-center font-bold text-sm hover:border-black transition-colors">L</button>
        <button class="w-12 h-12 border-2 border-gray-200 rounded-lg flex items-center justify-center font-bold text-sm hover:border-black transition-colors">XL</button>
      </div>
    </div>
  </div>

  <div class="fixed bottom-0 left-0 w-full p-6 bg-white border-t border-gray-100">
    <button class="w-full bg-black text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-gray-900 transition-colors flex items-center justify-center gap-2">
      Add to Cart
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
    </button>
  </div>
</div>`
  },
  {
    id: 'social-1',
    name: 'Photo Feed',
    description: 'Instagram-style social feed with stories, posts, and interaction buttons.',
    category: 'Social',
    thumbnailGradient: 'from-pink-500 to-rose-500',
    theme: {
      fontBody: 'Inter',
      fontHeading: 'Inter',
      radius: 8,
      mode: 'light',
      primaryColor: '#F43F5E'
    },
    code: `<div class="bg-gray-50 min-h-screen text-black font-sans pb-20">
  <div class="bg-white border-b border-gray-200 sticky top-0 z-50 px-4 py-3 flex justify-between items-center">
    <h1 class="font-black text-xl italic tracking-tighter">Moments</h1>
    <div class="flex gap-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
    </div>
  </div>

  <div class="bg-white py-4 mb-4 border-b border-gray-200 overflow-x-auto no-scrollbar">
    <div class="flex gap-4 px-4">
      <div class="flex flex-col items-center gap-1 shrink-0">
        <div class="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 to-purple-600">
          <div class="w-full h-full rounded-full border-2 border-white p-0.5 bg-white overflow-hidden">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" class="w-full h-full object-cover rounded-full" alt="User">
          </div>
        </div>
        <span class="text-xs font-medium">Your Story</span>
      </div>
      <div class="flex flex-col items-center gap-1 shrink-0">
        <div class="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 to-purple-600">
          <div class="w-full h-full rounded-full border-2 border-white p-0.5 bg-white overflow-hidden">
            <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" class="w-full h-full object-cover rounded-full" alt="User">
          </div>
        </div>
        <span class="text-xs font-medium">jason_k</span>
      </div>
      <div class="flex flex-col items-center gap-1 shrink-0">
        <div class="w-16 h-16 rounded-full p-[2px] bg-gray-200">
          <div class="w-full h-full rounded-full border-2 border-white p-0.5 bg-white overflow-hidden">
            <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" class="w-full h-full object-cover rounded-full" alt="User">
          </div>
        </div>
        <span class="text-xs font-medium">sarah_des</span>
      </div>
    </div>
  </div>

  <div class="bg-white border-b border-gray-200 pb-4 mb-4">
    <div class="flex justify-between items-center px-4 py-3">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
           <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" class="w-full h-full object-cover" alt="User">
        </div>
        <span class="font-bold text-sm">jason_k</span>
      </div>
      <button class="text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
      </button>
    </div>
    
    <div class="aspect-square bg-gray-100 mb-3">
      <img src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover" alt="Post">
    </div>

    <div class="px-4">
      <div class="flex justify-between mb-3">
        <div class="flex gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="hover:text-red-500 cursor-pointer"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
      </div>
      
      <p class="font-bold text-sm mb-1">2,492 likes</p>
      <p class="text-sm"><span class="font-bold">jason_k</span> Exploring the mountains this weekend. The view was absolutely breathtaking! 🏔️ #nature #hiking</p>
      <p class="text-gray-400 text-xs mt-2 uppercase">2 hours ago</p>
    </div>
  </div>

  <div class="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 px-6 py-4 flex justify-between items-center z-50">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="12" x2="12" y1="8" y2="16"/><line x1="8" x2="16" y1="12" y2="12"/></svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
    <div class="w-6 h-6 rounded-full bg-gray-200 overflow-hidden border border-black">
      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" class="w-full h-full object-cover" alt="User">
    </div>
  </div>
</div>`
  },
  {
    id: 'fitness-1',
    name: 'Pulse Workout',
    description: 'High-energy fitness tracker with dark mode, workout stats, and activity rings.',
    category: 'Fitness',
    thumbnailGradient: 'from-green-400 to-emerald-600',
    theme: { fontBody: 'Inter', fontHeading: 'Oswald', radius: 12, mode: 'dark', primaryColor: '#10B981' },
    code: `<div class="bg-black min-h-screen text-white font-sans p-6 pb-24">
  <div class="flex justify-between items-center mb-8">
    <div class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
    </div>
    <div class="text-center">
       <p class="text-xs text-gray-400 font-bold uppercase tracking-wider">Today</p>
       <h2 class="text-lg font-black uppercase">Oct 24</h2>
    </div>
    <div class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center relative">
       <div class="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
    </div>
  </div>

  <div class="mb-10 flex justify-center">
     <div class="relative w-48 h-48 flex items-center justify-center">
        <svg class="absolute w-full h-full transform -rotate-90">
           <circle cx="96" cy="96" r="88" stroke="#333" stroke-width="12" fill="none" />
           <circle cx="96" cy="96" r="88" stroke="#10B981" stroke-width="12" fill="none" stroke-dasharray="552" stroke-dashoffset="138" stroke-linecap="round" />
        </svg>
        <div class="text-center">
           <div class="text-4xl font-black italic">75%</div>
           <div class="text-xs text-gray-400 font-bold uppercase tracking-wider">Daily Goal</div>
        </div>
     </div>
  </div>

  <div class="grid grid-cols-2 gap-4 mb-8">
     <div class="bg-gray-900 rounded-2xl p-4 border border-gray-800">
        <div class="flex items-center gap-2 mb-2 text-orange-500">
           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"></path><path d="M12 20V4"></path><path d="M6 20v-6"></path></svg>
           <span class="text-xs font-bold uppercase">Calories</span>
        </div>
        <div class="text-2xl font-black">842</div>
        <div class="text-xs text-gray-500">kcal burned</div>
     </div>
     <div class="bg-gray-900 rounded-2xl p-4 border border-gray-800">
        <div class="flex items-center gap-2 text-blue-500">
           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
           <span class="text-xs font-bold uppercase">Time</span>
        </div>
        <div class="text-2xl font-black">45</div>
        <div class="text-xs text-gray-500">minutes active</div>
     </div>
  </div>

  <h3 class="text-lg font-black uppercase italic mb-4">Your Workouts</h3>
  <div class="space-y-4">
     <div class="bg-gray-900 rounded-2xl p-4 border border-gray-800 flex items-center gap-4">
        <div class="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center text-3xl">🏃‍♂️</div>
        <div class="flex-1">
           <h4 class="font-bold text-lg">Morning Run</h4>
           <p class="text-sm text-gray-400">5.2 km • 28 mins</p>
        </div>
        <button class="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-green-500 hover:bg-green-500 hover:text-white transition-colors">
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        </button>
     </div>
     <div class="bg-gray-900 rounded-2xl p-4 border border-gray-800 flex items-center gap-4">
        <div class="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center text-3xl">💪</div>
        <div class="flex-1">
           <h4 class="font-bold text-lg">Upper Body</h4>
           <p class="text-sm text-gray-400">Strength • 45 mins</p>
        </div>
        <button class="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-green-500 hover:bg-green-500 hover:text-white transition-colors">
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        </button>
     </div>
  </div>

  <button class="fixed bottom-6 right-6 w-16 h-16 bg-[#10B981] rounded-full shadow-lg flex items-center justify-center text-black hover:scale-110 transition-transform">
     <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
  </button>
</div>`
  },
  {
    id: 'travel-1',
    name: 'Wanderlust',
    description: 'Scenic travel booking app featuring immersive cards and transparent navigation.',
    category: 'Travel',
    thumbnailGradient: 'from-blue-400 to-cyan-300',
    theme: { fontBody: 'Lato', fontHeading: 'Playfair Display', radius: 24, mode: 'light', primaryColor: '#0EA5E9' },
    code: `<div class="bg-gray-50 min-h-screen text-gray-800 font-sans relative pb-20">
   <div class="h-[300px] relative">
      <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover rounded-b-[40px] shadow-xl" />
      <div class="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent rounded-b-[40px]"></div>
      <div class="absolute top-6 left-6 right-6 flex justify-between items-center text-white">
         <button class="p-2 bg-white/20 backdrop-blur rounded-full"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></button>
         <div class="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" class="w-full h-full object-cover" />
         </div>
      </div>
      <div class="absolute bottom-10 left-8 right-8 text-white">
         <h1 class="text-4xl font-black tracking-tight mb-2 font-display">Bali, Indonesia</h1>
         <div class="flex items-center gap-2 text-sm font-medium bg-white/20 backdrop-blur w-fit px-3 py-1 rounded-full">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
            4.8 (2.4k reviews)
         </div>
      </div>
   </div>

   <div class="px-6 -mt-8 relative z-10 space-y-6">
      <div class="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
         <button class="bg-white px-6 py-3 rounded-2xl shadow-lg text-[#0EA5E9] font-bold whitespace-nowrap">Overview</button>
         <button class="bg-white/50 px-6 py-3 rounded-2xl font-medium whitespace-nowrap">Itinerary</button>
         <button class="bg-white/50 px-6 py-3 rounded-2xl font-medium whitespace-nowrap">Reviews</button>
      </div>

      <div class="bg-white p-6 rounded-3xl shadow-sm">
         <div class="flex justify-between items-start mb-4">
            <h3 class="font-bold text-xl">Package Details</h3>
            <span class="text-[#0EA5E9] font-black text-xl">$850</span>
         </div>
         <p class="text-gray-500 leading-relaxed text-sm mb-6">Experience the tropical paradise of Bali with our 5-day guided tour. Includes visits to Ubud, Kuta Beach, and ancient temples.</p>
         
         <div class="flex items-center gap-4 mb-6">
            <div class="flex -space-x-3">
               <img class="w-10 h-10 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" />
               <img class="w-10 h-10 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" />
               <img class="w-10 h-10 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" />
            </div>
            <span class="text-sm font-bold text-gray-400">+12 friends going</span>
         </div>

         <div class="grid grid-cols-2 gap-3">
             <div class="bg-blue-50 p-3 rounded-xl flex items-center gap-3">
                <div class="bg-blue-100 p-2 rounded-lg text-[#0EA5E9]"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></div>
                <div><div class="text-[10px] font-bold text-gray-400 uppercase">Duration</div><div class="font-bold text-sm">5 Days</div></div>
             </div>
             <div class="bg-orange-50 p-3 rounded-xl flex items-center gap-3">
                <div class="bg-orange-100 p-2 rounded-lg text-orange-500"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></div>
                <div><div class="text-[10px] font-bold text-gray-400 uppercase">Flight</div><div class="font-bold text-sm">4h 30m</div></div>
             </div>
         </div>
      </div>

      <button class="w-full bg-black text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg hover:bg-gray-800 transition-colors">Book Now</button>
   </div>
</div>`
  },
  {
    id: 'food-1',
    name: 'Chef\'s Table',
    description: 'Visual recipe app with large imagery, difficulty tags, and step-by-step guides.',
    category: 'Lifestyle',
    thumbnailGradient: 'from-orange-400 to-yellow-300',
    theme: { fontBody: 'Open Sans', fontHeading: 'Montserrat', radius: 16, mode: 'light', primaryColor: '#F59E0B' },
    code: `<div class="bg-white min-h-screen text-gray-800 font-sans pb-24">
   <div class="p-6 pt-10">
      <h1 class="text-3xl font-black mb-1">What would you<br>like to <span class="text-amber-500">cook?</span></h1>
      
      <div class="relative mt-6 mb-8">
         <input type="text" placeholder="Search recipes..." class="w-full bg-gray-100 p-4 pl-12 rounded-2xl font-medium outline-none focus:ring-2 focus:ring-amber-500" />
         <svg class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      </div>

      <div class="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
         <button class="bg-amber-500 text-white px-5 py-2 rounded-xl font-bold whitespace-nowrap shadow-md shadow-amber-200">All</button>
         <button class="bg-gray-100 text-gray-500 px-5 py-2 rounded-xl font-bold whitespace-nowrap">Breakfast</button>
         <button class="bg-gray-100 text-gray-500 px-5 py-2 rounded-xl font-bold whitespace-nowrap">Vegan</button>
         <button class="bg-gray-100 text-gray-500 px-5 py-2 rounded-xl font-bold whitespace-nowrap">Dessert</button>
      </div>

      <div class="space-y-6 mt-4">
         <!-- Card 1 -->
         <div class="relative rounded-3xl overflow-hidden h-[320px] shadow-lg group">
            <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div class="absolute top-4 right-4 bg-white/20 backdrop-blur px-3 py-1 rounded-lg text-white text-xs font-bold border border-white/30">
               30 min
            </div>
            <div class="absolute bottom-0 left-0 w-full p-6 text-white">
               <h3 class="text-2xl font-bold mb-2">Avocado & Egg Toast</h3>
               <div class="flex items-center gap-4 text-sm font-medium opacity-90">
                  <span class="flex items-center gap-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" class="text-amber-400" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg> 4.8</span>
                  <span>Easy</span>
                  <span>380 kcal</span>
               </div>
            </div>
         </div>

         <!-- Card 2 -->
         <div class="relative rounded-3xl overflow-hidden h-[320px] shadow-lg group">
            <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
             <div class="absolute top-4 right-4 bg-white/20 backdrop-blur px-3 py-1 rounded-lg text-white text-xs font-bold border border-white/30">
               45 min
            </div>
            <div class="absolute bottom-0 left-0 w-full p-6 text-white">
               <h3 class="text-2xl font-bold mb-2">Pepperoni Pizza</h3>
               <div class="flex items-center gap-4 text-sm font-medium opacity-90">
                  <span class="flex items-center gap-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" class="text-amber-400" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg> 4.9</span>
                  <span>Medium</span>
                  <span>600 kcal</span>
               </div>
            </div>
         </div>
      </div>
   </div>

   <div class="fixed bottom-0 w-full bg-white border-t border-gray-100 p-4 flex justify-around items-center text-gray-400">
      <button class="flex flex-col items-center gap-1 text-amber-500 font-bold text-xs"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>Home</button>
      <button class="flex flex-col items-center gap-1 hover:text-gray-900 transition-colors text-xs font-bold"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>Saved</button>
      <button class="flex flex-col items-center gap-1 hover:text-gray-900 transition-colors text-xs font-bold"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>Profile</button>
   </div>
</div>`
  },
  {
    id: 'tasks-1',
    name: 'Focus',
    description: 'Minimalist productivity app with clean typography and gesture-ready list items.',
    category: 'Productivity',
    thumbnailGradient: 'from-gray-200 to-gray-400',
    theme: { fontBody: 'Inter', fontHeading: 'Inter', radius: 8, mode: 'light', primaryColor: '#000000' },
    code: `<div class="bg-gray-50 min-h-screen text-black font-sans p-6 relative">
   <div class="flex justify-between items-center mb-10 pt-4">
      <div>
         <h1 class="text-3xl font-bold tracking-tight mb-1">Good Morning</h1>
         <p class="text-gray-500 font-medium">You have 4 tasks due today.</p>
      </div>
      <div class="w-10 h-10 rounded-full bg-gray-200 border border-gray-300 overflow-hidden">
         <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" />
      </div>
   </div>

   <div class="mb-8">
      <h2 class="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Priority</h2>
      <div class="space-y-3">
         <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4 group cursor-pointer hover:border-black transition-colors">
            <div class="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-black group-hover:bg-black/5 transition-all"></div>
            <div class="flex-1">
               <h3 class="font-bold text-sm">Design System Review</h3>
               <p class="text-xs text-gray-400">10:00 AM • Zoom</p>
            </div>
            <div class="w-3 h-3 rounded-full bg-red-500"></div>
         </div>
         <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4 group cursor-pointer hover:border-black transition-colors">
            <div class="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-black group-hover:bg-black/5 transition-all"></div>
            <div class="flex-1">
               <h3 class="font-bold text-sm">Client Presentation</h3>
               <p class="text-xs text-gray-400">2:00 PM • Office</p>
            </div>
            <div class="w-3 h-3 rounded-full bg-orange-500"></div>
         </div>
      </div>
   </div>

   <div>
      <h2 class="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Upcoming</h2>
      <div class="space-y-3">
         <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4 group cursor-pointer hover:border-black transition-colors opacity-50">
            <div class="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white text-[10px]">✓</div>
            <div class="flex-1">
               <h3 class="font-bold text-sm line-through">Morning Standup</h3>
               <p class="text-xs text-gray-400">Completed at 9:15 AM</p>
            </div>
         </div>
          <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4 group cursor-pointer hover:border-black transition-colors">
            <div class="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-black group-hover:bg-black/5 transition-all"></div>
            <div class="flex-1">
               <h3 class="font-bold text-sm">Update Portfolio</h3>
               <p class="text-xs text-gray-400">Tomorrow</p>
            </div>
            <div class="w-3 h-3 rounded-full bg-blue-500"></div>
         </div>
      </div>
   </div>

   <button class="fixed bottom-8 right-8 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
   </button>
</div>`
  },
  {
    id: 'music-1',
    name: 'Vibe',
    description: 'Immersive music player with large album art, gradients, and playback controls.',
    category: 'Entertainment',
    thumbnailGradient: 'from-violet-500 to-fuchsia-500',
    theme: { fontBody: 'Inter', fontHeading: 'Inter', radius: 24, mode: 'dark', primaryColor: '#D946EF' },
    code: `<div class="bg-gray-900 min-h-screen text-white font-sans p-6 flex flex-col relative overflow-hidden">
   <!-- Background Blur -->
   <div class="absolute top-[-20%] left-[-20%] w-[400px] h-[400px] bg-violet-600 rounded-full blur-[100px] opacity-30"></div>
   <div class="absolute bottom-[-20%] right-[-20%] w-[400px] h-[400px] bg-fuchsia-600 rounded-full blur-[100px] opacity-30"></div>

   <div class="relative z-10 flex justify-between items-center mb-8 pt-4">
      <button class="w-10 h-10 bg-white/10 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/20"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
      <div class="text-xs font-bold uppercase tracking-widest text-gray-400">Now Playing</div>
      <button class="w-10 h-10 bg-white/10 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/20"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></button>
   </div>

   <div class="relative z-10 flex-1 flex flex-col justify-center items-center mb-8">
      <div class="w-64 h-64 rounded-3xl overflow-hidden shadow-2xl shadow-violet-500/20 mb-8 border border-white/10">
         <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover" />
      </div>
      <div class="text-center">
         <h2 class="text-2xl font-bold mb-1">Midnight City</h2>
         <p class="text-gray-400 font-medium">M83 • Hurry Up, We're Dreaming</p>
      </div>
   </div>

   <div class="relative z-10 space-y-8 mb-8">
      <!-- Progress -->
      <div class="space-y-2">
         <div class="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div class="w-[65%] h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full relative">
               <div class="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"></div>
            </div>
         </div>
         <div class="flex justify-between text-xs font-medium text-gray-400 font-mono">
            <span>2:34</span>
            <span>4:03</span>
         </div>
      </div>

      <!-- Controls -->
      <div class="flex justify-between items-center px-4">
         <button class="text-gray-400 hover:text-white"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 4v6h6"></path><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg></button>
         <div class="flex items-center gap-6">
            <button class="text-white hover:text-fuchsia-400"><svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg></button>
            <button class="w-16 h-16 bg-gradient-to-tr from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-fuchsia-500/40 hover:scale-105 transition-transform"><svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg></button>
            <button class="text-white hover:text-fuchsia-400"><svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg></button>
         </div>
         <button class="text-gray-400 hover:text-white"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg></button>
      </div>
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
