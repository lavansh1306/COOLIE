"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Briefcase, CheckCircle, Clock, IndianRupee, Search, Star, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthGuard } from "@/components/useAuthGuard";
import { useI18n } from "@/components/I18nProvider";

type Dashboard = {
  bookings: Array<{ id: string; passenger: string; porter: string; from: string; to: string; status: string; amount: number; date: string }>;
  porters: Array<{ id: string; name: string; avatar: string; rating: number; reviews: number; price: number; distance: string; available: boolean; experience: string; completedJobs: number; badge: string | null }>;
  summary: { totalBookings: number; activePorters: number; revenue: number; completionRate: number };
};

export default function AdminDashboardClient() {
  const { dict } = useI18n();
  const t = dict.admin;
  useAuthGuard(["admin"], "/login?role=admin");

  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [bookingSearch, setBookingSearch] = useState("");
  const [porterSearch, setPorterSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/admin/dashboard", { cache: "no-store" });
        if (!response.ok) throw new Error("Failed to load");
        setDashboard((await response.json()) as Dashboard);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  if (loading || !dashboard) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-4">
        <div className="text-center text-muted-foreground">
          <div className="w-14 h-14 rounded-full border-4 border-orange/20 border-t-orange animate-spin mx-auto mb-4" />
          Loading admin dashboard...
        </div>
      </div>
    );
  }

  const statusConfig = {
    completed: { label: t.statusCompleted, color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400", icon: CheckCircle },
    active: { label: t.statusActive, color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", icon: Clock },
    pending: { label: t.statusPending, color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400", icon: AlertCircle },
    cancelled: { label: "Cancelled", color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300", icon: AlertCircle },
  } as const;

  const filteredBookings = dashboard.bookings.filter((booking) => booking.passenger.toLowerCase().includes(bookingSearch.toLowerCase()) || booking.porter.toLowerCase().includes(bookingSearch.toLowerCase()) || booking.id.toLowerCase().includes(bookingSearch.toLowerCase()));
  const filteredPorters = dashboard.porters.filter((porter) => porter.name.toLowerCase().includes(porterSearch.toLowerCase()));

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-orange/10 text-orange text-xs font-semibold px-3 py-1.5 rounded-full mb-4"><span className="w-1.5 h-1.5 bg-orange rounded-full" /> {t.panelTag}</div>
          <h1 className="text-3xl font-bold dark:text-white">{t.title}</h1>
          <p className="text-muted-foreground mt-1">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: t.totalBookings, value: dashboard.summary.totalBookings, icon: Briefcase, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
            { label: t.activePorters, value: dashboard.summary.activePorters, icon: Users, color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20" },
            { label: t.revenue, value: `₹${dashboard.summary.revenue.toLocaleString()}`, icon: IndianRupee, color: "text-orange", bg: "bg-orange/10" },
            { label: t.completionRate, value: `${dashboard.summary.completionRate}%`, icon: TrendingUp, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
          ].map((kpi, index) => (
            <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} className="glass dark:glass-dark rounded-2xl p-5 border border-white/30">
              <div className={`w-10 h-10 rounded-xl ${kpi.bg} flex items-center justify-center mb-4`}><kpi.icon className={`w-5 h-5 ${kpi.color}`} /></div>
              <div className="text-2xl font-bold dark:text-white">{kpi.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{kpi.label}</div>
            </motion.div>
          ))}
        </div>

        <Tabs defaultValue="bookings">
          <TabsList className="w-full rounded-2xl mb-6 h-11">
            <TabsTrigger value="bookings" className="flex-1 rounded-xl text-sm">{t.tabBookings} ({dashboard.bookings.length})</TabsTrigger>
            <TabsTrigger value="porters" className="flex-1 rounded-xl text-sm">{t.tabPorters} ({dashboard.porters.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <div className="mb-4 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder={t.bookingSearchPlaceholder} value={bookingSearch} onChange={(event) => setBookingSearch(event.target.value)} className="pl-10 rounded-xl h-11" />
            </div>
            <div className="hidden md:block glass dark:glass-dark rounded-2xl border border-white/30 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">{[t.tableBookingId, t.tablePassenger, t.tablePorter, t.tableRoute, t.tableAmount, t.tableStatus, t.tableDate].map((heading) => <th key={heading} className="text-left text-xs font-semibold text-muted-foreground px-5 py-4 uppercase tracking-wider">{heading}</th>)}</tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking, index) => {
                    const status = statusConfig[booking.status as keyof typeof statusConfig] ?? statusConfig.pending;
                    return (
                      <motion.tr key={booking.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.04 }} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                        <td className="px-5 py-4 text-sm font-mono text-orange">{booking.id}</td>
                        <td className="px-5 py-4 text-sm font-medium dark:text-white">{booking.passenger}</td>
                        <td className="px-5 py-4 text-sm text-muted-foreground">{booking.porter}</td>
                        <td className="px-5 py-4 text-sm text-muted-foreground max-w-[180px] truncate">{booking.from.split(" ")[0]} → {booking.to}</td>
                        <td className="px-5 py-4 text-sm font-semibold dark:text-white">₹{booking.amount}</td>
                        <td className="px-5 py-4"><span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${status.color}`}><status.icon className="w-3 h-3" />{status.label}</span></td>
                        <td className="px-5 py-4 text-sm text-muted-foreground">{booking.date}</td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="md:hidden space-y-3">
              {filteredBookings.map((booking, index) => {
                const status = statusConfig[booking.status as keyof typeof statusConfig] ?? statusConfig.pending;
                return (
                  <motion.div key={booking.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="p-4 rounded-2xl bg-card border border-border">
                    <div className="flex items-center justify-between mb-3"><span className="text-xs font-mono text-orange">{booking.id}</span><span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${status.color}`}><status.icon className="w-3 h-3" />{status.label}</span></div>
                    <div className="text-sm font-medium dark:text-white mb-1">{booking.passenger}</div>
                    <div className="text-xs text-muted-foreground mb-2">{t.porterPrefix} {booking.porter}</div>
                    <div className="flex items-center justify-between"><span className="text-xs text-muted-foreground">{booking.date}</span><span className="font-bold text-sm dark:text-white">₹{booking.amount}</span></div>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="porters">
            <div className="mb-4 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder={t.porterSearchPlaceholder} value={porterSearch} onChange={(event) => setPorterSearch(event.target.value)} className="pl-10 rounded-xl h-11" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {filteredPorters.map((porter, index) => (
                <motion.div key={porter.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} className="glass dark:glass-dark rounded-2xl p-5 border border-white/30">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-orange/10 flex items-center justify-center flex-shrink-0"><span className="text-orange font-bold text-sm">{porter.avatar}</span></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm dark:text-white">{porter.name}</span>
                        {porter.badge && <Badge className="text-xs bg-orange/10 text-orange border-0 px-2 py-0">{porter.badge}</Badge>}
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${porter.available ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"}`}>{porter.available ? t.available : t.busy}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground flex-wrap"><span className="flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {porter.rating} ({porter.reviews})</span><span>{porter.completedJobs} {t.jobs}</span><span>{porter.experience}</span></div>
                    </div>
                    <div className="text-right flex-shrink-0"><div className="text-lg font-bold text-orange">₹{porter.price}</div><div className="text-xs text-muted-foreground">{t.perTrip}</div></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}