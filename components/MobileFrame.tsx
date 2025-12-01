
import React, { useEffect, useRef } from 'react';

interface MobileFrameProps {
  htmlContent: string;
  scale?: number;
  loadingPhase?: 'idle' | 'theming' | 'coding';
  enableEditMode?: boolean;
  onHtmlUpdate?: (newHtml: string) => void;
}

const MobileFrame: React.FC<MobileFrameProps> = ({ htmlContent, scale = 1, loadingPhase = 'idle', enableEditMode = false, onHtmlUpdate }) => {
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
          
          .maxi-selected {
            outline: 2px solid #FF6B4A !important;
            outline-offset: -2px;
            position: relative;
          }
        </style>
      </head>
      <body class="bg-gray-50 min-h-screen">
        ${htmlContent || '<div style="height: 100vh; display: flex; align-items: center; justify-content: center; color: #9CA3AF; font-family: sans-serif;"></div>'}
        
        <script>
          let isEditMode = false;
          let highlightedElement = null;
          let selectedElement = null;

          function rgbToHex(rgb) {
            if (!rgb || rgb === 'rgba(0, 0, 0, 0)') return '#ffffff';
            if (rgb.startsWith('#')) return rgb;
            const rgbValues = rgb.match(/\d+/g);
            if (!rgbValues) return '#000000';
            return '#' + ((1 << 24) + (parseInt(rgbValues[0]) << 16) + (parseInt(rgbValues[1]) << 8) + parseInt(rgbValues[2])).toString(16).slice(1);
          }

          window.addEventListener('message', (event) => {
            const { type, payload } = event.data;

            if (type === 'TOGGLE_EDIT_MODE') {
              isEditMode = event.data.enabled;
              if (!isEditMode) {
                 if (highlightedElement) highlightedElement.classList.remove('maxi-highlight');
                 if (selectedElement) selectedElement.classList.remove('maxi-selected');
                 highlightedElement = null;
                 selectedElement = null;
              }
            }

            if (type === 'UPDATE_STYLE' && selectedElement) {
               // Apply style updates directly to the selected element
               const { key, value } = payload;
               
               if (key === 'textContent') {
                  // Only update text nodes to avoid destroying children
                  if (selectedElement.childNodes.length === 1 && selectedElement.childNodes[0].nodeType === 3) {
                     selectedElement.textContent = value;
                  } else if (selectedElement.childNodes.length === 0) {
                     selectedElement.textContent = value;
                  }
               } else if (key === 'className') {
                  selectedElement.className = value;
               } else {
                  selectedElement.style[key] = value;
               }
            }

            if (type === 'INSERT_ELEMENT' && selectedElement) {
               const { html } = payload;
               selectedElement.insertAdjacentHTML('beforeend', html);
            }
          });

          document.body.addEventListener('mouseover', (e) => {
            if (!isEditMode) return;
            e.stopPropagation();
            
            if (highlightedElement && highlightedElement !== e.target && highlightedElement !== selectedElement) {
              highlightedElement.classList.remove('maxi-highlight');
            }
            
            highlightedElement = e.target;
            if (highlightedElement !== selectedElement && highlightedElement.tagName !== 'BODY' && highlightedElement.tagName !== 'HTML') {
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
            
            // Clear previous selection
            if (selectedElement) {
               selectedElement.classList.remove('maxi-selected');
               selectedElement.removeAttribute('data-maxi-selected');
            }

            const target = e.target;
            selectedElement = target;
            selectedElement.classList.add('maxi-selected');
            selectedElement.setAttribute('data-maxi-selected', 'true');
            
            // Extract Computed Styles
            const computed = window.getComputedStyle(selectedElement);
            
            const styles = {
               tagName: selectedElement.tagName.toLowerCase(),
               textContent: selectedElement.textContent.substring(0, 100), // Limit length
               color: rgbToHex(computed.color),
               backgroundColor: rgbToHex(computed.backgroundColor),
               fontSize: computed.fontSize,
               fontWeight: computed.fontWeight,
               padding: computed.padding,
               borderRadius: computed.borderRadius,
               display: computed.display,
               textAlign: computed.textAlign,
               classes: selectedElement.className
            };
            
            window.parent.postMessage({
              type: 'ELEMENT_SELECTED',
              payload: styles
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
      {/* Container with Neo-Brutalist Border */}
      <div className={`relative w-full h-full bg-white rounded-[40px] overflow-hidden transition-all duration-700 border-[3px] border-black ${loadingPhase !== 'idle' ? 'shadow-[8px_8px_0px_0px_rgba(96,165,250,0.4)]' : 'shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)]'}`}>
        
        {/* Theming Gradient Border Animation */}
        {loadingPhase === 'theming' && (
          <div className="absolute inset-0 z-30 pointer-events-none rounded-[36px] overflow-hidden">
             <div className="absolute -inset-[100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,#60A5FA_90deg,transparent_180deg,#34D399_270deg,transparent_360deg)] opacity-50"></div>
             <div className="absolute inset-[4px] bg-white rounded-[32px]"></div>
             <div className="absolute inset-0 rounded-[36px] shadow-[inset_0_0_60px_rgba(59,130,246,0.1)]"></div>
          </div>
        )}

        {/* Theming Overlay */}
        {loadingPhase === 'theming' && (
          <div className="absolute inset-0 z-40 bg-white flex flex-col items-center justify-center space-y-6">
              <div className="flex flex-col items-center space-y-6">
                 <div className="relative w-24 h-24">
                    <div className="absolute inset-0 bg-blue-100 rounded-full animate-pulse opacity-50 border-2 border-black"></div>
                    <div className="absolute inset-4 bg-white rounded-full border-2 border-black flex items-center justify-center">
                       <div className="w-8 h-8 rounded-md bg-[#FF6B4A] border border-black animate-spin-slow"></div>
                    </div>
                 </div>
                 <div className="text-center space-y-2">
                  <div className="text-xl font-display font-black text-black tracking-tight uppercase">Crafting Theme</div>
                 </div>
              </div>
          </div>
        )}

        {/* Coding Overlay */}
        {loadingPhase === 'coding' && (
          <div className="absolute inset-0 z-40 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center space-y-6 transition-opacity duration-300">
              <div className="flex flex-col items-center space-y-6">
                 <div className="relative w-24 h-24">
                    <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20 border-2 border-transparent"></div>
                    <div className="absolute inset-2 bg-white rounded-full border-2 border-black flex items-center justify-center overflow-hidden">
                       <div className="absolute bottom-0 w-full bg-[#A3E635] animate-[bounce_2s_infinite] h-full opacity-30"></div>
                       <div className="w-8 h-8 rounded-full border-b-2 border-l-2 border-black animate-spin"></div>
                    </div>
                 </div>
                 <div className="text-center space-y-2">
                  <div className="text-xl font-display font-black text-black tracking-tight uppercase">Building Interface</div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Writing HTML & Tailwind</div>
                 </div>
              </div>
          </div>
        )}
        
        {/* Waiting / Empty State (only if idle and no html) */}
        {loadingPhase === 'idle' && !htmlContent && (
           <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-50 text-gray-400 font-bold uppercase tracking-wider text-sm pointer-events-none">
              Waiting for code...
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
