import React from 'react';
import { ArrowLeft, Home } from './Icons';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#FDFBD4] p-6 md:p-12 font-sans text-black animate-in fade-in duration-500">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={onBack}
          className="mb-8 flex items-center gap-2 px-4 py-2 bg-white border-2 border-black rounded-full font-bold uppercase tracking-wider text-xs hover:bg-gray-100 shadow-[2px_2px_0px_0px_black] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[1px_1px_0px_0px_black] transition-all"
        >
          <ArrowLeft size={14} strokeWidth={3} /> Back
        </button>

        <div className="bg-white border-2 border-black rounded-3xl p-8 md:p-12 shadow-[8px_8px_0px_0px_black]">
          <h1 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter mb-8 border-b-4 border-black pb-4">
            Privacy Policy
          </h1>

          <div className="prose prose-lg prose-headings:font-black prose-headings:font-display prose-p:font-medium text-black max-w-none space-y-8">
            <section>
              <h3 className="text-2xl uppercase tracking-tight">1. Introduction</h3>
              <p>
                Maxi Design ("we", "us", or "our") respects your privacy. This Privacy Policy explains how we handle your data when you use our AI-powered mobile app designer. We are committed to transparency and ensuring your data remains under your control.
              </p>
            </section>

            <section>
              <h3 className="text-2xl uppercase tracking-tight">2. Data We Collect</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Local Storage:</strong> Your project data, designs, settings, and API keys are stored locally on your device using your browser's LocalStorage.</li>
                <li><strong>AI Processing:</strong> When you generate a design, your prompt and any reference images are sent to Google's Gemini API for processing.</li>
                <li><strong>No Server Storage:</strong> We do not operate a backend database. We do not store your designs, prompts, or personal information on our servers.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-2xl uppercase tracking-tight">3. API Keys</h3>
              <p>
                If you choose to provide your own Google Gemini API Key:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>It is stored strictly on your device's LocalStorage.</li>
                <li>It is only used to authenticate requests sent directly from your browser to Google's servers.</li>
                <li>It is never transmitted to us or any third party other than Google.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-2xl uppercase tracking-tight">4. Third-Party Services</h3>
              <p>
                Our application relies on <strong>Google Gemini API</strong> for generative AI capabilities. By using this app, you acknowledge that your inputs are processed by Google in accordance with their <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="underline decoration-2 decoration-[#FF6B4A] hover:bg-[#FF6B4A] hover:text-white transition-colors">Privacy Policy</a> and <a href="https://ai.google.dev/gemini-api/terms" target="_blank" rel="noreferrer" className="underline decoration-2 decoration-[#FF6B4A] hover:bg-[#FF6B4A] hover:text-white transition-colors">Terms of Service</a>.
              </p>
            </section>

            <section>
              <h3 className="text-2xl uppercase tracking-tight">5. Changes to Policy</h3>
              <p>
                We may update this policy from time to time. Since we do not collect email addresses, we encourage you to review this page periodically for any changes.
              </p>
            </section>

            <div className="pt-8 mt-8 border-t-2 border-gray-100 text-sm font-bold text-gray-500">
              Last Updated: October 2024
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;