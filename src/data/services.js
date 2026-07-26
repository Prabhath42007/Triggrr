/**
 * ============================================================
 * services.js — Single source of truth for all Triggrr content
 * ============================================================
 * Edit here → changes propagate to Home cards, Services page,
 * search results, meta tags, and FAQ accordion automatically.
 *
 * TABLE OF CONTENTS:
 *   1. SITE CONFIG
 *   2. NICHES
 *   3. SERVICES   ← taglines & problem copy rewritten for emotion + curiosity
 *   4. SEARCH
 *   5. STATS
 *   6. FAQ
 *   7. HOW IT WORKS
 *   8. TARGET CLIENTS
 * ============================================================
 */

// ============================================================
// 1. SITE CONFIG
// ============================================================
export const SITE = {
  name:        'Triggrr',
  tagline:     'Automate-Grow-Scale',
  description: 'We automate the repetitive tasks eating your time — lead follow-ups, price monitoring, product listings, support tickets — so you can focus on growing your business.',
  email:       'prabhath@triggrrtech.com',
  whatsapp:    '+919381149845',
  whatsappUrl: 'https://wa.me/919381149845?text=Hi%20Triggrr!%20I%20want%20to%20know%20more%20about%20your%20automation%20services.',
  location:    'Andhra Pradesh, India',
  founder:     'Prabhath',
  domain:      'triggrrtech.com',
  ga4Id:       'G-11WY8EZ6ZB',

  social: {
    instagram: 'https://www.instagram.com/triggrr.tech/',
    twitter:   'https://x.com/TriggrrTech',
    linkedin:  'https://www.linkedin.com/company/triggrr-tech/about/?viewAsMember=true',
    youtube:   'https://www.youtube.com/@Triggrr-tech',
  },
}

// ============================================================
// 2. NICHES
// ============================================================
// HOW TO ADD A NEW NICHE: Copy any object below, change the id,
// fill label/icon/description/color/targetClient/searchTerms,
// then add services below with nicheId matching the new id.
// HOW TO REMOVE: Delete the object + remove services with that nicheId.
// ============================================================

export const NICHES = [
  {
    id:           'ecommerce',
    label:        'E-commerce & Marketplace',
    shortLabel:   'E-commerce',
    icon:         'ti-shopping-cart',
    description:  'For Amazon, Flipkart, Shopify, and Etsy sellers scaling their online store',
    color:        'cyan',
    targetClient: 'Online sellers with 50+ products or 100+ orders per month',
    searchTerms:  ['amazon', 'flipkart', 'shopify', 'etsy', 'online store', 'marketplace', 'seller', 'product', 'listing', 'price', 'review'],
  },
  {
    id:           'sales',
    label:        'Sales & Lead Generation',
    shortLabel:   'Sales',
    icon:         'ti-chart-arrows',
    description:  'For businesses running ads or generating leads through forms and social media',
    color:        'purple',
    targetClient: 'Businesses spending on ads but losing leads to slow follow-up',
    searchTerms:  ['lead', 'crm', 'sales', 'follow up', 'form', 'inquiry', 'prospect', 'convert'],
  },
  {
    id:           'support',
    label:        'Customer Support',
    shortLabel:   'Support',
    icon:         'ti-headset',
    description:  'For businesses handling 50+ support tickets or queries every day',
    color:        'cyan',
    targetClient: 'E-commerce brands and service businesses drowning in repetitive customer questions',
    searchTerms:  ['support', 'ticket', 'customer', 'helpdesk', 'chat', 'query', 'complaint', 'reply'],
  },
  // ── FUTURE NICHES — uncomment + fill when adding a new category ──
  // {
  //   id:           'finance',
  //   label:        'Finance & Accounting',
  //   shortLabel:   'Finance',
  //   icon:         'ti-receipt',
  //   description:  'For CA firms, accountants, and finance teams',
  //   color:        'purple',
  //   targetClient: 'Accounting firms processing 100+ invoices per month',
  //   searchTerms:  ['invoice', 'billing', 'accounting', 'gst', 'tally', 'ca', 'finance'],
  // },
]

