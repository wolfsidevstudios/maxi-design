
import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import { Copy, CheckCircle2 } from './Icons';

interface CodeEditorProps {
  code: string;
  onChange: (newCode: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange }) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newValue = code.substring(0, start) + '  ' + code.substring(end);
      
      onChange(newValue);
      
      // Restore selection
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-white font-mono text-sm relative">
      <div className="flex justify-between items-center p-3 bg-[#252526] border-b border-[#333]">
         <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">HTML / Tailwind</div>
         <button 
           onClick={handleCopy}
           className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#333] hover:bg-[#444] transition-colors text-xs font-bold text-gray-300"
         >
           {copied ? <CheckCircle2 size={14} className="text-green-500"/> : <Copy size={14} />}
           {copied ? 'Copied' : 'Copy Code'}
         </button>
      </div>

      <div className="relative flex-1 overflow-hidden">
        {/* Syntax Highlight Layer */}
        <pre 
          className="absolute inset-0 m-0 p-4 pointer-events-none overflow-auto custom-scrollbar language-html z-0"
          aria-hidden="true"
        >
          <code className="language-html">
             {code}
          </code>
        </pre>

        {/* Editing Layer */}
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="absolute inset-0 w-full h-full p-4 bg-transparent text-transparent caret-white outline-none resize-none font-mono z-10 overflow-auto custom-scrollbar whitespace-pre"
          spellCheck={false}
          style={{
             lineHeight: '1.5',
             fontSize: '13px'
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
