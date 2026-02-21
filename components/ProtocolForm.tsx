'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Loader2, AlertCircle, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Schema definition
const createSchema = (t: any) => z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    projectStage: z.string().min(1, { message: "Please select a project stage" }),
    message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type FormData = z.infer<ReturnType<typeof createSchema>>;

export default function ProtocolForm() {
    const { t, accent } = useLanguage();
    const p = t.protocol;

    const [isSuccess, setIsSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const schema = createSchema(t);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: { name: '', email: '', projectStage: '', message: '' }
    });

    const onSubmit = async (data: FormData) => {
        setSubmitError(null);

        try {
            const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
            if (!formId) {
                throw new Error("Form ID not configured");
            }

            const response = await fetch(`https://formspree.io/f/${formId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                setIsSuccess(true);
                reset();
            } else {
                setSubmitError(p.errorMessage || "Submission failed");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setSubmitError(p.errorMessage || "Connection error");
        }
    };

    return (
        <div className="w-full h-full flex flex-col justify-center">
            <AnimatePresence mode="wait">
                {isSuccess ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 text-center flex flex-col items-center gap-4"
                    >
                        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-2">
                            <CheckCircle className="w-8 h-8 text-green-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white font-mono">{p.successTitle}</h3>
                        <p className="text-gray-400">{p.successMessage}</p>

                        <button
                            onClick={() => setIsSuccess(false)}
                            className="mt-6 text-sm text-green-400 hover:text-green-300 underline underline-offset-4"
                        >
                            Initialize New Protocol
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden"
                    >
                        {/* Decorative top sheen */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                        <h2 className="text-2xl font-bold text-white mb-2 font-mono flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            {p.formTitle}
                        </h2>
                        {p.formTrigger && <p className="text-xs text-gray-400 mb-6 font-mono border-l-2 border-cyan-500/50 pl-3 py-1">{p.formTrigger}</p>}
                        <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent mb-8" />

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            {/* Name */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">{p.nameLabel}</label>
                                <div className="relative group">
                                    <input
                                        {...register('name')}
                                        type="text"
                                        className="w-full bg-[#0a0a0a]/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-700 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono"
                                        placeholder="Dr. Bektaş Sarı"
                                    />
                                    {errors.name && <p className="text-red-400 text-xs mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name.message}</p>}
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">{p.emailInputLabel}</label>
                                <div className="relative group">
                                    <input
                                        {...register('email')}
                                        type="email"
                                        className="w-full bg-[#0a0a0a]/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-700 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono"
                                        placeholder="info@kognitect.com"
                                    />
                                    {errors.email && <p className="text-red-400 text-xs mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">{p.projectStageLabel}</label>
                                <div className="relative">
                                    <select
                                        {...register('projectStage')}
                                        className="w-full bg-[#0a0a0a]/50 border border-white/10 rounded-xl px-4 py-3 text-gray-300 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="" disabled>Select Stage</option>
                                        <option value="startup">{p.projectStages.startup}</option>
                                        <option value="scaleup">{p.projectStages.scaleup}</option>
                                        <option value="corporate">{p.projectStages.corporate}</option>
                                        <option value="consulting">{p.projectStages.consulting}</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                        ▼
                                    </div>
                                </div>
                                {errors.projectStage && <p className="text-red-400 text-xs mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.projectStage.message}</p>}
                            </div>

                            {/* Message */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">{p.messageLabel}</label>
                                <textarea
                                    {...register('message')}
                                    rows={4}
                                    className="w-full bg-[#0a0a0a]/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-700 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono resize-none"
                                    placeholder={p.messagePlaceholder}
                                />
                                {errors.message && <p className="text-red-400 text-xs mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.message.message}</p>}
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 rounded-xl flex items-center justify-center gap-3 font-bold text-lg transition-all relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-wider"
                                    style={{
                                        background: isSubmitting ? '#1f2937' : `linear-gradient(to right, ${accent.primary}, ${accent.secondary})`,
                                        color: isSubmitting ? '#9ca3af' : '#fff'
                                    }}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span className="font-mono tracking-wider text-sm">{p.submitting}</span>
                                        </>
                                    ) : (
                                        <>
                                            {p.submitButton}
                                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>

                                <AnimatePresence>
                                    {submitError && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono flex items-center justify-center gap-2"
                                        >
                                            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                                            <span dangerouslySetInnerHTML={{ __html: submitError.replace('info@kognitect.com', '<a href="mailto:info@kognitect.com" class="underline hover:text-red-300">info@kognitect.com</a>') }} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {p.freeConsultationNote && !submitError && <p className="text-center text-[10px] text-gray-500 mt-3 font-mono">{p.freeConsultationNote}</p>}
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
