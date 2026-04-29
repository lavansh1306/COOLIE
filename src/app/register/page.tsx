"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/AuthProvider";

type Role = "passenger" | "porter";

export default function RegisterPage() {
  const router = useRouter();
  const { user, loading, refresh } = useAuth();
  const [role, setRole] = useState<Role>("passenger");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [station, setStation] = useState("New Delhi Railway Station");
  const [experience, setExperience] = useState("1 yr");
  const [price, setPrice] = useState("70");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) {
      router.replace(user.role === "porter" ? "/porter" : user.role === "admin" ? "/admin" : "/book");
    }
  }, [loading, router, user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          station: role === "porter" ? station : undefined,
          experience: role === "porter" ? experience : undefined,
          price: role === "porter" ? Number(price) : undefined,
        }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        setError(data.error ?? "Unable to create account.");
        return;
      }

      await refresh();
      router.replace(role === "porter" ? "/porter" : "/book");
    } catch {
      setError("Unable to reach the server.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-[0.95fr_1.05fr] gap-8 items-stretch">
        <section className="rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-orange-900 text-white p-8 sm:p-12 overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,106,0,0.25),transparent_35%)]" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">
              <UserPlus className="w-3.5 h-3.5" />
              Create a new role-aware account
            </div>
            <h1 className="mt-6 text-4xl sm:text-5xl font-black leading-tight tracking-tight">
              Register a customer or porter account.
            </h1>
            <p className="mt-4 text-lg text-white/80 leading-relaxed max-w-md">
              The account you create will be stored in SQLite and immediately usable on the appropriate dashboard.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Customer accounts can book and track porter requests.",
                "Porter accounts can accept incoming jobs and see earnings.",
                "Everything is linked to the database, including the auth session.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <BadgeCheck className="mt-0.5 w-5 h-5 text-orange-300" />
                  <p className="text-sm text-white/85 leading-relaxed">{item}</p>
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
              <UserPlus className="w-5 h-5 text-orange" />
            </div>
            <div>
              <h2 className="text-2xl font-bold dark:text-white">Create account</h2>
              <p className="text-sm text-muted-foreground">Start with a customer account, or register as a coolie.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-sm font-medium dark:text-white mb-2 block">Role</Label>
              <select value={role} onChange={(event) => setRole(event.target.value as Role)} className="w-full h-12 rounded-xl border border-input bg-background px-3 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-orange/50">
                <option value="passenger">Customer</option>
                <option value="porter">Coolie</option>
              </select>
            </div>

            <div>
              <Label className="text-sm font-medium dark:text-white mb-2 block">Full name</Label>
              <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Arjun Mehta" className="rounded-xl h-12" />
            </div>

            <div>
              <Label className="text-sm font-medium dark:text-white mb-2 block">Email</Label>
              <Input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@coolie.demo" className="rounded-xl h-12" />
            </div>

            <div>
              <Label className="text-sm font-medium dark:text-white mb-2 block">Password</Label>
              <Input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Choose a secure password" className="rounded-xl h-12" />
            </div>

            {role === "porter" && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium dark:text-white mb-2 block">Station</Label>
                  <select value={station} onChange={(event) => setStation(event.target.value)} className="w-full h-12 rounded-xl border border-input bg-background px-3 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-orange/50">
                    <option>New Delhi Railway Station</option>
                    <option>Mumbai CST</option>
                    <option>Bangalore City Junction</option>
                    <option>Chennai Central</option>
                    <option>Howrah Junction</option>
                  </select>
                </div>
                <div>
                  <Label className="text-sm font-medium dark:text-white mb-2 block">Experience</Label>
                  <Input value={experience} onChange={(event) => setExperience(event.target.value)} placeholder="3 yrs" className="rounded-xl h-12" />
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-sm font-medium dark:text-white mb-2 block">Price per trip (INR)</Label>
                  <Input value={price} onChange={(event) => setPrice(event.target.value)} inputMode="numeric" placeholder="70" className="rounded-xl h-12" />
                </div>
              </div>
            )}

            {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-900/20 dark:text-red-300">{error}</div>}

            <Button type="submit" disabled={submitting} className="w-full h-12 rounded-2xl bg-orange hover:bg-orange/90 text-white text-base font-semibold shadow-lg shadow-orange/20">
              {submitting ? "Creating account..." : "Create account"}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>

          <p className="mt-6 text-sm text-muted-foreground">
            Already have an account? <Link href="/login" className="font-semibold text-orange">Sign in</Link>.
          </p>
        </motion.section>
      </div>
    </main>
  );
}