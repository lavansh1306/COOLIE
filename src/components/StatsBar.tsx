"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/components/I18nProvider";

interface PlatformStats {
  totalPassengers: string;
  verifiedPorters: string;
  citiesCovered: string;
  avgRating: string;
}

export default function StatsBar() {
  const { dict } = useI18n();
  const [stats, setStats] = useState<PlatformStats>({
    totalPassengers: "50,000+",
    verifiedPorters: "2,000+",
    citiesCovered: "120+",
    avgRating: "4.8",
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await fetch("/api/stats", { cache: "no-store" });
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as { stats: PlatformStats };
        setStats(data.stats);
      } catch {
        // Keep the seeded fallback values if the API is unavailable.
      }
    };

    void loadStats();
  }, []);

  const items = [
    { label: dict.statsBar.passengersServed, value: stats.totalPassengers },
    { label: dict.statsBar.verifiedPorters, value: stats.verifiedPorters },
    { label: dict.statsBar.citiesCovered, value: stats.citiesCovered },
    { label: dict.statsBar.avgRating, value: `${stats.avgRating}★` },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="glass rounded-2xl p-5 text-center dark:glass-dark"
        >
          <div className="text-2xl font-bold text-orange">{item.value}</div>
          <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
