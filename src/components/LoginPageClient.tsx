"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, KeyRound, LogIn, Shield, TrainFront, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/AuthProvider";

type Role = "passenger" | "porter" | "admin";

const ROLE_ROUTES: Record<Role, string> = {
  passenger: "/book",
  porter: "/porter",
  admin: "/admin",
};

interface LoginPageClientProps {
  initialRole?: Role;
}

export default function LoginPageClient({ initialRole = "passenger" }: LoginPageClientProps) {
  const router = useRouter();
  const { user, loading, refresh } = useAuth();
  const [role, setRole] = useState<Role>(initialRole);
  const [email, setEmail] = useState(initialRole === "porter" ? "ramesh.kumar@coolie.demo" : initialRole === "admin" ? "admin@coolie.demo" : "arjun.mehta@coolie.demo");
  const [password, setPassword] = useState(initialRole === "admin" ? "admin123" : "password123");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace(ROLE_ROUTES[user.role]);
    }
  }, [loading, router, user]);

  useEffect(() => {
    setRole(initialRole);
    setEmail(initialRole === "porter" ? "ramesh.kumar@coolie.demo" : initialRole === "admin" ? "admin@coolie.demo" : "arjun.mehta@coolie.demo");
    setPassword(initialRole === "admin" ? "admin123" : "password123");
  }, [initialRole]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        setError(data.error ?? "Login failed.");
        return;
      }

      await refresh();
      router.replace(ROLE_ROUTES[role]);
    } catch {
      setError("Unable to reach the server.");
    } finally {
      setSubmitting(false);
    }
  };

  const demoCredentials = [
    { label: "Customer", role: "passenger" as const, email: "arjun.mehta@coolie.demo", password: "password123" },
    { label: "Coolie", role: "porter" as const, email: "ramesh.kumar@coolie.demo", password: "password123" },
    { label: "Admin", role: "admin" as const, email: "admin@coolie.demo", password: "admin123" },
  ];

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-stretch">
        <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-orange via-orange to-amber-600 text-white p-8 sm:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.18),transparent_30%)]" />
          <div className="relative max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
              <Shield className="w-3.5 h-3.5" />
              Secure role-based access
            </div>
            <h1 className="mt-6 text-4xl sm:text-5xl font-black leading-tight tracking-tight">
              Sign in as a customer, porter, or admin.
            </h1>
            <p className="mt-4 max-w-lg text-white/85 text-lg leading-relaxed">
              Every booking, job request, and status update is now stored in SQLite and shown from the database-backed dashboard.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { icon: TrainFront, title: "Customer view", desc: "Book, pay, and track your porter requests." },
                { icon: UserRound, title: "Coolie view", desc: "Accept jobs and track your earnings live." },
                { icon: KeyRound, title: "Admin view", desc: "See all bookings, porters, and revenue." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                  <item.icon className="w-5 h-5" />
                  <div className="mt-3 font-semibold">{item.title}</div>
                  <div className="mt-1 text-sm text-white/80 leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="glass dark:glass-dark rounded-[2rem] p-6 sm:p-8 border border-white/30"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-2xl bg-orange/10 flex items-center justify-center">
              <LogIn className="w-5 h-5 text-orange" />
            </div>
            <div>
              <h2 className="text-2xl font-bold dark:text-white">Welcome back</h2>
              <p className="text-sm text-muted-foreground">Use the demo accounts below or sign in with your own account.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-sm font-medium dark:text-white mb-2 block">Role</Label>
              <select
                value={role}
                onChange={(event) => {
                  const nextRole = event.target.value as Role;
                  setRole(nextRole);
                  setEmail(nextRole === "porter" ? "ramesh.kumar@coolie.demo" : nextRole === "admin" ? "admin@coolie.demo" : "arjun.mehta@coolie.demo");
                  setPassword(nextRole === "admin" ? "admin123" : "password123");
                }}
                className="w-full h-12 rounded-xl border border-input bg-background px-3 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-orange/50"
              >
                <option value="passenger">Customer</option>
                <option value="porter">Coolie</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <Label className="text-sm font-medium dark:text-white mb-2 block">Email</Label>
              <Input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@coolie.demo" className="rounded-xl h-12" />
            </div>

            <div>
              <Label className="text-sm font-medium dark:text-white mb-2 block">Password</Label>
              <Input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Enter your password" className="rounded-xl h-12" />
            </div>

            {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-900/20 dark:text-red-300">{error}</div>}

            <Button type="submit" disabled={submitting} className="w-full h-12 rounded-2xl bg-orange hover:bg-orange/90 text-white text-base font-semibold shadow-lg shadow-orange/20">
              {submitting ? "Signing in..." : "Sign in"}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>

          <div className="mt-6 grid gap-3">
            <div className="rounded-2xl bg-secondary/50 dark:bg-white/5 p-4">
              <div className="text-sm font-semibold dark:text-white mb-2">Demo credentials</div>
              <div className="space-y-2 text-xs text-muted-foreground">
                {demoCredentials.map((demo) => (
                  <button
                    key={demo.label}
                    type="button"
                    onClick={() => {
                      setRole(demo.role);
                      setEmail(demo.email);
                      setPassword(demo.password);
                    }}
                    className="flex w-full items-center justify-between rounded-xl border border-border bg-background px-3 py-2 text-left transition-colors hover:border-orange/40 dark:bg-transparent"
                  >
                    <span className="font-medium text-foreground dark:text-white">{demo.label}</span>
                    <span className="font-mono">{demo.email}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              New here? <Link href="/register" className="font-semibold text-orange">Create an account</Link>.
            </div>
          </div>
        </motion.section>
      </div>

      <div className="max-w-6xl mx-auto mt-8 grid md:grid-cols-3 gap-4">
        {demoCredentials.map((demo) => (
          <div key={demo.label} className="glass dark:glass-dark rounded-2xl p-4 border border-white/20">
            <div className="flex items-center justify-between">
              <div className="font-semibold dark:text-white">{demo.label}</div>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </div>
            <div className="mt-2 text-xs text-muted-foreground">{demo.email}</div>
            <div className="text-xs text-muted-foreground">Password: {demo.password}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
