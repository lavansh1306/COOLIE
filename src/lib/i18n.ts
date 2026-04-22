export type Locale = "en" | "hi" | "ta" | "te";

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_OPTIONS: Array<{ value: Locale; label: string }> = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिन्दी" },
  { value: "ta", label: "தமிழ்" },
  { value: "te", label: "తెలుగు" },
];

type Feature = { title: string; desc: string };
type StepItem = { step: string; title: string; desc: string };
type Testimonial = { name: string; station: string; quote: string; rating: number };

export interface AppDictionary {
  meta: {
    title: string;
    description: string;
  };
  navbar: {
    home: string;
    bookPorter: string;
    porterDashboard: string;
    admin: string;
    bookNow: string;
    language: string;
  };
  statsBar: {
    passengersServed: string;
    verifiedPorters: string;
    citiesCovered: string;
    avgRating: string;
  };
  porterCard: {
    busy: string;
    jobs: string;
    perTrip: string;
    selected: string;
    selectPorter: string;
  };
  landing: {
    liveBadge: string;
    heroLine1: string;
    heroAccent: string;
    heroLine3: string;
    heroLine4: string;
    heroDesc: string;
    heroBookCta: string;
    heroPorterCta: string;
    heroPortersReady: string;
    whyTag: string;
    whyTitle: string;
    features: Feature[];
    processTag: string;
    processTitle: string;
    passengerTitle: string;
    porterTitle: string;
    passengerSteps: StepItem[];
    porterSteps: StepItem[];
    impactTag: string;
    impactTitleLine1: string;
    impactTitleAccent: string;
    impactDesc: string;
    impactCards: Array<{ label: string; value: string }>;
    testimonialsTitle: string;
    testimonials: Testimonial[];
    ctaTitle: string;
    ctaDesc: string;
    ctaBook: string;
    ctaJoin: string;
    copyright: string;
    privacy: string;
    terms: string;
    contact: string;
  };
  book: {
    steps: string[];
    back: string;
    title: string;
    subtitle: string;
    trainDetailsTitle: string;
    trainDetailsHint: string;
    pnrLabel: string;
    pnrPlaceholder: string;
    pnrDigitsNeeded: string;
    pnrVerified: string;
    stationLabel: string;
    stationPlaceholder: string;
    dropLabel: string;
    dropPlaceholder: string;
    availablePorters: string;
    availableNear: string;
    bookingSummary: string;
    experienceSuffix: string;
    from: string;
    to: string;
    pnr: string;
    negotiatePrice: string;
    porterAsks: string;
    counterOfferHint: string;
    paymentTitle: string;
    totalAmount: string;
    paymentUpiDesc: string;
    paymentCardDesc: string;
    paymentWalletDesc: string;
    upiIdLabel: string;
    upiPlaceholder: string;
    paymentSecurity: string;
    processing: string;
    payNow: string;
    proceedToPay: string;
    continue: string;
    bookedTitle: string;
    bookedWillMeet: string;
    amountPaid: string;
    bookingDetails: string;
    bookingId: string;
    porter: string;
    drop: string;
    amount: string;
    backHome: string;
    newBooking: string;
  };
  porter: {
    title: string;
    welcome: string;
    today: string;
    thisWeek: string;
    totalJobs: string;
    rating: string;
    completionRate: string;
    completionHint: string;
    tabRequests: string;
    tabHistory: string;
    tabRatings: string;
    noPending: string;
    noPendingHint: string;
    newBadge: string;
    from: string;
    to: string;
    decline: string;
    accept: string;
    acceptedHint: string;
    reviewsCount: string;
    monthEarnings: string;
    viewFullReport: string;
    headToPlatform: string;
  };
  admin: {
    statusCompleted: string;
    statusActive: string;
    statusPending: string;
    panelTag: string;
    title: string;
    subtitle: string;
    totalBookings: string;
    activePorters: string;
    revenue: string;
    completionRate: string;
    tabBookings: string;
    tabPorters: string;
    bookingSearchPlaceholder: string;
    porterSearchPlaceholder: string;
    tableBookingId: string;
    tablePassenger: string;
    tablePorter: string;
    tableRoute: string;
    tableAmount: string;
    tableStatus: string;
    tableDate: string;
    porterPrefix: string;
    available: string;
    busy: string;
    jobs: string;
    perTrip: string;
  };
}

