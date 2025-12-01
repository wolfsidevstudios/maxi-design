import React, { useState } from 'react';
import { Sparkles, ImageIcon, ArrowUp, Play, Share, Smartphone, Trash2 } from './Icons';
import { ProjectData } from '../types';

interface LandingPageProps {
  view: 'create' | 'projects';
  onStartProject: (initialPrompt: string) => void;
  projects: ProjectData[];
  onLoadProject: (project: ProjectData) => void;
  onDeleteProject: (projectId: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ view, onStartProject, projects, onLoadProject, onDeleteProject }) => {
  const [prompt, setPrompt] = useState('');

  const suggestions = [
    { icon: "⚡", label: "Health Tracker" },
    { icon: "🌤️", label: "Weather Forecast" },
    { icon: "🐶", label: "Pet Manager" },
    { icon: "⏱️", label: "Stopwatch & Timer" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onStartProject(prompt);
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

  return (
    <div className="min-h-screen flex flex-col items-center p-6 w-full bg-[#FDFBD4] text-black font-sans selection:bg-[#FF6B4A] selection:text-white pt-32">
      
      {/* VIEW: CREATE NEW */}
      {view === 'create' && (
        <div className="flex flex-col items-center justify-center flex-1 w-full max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Neo-Brutalist Header */}
          <div className="text-center mb-12 space-y-4">
            <div className="inline-block bg-[#FF6B4A] border-2 border-black px-4 py-1 rounded-full mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
               <span className="font-bold text-white uppercase tracking-wider text-xs">Beta v3.0</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-display font-black text-black tracking-tight leading-none">
              DESIGN APPS<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B4A] to-[#FF8F75] stroke-black" style={{ WebkitTextStroke: '2px black' }}>
                IN SECONDS
              </span>
            </h1>
            <p className="text-xl font-medium text-black max-w-2xl mx-auto mt-6 bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1">
              Describe your idea. We generate the code. 
              <span className="font-bold"> No design skills needed.</span>
            </p>
          </div>

          {/* Neo-Brutalist Input Section */}
          <div className="w-full max-w-2xl relative z-10">
            <form onSubmit={handleSubmit} className="relative group">
              <div className="relative bg-white border-2 border-black rounded-[2.5rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 focus-within:translate-x-[2px] focus-within:translate-y-[2px] focus-within:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col p-2 min-h-[160px]">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="I want to design an app that..."
                    className="w-full bg-transparent px-8 py-6 text-xl font-medium text-black placeholder-gray-500 outline-none resize-none pb-20 rounded-[2rem]"
                    style={{ lineHeight: '1.5' }}
                  />
                  
                  {/* Reference Button - Bottom Left */}
                  <div className="absolute bottom-6 left-8">
                      <button type="button" className="text-sm font-bold text-black border-2 border-black bg-[#A3E635] hover:bg-[#8CD321] px-4 py-2 rounded-full flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all">
                        <ImageIcon size={18} /> Reference
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
          </div>

          {/* Neo-Brutalist Suggestions */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => onStartProject(s.label)}
                className="flex items-center gap-2 px-5 py-3 bg-white border-2 border-black rounded-lg text-sm font-bold text-black hover:bg-[#60A5FA] hover:text-white transition-all cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
              >
                <span className="text-lg">{s.icon}</span>
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: PROJECTS */}
      {view === 'projects' && (
        <div className="w-full max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
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
            <div className="flex flex-col items-center justify-center py-20 border-4 border-black border-dashed rounded-3xl bg-white/50">
               <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 border-2 border-black">
                  <Smartphone size={40} className="text-gray-400" />
               </div>
               <h3 className="text-xl font-bold text-black mb-2">No projects yet</h3>
               <p className="text-gray-500 mb-6">Create your first design to get started</p>
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
                        v{project.messages.filter(m => m.role === 'model').length}
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