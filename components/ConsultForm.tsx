'use client';

import React, { useState } from 'react';
import { Send, CheckCircle, ChevronDown, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function ConsultForm() {
  const { t, accent } = useLanguage();
  const form = t.consultForm;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat)
        ? prev.filter(c => c !== cat)
        : [...prev, cat]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData.entries());

    // Map fields to API expectations
    const payload = {
      isim: rawData.name,
      email: rawData.email,
      sirket: rawData.company,
      web_sitesi: rawData.website,
      proje_dosyasi: rawData.brief,
      kategori: selectedCategories.join(', '),
      kpi: rawData.message,
      butce: "" // Not currently in UI, but handled by API
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setIsSuccess(true);
        const formElement = e.target as HTMLFormElement;
        formElement.reset();
        setSelectedCategories([]);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error?.message || "İletim sırasında bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setErrorMessage("Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20 px-8 rounded-3xl bg-zinc-900/50 border border-emerald-500/20 backdrop-blur-xl space-y-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 relative z-10">
          <CheckCircle className="w-10 h-10 text-emerald-500" />
        </div>
        <div className="relative z-10">
          <h3 className="text-3xl font-bold text-white mb-4">Protokol Başlatıldı.</h3>
          <p className="text-emerald-400 max-w-md mx-auto leading-relaxed font-medium">
            Analiz talebiniz başarıyla laboratuvara iletildi. Mimarlarımız yakında sizinle iletişime geçecek.
          </p>
        </div>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => setIsSuccess(false)}
          className="relative z-10 text-zinc-500 text-sm font-mono border-b border-zinc-800 pb-0.5 hover:text-white transition-colors"
        >
          Yeni Bir Analiz Başlat
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="relative group/form">
      {/* Decorative Border Glow */}
      <div className="absolute -inset-px bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 rounded-[32px] opacity-20 group-hover/form:opacity-40 transition-opacity" />

      <form
        onSubmit={handleSubmit}
        className="relative bg-zinc-950/40 border border-zinc-800/50 backdrop-blur-xl p-8 md:p-12 rounded-xl shadow-2xl space-y-10"
      >
        {errorMessage && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm font-mono flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            {errorMessage}
          </div>
        )}
        {/* Section 1: Personal & Corporate Info (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3 flex flex-col items-start">
            <label htmlFor="name" className="text-[15px] font-medium text-zinc-300 ml-1">
              {form.nameLabel}
            </label>
            <input
              id="name"
              type="text"
              name="name"
              required
              className="w-full px-6 py-4 rounded-lg bg-zinc-800/30 border border-zinc-700/50 text-zinc-100 placeholder-zinc-500 focus:border-emerald-500/40 focus:ring-4 focus:ring-emerald-500/5 focus:outline-none transition-all duration-300"
              placeholder={form.namePlaceholder}
            />
          </div>

          <div className="space-y-3 flex flex-col items-start">
            <label htmlFor="email" className="text-[15px] font-medium text-zinc-300 ml-1">
              {form.emailLabel}
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className="w-full px-6 py-4 rounded-lg bg-zinc-800/30 border border-zinc-700/50 text-zinc-100 placeholder-zinc-500 focus:border-emerald-500/40 focus:ring-4 focus:ring-emerald-500/5 focus:outline-none transition-all duration-300"
              placeholder={form.emailPlaceholder}
            />
          </div>

          <div className="space-y-3 flex flex-col items-start">
            <label htmlFor="company" className="text-[15px] font-medium text-zinc-300 ml-1">
              {form.companyLabel}
            </label>
            <input
              id="company"
              type="text"
              name="company"
              required
              className="w-full px-6 py-4 rounded-lg bg-zinc-800/30 border border-zinc-700/50 text-zinc-100 placeholder-zinc-500 focus:border-emerald-500/40 focus:ring-4 focus:ring-emerald-500/5 focus:outline-none transition-all duration-300"
              placeholder={form.companyPlaceholder}
            />
          </div>

          <div className="space-y-3 flex flex-col items-start">
            <label htmlFor="website" className="text-[15px] font-medium text-zinc-300 ml-1">
              {form.websiteLabel}
            </label>
            <input
              id="website"
              type="url"
              name="website"
              required
              className="w-full px-6 py-4 rounded-lg bg-zinc-800/30 border border-zinc-700/50 text-zinc-100 placeholder-zinc-500 focus:border-emerald-500/40 focus:ring-4 focus:ring-emerald-500/5 focus:outline-none transition-all duration-300"
              placeholder={form.websitePlaceholder}
            />
          </div>

          <div className="space-y-3 flex flex-col items-start md:col-span-2">
            <div className="flex justify-between items-center w-full px-1">
              <label htmlFor="brief" className="text-[15px] font-medium text-zinc-300">
                {form.briefLabel}
              </label>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest bg-zinc-800/50 px-2 py-0.5 rounded leading-none shrink-0 ml-2">
                {form.optionalLabel}
              </span>
            </div>
            <input
              id="brief"
              type="url"
              name="brief"
              className="w-full px-6 py-4 rounded-lg bg-zinc-800/30 border border-zinc-700/50 text-zinc-100 placeholder-zinc-500 focus:border-emerald-500/40 focus:ring-4 focus:ring-emerald-500/5 focus:outline-none transition-all duration-300"
              placeholder={form.briefPlaceholder + " " + form.optionalLabel}
            />
          </div>
        </div>

        {/* Section 2: Expertise Category (Interactive Pills - Multi-select) */}
        <div className="space-y-6 flex flex-col items-center">
          <label className="text-[15px] font-medium text-zinc-300 text-center w-full">
            {form.categoryTitle}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {form.categories.map((cat: string) => (
              <label
                key={cat}
                className={`group px-6 py-4 rounded-lg border text-sm font-semibold cursor-pointer transition-all duration-300 select-none text-center ${selectedCategories.includes(cat)
                  ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                  : "bg-zinc-800/20 border-zinc-800/80 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                  }`}
              >
                <input
                  type="checkbox"
                  name="expertise"
                  value={cat}
                  className="hidden"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                <span className="capitalize-first">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Section 3: Focused Textarea */}
        <div className="space-y-4 flex flex-col items-center">
          <label htmlFor="message" className="text-[15px] font-medium text-zinc-300 text-center w-full">
            {form.messageLabel}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="w-full px-8 py-6 rounded-xl bg-zinc-800/30 border border-zinc-700/50 text-zinc-100 placeholder-zinc-500 focus:border-emerald-500/40 focus:ring-4 focus:ring-emerald-500/5 focus:outline-none transition-all duration-300 resize-none min-h-[160px]"
            placeholder={form.messagePlaceholder}
          />
        </div>

        {/* Section 4: Submission CTA */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-6 rounded-lg bg-emerald-500 text-zinc-950 font-black text-sm uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:brightness-110 active:scale-[0.98] transition-all disabled:cursor-not-allowed shadow-2xl shadow-emerald-500/20 ${isSubmitting ? 'opacity-70' : ''}`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Analiz Ediliyor...</span>
              </>
            ) : (
              <>
                {form.submitButton}
                <Send className="w-5 h-5 ml-1" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}