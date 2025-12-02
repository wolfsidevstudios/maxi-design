
import React from 'react';
import { Template } from '../types';
import { Zap, Smartphone, Monitor, Users } from './Icons';

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

// --- STATIC HTML TEMPLATES ---

const HTML_CRYPTO = `
<div class="bg-gray-900 min-h-screen font-sans text-white pb-20">
  <!-- Header -->
  <div class="bg-gradient-to-br from-indigo-900 to-purple-900 p-6 pt-12 rounded-b-[2.5rem] shadow-2xl relative overflow-hidden">
    <div class="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
    
    <div class="flex justify-between items-center mb-8 relative z-10">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center font-bold text-lg shadow-lg border border-white/20">JD</div>
        <div>
          <div class="text-xs text-indigo-300 font-medium uppercase tracking-wider">Welcome back</div>
          <div class="font-bold text-lg leading-none">John Doe</div>
        </div>
      </div>
      <button class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-md">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
      </button>
    </div>

    <div class="mb-8 relative z-10">
      <div class="text-indigo-300 text-sm font-medium mb-1">Total Balance</div>
      <div class="text-5xl font-black tracking-tight mb-2">$42,593.00</div>
      <div class="inline-flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-lg text-xs font-bold">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
        +12.5%
      </div>
    </div>

    <div class="flex gap-4 relative z-10">
      <button class="flex-1 bg-white text-indigo-900 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-gray-50 transition-colors">Send</button>
      <button class="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold text-sm shadow-lg border border-indigo-500 hover:bg-indigo-500 transition-colors">Receive</button>
    </div>
  </div>

  <!-- Assets List -->
  <div class="px-6 mt-8">
    <div class="flex justify-between items-center mb-4">
      <h3 class="font-bold text-lg">Your Assets</h3>
      <button class="text-indigo-400 text-sm font-bold">View All</button>
    </div>

    <div class="space-y-4">
      <div class="bg-gray-800 p-4 rounded-2xl flex items-center justify-between border border-gray-700 shadow-sm">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center font-bold text-xl">₿</div>
          <div>
            <div class="font-bold text-lg">Bitcoin</div>
            <div class="text-gray-400 text-xs">BTC</div>
          </div>
        </div>
        <div class="text-right">
          <div class="font-bold text-lg">$24,500</div>
          <div class="text-green-400 text-xs font-bold">+2.4%</div>
        </div>
      </div>

      <div class="bg-gray-800 p-4 rounded-2xl flex items-center justify-between border border-gray-700 shadow-sm">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center font-bold text-xl">Ξ</div>
          <div>
            <div class="font-bold text-lg">Ethereum</div>
            <div class="text-gray-400 text-xs">ETH</div>
          </div>
        </div>
        <div class="text-right">
          <div class="font-bold text-lg">$1,850</div>
          <div class="text-red-400 text-xs font-bold">-0.8%</div>
        </div>
      </div>

      <div class="bg-gray-800 p-4 rounded-2xl flex items-center justify-between border border-gray-700 shadow-sm">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center font-bold text-xl">S</div>
          <div>
            <div class="font-bold text-lg">Solana</div>
            <div class="text-gray-400 text-xs">SOL</div>
          </div>
        </div>
        <div class="text-right">
          <div class="font-bold text-lg">$142</div>
          <div class="text-green-400 text-xs font-bold">+5.1%</div>
        </div>
      </div>
    </div>
  </div>
</div>`;

