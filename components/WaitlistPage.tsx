
import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowUp, CheckCircle2, Loader2, ShieldAlert, Zap, Code, Layers, Smartphone, MousePointer2, X, AlertTriangle, Monitor, Globe, ChevronDown, Trophy, MessageSquare } from './Icons';
import { joinWaitlist } from '../services/db';

interface WaitlistPageProps {
  onAccessGranted: () => void;
}

const DemoSection = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setStep(s => (s + 1) % 4); // 0: Idle, 1: Sent, 2: Generating, 3: Done
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto mt-16 mb-20 relative px-4 animate-in slide-in-from-bottom-10 duration-1000 delay-300">
        <div className="absolute -inset-4 bg-gradient-to-r from-[#FF6B4A] to-[#A3E635] rounded-[2.5rem] blur-lg opacity-20"></div>
        {/* Container */}
        <div className="relative bg-white border-2 border-black rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_black] flex flex-col md:flex-row h-[400px] md:h-[500px]">
            {/* Left: Chat Simulation */}
            <div className="w-full md:w-1/3 border-b-2 md:border-b-0 md:border-r-2 border-black bg-gray-50 p-6 flex flex-col relative">
                <div className="flex items-center gap-2 mb-6 border-b-2 border-gray-200 pb-4">
                     <div className="w-3 h-3 rounded-full bg-red-400 border border-black"></div>
                     <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black"></div>
                     <div className="w-3 h-3 rounded-full bg-green-400 border border-black"></div>
                </div>
                
                <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                        <MessageSquare size={12} /> AI Chat
                    </div>

                    {step >= 0 && (
                        <div className={`bg-black text-white p-3 rounded-xl rounded-tr-none text-sm font-medium self-end transition-all duration-500 ${step === 0 ? 'opacity-50 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                            Design a crypto wallet app in dark mode
                        </div>
                    )}
                     {step >= 2 && (
                        <div className="bg-[#FF6B4A] text-white p-3 rounded-xl rounded-tl-none text-sm font-medium self-start animate-in fade-in slide-in-from-bottom-2 flex items-center gap-2 shadow-[2px_2px_0px_0px_black]">
                             <Sparkles size={14} /> Generating UI...
                        </div>
                    )}
                </div>

                <div className="mt-4 bg-white border-2 border-black rounded-xl p-3 flex items-center gap-2">
                    <div className="w-full h-2 bg-gray-100 rounded overflow-hidden">
                        {step === 0 && <div className="h-full bg-black w-2/3 animate-[pulse_1s_infinite]"></div>}
                    </div>
                    <div className={`w-8 h-8 rounded-lg border-2 border-black flex items-center justify-center transition-colors ${step > 0 ? 'bg-[#FF6B4A]' : 'bg-gray-200'}`}>
                        <ArrowUp size={16} className="text-white" />
                    </div>
                </div>
            </div>

            {/* Right: UI Preview Simulation */}
            <div className="flex-1 bg-[#FDFBD4] p-8 flex items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 dot-pattern opacity-10"></div>
                 
                 {/* Mobile Frame */}
                 <div className="w-[260px] h-[480px] bg-white border-4 border-black rounded-[2.5rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] relative overflow-hidden flex flex-col transition-all duration-500 transform hover:scale-105">
                     {/* Notch */}
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20"></div>

                     {step < 3 ? (
                         <div className="flex-1 flex flex-col items-center justify-center gap-4 bg-gray-50">
                             {step === 2 && (
                                 <>
                                    <div className="relative">
                                        <Loader2 size={48} className="animate-spin text-[#FF6B4A]" strokeWidth={2.5} />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-2 h-2 bg-black rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="text-xs font-bold uppercase tracking-widest text-gray-400 animate-pulse">Building Pixels</div>
                                 </>
                             )}
                             {step < 2 && (
                                 <div className="text-xs font-bold uppercase tracking-widest text-gray-300">Waiting for prompt</div>
                             )}
                         </div>
                     ) : (
                         <div className="flex-1 flex flex-col gap-4 animate-in fade-in zoom-in duration-500 pt-10 px-4 bg-gray-900 h-full">
                             {/* Mock UI: Crypto Wallet */}
                             <div className="flex justify-between items-center">
                                 <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700"></div>
                                 <div className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center text-white text-[10px]">🔔</div>
                             </div>
                             
                             <div className="bg-gradient-to-br from-[#A3E635] to-[#84cc16] text-black p-5 rounded-2xl shadow-lg mt-2">
                                 <div className="text-[10px] font-bold opacity-60 mb-1 uppercase tracking-wider">Total Balance</div>
                                 <div className="text-2xl font-black tracking-tight">$24,500.00</div>
                             </div>

                             <div className="grid grid-cols-2 gap-3">
                                 <div className="bg-gray-800 p-3 rounded-xl h-20 border border-gray-700"></div>
                                 <div className="bg-gray-800 p-3 rounded-xl h-20 border border-gray-700"></div>
                             </div>
                             
                             <div className="space-y-2 mt-auto pb-4">
                                 <div className="h-12 bg-gray-800 border border-gray-700 rounded-xl"></div>
                                 <div className="h-12 bg-gray-800 border border-gray-700 rounded-xl"></div>
                             </div>
                         </div>
                     )}
                 </div>
            </div>
        </div>
    </div>
  );
}

const WaitlistPage: React.FC<WaitlistPageProps> = ({ onAccessGranted }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    const result = await joinWaitlist(email);

    if (result.success) {
      setStatus('success');
      setMessage(result.message);
    } else {
      setStatus('error');
      setMessage(result.message);
    }
  };

  const WaitlistForm = ({ className = "" }: { className?: string }) => (
    <div className={`w-full max-w-md ${className}`}>
      {status === 'success' ? (
        <div className="bg-[#A3E635] border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_black] text-center animate-in zoom-in duration-300">
           <div className="flex justify-center mb-3">
              <CheckCircle2 size={32} className="text-black" strokeWidth={2.5} />
           </div>
           <h3 className="text-xl font-black uppercase tracking-tight mb-1">You're on the list!</h3>
           <p className="font-medium text-black/80 text-sm leading-tight">{message}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="relative group">
           <div className="relative flex items-center">
              <input 
                 type="email" 
                 placeholder="Enter your email..."
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 disabled={status === 'loading'}
                 className="w-full h-14 bg-white border-2 border-black rounded-xl pl-4 pr-16 text-lg font-medium outline-none focus:shadow-[4px_4px_0px_0px_black] transition-all placeholder:text-gray-400 disabled:opacity-70"
              />
              <button 
                 type="submit" 
                 disabled={status === 'loading' || !email}
                 className="absolute right-2 top-2 bottom-2 aspect-square bg-[#FF6B4A] hover:bg-[#FF5530] text-white rounded-lg border-2 border-black flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[2px_2px_0px_0px_black] hover:translate-x-[-1px] hover:translate-y-[-1px] active:shadow-none active:translate-x-[0px] active:translate-y-[0px]"
              >
                 {status === 'loading' ? <Loader2 className="animate-spin" size={20} /> : <ArrowUp size={24} strokeWidth={3} className="rotate-45" />}
              </button>
           </div>
           {status === 'error' && (
              <div className="absolute -bottom-10 left-0 right-0 flex items-center gap-2 text-red-600 font-bold text-xs bg-red-50 p-2 rounded border border-red-200">
                 <ShieldAlert size={14} /> {message}
              </div>
           )}
        </form>
      )}
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-[#FDFBD4] font-sans selection:bg-[#FF6B4A] selection:text-white overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-[#FDFBD4]/90 backdrop-blur-md border-b-2 border-black">
         <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#FF6B4A] border-2 border-black rounded-lg flex items-center justify-center text-white font-black">M</div>
            <span className="font-bold text-xl tracking-tight">Maxi Design</span>
         </div>
         <a href="#join" className="hidden md:block px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-gray-800 transition-colors">
            Get Early Access
         </a>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 px-6 relative">
         <div className="absolute top-20 right-[-10%] w-[300px] h-[300px] bg-[#A3E635] rounded-full blur-[100px] opacity-20 animate-pulse pointer-events-none"></div>
         <div className="absolute bottom-0 left-[-10%] w-[300px] h-[300px] bg-[#FF6B4A] rounded-full blur-[100px] opacity-20 animate-pulse delay-700 pointer-events-none"></div>

         <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
            {/* Launch Banner */}
            <div className="w-full max-w-2xl bg-[#FFF7ED] border-l-4 border-[#FF6B4A] p-4 rounded-r-lg shadow-sm flex items-start gap-4 text-left mb-8 animate-in slide-in-from-top-4 duration-500">
                <div className="bg-[#FF6B4A] text-white p-2 rounded-lg shrink-0 border border-black shadow-[2px_2px_0px_0px_black]">
                    <Zap size={20} fill="white" />
                </div>
                <div>
                    <h3 className="font-black text-lg text-black uppercase tracking-tight">Launch Imminent</h3>
                    <p className="text-gray-700 font-medium text-sm leading-relaxed">
                        We are 99% ready. Just fine-tuning the AI neurons for maximum accuracy. 
                        <span className="font-bold bg-[#FF6B4A]/10 px-1 rounded mx-1">Official launch expected in 48-72 hours.</span> 
                        Join the waitlist to get notified instantly.
                    </p>
                </div>
            </div>

            <div className="inline-flex items-center gap-2 bg-white border-2 border-black px-4 py-1.5 rounded-full shadow-[4px_4px_0px_0px_black] mb-8 animate-in slide-in-from-top-4 duration-500">
               <Sparkles size={14} className="text-[#FF6B4A] fill-current" />
               <span className="text-xs font-black uppercase tracking-widest">Waitlist v3.0 Open</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-black tracking-tighter leading-[0.9] mb-8 animate-in slide-in-from-bottom-8 duration-700">
               DESIGN APPS<br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B4A] to-[#FF8F75] stroke-black" style={{ WebkitTextStroke: '2px black' }}>
                 WITHOUT CODE
               </span>
            </h1>
            
            <p className="text-xl md:text-2xl font-medium text-gray-800 max-w-2xl mb-12 leading-relaxed animate-in slide-in-from-bottom-10 duration-700 delay-100">
               Generate production-ready UI with Gemini 3.0 Pro. <br className="hidden md:block"/>
               Edit visually like Figma. Export clean React & Tailwind.
            </p>

            <WaitlistForm className="animate-in slide-in-from-bottom-12 duration-700 delay-200" />
            
            <p className="mt-6 text-xs font-bold text-gray-400 uppercase tracking-widest animate-in fade-in delay-500">
               Limited spots available for the beta
            </p>

            {/* DEMO ANIMATION SECTION */}
            <DemoSection />

         </div>
      </section>

      {/* SOCIAL PROOF TICKER */}
      <div className="w-full bg-black py-3 overflow-hidden border-y-2 border-black rotate-1 scale-105">
         <div className="flex whitespace-nowrap gap-8 animate-[marquee_20s_linear_infinite]">
            {[...Array(10)].map((_, i) => (
               <div key={i} className="flex items-center gap-2 text-[#A3E635] font-black uppercase tracking-widest text-sm">
                  <Zap size={16} fill="currentColor" /> JOIN 2,000+ DESIGNERS WAITING FOR ACCESS
               </div>
            ))}
         </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6 bg-white border-b-2 border-black">
         <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
               <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight mb-4">How It Works</h2>
               <p className="text-xl text-gray-600 font-medium">From text to deployed code in three steps.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 relative">
               {/* Line */}
               <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-black border-t-2 border-dashed border-gray-300 z-0"></div>

               {/* Step 1 */}
               <div className="relative z-10 flex flex-col items-center text-center group">
                  <div className="w-24 h-24 bg-[#FDFBD4] border-2 border-black rounded-2xl flex items-center justify-center mb-6 shadow-[8px_8px_0px_0px_black] group-hover:-translate-y-2 transition-transform">
                     <span className="font-display font-black text-4xl text-black">1</span>
                  </div>
                  <h3 className="text-2xl font-black uppercase mb-2">Prompt It</h3>
                  <p className="text-gray-600 font-medium">Describe your dream app in plain English. "A fitness tracker with dark mode."</p>
               </div>

               {/* Step 2 */}
               <div className="relative z-10 flex flex-col items-center text-center group">
                  <div className="w-24 h-24 bg-[#E0F2FE] border-2 border-black rounded-2xl flex items-center justify-center mb-6 shadow-[8px_8px_0px_0px_black] group-hover:-translate-y-2 transition-transform delay-75">
                     <span className="font-display font-black text-4xl text-black">2</span>
                  </div>
                  <h3 className="text-2xl font-black uppercase mb-2">Refine It</h3>
                  <p className="text-gray-600 font-medium">Use the Visual Studio to tweak colors, spacing, and layout without coding.</p>
               </div>

               {/* Step 3 */}
               <div className="relative z-10 flex flex-col items-center text-center group">
                  <div className="w-24 h-24 bg-[#DCFCE7] border-2 border-black rounded-2xl flex items-center justify-center mb-6 shadow-[8px_8px_0px_0px_black] group-hover:-translate-y-2 transition-transform delay-150">
                     <span className="font-display font-black text-4xl text-black">3</span>
                  </div>
                  <h3 className="text-2xl font-black uppercase mb-2">Export It</h3>
                  <p className="text-gray-600 font-medium">Download production-ready React + Tailwind code. Ready to ship.</p>
               </div>
            </div>
         </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-24 px-6 bg-[#FDFBD4] border-b-2 border-black">
         <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
               
               {/* Feature 1 */}
               <div className="bg-[#FF6B4A] border-2 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_black] text-white">
                  <div className="bg-white/20 w-fit p-3 rounded-xl border-2 border-black mb-6">
                     <Smartphone size={32} className="text-white" />
                  </div>
                  <h3 className="text-3xl font-display font-black uppercase mb-4">Real Mobile Preview</h3>
                  <p className="font-medium text-white/90 text-lg">
                     See your designs instantly on a simulated mobile device. Interact, scroll, and test UX patterns in real-time.
                  </p>
               </div>

               {/* Feature 2 */}
               <div className="bg-white border-2 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_black]">
                  <div className="bg-gray-100 w-fit p-3 rounded-xl border-2 border-black mb-6">
                     <MousePointer2 size={32} className="text-black" />
                  </div>
                  <h3 className="text-3xl font-display font-black uppercase mb-4">Visual Studio Mode</h3>
                  <p className="font-medium text-gray-600 text-lg">
                     Click any element to edit it. Change text, colors, and padding using a Figma-like inspector. No CSS knowledge required.
                  </p>
               </div>

               {/* Feature 3 */}
               <div className="bg-white border-2 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_black]">
                  <div className="bg-gray-100 w-fit p-3 rounded-xl border-2 border-black mb-6">
                     <Code size={32} className="text-black" />
                  </div>
                  <h3 className="text-3xl font-display font-black uppercase mb-4">Clean Code Export</h3>
                  <p className="font-medium text-gray-600 text-lg">
                     We don't generate spaghetti code. Get semantic HTML and standard Tailwind classes that developers actually love.
                  </p>
               </div>

               {/* Feature 4 */}
               <div className="bg-[#60A5FA] border-2 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_black] text-white">
                  <div className="bg-white/20 w-fit p-3 rounded-xl border-2 border-black mb-6">
                     <Layers size={32} className="text-white" />
                  </div>
                  <h3 className="text-3xl font-display font-black uppercase mb-4">Multi-Screen Flows</h3>
                  <p className="font-medium text-white/90 text-lg">
                     Don't just build one screen. Build the whole app. Link screens together and visualize the user journey.
                  </p>
               </div>

            </div>
         </div>
      </section>

      {/* USE CASES SHOWCASE */}
      <section className="py-24 px-6 bg-white border-b-2 border-black">
         <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
               <div className="inline-block bg-[#E0F2FE] text-black border-2 border-black px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest mb-4">Endless Possibilities</div>
               <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight">What will you build?</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {/* Use Case 1 */}
               <div className="group relative bg-[#F9FAFB] rounded-2xl border-2 border-black overflow-hidden hover:shadow-[6px_6px_0px_0px_black] transition-all">
                  <div className="h-48 bg-[#FFEDD5] flex items-center justify-center border-b-2 border-black relative overflow-hidden">
                     <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                     <Smartphone size={64} className="text-orange-500 transform group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="p-6">
                     <h3 className="text-xl font-black uppercase mb-2">E-Commerce</h3>
                     <p className="text-gray-600 text-sm font-medium">Product pages, carts, and checkout flows. Optimized for conversion.</p>
                  </div>
               </div>

               {/* Use Case 2 */}
               <div className="group relative bg-[#F9FAFB] rounded-2xl border-2 border-black overflow-hidden hover:shadow-[6px_6px_0px_0px_black] transition-all">
                  <div className="h-48 bg-[#E0E7FF] flex items-center justify-center border-b-2 border-black relative overflow-hidden">
                     <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                     <Monitor size={64} className="text-indigo-500 transform group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="p-6">
                     <h3 className="text-xl font-black uppercase mb-2">Dashboards</h3>
                     <p className="text-gray-600 text-sm font-medium">Data visualization, analytics panels, and admin tools with clean charts.</p>
                  </div>
               </div>

               {/* Use Case 3 */}
               <div className="group relative bg-[#F9FAFB] rounded-2xl border-2 border-black overflow-hidden hover:shadow-[6px_6px_0px_0px_black] transition-all">
                  <div className="h-48 bg-[#DCFCE7] flex items-center justify-center border-b-2 border-black relative overflow-hidden">
                     <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                     <Globe size={64} className="text-green-500 transform group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="p-6">
                     <h3 className="text-xl font-black uppercase mb-2">Social Apps</h3>
                     <p className="text-gray-600 text-sm font-medium">Feeds, profiles, and messaging interfaces that feel fast and native.</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-24 px-6 bg-[#E0F2FE] border-b-2 border-black">
         <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
               <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight mb-4">Stop Wasting Time</h2>
               <p className="text-xl text-gray-600 font-medium">Why designers are switching to Maxi Design.</p>
            </div>

            <div className="bg-white rounded-3xl border-2 border-black shadow-[8px_8px_0px_0px_black] overflow-hidden">
               <div className="grid grid-cols-3 text-center border-b-2 border-black bg-gray-50">
                  <div className="p-6 font-black uppercase tracking-widest text-xs text-gray-400">Feature</div>
                  <div className="p-6 font-black uppercase tracking-widest text-xs text-gray-500">The Old Way</div>
                  <div className="p-6 font-black uppercase tracking-widest text-xs text-[#FF6B4A] bg-[#FFF7ED]">Maxi Design</div>
               </div>

               {[
                  { label: "Time to First Draft", old: "2-4 Hours", new: "30 Seconds" },
                  { label: "Code Handoff", old: "Manual Translation", new: "Auto-Generated" },
                  { label: "Cost", old: "$100/hr Freelancer", new: "Fraction of a cent" },
                  { label: "Mobile Responsive", old: "Manual Tweaking", new: "Built-in" },
                  { label: "Iterations", old: "Days of feedback", new: "Instant Chat" },
               ].map((row, i) => (
                  <div key={i} className="grid grid-cols-3 text-center border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                     <div className="p-6 font-bold text-sm text-gray-700 flex items-center justify-center border-r border-gray-100">{row.label}</div>
                     <div className="p-6 font-medium text-sm text-gray-500 border-r border-gray-100">{row.old}</div>
                     <div className="p-6 font-bold text-sm text-black bg-[#FFF7ED]">{row.new}</div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 px-6 bg-[#FDFBD4]">
         <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
               <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight mb-4">Common Questions</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
               {[
                  { q: "Is it free to join?", a: "Yes! Joining the waitlist is completely free. We will announce pricing plans when we launch the beta." },
                  { q: "Do I need to know how to code?", a: "Not at all. Maxi Design writes the code for you. If you are a developer, you can export the code to speed up your workflow." },
                  { q: "What tech stack is used?", a: "We export standard React components styled with Tailwind CSS. It's clean, semantic, and production-ready." },
                  { q: "Can I use my own API key?", a: "Yes. For power users, you can input your own Google Gemini API key to have full control over your usage limits." },
                  { q: "When will I get access?", a: "We are rolling out access in batches every week to ensure stability. Sign up now to secure your spot in line." },
                  { q: "Can I build complex apps?", a: "You can build multi-screen flows and complex UI layouts. Backend logic needs to be connected separately." },
               ].map((item, i) => (
                  <div key={i} className="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_black]">
                     <h3 className="font-black text-lg mb-2 flex items-start gap-2">
                        <span className="text-[#FF6B4A]">Q.</span> {item.q}
                     </h3>
                     <p className="text-gray-600 text-sm font-medium leading-relaxed pl-6">
                        {item.a}
                     </p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* FINAL CTA */}
      <section id="join" className="py-24 px-6 bg-black text-[#FDFBD4]">
         <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight mb-8">
               Ready to build <br/> the future?
            </h2>
            <p className="text-xl text-[#FDFBD4]/70 mb-12 max-w-xl">
               Join the waitlist today and get priority access to the platform when we open the doors.
            </p>
            <WaitlistForm className="max-w-lg mx-auto" />
         </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#FDFBD4] border-t-2 border-black py-12 px-6">
         <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 opacity-50">
               <div className="w-6 h-6 bg-black rounded flex items-center justify-center text-white font-bold text-xs">M</div>
               <span className="font-bold text-sm">Maxi Design AI</span>
            </div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
               © 2025 All Rights Reserved
            </div>
         </div>
      </footer>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default WaitlistPage;
