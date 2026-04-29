"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  CreditCard,
  Lock,
  MapPin,
  Smartphone,
  Star,
  Train,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import PorterCard from "@/components/PorterCard";
import { useAuthGuard } from "@/components/useAuthGuard";
import { useI18n } from "@/components/I18nProvider";
import { interpolate } from "@/lib/i18n";
import { STATIONS } from "@/lib/data";

type PorterOption = {
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
  station: string;
};

type BookingRecord = {
  id: string;
  passenger: string;
  porter: string;
  from: string;
  to: string;
  station: string;
  status: string;
  amount: number;
  date: string;
  pnr: string;
};

const slide = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
  transition: { duration: 0.3, ease: "easeInOut" as const },
};

export default function BookPageClient() {
  const { dict } = useI18n();
  const t = dict.book;
  const { user, loading, authorized } = useAuthGuard(["passenger"], "/login?role=passenger");

  const [step, setStep] = useState(0);
  const [pnr, setPnr] = useState("");
  const [station, setStation] = useState("");
  const [dropLocation, setDropLocation] = useState("");
  const [selectedPorter, setSelectedPorter] = useState<string | null>(null);
  const [negotiatedPrice, setNegotiatedPrice] = useState<number | null>(null);
  const [payMethod, setPayMethod] = useState<"upi" | "card" | "wallet">("upi");
  const [upiId, setUpiId] = useState("");
  const [booked, setBooked] = useState(false);
  const [booking, setBooking] = useState<BookingRecord | null>(null);
  const [porters, setPorters] = useState<PorterOption[]>([]);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authorized) return;

    const load = async () => {
      setLoadingData(true);
      setError(null);
      try {
        const response = await fetch("/api/bookings", { cache: "no-store" });
        if (!response.ok) throw new Error("Failed to load");
        const data = (await response.json()) as { bookings: BookingRecord[]; porters: PorterOption[] };
        setBookings(data.bookings);
        setPorters(data.porters);
      } catch {
        setError("Unable to load the booking dashboard.");
      } finally {
        setLoadingData(false);
      }
    };

    void load();
  }, [authorized]);

  const porter = useMemo(() => porters.find((item) => item.id === selectedPorter) ?? null, [porters, selectedPorter]);
  const finalPrice = negotiatedPrice ?? porter?.price ?? 0;
  const availablePorters = porters.filter((item) => item.available && (!station || item.station === station));
  const visiblePorters = availablePorters.length > 0 ? availablePorters : porters.filter((item) => item.available);

  const canNext = () => {
    if (step === 0) return pnr.length === 10 && Boolean(station) && Boolean(dropLocation);
    if (step === 1) return Boolean(selectedPorter);
    return true;
  };

  const submitBooking = async () => {
    if (!porter) return;
    setLoadingPayment(true);
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          porterId: porter.id,
          station,
          dropLocation,
          pnr,
          amount: porter.price,
          negotiatedPrice,
          payMethod,
          upiId,
        }),
      });

      if (!response.ok) {
        throw new Error("Booking failed");
      }

      const data = (await response.json()) as { booking: BookingRecord };
      setBooking(data.booking);
      setBookings((prev) => [data.booking, ...prev]);
      setBooked(true);
    } finally {
      setLoadingPayment(false);
    }
  };

  if (!authorized || loading || loadingData) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-4">
        <div className="text-center text-muted-foreground">
          <div className="w-14 h-14 rounded-full border-4 border-orange/20 border-t-orange animate-spin mx-auto mb-4" />
          Loading customer dashboard...
        </div>
      </div>
    );
  }

  if (booked && booking) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-16">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200 }} className="text-center max-w-md w-full">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold dark:text-white mb-3">{t.bookedTitle}</h1>
          <p className="text-muted-foreground mb-2">
            <span className="font-semibold text-foreground dark:text-white">{booking.porter}</span> {t.bookedWillMeet}{" "}
            <span className="text-orange font-semibold">{booking.station}</span>
          </p>
          <p className="text-muted-foreground mb-8">
            {t.amountPaid}: <span className="font-bold text-foreground dark:text-white">₹{booking.amount}</span>
          </p>
          <div className="glass dark:glass-dark rounded-2xl p-5 mb-8 text-left border border-white/30">
            <div className="text-xs text-muted-foreground mb-3 font-semibold uppercase tracking-wider">{t.bookingDetails}</div>
            {[
              [t.bookingId, booking.id],
              [t.pnr, booking.pnr],
              [t.porter, booking.porter],
              [t.drop, booking.to],
              [t.amount, `₹${booking.amount}`],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between py-2 border-b border-border last:border-0 text-sm">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-medium dark:text-white">{value}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full rounded-2xl">{t.backHome}</Button>
            </Link>
            <Button className="flex-1 bg-orange hover:bg-orange/90 text-white rounded-2xl" onClick={() => {
              setBooked(false);
              setBooking(null);
              setStep(0);
              setPnr("");
              setStation("");
              setDropLocation("");
              setSelectedPorter(null);
              setNegotiatedPrice(null);
            }}>
              {t.newBooking}
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-orange transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> {t.back}
          </Link>
          <h1 className="text-3xl font-bold dark:text-white">{t.title}</h1>
          <p className="text-muted-foreground mt-1">{user ? `Welcome back, ${user.name}.` : t.subtitle}</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between mb-3">
            {t.steps.map((label, index) => (
              <div key={label} className={`text-xs font-medium transition-colors ${index <= step ? "text-orange" : "text-muted-foreground"}`}>{label}</div>
            ))}
          </div>
          <Progress value={((step + 1) / t.steps.length) * 100} className="h-1.5" />
        </div>

        {error && <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-900/20 dark:text-red-300">{error}</div>}

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="step0" {...slide} className="space-y-5">
              <div className="glass dark:glass-dark rounded-3xl p-6 border border-white/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-orange/10 flex items-center justify-center"><Train className="w-5 h-5 text-orange" /></div>
                  <div>
                    <h2 className="font-bold dark:text-white">{t.trainDetailsTitle}</h2>
                    <p className="text-xs text-muted-foreground">{t.trainDetailsHint}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium dark:text-white mb-2 block">{t.pnrLabel}</Label>
                    <Input placeholder={t.pnrPlaceholder} value={pnr} onChange={(event) => setPnr(event.target.value.replace(/\D/g, "").slice(0, 10))} className="rounded-xl h-12 text-base font-mono" />
                    {pnr.length > 0 && pnr.length < 10 && <p className="text-xs text-muted-foreground mt-1">{interpolate(t.pnrDigitsNeeded, { count: 10 - pnr.length })}</p>}
                    {pnr.length === 10 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-green-500 mt-1 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> {t.pnrVerified}</motion.p>}
                  </div>
                  <div>
                    <Label className="text-sm font-medium dark:text-white mb-2 block">{t.stationLabel}</Label>
                    <select value={station} onChange={(event) => setStation(event.target.value)} className="w-full h-12 rounded-xl border border-input bg-background px-3 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-orange/50">
                      <option value="">{t.stationPlaceholder}</option>
                      {STATIONS.map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium dark:text-white mb-2 block">{t.dropLabel}</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input placeholder={t.dropPlaceholder} value={dropLocation} onChange={(event) => setDropLocation(event.target.value)} className="rounded-xl h-12 pl-10" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="step1" {...slide} className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold text-lg dark:text-white">{t.availablePorters}</h2>
                <span className="text-xs text-muted-foreground">{interpolate(t.availableNear, { count: visiblePorters.length, station: station || "nearby" })}</span>
              </div>
              {visiblePorters.map((item) => <PorterCard key={item.id} porter={item} selected={selectedPorter === item.id} onSelect={setSelectedPorter} />)}
            </motion.div>
          )}

          {step === 2 && porter && (
            <motion.div key="step2" {...slide} className="space-y-5">
              <div className="glass dark:glass-dark rounded-3xl p-6 border border-white/30">
                <h2 className="font-bold text-lg dark:text-white mb-5">{t.bookingSummary}</h2>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-orange/5 border border-orange/20 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-orange/10 flex items-center justify-center"><span className="text-orange font-bold">{porter.avatar}</span></div>
                  <div className="flex-1">
                    <div className="font-semibold dark:text-white">{porter.name}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {porter.rating} · {porter.experience} {t.experienceSuffix}</div>
                  </div>
                  <div className="text-xl font-bold text-orange">₹{finalPrice}</div>
                </div>
                {[[t.from, station], [t.to, dropLocation], [t.pnr, pnr]].map(([label, value]) => (
                  <div key={label} className="flex justify-between py-3 border-b border-border last:border-0 text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium dark:text-white text-right max-w-[60%]">{value}</span>
                  </div>
                ))}
                <div className="mt-5 p-4 rounded-2xl bg-secondary/50 dark:bg-white/5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold dark:text-white">{t.negotiatePrice}</span>
                    <span className="text-xs text-muted-foreground">{interpolate(t.porterAsks, { amount: porter.price })}</span>
                  </div>
                  <div className="flex gap-2">
                    {[porter.price - 20, porter.price - 10, porter.price, porter.price + 10].filter((price) => price > 0).map((price) => (
                      <button key={price} onClick={() => setNegotiatedPrice(price)} className={`flex-1 py-2 rounded-xl text-sm font-semibold border transition-all ${finalPrice === price ? "bg-orange text-white border-orange" : "border-border text-muted-foreground hover:border-orange hover:text-orange dark:text-gray-300"}`}>
                        ₹{price}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{t.counterOfferHint}</p>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" {...slide} className="space-y-5">
              <div className="glass dark:glass-dark rounded-3xl p-6 border border-white/30">
                <h2 className="font-bold text-lg dark:text-white mb-5">{t.paymentTitle}</h2>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-orange/5 border border-orange/20 mb-6">
                  <span className="text-muted-foreground text-sm">{t.totalAmount}</span>
                  <span className="text-2xl font-bold text-orange">₹{finalPrice}</span>
                </div>
                <div className="space-y-3 mb-6">
                  {[
                    { id: "upi" as const, icon: Smartphone, label: "UPI", desc: t.paymentUpiDesc },
                    { id: "card" as const, icon: CreditCard, label: "Card", desc: t.paymentCardDesc },
                    { id: "wallet" as const, icon: Wallet, label: "Wallet", desc: t.paymentWalletDesc },
                  ].map((method) => (
                    <button key={method.id} onClick={() => setPayMethod(method.id)} className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${payMethod === method.id ? "border-orange bg-orange/5" : "border-border hover:border-orange/30"}`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${payMethod === method.id ? "bg-orange/10" : "bg-secondary"}`}>
                        <method.icon className={`w-5 h-5 ${payMethod === method.id ? "text-orange" : "text-muted-foreground"}`} />
                      </div>
                      <div>
                        <div className={`font-semibold text-sm ${payMethod === method.id ? "text-orange" : "dark:text-white"}`}>{method.label}</div>
                        <div className="text-xs text-muted-foreground">{method.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
                {payMethod === "upi" && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-4">
                    <Label className="text-sm font-medium dark:text-white mb-2 block">{t.upiIdLabel}</Label>
                    <Input placeholder={t.upiPlaceholder} value={upiId} onChange={(event) => setUpiId(event.target.value)} className="rounded-xl h-12" />
                  </motion.div>
                )}
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-5"><Lock className="w-3 h-3" /> {t.paymentSecurity}</div>
                <Button className="w-full bg-orange hover:bg-orange/90 text-white rounded-2xl h-12 text-base font-bold shadow-lg shadow-orange/25" onClick={submitBooking} disabled={loadingPayment}>
                  {loadingPayment ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> {t.processing}</span> : interpolate(t.payNow, { amount: finalPrice })}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {bookings.length > 0 && (
          <div className="mt-8 glass dark:glass-dark rounded-3xl p-5 border border-white/30">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm font-semibold dark:text-white">Your bookings</div>
                <div className="text-xs text-muted-foreground">Pulled live from the database</div>
              </div>
              <span className="text-xs text-muted-foreground">{bookings.length} total</span>
            </div>
            <div className="space-y-3">
              {bookings.slice(0, 3).map((item) => (
                <div key={item.id} className="rounded-2xl border border-border bg-card p-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="font-semibold text-sm dark:text-white">{item.porter}</div>
                    <div className="text-xs text-muted-foreground">{item.from} → {item.to}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-orange">₹{item.amount}</div>
                    <div className="text-xs text-muted-foreground">{item.date} · {item.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step < 3 && (
          <div className="flex gap-3 mt-6">
            {step > 0 && <Button variant="outline" className="flex-1 rounded-2xl h-12" onClick={() => setStep(step - 1)}><ArrowLeft className="w-4 h-4 mr-2" /> {t.back}</Button>}
            <Button className="flex-1 bg-orange hover:bg-orange/90 text-white rounded-2xl h-12 font-semibold disabled:opacity-40" disabled={!canNext()} onClick={() => setStep(step + 1)}>{step === 2 ? t.proceedToPay : t.continue}<ArrowRight className="w-4 h-4 ml-2" /></Button>
          </div>
        )}
      </div>
    </div>
  );
}