const HTML_ECOMMERCE = `
<div class="bg-white min-h-screen font-sans pb-24">
  <!-- Nav -->
  <div class="flex justify-between items-center p-6 sticky top-0 bg-white z-50">
    <button class="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
    </button>
    <div class="font-bold text-lg uppercase tracking-wider">Supreme</div>
    <button class="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 relative">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
      <div class="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
    </button>
  </div>

  <!-- Product Image -->
  <div class="relative px-6 mb-8 group">
    <div class="aspect-[4/5] bg-gray-100 rounded-[2rem] overflow-hidden relative">
      <img src="https://picsum.photos/id/883/800/1000" class="w-full h-full object-cover mix-blend-multiply" />
      <div class="absolute bottom-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold border border-white/50">
        New Season
      </div>
    </div>
    
    <!-- Dots -->
    <div class="flex justify-center gap-2 mt-6">
      <div class="w-2 h-2 rounded-full bg-black"></div>
      <div class="w-2 h-2 rounded-full bg-gray-300"></div>
      <div class="w-2 h-2 rounded-full bg-gray-300"></div>
    </div>
  </div>

  <!-- Info -->
  <div class="px-6">
    <div class="flex justify-between items-start mb-2">
      <h1 class="text-3xl font-black uppercase leading-none tracking-tight">Urban<br>Jacket v2</h1>
      <div class="text-2xl font-bold text-gray-900">$189</div>
    </div>
    
    <div class="flex items-center gap-1 mb-6">
      <svg class="text-yellow-400 w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      <svg class="text-yellow-400 w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      <svg class="text-yellow-400 w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      <svg class="text-yellow-400 w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      <span class="text-xs font-bold text-gray-400 ml-1">(420 reviews)</span>
    </div>

    <div class="mb-8">
      <div class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Description</div>
      <p class="text-gray-600 leading-relaxed text-sm font-medium">
        Constructed from premium heavy-weight cotton. Features a boxy fit, dropped shoulders, and our signature minimal branding. Built to last a lifetime.
      </p>
    </div>

    <!-- Size Selector -->
    <div class="mb-8">
       <div class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Select Size</div>
       <div class="flex gap-3">
          <button class="w-12 h-12 rounded-xl border-2 border-gray-200 flex items-center justify-center font-bold text-gray-400 hover:border-black hover:text-black transition-all">S</button>
          <button class="w-12 h-12 rounded-xl border-2 border-black bg-black text-white flex items-center justify-center font-bold shadow-lg">M</button>
          <button class="w-12 h-12 rounded-xl border-2 border-gray-200 flex items-center justify-center font-bold text-gray-400 hover:border-black hover:text-black transition-all">L</button>
          <button class="w-12 h-12 rounded-xl border-2 border-gray-200 flex items-center justify-center font-bold text-gray-400 hover:border-black hover:text-black transition-all">XL</button>
       </div>
    </div>
  </div>

  <!-- Bottom Bar -->
  <div class="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100 flex items-center gap-4 z-50">
     <button class="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
     </button>
     <button class="flex-1 h-14 bg-black text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-xl">
        Add to Cart
     </button>
  </div>
</div>`;

const HTML_FITNESS = `
<div class="bg-gray-950 min-h-screen font-sans text-white pb-24">
  <div class="p-6 pt-12">
    <div class="flex justify-between items-center mb-8">
       <div>
          <div class="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Thursday, 24 Oct</div>
          <h1 class="text-3xl font-black">Hello, Alex</h1>
       </div>
       <div class="w-12 h-12 rounded-full border-2 border-green-500 p-0.5">
          <img src="https://picsum.photos/id/64/200/200" class="w-full h-full rounded-full object-cover" />
       </div>
    </div>

    <!-- Stats Rings -->
    <div class="bg-gray-900 rounded-[2rem] p-6 mb-8 border border-gray-800 relative overflow-hidden">
       <div class="absolute top-0 right-0 w-32 h-32 bg-green-500 rounded-full blur-[60px] opacity-20"></div>
       
       <div class="flex justify-between items-end mb-6">
          <div class="font-bold text-lg">Daily Activity</div>
          <button class="text-green-500 text-xs font-black uppercase tracking-widest">Details</button>
       </div>

       <div class="flex justify-center gap-8 mb-4">
          <div class="flex flex-col items-center gap-2">
             <div class="w-20 h-20 rounded-full border-4 border-gray-800 border-t-green-500 border-r-green-500 rotate-45 flex items-center justify-center">
                <span class="text-xl font-black -rotate-45">75%</span>
             </div>
             <span class="text-xs font-bold text-gray-500 uppercase">Move</span>
          </div>
          <div class="flex flex-col items-center gap-2">
             <div class="w-20 h-20 rounded-full border-4 border-gray-800 border-t-orange-500 border-l-orange-500 -rotate-12 flex items-center justify-center">
                <span class="text-xl font-black rotate-12">450</span>
             </div>
             <span class="text-xs font-bold text-gray-500 uppercase">Kcal</span>
          </div>
          <div class="flex flex-col items-center gap-2">
             <div class="w-20 h-20 rounded-full border-4 border-gray-800 border-b-blue-500 border-r-blue-500 rotate-90 flex items-center justify-center">
                <span class="text-xl font-black -rotate-90">4km</span>
             </div>
             <span class="text-xs font-bold text-gray-500 uppercase">Dist</span>
          </div>
       </div>
    </div>

    <!-- Actions -->
    <div class="grid grid-cols-2 gap-4 mb-8">
       <div class="bg-[#A3E635] text-black p-6 rounded-[2rem] flex flex-col justify-between h-40 group hover:scale-[1.02] transition-transform">
          <div class="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
          </div>
          <div>
             <div class="font-black text-xl mb-1">New<br>Workout</div>
             <div class="text-xs font-bold opacity-60 uppercase">Start Now</div>
          </div>
       </div>
       <div class="bg-gray-900 text-white p-6 rounded-[2rem] flex flex-col justify-between h-40 border border-gray-800 group hover:border-gray-700 transition-colors">
          <div class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          </div>
          <div>
             <div class="font-black text-xl mb-1">Meal<br>Plan</div>
             <div class="text-xs font-bold text-gray-500 uppercase">1,200 / 2,400</div>
          </div>
       </div>
    </div>

    <!-- Recent -->
    <div>
       <h3 class="font-bold text-lg mb-4">Recent Activity</h3>
       <div class="space-y-3">
          <div class="bg-gray-900 p-4 rounded-2xl flex items-center gap-4 border border-gray-800">
             <div class="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m8 17 4 4 4-4"/></svg>
             </div>
             <div class="flex-1">
                <div class="font-bold">Morning Run</div>
                <div class="text-xs text-gray-500">6:30 AM • 45 min</div>
             </div>
             <div class="font-bold text-green-400">+320 kcal</div>
          </div>
           <div class="bg-gray-900 p-4 rounded-2xl flex items-center gap-4 border border-gray-800">
             <div class="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center text-orange-400">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m2 12 10-10 10 10-10 10Z"/></svg>
             </div>
             <div class="flex-1">
                <div class="font-bold">Upper Body</div>
                <div class="text-xs text-gray-500">Yesterday • 60 min</div>
             </div>
             <div class="font-bold text-green-400">+450 kcal</div>
          </div>
       </div>
    </div>
  </div>
</div>`;

