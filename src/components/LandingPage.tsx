"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  QrCode, ShieldCheck, CreditCard, ArrowRight,
  Smartphone, Star, Users, TrendingUp, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import StatsBar from "@/components/StatsBar";
import { useI18n } from "@/components/I18nProvider";

const HeroCanvas = dynamic(() => import("@/components/HeroCanvas"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const howRef = useRef<HTMLDivElement>(null);
  const { dict } = useI18n();

  const featureIcons = [QrCode, ShieldCheck, CreditCard];
  const impactIcons = [TrendingUp, Star];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Features scroll reveal
      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: featuresRef.current, start: "top 80%" },
        }
      );
      // How it works reveal
      gsap.fromTo(
        ".step-card",
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: howRef.current, start: "top 75%" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="overflow-hidden">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center pt-16">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-orange/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-orange/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-2 gap-12 items-center py-20">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-orange/10 text-orange text-xs font-semibold px-4 py-2 rounded-full mb-6"
            >
              <span className="w-1.5 h-1.5 bg-orange rounded-full animate-pulse" />
              {dict.landing.liveBadge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight dark:text-white"
            >
              {dict.landing.heroLine1}
              <br />
              <span className="text-orange">{dict.landing.heroAccent}</span>
              <br />
              {dict.landing.heroLine3}
              <br />
              {dict.landing.heroLine4}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-6 text-lg text-muted-foreground max-w-md leading-relaxed"
            >
              {dict.landing.heroDesc}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link href="/book">
                <Button className="bg-orange hover:bg-orange/90 text-white rounded-2xl px-8 h-12 text-base font-semibold shadow-lg shadow-orange/25 group">
                  {dict.landing.heroBookCta}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/porter">
                <Button variant="outline" className="rounded-2xl px-8 h-12 text-base font-semibold border-border hover:border-orange hover:text-orange dark:text-white">
                  {dict.landing.heroPorterCta}
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {["RK", "SY", "MS", "DP"].map((av) => (
                  <div key={av} className="w-8 h-8 rounded-full bg-orange/20 border-2 border-white dark:border-gray-900 flex items-center justify-center text-xs font-bold text-orange">
                    {av}
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground dark:text-white">2,000+</span> {dict.landing.heroPortersReady}
              </div>
            </motion.div>
          </div>

          {/* Right — Three.js canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[420px] lg:h-[520px] rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange/5 to-transparent rounded-3xl" />
            <HeroCanvas />
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <StatsBar />
        </div>
      </section>

      {/* ── Features ── */}
      <section ref={featuresRef} className="py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-orange text-sm font-semibold uppercase tracking-widest mb-3"
            >
              {dict.landing.whyTag}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-bold dark:text-white"
            >
              {dict.landing.whyTitle}
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {dict.landing.features.map((feature, idx) => {
              const Icon = featureIcons[idx];
              return (
                <div
                key={feature.title}
                className="feature-card glass rounded-3xl p-8 dark:glass-dark group hover:border-orange/30 border border-transparent transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-orange/10 flex items-center justify-center mb-6 group-hover:bg-orange/20 transition-colors">
                  {Icon && <Icon className="w-6 h-6 text-orange" />}
                </div>
                <h3 className="text-xl font-bold mb-3 dark:text-white">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            )})}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section ref={howRef} className="py-24 px-4 sm:px-6 bg-secondary/30 dark:bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-orange text-sm font-semibold uppercase tracking-widest mb-3">{dict.landing.processTag}</p>
            <h2 className="text-4xl sm:text-5xl font-bold dark:text-white">{dict.landing.processTitle}</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Passenger */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-xl bg-orange flex items-center justify-center">
                  <Smartphone className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl font-bold dark:text-white">{dict.landing.passengerTitle}</h3>
              </div>
              <div className="space-y-4">
                {dict.landing.passengerSteps.map((s) => (
                  <div key={s.step} className="step-card flex gap-5 p-5 rounded-2xl bg-card border border-border hover:border-orange/30 transition-all">
                    <div className="text-3xl font-black text-orange/20 leading-none w-10 flex-shrink-0">{s.step}</div>
                    <div>
                      <div className="font-semibold dark:text-white">{s.title}</div>
                      <div className="text-sm text-muted-foreground mt-1">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Porter */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-xl bg-gray-800 dark:bg-white flex items-center justify-center">
                  <Users className="w-4 h-4 text-white dark:text-gray-900" />
                </div>
                <h3 className="text-xl font-bold dark:text-white">{dict.landing.porterTitle}</h3>
              </div>
              <div className="space-y-4">
                {dict.landing.porterSteps.map((s) => (
                  <div key={s.step} className="step-card flex gap-5 p-5 rounded-2xl bg-card border border-border hover:border-orange/30 transition-all">
                    <div className="text-3xl font-black text-orange/20 leading-none w-10 flex-shrink-0">{s.step}</div>
                    <div>
                      <div className="font-semibold dark:text-white">{s.title}</div>
                      <div className="text-sm text-muted-foreground mt-1">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Impact ── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-orange text-sm font-semibold uppercase tracking-widest mb-4">{dict.landing.impactTag}</p>
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight dark:text-white">
                {dict.landing.impactTitleLine1}
                <br />
                <span className="text-orange">{dict.landing.impactTitleAccent}</span>
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
                {dict.landing.impactDesc}
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {dict.landing.impactCards.map((item, idx) => {
                  const Icon = impactIcons[idx];
                  return (
                    <div key={item.label} className="p-5 rounded-2xl bg-secondary/50 dark:bg-white/5">
                      {Icon && <Icon className="w-5 h-5 text-orange mb-2" />}
                      <div className="text-2xl font-bold dark:text-white">{item.value}</div>
                      <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass dark:glass-dark rounded-3xl p-8 border border-white/30"
            >
              <div className="text-sm font-semibold text-muted-foreground mb-6">{dict.landing.testimonialsTitle}</div>
              {dict.landing.testimonials.map((t) => (
                <div key={t.name} className="mb-6 last:mb-0 p-5 rounded-2xl bg-white/50 dark:bg-white/5 border border-white/30">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground dark:text-white leading-relaxed">{`"${t.quote}"`}</p>
                  <div className="mt-3 text-xs text-muted-foreground font-medium">{t.name} · {t.station}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA Footer ── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden bg-orange p-12 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange via-orange to-amber-600 opacity-90" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                {dict.landing.ctaTitle}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-md mx-auto">
                {dict.landing.ctaDesc}
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/book">
                  <Button className="bg-white text-orange hover:bg-white/90 rounded-2xl px-8 h-12 text-base font-bold shadow-xl group">
                    {dict.landing.ctaBook}
                    <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/porter">
                  <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded-2xl px-8 h-12 text-base font-semibold">
                    {dict.landing.ctaJoin}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-orange flex items-center justify-center">
              <span className="text-white text-xs font-bold">C</span>
            </div>
            <span className="font-bold dark:text-white">Coolie</span>
          </div>
          <p className="text-sm text-muted-foreground">{dict.landing.copyright}</p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-orange transition-colors">{dict.landing.privacy}</a>
            <a href="#" className="hover:text-orange transition-colors">{dict.landing.terms}</a>
            <a href="#" className="hover:text-orange transition-colors">{dict.landing.contact}</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
