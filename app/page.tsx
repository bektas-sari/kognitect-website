import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-slate-100 overflow-hidden">
      {/* Arkaplan aura’ları */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl animate-pulse" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl animate-[pulse_6s_ease-in-out_infinite]" />
        <div className="absolute -bottom-40 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      {/* Üst bar */}
      <header className="flex items-center justify-between px-6 py-5 md:px-12 md:py-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/60 shadow-lg shadow-cyan-500/10">
            <span className="text-xs font-semibold tracking-[0.2em] text-cyan-400">
              KG
            </span>
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
              KOGNITECT
            </p>
            <p className="text-[11px] text-slate-500">
              Cognitive Product Architecture Lab
            </p>
          </div>
        </div>

        <div className="hidden text-[11px] font-medium text-slate-500 md:inline-flex gap-4">
          <span>Cloudflare DNS</span>
          <span>Vercel Edge</span>
          <span>Next.js</span>
        </div>
      </header>

      {/* Ana içerik */}
      <main className="flex flex-col items-center px-6 pb-16 pt-6 md:px-12 md:pb-20 md:pt-10">
        <section className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          {/* Başlık */}
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/70 px-3 py-1 text-[11px] font-medium text-slate-300 shadow-md shadow-black/40 mb-6">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-[pulse_1.8s_ease-in-out_infinite]" />
            <span>AI · Perception · Cognitive UX</span>
          </div>

          <h1 className="text-balance bg-gradient-to-r from-cyan-300 via-sky-200 to-violet-300 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
            We don&apos;t just design interfaces.
            <span className="block text-slate-300/90">
              We architect cognitive experiences.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-balance text-sm md:text-lg leading-relaxed text-slate-300">
            Kognitect is a studio that blends{" "}
            <span className="font-semibold text-slate-50">
              neuroscience, behavioral science and product design
            </span>{" "}
            to build digital products that work with the brain – not
            against it. From cognitive diagnostics to attention-aware UX.
          </p>

          {/* Coming soon kartı */}
          <div className="mt-10 w-full max-w-xl rounded-2xl border border-slate-700/70 bg-slate-900/70 p-6 backdrop-blur-md shadow-[0_18px_45px_rgba(15,23,42,0.9)]">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                  Status
                </p>
                <p className="mt-1 text-sm font-medium text-slate-100">
                  Private beta · Coming soon
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  Initial launch:{" "}
                  <span className="font-medium text-slate-200">
                    Cognitive Diagnostics · Perception-first UX audits
                  </span>
                </p>
              </div>

              <div className="flex flex-col items-stretch gap-3 md:w-48">
                <a
                  href="mailto:hello@kognitect.com?subject=Kognitect%20–%20Early%20Access"
                  className="group inline-flex items-center justify-center rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/40 transition hover:bg-cyan-400"
                >
                  Request early access
                  <span className="ml-1.5 text-xs transition-transform group-hover:translate-x-0.5">
                    ↗
                  </span>
                </a>
                <p className="text-[11px] text-center text-slate-400">
                  info@kognitect.com
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Alt bilgi */}
        <footer className="mt-10 flex w-full max-w-4xl flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-6 text-xs text-slate-500 md:flex-row">
          <p className="text-[11px]">
            © {new Date().getFullYear()} Kognitect · Cognitive Product
            Architecture by Bektaş Sarı
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px]">
            <span>kognitect.com</span>
            <span className="h-1 w-1 rounded-full bg-slate-600" />
            <a
              href="https://www.linkedin.com/in/bektas-sari"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              LinkedIn
            </a>
            <span className="h-1 w-1 rounded-full bg-slate-600" />
            <span>Built with Next.js · Deployed on Vercel</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