const HTML_WEB_DASHBOARD = `
<div class="min-h-screen bg-gray-50 font-sans flex text-gray-900">
   <!-- Sidebar -->
   <div class="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-10">
      <div class="p-6 flex items-center gap-3 border-b border-gray-100">
         <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-lg">S</div>
         <span class="font-bold text-xl tracking-tight">SaaSify</span>
      </div>
      
      <div class="flex-1 p-4 space-y-1">
         <div class="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 mt-4">Main</div>
         <a href="#" class="flex items-center gap-3 px-3 py-2.5 bg-blue-50 text-blue-600 rounded-lg font-bold">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg>
            Dashboard
         </a>
         <a href="#" class="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Customers
         </a>
         <a href="#" class="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            Orders
         </a>
         
         <div class="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 mt-6">Settings</div>
         <a href="#" class="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>
            Preferences
         </a>
      </div>
      
      <div class="p-4 border-t border-gray-200">
         <div class="flex items-center gap-3">
            <img src="https://picsum.photos/id/1005/100/100" class="w-10 h-10 rounded-full object-cover" />
            <div>
               <div class="text-sm font-bold">Jane Smith</div>
               <div class="text-xs text-gray-500">Admin</div>
            </div>
         </div>
      </div>
   </div>

   <!-- Content -->
   <div class="flex-1 ml-64 p-8">
      <div class="flex justify-between items-center mb-8">
         <h1 class="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
         <div class="flex gap-3">
            <button class="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">Filter</button>
            <button class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-blue-700">Export Data</button>
         </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-4 gap-6 mb-8">
         <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div class="text-gray-500 text-sm font-medium mb-1 uppercase tracking-wide">Total Revenue</div>
            <div class="text-3xl font-black mb-2">$124,500</div>
            <div class="text-green-600 text-sm font-bold flex items-center gap-1">↑ 12.5% <span class="text-gray-400 font-normal">vs last month</span></div>
         </div>
         <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div class="text-gray-500 text-sm font-medium mb-1 uppercase tracking-wide">Active Users</div>
            <div class="text-3xl font-black mb-2">8,249</div>
            <div class="text-green-600 text-sm font-bold flex items-center gap-1">↑ 8.2% <span class="text-gray-400 font-normal">vs last month</span></div>
         </div>
         <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div class="text-gray-500 text-sm font-medium mb-1 uppercase tracking-wide">Bounce Rate</div>
            <div class="text-3xl font-black mb-2">42.3%</div>
            <div class="text-red-500 text-sm font-bold flex items-center gap-1">↓ 2.1% <span class="text-gray-400 font-normal">vs last month</span></div>
         </div>
         <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div class="text-gray-500 text-sm font-medium mb-1 uppercase tracking-wide">Avg. Session</div>
            <div class="text-3xl font-black mb-2">4m 32s</div>
            <div class="text-gray-400 text-sm">No change</div>
         </div>
      </div>

      <!-- Main Chart Area -->
      <div class="grid grid-cols-3 gap-6 mb-8">
         <div class="col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div class="flex justify-between items-center mb-6">
               <h3 class="font-bold text-lg">Revenue Over Time</h3>
               <select class="text-sm border-gray-300 rounded-md shadow-sm border p-1"><option>Last 30 Days</option></select>
            </div>
            <div class="h-64 flex items-end justify-between gap-2 px-4">
               <div class="w-full bg-blue-100 rounded-t-lg h-[40%] relative group"><div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">$4k</div></div>
               <div class="w-full bg-blue-200 rounded-t-lg h-[60%]"></div>
               <div class="w-full bg-blue-300 rounded-t-lg h-[50%]"></div>
               <div class="w-full bg-blue-400 rounded-t-lg h-[70%]"></div>
               <div class="w-full bg-blue-500 rounded-t-lg h-[65%]"></div>
               <div class="w-full bg-blue-600 rounded-t-lg h-[85%] relative group"><div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">$12k</div></div>
            </div>
         </div>
         <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
             <h3 class="font-bold text-lg mb-6">Traffic Sources</h3>
             <div class="space-y-4">
                <div>
                   <div class="flex justify-between text-sm font-bold mb-1"><span>Direct</span> <span>45%</span></div>
                   <div class="w-full bg-gray-100 rounded-full h-2"><div class="bg-blue-600 h-2 rounded-full w-[45%]"></div></div>
                </div>
                <div>
                   <div class="flex justify-between text-sm font-bold mb-1"><span>Social</span> <span>32%</span></div>
                   <div class="w-full bg-gray-100 rounded-full h-2"><div class="bg-purple-500 h-2 rounded-full w-[32%]"></div></div>
                </div>
                <div>
                   <div class="flex justify-between text-sm font-bold mb-1"><span>Organic</span> <span>15%</span></div>
                   <div class="w-full bg-gray-100 rounded-full h-2"><div class="bg-green-500 h-2 rounded-full w-[15%]"></div></div>
                </div>
             </div>
         </div>
      </div>

      <!-- Table -->
      <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
         <div class="p-6 border-b border-gray-100">
            <h3 class="font-bold text-lg">Recent Transactions</h3>
         </div>
         <table class="w-full text-sm text-left">
            <thead class="bg-gray-50 text-gray-500 font-bold uppercase text-xs">
               <tr>
                  <th class="px-6 py-4">Customer</th>
                  <th class="px-6 py-4">Status</th>
                  <th class="px-6 py-4">Date</th>
                  <th class="px-6 py-4 text-right">Amount</th>
               </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
               <tr class="hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4 font-bold text-gray-900">Adobe Inc.</td>
                  <td class="px-6 py-4"><span class="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">Completed</span></td>
                  <td class="px-6 py-4 text-gray-500">Oct 24, 2024</td>
                  <td class="px-6 py-4 text-right font-mono font-medium">$4,200.00</td>
               </tr>
               <tr class="hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4 font-bold text-gray-900">Netflix</td>
                  <td class="px-6 py-4"><span class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-bold">Pending</span></td>
                  <td class="px-6 py-4 text-gray-500">Oct 23, 2024</td>
                  <td class="px-6 py-4 text-right font-mono font-medium">$850.00</td>
               </tr>
               <tr class="hover:bg-gray-50 transition-colors">
                  <td class="px-6 py-4 font-bold text-gray-900">Spotify</td>
                  <td class="px-6 py-4"><span class="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">Completed</span></td>
                  <td class="px-6 py-4 text-gray-500">Oct 21, 2024</td>
                  <td class="px-6 py-4 text-right font-mono font-medium">$2,100.00</td>
               </tr>
            </tbody>
         </table>
      </div>
   </div>
</div>`;

