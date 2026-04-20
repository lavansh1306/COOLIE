"use client";

import { motion } from "framer-motion";
import { STATS } from "@/lib/data";

const items = [
  { label: "Passengers Served", value: STATS.totalPassengers },
  { label: "Verified Porters", value: STATS.totalPorters },
  { label: "Cities Covered", value: STATS.citiesCovered },
  { label: "Avg Rating", value: STATS.avgRating + "★" },
];

export default function StatsBar() {
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
