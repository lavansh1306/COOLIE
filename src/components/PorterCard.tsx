"use client";

import { motion } from "framer-motion";
import { Star, MapPin, Briefcase, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/I18nProvider";

interface Porter {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviews: number;
  price: number;
  distance: string;
  available: boolean;
  experience: string;
  completedJobs: number;
  badge: string | null;
}

interface PorterCardProps {
  porter: Porter;
  selected?: boolean;
  onSelect?: (id: string) => void;
}

export default function PorterCard({ porter, selected, onSelect }: PorterCardProps) {
  const { dict } = useI18n();

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 20px 60px rgba(255,106,0,0.12)" }}
      whileTap={{ scale: 0.98 }}
      onClick={() => porter.available && onSelect?.(porter.id)}
      className={`relative rounded-2xl p-5 cursor-pointer transition-all duration-200 border ${
        selected
          ? "border-orange bg-orange/5 shadow-lg orange-glow"
          : "border-border bg-card hover:border-orange/30"
      } ${!porter.available ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {selected && (
        <div className="absolute top-4 right-4">
          <CheckCircle className="w-5 h-5 text-orange" />
        </div>
      )}

      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-2xl bg-orange/10 flex items-center justify-center flex-shrink-0">
          <span className="text-orange font-bold text-sm">{porter.avatar}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-sm dark:text-white">{porter.name}</h3>
            {porter.badge && (
              <Badge className="text-xs bg-orange/10 text-orange border-0 px-2 py-0">
                {porter.badge}
              </Badge>
            )}
            {!porter.available && (
              <Badge variant="secondary" className="text-xs">{dict.porterCard.busy}</Badge>
            )}
          </div>

          <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground flex-wrap">
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-foreground dark:text-white">{porter.rating}</span>
              <span>({porter.reviews})</span>
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {porter.distance}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="w-3 h-3" />
              {porter.completedJobs} {dict.porterCard.jobs}
            </span>
          </div>
        </div>

        <div className="text-right flex-shrink-0">
          <div className="text-lg font-bold text-orange">₹{porter.price}</div>
          <div className="text-xs text-muted-foreground">{dict.porterCard.perTrip}</div>
        </div>
      </div>

      {onSelect && porter.available && (
        <Button
          className={`w-full mt-4 rounded-xl h-9 text-sm font-semibold transition-all ${
            selected
              ? "bg-orange text-white hover:bg-orange/90"
              : "bg-secondary text-foreground hover:bg-orange hover:text-white"
          }`}
          onClick={(e) => { e.stopPropagation(); onSelect(porter.id); }}
        >
          {selected ? dict.porterCard.selected : dict.porterCard.selectPorter}
        </Button>
      )}
    </motion.div>
  );
}
