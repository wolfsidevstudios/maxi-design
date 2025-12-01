
import React, { useState, useRef, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import MobileFrame from './components/MobileFrame';
import ThemeEditor from './components/ThemeEditor';
import SettingsModal from './components/SettingsModal';
import Navbar from './components/Navbar';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import NotificationSystem, { NotificationItem } from './components/Notification';
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
  Zap,
  Home,
  FileImage,
  StickyNote,
  PlusSquare,
  Monitor,
  Trash2,
  Download,
  Paperclip,
  X,
  MousePointerClick
} from './components/Icons';
import { Message, ThemeSettings, ViewMode, ProjectData, AppSettings, Screen } from './types';
import { Chat } from '@google/genai';
import JSZip from 'jszip';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('landing');
  const [landingTab, setLandingTab] = useState<'create' | 'projects'>('create');
  const [activeTab, setActiveTab] = useState<'chat' | 'theme' | 'screens'>('chat');
  
  // Settings & Modal
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem('sleek_settings');
      return saved ? JSON.parse(saved) : {
        activeModel: 'gemini-3-pro-preview',
        raceModel: 'gemini-2.5-flash',
        customApiKey: ''
      };
    } catch (e) {
      return {
        activeModel: 'gemini-3-pro-preview',
        raceModel: 'gemini-2.5-flash',
        customApiKey: ''
      };
    }
  });

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const addNotification = (type: 'error' | 'warning' | 'success' | 'info', title: string, message: string, actionLabel?: string, onAction?: () => void) => {
    const id = Date.now().toString() + Math.random().toString();
    setNotifications(prev => [...prev, {
      id, type, title, message, actionLabel, onAction, duration: type === 'error' ? 8000 : 5000
    }]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Persist Global Settings
  useEffect(() => {
    localStorage.setItem('sleek_settings', JSON.stringify(settings));
  }, [settings]);

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

  // Screen State
  const [screens, setScreens] = useState<Screen[]>([]);
  const [activeScreenId, setActiveScreenId] = useState<string | null>(null);

  // Chat State (Main)
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
  const [zoom, setZoom] = useState(0.7);
  const [theme, setTheme] = useState<ThemeSettings>({
    fontBody: 'Inter',
    fontHeading: 'Space Grotesk',
    radius: 12,
    mode: 'light',
    primaryColor: '#FF6B4A'
  });

  // Canvas Tools State
  const [activeTool, setActiveTool] = useState<'select' | 'pan' | 'edit'>('select');
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  
  // Edit Tool State
  const [selectedElement, setSelectedElement] = useState<{tagName: string, snippet: string, textContent: string} | null>(null);
  const [editInputValue, setEditInputValue] = useState('');

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
            screens,
            activeScreenId: activeScreenId || p.activeScreenId,
            theme,
            settings, // Save project settings
            lastEdited: Date.now()
          };
        }
        return p;
      }));
    }
  }, [messages, screens, activeScreenId, theme, settings, currentProjectId, viewMode]);

  // Init Sessions
  useEffect(() => {
    if (viewMode === 'editor') {
      try {
        if (!chatSessionRef.current) {
          chatSessionRef.current = createChatSession(messages, settings.activeModel, settings.customApiKey);
        }
        if (isRaceMode && !challengerSessionRef.current) {
          challengerSessionRef.current = createChatSession(challengerMessages, settings.raceModel, settings.customApiKey);
        }
      } catch (e: any) {
        // Handle init error (rare but possible if API key is malformed)
        addNotification('error', 'Initialization Error', 'Failed to initialize AI. Please check your API key.');
      }
    }
  }, [viewMode, isRaceMode, settings.activeModel, settings.raceModel, settings.customApiKey]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  // Listen for Element Clicks from Iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'ELEMENT_CLICKED') {
        setSelectedElement(event.data.payload);
        // Force focus to edit input
        setTimeout(() => document.getElementById('edit-input-pill')?.focus(), 100);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Clear selected element when tool changes
  useEffect(() => {
    if (activeTool !== 'edit') {
      setSelectedElement(null);
    }
  }, [activeTool]);

  // Active Screen HTML Accessor
  const getActiveScreenHtml = () => {
     return screens.find(s => s.id === activeScreenId)?.html || '';
  };
  
  const updateActiveScreenHtml = (html: string) => {
     setScreens(prev => prev.map(s => s.id === activeScreenId ? { ...s, html } : s));
  };

  const handleStartProject = (initialPrompt: string, referenceImage?: string) => {
    const newId = Date.now().toString();
    const initialScreen: Screen = {
      id: 'screen-1',
      name: 'Home',
      html: ''
    };
    
    // Initial message construction
    const initialMessages: Message[] = [];

    const newProject: ProjectData = {
      id: newId,
      name: initialPrompt,
      lastEdited: Date.now(),
      messages: initialMessages,
      screens: [initialScreen],
      activeScreenId: 'screen-1',
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
    setScreens([initialScreen]);
    setActiveScreenId('screen-1');
    
    // Reset state
    setMessages([]);
    setChallengerMessages([]);
    setChallengerHtmlCode('');
    setTheme(newProject.theme);
    setPanPosition({ x: 0, y: 0 });
    setZoom(0.6); // Slightly smaller for potentially split view
    setIsRaceMode(false); // Default to normal mode
    setAttachedImage(referenceImage || null);
    setSelectedElement(null);
    setActiveTool('select');

    // Initialize session
    chatSessionRef.current = createChatSession([], settings.activeModel, settings.customApiKey);

    setViewMode('editor');
    
    // Small delay to allow render, then trigger generation
    setTimeout(() => {
      handleSendMessageReal(initialPrompt, referenceImage || null);
    }, 500);
  };

  const handleLoadProject = (project: ProjectData) => {
    setCurrentProjectId(project.id);
    setMessages(project.messages);
    
    // Migration for old projects without screens
    if (!project.screens || project.screens.length === 0) {
       const legacyHtml = (project as any).htmlCode || '';
       const defaultScreen: Screen = { id: 'screen-1', name: 'Home', html: legacyHtml };
       setScreens([defaultScreen]);
       setActiveScreenId('screen-1');
    } else {
       setScreens(project.screens);
       setActiveScreenId(project.activeScreenId || project.screens[0].id);
    }
    
    setTheme(project.theme);
    if (project.settings) setSettings(project.settings);
    
    setPanPosition({ x: 0, y: 0 });
    setZoom(0.7);
    setIsRaceMode(false); // Reset race mode on load
    setSelectedElement(null);
    setActiveTool('select');

    chatSessionRef.current = createChatSession(
      project.messages, 
      project.settings?.activeModel || settings.activeModel, 
      project.settings?.customApiKey || settings.customApiKey
    );

    setViewMode('editor');
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
    if (currentProjectId === projectId) {
      setCurrentProjectId(null);
    }
  };

  const handleAddScreen = () => {
    const newId = `screen-${Date.now()}`;
    const newScreen: Screen = {
      id: newId,
      name: `Screen ${screens.length + 1}`,
      html: ''
    };
    setScreens(prev => [...prev, newScreen]);
    setActiveScreenId(newId);
  };

  const handleDeleteScreen = (screenId: string) => {
    if (screens.length <= 1) return; // Don't delete last screen
    
    const newScreens = screens.filter(s => s.id !== screenId);
    setScreens(newScreens);
    
    if (activeScreenId === screenId) {
      setActiveScreenId(newScreens[0].id);
    }
  };

  const handleExport = async () => {
    const zip = new JSZip();
    
    // Add all screens
    screens.forEach(screen => {
      const fileName = `${screen.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.html`;
      
      // Inject Tailwind CDN if missing (it's usually in MobileFrame logic, but good to be safe for standalone)
      let htmlContent = screen.html;
      if (!htmlContent.includes('<script src="https://cdn.tailwindcss.com">')) {
         const headEnd = htmlContent.indexOf('</head>');
         if (headEnd !== -1) {
            htmlContent = htmlContent.slice(0, headEnd) + '<script src="https://cdn.tailwindcss.com"></script>\n' + htmlContent.slice(headEnd);
         } else {
            // Fallback wrapping if incomplete HTML
            htmlContent = `<!DOCTYPE html><html><head><script src="https://cdn.tailwindcss.com"></script></head><body>${htmlContent}</body></html>`;
         }
      }
      
      zip.file(fileName, htmlContent);
    });

    // Add Theme Config
    zip.file("theme.json", JSON.stringify(theme, null, 2));

    const content = await zip.generateAsync({ type: "blob" });
    const url = window.URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = url;
    a.download = `maxi-design-project.zip`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAttachedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessageReal = async (content: string, overrideImage: string | null = null) => {
    if (!content.trim()) return;
    
    // Determine image to send
    const imageToSend = overrideImage || attachedImage;
    const attachments = imageToSend ? [{ type: 'image' as const, content: imageToSend, mimeType: 'image/jpeg' }] : undefined;

    const timestamp = Date.now();
    const userMsg: Message = { 
      id: timestamp.toString(), 
      role: 'user', 
      content: `${content} (For active screen: ${screens.find(s => s.id === activeScreenId)?.name})`, 
      timestamp,
      attachments
    };
    
    setMessages(prev => [...prev, userMsg]);
    if (isRaceMode) {
      setChallengerMessages(prev => [...prev, userMsg]);
    }
    
    setInputValue('');
    setEditInputValue(''); // Clear edit input
    setSelectedElement(null); // Clear selection
    setAttachedImage(null); // Clear attachment after sending
    setIsGenerating(true);
    setStatusSteps({ analyzed: false, planned: false, generating: false });

    // --- Helper to process stream ---
    const processStream = async (
      session: Chat, 
      setHtml: (html: string) => void,
      setPhase: React.Dispatch<React.SetStateAction<'idle' | 'theming' | 'coding'>>,
      isMain: boolean,
      modelName: string
    ) => {
      let accumulatedText = '';
      const startTime = Date.now();
      const MIN_THEME_TIME = 2000;
      setPhase('theming');
      if (isMain) setStatusSteps(prev => ({ ...prev, analyzed: true }));

      try {
        await streamResponse(session, userMsg.content, userMsg.attachments, (chunk) => {
          accumulatedText += chunk;
          
          // Theme Config
          const themeMatch = accumulatedText.match(/<theme_config>([\s\S]*?)<\/theme_config>/);
          if (themeMatch && isMain) { 
             try {
                const themeJson = JSON.parse(themeMatch[1]);
                setTheme(prev => ({ ...prev, ...themeJson }));
                setStatusSteps(prev => ({ ...prev, planned: true }));
             } catch (e) {}
          }

          // HTML Code Extraction (Robust Logic)
          let cleanCode = accumulatedText.replace(/<theme_config>[\s\S]*?<\/theme_config>/, '').trim();
          let extractedHtml = cleanCode;
          
          if (cleanCode.includes('```html')) {
             extractedHtml = cleanCode.split('```html')[1];
             if (extractedHtml.includes('```')) extractedHtml = extractedHtml.split('```')[0];
          } else if (cleanCode.includes('```')) {
             extractedHtml = cleanCode.split('```')[1];
             if (extractedHtml.includes('```')) extractedHtml = extractedHtml.split('```')[0];
          }
          
          extractedHtml = extractedHtml.trim();

          const elapsed = Date.now() - startTime;
          if (elapsed > MIN_THEME_TIME) {
             setPhase('coding');
             if (isMain) setStatusSteps(prev => ({ ...prev, generating: true }));
             if (extractedHtml) setHtml(extractedHtml);
          } else {
             setTimeout(() => {
                setPhase('coding');
                if (isMain) setStatusSteps(prev => ({ ...prev, generating: true }));
                if (extractedHtml) setHtml(extractedHtml);
             }, MIN_THEME_TIME - elapsed);
          }
        });
      } catch (e: any) {
        console.error("Stream error", e);
        const errorMsg = e.message || e.toString();
        
        // Handle specific API errors
        if (errorMsg.includes('429') || errorMsg.includes('quota') || errorMsg.includes('RESOURCE_EXHAUSTED')) {
          addNotification(
            'error',
            'Out of Credits',
            `You have exceeded the quota for ${modelName}. Please check your API usage or switch models.`,
            'Settings',
            () => setShowSettings(true)
          );
        } else if (errorMsg.includes('API key') || errorMsg.includes('403')) {
           addNotification(
            'error',
            'Authentication Failed',
            'Invalid API Key. Please update your key in settings.',
            'Settings',
            () => setShowSettings(true)
          );
        } else {
           addNotification(
            'error',
            'Generation Failed',
            `An error occurred with ${modelName}. Please try again.`
          );
        }
        
        setPhase('idle');
      }
    };

    // --- Execute Streams ---
    const promises = [];
    
    // 1. Main Model
    if (chatSessionRef.current) {
      // Wrapper for main model to update active screen
      const setMainHtml = (html: string) => {
        setScreens(prev => prev.map(s => s.id === activeScreenId ? { ...s, html } : s));
      };

      promises.push(
        processStream(chatSessionRef.current, setMainHtml, setDesignPhase, true, settings.activeModel)
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
      if (!challengerSessionRef.current) {
        challengerSessionRef.current = createChatSession(challengerMessages, settings.raceModel, settings.customApiKey);
      }
      
      promises.push(
        processStream(challengerSessionRef.current, setChallengerHtmlCode, setChallengerDesignPhase, false, settings.raceModel)
          .then(() => {
             setChallengerMessages(prev => [...prev, {
                id: (Date.now() + 2).toString(),
                role: 'model',
                content: `[${settings.raceModel}] Design generated.`,
                timestamp: Date.now()
             }]);
          })
      );
    }

    await Promise.allSettled(promises);
    setIsGenerating(false);
    setDesignPhase('idle');
    setChallengerDesignPhase('idle');
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editInputValue.trim()) return;

    let prompt = editInputValue;
    if (selectedElement) {
      prompt = `EDIT REQUEST: I have selected the following element: 
      
      Element Tag: <${selectedElement.tagName}>
      HTML Snippet: \`${selectedElement.snippet}\`
      
      User Request: ${editInputValue}
      
      Please modify the code to reflect this change specifically for this element or its container as appropriate.`;
    }

    handleSendMessageReal(prompt);
  };

  const handleWinRace = (winner: 'main' | 'challenger') => {
    if (winner === 'challenger') {
      // Challenger wins: Promote challenger code to ACTIVE SCREEN and history to main
      updateActiveScreenHtml(challengerHtmlCode);
      setMessages(challengerMessages);
      // Re-init main session with challenger history to continue from there
      chatSessionRef.current = createChatSession(challengerMessages, settings.activeModel, settings.customApiKey);
    }
    
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
      setChallengerHtmlCode(getActiveScreenHtml());
      setChallengerMessages([...messages]);
      setChallengerDesignPhase('idle');
      challengerSessionRef.current = createChatSession([...messages], settings.raceModel, settings.customApiKey);
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

  // RENDER: Privacy Policy
  if (viewMode === 'privacy') {
    return (
      <PrivacyPolicy onBack={() => setViewMode('landing')} />
    );
  }

  // RENDER: Terms of Service
  if (viewMode === 'terms') {
    return (
      <TermsOfService onBack={() => setViewMode('landing')} />
    );
  }

  // RENDER: Landing (Home)
  if (viewMode === 'landing') {
    return (
      <div className="relative min-h-screen bg-[#FDFBD4]">
        {/* Floating Navbar */}
        <Navbar 
          activeTab={landingTab} 
          onTabChange={setLandingTab} 
          onOpenSettings={() => setShowSettings(true)} 
        />

        <NotificationSystem notifications={notifications} onDismiss={removeNotification} />

        <LandingPage 
          view={landingTab}
          onStartProject={handleStartProject} 
          projects={projects}
          onLoadProject={handleLoadProject}
          onDeleteProject={handleDeleteProject}
          onNavigate={(page) => setViewMode(page)}
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

  // RENDER: Editor
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#FDFBD4] font-sans">
      
      {/* Global Notifications (Editor) */}
      <NotificationSystem notifications={notifications} onDismiss={removeNotification} />

      {/* Settings Modal (Editor Context) */}
      {showSettings && (
        <SettingsModal 
          settings={settings} 
          onSave={(newSettings) => {
            const prevSettings = settings;
            setSettings(newSettings);
            
            // Re-init main chat if model or API key changes
            if (newSettings.activeModel !== prevSettings.activeModel || newSettings.customApiKey !== prevSettings.customApiKey) {
               chatSessionRef.current = createChatSession(messages, newSettings.activeModel, newSettings.customApiKey);
            }

            // Re-init or create race chat if active
            if (isRaceMode) {
               if (newSettings.raceModel !== prevSettings.raceModel || newSettings.customApiKey !== prevSettings.customApiKey) {
                   challengerSessionRef.current = createChatSession(challengerMessages, newSettings.raceModel, newSettings.customApiKey);
               }
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
            <button 
               onClick={() => setViewMode('landing')} 
               className="p-2 hover:bg-gray-100 rounded-lg text-black transition-colors border-2 border-transparent hover:border-black hover:shadow-[2px_2px_0px_0px_black]"
               title="Back to Home"
            >
               <Home size={18} strokeWidth={2.5} />
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
        <div className="flex justify-center pt-4 pb-2 border-b-2 border-black bg-[#FDFCF8] shrink-0 overflow-x-auto">
          <div className="flex items-center gap-1 px-2">
            <button 
              onClick={() => setActiveTab('chat')}
              className={`px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 border-2 ${activeTab === 'chat' ? 'bg-[#FF6B4A] text-white border-black shadow-[2px_2px_0px_0px_black]' : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'}`}
            >
              <MessageSquare size={14} strokeWidth={2.5} /> Chat
            </button>
            <button 
               onClick={() => setActiveTab('theme')}
               className={`px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 border-2 ${activeTab === 'theme' ? 'bg-[#A3E635] text-black border-black shadow-[2px_2px_0px_0px_black]' : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'}`}
            >
              <Palette size={14} strokeWidth={2.5} /> Theme
            </button>
            <button 
               onClick={() => setActiveTab('screens')}
               className={`px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 border-2 ${activeTab === 'screens' ? 'bg-[#60A5FA] text-white border-black shadow-[2px_2px_0px_0px_black]' : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'}`}
            >
              <StickyNote size={14} strokeWidth={2.5} /> Screens
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto relative custom-scrollbar bg-white">
          
          {/* THEME EDITOR TAB */}
          {activeTab === 'theme' && (
            <ThemeEditor theme={theme} setTheme={setTheme} />
          )}

          {/* SCREENS TAB */}
          {activeTab === 'screens' && (
             <div className="p-4 space-y-4">
                <div className="flex justify-between items-center mb-2">
                   <h3 className="text-xs font-black text-black uppercase tracking-widest">App Screens</h3>
                   <button 
                     onClick={handleAddScreen}
                     className="flex items-center gap-1 text-xs font-bold bg-[#60A5FA] text-white px-2 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_black] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[1px_1px_0px_0px_black] transition-all"
                   >
                     <PlusSquare size={14} /> Add
                   </button>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                   {screens.map((screen) => (
                      <div 
                        key={screen.id}
                        onClick={() => setActiveScreenId(screen.id)}
                        className={`group relative p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-3 ${activeScreenId === screen.id ? 'bg-[#F0F9FF] border-black shadow-[4px_4px_0px_0px_black]' : 'bg-white border-gray-200 hover:border-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]'}`}
                      >
                         <div className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center ${activeScreenId === screen.id ? 'bg-[#60A5FA] border-black text-white' : 'bg-gray-100 border-gray-300 text-gray-400'}`}>
                            <Monitor size={20} />
                         </div>
                         <div className="flex-1">
                            {/* Simple inline rename could go here, for now just display */}
                            <div className="font-bold text-sm text-black">{screen.name}</div>
                            <div className="text-[10px] text-gray-500 font-medium uppercase">{screen.html ? 'Has Code' : 'Empty'}</div>
                         </div>
                         {activeScreenId === screen.id && (
                           <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full border border-black"></div>
                         )}
                         <button 
                           onClick={(e) => { e.stopPropagation(); handleDeleteScreen(screen.id); }}
                           className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-100 text-red-500 rounded border border-transparent hover:border-red-200 transition-all"
                           title="Delete Screen"
                         >
                            <Trash2 size={14} />
                         </button>
                      </div>
                   ))}
                </div>
             </div>
          )}

          {/* CHAT TAB */}
          {activeTab === 'chat' && (
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
                  <div className={`flex flex-col gap-2 max-w-[85%]`}>
                    <div className={`p-4 rounded-lg text-sm font-medium leading-relaxed border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${msg.role === 'user' ? 'bg-white text-black' : 'bg-[#F0FDF4] text-black'}`}>
                      {msg.content}
                    </div>
                    {/* Attachments Display */}
                    {msg.attachments && msg.attachments.length > 0 && (
                       <div className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          {msg.attachments.map((att, i) => (
                             <img key={i} src={att.content} alt="Attachment" className="w-20 h-20 object-cover rounded-lg border-2 border-black shadow-sm" />
                          ))}
                       </div>
                    )}
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
             {/* Attachment Preview */}
             {attachedImage && (
                <div className="absolute -top-16 left-4 bg-white p-2 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_black] animate-in fade-in slide-in-from-bottom-2">
                   <div className="relative">
                      <img src={attachedImage} alt="Preview" className="w-12 h-12 object-cover rounded border border-gray-200" />
                      <button 
                        onClick={() => setAttachedImage(null)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 border border-black hover:scale-110 transition-transform"
                      >
                         <X size={12} />
                      </button>
                   </div>
                </div>
             )}

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
                  className="w-full bg-transparent pl-12 pr-12 py-3 text-sm font-medium text-black focus:outline-none focus:ring-0 resize-none h-14 flex items-center overflow-hidden rounded-xl"
                  style={{ minHeight: '56px', maxHeight: '56px' }}
                />
                
                {/* File Attachment Button */}
                <div className="absolute left-2 top-0 bottom-0 flex items-center">
                   <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageUpload}
                   />
                   <button 
                     onClick={() => fileInputRef.current?.click()}
                     className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-black transition-colors"
                     title="Attach Image"
                   >
                      <Paperclip size={18} strokeWidth={2.5} />
                   </button>
                </div>

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
              {screens.find(s => s.id === activeScreenId)?.name || 'Home'} 
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
             
             <button 
               onClick={handleExport}
               className="px-4 py-2 bg-[#FF6B4A] text-white border-2 border-black rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#FF5530] transition-all flex items-center gap-2 shadow-[2px_2px_0px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_black]"
             >
               <Download size={14} strokeWidth={2.5} /> Export
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
               onClick={() => setActiveTool('edit')}
               className={`p-2 rounded-lg border-2 transition-all ${activeTool === 'edit' ? 'bg-[#A3E635] text-black border-black shadow-[2px_2px_0px_0px_black]' : 'border-transparent text-gray-600 hover:bg-gray-100 hover:border-black'}`} 
               title="Edit Element"
             >
                <MousePointerClick size={18} strokeWidth={2.5} />
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

          {/* Edit Mode Pill Input */}
          {activeTool === 'edit' && (
             <div className="absolute bottom-24 z-50 animate-in fade-in slide-in-from-bottom-4">
                <form 
                  onSubmit={handleEditSubmit}
                  className="flex items-center gap-2 bg-white p-2 rounded-full border-2 border-black shadow-[4px_4px_0px_0px_black] transition-all hover:scale-105 focus-within:scale-105"
                >
                  <div className="pl-3 pr-2 font-black text-xs uppercase tracking-wider text-[#A3E635] bg-black py-1 rounded">
                     {selectedElement ? selectedElement.tagName : 'Select'}
                  </div>
                  <input
                    id="edit-input-pill"
                    type="text"
                    value={editInputValue}
                    onChange={(e) => setEditInputValue(e.target.value)}
                    placeholder={selectedElement ? "Describe change..." : "Select an element first"}
                    disabled={!selectedElement}
                    className="bg-transparent outline-none w-64 text-sm font-medium px-1 disabled:opacity-50"
                  />
                  <button 
                    type="submit"
                    disabled={!selectedElement || !editInputValue.trim()}
                    className="p-2 bg-[#FF6B4A] text-white rounded-full border-2 border-black hover:bg-[#FF5530] disabled:opacity-50 disabled:cursor-not-allowed shadow-[1px_1px_0px_0px_black] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
                  >
                     <Send size={14} strokeWidth={3} />
                  </button>
                </form>
             </div>
          )}

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

               {/* Use getActiveScreenHtml() for the main frame content */}
               <MobileFrame 
                  htmlContent={getActiveScreenHtml()} 
                  scale={zoom} 
                  loadingPhase={designPhase}
                  enableEditMode={activeTool === 'edit'}
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
                    // Edit mode only supported on main frame for now to avoid race condition/confusion
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
