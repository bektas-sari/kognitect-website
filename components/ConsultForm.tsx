"use client";
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Send } from 'lucide-react';

export default function ConsultForm() {
  // KRİTİK: 'mqazqozk' yerine Formspree dashboard'undan aldığın GÜNCEL ID'yi yaz.
  // "Form not found" alıyorsan bu ID ya yanlıştır ya da form silinmiştir.
  const [state, handleSubmit] = useForm("mnjqekky"); 

  if (state.succeeded) {
    return (
      <div className="p-8 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-center">
        <p className="text-blue-400 font-bold uppercase tracking-widest text-sm">Protocol Initialized.</p>
        <p className="text-gray-500 mt-2 text-xs">The architect will contact you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left max-w-lg mx-auto">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1 tracking-tight">Name</label>
        <input 
          id="name" type="text" name="name" required 
          className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700 font-sans" 
          placeholder="Dr. Bektaş Sarı" 
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1 tracking-tight">Email</label>
        <input 
          id="email" type="email" name="email" required 
          className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700 font-sans" 
          placeholder="info@kognitect.com" 
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1 tracking-tight">Project Brief</label>
        <textarea 
          id="message" name="message" rows={4} required 
          className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-700 font-sans resize-none" 
          placeholder="Describe the structural problem or the vision..." 
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs mt-1" />
      </div>

      <button 
        type="submit" 
        disabled={state.submitting}
        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-lg shadow-blue-900/20 disabled:opacity-50"
      >
        <Send className="w-4 h-4" /> 
        {state.submitting ? "Processing..." : "Initialize Protocol"}
      </button>
    </form>
  );
}