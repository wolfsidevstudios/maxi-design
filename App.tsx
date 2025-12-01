import React, { useState, useRef, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import MobileFrame from './components/MobileFrame';
import ThemeEditor from './components/ThemeEditor';
import SettingsModal from './components/SettingsModal';
import Navbar from './components/Navbar';
import { 
  createChatSession, 
  streamResponse 
} from './services/geminiService';
import { 
  MessageSquare, 
  Palette, 
  ArrowLeft, 
  Sun, 
  Share, 
  Play, 
  Send, 
  Loader2, 
  Smartphone,
  CheckCircle2,
  CircleDashed,
  MoreHorizontal,
  ZoomIn,
  ZoomOut,
  Hand,
  MousePointer2,
  Undo2,
  Redo2,
  Code,
  Sparkles,
  Settings,
  Trophy,
  Swords,
  BrainCircuit,
  Zap
} from './components/Icons';
import { Message, ThemeSettings, ViewMode, ProjectData, AppSettings } from './types';
import { Chat } from '@google/genai';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('landing');
  const [landingTab, setLandingTab] = useState<'create' | 'projects'>('create');
  const [activeTab, setActiveTab] = useState<'chat' | 'theme'>('chat');
  
  // Settings & Modal
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<AppSettings>({
    activeModel: 'gemini-3-pro-preview',
    raceModel: 'gemini-2.5-flash'
  });

  // Projects State
  const [projects, setProjects] = useState<ProjectData[]>(() => {
    try {
      const saved = localStorage.getItem('sleek_projects');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load projects", e);
      return [];
    }
  });
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);

  // Chat State (Main)
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [designPhase, setDesignPhase] = useState<'idle' | 'theming' | 'coding'>('idle');
  
  // Chat State (Race Challenger)
  const [isRaceMode, setIsRaceMode] = useState(false);
  const [challengerMessages, setChallengerMessages] = useState<Message[]>([]);
  const [challengerHtmlCode, setChallengerHtmlCode] = useState('');
  const [challengerDesignPhase, setChallengerDesignPhase] = useState<'idle' | 'theming' | 'coding'>('idle');

  // Refs
  const chatSessionRef = useRef<Chat | null>(null);
  const challengerSessionRef = useRef<Chat | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Design State (Main)
  const [htmlCode, setHtmlCode] = useState('');
  const [zoom, setZoom] = useState(0.7);
  const [theme, setTheme] = useState<ThemeSettings>({
    fontBody: 'Inter',
    fontHeading: 'Space Grotesk',
    radius: 12,
    mode: 'light',
    primaryColor: '#FF6B4A'
  });

  // Canvas Tools State
  const [activeTool, setActiveTool] = useState<'select' | 'pan'>('select');
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Status State
  const [statusSteps, setStatusSteps] = useState({
    analyzed: false,
    planned: false,
    generating: false
  });

  // Persistence
  useEffect(() => {
    localStorage.setItem('sleek_projects', JSON.stringify(projects));
  }, [projects]);

  // Auto-save
  useEffect(() => {
    if (currentProjectId && viewMode === 'editor') {
      setProjects(prev => prev.map(p => {
        if (p.id === currentProjectId) {
          return {
            ...p,
            messages,
            htmlCode,
            theme,
            settings, // Save project settings
            lastEdited: Date.now()
          };
        }
        return p;
      }));
    }
  }, [messages, htmlCode, theme, settings, currentProjectId, viewMode]);

  // Init Sessions
  useEffect(() => {
    if (viewMode === 'editor') {
      if (!chatSessionRef.current) {
        chatSessionRef.current = createChatSession(messages, settings.activeModel);
      }
      if (isRaceMode && !challengerSessionRef.current) {
        challengerSessionRef.current = createChatSession(challengerMessages, settings.raceModel);
      }
    }
  }, [viewMode, isRaceMode, settings.activeModel, settings.raceModel]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  const handleStartProject = (initialPrompt: string) => {
    const newId = Date.now().toString();
    const newProject: ProjectData = {
      id: newId,
      name: initialPrompt,
      lastEdited: Date.now(),
      messages: [],
      htmlCode: '',
      theme: {
        fontBody: 'Inter',
        fontHeading: 'Space Grotesk',
        radius: 12,
        mode: 'light',
        primaryColor: '#FF6B4A'
      },
      settings: settings // Start with current global settings
    };

    setProjects(prev => [newProject, ...prev]);
    setCurrentProjectId(newId);
    
    // Reset state
    setMessages([]);
    setChallengerMessages([]);
    setHtmlCode('');
    setChallengerHtmlCode('');
    setTheme(newProject.theme);
    setPanPosition({ x: 0, y: 0 });
    setZoom(0.6); // Slightly smaller for potentially split view
    setIsRaceMode(false); // Default to normal mode

    chatSessionRef.current = createChatSession([], settings.activeModel);

    setViewMode('editor');
    
    setTimeout(() => {
      handleSendMessageReal(initialPrompt);
    }, 500);
  };

  const handleLoadProject = (project: ProjectData) => {
    setCurrentProjectId(project.id);
    setMessages(project.messages);
    setHtmlCode(project.htmlCode);
    setTheme(project.theme);
    if (project.settings) setSettings(project.settings);
    
    setPanPosition({ x: 0, y: 0 });
    setZoom(0.7);
    setIsRaceMode(false); // Reset race mode on load

    chatSessionRef.current = createChatSession(project.messages, project.settings?.activeModel || settings.activeModel);

    setViewMode('editor');
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
    if (currentProjectId === projectId) {
      setCurrentProjectId(null);
    }
  };

  const handleSendMessageReal = async (content: string) => {
    if (!content.trim()) return;

    const timestamp = Date.now();
    const userMsg: Message = { id: timestamp.toString(), role: 'user', content, timestamp };
    
    setMessages(prev => [...prev, userMsg]);
    if (isRaceMode) {
      setChallengerMessages(prev => [...prev, userMsg]);
    }
    
    setInputValue('');
    setIsGenerating(true);
    setStatusSteps({ analyzed: false, planned: false, generating: false });

    // --- Helper to process stream ---
    const processStream = async (
      session: Chat, 
      setHtml: React.Dispatch<React.SetStateAction<string>>,
      setPhase: React.Dispatch<React.SetStateAction<'idle' | 'theming' | 'coding'>>,
      isMain: boolean
    ) => {
      let accumulatedText = '';
      const startTime = Date.now();
      const MIN_THEME_TIME = 2000;
      setPhase('theming');
      if (isMain) setStatusSteps(prev => ({ ...prev, analyzed: true }));

      try {
        await streamResponse(session, content, (chunk) => {
          accumulatedText += chunk;
          
          // Theme Config
          const themeMatch = accumulatedText.match(/<theme_config>([\s\S]*?)<\/theme_config>/);
          if (themeMatch && isMain) { // Only main model updates global theme for now to avoid conflict
             try {
                const themeJson = JSON.parse(themeMatch[1]);
                setTheme(prev => ({ ...prev, ...themeJson }));
                setStatusSteps(prev => ({ ...prev, planned: true }));
             } catch (e) {}
          }

          // HTML Code
          let cleanCode = accumulatedText.replace(/<theme_config>[\s\S]*?<\/theme_config>/, '').trim();
          if (cleanCode.includes('```html')) cleanCode = cleanCode.split('```html')[1];
          if (cleanCode.includes('```')) cleanCode = cleanCode.split('```')[0];

          const elapsed = Date.now() - startTime;
          if (elapsed > MIN_THEME_TIME) {
             setPhase('coding');
             if (isMain) setStatusSteps(prev => ({ ...prev, generating: true }));
             setHtml(cleanCode);
          } else {
             setTimeout(() => {
                setPhase('coding');
                if (isMain) setStatusSteps(prev => ({ ...prev, generating: true }));
                setHtml(cleanCode);
             }, MIN_THEME_TIME - elapsed);
          }
        });
      } catch (e) {
        console.error("Stream error", e);
      }
    };

    // --- Execute Streams ---
    const promises = [];
    
    // 1. Main Model
    if (chatSessionRef.current) {
      promises.push(
        processStream(chatSessionRef.current, setHtmlCode, setDesignPhase, true)
          .then(() => {
            setMessages(prev => [...prev, {
              id: (Date.now() + 1).toString(),
              role: 'model',
              content: isRaceMode ? `[${settings.activeModel}] I've generated my version.` : "I've updated the design.",
              timestamp: Date.now()
            }]);
          })
      );
    }

    // 2. Challenger Model (if Race Mode)
    if (isRaceMode) {
      // Ensure session exists
      if (!challengerSessionRef.current) {
        challengerSessionRef.current = createChatSession(challengerMessages, settings.raceModel);
      }
      
      promises.push(
        processStream(challengerSessionRef.current, setChallengerHtmlCode, setChallengerDesignPhase, false)
          .then(() => {
             // Silence challenger in main chat, or add a log? 
             // We'll just update its message history internally
             setChallengerMessages(prev => [...prev, {
                id: (Date.now() + 2).toString(),
                role: 'model',
                content: `[${settings.raceModel}] Design generated.`,
                timestamp: Date.now()
             }]);
          })
      );
    }

    await Promise.all(promises);
    setIsGenerating(false);
    setDesignPhase('idle');
    setChallengerDesignPhase('idle');
  };

  const handleWinRace = (winner: 'main' | 'challenger') => {
    if (winner === 'challenger') {
      // Challenger wins: Promote challenger code and history to main
      setHtmlCode(challengerHtmlCode);
      setMessages(challengerMessages);
      // Re-init main session with challenger history to continue from there
      chatSessionRef.current = createChatSession(challengerMessages, settings.activeModel);
    }
    // If main wins, we just keep going as is.
    
    setIsRaceMode(false);
    setChallengerHtmlCode('');
    setChallengerMessages([]);
    challengerSessionRef.current = null;
  };

  const toggleRaceMode = () => {
    const newState = !isRaceMode;
    setIsRaceMode(newState);
    if (newState) {
      // Start race: Copy current state to challenger
      setChallengerHtmlCode(htmlCode);
      setChallengerMessages([...messages]);
      setChallengerDesignPhase('idle');
      challengerSessionRef.current = createChatSession([...messages], settings.raceModel);
    } else {
      // Cancel race: Clear challenger
      setChallengerHtmlCode('');
      setChallengerMessages([]);
      challengerSessionRef.current = null;
    }
  };

  // Canvas Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (activeTool === 'pan') {
      setIsPanning(true);
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning && activeTool === 'pan') {
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      setPanPosition(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  if (viewMode === 'landing') {
    return (
      <div className="relative min-h-screen bg-[#FDFBD4]">
        {/* Floating Navbar */}
        <Navbar 
          activeTab={landingTab} 
          onTabChange={setLandingTab} 
          onOpenSettings={() => setShowSettings(true)} 
        />

        <LandingPage 
          view={landingTab}
          onStartProject={handleStartProject} 
          projects={projects}
          onLoadProject={handleLoadProject}
          onDeleteProject={handleDeleteProject}
        />
        
        {/* Settings Modal (Global in landing) */}
        {showSettings && (
          <SettingsModal 
            settings={settings} 
            onSave={(newSettings) => setSettings(newSettings)} 
            onClose={() => setShowSettings(false)} 
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#FDFBD4] font-sans">
      
      {/* Settings Modal (Editor Context) */}
      {showSettings && (
        <SettingsModal 
          settings={settings} 
          onSave={(newSettings) => {
            setSettings(newSettings);
            // If we change active model, re-init chat
            if (newSettings.activeModel !== settings.activeModel) {
               chatSessionRef.current = createChatSession(messages, newSettings.activeModel);
            }
          }} 
          onClose={() => setShowSettings(false)} 
        />
      )}

      {/* LEFT SIDEBAR */}
      <div className="w-[380px] flex flex-col border-r-2 border-black bg-white z-20 transition-all relative shadow-[4px_0px_0px_0px_rgba(0,0,0,0.05)]">
        
        {/* Header */}
        <div className="h-16 border-b-2 border-black flex items-center justify-between px-4 bg-white shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setViewMode('landing')} className="p-2 hover:bg-gray-100 rounded-lg text-black transition-colors border-2 border-transparent hover:border-black hover:shadow-[2px_2px_0px_0px_black]">
               <ArrowLeft size={18} strokeWidth={2.5} />
            </button>
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 bg-[#FF6B4A] border-2 border-black flex items-center justify-center text-white font-black text-sm shadow-[2px_2px_0px_0px_black] rounded-md">M</div>
               <span className="font-bold text-black tracking-tight text-lg">Maxi Design</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowSettings(true)}
              className="p-2 hover:bg-[#A3E635] rounded-lg text-black border-2 border-transparent hover:border-black hover:shadow-[2px_2px_0px_0px_black] transition-all"
            >
              <Settings size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center pt-4 pb-2 border-b-2 border-black bg-[#FDFCF8] shrink-0">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setActiveTab('chat')}
              className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 border-2 ${activeTab === 'chat' ? 'bg-[#FF6B4A] text-white border-black shadow-[2px_2px_0px_0px_black]' : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'}`}
            >
              <MessageSquare size={14} strokeWidth={2.5} /> Chat
            </button>
            <button 
               onClick={() => setActiveTab('theme')}
               className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 border-2 ${activeTab === 'theme' ? 'bg-[#A3E635] text-black border-black shadow-[2px_2px_0px_0px_black]' : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'}`}
            >
              <Palette size={14} strokeWidth={2.5} /> Theme
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto relative custom-scrollbar bg-white">
          {activeTab === 'theme' ? (
            <ThemeEditor theme={theme} setTheme={setTheme} />
          ) : (
            <div className="flex flex-col min-h-full p-4 gap-6 pb-28">
              
              {/* Race Mode Info Banner */}
              {isRaceMode && (
                <div className="bg-black text-white p-3 rounded-xl shadow-[4px_4px_0px_0px_rgba(255,107,74,1)] border-2 border-black flex items-center gap-3 animate-in slide-in-from-top-4">
                  <Swords size={20} className="text-[#A3E635]" />
                  <div>
                    <div className="text-xs font-bold text-[#A3E635] uppercase tracking-wider">Race Mode Active</div>
                    <div className="text-xs font-medium opacity-80">Generating two designs simultaneously.</div>
                  </div>
                </div>
              )}

              {/* Messages */}
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-2`}>
                  <div className={`w-8 h-8 rounded-lg border-2 border-black flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_0px_black] ${msg.role === 'user' ? 'bg-black text-white' : 'bg-[#FF6B4A] text-white'}`}>
                    {msg.role === 'user' ? 'U' : <Smartphone size={16} />}
                  </div>
                  <div className={`p-4 rounded-lg text-sm font-medium leading-relaxed max-w-[85%] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${msg.role === 'user' ? 'bg-white text-black' : 'bg-[#F0FDF4] text-black'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {/* Status Indicators */}
              {isGenerating && (
                <div className="flex flex-col gap-3 ml-11 p-4 bg-[#FDFBD4] rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                  <div className={`flex items-center gap-3 text-xs font-bold transition-all duration-500 ${statusSteps.analyzed ? 'text-green-600' : 'text-gray-400'}`}>
                     {statusSteps.analyzed ? <CheckCircle2 size={16} strokeWidth={3} /> : <CircleDashed size={16} className="animate-spin-slow" />} 
                     <span>ANALYZED REQUEST</span>
                  </div>
                   <div className={`flex items-center gap-3 text-xs font-bold transition-all duration-500 ${statusSteps.planned ? 'text-blue-600' : 'text-gray-400'}`}>
                     {statusSteps.planned ? <CheckCircle2 size={16} strokeWidth={3} /> : <CircleDashed size={16} className={statusSteps.analyzed ? "animate-spin-slow" : ""} />} 
                     <span>GENERATED THEME CONFIG</span>
                  </div>
                   <div className={`flex items-center gap-3 text-xs font-bold transition-all duration-500 ${statusSteps.generating ? 'text-[#FF6B4A]' : 'text-gray-400'}`}>
                     {statusSteps.generating ? <Loader2 size={16} className="animate-spin" strokeWidth={3} /> : <CircleDashed size={16} className={statusSteps.planned ? "animate-spin-slow" : ""} />} 
                     <span>CODING INTERFACE...</span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        {/* Floating Chat Input */}
        {activeTab === 'chat' && (
          <div className="p-4 bg-white/90 backdrop-blur-sm border-t-2 border-black absolute bottom-0 left-0 right-0 z-20">
             <div className="relative shadow-[4px_4px_0px_0px_black] rounded-xl border-2 border-black bg-white transition-all focus-within:translate-x-[2px] focus-within:translate-y-[2px] focus-within:shadow-[2px_2px_0px_0px_black]">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessageReal(inputValue);
                    }
                  }}
                  placeholder={isRaceMode ? "Describe changes for both models..." : "Describe your changes..."}
                  className="w-full bg-transparent pl-4 pr-12 py-3 text-sm font-medium text-black focus:outline-none focus:ring-0 resize-none h-14 flex items-center overflow-hidden rounded-xl"
                  style={{ minHeight: '56px', maxHeight: '56px' }}
                />
                <button 
                  onClick={() => handleSendMessageReal(inputValue)}
                  disabled={!inputValue.trim() || isGenerating}
                  className="absolute right-2 top-2 bottom-2 aspect-square bg-[#FF6B4A] text-white rounded-lg border-2 border-black hover:bg-[#FF5530] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center shadow-[2px_2px_0px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_black] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                >
                  {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} strokeWidth={2.5} />}
                </button>
             </div>
          </div>
        )}
      </div>

      {/* RIGHT CANVAS */}
      <div className="flex-1 relative flex flex-col bg-[#FDFBD4]">
        
        {/* Top Bar */}
        <div className="h-16 border-b-2 border-black flex items-center justify-between px-6 bg-white z-20 shrink-0">
          <div className="flex items-center gap-2 text-sm text-black font-bold uppercase tracking-wide">
            <span className="bg-[#A3E635] px-2 py-0.5 border-2 border-black rounded shadow-[2px_2px_0px_0px_black]">Project</span>
            <span className="text-black font-black">/</span>
            <span className="flex items-center gap-1 bg-white border-2 border-black px-2 py-0.5 rounded shadow-[2px_2px_0px_0px_black] text-xs">
              {isRaceMode ? 'Split View' : 'Single View'} <MoreHorizontal size={14} />
            </span>
          </div>
          
          <div className="flex items-center gap-3">
             {/* Race Toggle */}
             <button 
                onClick={toggleRaceMode}
                className={`flex items-center gap-2 px-4 py-2 border-2 border-black rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-[2px_2px_0px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_black] ${isRaceMode ? 'bg-black text-white' : 'bg-white hover:bg-gray-50 text-black'}`}
             >
               <Swords size={16} strokeWidth={2.5} /> {isRaceMode ? 'End Race' : 'Race Mode'}
             </button>

             <div className="w-px h-6 bg-gray-300 mx-1"></div>
             
             <button className="px-4 py-2 bg-[#FF6B4A] text-white border-2 border-black rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#FF5530] transition-all flex items-center gap-2 shadow-[2px_2px_0px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_black]">
               <Share size={14} strokeWidth={2.5} /> Export
             </button>
          </div>
        </div>

        {/* Canvas Area with Pan/Zoom */}
        <div 
           className={`flex-1 relative overflow-hidden flex items-center justify-center dot-pattern group ${activeTool === 'pan' ? (isPanning ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'}`}
           onMouseDown={handleMouseDown}
           onMouseMove={handleMouseMove}
           onMouseUp={handleMouseUp}
           onMouseLeave={handleMouseUp}
        >
          
          {/* Canvas Controls */}
          <div className="absolute bottom-8 z-50 flex items-center gap-2 bg-white p-2 rounded-xl shadow-[4px_4px_0px_0px_black] border-2 border-black transition-transform hover:scale-105">
             <button 
               onClick={() => setActiveTool('select')}
               className={`p-2 rounded-lg border-2 transition-all ${activeTool === 'select' ? 'bg-[#FF6B4A] text-white border-black shadow-[2px_2px_0px_0px_black]' : 'border-transparent text-gray-600 hover:bg-gray-100 hover:border-black'}`} 
               title="Select"
             >
                <MousePointer2 size={18} strokeWidth={2.5} />
             </button>
             <button 
               onClick={() => setActiveTool('pan')}
               className={`p-2 rounded-lg border-2 transition-all ${activeTool === 'pan' ? 'bg-[#FF6B4A] text-white border-black shadow-[2px_2px_0px_0px_black]' : 'border-transparent text-gray-600 hover:bg-gray-100 hover:border-black'}`} 
               title="Pan"
             >
                <Hand size={18} strokeWidth={2.5} />
             </button>
             <div className="w-0.5 h-6 bg-black mx-1"></div>
             <button className="p-2 hover:bg-gray-100 rounded-lg text-black transition-colors border-2 border-transparent hover:border-black" onClick={() => setZoom(z => Math.max(0.3, z - 0.1))}><ZoomOut size={18} strokeWidth={2.5} /></button>
             <span className="text-sm font-bold w-12 text-center text-black tabular-nums">{Math.round(zoom * 100)}%</span>
             <button className="p-2 hover:bg-gray-100 rounded-lg text-black transition-colors border-2 border-transparent hover:border-black" onClick={() => setZoom(z => Math.min(2.0, z + 0.1))}><ZoomIn size={18} strokeWidth={2.5} /></button>
          </div>

          {/* Frames Container */}
          <div 
            style={{ 
              transform: `translate(${panPosition.x}px, ${panPosition.y}px)`,
              transition: isPanning ? 'none' : 'transform 0.1s ease-out',
              display: 'flex',
              gap: '60px',
              alignItems: 'center'
            }}
          >
            {/* Main Model Frame */}
            <div className="relative flex flex-col items-center gap-4">
               {isRaceMode && (
                 <div className="bg-white px-4 py-2 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_black] text-sm font-black flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                      <BrainCircuit size={16} /> 
                      {settings.activeModel === 'gemini-3-pro-preview' ? 'Gemini 3.0 Pro' : settings.activeModel}
                    </div>
                    {isRaceMode && (
                      <button 
                        onClick={() => handleWinRace('main')}
                        className="bg-[#A3E635] hover:bg-[#8CD321] text-black text-xs px-3 py-1 rounded border border-black font-bold uppercase tracking-wider"
                      >
                        Select Winner
                      </button>
                    )}
                 </div>
               )}

               <MobileFrame 
                  htmlContent={htmlCode} 
                  scale={zoom} 
                  loadingPhase={designPhase}
               />
            </div>

            {/* Challenger Frame */}
            {isRaceMode && (
              <div className="relative flex flex-col items-center gap-4">
                 <div className="bg-white px-4 py-2 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_black] text-sm font-black flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                       <Zap size={16} className="text-[#FF6B4A]" /> 
                       {settings.raceModel === 'gemini-2.5-flash' ? 'Gemini 2.5 Flash' : settings.raceModel}
                    </div>
                    <button 
                      onClick={() => handleWinRace('challenger')}
                      className="bg-[#FF6B4A] hover:bg-[#FF5530] text-white text-xs px-3 py-1 rounded border border-black font-bold uppercase tracking-wider"
                    >
                      Select Winner
                    </button>
                 </div>

                 <MobileFrame 
                    htmlContent={challengerHtmlCode} 
                    scale={zoom} 
                    loadingPhase={challengerDesignPhase}
                 />
              </div>
            )}
            
          </div>
          
        </div>

      </div>
    </div>
  );
}

export default App;