export const DICTIONARIES: Record<Locale, AppDictionary> = {
  en: {
    meta: {
      title: "Coolie - Dignifying Transit, Digitizing Convenience",
      description:
        "Book verified railway porters in seconds. Coolie connects passengers with trained porters across Indian railway stations.",
    },
    navbar: {
      home: "Home",
      bookPorter: "Book Porter",
      porterDashboard: "Porter Dashboard",
      admin: "Admin",
      bookNow: "Book Now",
      language: "Language",
    },
    statsBar: {
      passengersServed: "Passengers Served",
      verifiedPorters: "Verified Porters",
      citiesCovered: "Cities Covered",
      avgRating: "Avg Rating",
    },
    porterCard: {
      busy: "Busy",
      jobs: "jobs",
      perTrip: "per trip",
      selected: "Selected",
      selectPorter: "Select Porter",
    },
    landing: {
      liveBadge: "Now live in 120+ stations across India",
      heroLine1: "Dignifying",
      heroAccent: "Transit,",
      heroLine3: "Digitizing",
      heroLine4: "Convenience",
      heroDesc:
        "Coolie connects railway passengers with verified, trained porters - making luggage assistance seamless, safe, and dignified for everyone.",
      heroBookCta: "Book a Porter",
      heroPorterCta: "Become a Porter",
      heroPortersReady: "porters ready to help",
      whyTag: "Why Coolie",
      whyTitle: "Built for the modern traveller",
      features: [
        {
          title: "Pre-book via PNR",
          desc: "Enter your PNR and we will match you with a verified porter before your train arrives.",
        },
        {
          title: "Transparent Pricing",
          desc: "No hidden charges. See the price upfront, negotiate if needed, pay only what is agreed.",
        },
        {
          title: "Secure Payments",
          desc: "UPI, cards, wallets - all payment methods supported with end-to-end encryption.",
        },
      ],
      processTag: "Simple Process",
      processTitle: "How it works",
      passengerTitle: "For Passengers",
      porterTitle: "For Porters",
      passengerSteps: [
        { step: "01", title: "Enter PNR", desc: "Input your train PNR to auto-fetch station details." },
        { step: "02", title: "Choose Porter", desc: "Browse verified porters with ratings and live pricing." },
        { step: "03", title: "Confirm & Pay", desc: "Lock in your porter and pay securely via UPI or card." },
        { step: "04", title: "Relax", desc: "Your porter meets you at the platform. Luggage handled." },
      ],
      porterSteps: [
        { step: "01", title: "Register", desc: "Sign up with Aadhaar verification in under 5 minutes." },
        { step: "02", title: "Get Requests", desc: "Receive job requests from nearby passengers in real-time." },
        { step: "03", title: "Complete Job", desc: "Assist the passenger and complete the trip." },
        { step: "04", title: "Get Paid", desc: "Instant payment directly to your bank account." },
      ],
      impactTag: "Social Impact",
      impactTitleLine1: "Empowering gig workers,",
      impactTitleAccent: "one trip at a time",
      impactDesc:
        "India's railway porters deserve better. Coolie gives them digital identity, fair pay, and consistent work.",
      impactCards: [
        { label: "Avg income increase", value: "3.2x" },
        { label: "Porter satisfaction", value: "96%" },
      ],
      testimonialsTitle: "What porters say",
      testimonials: [
        {
          name: "Ramesh Kumar",
          station: "New Delhi",
          quote: "Coolie gave me steady income and respect. I now earn three times more than before.",
          rating: 5,
        },
        {
          name: "Suresh Yadav",
          station: "Mumbai CST",
          quote: "No more waiting for passengers. Jobs now come to my phone.",
          rating: 5,
        },
      ],
      ctaTitle: "Ready to travel light?",
      ctaDesc: "Book a verified porter in under 60 seconds. Your next journey starts here.",
      ctaBook: "Book a Porter",
      ctaJoin: "Join as Porter",
      copyright: "© 2025 Coolie Technologies Pvt. Ltd. All rights reserved.",
      privacy: "Privacy",
      terms: "Terms",
      contact: "Contact",
    },
    book: {
      steps: ["PNR & Station", "Choose Porter", "Confirm", "Payment"],
      back: "Back",
      title: "Book a Porter",
      subtitle: "Luggage assistance in under 60 seconds",
      trainDetailsTitle: "Train Details",
      trainDetailsHint: "Enter your PNR to get started",
      pnrLabel: "PNR Number",
      pnrPlaceholder: "e.g. 4521876543",
      pnrDigitsNeeded: "{count} more digits needed",
      pnrVerified: "PNR verified",
      stationLabel: "Boarding Station",
      stationPlaceholder: "Select station",
      dropLabel: "Drop Location",
      dropPlaceholder: "e.g. Exit Gate B, Taxi Stand, Parking",
      availablePorters: "Available Porters",
      availableNear: "{count} near {station}",
      bookingSummary: "Booking Summary",
      experienceSuffix: "experience",
      from: "From",
      to: "To",
      pnr: "PNR",
      negotiatePrice: "Negotiate Price",
      porterAsks: "Porter asks ₹{amount}",
      counterOfferHint: "Porter will accept or counter your offer",
      paymentTitle: "Payment",
      totalAmount: "Total Amount",
      paymentUpiDesc: "Pay via any UPI app",
      paymentCardDesc: "Credit / Debit card",
      paymentWalletDesc: "Paytm, PhonePe, etc.",
      upiIdLabel: "UPI ID",
      upiPlaceholder: "yourname@upi",
      paymentSecurity: "Secured by 256-bit SSL encryption",
      processing: "Processing...",
      payNow: "Pay ₹{amount}",
      proceedToPay: "Proceed to Pay",
      continue: "Continue",
      bookedTitle: "Booking Confirmed!",
      bookedWillMeet: "will meet you at",
      amountPaid: "Amount paid",
      bookingDetails: "Booking Details",
      bookingId: "Booking ID",
      porter: "Porter",
      drop: "Drop",
      amount: "Amount",
      backHome: "Back to Home",
      newBooking: "New Booking",
    },
    porter: {
      title: "Porter Dashboard",
      welcome: "Welcome back, Ramesh Kumar",
      today: "Today",
      thisWeek: "This Week",
      totalJobs: "Total Jobs",
      rating: "Rating",
      completionRate: "Completion Rate",
      completionHint: "Keep it above 90% to maintain Top Rated status",
      tabRequests: "Requests",
      tabHistory: "History",
      tabRatings: "Ratings",
      noPending: "No pending requests",
      noPendingHint: "New job requests will appear here",
      newBadge: "New",
      from: "From:",
      to: "To:",
      decline: "Decline",
      accept: "Accept",
      acceptedHint: "{count} accepted",
      reviewsCount: "312 reviews",
      monthEarnings: "This month's earnings",
      viewFullReport: "View Full Report",
      headToPlatform: "head to the platform!",
    },
    admin: {
      statusCompleted: "Completed",
      statusActive: "Active",
      statusPending: "Pending",
      panelTag: "Admin Panel",
      title: "System Overview",
      subtitle: "Monitor bookings, porters, and platform health",
      totalBookings: "Total Bookings",
      activePorters: "Active Porters",
      revenue: "Revenue",
      completionRate: "Completion Rate",
      tabBookings: "Bookings",
      tabPorters: "Porters",
      bookingSearchPlaceholder: "Search by passenger, porter, or booking ID...",
      porterSearchPlaceholder: "Search porters...",
      tableBookingId: "Booking ID",
      tablePassenger: "Passenger",
      tablePorter: "Porter",
      tableRoute: "Route",
      tableAmount: "Amount",
      tableStatus: "Status",
      tableDate: "Date",
      porterPrefix: "Porter:",
      available: "Available",
      busy: "Busy",
      jobs: "jobs",
      perTrip: "per trip",
    },
  },
  hi: {
    meta: {
      title: "कूली - यात्रा को सम्मान, सुविधा को डिजिटल रूप",
      description:
        "सेकंडों में सत्यापित रेलवे कूली बुक करें। कूली ऐप यात्रियों को प्रशिक्षित कूलियों से जोड़ता है।",
    },
    navbar: {
      home: "होम",
      bookPorter: "कूली बुक करें",
      porterDashboard: "कूली डैशबोर्ड",
      admin: "एडमिन",
      bookNow: "अभी बुक करें",
      language: "भाषा",
    },
    statsBar: {
      passengersServed: "सेवा किए गए यात्री",
      verifiedPorters: "सत्यापित कूली",
      citiesCovered: "शामिल शहर",
      avgRating: "औसत रेटिंग",
    },
    porterCard: {
      busy: "व्यस्त",
      jobs: "जॉब्स",
      perTrip: "प्रति ट्रिप",
      selected: "चयनित",
      selectPorter: "कूली चुनें",
    },
    landing: {
      liveBadge: "भारत के 120+ स्टेशनों पर लाइव",
      heroLine1: "यात्रा को",
      heroAccent: "सम्मान,",
      heroLine3: "सुविधा को",
      heroLine4: "डिजिटल बनाएं",
      heroDesc:
        "कूली ऐप यात्रियों को सत्यापित और प्रशिक्षित कूलियों से जोड़ता है - सामान सहायता को आसान, सुरक्षित और सम्मानजनक बनाते हुए।",
      heroBookCta: "कूली बुक करें",
      heroPorterCta: "कूली बनें",
      heroPortersReady: "कूली मदद के लिए तैयार",
      whyTag: "क्यों कूली",
      whyTitle: "आधुनिक यात्रियों के लिए बनाया गया",
      features: [
        {
          title: "PNR से प्री-बुकिंग",
          desc: "अपना PNR डालें और ट्रेन आने से पहले सत्यापित कूली से मैच करें।",
        },
        {
          title: "पारदर्शी कीमत",
          desc: "कोई छिपा शुल्क नहीं। पहले से कीमत देखें, जरूरत हो तो मोलभाव करें।",
        },
        {
          title: "सुरक्षित भुगतान",
          desc: "UPI, कार्ड, वॉलेट - सभी भुगतान तरीके एंड-टू-एंड एन्क्रिप्शन के साथ।",
        },
      ],
      processTag: "सरल प्रक्रिया",
      processTitle: "कैसे काम करता है",
      passengerTitle: "यात्रियों के लिए",
      porterTitle: "कूलियों के लिए",
      passengerSteps: [
        { step: "01", title: "PNR दर्ज करें", desc: "PNR से स्टेशन विवरण स्वतः प्राप्त करें।" },
        { step: "02", title: "कूली चुनें", desc: "रेटिंग और कीमत के साथ सत्यापित कूली देखें।" },
        { step: "03", title: "कन्फर्म और भुगतान", desc: "कूली फाइनल करें और सुरक्षित भुगतान करें।" },
        { step: "04", title: "आराम करें", desc: "कूली प्लेटफॉर्म पर मिलेगा और सामान संभालेगा।" },
      ],
      porterSteps: [
        { step: "01", title: "रजिस्टर करें", desc: "आधार सत्यापन के साथ 5 मिनट में साइन अप करें।" },
        { step: "02", title: "रिक्वेस्ट पाएं", desc: "पास के यात्रियों से रियल-टाइम जॉब रिक्वेस्ट पाएं।" },
        { step: "03", title: "जॉब पूरा करें", desc: "यात्री की मदद करें और ट्रिप पूरी करें।" },
        { step: "04", title: "भुगतान पाएं", desc: "सीधे बैंक खाते में तुरंत भुगतान।" },
      ],
      impactTag: "सामाजिक प्रभाव",
      impactTitleLine1: "गिग वर्कर्स को सशक्त बनाना,",
      impactTitleAccent: "हर यात्रा के साथ",
      impactDesc:
        "रेलवे कूलियों को बेहतर पहचान और स्थिर आय चाहिए। कूली उन्हें डिजिटल पहचान, उचित भुगतान और लगातार काम देता है।",
      impactCards: [
        { label: "औसत आय वृद्धि", value: "3.2x" },
        { label: "कूली संतुष्टि", value: "96%" },
      ],
      testimonialsTitle: "कूली क्या कहते हैं",
      testimonials: [
        {
          name: "Ramesh Kumar",
          station: "New Delhi",
          quote: "कूली ऐप से मुझे स्थिर आय और सम्मान मिला। अब मेरी कमाई पहले से तीन गुना है।",
          rating: 5,
        },
        {
          name: "Suresh Yadav",
          station: "Mumbai CST",
          quote: "अब यात्रियों का इंतजार नहीं करना पड़ता। जॉब सीधे फोन पर आते हैं।",
          rating: 5,
        },
      ],
      ctaTitle: "हल्का सफर करने के लिए तैयार?",
      ctaDesc: "60 सेकंड से कम में सत्यापित कूली बुक करें। आपकी अगली यात्रा यहीं से शुरू होती है।",
      ctaBook: "कूली बुक करें",
      ctaJoin: "कूली के रूप में जुड़ें",
      copyright: "© 2025 Coolie Technologies Pvt. Ltd. सर्वाधिकार सुरक्षित।",
      privacy: "गोपनीयता",
      terms: "शर्तें",
      contact: "संपर्क",
    },
    book: {
      steps: ["PNR और स्टेशन", "कूली चुनें", "कन्फर्म", "भुगतान"],
      back: "वापस",
      title: "कूली बुक करें",
      subtitle: "60 सेकंड से कम में सामान सहायता",
      trainDetailsTitle: "ट्रेन विवरण",
      trainDetailsHint: "शुरू करने के लिए PNR दर्ज करें",
      pnrLabel: "PNR नंबर",
      pnrPlaceholder: "जैसे 4521876543",
      pnrDigitsNeeded: "और {count} अंक चाहिए",
      pnrVerified: "PNR सत्यापित",
      stationLabel: "बोर्डिंग स्टेशन",
      stationPlaceholder: "स्टेशन चुनें",
      dropLabel: "ड्रॉप लोकेशन",
      dropPlaceholder: "जैसे Exit Gate B, Taxi Stand, Parking",
      availablePorters: "उपलब्ध कूली",
      availableNear: "{station} के पास {count}",
      bookingSummary: "बुकिंग सारांश",
      experienceSuffix: "अनुभव",
      from: "से",
      to: "तक",
      pnr: "PNR",
      negotiatePrice: "कीमत तय करें",
      porterAsks: "कूली की मांग ₹{amount}",
      counterOfferHint: "कूली आपके ऑफर को स्वीकार या काउंटर करेगा",
      paymentTitle: "भुगतान",
      totalAmount: "कुल राशि",
      paymentUpiDesc: "किसी भी UPI ऐप से भुगतान",
      paymentCardDesc: "क्रेडिट / डेबिट कार्ड",
      paymentWalletDesc: "Paytm, PhonePe आदि",
      upiIdLabel: "UPI आईडी",
      upiPlaceholder: "yourname@upi",
      paymentSecurity: "256-बिट SSL एन्क्रिप्शन से सुरक्षित",
      processing: "प्रोसेस हो रहा है...",
      payNow: "₹{amount} भुगतान करें",
      proceedToPay: "भुगतान पर जाएं",
      continue: "आगे बढ़ें",
      bookedTitle: "बुकिंग कन्फर्म!",
      bookedWillMeet: "आपसे यहां मिलेंगे",
      amountPaid: "भुगतान राशि",
      bookingDetails: "बुकिंग विवरण",
      bookingId: "बुकिंग आईडी",
      porter: "कूली",
      drop: "ड्रॉप",
      amount: "राशि",
      backHome: "होम पर जाएं",
      newBooking: "नई बुकिंग",
    },
    porter: {
      title: "कूली डैशबोर्ड",
      welcome: "वापसी पर स्वागत है, Ramesh Kumar",
      today: "आज",
      thisWeek: "इस सप्ताह",
      totalJobs: "कुल जॉब्स",
      rating: "रेटिंग",
      completionRate: "पूर्णता दर",
      completionHint: "Top Rated स्टेटस बनाए रखने के लिए इसे 90% से ऊपर रखें",
      tabRequests: "रिक्वेस्ट",
      tabHistory: "इतिहास",
      tabRatings: "रेटिंग्स",
      noPending: "कोई लंबित रिक्वेस्ट नहीं",
      noPendingHint: "नई जॉब रिक्वेस्ट यहां दिखाई देंगी",
      newBadge: "नई",
      from: "से:",
      to: "तक:",
      decline: "अस्वीकार",
      accept: "स्वीकार",
      acceptedHint: "{count} स्वीकार",
      reviewsCount: "312 समीक्षाएं",
      monthEarnings: "इस महीने की कमाई",
      viewFullReport: "पूरी रिपोर्ट देखें",
      headToPlatform: "प्लेटफॉर्म की ओर बढ़ें!",
    },
    admin: {
      statusCompleted: "पूर्ण",
      statusActive: "सक्रिय",
      statusPending: "लंबित",
      panelTag: "एडमिन पैनल",
      title: "सिस्टम ओवरव्यू",
      subtitle: "बुकिंग, कूली और प्लेटफॉर्म हेल्थ मॉनिटर करें",
      totalBookings: "कुल बुकिंग",
      activePorters: "सक्रिय कूली",
      revenue: "राजस्व",
      completionRate: "पूर्णता दर",
      tabBookings: "बुकिंग",
      tabPorters: "कूली",
      bookingSearchPlaceholder: "यात्री, कूली या बुकिंग आईडी से खोजें...",
      porterSearchPlaceholder: "कूली खोजें...",
      tableBookingId: "बुकिंग आईडी",
      tablePassenger: "यात्री",
      tablePorter: "कूली",
      tableRoute: "रूट",
      tableAmount: "राशि",
      tableStatus: "स्थिति",
      tableDate: "तारीख",
      porterPrefix: "कूली:",
      available: "उपलब्ध",
      busy: "व्यस्त",
      jobs: "जॉब्स",
      perTrip: "प्रति ट्रिप",
    },
  },
  ta: {
    meta: {
      title: "கூலி - பயணத்திற்கு மதிப்பு, வசதிக்கு டிஜிட்டல் தீர்வு",
      description:
        "சில வினாடிகளில் சரிபார்க்கப்பட்ட ரயில்வே கூலிகளை பதிவு செய்யுங்கள். பயணிகள் மற்றும் பயிற்சி பெற்ற கூலிகளை Coolie இணைக்கிறது.",
    },
    navbar: {
      home: "முகப்பு",
      bookPorter: "கூலி பதிவு",
      porterDashboard: "கூலி டாஷ்போர்டு",
      admin: "நிர்வாகம்",
      bookNow: "இப்போது பதிவு",
      language: "மொழி",
    },
    statsBar: {
      passengersServed: "சேவை பெற்ற பயணிகள்",
      verifiedPorters: "சரிபார்க்கப்பட்ட கூலிகள்",
      citiesCovered: "சேவை உள்ள நகரங்கள்",
      avgRating: "சராசரி மதிப்பீடு",
    },
    porterCard: {
      busy: "பிஸி",
      jobs: "வேலைகள்",
      perTrip: "ஒரு பயணத்திற்கு",
      selected: "தேர்வு செய்யப்பட்டது",
      selectPorter: "கூலியை தேர்வு செய்",
    },
    landing: {
      liveBadge: "இந்தியாவில் 120+ நிலையங்களில் செயல்படுகிறது",
      heroLine1: "பயணத்திற்கு",
      heroAccent: "மதிப்பு,",
      heroLine3: "வசதிக்கு",
      heroLine4: "டிஜிட்டல் தீர்வு",
      heroDesc:
        "Coolie, பயணிகளை சரிபார்க்கப்பட்ட மற்றும் பயிற்சி பெற்ற கூலிகளுடன் இணைத்து, சுமை உதவியை எளிதாகவும் பாதுகாப்பாகவும் மாற்றுகிறது.",
      heroBookCta: "கூலி பதிவு செய்",
      heroPorterCta: "கூலியாக இணைய",
      heroPortersReady: "உதவ தயாரான கூலிகள்",
      whyTag: "ஏன் Coolie",
      whyTitle: "நவீன பயணிகளுக்காக உருவாக்கப்பட்டது",
      features: [
        {
          title: "PNR மூலம் முன்பதிவு",
          desc: "உங்கள் PNR ஐ உள்ளிட்டு, ரயில் வரும் முன் சரிபார்க்கப்பட்ட கூலியுடன் பொருத்தம் பெறுங்கள்.",
        },
        {
          title: "தெளிவான கட்டணம்",
          desc: "மறைமுக கட்டணம் இல்லை. முன்கூட்டியே விலையை பார்த்து தேவையெனில் பேசலாம்.",
        },
        {
          title: "பாதுகாப்பான கட்டணம்",
          desc: "UPI, கார்டு, வாலெட் - அனைத்தும் end-to-end encryption உடன்.",
        },
      ],
      processTag: "எளிய செயல்முறை",
      processTitle: "எப்படி செயல்படுகிறது",
      passengerTitle: "பயணிகளுக்கு",
      porterTitle: "கூலிகளுக்கு",
      passengerSteps: [
        { step: "01", title: "PNR உள்ளிடு", desc: "PNR மூலம் நிலைய விவரங்கள் தானாக பெறப்படும்." },
        { step: "02", title: "கூலி தேர்வு", desc: "மதிப்பீடு மற்றும் நேரடி விலையுடன் கூலிகளை பாருங்கள்." },
        { step: "03", title: "உறுதி & கட்டணம்", desc: "கூலியை உறுதி செய்து பாதுகாப்பாக கட்டணம் செலுத்துங்கள்." },
        { step: "04", title: "அமைதியாக இருங்கள்", desc: "கூலி தளத்தில் சந்தித்து சுமையை கவனிப்பார்." },
      ],
      porterSteps: [
        { step: "01", title: "பதிவு செய்", desc: "ஆதார் சரிபார்ப்புடன் 5 நிமிடங்களில் பதிவு செய்யுங்கள்." },
        { step: "02", title: "வேலை கோரிக்கைகள் பெறு", desc: "அருகிலுள்ள பயணிகளின் கோரிக்கைகள் நேரடியாக கிடைக்கும்." },
        { step: "03", title: "வேலை முடி", desc: "பயணிக்கு உதவி செய்து பயணத்தை நிறைவு செய்யுங்கள்." },
        { step: "04", title: "கட்டணம் பெறு", desc: "உங்கள் வங்கி கணக்கிற்கு உடனடி கட்டணம்." },
      ],
      impactTag: "சமூக தாக்கம்",
      impactTitleLine1: "கிக் தொழிலாளர்களை வலுப்படுத்தி,",
      impactTitleAccent: "ஒவ்வொரு பயணத்திலும்",
      impactDesc:
        "ரயில்வே கூலிகளுக்கு சிறந்த அடையாளமும் நிலையான வருமானமும் தேவை. Coolie அதைப் வழங்குகிறது.",
      impactCards: [
        { label: "சராசரி வருமான உயர்வு", value: "3.2x" },
        { label: "கூலி திருப்தி", value: "96%" },
      ],
      testimonialsTitle: "கூலிகள் கூறுவது",
      testimonials: [
        {
          name: "Ramesh Kumar",
          station: "New Delhi",
          quote: "Coolie எனக்கு நிலையான வருமானமும் மரியாதையும் கொடுத்தது. இப்போது எனது வருமானம் மூன்று மடங்கு.",
          rating: 5,
        },
        {
          name: "Suresh Yadav",
          station: "Mumbai CST",
          quote: "பயணிகளை காத்திருக்க வேண்டியதில்லை. வேலைகள் என் போனில் நேராக வருகிறது.",
          rating: 5,
        },
      ],
      ctaTitle: "லேசாக பயணிக்க தயாரா?",
      ctaDesc: "60 வினாடிகளில் சரிபார்க்கப்பட்ட கூலியை பதிவு செய்யுங்கள். உங்கள் அடுத்த பயணம் இங்கிருந்து துவங்குகிறது.",
      ctaBook: "கூலி பதிவு செய்",
      ctaJoin: "கூலியாக இணைய",
      copyright: "© 2025 Coolie Technologies Pvt. Ltd. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
      privacy: "தனியுரிமை",
      terms: "விதிமுறைகள்",
      contact: "தொடர்பு",
    },
    book: {
      steps: ["PNR & நிலையம்", "கூலி தேர்வு", "உறுதி", "கட்டணம்"],
      back: "பின்",
      title: "கூலி பதிவு",
      subtitle: "60 வினாடிகளில் சுமை உதவி",
      trainDetailsTitle: "ரயில் விவரங்கள்",
      trainDetailsHint: "தொடங்க PNR ஐ உள்ளிடுங்கள்",
      pnrLabel: "PNR எண்",
      pnrPlaceholder: "உதா. 4521876543",
      pnrDigitsNeeded: "இன்னும் {count} இலக்கங்கள் வேண்டும்",
      pnrVerified: "PNR சரிபார்க்கப்பட்டது",
      stationLabel: "ஏறும் நிலையம்",
      stationPlaceholder: "நிலையத்தை தேர்வு செய்",
      dropLabel: "இறக்கும் இடம்",
      dropPlaceholder: "உதா. Exit Gate B, Taxi Stand, Parking",
      availablePorters: "கிடைக்கும் கூலிகள்",
      availableNear: "{station} அருகில் {count}",
      bookingSummary: "பதிவு சுருக்கம்",
      experienceSuffix: "அனுபவம்",
      from: "இருந்து",
      to: "வரை",
      pnr: "PNR",
      negotiatePrice: "விலை பேச்சுவார்த்தை",
      porterAsks: "கூலி கோருவது ₹{amount}",
      counterOfferHint: "கூலி உங்கள் விலையை ஏற்கலாம் அல்லது மாற்றம் கூறலாம்",
      paymentTitle: "கட்டணம்",
      totalAmount: "மொத்தம்",
      paymentUpiDesc: "எந்த UPI செயலியிலும் கட்டணம் செலுத்தவும்",
      paymentCardDesc: "கிரெடிட் / டெபிட் கார்டு",
      paymentWalletDesc: "Paytm, PhonePe போன்றவை",
      upiIdLabel: "UPI ID",
      upiPlaceholder: "yourname@upi",
      paymentSecurity: "256-bit SSL குறியாக்க பாதுகாப்பு",
      processing: "செயலாக்கம்...",
      payNow: "₹{amount} செலுத்து",
      proceedToPay: "கட்டணத்திற்கு தொடர்க",
      continue: "தொடர்க",
      bookedTitle: "பதிவு உறுதி செய்யப்பட்டது!",
      bookedWillMeet: "உங்களை இங்கே சந்திப்பார்",
      amountPaid: "செலுத்திய தொகை",
      bookingDetails: "பதிவு விவரங்கள்",
      bookingId: "பதிவு ஐடி",
      porter: "கூலி",
      drop: "இறக்கும் இடம்",
      amount: "தொகை",
      backHome: "முகப்பிற்கு செல்",
      newBooking: "புதிய பதிவு",
    },
    porter: {
      title: "கூலி டாஷ்போர்டு",
      welcome: "மீண்டும் வரவேற்கிறோம், Ramesh Kumar",
      today: "இன்று",
      thisWeek: "இந்த வாரம்",
      totalJobs: "மொத்த வேலைகள்",
      rating: "மதிப்பீடு",
      completionRate: "நிறைவு விகிதம்",
      completionHint: "Top Rated நிலையை காப்பாற்ற 90% மேல் வைத்திருங்கள்",
      tabRequests: "கோரிக்கைகள்",
      tabHistory: "வரலாறு",
      tabRatings: "மதிப்பீடுகள்",
      noPending: "நிலுவையில் கோரிக்கைகள் இல்லை",
      noPendingHint: "புதிய வேலை கோரிக்கைகள் இங்கே தோன்றும்",
      newBadge: "புது",
      from: "இருந்து:",
      to: "வரை:",
      decline: "நிராகரி",
      accept: "ஏற்று",
      acceptedHint: "{count} ஏற்றுக்கொள்ளப்பட்டது",
      reviewsCount: "312 மதிப்புரைகள்",
      monthEarnings: "இந்த மாத வருமானம்",
      viewFullReport: "முழு அறிக்கை",
      headToPlatform: "தளத்திற்கு செல்லுங்கள்!",
    },
    admin: {
      statusCompleted: "முடிந்தது",
      statusActive: "செயலில்",
      statusPending: "நிலுவை",
      panelTag: "நிர்வாக பலகம்",
      title: "அமைப்பு கண்ணோட்டம்",
      subtitle: "பதிவுகள், கூலிகள் மற்றும் தள நிலையை கண்காணிக்கவும்",
      totalBookings: "மொத்த பதிவுகள்",
      activePorters: "செயலில் உள்ள கூலிகள்",
      revenue: "வருவாய்",
      completionRate: "நிறைவு விகிதம்",
      tabBookings: "பதிவுகள்",
      tabPorters: "கூலிகள்",
      bookingSearchPlaceholder: "பயணி, கூலி அல்லது பதிவு ஐடி மூலம் தேடுங்கள்...",
      porterSearchPlaceholder: "கூலிகளை தேடுங்கள்...",
      tableBookingId: "பதிவு ஐடி",
      tablePassenger: "பயணி",
      tablePorter: "கூலி",
      tableRoute: "பாதை",
      tableAmount: "தொகை",
      tableStatus: "நிலை",
      tableDate: "தேதி",
      porterPrefix: "கூலி:",
      available: "கிடைக்கும்",
      busy: "பிஸி",
      jobs: "வேலைகள்",
      perTrip: "ஒரு பயணத்திற்கு",
    },
  },
  te: {
    meta: {
      title: "కూలీ - ప్రయాణానికి గౌరవం, సౌకర్యానికి డిజిటల్ పరిష్కారం",
      description:
        "సెకన్లలో ధృవీకరించిన రైల్వే కూలీలను బుక్ చేయండి. ప్రయాణికులను శిక్షణ పొందిన కూలీలతో Coolie కలుపుతుంది.",
    },
    navbar: {
      home: "హోమ్",
      bookPorter: "కూలీ బుక్",
      porterDashboard: "కూలీ డ్యాష్‌బోర్డ్",
      admin: "అడ్మిన్",
      bookNow: "ఇప్పుడే బుక్ చేయండి",
      language: "భాష",
    },
    statsBar: {
      passengersServed: "సేవ పొందిన ప్రయాణికులు",
      verifiedPorters: "ధృవీకరించిన కూలీలు",
      citiesCovered: "సేవలోని నగరాలు",
      avgRating: "సగటు రేటింగ్",
    },
    porterCard: {
      busy: "బిజీ",
      jobs: "పనులు",
      perTrip: "ఒక ట్రిప్‌కు",
      selected: "ఎంచుకున్నారు",
      selectPorter: "కూలీని ఎంచుకోండి",
    },
    landing: {
      liveBadge: "భారతదేశంలోని 120+ స్టేషన్లలో సేవలు అందుబాటులో ఉన్నాయి",
      heroLine1: "ప్రయాణానికి",
      heroAccent: "గౌరవం,",
      heroLine3: "సౌకర్యానికి",
      heroLine4: "డిజిటల్ రూపం",
      heroDesc:
        "Coolie, ప్రయాణికులను ధృవీకరించిన మరియు శిక్షణ పొందిన కూలీలతో కలిపి, సామాను సహాయాన్ని సులభం మరియు సురక్షితం చేస్తుంది.",
      heroBookCta: "కూలీ బుక్ చేయండి",
      heroPorterCta: "కూలీగా చేరండి",
      heroPortersReady: "సహాయానికి సిద్ధంగా ఉన్న కూలీలు",
      whyTag: "ఎందుకు Coolie",
      whyTitle: "ఆధునిక ప్రయాణికుల కోసం రూపొందించబడింది",
      features: [
        {
          title: "PNR తో ముందస్తు బుకింగ్",
          desc: "మీ PNR నమోదు చేయండి. రైలు రాకముందే ధృవీకరించిన కూలీని జత చేస్తాము.",
        },
        {
          title: "స్పష్టమైన ధరలు",
          desc: "దాచిన ఛార్జీలు లేవు. ముందుగానే ధర తెలుసుకోండి, అవసరమైతే మాట్లాడండి.",
        },
        {
          title: "సురక్షిత చెల్లింపులు",
          desc: "UPI, కార్డులు, వాలెట్‌లు - అన్ని చెల్లింపులు end-to-end encryption తో.",
        },
      ],
      processTag: "సరళమైన ప్రక్రియ",
      processTitle: "ఇది ఎలా పనిచేస్తుంది",
      passengerTitle: "ప్రయాణికుల కోసం",
      porterTitle: "కూలీల కోసం",
      passengerSteps: [
        { step: "01", title: "PNR నమోదు", desc: "PNR తో స్టేషన్ వివరాలు ఆటోగా పొందండి." },
        { step: "02", title: "కూలీ ఎంపిక", desc: "రేటింగ్‌లు మరియు ధరలతో ధృవీకరించిన కూలీలను చూడండి." },
        { step: "03", title: "నిర్ధారించి చెల్లించండి", desc: "కూలీని లాక్ చేసి సురక్షితంగా చెల్లించండి." },
        { step: "04", title: "ఆరామంగా ఉండండి", desc: "కూలీ ప్లాట్‌ఫారమ్ వద్ద కలుసుకొని సామాను చూసుకుంటాడు." },
      ],
      porterSteps: [
        { step: "01", title: "నమోదు", desc: "ఆధార్ ధృవీకరణతో 5 నిమిషాల్లో నమోదు చేయండి." },
        { step: "02", title: "రిక్వెస్ట్‌లు పొందండి", desc: "సమీప ప్రయాణికుల నుండి రియల్-టైమ్ జాబ్ రిక్వెస్ట్‌లు పొందండి." },
        { step: "03", title: "పని పూర్తి చేయండి", desc: "ప్రయాణికుడికి సహాయం చేసి ట్రిప్ పూర్తి చేయండి." },
        { step: "04", title: "చెల్లింపు పొందండి", desc: "మీ బ్యాంకు ఖాతాకు వెంటనే చెల్లింపు." },
      ],
      impactTag: "సామాజిక ప్రభావం",
      impactTitleLine1: "గిగ్ కార్మికులను బలపరుస్తూ,",
      impactTitleAccent: "ప్రతి ట్రిప్‌లో",
      impactDesc:
        "రైల్వే కూలీలకు మెరుగైన గుర్తింపు మరియు స్థిరమైన ఆదాయం అవసరం. Coolie అది అందిస్తుంది.",
      impactCards: [
        { label: "సగటు ఆదాయం పెరుగుదల", value: "3.2x" },
        { label: "కూలీల సంతృప్తి", value: "96%" },
      ],
      testimonialsTitle: "కూలీలు చెప్పేది",
      testimonials: [
        {
          name: "Ramesh Kumar",
          station: "New Delhi",
          quote: "Coolie వల్ల నాకు స్థిరమైన ఆదాయం, గౌరవం వచ్చింది. ఇప్పుడు ముందు కంటే మూడు రెట్లు సంపాదిస్తున్నాను.",
          rating: 5,
        },
        {
          name: "Suresh Yadav",
          station: "Mumbai CST",
          quote: "ఇంకా ప్రయాణికుల కోసం వేచి ఉండాల్సిన అవసరం లేదు. పనులు ఫోన్‌కి వస్తున్నాయి.",
          rating: 5,
        },
      ],
      ctaTitle: "తేలికగా ప్రయాణించడానికి సిద్ధమా?",
      ctaDesc: "60 సెకన్లలో ధృవీకరించిన కూలీని బుక్ చేయండి. మీ తదుపరి ప్రయాణం ఇక్కడే ప్రారంభం.",
      ctaBook: "కూలీ బుక్ చేయండి",
      ctaJoin: "కూలీగా చేరండి",
      copyright: "© 2025 Coolie Technologies Pvt. Ltd. అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.",
      privacy: "గోప్యత",
      terms: "నిబంధనలు",
      contact: "సంప్రదించండి",
    },
    book: {
      steps: ["PNR & స్టేషన్", "కూలీ ఎంపిక", "నిర్ధారణ", "చెల్లింపు"],
      back: "వెనక్కి",
      title: "కూలీ బుక్ చేయండి",
      subtitle: "60 సెకన్లలో సామాను సహాయం",
      trainDetailsTitle: "రైలు వివరాలు",
      trainDetailsHint: "ప్రారంభించడానికి PNR నమోదు చేయండి",
      pnrLabel: "PNR నంబర్",
      pnrPlaceholder: "ఉదా. 4521876543",
      pnrDigitsNeeded: "ఇంకా {count} అంకెలు కావాలి",
      pnrVerified: "PNR ధృవీకరించబడింది",
      stationLabel: "బోర్డింగ్ స్టేషన్",
      stationPlaceholder: "స్టేషన్ ఎంచుకోండి",
      dropLabel: "డ్రాప్ స్థానం",
      dropPlaceholder: "ఉదా. Exit Gate B, Taxi Stand, Parking",
      availablePorters: "అందుబాటులో ఉన్న కూలీలు",
      availableNear: "{station} సమీపంలో {count}",
      bookingSummary: "బుకింగ్ సారాంశం",
      experienceSuffix: "అనుభవం",
      from: "నుండి",
      to: "వరకు",
      pnr: "PNR",
      negotiatePrice: "ధరపై మాట్లాడండి",
      porterAsks: "కూలీ అడిగిన ధర ₹{amount}",
      counterOfferHint: "కూలీ మీ ఆఫర్‌ను అంగీకరించవచ్చు లేదా కౌంటర్ ఇవ్వవచ్చు",
      paymentTitle: "చెల్లింపు",
      totalAmount: "మొత్తం",
      paymentUpiDesc: "ఏ UPI యాప్ ద్వారా అయినా చెల్లించండి",
      paymentCardDesc: "క్రెడిట్ / డెబిట్ కార్డు",
      paymentWalletDesc: "Paytm, PhonePe మొదలైనవి",
      upiIdLabel: "UPI ID",
      upiPlaceholder: "yourname@upi",
      paymentSecurity: "256-bit SSL ఎన్‌క్రిప్షన్ ద్వారా రక్షితం",
      processing: "ప్రాసెస్ అవుతోంది...",
      payNow: "₹{amount} చెల్లించండి",
      proceedToPay: "చెల్లింపుకు కొనసాగండి",
      continue: "కొనసాగించండి",
      bookedTitle: "బుకింగ్ నిర్ధారించబడింది!",
      bookedWillMeet: "మిమ్మల్ని ఇక్కడ కలుస్తారు",
      amountPaid: "చెల్లించిన మొత్తం",
      bookingDetails: "బుకింగ్ వివరాలు",
      bookingId: "బుకింగ్ ఐడి",
      porter: "కూలీ",
      drop: "డ్రాప్",
      amount: "మొత్తం",
      backHome: "హోమ్‌కి వెళ్లండి",
      newBooking: "కొత్త బుకింగ్",
    },
    porter: {
      title: "కూలీ డ్యాష్‌బోర్డ్",
      welcome: "తిరిగి స్వాగతం, Ramesh Kumar",
      today: "ఈ రోజు",
      thisWeek: "ఈ వారం",
      totalJobs: "మొత్తం పనులు",
      rating: "రేటింగ్",
      completionRate: "పూర్తి శాతం",
      completionHint: "Top Rated స్థితిని కొనసాగించడానికి 90% పైగా ఉంచండి",
      tabRequests: "రిక్వెస్ట్‌లు",
      tabHistory: "చరిత్ర",
      tabRatings: "రేటింగ్‌లు",
      noPending: "పెండింగ్ రిక్వెస్ట్‌లు లేవు",
      noPendingHint: "కొత్త జాబ్ రిక్వెస్ట్‌లు ఇక్కడ కనిపిస్తాయి",
      newBadge: "కొత్తది",
      from: "నుండి:",
      to: "వరకు:",
      decline: "తిరస్కరించు",
      accept: "అంగీకరించు",
      acceptedHint: "{count} అంగీకరించబడింది",
      reviewsCount: "312 సమీక్షలు",
      monthEarnings: "ఈ నెల ఆదాయం",
      viewFullReport: "పూర్తి నివేదిక చూడండి",
      headToPlatform: "ప్లాట్‌ఫారమ్‌కి వెళ్లండి!",
    },
    admin: {
      statusCompleted: "పూర్తయింది",
      statusActive: "సక్రియం",
      statusPending: "పెండింగ్",
      panelTag: "అడ్మిన్ ప్యానెల్",
      title: "సిస్టమ్ అవలోకనం",
      subtitle: "బుకింగ్‌లు, కూలీలు మరియు ప్లాట్‌ఫారమ్ స్థితిని పర్యవేక్షించండి",
      totalBookings: "మొత్తం బుకింగ్‌లు",
      activePorters: "సక్రియ కూలీలు",
      revenue: "ఆదాయం",
      completionRate: "పూర్తి శాతం",
      tabBookings: "బుకింగ్‌లు",
      tabPorters: "కూలీలు",
      bookingSearchPlaceholder: "ప్రయాణికుడు, కూలీ లేదా బుకింగ్ ఐడి ద్వారా వెతకండి...",
      porterSearchPlaceholder: "కూలీలను వెతకండి...",
      tableBookingId: "బుకింగ్ ఐడి",
      tablePassenger: "ప్రయాణికుడు",
      tablePorter: "కూలీ",
      tableRoute: "రూట్",
      tableAmount: "మొత్తం",
      tableStatus: "స్థితి",
      tableDate: "తేదీ",
      porterPrefix: "కూలీ:",
      available: "అందుబాటులో",
      busy: "బిజీ",
      jobs: "పనులు",
      perTrip: "ఒక ట్రిప్‌కు",
    },
  },
};

export const isLocale = (value: string): value is Locale =>
  Object.prototype.hasOwnProperty.call(DICTIONARIES, value);

export const interpolate = (template: string, params: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(params[key] ?? `{${key}}`));