const HTML_MEDITATION = `
<div class="bg-teal-50 min-h-screen font-sans text-teal-900">
   <div class="p-6 pt-12">
      <div class="flex justify-between items-center mb-10">
         <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
         </div>
         <h1 class="font-serif text-2xl font-bold">Zen Master</h1>
         <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
         </div>
      </div>

      <div class="text-center mb-12">
         <div class="text-sm font-medium uppercase tracking-widest text-teal-600 mb-2">Daily Focus</div>
         <h2 class="text-4xl font-serif font-medium mb-6">Breathe In,<br>Breathe Out</h2>
         
         <div class="w-64 h-64 mx-auto rounded-full bg-teal-200/50 flex items-center justify-center relative">
            <div class="absolute inset-0 border border-teal-300 rounded-full animate-ping opacity-20"></div>
            <div class="w-48 h-48 bg-teal-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl">
               10:00
            </div>
         </div>
      </div>

      <div class="bg-white rounded-[2rem] p-6 shadow-xl">
         <h3 class="font-bold text-lg mb-4">Recommended Sessions</h3>
         <div class="space-y-4">
            <div class="flex items-center gap-4 p-3 hover:bg-teal-50 rounded-xl transition-colors cursor-pointer">
               <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2"/><path d="M12 21v2"/><path d="M4.22 4.22l1.42 1.42"/><path d="M18.36 18.36l1.42 1.42"/><path d="M1 12h2"/><path d="M21 12h2"/><path d="M4.22 19.78l1.42-1.42"/><path d="M18.36 5.64l1.42-1.42"/></svg>
               </div>
               <div class="flex-1">
                  <div class="font-bold">Morning Energy</div>
                  <div class="text-xs text-gray-500">5 min • Focus</div>
               </div>
               <button class="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>
               </button>
            </div>
             <div class="flex items-center gap-4 p-3 hover:bg-teal-50 rounded-xl transition-colors cursor-pointer">
               <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
               </div>
               <div class="flex-1">
                  <div class="font-bold">Deep Sleep</div>
                  <div class="text-xs text-gray-500">20 min • Relax</div>
               </div>
               <button class="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>
               </button>
            </div>
         </div>
      </div>
   </div>
</div>`;

