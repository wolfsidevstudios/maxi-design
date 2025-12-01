import React, { useRef, useEffect, useState } from 'react';

interface MobileFrameProps {
  htmlContent: string;
  scale?: number;
  loadingPhase?: 'idle' | 'theming' | 'coding';
}

const MobileFrame: React.FC<MobileFrameProps> = ({ htmlContent, scale = 1, loadingPhase = 'idle' }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  // Robust content writing function
  const updateIframeContent = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument;
    if (!doc) return;

    // Only write if we have content or need to clear it
    const contentToWrite = htmlContent || '';
    
    try {
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
              body { margin: 0; overflow-x: hidden; }
              /* Hide scrollbar for clean look */
              ::-webkit-scrollbar { width: 0px; background: transparent; }
            </style>
          </head>
          <body class="bg-gray-50 min-h-screen">
            ${contentToWrite}
          </body>
        </html>
      `);
      doc.close();
    } catch (e) {
      console.error("Failed to write to iframe", e);
    }
  };

  // Write content when HTML changes, BUT only if iframe is loaded
  useEffect(() => {
    if (isIframeLoaded) {
      updateIframeContent();
    }
  }, [htmlContent, isIframeLoaded]);

  return (
    <div 
      className="relative transition-all duration-500 ease-in-out"
      style={{ 
        width: '375px', 
        height: '812px',
        transform: `scale(${scale})`,
        transformOrigin: 'center center'
      }}
    >
      {/* Container with Neo-Brutalist Border - Thick Black, Hard Shadow */}
      <div className={`relative w-full h-full bg-white rounded-[40px] overflow-hidden transition-all duration-700 border-[3px] border-black ${loadingPhase === 'theming' ? 'shadow-[8px_8px_0px_0px_rgba(96,165,250,0.4)]' : 'shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)]'}`}>
        
        {/* Theming Gradient Border Animation - INSIDE the border */}
        {loadingPhase === 'theming' && (
          <div className="absolute inset-0 z-30 pointer-events-none rounded-[36px] overflow-hidden">
             {/* Rotating Gradient Border */}
             <div className="absolute -inset-[100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,#60A5FA_90deg,transparent_180deg,#34D399_270deg,transparent_360deg)] opacity-50"></div>
             
             {/* Inner Mask to create the border effect */}
             <div className="absolute inset-[4px] bg-white rounded-[32px]"></div>
             
             {/* Inner Glow */}
             <div className="absolute inset-0 rounded-[36px] shadow-[inset_0_0_60px_rgba(59,130,246,0.1)]"></div>
          </div>
        )}

        {/* Empty State / Loading Overlay */}
        {(!htmlContent || loadingPhase === 'theming') && (
          <div className="absolute inset-0 z-20 bg-white flex flex-col items-center justify-center space-y-6">
            {loadingPhase === 'theming' ? (
              <div className="flex flex-col items-center space-y-6 z-40">
                 {/* Design System Generation Animation */}
                 <div className="relative w-24 h-24">
                    {/* Central pulsing core */}
                    <div className="absolute inset-0 bg-blue-100 rounded-full animate-pulse opacity-50 border-2 border-black"></div>
                    <div className="absolute inset-4 bg-white rounded-full border-2 border-black flex items-center justify-center">
                       <div className="w-8 h-8 rounded-md bg-[#FF6B4A] border border-black animate-spin-slow"></div>
                    </div>
                    
                    {/* Orbiting particles */}
                    <div className="absolute inset-0 animate-[spin_3s_linear_infinite]">
                       <div className="w-3 h-3 bg-[#A3E635] border border-black rounded-full absolute top-0 left-1/2 -translate-x-1/2"></div>
                    </div>
                    <div className="absolute inset-2 animate-[spin_4s_linear_infinite_reverse]">
                       <div className="w-3 h-3 bg-[#60A5FA] border border-black rounded-full absolute bottom-0 left-1/2 -translate-x-1/2"></div>
                    </div>
                 </div>
                 
                 <div className="text-center space-y-2">
                  <div className="text-xl font-display font-black text-black tracking-tight uppercase">Crafting Theme</div>
                  <div className="flex gap-2 justify-center">
                     <span className="text-[10px] px-2 py-1 bg-[#FDFBD4] border border-black rounded text-black font-bold uppercase tracking-wider">Type</span>
                     <span className="text-[10px] px-2 py-1 bg-[#FDFBD4] border border-black rounded text-black font-bold uppercase tracking-wider">Color</span>
                     <span className="text-[10px] px-2 py-1 bg-[#FDFBD4] border border-black rounded text-black font-bold uppercase tracking-wider">Shape</span>
                  </div>
                 </div>
              </div>
            ) : (
              <div className="flex flex-col items-center text-gray-300 space-y-3">
                 <div className="w-24 h-24 rounded-[24px] border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50/50">
                    <div className="w-10 h-10 rounded-lg bg-gray-200"></div>
                 </div>
                 <div className="text-sm font-bold uppercase tracking-widest text-gray-400">App Preview</div>
              </div>
            )}
          </div>
        )}

        {/* Screen Content */}
        <iframe
          ref={iframeRef}
          onLoad={() => {
            setIsIframeLoaded(true);
            updateIframeContent(); // Ensure content writes immediately on load
          }}
          title="Mobile Preview"
          className="w-full h-full bg-white relative z-10 rounded-[36px]"
          sandbox="allow-scripts allow-same-origin" 
        />
      </div>
    </div>
  );
};

export default MobileFrame;