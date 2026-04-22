"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle, XCircle, Star, TrendingUp, Briefcase,
  Clock, MapPin, IndianRupee, Bell, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { PORTER_JOBS, EARNINGS, BOOKINGS } from "@/lib/data";
import Link from "next/link";
import { useI18n } from "@/components/I18nProvider";
import { interpolate } from "@/lib/i18n";

export default function PorterDashboard() {
  const { dict } = useI18n();
  const t = dict.porter;

  const [jobs, setJobs] = useState(PORTER_JOBS);
  const [accepted, setAccepted] = useState<string[]>([]);

  const handleAccept = (id: string) => {
    setAccepted((prev) => [...prev, id]);
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  const handleReject = (id: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  const completedBookings = BOOKINGS.filter((b) => b.status === "completed");

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold dark:text-white">{t.title}</h1>
            <p className="text-muted-foreground mt-1">{t.welcome}</p>
          </div>
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-orange/10 flex items-center justify-center cursor-pointer hover:bg-orange/20 transition-colors">
              <Bell className="w-5 h-5 text-orange" />
            </div>
            {jobs.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange rounded-full text-white text-xs flex items-center justify-center font-bold">
                {jobs.length}
              </span>
            )}
          </div>
        </div>

        {/* Earnings Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: t.today, value: `₹${EARNINGS.today}`, icon: IndianRupee, color: "text-green-500" },
            { label: t.thisWeek, value: `₹${EARNINGS.week.toLocaleString()}`, icon: TrendingUp, color: "text-blue-500" },
            { label: t.totalJobs, value: EARNINGS.totalJobs.toLocaleString(), icon: Briefcase, color: "text-purple-500" },
            { label: t.rating, value: `${EARNINGS.rating}★`, icon: Star, color: "text-yellow-500" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass dark:glass-dark rounded-2xl p-5 border border-white/30"
            >
              <item.icon className={`w-5 h-5 ${item.color} mb-3`} />
              <div className="text-xl font-bold dark:text-white">{item.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Completion Rate */}
        <div className="glass dark:glass-dark rounded-2xl p-5 border border-white/30 mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold dark:text-white">{t.completionRate}</span>
            <span className="text-sm font-bold text-orange">{EARNINGS.completionRate}%</span>
          </div>
          <Progress value={EARNINGS.completionRate} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">{t.completionHint}</p>
        </div>

        <Tabs defaultValue="requests">
          <TabsList className="w-full rounded-2xl mb-6 h-11">
            <TabsTrigger value="requests" className="flex-1 rounded-xl text-sm">
              {t.tabRequests} {jobs.length > 0 && <span className="ml-1.5 w-4 h-4 bg-orange text-white rounded-full text-xs flex items-center justify-center">{jobs.length}</span>}
            </TabsTrigger>
            <TabsTrigger value="history" className="flex-1 rounded-xl text-sm">{t.tabHistory}</TabsTrigger>
            <TabsTrigger value="ratings" className="flex-1 rounded-xl text-sm">{t.tabRatings}</TabsTrigger>
          </TabsList>

          {/* Job Requests */}
          <TabsContent value="requests">
            <AnimatePresence>
              {jobs.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 text-muted-foreground"
                >
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="font-medium dark:text-white">{t.noPending}</p>
                  <p className="text-sm mt-1">{t.noPendingHint}</p>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="glass dark:glass-dark rounded-2xl p-5 border border-white/30"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold dark:text-white">{job.passenger}</span>
                            <Badge className="bg-orange/10 text-orange border-0 text-xs">{t.newBadge}</Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">{job.time}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-orange">₹{job.amount}</div>
                          <div className="text-xs text-muted-foreground">{job.luggage}</div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-5">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-orange flex-shrink-0" />
                          <span className="text-muted-foreground">{t.from}</span>
                          <span className="dark:text-white font-medium">{job.from}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                          <span className="text-muted-foreground">{t.to}</span>
                          <span className="dark:text-white font-medium">{job.to}</span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          className="flex-1 rounded-xl border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 dark:border-red-900 dark:hover:bg-red-900/20"
                          onClick={() => handleReject(job.id)}
                        >
                          <XCircle className="w-4 h-4 mr-2" /> {t.decline}
                        </Button>
                        <Button
                          className="flex-1 rounded-xl bg-orange hover:bg-orange/90 text-white"
                          onClick={() => handleAccept(job.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" /> {t.accept}
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>

            {accepted.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-4 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <p className="text-sm text-green-700 dark:text-green-400 font-medium flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> {interpolate(t.acceptedHint, { count: accepted.length })} - {t.headToPlatform}
                </p>
              </motion.div>
            )}
          </TabsContent>

          {/* Job History */}
          <TabsContent value="history">
            <div className="space-y-3">
              {completedBookings.map((b, i) => (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover:border-orange/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm dark:text-white">{b.passenger}</div>
                    <div className="text-xs text-muted-foreground truncate">{b.from} → {b.to}</div>
                    <div className="text-xs text-muted-foreground">{b.date}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-bold text-green-600">+₹{b.amount}</div>
                    {b.rating && (
                      <div className="flex items-center gap-0.5 justify-end mt-0.5">
                        {Array.from({ length: b.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Ratings */}
          <TabsContent value="ratings">
            <div className="glass dark:glass-dark rounded-2xl p-6 border border-white/30 mb-4">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-5xl font-black text-orange">{EARNINGS.rating}</div>
                  <div className="flex gap-0.5 justify-center mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(EARNINGS.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{t.reviewsCount}</div>
                </div>
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const pct = star === 5 ? 78 : star === 4 ? 15 : star === 3 ? 5 : star === 2 ? 1 : 1;
                    return (
                      <div key={star} className="flex items-center gap-2 text-xs">
                        <span className="w-3 text-muted-foreground">{star}</span>
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <Progress value={pct} className="flex-1 h-1.5" />
                        <span className="w-6 text-muted-foreground text-right">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { name: "Arjun Mehta", rating: 5, comment: "Very helpful and punctual. Handled my luggage with care.", date: "Jan 15" },
                { name: "Sneha Reddy", rating: 5, comment: "Excellent service! Will definitely book again.", date: "Jan 14" },
                { name: "Vikram Nair", rating: 4, comment: "Good service, arrived on time.", date: "Jan 12" },
              ].map((r, i) => (
                <motion.div
                  key={r.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="p-4 rounded-2xl bg-card border border-border"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm dark:text-white">{r.name}</span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">{r.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{`"${r.comment}"`}</p>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 p-5 rounded-2xl bg-orange/5 border border-orange/20 flex items-center justify-between">
          <div>
            <p className="font-semibold dark:text-white text-sm">{t.monthEarnings}</p>
            <p className="text-2xl font-bold text-orange mt-1">₹{EARNINGS.month.toLocaleString()}</p>
          </div>
          <Link href="/admin">
            <Button variant="outline" className="rounded-xl border-orange/30 text-orange hover:bg-orange/10 text-sm">
              {t.viewFullReport} <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