const HTML_FOOD = `
<div class="bg-gray-50 min-h-screen font-sans pb-24">
   <div class="sticky top-0 bg-white z-20 px-6 py-4 shadow-sm">
      <div class="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Delivering to</div>
      <div class="flex items-center gap-2 text-orange-500 font-black text-lg cursor-pointer">
         San Francisco, CA <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m6 9 6 6 6-6"/></svg>
      </div>
   </div>

   <div class="p-6">
      <div class="relative mb-8">
         <input type="text" placeholder="Search for burgers, sushi..." class="w-full bg-white border-none rounded-2xl py-4 pl-12 pr-4 shadow-sm font-medium text-gray-700 outline-none" />
         <svg class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      </div>

      <div class="flex gap-4 overflow-x-auto pb-4 no-scrollbar mb-6">
         <div class="bg-orange-500 text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-orange-500/30 whitespace-nowrap">🍔 Burger</div>
         <div class="bg-white text-gray-600 px-6 py-2 rounded-full font-bold shadow-sm whitespace-nowrap">🍕 Pizza</div>
         <div class="bg-white text-gray-600 px-6 py-2 rounded-full font-bold shadow-sm whitespace-nowrap">🍣 Sushi</div>
         <div class="bg-white text-gray-600 px-6 py-2 rounded-full font-bold shadow-sm whitespace-nowrap">🥗 Healthy</div>
      </div>

      <h2 class="font-black text-2xl mb-4">Popular Near You</h2>
      
      <div class="space-y-6">
         <!-- Card 1 -->
         <div class="bg-white rounded-3xl overflow-hidden shadow-lg group cursor-pointer">
            <div class="h-48 relative">
               <img src="https://picsum.photos/id/488/600/400" class="w-full h-full object-cover" />
               <div class="absolute top-4 right-4 bg-white px-2 py-1 rounded-lg font-black text-xs shadow-md">25-30 min</div>
               <button class="absolute bottom-[-20px] right-6 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5v14"/></svg>
               </button>
            </div>
            <div class="p-6 pt-8">
               <h3 class="font-black text-xl mb-1">Double Cheeseburger</h3>
               <div class="flex items-center gap-1 text-sm font-medium text-gray-500 mb-3">
                  <span class="text-orange-500 flex items-center gap-1 font-bold">★ 4.8</span> • Burger King • $$
               </div>
               <div class="flex items-center gap-2">
                  <span class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold">Free Delivery</span>
                  <span class="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold">🔥 Hot</span>
               </div>
            </div>
         </div>

         <!-- Card 2 -->
         <div class="bg-white rounded-3xl overflow-hidden shadow-lg group cursor-pointer">
            <div class="h-48 relative">
               <img src="https://picsum.photos/id/225/600/400" class="w-full h-full object-cover" />
               <div class="absolute top-4 right-4 bg-white px-2 py-1 rounded-lg font-black text-xs shadow-md">15-20 min</div>
            </div>
            <div class="p-6">
               <h3 class="font-black text-xl mb-1">Morning Bagel</h3>
               <div class="flex items-center gap-1 text-sm font-medium text-gray-500">
                  <span class="text-orange-500 flex items-center gap-1 font-bold">★ 4.9</span> • The Bagel Shop • $
               </div>
            </div>
         </div>
      </div>
   </div>
   
   <!-- Tab Bar -->
   <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 flex justify-around items-center z-50">
      <button class="flex flex-col items-center gap-1 text-orange-500">
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      </button>
      <button class="flex flex-col items-center gap-1 text-gray-400">
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.28 3.6-2.34 3.6-4.44C22.59 7.05 19.84 3 14.46 3c-5.99 0-11 5-11 5v14c0 1.66 1.34 3 3 3h5.71c2.22 0 4.49-1 6.83-2.72 2.37-1.74 2.67-2.98 2.67-3.24 0-.34-.32-.78-2.67-5.04"/></svg>
      </button>
      <button class="flex flex-col items-center gap-1 text-gray-400">
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      </button>
   </div>
</div>`;

