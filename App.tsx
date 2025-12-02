
import React, { useState, useRef, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import MobileFrame from './components/MobileFrame';
import ThemeEditor from './components/ThemeEditor';
import SettingsModal from './components/SettingsModal';
import Navbar from './components/Navbar';
import StudioPanel from './components/StudioPanel';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import NotificationSystem, { NotificationItem } from './components/Notification';
import WaitlistPage from './components/WaitlistPage';
import LoginPage from './components/LoginPage';
import CodeEditor from './components/CodeEditor';
import { hasJoinedWaitlist } from './services/db';
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
  MousePointerClick,
  BoxSelect,
  FileCode
} from './components/Icons';
import { Message, ThemeSettings, ViewMode, ProjectData, AppSettings, Screen, ModelType, User } from './types';
import { Chat } from '@google/genai';
import JSZip from 'jszip';

// Extend ViewMode to include waitlist and login
type ExtendedViewMode = ViewMode | 'waitlist' | 'login';

function App() {
  const [viewMode, setViewMode] = useState<ExtendedViewMode>(() => {
     // Check if user has already joined waitlist OR logged in
     if (hasJoinedWaitlist()) {
        return 'landing';
     }
     return 'waitlist';
  });
  
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
     const savedUser = localStorage.getItem('maxi_user');
     return savedUser ? JSON.parse(savedUser) : null;
  });

  const [landingTab, setLandingTab] = useState<'create' | 'projects'>('create');
  const [activeTab, setActiveTab] = useState<'chat' | 'theme' | 'screens' | 'studio' | 'code'>('chat');
  
  // Settings & Modal
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem('sleek_settings');
      if (saved) {
         const parsed = JSON.parse(saved);
         const validModels: ModelType[] = ['gemini-3-pro-preview', 'gemini-2.5-pro', 'gemini-2.5-flash', 'gemini-2.5-flash-lite'];
         const activeModel = validModels.includes(parsed.activeModel) ? parsed.activeModel : 'gemini-3-pro-preview';
         const raceModel = validModels.includes(parsed.raceModel) ? parsed.raceModel : 'gemini-2.5-flash';

         return {
            ...parsed,
            activeModel,
            raceModel,
            enableThinking: parsed.enableThinking ?? true,
            enableStreaming: parsed.enableStreaming ?? true
         };
      }
      return {
        activeModel: 'gemini-3-pro-preview',
        raceModel: 'gemini-2.5-flash',
        customApiKey: '',
        enableThinking: true,
        enableStreaming: true
      };
    } catch (e) {
      return {
        activeModel: 'gemini-3-pro-preview',
        raceModel: 'gemini-2.5-flash',
        customApiKey: '',
        enableThinking: true,
        enableStreaming: true
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
  
  // Studio / Edit State
  const [selectedElementStyles, setSelectedElementStyles] = useState<any>(null);
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
          chatSessionRef.current = createChatSession(messages, settings.activeModel, settings.customApiKey, settings.enableThinking);
        }
        if (isRaceMode && !challengerSessionRef.current) {
          challengerSessionRef.current = createChatSession(challengerMessages, settings.raceModel, settings.customApiKey, settings.enableThinking);
        }
      } catch (e: any) {
        addNotification('error', 'Initialization Error', 'Failed to initialize AI. Please check your API key.');
      }
    }
  }, [viewMode, isRaceMode, settings.activeModel, settings.raceModel, settings.customApiKey, settings.enableThinking]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  // Listen for Element Events from Iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'ELEMENT_SELECTED') {
        setSelectedElementStyles(event.data.payload);
        if (activeTab !== 'studio' && activeTab !== 'code' && activeTool === 'select') {
           setActiveTab('studio');
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [activeTab, activeTool]);

  useEffect(() => {
    if (activeTool === 'pan') {
      setSelectedElementStyles(null);
    }
  }, [activeTool]);

  // Active Screen HTML Accessor
  const getActiveScreenHtml = () => {
     return screens.find(s => s.id === activeScreenId)?.html || '';
  };
  
  const updateActiveScreenHtml = (html: string) => {
     setScreens(prev => prev.map(s => s.id === activeScreenId ? { ...s, html } : s));
  };

  const broadcastToIframes = (message: any) => {
     const frames = document.getElementsByTagName('iframe');
     for (let i = 0; i < frames.length; i++) {
        frames[i].contentWindow?.postMessage(message, '*');
     }
  };

  const handleStudioUpdate = (key: string, value: string) => {
     setSelectedElementStyles((prev: any) => prev ? ({ ...prev, [key]: value }) : null);
     broadcastToIframes({
        type: 'UPDATE_STYLE',
        payload: { key, value }
     });
  };

  const handleInsertElement = (type: 'text' | 'button' | 'container' | 'image') => {
     let html = '';
     switch(type) {
        case 'text': html = '<p class="text-base text-gray-800 my-2">New Text Block</p>'; break;
        case 'button': html = '<button class="bg-black text-white px-4 py-2 rounded-lg my-2 font-bold">Button</button>'; break;
        case 'container': html = '<div class="p-4 border-2 border-gray-200 rounded-lg my-2 min-h-[50px]"></div>'; break;
        case 'image': html = '<img src="https://picsum.photos/200/200" class="w-full h-40 object-cover rounded-lg my-2" />'; break;
     }

     broadcastToIframes({
        type: 'INSERT_ELEMENT',
        payload: { html }
     });
  };

  const handleStartProject = (initialPrompt: string, referenceImage?: string, initialTab: 'chat' | 'studio' = 'chat') => {
    const newId = Date.now().toString();
    const initialScreen: Screen = {
      id: 'screen-1',
      name: 'Home',
      html: ''
    };
    
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
      settings: settings 
    };

    setProjects(prev => [newProject, ...prev]);
    setCurrentProjectId(newId);
    setScreens([initialScreen]);
    setActiveScreenId('screen-1');
    
    setMessages([]);
    setChallengerMessages([]);
    setChallengerHtmlCode('');
    setTheme(newProject.theme);
    setPanPosition({ x: 0, y: 0 });
    setZoom(0.6); 
    setIsRaceMode(false); 
    setAttachedImage(referenceImage || null);
    setSelectedElementStyles(null);
    setActiveTool('select');
    setActiveTab(initialTab);

    chatSessionRef.current = createChatSession([], settings.activeModel, settings.customApiKey, settings.enableThinking);

    setViewMode('editor');
    
    if (initialPrompt && initialTab !== 'studio') {
      setTimeout(() => {
        handleSendMessageReal(initialPrompt, referenceImage || null);
      }, 500);
    }
  };

  const handleLoadProject = (project: ProjectData) => {
    setCurrentProjectId(project.id);
    setMessages(project.messages);
    
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
    setIsRaceMode(false); 
    setSelectedElementStyles(null);
    setActiveTool('select');
    setActiveTab('chat');

    chatSessionRef.current = createChatSession(
      project.messages, 
      project.settings?.activeModel || settings.activeModel, 
      project.settings?.customApiKey || settings.customApiKey,
      project.settings?.enableThinking ?? settings.enableThinking
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
    if (screens.length <= 1) return; 
    
    const newScreens = screens.filter(s => s.id !== screenId);
    setScreens(newScreens);
    
    if (activeScreenId === screenId) {
      setActiveScreenId(newScreens[0].id);
    }
  };

  const handleExport = async () => {
    const zip = new JSZip();
    
    screens.forEach(screen => {
      const fileName = `${screen.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.html`;
      
      let htmlContent = screen.html;
      if (!htmlContent.includes('<script src="https://cdn.tailwindcss.com">')) {
         const headEnd = htmlContent.indexOf('</head>');
         if (headEnd !== -1) {
            htmlContent = htmlContent.slice(0, headEnd) + '<script src="https://cdn.tailwindcss.com"></script>\n' + htmlContent.slice(headEnd);
         } else {
            htmlContent = `<!DOCTYPE html><html><head><script src="https://cdn.tailwindcss.com"></script></head><body>${htmlContent}</body></html>`;
         }
      }
      
      zip.file(fileName, htmlContent);
    });

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
    setEditInputValue(''); 
    setSelectedElementStyles(null); 
    setAttachedImage(null); 
    setIsGenerating(true);
    setStatusSteps({ analyzed: false, planned: false, generating: false });
    if(activeTab === 'studio' || activeTab === 'code') setActiveTab('chat'); 

    const processStream = async (
      session: Chat, 
      setHtml: (html: string) => void,
      setPhase: React.Dispatch<React.SetStateAction<'idle' | 'theming' | 'coding'>>,
      isMain: boolean,
      modelName: string
    ) => {
      let accumulatedText = '';
      setPhase('theming');
      if (isMain) setStatusSteps(prev => ({ ...prev, analyzed: true }));

      const safetyTimer = setTimeout(() => {
         setPhase('coding');
         if (isMain) setStatusSteps(prev => ({ ...prev, planned: true, generating: true }));
      }, 3000);

      try {
        await streamResponse(session, userMsg.content, userMsg.attachments, (chunk) => {
          accumulatedText += chunk;
          
          const themeMatch = accumulatedText.match(/<theme_config>([\s\S]*?)<\/theme_config>/);
          if (themeMatch && isMain) { 
             try {
                const themeJson = JSON.parse(themeMatch[1]);
                setTheme(prev => ({ ...prev, ...themeJson }));
                setStatusSteps(prev => ({ ...prev, planned: true }));
                clearTimeout(safetyTimer);
                setPhase('coding');
                if (isMain) setStatusSteps(prev => ({ ...prev, planned: true, generating: true }));
             } catch (e) {}
          }

          let cleanCode = accumulatedText.replace(/<theme_config>[\s\S]*?<\/theme_config>/, '').trim();
          let extractedHtml = '';
          
          const watermarkIndex = cleanCode.indexOf('<!-- Generated by Maxi Design AI -->');
          if (watermarkIndex !== -1) {
             extractedHtml = cleanCode.substring(watermarkIndex);
             setPhase('coding');
             if (isMain) setStatusSteps(prev => ({ ...prev, planned: true, generating: true }));
          } 
          else if (cleanCode.match(/```(html|xml)/i)) {
             const markdownMatch = cleanCode.match(/```(html|xml)?\s*([\s\S]*?)(```|$)/i);
             if (markdownMatch && markdownMatch[2].trim().length > 5) {
                extractedHtml = markdownMatch[2];
                setPhase('coding');
             }
          }
          else {
             const docTypeIndex = cleanCode.indexOf('<!DOCTYPE');
             const htmlIndex = cleanCode.indexOf('<html');
             if (docTypeIndex !== -1) {
                extractedHtml = cleanCode.substring(docTypeIndex);
                setPhase('coding');
             } else if (htmlIndex !== -1) {
                extractedHtml = cleanCode.substring(htmlIndex);
                setPhase('coding');
             }
          }
          
          extractedHtml = extractedHtml.trim();
          
          if (extractedHtml) {
             setPhase('coding');
             if (isMain) setStatusSteps(prev => ({ ...prev, planned: true, generating: true }));

             if (settings.enableStreaming) {
               setHtml(extractedHtml);
             }
          }
        });

        let finalCleanCode = accumulatedText.replace(/<theme_config>[\s\S]*?<\/theme_config>/, '').trim();
        let finalHtml = '';
        
        const finalMarkdownMatch = finalCleanCode.match(/```(html|xml)?\s*([\s\S]*?)(```|$)/i);
        if (finalCleanCode.includes('<!-- Generated by Maxi Design AI -->')) {
           finalHtml = finalCleanCode.substring(finalCleanCode.indexOf('<!-- Generated by Maxi Design AI -->'));
        } else if (finalMarkdownMatch) {
           finalHtml = finalMarkdownMatch[2];
        } else if (finalCleanCode.includes('<!DOCTYPE')) {
           finalHtml = finalCleanCode.substring(finalCleanCode.indexOf('<!DOCTYPE'));
        } else if (finalCleanCode.includes('<html')) {
           finalHtml = finalCleanCode.substring(finalCleanCode.indexOf('<html'));
        } else if (finalCleanCode.includes('<div') || finalCleanCode.includes('<body')) {
           finalHtml = finalCleanCode; 
        }

        if (finalHtml) {
           setHtml(finalHtml);
        }

      } catch (e: any) {
        console.error("Stream error", e);
        const errorMsg = e.message || e.toString();
        if (errorMsg.includes('429') || errorMsg.includes('quota') || errorMsg.includes('RESOURCE_EXHAUSTED')) {
          addNotification('error', 'Out of Credits', `You have exceeded the quota for ${modelName}. Please check your API usage or switch models.`, 'Settings', () => setShowSettings(true));
        } else if (errorMsg.includes('API key') || errorMsg.includes('403')) {
           addNotification('error', 'Authentication Failed', 'Invalid API Key. Please update your key in settings.', 'Settings', () => setShowSettings(true));
        } else {
           addNotification('error', 'Generation Failed', `An error occurred with ${modelName}. Please try again.`);
        }
      } finally {
        clearTimeout(safetyTimer);
        setPhase('idle');
      }
    };

    const promises = [];
    
    if (chatSessionRef.current) {
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

    if (isRaceMode) {
      if (!challengerSessionRef.current) {
        challengerSessionRef.current = createChatSession(challengerMessages, settings.raceModel, settings.customApiKey, settings.enableThinking);
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
    setStatusSteps({ analyzed: false, planned: false, generating: false });
  };

  const handleWinRace = (winner: 'main' | 'challenger') => {
    if (winner === 'challenger') {
      updateActiveScreenHtml(challengerHtmlCode);
      setMessages(challengerMessages);
      chatSessionRef.current = createChatSession(challengerMessages, settings.activeModel, settings.customApiKey, settings.enableThinking);
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
      setChallengerHtmlCode(getActiveScreenHtml());
      setChallengerMessages([...messages]);
      setChallengerDesignPhase('idle');
      challengerSessionRef.current = createChatSession([...messages], settings.raceModel, settings.customApiKey, settings.enableThinking);
    } else {
      setChallengerHtmlCode('');
      setChallengerMessages([]);
      challengerSessionRef.current = null;
    }
  };

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

  // --- VIEW RENDERING ---

  if (viewMode === 'waitlist') {
    return <WaitlistPage 
       onAccessGranted={() => {
          localStorage.setItem('maxi_access_granted', 'true');
          setViewMode('landing');
       }} 
       onNavigateToLogin={() => setViewMode('login')}
    />;
  }
  
  if (viewMode === 'login') {
     return <LoginPage 
        onBack={() => setViewMode('waitlist')}
        onLoginSuccess={(user) => {
           localStorage.setItem('maxi_access_granted', 'true');
           localStorage.setItem('maxi_user', JSON.stringify(user));
           setCurrentUser(user);
           setViewMode('landing');
        }}
     />
  }

  if (viewMode === 'privacy') return <PrivacyPolicy onBack={() => setViewMode('landing')} />;
  if (viewMode === 'terms') return <TermsOfService onBack={() => setViewMode('landing')} />;

  if (viewMode === 'landing') {
    return (
      <div className="relative min-h-screen bg-[#FDFBD4]">
        <Navbar 
          activeTab={landingTab} 
          onTabChange={setLandingTab} 
          onOpenSettings={() => setShowSettings(true)} 
          onOpenStudio={() => handleStartProject('', undefined, 'studio')}
        />
        {currentUser && (
           <div className="fixed top-8 right-20 z-50 flex items-center gap-2 animate-in fade-in">
              <span className="text-xs font-bold text-gray-500 hidden md:block">Hi, {currentUser.name}</span>
              <img src={currentUser.picture} className="w-8 h-8 rounded-full border-2 border-black" alt="Profile" />
           </div>
        )}
        <NotificationSystem notifications={notifications} onDismiss={removeNotification} />
        <LandingPage 
          view={landingTab}
          onStartProject={handleStartProject} 
          projects={projects}
          onLoadProject={handleLoadProject}
          onDeleteProject={handleDeleteProject}
          onNavigate={(page) => setViewMode(page)}
        />
        {showSettings && <SettingsModal settings={settings} onSave={(s) => setSettings(s)} onClose={() => setShowSettings(false)} />}
      </div>
    );
  }

  // RENDER: Editor
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#FDFBD4] font-sans">
      <NotificationSystem notifications={notifications} onDismiss={removeNotification} />
      {showSettings && <SettingsModal settings={settings} onSave={(s) => setSettings(s)} onClose={() => setShowSettings(false)} />}

      {/* LEFT SIDEBAR */}
      <div className="w-[380px] flex flex-col border-r-2 border-black bg-white z-20 transition-all relative shadow-[4px_0px_0px_0px_rgba(0,0,0,0.05)]">
        <div className="h-16 border-b-2 border-black flex items-center justify-between px-4 bg-white shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setViewMode('landing')} className="p-2 hover:bg-gray-100 rounded-lg text-black transition-colors border-2 border-transparent hover:border-black hover:shadow-[2px_2px_0px_0px_black]"><Home size={18} strokeWidth={2.5} /></button>
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 bg-[#FF6B4A] border-2 border-black flex items-center justify-center text-white font-black text-sm shadow-[2px_2px_0px_0px_black] rounded-md">M</div>
               <span className="font-bold text-black tracking-tight text-lg">Maxi Design</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
             <button onClick={() => handleStartProject('', undefined, 'studio')} className="hidden md:flex p-2 hover:bg-gray-100 rounded-lg text-black border-2 border-transparent hover:border-black hover:shadow-[2px_2px_0px_0px_black] transition-all" title="Studio Mode"><BoxSelect size={18} strokeWidth={2.5} /></button>
            <button onClick={() => setShowSettings(true)} className="p-2 hover:bg-[#A3E635] rounded-lg text-black border-2 border-transparent hover:border-black hover:shadow-[2px_2px_0px_0px_black] transition-all"><Settings size={18} strokeWidth={2.5} /></button>
          </div>
        </div>

        <div className="flex justify-center pt-4 pb-2 border-b-2 border-black bg-[#FDFCF8] shrink-0 overflow-x-auto">
          <div className="flex items-center gap-1 px-2">
            <button onClick={() => setActiveTab('chat')} className={`px-2 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-1 border-2 ${activeTab === 'chat' ? 'bg-[#FF6B4A] text-white border-black shadow-[2px_2px_0px_0px_black]' : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'}`}><MessageSquare size={14} /> Chat</button>
            <button onClick={() => setActiveTab('studio')} className={`px-2 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-1 border-2 ${activeTab === 'studio' ? 'bg-[#A3E635] text-black border-black shadow-[2px_2px_0px_0px_black]' : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'}`}><BoxSelect size={14} /> Studio</button>
            <button onClick={() => setActiveTab('code')} className={`px-2 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-1 border-2 ${activeTab === 'code' ? 'bg-[#333] text-white border-black shadow-[2px_2px_0px_0px_black]' : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'}`}><FileCode size={14} /></button>
            <button onClick={() => setActiveTab('theme')} className={`px-2 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-1 border-2 ${activeTab === 'theme' ? 'bg-gray-100 text-black border-black' : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'}`}><Palette size={14} /></button>
            <button onClick={() => setActiveTab('screens')} className={`px-2 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-1 border-2 ${activeTab === 'screens' ? 'bg-gray-100 text-black border-black' : 'bg-white text-gray-500 border-gray-200 hover:border-black hover:text-black'}`}><StickyNote size={14} /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto relative custom-scrollbar bg-white">
          {activeTab === 'theme' && <ThemeEditor theme={theme} setTheme={setTheme} />}
          {activeTab === 'screens' && (
             <div className="p-4 space-y-4">
                <div className="flex justify-between items-center mb-2">
                   <h3 className="text-xs font-black text-black uppercase tracking-widest">App Screens</h3>
                   <button onClick={handleAddScreen} className="flex items-center gap-1 text-xs font-bold bg-[#60A5FA] text-white px-2 py-1 rounded border-2 border-black shadow-[2px_2px_0px_0px_black] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[1px_1px_0px_0px_black] transition-all"><PlusSquare size={14} /> Add</button>
                </div>
                <div className="grid grid-cols-1 gap-3">
                   {screens.map((screen) => (
                      <div key={screen.id} onClick={() => setActiveScreenId(screen.id)} className={`group relative p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-3 ${activeScreenId === screen.id ? 'bg-[#F0F9FF] border-black shadow-[4px_4px_0px_0px_black]' : 'bg-white border-gray-200 hover:border-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]'}`}>
                         <div className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center ${activeScreenId === screen.id ? 'bg-[#60A5FA] border-black text-white' : 'bg-gray-100 border-gray-300 text-gray-400'}`}><Monitor size={20} /></div>
                         <div className="flex-1"><div className="font-bold text-sm text-black">{screen.name}</div><div className="text-[10px] text-gray-500 font-medium uppercase">{screen.html ? 'Has Code' : 'Empty'}</div></div>
                         {activeScreenId === screen.id && <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full border border-black"></div>}
                         <button onClick={(e) => { e.stopPropagation(); handleDeleteScreen(screen.id); }} className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-100 text-red-500 rounded border border-transparent hover:border-red-200 transition-all"><Trash2 size={14} /></button>
                      </div>
                   ))}
                </div>
             </div>
          )}
          {activeTab === 'studio' && (
             <StudioPanel 
               selectedElement={selectedElementStyles} 
               onUpdateStyle={handleStudioUpdate}
               onInsertElement={handleInsertElement}
             />
          )}
          {activeTab === 'code' && (
             <CodeEditor 
               code={getActiveScreenHtml()} 
               onChange={updateActiveScreenHtml}
             />
          )}
          {activeTab === 'chat' && (
            <div className="flex flex-col min-h-full p-4 gap-6 pb-28">
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
              {isGenerating && (
                <div className="flex flex-col gap-3 ml-11 p-4 bg-[#FDFBD4] rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                   <div className={`flex items-center gap-3 text-xs font-bold transition-all duration-500 ${statusSteps.generating ? 'text-[#FF6B4A]' : 'text-gray-400'}`}>
                     {statusSteps.generating ? <Loader2 size={16} className="animate-spin" strokeWidth={3} /> : <CircleDashed size={16} />} 
                     <span>DESIGNING...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        {activeTab === 'chat' && (
          <div className="p-4 bg-white/90 backdrop-blur-sm border-t-2 border-black absolute bottom-0 left-0 right-0 z-20">
             {attachedImage && (
                <div className="absolute -top-16 left-4 bg-white p-2 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_black] animate-in fade-in slide-in-from-bottom-2">
                   <div className="relative">
                      <img src={attachedImage} alt="Preview" className="w-12 h-12 object-cover rounded border border-gray-200" />
                      <button onClick={() => setAttachedImage(null)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 border border-black hover:scale-110 transition-transform"><X size={12} /></button>
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
                  placeholder="Ask AI to design..."
                  className="w-full bg-transparent pl-12 pr-12 py-3 text-sm font-medium text-black focus:outline-none focus:ring-0 resize-none h-14 flex items-center overflow-hidden rounded-xl"
                  style={{ minHeight: '56px', maxHeight: '56px' }}
                />
                <div className="absolute left-2 top-0 bottom-0 flex items-center">
                   <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                   <button onClick={() => fileInputRef.current?.click()} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-black transition-colors" title="Attach Image"><Paperclip size={18} strokeWidth={2.5} /></button>
                </div>
                <button onClick={() => handleSendMessageReal(inputValue)} disabled={!inputValue.trim() || isGenerating} className="absolute right-2 top-2 bottom-2 aspect-square bg-[#FF6B4A] text-white rounded-lg border-2 border-black hover:bg-[#FF5530] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center shadow-[2px_2px_0px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_black] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">{isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} strokeWidth={2.5} />}</button>
             </div>
          </div>
        )}
      </div>

      {/* RIGHT CANVAS */}
      <div className="flex-1 relative flex flex-col bg-[#FDFBD4]">
        <div className="h-16 border-b-2 border-black flex items-center justify-between px-6 bg-white z-20 shrink-0">
          <div className="flex items-center gap-2 text-sm text-black font-bold uppercase tracking-wide">
            <span className="bg-[#A3E635] px-2 py-0.5 border-2 border-black rounded shadow-[2px_2px_0px_0px_black]">Project</span>
            <span className="text-black font-black">/</span>
            <span className="flex items-center gap-1 bg-white border-2 border-black px-2 py-0.5 rounded shadow-[2px_2px_0px_0px_black] text-xs">
              {screens.find(s => s.id === activeScreenId)?.name || 'Home'} 
            </span>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={() => setActiveTab('studio')} className={`flex items-center gap-2 px-4 py-2 border-2 border-black rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-[2px_2px_0px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_black] ${activeTab === 'studio' ? 'bg-black text-white' : 'bg-white hover:bg-gray-50 text-black'}`}>
               <BoxSelect size={16} strokeWidth={2.5} /> Studio
             </button>
             <button onClick={toggleRaceMode} className={`flex items-center gap-2 px-4 py-2 border-2 border-black rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-[2px_2px_0px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_black] ${isRaceMode ? 'bg-black text-white' : 'bg-white hover:bg-gray-50 text-black'}`}><Swords size={16} strokeWidth={2.5} /> {isRaceMode ? 'End Race' : 'Race Mode'}</button>
             <div className="w-px h-6 bg-gray-300 mx-1"></div>
             <button onClick={handleExport} className="px-4 py-2 bg-[#FF6B4A] text-white border-2 border-black rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#FF5530] transition-all flex items-center gap-2 shadow-[2px_2px_0px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_black]"><Download size={14} strokeWidth={2.5} /> Export</button>
          </div>
        </div>

        <div 
           className={`flex-1 relative overflow-hidden flex items-center justify-center dot-pattern group ${activeTool === 'pan' ? (isPanning ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'}`}
           onMouseDown={handleMouseDown}
           onMouseMove={handleMouseMove}
           onMouseUp={handleMouseUp}
           onMouseLeave={handleMouseUp}
        >
          <div className="absolute bottom-8 z-50 flex items-center gap-2 bg-white p-2 rounded-xl shadow-[4px_4px_0px_0px_black] border-2 border-black transition-transform hover:scale-105">
             <button onClick={() => setActiveTool('select')} className={`p-2 rounded-lg border-2 transition-all ${activeTool === 'select' ? 'bg-[#FF6B4A] text-white border-black shadow-[2px_2px_0px_0px_black]' : 'border-transparent text-gray-600 hover:bg-gray-100 hover:border-black'}`} title="Select"><MousePointer2 size={18} strokeWidth={2.5} /></button>
             <button onClick={() => setActiveTool('pan')} className={`p-2 rounded-lg border-2 transition-all ${activeTool === 'pan' ? 'bg-[#FF6B4A] text-white border-black shadow-[2px_2px_0px_0px_black]' : 'border-transparent text-gray-600 hover:bg-gray-100 hover:border-black'}`} title="Pan"><Hand size={18} strokeWidth={2.5} /></button>
             <div className="w-0.5 h-6 bg-black mx-1"></div>
             <button className="p-2 hover:bg-gray-100 rounded-lg text-black transition-colors border-2 border-transparent hover:border-black" onClick={() => setZoom(z => Math.max(0.3, z - 0.1))}><ZoomOut size={18} strokeWidth={2.5} /></button>
             <span className="text-sm font-bold w-12 text-center text-black tabular-nums">{Math.round(zoom * 100)}%</span>
             <button className="p-2 hover:bg-gray-100 rounded-lg text-black transition-colors border-2 border-transparent hover:border-black" onClick={() => setZoom(z => Math.min(2.0, z + 0.1))}><ZoomIn size={18} strokeWidth={2.5} /></button>
          </div>

          <div 
            style={{ 
              transform: `translate(${panPosition.x}px, ${panPosition.y}px)`,
              transition: isPanning ? 'none' : 'transform 0.1s ease-out',
              display: 'flex', gap: '60px', alignItems: 'center'
            }}
          >
            <div className="relative flex flex-col items-center gap-4">
               {isRaceMode && (
                 <div className="bg-white px-4 py-2 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_black] text-sm font-black flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2"><BrainCircuit size={16} /> {settings.activeModel === 'gemini-3-pro-preview' ? 'Gemini 3.0 Pro' : settings.activeModel}</div>
                    {isRaceMode && <button onClick={() => handleWinRace('main')} className="bg-[#A3E635] hover:bg-[#8CD321] text-black text-xs px-3 py-1 rounded border border-black font-bold uppercase tracking-wider">Select Winner</button>}
                 </div>
               )}
               <MobileFrame 
                  htmlContent={getActiveScreenHtml()} 
                  scale={zoom} 
                  loadingPhase={designPhase}
                  enableEditMode={activeTool === 'select'}
               />
            </div>

            {isRaceMode && (
              <div className="relative flex flex-col items-center gap-4">
                 <div className="bg-white px-4 py-2 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_black] text-sm font-black flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2"><Zap size={16} className="text-[#FF6B4A]" /> {settings.raceModel === 'gemini-2.5-flash' ? 'Gemini 2.5 Flash' : settings.raceModel}</div>
                    <button onClick={() => handleWinRace('challenger')} className="bg-[#FF6B4A] hover:bg-[#FF5530] text-white text-xs px-3 py-1 rounded border border-black font-bold uppercase tracking-wider">Select Winner</button>
                 </div>
                 <MobileFrame htmlContent={challengerHtmlCode} scale={zoom} loadingPhase={challengerDesignPhase} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
