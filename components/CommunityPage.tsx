
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