const HTML_TRAVEL = `
<div class="bg-black min-h-screen font-sans text-white relative">
   <img src="https://picsum.photos/id/1039/400/800" class="absolute inset-0 w-full h-full object-cover opacity-60" />
   <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>

   <div class="relative z-10 p-6 flex flex-col h-screen">
      <div class="flex justify-between items-center">
         <button class="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
         </button>
         <div class="text-sm font-bold uppercase tracking-widest">Explore</div>
         <button class="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
         </button>
      </div>

      <div class="mt-auto mb-10">
         <div class="flex items-center gap-2 mb-2 animate-pulse">
            <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span class="text-xs font-bold uppercase tracking-widest text-blue-300">Popular Now</span>
         </div>
         <h1 class="text-5xl font-black mb-4 leading-none">Kyoto,<br>Japan</h1>
         <p class="text-gray-300 mb-8 max-w-[80%] leading-relaxed text-sm">Experience the ancient temples and vibrant streets of Japan's cultural capital.</p>
         
         <div class="flex gap-4">
            <button class="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest shadow-lg shadow-blue-600/30">Book Flight</button>
            <button class="w-16 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center font-bold text-2xl">♡</button>
         </div>
      </div>

      <div class="pb-6 overflow-x-auto no-scrollbar flex gap-4">
         <div class="min-w-[140px] h-20 bg-white/10 backdrop-blur rounded-xl p-3 flex items-center gap-3 border border-white/10">
            <img src="https://picsum.photos/id/1015/100/100" class="w-12 h-12 rounded-lg object-cover" />
            <div>
               <div class="font-bold text-sm">River</div>
               <div class="text-[10px] text-gray-400">4.8 ★</div>
            </div>
         </div>
         <div class="min-w-[140px] h-20 bg-white/10 backdrop-blur rounded-xl p-3 flex items-center gap-3 border border-white/10">
            <img src="https://picsum.photos/id/1036/100/100" class="w-12 h-12 rounded-lg object-cover" />
            <div>
               <div class="font-bold text-sm">Snow</div>
               <div class="text-[10px] text-gray-400">4.9 ★</div>
            </div>
         </div>
         <div class="min-w-[140px] h-20 bg-white/10 backdrop-blur rounded-xl p-3 flex items-center gap-3 border border-white/10">
            <img src="https://picsum.photos/id/1040/100/100" class="w-12 h-12 rounded-lg object-cover" />
            <div>
               <div class="font-bold text-sm">Castle</div>
               <div class="text-[10px] text-gray-400">4.7 ★</div>
            </div>
         </div>
      </div>
   </div>
</div>`;

const HTML_CHAT = `
<div class="bg-white min-h-screen font-sans flex flex-col">
   <!-- Header -->
   <div class="p-4 pt-12 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur z-10">
      <div class="flex items-center gap-3">
         <div class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600">JD</div>
         <h1 class="text-xl font-black">Messages</h1>
      </div>
      <button class="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center shadow-md">
         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
      </button>
   </div>

   <!-- Stories -->
   <div class="py-4 px-4 overflow-x-auto no-scrollbar flex gap-4 border-b border-gray-100">
      <div class="flex flex-col items-center gap-1">
         <div class="w-14 h-14 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 cursor-pointer">+</div>
         <span class="text-[10px] font-bold text-gray-400 uppercase">My Story</span>
      </div>
      <div class="flex flex-col items-center gap-1">
         <div class="w-14 h-14 rounded-full p-0.5 border-2 border-indigo-500">
            <img src="https://picsum.photos/id/64/100/100" class="w-full h-full rounded-full object-cover" />
         </div>
         <span class="text-[10px] font-bold">Sarah</span>
      </div>
      <div class="flex flex-col items-center gap-1">
         <div class="w-14 h-14 rounded-full p-0.5 border-2 border-indigo-500">
            <img src="https://picsum.photos/id/65/100/100" class="w-full h-full rounded-full object-cover" />
         </div>
         <span class="text-[10px] font-bold">Mike</span>
      </div>
       <div class="flex flex-col items-center gap-1">
         <div class="w-14 h-14 rounded-full p-0.5 border-2 border-gray-200">
            <img src="https://picsum.photos/id/91/100/100" class="w-full h-full rounded-full object-cover grayscale" />
         </div>
         <span class="text-[10px] font-bold text-gray-400">Alex</span>
      </div>
   </div>

   <!-- List -->
   <div class="flex-1 p-4 space-y-2">
      <div class="flex items-center gap-4 p-3 bg-indigo-50 rounded-2xl cursor-pointer">
         <div class="relative">
            <img src="https://picsum.photos/id/64/100/100" class="w-12 h-12 rounded-full object-cover" />
            <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
         </div>
         <div class="flex-1 min-w-0">
            <div class="flex justify-between items-baseline mb-1">
               <h3 class="font-bold text-sm">Sarah Jenkins</h3>
               <span class="text-[10px] font-bold text-indigo-500">2m ago</span>
            </div>
            <p class="text-sm text-gray-600 truncate font-medium">Are we still on for coffee tomorrow?</p>
         </div>
         <div class="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">2</div>
      </div>

       <div class="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-2xl cursor-pointer transition-colors">
         <div class="relative">
            <img src="https://picsum.photos/id/65/100/100" class="w-12 h-12 rounded-full object-cover" />
         </div>
         <div class="flex-1 min-w-0">
            <div class="flex justify-between items-baseline mb-1">
               <h3 class="font-bold text-sm">Mike Ross</h3>
               <span class="text-[10px] font-bold text-gray-400">1h ago</span>
            </div>
            <p class="text-sm text-gray-400 truncate">Sent a photo.</p>
         </div>
      </div>
      
      <div class="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-2xl cursor-pointer transition-colors">
         <div class="relative">
             <div class="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">T</div>
         </div>
         <div class="flex-1 min-w-0">
            <div class="flex justify-between items-baseline mb-1">
               <h3 class="font-bold text-sm">Team Alpha</h3>
               <span class="text-[10px] font-bold text-gray-400">Yesterday</span>
            </div>
            <p class="text-sm text-gray-400 truncate">Meeting updated to 3 PM.</p>
         </div>
      </div>
   </div>
</div>`;

