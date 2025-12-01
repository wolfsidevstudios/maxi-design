
import React, { useEffect, useRef } from 'react';

interface MobileFrameProps {
  htmlContent: string;
  scale?: number;
  loadingPhase?: 'idle' | 'theming' | 'coding';
  enableEditMode?: boolean;
}

const MobileFrame: React.FC<MobileFrameProps> = ({ htmlContent, scale = 1, loadingPhase = 'idle', enableEditMode = false }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Send message to iframe when edit mode changes
  useEffect(() => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({
        type: 'TOGGLE_EDIT_MODE',
        enabled: enableEditMode
      }, '*');
    }
  }, [enableEditMode]);

  // Construct the full document string for srcDoc
  // This ensures the iframe has the Tailwind script and correct structure immediately
  const docSource = `
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
          
          /* Edit Mode Highlight Class */
          .maxi-highlight {
            outline: 2px solid #3b82f6 !important;
            outline-offset: -2px;
            cursor: pointer !important;
            background-color: rgba(59, 130, 246, 0.1);
          }
        </style>
      </head>
      <body class="bg-gray-50 min-h-screen">
        ${htmlContent || '<div style="height: 100vh; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-family: sans-serif;">Waiting for code...</div>'}
        
        <script>
          let isEditMode = false;
          let highlightedElement = null;

          window.addEventListener('message', (event) => {
            if (event.data.type === 'TOGGLE_EDIT_MODE') {
              isEditMode = event.data.enabled;
              if (!isEditMode && highlightedElement) {
                 highlightedElement.classList.remove('maxi-highlight');
                 highlightedElement = null;
              }
            }
          });

          document.body.addEventListener('mouseover', (e) => {
            if (!isEditMode) return;
            e.stopPropagation();
            
            if (highlightedElement && highlightedElement !== e.target) {
              highlightedElement.classList.remove('maxi-highlight');
            }
            
            highlightedElement = e.target;
            // Don't highlight the body itself usually
            if (highlightedElement.tagName !== 'BODY' && highlightedElement.tagName !== 'HTML') {
               highlightedElement.classList.add('maxi-highlight');
            }
          });

          document.body.addEventListener('mouseout', (e) => {
             if (!isEditMode) return;
             if (e.target.classList.contains('maxi-highlight')) {
               e.target.classList.remove('maxi-highlight');
             }
          });

          document.body.addEventListener('click', (e) => {
            if (!isEditMode) return;
            e.preventDefault();
            e.stopPropagation();
            
            const target = e.target;
            // Get simple selector or HTML snippet
            const snippet = target.outerHTML;
            const tagName = target.tagName.toLowerCase();
            const textContent = target.textContent.substring(0, 50);
            
            window.parent.postMessage({
              type: 'ELEMENT_CLICKED',
              payload: {
                tagName,
                snippet,
                textContent
              }
            }, '*');
          });
        </script>
      </body>
    </html>
  `;

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
        {loadingPhase === 'theming' && (
          <div className="absolute inset-0 z-40 bg-white flex flex-col items-center justify-center space-y-6">
              <div className="flex flex-col items-center space-y-6">
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
          </div>
        )}

        {/* Screen Content */}
        <iframe
          ref={iframeRef}
          srcDoc={docSource}
          title="Mobile Preview"
          className="w-full h-full bg-white relative z-10 rounded-[36px]"
          sandbox="allow-scripts allow-same-origin allow-forms" 
        />
      </div>
    </div>
  );
};

export default MobileFrame;
