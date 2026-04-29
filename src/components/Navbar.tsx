"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Menu, X, Moon, Sun, Luggage, LogIn, LogOut, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/I18nProvider";
import { LOCALE_OPTIONS, Locale } from "@/lib/i18n";
import { useAuth } from "@/components/AuthProvider";

export default function Navbar({ dark, toggleDark }: { dark: boolean; toggleDark: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { dict, locale, setLocale } = useI18n();
  const { user, loading, signOut } = useAuth();

  const navLinks = [
    { label: dict.navbar.home, href: "/" },
    { label: dict.navbar.bookPorter, href: "/book" },
    { label: dict.navbar.porterDashboard, href: "/porter" },
    { label: dict.navbar.admin, href: "/admin" },
  ];

  const authLabel = user ? (user.role === "passenger" ? "Customer" : user.role === "porter" ? "Coolie" : "Admin") : "Guest";
  const authHref = user ? (user.role === "porter" ? "/porter" : user.role === "admin" ? "/admin" : "/book") : "/login";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-sm" : "bg-transparent"
      } ${dark ? "dark" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-orange flex items-center justify-center">
            <Luggage className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight dark:text-white">
            Coolie
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                pathname === link.href
                  ? "text-orange bg-orange/10"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {!loading && user ? (
            <div className="hidden md:flex items-center gap-2">
              <Link href={authHref} className="px-3 py-2 rounded-xl bg-secondary/70 border border-border text-xs font-semibold dark:text-white">
                <UserRound className="inline-block w-3.5 h-3.5 mr-1.5 align-[-2px] text-orange" />
                {user.name} · {authLabel}
              </Link>
              <button
                onClick={async () => {
                  await signOut();
                  router.push("/");
                }}
                className="p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10 transition-all"
                aria-label="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/login" className="px-3 py-2 rounded-xl text-xs font-semibold text-foreground hover:bg-secondary/70 dark:text-white">
                <LogIn className="inline-block w-3.5 h-3.5 mr-1.5 align-[-2px]" />
                Login
              </Link>
              <Link href="/register" className="px-3 py-2 rounded-xl text-xs font-semibold bg-secondary/70 text-foreground hover:bg-secondary dark:text-white">
                Create Account
              </Link>
            </div>
          )}
          <div className="hidden md:flex items-center gap-2 pr-1">
            <span className="text-xs text-muted-foreground">{dict.navbar.language}</span>
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value as Locale)}
              className="h-8 rounded-lg border border-input bg-background px-2 text-xs dark:text-white"
            >
              {LOCALE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={toggleDark}
            className="p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10 transition-all"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link href="/book" className="hidden md:block">
            <Button className="bg-orange hover:bg-orange/90 text-white rounded-xl px-5 h-9 text-sm font-semibold shadow-none">
              {dict.navbar.bookNow}
            </Button>
          </Link>
          <button
            className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/20 dark:border-white/10"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    pathname === link.href
                      ? "text-orange bg-orange/10"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="px-4 py-2 mt-1 rounded-xl bg-background/70 border border-border">
                <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground mb-1">
                  <span>{user ? `${user.name} · ${authLabel}` : "Guest"}</span>
                  {user && (
                    <button
                      onClick={async () => {
                        setOpen(false);
                        await signOut();
                        router.push("/");
                      }}
                      className="text-orange font-semibold"
                    >
                      Logout
                    </button>
                  )}
                </div>
                {!user && (
                  <div className="grid grid-cols-2 gap-2">
                    <Link href="/login" onClick={() => setOpen(false)}>
                      <Button variant="outline" className="w-full rounded-xl text-xs h-9">
                        Login
                      </Button>
                    </Link>
                    <Link href="/register" onClick={() => setOpen(false)}>
                      <Button className="w-full rounded-xl text-xs h-9 bg-orange hover:bg-orange/90 text-white">
                        Register
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              <div className="px-4 py-2 mt-1 rounded-xl bg-background/70 border border-border">
                <label className="text-xs text-muted-foreground mb-1 block">{dict.navbar.language}</label>
                <select
                  value={locale}
                  onChange={(e) => setLocale(e.target.value as Locale)}
                  className="w-full h-9 rounded-lg border border-input bg-background px-2 text-sm dark:text-white"
                >
                  {LOCALE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <Link href="/book" onClick={() => setOpen(false)}>
                <Button className="w-full mt-2 bg-orange hover:bg-orange/90 text-white rounded-xl">
                  {dict.navbar.bookNow}
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
