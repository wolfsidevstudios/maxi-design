
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Zap, Sparkles } from './Icons';
import { User } from '../types';

interface LoginPageProps {
  onBack: () => void;
  onLoginSuccess: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onBack, onLoginSuccess }) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize Google Sign-In
    if ((window as any).google) {
      (window as any).google.accounts.id.initialize({
        client_id: '562922803230-3oq13i83hsbjlsdc3tu6ie9t9063qpv8.apps.googleusercontent.com',
        callback: handleCredentialResponse
      });

      (window as any).google.accounts.id.renderButton(
        document.getElementById("googleSignInBtn"),
        { theme: "outline", size: "large", width: 300, shape: "pill" }
      );
    }
  }, []);

  const handleCredentialResponse = (response: any) => {
    try {
      // Decode JWT
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const payload = JSON.parse(jsonPayload);
      
      const user: User = {
        name: payload.name,
        email: payload.email,
        picture: payload.picture
      };

      onLoginSuccess(user);
    } catch (e) {
      console.error("Login failed", e);
      setError("Failed to verify Google credentials.");
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#FDFBD4]">
      {/* LEFT: Branding Split (Hidden on Mobile) */}
      <div className="hidden md:flex w-1/2 bg-black text-[#FDFBD4] relative items-center justify-center p-12 overflow-hidden">
         <div className="absolute inset-0 dot-pattern opacity-20"></div>
         <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-[#A3E635] rounded-full blur-[120px] opacity-20 animate-pulse"></div>
         
         <div className="relative z-10 max-w-lg space-y-8">
            <div className="inline-flex items-center gap-2 bg-[#FDFBD4] text-black px-4 py-1.5 rounded-full border-2 border-white shadow-[4px_4px_0px_0px_white]">
               <Sparkles size={14} /> <span className="text-xs font-black uppercase tracking-widest">v3.0 Beta</span>
            </div>
            
            <h1 className="text-7xl font-display font-black uppercase tracking-tighter leading-[0.9]">
               Design <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B4A] to-[#A3E635]">Faster.</span>
            </h1>
            
            <p className="text-xl font-medium text-[#FDFBD4]/80 leading-relaxed">
               Join the thousands of designers using AI to generate production-ready UI in seconds. Login to access your workspace.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-8">
               <div className="p-4 border border-white/20 rounded-xl bg-white/5 backdrop-blur-sm">
                  <div className="font-black text-3xl text-[#A3E635] mb-1">10x</div>
                  <div className="text-xs font-bold uppercase tracking-widest opacity-60">Speed Increase</div>
               </div>
               <div className="p-4 border border-white/20 rounded-xl bg-white/5 backdrop-blur-sm">
                  <div className="font-black text-3xl text-[#FF6B4A] mb-1">0%</div>
                  <div className="text-xs font-bold uppercase tracking-widest opacity-60">Spaghetti Code</div>
               </div>
            </div>
         </div>
      </div>

      {/* RIGHT: Login Form */}
      <div className="w-full md:w-1/2 flex flex-col p-6 md:p-12 relative bg-[#FDFBD4]">
         <button 
           onClick={onBack} 
           className="absolute top-8 left-8 flex items-center gap-2 font-bold uppercase text-xs hover:bg-black/5 px-3 py-2 rounded-lg transition-colors"
         >
            <ArrowLeft size={16} /> Back to Home
         </button>

         <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
            <div className="mb-10 text-center">
               <div className="w-16 h-16 bg-[#FF6B4A] border-4 border-black rounded-2xl flex items-center justify-center text-white font-black text-3xl mb-6 mx-auto shadow-[6px_6px_0px_0px_black] rotate-3">M</div>
               <h2 className="text-4xl font-display font-black uppercase tracking-tight mb-2">Welcome Back</h2>
               <p className="text-gray-500 font-medium">Sign in to continue to Maxi Design.</p>
            </div>

            <div className="w-full space-y-6">
               <div className="flex justify-center">
                  <div id="googleSignInBtn"></div>
               </div>
               
               {error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-lg border border-red-200 text-sm font-bold text-center">
                     {error}
                  </div>
               )}

               <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
                  <div className="relative flex justify-center"><span className="bg-[#FDFBD4] px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Or</span></div>
               </div>

               <div className="text-center">
                  <p className="text-sm font-medium text-gray-500">
                     New to Maxi Design? <br/>
                     <span className="text-black font-medium">Just sign in with Google to create an account.</span>
                  </p>
               </div>
            </div>
         </div>

         <div className="text-center text-xs font-bold text-gray-300 uppercase tracking-widest">
            © 2025 Maxi Design AI
         </div>
      </div>
    </div>
  );
};

export default LoginPage;