// ============================================================
// 3. SERVICES
// ============================================================
// HOW TO ADD A SERVICE: Copy the template at the bottom of this
// array, fill every field, set nicheId to an existing NICHES id.
// HOW TO REMOVE: Delete the object.
// HOW TO REORDER: Move objects within the array.
// HOW TO ADD A VIDEO: Set youtubeId to the 11-char ID from URL.
//   e.g. youtu.be/kbkyW1aUen8 → youtubeId: 'kbkyW1aUen8'
//   Set to null to show "Coming soon" placeholder.
//
// TRIAL OBJECT shape:
//   { headline, duration, what[] }
//   duration: '7 days' | '14 days' | 'One-time' etc.
//   what: exactly 4 bullet strings (shown in 2×2 grid)
// ============================================================

export const SERVICES = [

  // ──────────────────────────────────────────────────────────
  // NICHE: E-COMMERCE & MARKETPLACE
  // ──────────────────────────────────────────────────────────

  {
    id:          3,
    slug:        'product-listing-engine',
    nicheId:     'ecommerce',
    icon:        'ti-tag',
    accentColor: 'cyan',

    title:     'AI Product Listing Engine',
    tagline:   "Your product is sitting on page 4 of Amazon. Not because it's bad. Because your competitor's title has 143 keywords and yours says 'Blue Cotton Shirt'.",
    shortDesc: 'Feed a spreadsheet, get keyword-rich platform-ready listings published across Amazon, Shopify, and Etsy — automatically, while you sleep.',
    youtubeId: null,

    problem: {
      hook:   "Page 1 of Amazon is not won by the best product. It's won by the best title.",
      detail: "Search your own product category right now. The top results have 150-character keyword-packed titles, five bullet points hitting every buyer intent, and 300-word descriptions matching exactly what customers search. Yours probably has copy-pasted supplier text. Amazon's algorithm made its decision the day you listed it.",
    },

    searchKeywords: [
      'product listing', 'amazon listing', 'shopify listing', 'etsy listing',
      'seo description', 'bulk listing', 'product title', 'keywords',
      'catalogue', 'product upload', 'content generation',
    ],

    what: {
      input:   'Google Sheet with raw product data — name, category, material, features, price',
      process: 'Claude AI generates platform-specific title, 3 bullet points, full SEO description, and meta keywords per product per platform',
      output:  'Auto-published to Shopify API / Amazon SP-API — one row triggers listings across all platforms simultaneously',
    },

    tech: ['Google Sheets', 'Make / n8n', 'Claude AI', 'Shopify API', 'Amazon SP-API', 'PostgreSQL'],

    roiStat:  '₹1',
    roiLabel: 'per listing generated — 500 products = ₹500 total',
    roiNote:  'Sellers using AI-generated listings report 40–60% improvement in organic search visibility within 30 days.',

    trial: {
      headline: 'We generate your first 25 listings — free',
      duration: 'One-time',
      what: [
        '25 AI-written, platform-specific listings',
        'Title, bullets, description & keywords',
        'Amazon or Shopify ready to publish',
        'No card. No contract. No catch.',
      ],
    },

    pricing: [
      {
        name:     'Setup',
        price:    '₹8,000',
        period:   'one-time',
        popular:  false,
        priceNote: 'Up to ₹20,000 for multiple platforms + large catalogues',
        features: [
          'Full pipeline setup & testing',
          'Google Sheets → platform connection',
          'Multi-platform: Shopify, Amazon, Etsy',
          'Status tracking dashboard',
          'Error log & retry system',
          '7-day post-launch support',
        ],
      },
      {
        name:    'Per Listing',
        price:   '₹1–2',
        period:  '/product',
        popular: true,
        features: [
          'Platform-specific optimised title',
          'Three SEO bullet points',
          'Full product description',
          'Meta keywords included',
          'Unique content (no duplicate flags)',
          'Pay only for what you generate',
        ],
      },
      {
        name:     'Monthly Retainer',
        price:    '₹3,000',
        period:   '/month',
        popular:  false,
        priceNote: 'Up to ₹6,000/month for large catalogues',
        features: [
          'Auto-listing new products on arrival',
          'Seasonal keyword refreshes',
          'Performance monitoring',
          'Priority support',
        ],
      },
    ],

    retainer: null,
    architecture: 'Google Sheets (Pending rows) → n8n iterator → Claude AI (title + bullets + description + keywords) → Shopify / Amazon SP-API → status update → error log',
  },

  // ─────────────────────────────────────────

  {
    id:          4,
    slug:        'review-mining',
    nicheId:     'ecommerce',
    icon:        'ti-chart-dots-3',
    accentColor: 'purple',

    title:     'AI Review Mining & Competitor Intelligence',
    tagline:   "4,200 customers wrote exactly what they hate about your competitor's product. Every word is a product improvement, a listing tweak, or an ad headline. You've never read a single one.",
    shortDesc: "Analyse thousands of competitor reviews in 60 seconds. Find the exact product gaps, customer language, and untapped opportunities your rivals haven't noticed either.",
    youtubeId: 'KEnSKI-i1gU',

    problem: {
      hook:   "The blueprint to beat your biggest competitor is sitting in their 1-star reviews. All 4,000 of them.",
      detail: "A customer angry enough to write a 1-star review spends 10 minutes telling the internet exactly why — the exact failure, the exact broken promise, the exact word that shattered their trust. That's your product roadmap. That's your ad copy. That's your competitive edge — sitting public on Amazon, completely ignored.",
    },

    searchKeywords: [
      'review analysis', 'competitor intelligence', 'amazon reviews', 'flipkart reviews',
      'sentiment analysis', 'product research', 'customer feedback', 'competitor research',
      'review scraping', 'market research', 'product gap analysis',
    ],

    what: {
      input:   'Amazon or Flipkart product URLs — your products and up to 3 competitors',
      process: 'Python scraper collects reviews → Claude AI analyses sentiment, complaints, feature gaps, and exact customer language patterns',
      output:  'Weekly intelligence report: top complaints, untapped features, copywriting hooks, SEO keywords from real customer language',
    },

    tech: ['Python', 'Playwright', 'BeautifulSoup', 'Claude AI', 'PostgreSQL', 'n8n', 'Excel / PDF'],

    roiStat:  '60 sec',
    roiLabel: 'to analyse 4,000 reviews vs 3 weeks manually',
    roiNote:  'One insight from one report has paid for 12 months of this service for our clients.',

    trial: {
      headline: 'Free competitor intelligence report — on us',
      duration: 'One-time',
      what: [
        'Your top competitor fully analysed',
        'Top complaints, gaps & keywords mapped',
        'Delivered as PDF within 48 hours',
        'No card. No contract. No catch.',
      ],
    },

    pricing: [
      {
        name:     'One-Time Report',
        price:    '₹5,000',
        period:   'one-time',
        popular:  false,
        priceNote: 'Up to ₹12,000 for your product + 3 competitors, full deep analysis',
        features: [
          'Your product + up to 3 competitors',
          'Full sentiment analysis',
          'Top complaint clustering',
          'Untapped feature gaps',
          'Exact copywriting hooks',
          'SEO keywords from real reviews',
          'PDF + Excel delivery',
        ],
      },
      {
        name:     'Monthly Intelligence',
        price:    '₹3,000',
        period:   '/month',
        popular:  true,
        priceNote: 'Up to ₹6,000/month based on product count',
        features: [
          'Weekly automated review scrape',
          'Sentiment trend tracking',
          'New complaint & praise alerts',
          'Competitor price-drop correlation',
          'Monday morning email report',
          'All historical data retained',
        ],
      },
    ],

    retainer: null,
    architecture: 'Python + Playwright (scraper) → PostgreSQL (versioned review storage) → Claude AI batch analysis → n8n weekly schedule → Excel + PDF report → email to client',
  },

  // ─────────────────────────────────────────

  {
    id:          5,
    slug:        'price-monitoring',
    nicheId:     'ecommerce',
    icon:        'ti-eye',
    accentColor: 'cyan',

    title:     'Price Monitoring System',
    tagline:   "You lost the Buy Box at 2:47am. You found out at 9:15am when you checked manually. By then you'd already lost ₹18,000 in sales to a competitor who undercut you by ₹10.",
    shortDesc: 'Monitor 1,000 products across Amazon & Flipkart every 2 hours. Know the moment a competitor drops their price — before your sales drop with it.',
    youtubeId: 'GxS7sBbRdx8',

    problem: {
      hook:   "Amazon's Buy Box algorithm updates every 15 minutes. You check competitor prices once a day. That gap is costing you money every single night.",
      detail: "One overnight drop — ₹10 cheaper, Buy Box gone, traffic shifted — and you wake up to a terrible sales day with no idea why. You spend 30 minutes manually checking. You find it. You match it. The Buy Box comes back. But the morning is gone, and the lost sales don't come back. This system finds the drop in under 2 minutes and sends you an alert before you've had your first chai.",
    },

    searchKeywords: [
      'price monitoring', 'price tracker', 'amazon price', 'flipkart price',
      'buy box', 'competitor price', 'price alert', 'price drop',
      'repricing', 'price history', 'marketplace pricing',
    ],

    what: {
      input:   'Amazon and Flipkart search URLs — your keywords, categories, competitor ASINs',
      process: 'Playwright scrapes 1,000 products every 2–4 hours → PostgreSQL stores price history → Python detects drops → alerts fire instantly',
      output:  'Real-time Slack / email alert: product name, old price, new price, drop %, competitor link — all in one message',
    },

    tech: ['Python', 'Playwright', 'PostgreSQL', 'rapidfuzz', 'n8n', 'FastAPI'],

    roiStat:  '₹10,000+',
    roiLabel: 'in Buy Box revenue protected per incident',
    roiNote:  'One recovered Buy Box session pays for 3 months of this service. The price difference between winning and losing is often just ₹10.',

    trial: {
      headline: 'Monitor your first 50 products — free',
      duration: '7 days',
      what: [
        '50 products tracked every 4 hours',
        'Live Slack or email price drop alerts',
        'Full price history report at end',
        'No card. No contract. No catch.',
      ],
    },

    pricing: [
      {
        name:    'Basic',
        price:   '₹499',
        period:  'one-time',
        popular: false,
        features: [
          '50 products monitored',
          'One-time Excel price snapshot',
          'Basic competitor comparison',
          'No ongoing alerts',
        ],
      },
      {
        name:    'Standard',
        price:   '₹1,200',
        period:  'one-time',
        popular: false,
        features: [
          '200 products monitored',
          'Excel output + Slack alerts',
          'Alerts on drops of 5% or more',
          '1 month of monitoring',
        ],
      },
      {
        name:    'Premium',
        price:   '₹2,500',
        period:  'one-time',
        popular: true,
        features: [
          '500 products monitored',
          '4× daily monitoring checks',
          'Slack + email real-time alerts',
          '1 month of price history reports',
          'Full setup included',
        ],
      },
    ],

    retainer: {
      price:     '₹1,500',
      period:    '/month',
      priceNote: 'Up to ₹3,000/month based on product volume',
      features: [
        '24/7 automated monitoring',
        'Weekly trend & history reports',
        'Instant price drop alerts',
        'Buy Box win / loss tracking',
        'Priority support',
      ],
    },

    architecture: 'n8n schedule → FastAPI /scrape endpoint → Python + Playwright (up to 1,000 products) → PostgreSQL price history → drop detection → Slack + email alert → weekly report',
  },

  // ──────────────────────────────────────────────────────────
  // NICHE: SALES & LEAD GENERATION
  // ──────────────────────────────────────────────────────────

  {
    id:          1,
    slug:        'lead-management',
    nicheId:     'sales',
    icon:        'ti-send',
    accentColor: 'purple',

    title:     'Lead Management Automation',
    tagline:   "Right now, someone just submitted a form on your competitor's site. They got a reply in 4 seconds. You haven't seen your own lead yet.",
    shortDesc: 'Respond to every new lead in 5 seconds — personalised, validated, and logged — before your competitor even opens their laptop.',
    youtubeId: 'kbkyW1aUen8',

    problem: {
      hook:   "You're not losing clients to better products. You're losing them to faster replies.",
      detail: "78% of buyers choose the first business to respond. Your lead sits in a Gmail tab for 2–6 hours while your team handles other things. By the time you call, they've already spoken to two competitors and half-decided. This system replies in 5 seconds — personalised, validated, and routed — every time, without anyone checking anything.",
    },

    searchKeywords: [
      'lead management', 'lead automation', 'crm automation', 'form automation',
      'follow up automation', 'lead response', 'lead scoring', 'email automation',
      'sales automation', 'lead routing', 'lead nurture', 'response time',
    ],

    what: {
      input:   'Any web form, Typeform, Google Form, or CSV export from your ad platform',
      process: 'Python validates email & phone → Claude AI scores lead quality → assigns to sales rep via round-robin → sends personalised email',
      output:  'Slack alert + Google Sheet update + personalised email to lead — all within 5 seconds of form submission',
    },

    tech: ['Python', 'n8n', 'Claude AI', 'Gmail', 'Google Sheets', 'Slack'],

    roiStat:  '5 sec',
    roiLabel: 'average lead response time vs 2–6 hour industry average',
    roiNote:  'The gap between a 5-second reply and a 4-hour reply is the difference between a closed deal and a ghosted lead.',

    trial: {
      headline: 'We automate your next 50 leads — free',
      duration: '14 days',
      what: [
        'Your form connected & live-tested',
        '50 leads routed, validated & replied to',
        'Full Slack + Google Sheets log',
        'No card. No contract. No catch.',
      ],
    },

    pricing: [
      {
        name:    'Basic',
        price:   '₹499',
        period:  'one-time',
        popular: false,
        features: [
          '1 form source (any platform)',
          'Gmail auto-reply',
          'Google Sheets lead log',
          '5-second response guarantee',
        ],
      },
      {
        name:    'Standard',
        price:   '₹1,200',
        period:  'one-time',
        popular: true,
        features: [
          'Multiple form sources',
          'Round-robin rep assignment',
          'Slack team alerts',
          'Email & phone validation',
          'Duplicate lead detection',
        ],
      },
      {
        name:    'Premium',
        price:   '₹2,500',
        period:  'one-time',
        popular: false,
        features: [
          'Everything in Standard',
          'AI-personalised email per lead',
          'Lead quality scoring & filtering',
          '14-day post-launch support',
          'Full setup & team onboarding',
        ],
      },
    ],

    retainer: {
      price:    '₹1,500',
      period:   '/month',
      features: [
        'Ongoing system management',
        'New rep onboarding',
        'Monthly performance reports',
        'Priority support',
      ],
    },

    architecture: 'Form submission → Python (validate email + phone) → n8n routing → Claude AI (personalise email) → Gmail → Google Sheets log → Slack alert',
  },

  // ──────────────────────────────────────────────────────────
  // NICHE: CUSTOMER SUPPORT
  // ──────────────────────────────────────────────────────────

  {
    id:          2,
    slug:        'ai-support-triage',
    nicheId:     'support',
    icon:        'ti-message-chatbot',
    accentColor: 'cyan',

    title:     'AI Customer Support Triage',
    tagline:   "Your support team answered the same question for the 47th time today. The customer waited 8 hours for an answer they could have had in 8 seconds. And they're not coming back.",
    shortDesc: '60–70% of support tickets answered instantly by AI. Your team only sees the ones that actually need a human.',
    youtubeId: 'd3penZ1sLuE',

    problem: {
      hook:   "Every delayed reply is a customer quietly composing a 1-star review in their head.",
      detail: "The vast majority of every support ticket is a question your team has already answered dozens of times. The customer asking 'What's your return policy?' at 11pm doesn't want empathy — they want an answer in 10 seconds. The 8-hour wait doesn't make them feel cared for. It makes them angry enough to post about it publicly.",
    },

    searchKeywords: [
      'customer support', 'support automation', 'ticket triage', 'helpdesk automation',
      'ai chatbot', 'auto reply', 'zendesk automation', 'gmail automation',
      'customer service', 'support bot', 'faq bot', 'ticket routing',
    ],

    what: {
      input:   'Gmail, Helpscout, or Zendesk incoming ticket',
      process: 'Claude AI classifies intent → known query = instant auto-reply from your knowledge base → unknown = tagged + escalated to human with full context',
      output:  '60–70% of tickets resolved automatically, remaining routed to your team with conversation summary pre-loaded',
    },

    tech: ['n8n', 'Claude AI', 'Gmail / SMTP', 'Airtable', 'Slack', 'Zendesk'],

    roiStat:  '5–15 hrs',
    roiLabel: 'of agent time saved every single week',
    roiNote:  'At ₹200/hr agent cost = ₹4,000–12,000 saved per month. System pays for itself within the first week.',

    trial: {
      headline: 'We triage your next 100 tickets — free',
      duration: '7 days',
      what: [
        'AI trained on your top 20 query types',
        '100 tickets auto-classified & replied to',
        'Weekly report with resolution rate',
        'No card. No contract. No catch.',
      ],
    },

    pricing: [
      {
        name:     'Setup',
        price:    '₹8,000',
        period:   'one-time',
        popular:  false,
        priceNote: 'Up to ₹15,000 depending on ticket volume & platform',
        features: [
          'Full triage system setup',
          'Knowledge base configuration',
          'AI intent classification',
          'Auto-reply templates (up to 20 types)',
          'Slack escalation routing',
          'Airtable audit log',
          '7-day post-launch support',
        ],
      },
      {
        name:     'Monthly Management',
        price:    '₹3,000',
        period:   '/month',
        popular:  true,
        priceNote: 'Up to ₹6,000/month based on ticket volume',
        features: [
          'Knowledge base updates',
          'New query type training',
          'Weekly performance report',
          'Escalation rule refinement',
          'Priority support',
        ],
      },
    ],

    retainer: null,
    architecture: 'Gmail / Zendesk webhook → Claude AI (classify intent) → Branch: auto-reply from KB OR Slack escalation with context → Airtable audit log → weekly summary report',
  },

  // ──────────────────────────────────────────────────────────
  // TEMPLATE — Copy this block to add a new service
  // ──────────────────────────────────────────────────────────
  // {
  //   id:          6,                         // ← next number in sequence
  //   slug:        'invoice-automation',      // ← lowercase-hyphenated, used in URL
  //   nicheId:     'finance',                // ← must match a NICHES[].id
  //   icon:        'ti-receipt',             // ← tabler icon: tabler.io/icons
  //   accentColor: 'purple',                // ← 'purple' or 'cyan'
  //   title:       'Invoice Automation',
  //   tagline:     'One emotionally triggering line that hooks the reader.',
  //   shortDesc:   'Two-sentence description for the home page card.',
  //   youtubeId:   null,                    // ← 'VIDEO_ID' or null
  //   problem: {
  //     hook:   'Bold one-sentence problem statement.',
  //     detail: 'Two-three sentence expansion of the pain.',
  //   },
  //   searchKeywords: ['invoice', 'billing'],
  //   what: {
  //     input:   'What the business provides',
  //     process: 'What the system does',
  //     output:  'What the business receives',
  //   },
  //   tech: ['Python', 'n8n'],
  //   roiStat:  '10 hrs', roiLabel: 'saved per week', roiNote: 'Proof statement.',
  //   trial: {
  //     headline: 'Try [specific thing] — free',
  //     duration: '7 days',
  //     what: [
  //       'Specific deliverable 1',
  //       'Specific deliverable 2',
  //       'Specific deliverable 3',
  //       'No card. No contract. No catch.',
  //     ],
  //   },
  //   pricing: [{ name, price, period, popular, features[], priceNote? }],
  //   retainer: null,
  //   architecture: 'Tool A → Tool B → Tool C',
  // },
]

