
import React, { useEffect } from 'react';
import { X, ShieldAlert, AlertTriangle, CheckCircle2, Info } from './Icons';

export interface NotificationItem {
  id: string;
  type: 'error' | 'warning' | 'success' | 'info';
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  duration?: number;
}

interface NotificationSystemProps {
  notifications: NotificationItem[];
  onDismiss: (id: string) => void;
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({ notifications, onDismiss }) => {
  return (
    <div className="fixed top-24 right-6 z-[100] flex flex-col gap-4 w-full max-w-[360px] pointer-events-none">
      {notifications.map((note) => (
        <NotificationToast key={note.id} note={note} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const NotificationToast: React.FC<{ note: NotificationItem; onDismiss: (id: string) => void }> = ({ note, onDismiss }) => {
  useEffect(() => {
    if (note.duration) {
      const timer = setTimeout(() => {
        onDismiss(note.id);
      }, note.duration);
      return () => clearTimeout(timer);
    }
  }, [note, onDismiss]);

  const styles = {
    error: { bg: 'bg-[#FF6B4A]', text: 'text-white', icon: ShieldAlert, border: 'border-black' },
    warning: { bg: 'bg-[#FDFBD4]', text: 'text-black', icon: AlertTriangle, border: 'border-black' },
    success: { bg: 'bg-[#A3E635]', text: 'text-black', icon: CheckCircle2, border: 'border-black' },
    info: { bg: 'bg-[#60A5FA]', text: 'text-white', icon: Info, border: 'border-black' },
  };

  const style = styles[note.type];
  const Icon = style.icon;

  return (
    <div className={`pointer-events-auto flex flex-col gap-2 p-4 rounded-xl border-2 ${style.border} ${style.bg} shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-in slide-in-from-right-full duration-300 relative`}>
      <div className="flex gap-3 items-start">
        <div className="shrink-0 mt-0.5">
          <Icon size={20} strokeWidth={2.5} className={style.text} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`font-black uppercase tracking-wider text-xs mb-1 ${style.text}`}>{note.title}</h4>
          <p className={`text-sm font-bold leading-tight ${style.text} opacity-90 break-words`}>{note.message}</p>
          
          {note.actionLabel && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                note.onAction?.();
              }}
              className="mt-3 text-[10px] font-black uppercase tracking-widest bg-white text-black px-3 py-1.5 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_black] transition-all"
            >
              {note.actionLabel}
            </button>
          )}
        </div>
        <button 
          onClick={() => onDismiss(note.id)}
          className={`shrink-0 opacity-70 hover:opacity-100 transition-opacity ${style.text}`}
        >
          <X size={18} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default NotificationSystem;