const HTML_CRM_WEB = `
<div class="min-h-screen bg-gray-50 font-sans text-gray-900 flex">
  <div class="w-64 bg-slate-900 text-white flex flex-col">
    <div class="p-6 font-black text-2xl tracking-tight">CRM<span class="text-blue-500">Pro</span></div>
    <div class="flex-1 px-4 py-4 space-y-1">
      <div class="px-2 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Menu</div>
      <a href="#" class="block px-4 py-2 bg-blue-600 rounded-lg font-bold text-sm">Dashboard</a>
      <a href="#" class="block px-4 py-2 hover:bg-slate-800 rounded-lg font-medium text-sm text-slate-300">Contacts</a>
      <a href="#" class="block px-4 py-2 hover:bg-slate-800 rounded-lg font-medium text-sm text-slate-300">Deals</a>
    </div>
  </div>
  
  <div class="flex-1 p-8">
     <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">Contacts</h1>
        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-md hover:bg-blue-700 transition-colors">+ Add Contact</button>
     </div>

     <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="p-4 border-b border-gray-200 flex gap-4">
           <input type="text" placeholder="Search contacts..." class="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm w-64 outline-none focus:border-blue-500" />
           <select class="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none"><option>All Statuses</option></select>
        </div>
        <table class="w-full text-left text-sm">
           <thead class="bg-gray-50 text-gray-500 font-bold uppercase text-xs">
              <tr>
                 <th class="px-6 py-4">Name</th>
                 <th class="px-6 py-4">Company</th>
                 <th class="px-6 py-4">Status</th>
                 <th class="px-6 py-4">Last Contact</th>
                 <th class="px-6 py-4 text-right">Actions</th>
              </tr>
           </thead>
           <tbody class="divide-y divide-gray-100">
              <tr class="hover:bg-blue-50/50 transition-colors group">
                 <td class="px-6 py-4 font-bold flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">JD</div>
                    John Doe
                 </td>
                 <td class="px-6 py-4 text-gray-600">TechCorp Inc.</td>
                 <td class="px-6 py-4"><span class="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">Lead</span></td>
                 <td class="px-6 py-4 text-gray-500">2 days ago</td>
                 <td class="px-6 py-4 text-right">
                    <button class="text-gray-400 hover:text-blue-600 font-bold">Edit</button>
                 </td>
              </tr>
              <tr class="hover:bg-blue-50/50 transition-colors group">
                 <td class="px-6 py-4 font-bold flex items-center gap-3">
                    <img src="https://picsum.photos/id/64/100/100" class="w-8 h-8 rounded-full object-cover" />
                    Sarah Smith
                 </td>
                 <td class="px-6 py-4 text-gray-600">Design Studio</td>
                 <td class="px-6 py-4"><span class="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-bold">Customer</span></td>
                 <td class="px-6 py-4 text-gray-500">Yesterday</td>
                 <td class="px-6 py-4 text-right">
                    <button class="text-gray-400 hover:text-blue-600 font-bold">Edit</button>
                 </td>
              </tr>
           </tbody>
        </table>
     </div>
  </div>
</div>`;

const HTML_LANDING_WEB = `
<div class="min-h-screen bg-white font-sans">
  <nav class="flex justify-between items-center p-6 max-w-6xl mx-auto">
     <div class="font-black text-2xl tracking-tighter">Acme<span class="text-purple-600">.ai</span></div>
     <div class="flex gap-6 text-sm font-bold text-gray-600">
        <a href="#" class="hover:text-black">Features</a>
        <a href="#" class="hover:text-black">Pricing</a>
        <a href="#" class="hover:text-black">Blog</a>
     </div>
     <button class="bg-black text-white px-5 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform">Get Started</button>
  </nav>

  <header class="text-center pt-20 pb-32 px-6">
     <div class="inline-block bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">New Feature Release</div>
     <h1 class="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.9]">
        Automate your <br/>
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">workflow instantly.</span>
     </h1>
     <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
        Stop doing repetitive tasks manually. Our AI agent handles the busywork so you can focus on what matters.
     </p>
     <div class="flex justify-center gap-4">
        <button class="bg-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-purple-600/30 hover:bg-purple-500 transition-colors">Start Free Trial</button>
        <button class="bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors">View Demo</button>
     </div>
  </header>

  <section class="bg-gray-50 py-24 border-y border-gray-100">
     <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
           <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20"/><path d="M2 12h20"/></svg>
           </div>
           <h3 class="font-bold text-xl mb-2">Connect Apps</h3>
           <p class="text-gray-600">Integrate with 500+ tools instantly without writing code.</p>
        </div>
        <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
           <div class="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600 mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m22 11-10 10-10-10"/><path d="M12 2v19"/></svg>
           </div>
           <h3 class="font-bold text-xl mb-2">Real-time Sync</h3>
           <p class="text-gray-600">Data updates across all your platforms in milliseconds.</p>
        </div>
        <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
           <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
           </div>
           <h3 class="font-bold text-xl mb-2">Enterprise Security</h3>
           <p class="text-gray-600">SOC2 Type II compliant with end-to-end encryption.</p>
        </div>
     </div>
  </section>
</div>`;