// ============================================================
// 4. SEARCH UTILITY FUNCTIONS
// ============================================================

export function searchServices(query = '') {
  const q = query.toLowerCase().trim()
  if (!q) return SERVICES
  const words = q.split(/\s+/).filter(Boolean)
  return SERVICES.filter(service => {
    const niche = NICHES.find(n => n.id === service.nicheId)
    const haystack = [
      service.title, service.shortDesc, service.tagline,
      service.problem?.hook ?? '', service.problem?.detail ?? '',
      niche?.label ?? '', niche?.description ?? '',
      ...(service.searchKeywords ?? []),
      ...(service.tech ?? []),
      ...(niche?.searchTerms ?? []),
    ].join(' ').toLowerCase()
    return words.every(word => haystack.includes(word))
  })
}

export function getServicesByNiche(nicheId) {
  return SERVICES.filter(s => s.nicheId === nicheId)
}

export function getServiceBySlug(slug) {
  return SERVICES.find(s => s.slug === slug)
}

export function buildContactRedirectUrl(query) {
  return `/get-started?service=${encodeURIComponent(query.trim())}`
}

// ============================================================
// 5. STATS
// ============================================================
export const STATS = [
  { value: '20+',   label: 'Hours saved per client / month'       },
  { value: '5',     label: 'Flagship automations available'        },
  { value: '5 sec', label: 'Fastest lead response time built'      },
  { value: '₹1',    label: 'Cost per AI-generated product listing' },
]

