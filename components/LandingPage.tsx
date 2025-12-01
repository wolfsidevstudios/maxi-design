
import React, { useState, useRef } from 'react';
import { Sparkles, ImageIcon, ArrowUp, Smartphone, Trash2, Zap, Palette, Code, ChevronDown, Layers, Cpu, Globe, X } from './Icons';
import { ProjectData } from '../types';

interface LandingPageProps {
  view: 'create' | 'projects';
  onStartProject: (initialPrompt: string, referenceImage?: string) => void;
  projects: ProjectData[];
  onLoadProject: (project: ProjectData) => void;
  onDeleteProject: (projectId: string) => void;
  onNavigate: (page: 'privacy' | 'terms') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ view, onStartProject, projects, onLoadProject, onDeleteProject, onNavigate }) => {
  const [prompt, setPrompt] = useState('');
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const suggestions = [
    { icon: "⚡", label: "Health Tracker" },
    { icon: "🌤️", label: "Weather Forecast" },
    { icon: "🐶", label: "Pet Manager" },
    { icon: "⏱️", label: "Stopwatch & Timer" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onStartProject(prompt, referenceImage || undefined);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReferenceImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const scrollToFeatures = () => {
    document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-[#FDFBD4] text-black font-sans selection:bg-[#FF6B4A] selection:text-white">
      
      {/* VIEW: CREATE NEW (HOME) */}
      {view === 'create' && (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center">
          
          {/* HERO SECTION */}
          <div className="min-h-screen flex flex-col items-center justify-center w-full max-w-5xl px-6 relative pt-20">
            {/* Neo-Brutalist Header */}
            <div className="text-center mb-12 space-y-4">
              <div className="inline-block bg-[#FF6B4A] border-2 border-black px-4 py-1 rounded-full mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:rotate-2 transition-transform cursor-default">
                 <span className="font-bold text-white uppercase tracking-wider text-xs">Beta v3.0</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-display font-black text-black tracking-tighter leading-[0.9]">
                DESIGN APPS<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B4A] to-[#FF8F75] stroke-black" style={{ WebkitTextStroke: '2px black' }}>
                  IN SECONDS
                </span>
              </h1>
              <p className="text-xl md:text-2xl font-medium text-black max-w-2xl mx-auto mt-8 bg-white border-2 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] -rotate-1">
                Describe your idea. We generate the code. 
                <span className="font-bold text-[#FF6B4A]"> No design skills needed.</span>
              </p>
            </div>

            {/* Neo-Brutalist Input Section */}
            <div className="w-full max-w-2xl relative z-10 mb-16">
              <form onSubmit={handleSubmit} className="relative group">
                <div className="relative bg-white border-2 border-black rounded-[2.5rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 focus-within:translate-x-[2px] focus-within:translate-y-[2px] focus-within:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col p-2 min-h-[160px]">
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="I want to design an app that..."
                      className="w-full bg-transparent px-8 py-6 text-xl font-medium text-black placeholder-gray-400 outline-none resize-none pb-20 rounded-[2rem]"
                      style={{ lineHeight: '1.5' }}
                    />
                    
                    {/* Image Preview */}
                    {referenceImage && (
                      <div className="absolute bottom-6 left-32 md:left-40">
                         <div className="relative group/preview">
                            <img src={referenceImage} alt="Ref" className="w-12 h-12 rounded-lg border-2 border-black object-cover" />
                            <button 
                              type="button" 
                              onClick={() => setReferenceImage(null)}
                              className="absolute -top-2 -right-2 bg-red-500 border border-black text-white rounded-full p-0.5 hover:scale-110 transition-transform"
                            >
                              <X size={12} />
                            </button>
                         </div>
                      </div>
                    )}

                    {/* Reference Button - Bottom Left */}
                    <div className="absolute bottom-6 left-8">
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                        <button 
                          type="button" 
                          onClick={() => fileInputRef.current?.click()}
                          className={`text-sm font-bold border-2 border-black px-4 py-2 rounded-full flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all ${referenceImage ? 'bg-[#A3E635] text-black' : 'bg-gray-100 text-black hover:bg-gray-200'}`}
                        >
                          <ImageIcon size={18} /> {referenceImage ? 'Added' : 'Reference'}
                        </button>
                    </div>
                    
                    {/* Send Button - Bottom Right */}
                    <div className="absolute bottom-6 right-6">
                       <button 
                        type="submit" 
                        disabled={!prompt.trim()}
                        className="bg-[#FF6B4A] hover:bg-[#FF5530] text-white border-2 border-black w-12 h-12 rounded-full flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                      >
                        <ArrowUp size={24} strokeWidth={3} />
                      </button>
                    </div>
                </div>
              </form>

              {/* Suggestions */}
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => onStartProject(s.label)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-black rounded-lg text-sm font-bold text-black hover:bg-[#60A5FA] hover:text-white transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]"
                  >
                    <span className="text-base">{s.icon}</span>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 animate-bounce cursor-pointer" onClick={scrollToFeatures}>
               <ChevronDown size={40} strokeWidth={3} />
            </div>
          </div>

          {/* FEATURES SECTION */}
          <div id="features-section" className="w-full bg-white border-y-2 border-black py-24">
             <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col items-center mb-16 space-y-4">
                  <div className="bg-[#A3E635] border-2 border-black px-4 py-1 rounded font-bold uppercase tracking-widest text-xs shadow-[4px_4px_0px_0px_black]">
                    Powerful Features
                  </div>
                  <h2 className="text-4xl md:text-5xl font-display font-black text-center text-black uppercase tracking-tight">
                    Everything you need to <br/> build <span className="underline decoration-4 decoration-[#FF6B4A]">faster</span>
                  </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                   {/* Card 1 */}
                   <div className="bg-[#FDFBD4] border-2 border-black p-8 rounded-2xl shadow-[8px_8px_0px_0px_black] hover:shadow-[4px_4px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] transition-all group">
                      <div className="w-14 h-14 bg-[#FF6B4A] border-2 border-black rounded-xl flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_black] group-hover:rotate-6 transition-transform">
                         <Sparkles size={28} className="text-white" strokeWidth={2.5} />
                      </div>
                      <h3 className="text-2xl font-black mb-3 uppercase tracking-tight">Generative UI</h3>
                      <p className="font-medium text-gray-700 leading-relaxed">
                        Powered by Gemini 3.0 Pro. Describe any interface in natural language and watch it appear in seconds.
                      </p>
                   </div>

                   {/* Card 2 */}
                   <div className="bg-[#E0F2FE] border-2 border-black p-8 rounded-2xl shadow-[8px_8px_0px_0px_black] hover:shadow-[4px_4px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] transition-all group">
                      <div className="w-14 h-14 bg-[#60A5FA] border-2 border-black rounded-xl flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_black] group-hover:-rotate-6 transition-transform">
                         <Code size={28} className="text-white" strokeWidth={2.5} />
                      </div>
                      <h3 className="text-2xl font-black mb-3 uppercase tracking-tight">Clean Code</h3>
                      <p className="font-medium text-gray-700 leading-relaxed">
                        Export production-ready HTML & Tailwind CSS. No spaghetti code, just clean, semantic markup.
                      </p>
                   </div>

                   {/* Card 3 */}
                   <div className="bg-[#F3E8FF] border-2 border-black p-8 rounded-2xl shadow-[8px_8px_0px_0px_black] hover:shadow-[4px_4px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] transition-all group">
                      <div className="w-14 h-14 bg-[#C084FC] border-2 border-black rounded-xl flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_black] group-hover:scale-110 transition-transform">
                         <Palette size={28} className="text-white" strokeWidth={2.5} />
                      </div>
                      <h3 className="text-2xl font-black mb-3 uppercase tracking-tight">Smart Theming</h3>
                      <p className="font-medium text-gray-700 leading-relaxed">
                        Switch fonts, colors, and styles instantly with our intelligent design system controls.
                      </p>
                   </div>
                   
                   {/* Card 4 */}
                   <div className="bg-[#FFEDD5] border-2 border-black p-8 rounded-2xl shadow-[8px_8px_0px_0px_black] hover:shadow-[4px_4px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] transition-all group md:col-span-2">
                       <div className="flex flex-col md:flex-row gap-6 items-start">
                         <div>
                            <div className="w-14 h-14 bg-[#FB923C] border-2 border-black rounded-xl flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_black] group-hover:translate-x-2 transition-transform">
                               <Zap size={28} className="text-white" strokeWidth={2.5} />
                            </div>
                            <h3 className="text-2xl font-black mb-3 uppercase tracking-tight">Race Mode</h3>
                            <p className="font-medium text-gray-700 leading-relaxed">
                              Not sure which model to use? Run two AI models side-by-side in real-time and pick the winner.
                            </p>
                         </div>
                         <div className="hidden md:flex flex-1 items-center justify-center h-full bg-white/50 border-2 border-black rounded-xl p-4 w-full">
                            <div className="flex gap-2">
                               <div className="w-16 h-24 bg-white border-2 border-black rounded-lg shadow-sm"></div>
                               <div className="w-16 h-24 bg-white border-2 border-black rounded-lg shadow-sm"></div>
                            </div>
                         </div>
                       </div>
                   </div>

                   {/* Card 5 */}
                   <div className="bg-[#DCFCE7] border-2 border-black p-8 rounded-2xl shadow-[8px_8px_0px_0px_black] hover:shadow-[4px_4px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] transition-all group">
                      <div className="w-14 h-14 bg-[#4ADE80] border-2 border-black rounded-xl flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_black] group-hover:rotate-180 transition-transform duration-500">
                         <Layers size={28} className="text-white" strokeWidth={2.5} />
                      </div>
                      <h3 className="text-2xl font-black mb-3 uppercase tracking-tight">Iterations</h3>
                      <p className="font-medium text-gray-700 leading-relaxed">
                        Refine your design with natural language. "Make the button bigger", "Dark mode", "Add a footer".
                      </p>
                   </div>
                </div>
             </div>
          </div>

          {/* HOW IT WORKS SECTION */}
          <div id="how-it-works-section" className="w-full py-24 px-6 max-w-6xl mx-auto">
             <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-display font-black text-black uppercase tracking-tight mb-4">
                   From Idea to App
                </h2>
                <p className="text-xl font-medium text-gray-600">Three simple steps to your next project.</p>
             </div>

             <div className="grid md:grid-cols-3 gap-8 relative">
                {/* Connector Line (Desktop) */}
                <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-2 bg-black/5 -z-10 rounded-full border border-black/5"></div>

                {/* Step 1 */}
                <div className="flex flex-col items-center text-center group">
                   <div className="w-24 h-24 bg-white border-2 border-black rounded-full flex items-center justify-center text-4xl font-black mb-8 shadow-[4px_4px_0px_0px_black] group-hover:scale-110 transition-transform z-10 relative">
                      <span className="text-[#FF6B4A]">1</span>
                      <div className="absolute -bottom-2 -right-2 bg-[#FF6B4A] text-white text-xs font-bold px-2 py-1 rounded border border-black rotate-12">PROMPT</div>
                   </div>
                   <h3 className="text-2xl font-black mb-3 uppercase">Describe It</h3>
                   <p className="font-medium text-gray-600 max-w-xs">Enter a prompt describing your app's purpose and style. Be as specific or vague as you like.</p>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center text-center group">
                   <div className="w-24 h-24 bg-white border-2 border-black rounded-full flex items-center justify-center text-4xl font-black mb-8 shadow-[4px_4px_0px_0px_black] group-hover:scale-110 transition-transform z-10 relative">
                      <span className="text-[#A3E635]">2</span>
                      <div className="absolute -bottom-2 -right-2 bg-[#A3E635] text-black text-xs font-bold px-2 py-1 rounded border border-black -rotate-6">GENERATE</div>
                   </div>
                   <h3 className="text-2xl font-black mb-3 uppercase">Customize It</h3>
                   <p className="font-medium text-gray-600 max-w-xs">Watch the AI build it. Tweak colors, fonts, and layout using the theme editor or chat.</p>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center text-center group">
                   <div className="w-24 h-24 bg-white border-2 border-black rounded-full flex items-center justify-center text-4xl font-black mb-8 shadow-[4px_4px_0px_0px_black] group-hover:scale-110 transition-transform z-10 relative">
                      <span className="text-[#60A5FA]">3</span>
                      <div className="absolute -bottom-2 -right-2 bg-[#60A5FA] text-white text-xs font-bold px-2 py-1 rounded border border-black rotate-3">SHIP IT</div>
                   </div>
                   <h3 className="text-2xl font-black mb-3 uppercase">Export It</h3>
                   <p className="font-medium text-gray-600 max-w-xs">Copy the clean HTML/CSS code and drop it directly into your project.</p>
                </div>
             </div>
          </div>

          {/* FOOTER */}
          <div className="w-full bg-black text-[#FDFBD4] py-16 border-t-2 border-black">
             <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-2">
                   <div className="w-10 h-10 bg-[#FF6B4A] border-2 border-[#FDFBD4] flex items-center justify-center text-black font-black text-xl rounded-lg">M</div>
                   <span className="font-bold text-2xl tracking-tight">Maxi Design</span>
                </div>
                <div className="flex gap-6 text-sm font-bold uppercase tracking-widest text-[#FDFBD4]/60">
                   <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">Privacy</button>
                   <button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">Terms</button>
                   <button onClick={() => window.open('mailto:hello@maxidesign.ai')} className="hover:text-white transition-colors">Contact</button>
                </div>
                <div className="text-sm font-medium text-[#FDFBD4]/40">
                   © 2024 Maxi Design AI
                </div>
             </div>
          </div>

        </div>
      )}

      {/* VIEW: PROJECTS */}
      {view === 'projects' && (
        <div className="w-full max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 pt-32 px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-black text-black uppercase tracking-tight flex items-center gap-3">
              <span className="w-6 h-6 bg-[#A3E635] border-2 border-black shadow-[2px_2px_0px_0px_black]"></span>
              My Projects
            </h2>
            <div className="bg-white border-2 border-black px-4 py-2 rounded-lg font-bold shadow-[2px_2px_0px_0px_black]">
              {projects.length} {projects.length === 1 ? 'Project' : 'Projects'}
            </div>
          </div>
          
          {projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 border-4 border-black border-dashed rounded-3xl bg-white/50">
               <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 border-2 border-black">
                  <Smartphone size={40} className="text-gray-400" />
               </div>
               <h3 className="text-xl font-bold text-black mb-2">No projects yet</h3>
               <p className="text-gray-500 mb-6">Create your first design to get started</p>
               <button onClick={() => window.location.reload()} className="text-sm font-bold text-[#FF6B4A] hover:underline">
                  Go to Create
               </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div 
                  key={project.id}
                  className="relative bg-white border-2 border-black rounded-xl p-5 shadow-[4px_4px_0px_0px_black] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_black] transition-all flex flex-col justify-between group h-64"
                >
                  <div 
                    className="flex-1 cursor-pointer"
                    onClick={() => onLoadProject(project)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-[#A3E635] border-2 border-black rounded-lg flex items-center justify-center text-black shadow-[2px_2px_0px_0px_black]">
                        <Smartphone size={24} strokeWidth={2.5} />
                      </div>
                      <div className="text-[10px] font-bold bg-black text-white px-2 py-1 rounded border border-black">
                        {project.screens ? project.screens.length : 1} Screens
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-black text-black leading-tight line-clamp-2 mb-2">
                      {project.name.length > 40 ? project.name.substring(0, 40) + '...' : project.name}
                    </h3>
                    
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      Last edited {formatDate(project.lastEdited)}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t-2 border-gray-100 flex justify-between items-center">
                    <div className="flex gap-2">
                      <div className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-[10px] font-bold uppercase text-gray-500">
                        {project.theme.mode}
                      </div>
                      <div className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-[10px] font-bold uppercase text-gray-500">
                        {project.theme.fontBody}
                      </div>
                    </div>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if(window.confirm('Delete this project?')) onDeleteProject(project.id);
                      }}
                      className="p-2 hover:bg-red-100 text-black border-2 border-transparent hover:border-black rounded-lg transition-all"
                      title="Delete Project"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default LandingPage;