const TEMPLATES: Template[] = [
  // --- MOBILE TEMPLATES ---
  {
    id: 'crypto-1',
    name: 'Neo-Crypto Wallet',
    description: 'A modern, high-contrast wallet dashboard.',
    category: 'Finance',
    thumbnailGradient: 'from-purple-500 to-indigo-600',
    type: 'mobile',
    theme: { fontBody: 'Inter', fontHeading: 'Space Grotesk', radius: 16, mode: 'dark', primaryColor: '#8B5CF6' },
    code: HTML_CRYPTO
  },
  {
    id: 'ecommerce-1',
    name: 'Streetwear Drop',
    description: 'Minimalistic product detail page.',
    category: 'E-Commerce',
    thumbnailGradient: 'from-orange-400 to-red-500',
    type: 'mobile',
    theme: { fontBody: 'Inter', fontHeading: 'Space Grotesk', radius: 0, mode: 'light', primaryColor: '#000000' },
    code: HTML_ECOMMERCE
  },
  {
    id: 'fitness-1',
    name: 'Fitness Pro',
    description: 'Dark mode workout tracker with charts.',
    category: 'Health',
    thumbnailGradient: 'from-emerald-500 to-green-600',
    type: 'mobile',
    theme: { fontBody: 'Inter', fontHeading: 'Inter', radius: 24, mode: 'dark', primaryColor: '#10B981' },
    code: HTML_FITNESS
  },
  
  // --- UNIQUE MOBILE TEMPLATES ---
  { 
     id: 'mobile-2', 
     name: 'Meditation Zen', 
     description: 'Calming mindfulness app with session timer.', 
     category: 'Health', 
     thumbnailGradient: 'from-teal-200 to-cyan-300', 
     type: 'mobile', 
     theme: {fontBody:'Inter', fontHeading:'Playfair Display', radius:32, mode:'light', primaryColor:'#14B8A6'}, 
     code: HTML_MEDITATION 
  },
  { 
     id: 'mobile-3', 
     name: 'Food Delivery', 
     description: 'Vibrant food ordering feed with categories.', 
     category: 'Food', 
     thumbnailGradient: 'from-yellow-400 to-orange-500', 
     type: 'mobile', 
     theme: {fontBody:'Inter', fontHeading:'Inter', radius:16, mode:'light', primaryColor:'#F59E0B'}, 
     code: HTML_FOOD 
  },
  { 
     id: 'mobile-4', 
     name: 'Travel Guide', 
     description: 'Immersive destination guide with large imagery.', 
     category: 'Travel', 
     thumbnailGradient: 'from-blue-400 to-indigo-500', 
     type: 'mobile', 
     theme: {fontBody:'Inter', fontHeading:'Inter', radius:24, mode:'light', primaryColor:'#3B82F6'}, 
     code: HTML_TRAVEL 
  },
  { 
     id: 'mobile-5', 
     name: 'Chat App', 
     description: 'Clean messaging interface with stories.', 
     category: 'Social', 
     thumbnailGradient: 'from-violet-400 to-purple-500', 
     type: 'mobile', 
     theme: {fontBody:'Inter', fontHeading:'Inter', radius:12, mode:'light', primaryColor:'#8B5CF6'}, 
     code: HTML_CHAT 
  },
  
  // --- WEB TEMPLATES ---
  {
     id: 'web-1',
     name: 'SaaS Dashboard',
     description: 'Complete admin panel with charts and tables.',
     category: 'Dashboard',
     thumbnailGradient: 'from-blue-600 to-indigo-700',
     type: 'web',
     theme: { fontBody: 'Inter', fontHeading: 'Inter', radius: 8, mode: 'light', primaryColor: '#2563EB' },
     code: HTML_WEB_DASHBOARD
  },
  { 
     id: 'web-2', 
     name: 'CRM System', 
     description: 'Customer management table view.', 
     category: 'Business', 
     thumbnailGradient: 'from-slate-600 to-slate-800', 
     type: 'web', 
     theme: {fontBody:'Inter', fontHeading:'Inter', radius:4, mode:'light', primaryColor:'#475569'}, 
     code: HTML_CRM_WEB 
  },
  { 
     id: 'web-3', 
     name: 'Landing Page', 
     description: 'High conversion hero section with features.', 
     category: 'Marketing', 
     thumbnailGradient: 'from-purple-500 to-pink-500', 
     type: 'web', 
     theme: {fontBody:'Inter', fontHeading:'Inter', radius:8, mode:'light', primaryColor:'#9333EA'}, 
     code: HTML_LANDING_WEB 
  },
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