// ============================================================
// 6. FAQ
// ============================================================
export const FAQ = [
  {
    q: 'Do I need any coding knowledge to use these automations?',
    a: 'Zero. We build, test, and hand over the complete system. You use it like any other tool — no code, no complexity on your end.',
  },
  {
    q: 'What exactly do I get in the free trial?',
    a: "Each service has a specific free trial — 50 leads automated, 50 products monitored for 7 days, 25 AI-generated listings, 100 tickets triaged, or a free competitor intelligence report. You get the full working system, real output on your real data, with no payment and no commitment required.",
  },
  {
    q: 'What happens if the automation breaks after I pay?',
    a: 'Every project includes a support period (7–14 days depending on the package). If anything breaks during that window, we fix it at no cost. Monthly retainer clients get ongoing priority support indefinitely.',
  },
  {
    q: 'Is my business data safe?',
    a: "Yes. Your data is processed only by enterprise-grade tools in the stack (Google, n8n, Airtable, Anthropic). We do not store your customer data on our own servers. Every automation runs inside your own accounts — you fully own and control everything.",
  },
  {
    q: 'Do you accept UPI or other Indian payment methods?',
    a: 'Yes, we accept UPI (GPay, PhonePe, Paytm), bank transfer (NEFT / IMPS), and Razorpay. Payment details are shared after the free consultation call.',
  },
  {
    q: 'How long does it take to build and deliver?',
    a: "Basic and Standard packages are delivered within 2–4 business days. Premium and custom builds take 5–10 business days. We give you a firm timeline on the free consultation call before you pay anything.",
  },
  {
    q: 'Can I request an automation that is not listed here?',
    a: "Absolutely. Use the search bar on the Services page to describe what you need — if we don't offer it yet, you'll see a direct option to request it. We build custom Python & AI workflows for any repetitive business process.",
  },
  {
    q: 'What is a monthly retainer and do I need one?',
    a: "A retainer means we actively manage and maintain your automation every month — updating it as your business changes, training it on new data, generating performance reports, and fixing issues immediately. It's optional but recommended for systems that directly touch revenue.",
  },
]

// ============================================================
// 7. HOW IT WORKS
// ============================================================
export const HOW_IT_WORKS = [
  {
    step:  '01',
    title: 'Tell us the problem',
    desc:  'Fill the contact form in 2 minutes. Describe what task is eating your time — no jargon or technical knowledge needed.',
  },
  {
    step:  '02',
    title: 'Free consultation call',
    desc:  "We map out exactly what to automate, which tools we'll use, and give you a firm price and timeline — no surprise costs.",
  },
  {
    step:  '03',
    title: 'We build & hand it over',
    desc:  'Ready in days, not months. We train you on the system and you start saving hours from week one.',
  },
]

// ============================================================
// 8. TARGET CLIENTS
// ============================================================
export const TARGET_CLIENTS = [
  'Amazon & Flipkart sellers',
  'Shopify & D2C stores',
  'Restaurants & food businesses',
  'Clinics & healthcare providers',
  'CA & accounting firms',
  'Real estate agents',
  'Coaching & education',
  'Manufacturing SMEs',
]
