/**
 * ============================================================
 * services.js — Single source of truth for all Triggrr content
 * ============================================================
 * Edit here → changes propagate to Home cards, Services page,
 * search results, meta tags, and FAQ accordion automatically.
 *
 * TABLE OF CONTENTS:
 *   1. SITE CONFIG
 *   2. NICHES       ← How to add/remove business categories
 *   3. SERVICES     ← How to add/remove individual services
 *   4. SEARCH       ← searchServices() + getServicesByNiche()
 *   5. STATS
 *   6. FAQ
 *   7. HOW IT WORKS
 *   8. TARGET CLIENTS
 * ============================================================
 */

// ============================================================
// 1. SITE CONFIG — global constants used across all pages
// ============================================================
export const SITE = {
  name:        'Triggrr',
  tagline:     'Automate. Grow. Scale.',
  description: 'We automate the repetitive tasks eating your time — invoices, reports, follow-ups — so you can focus on what actually grows your business.',
  email:       'triggrr.tech@gmail.com',
  whatsapp:    '+919381149845',
  whatsappUrl: 'https://wa.me/919381149845?text=Hi%20Triggrr!%20I%20want%20to%20know%20more%20about%20your%20automation%20services.',
  location:    'Andhra Pradesh, India',
  founder:     'Prabhath',
  domain:      'triggrrtech.com',
  // ↓ Get from analytics.google.com → Admin → Data Streams → Web stream details
  ga4Id:       'G-XXXXXXXXXX',

  social: {
    instagram: 'https://www.instagram.com/triggrr.tech/',
    twitter:   'https://x.com/TriggrrTech',
    linkedin:  'https://www.linkedin.com/company/triggrr-tech/about/?viewAsMember=true',
    youtube:   'https://www.youtube.com/@Triggrr-tech',
  },
}

// ============================================================
// 2. NICHES — Business categories that group related services
// ============================================================
//
// HOW TO ADD A NEW NICHE:
//   1. Copy any niche object below and paste it into the array
//   2. Change the `id` to a unique lowercase string (e.g. 'healthcare')
//   3. Fill in label, icon, description, color, targetClient
//   4. Add services to SERVICES array below with nicheId: 'healthcare'
//   That's it — the Services page groups cards automatically.
//
// HOW TO REMOVE A NICHE:
//   1. Remove the niche object from the array below
//   2. In SERVICES, either delete services with that nicheId
//      or move them to another nicheId
//
// HOW TO REORDER NICHES:
//   Drag the objects into the order you want — UI follows this order.
//
// ICONS: Use any Tabler Icon class name → https://tabler.io/icons
// COLOR: 'purple' or 'cyan' (maps to brand accent colors)
// ============================================================

export const NICHES = [
  // ── Niche 1 ──
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

  // ── Niche 2 ──
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

  // ── Niche 3 ──
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

  // ──────────────────────────────────────────────────────────
  // FUTURE NICHES — Uncomment + fill in `id` when adding a
  // new niche. Then add matching services below in SERVICES.
  // ──────────────────────────────────────────────────────────
  // {
  //   id:           'finance',
  //   label:        'Finance & Accounting',
  //   shortLabel:   'Finance',
  //   icon:         'ti-receipt',
  //   description:  'For CA firms, accountants, and finance teams',
  //   color:        'purple',
  //   targetClient: 'Accounting firms processing 100+ invoices per month',
  //   searchTerms:  ['invoice', 'billing', 'accounting', 'gst', 'tally', 'ca', 'finance', 'payment'],
  // },
  // {
  //   id:           'healthcare',
  //   label:        'Healthcare & Clinics',
  //   shortLabel:   'Healthcare',
  //   icon:         'ti-stethoscope',
  //   description:  'For clinics, hospitals, and health service providers',
  //   color:        'cyan',
  //   targetClient: 'Clinics booking 30+ appointments per day',
  //   searchTerms:  ['clinic', 'hospital', 'appointment', 'patient', 'doctor', 'healthcare', 'booking'],
  // },
  // {
  //   id:           'realestate',
  //   label:        'Real Estate',
  //   shortLabel:   'Real Estate',
  //   icon:         'ti-building',
  //   description:  'For real estate agents and property management companies',
  //   color:        'purple',
  //   targetClient: 'Agents handling 20+ property inquiries per week',
  //   searchTerms:  ['real estate', 'property', 'agent', 'rent', 'sale', 'listing', 'housing'],
  // },
]

// ============================================================
// 3. SERVICES — All service definitions
// ============================================================
//
// HOW TO ADD A NEW SERVICE:
//   1. Copy the template comment block at the bottom of this
//      array and paste it as a new object
//   2. Fill in every field (required: id, slug, nicheId, title)
//   3. Set nicheId to an existing NICHES[].id value
//   4. Set youtubeId to the 11-char ID from your YouTube URL
//      e.g. youtube.com/watch?v=ABC123XYZ01 → 'ABC123XYZ01'
//      Set to null if no video yet — shows "Coming Soon" badge
//   5. Save — both Home page cards and Services page update
//
// HOW TO REMOVE A SERVICE:
//   Delete the entire object from the array below.
//
// HOW TO REORDER SERVICES:
//   Move the objects into the order you want within each niche.
//
// PRICING SHAPE:
//   pricing[]: { name, price, period, popular, features[], priceNote? }
//   period: 'one-time' | '/month' | '/product'
//   popular: true shows the "Most Popular" badge on the card
//
// RETAINER SHAPE (optional):
//   retainer: { price, period, features[], priceNote? }
//   Set to null if service has no retainer option
// ============================================================

export const SERVICES = [

  // ──────────────────────────────────────────────────────────
  // NICHE: E-COMMERCE & MARKETPLACE
  // ──────────────────────────────────────────────────────────

  {
    id:          3,
    slug:        'product-listing-engine',
    nicheId:     'ecommerce',               // references NICHES[].id
    icon:        'ti-tag',
    accentColor: 'cyan',
    title:       'AI Product Listing Engine',
    tagline:     '500 products. SEO-optimised listings for Amazon, Shopify, and Etsy. Generated while you sleep.',
    shortDesc:   'Feed a spreadsheet, get platform-ready product listings published across all your channels automatically.',
    youtubeId:   null,                      // ← Paste your YouTube video ID here when uploaded
                                            //   e.g. 'dQw4w9WgXcQ' from youtu.be/dQw4w9WgXcQ

    searchKeywords: [
      'product listing', 'amazon listing', 'shopify listing', 'etsy listing',
      'seo description', 'bulk listing', 'product title', 'keywords',
      'catalogue', 'product upload', 'content generation',
    ],

    problem: {
      hook:   'Writing one product listing takes 30 minutes. You have 500 products.',
      detail: "That's 250 hours of copy work. And most sellers paste supplier descriptions which get flagged for duplicate content and never rank. This generates unique, keyword-rich, platform-specific listings at scale — in minutes.",
    },

    what: {
      input:   'Google Sheet with raw product data — name, category, material, features, price',
      process: 'Claude AI generates platform-specific title, 3 bullet points, full SEO description, and meta keywords per product per platform',
      output:  'Auto-published to Shopify API / Amazon SP-API — one row triggers listings across all platforms simultaneously',
    },

    tech: ['Google Sheets', 'Make / n8n', 'Claude AI', 'Shopify API', 'Amazon SP-API', 'PostgreSQL'],

    roiStat:  '₹1',
    roiLabel: 'per listing generated — 500 products = ₹500 total',
    roiNote:  'Sellers using AI-generated listings report 40–60% improvement in organic search visibility within 30 days.',

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

    retainer: null, // retainer is already included in pricing above

    architecture: 'Google Sheets (Pending rows) → n8n iterator → Claude AI (title + bullets + description + keywords) → Shopify / Amazon SP-API → status update → error log',
  },

  // ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ──

  {
    id:          4,
    slug:        'review-mining',
    nicheId:     'ecommerce',
    icon:        'ti-chart-dots-3',
    accentColor: 'purple',
    title:       'AI Review Mining & Competitor Intelligence',
    tagline:     "Your competitors' reviews are telling you exactly how to beat them. This reads all 4,000 of them in 60 seconds.",
    shortDesc:   'Analyse thousands of competitor reviews to find product gaps, customer language, and untapped opportunities.',
    youtubeId:   'KEnSKI-i1gU',             // ← real video: youtu.be/KEnSKI-i1gU

    searchKeywords: [
      'review analysis', 'competitor intelligence', 'amazon reviews', 'flipkart reviews',
      'sentiment analysis', 'product research', 'customer feedback', 'competitor research',
      'review scraping', 'market research', 'product gap analysis',
    ],

    problem: {
      hook:   'A product page has 4,000 reviews — and you have read maybe 30.',
      detail: "Inside those reviews: the exact words customers use, the features they beg for, and the flaws your competitors have not fixed. Every unanswered complaint is a gap your product can own.",
    },

    what: {
      input:   'Amazon or Flipkart product URLs — your products and competitors',
      process: 'Python scraper collects reviews → Claude AI analyses sentiment, complaints, feature gaps, and exact customer language patterns',
      output:  'Weekly intelligence report: top complaints, untapped features, copywriting hooks, SEO keywords extracted from real customer language',
    },

    tech: ['Python', 'Playwright', 'BeautifulSoup', 'Claude AI', 'PostgreSQL', 'n8n', 'Excel / PDF'],

    roiStat:  '60 sec',
    roiLabel: 'to analyse 4,000 reviews (vs. 3 weeks manually)',
    roiNote:  'One insight from one report has paid for 12 months of this service for our clients.',

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
          'Delivered as PDF + Excel',
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
          'Sentiment trend tracking over time',
          'New complaint & praise alerts',
          'Competitor price-drop correlation',
          'Monday morning email report',
          'All historical data retained in DB',
        ],
      },
    ],

    retainer: null,

    architecture: 'Python + Playwright (scraper) → PostgreSQL (versioned review storage) → Claude AI batch analysis → n8n weekly schedule → Excel + PDF report → email to client',
  },

  // ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ──

  {
    id:          5,
    slug:        'price-monitoring',
    nicheId:     'ecommerce',
    icon:        'ti-eye',
    accentColor: 'cyan',
    title:       'Price Monitoring System',
    tagline:     'Your competitor dropped their price at 3am. This system caught it. You slept. You still won the Buy Box.',
    shortDesc:   'Monitor 1,000 products across Amazon & Flipkart every 2 hours. Instant alerts the moment prices change.',
    youtubeId:   'GxS7sBbRdx8',             // ← real video: youtu.be/GxS7sBbRdx8

    searchKeywords: [
      'price monitoring', 'price tracker', 'amazon price', 'flipkart price',
      'buy box', 'competitor price', 'price alert', 'price drop',
      'repricing', 'price history', 'marketplace pricing',
    ],

    problem: {
      hook:   'Every hour a competitor is cheaper than you, Amazon ranks them higher.',
      detail: 'One unchecked overnight price drop can cost a mid-size seller ₹10,000–50,000 in lost Buy Box revenue before they wake up. Manual checking takes 30–60 minutes every morning and still misses 3am changes.',
    },

    what: {
      input:   'Amazon and Flipkart search URLs — your keywords, your categories, your competitor ASINs',
      process: 'Playwright scrapes 1,000 products every 2–4 hours → PostgreSQL stores price history → Python detects drops → alerts fire instantly',
      output:  'Real-time Slack / email alert: product name, old price, new price, drop %, competitor link — in one message',
    },

    tech: ['Python', 'Playwright', 'PostgreSQL', 'rapidfuzz', 'n8n', 'FastAPI'],

    roiStat:  '₹10,000+',
    roiLabel: 'in Buy Box revenue protected per incident',
    roiNote:  'One recovered Buy Box session pays for 3 months of this service. The price difference between winning and losing is often ₹10.',

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
    title:       'Lead Management Automation',
    tagline:     "The system that makes your first reply faster than your competitor's first coffee.",
    shortDesc:   'Respond to every new lead in 5 seconds. Validate, score, assign, and personalise — fully automated.',
    youtubeId:   'kbkyW1aUen8',             // ← real video: youtu.be/kbkyW1aUen8

    searchKeywords: [
      'lead management', 'lead automation', 'crm automation', 'form automation',
      'follow up automation', 'lead response', 'lead scoring', 'email automation',
      'sales automation', 'lead routing', 'lead nurture', 'response time',
    ],

    problem: {
      hook:   '78% of buyers choose the first business to respond.',
      detail: 'Most small teams take 2–6 hours to follow up on a form submission. By then, the lead has talked to three competitors. This system responds in 5 seconds — before the lead even closes their browser tab.',
    },

    what: {
      input:   'Any web form, Typeform, Google Form, or CSV export from your ad platform',
      process: 'Python validates email & phone → Claude AI scores lead quality → assigns to sales rep via round-robin → sends personalised email',
      output:  'Slack alert + Google Sheet update + personalised email to lead — all within 5 seconds of form submission',
    },

    tech: ['Python', 'n8n', 'Claude AI', 'Gmail', 'Google Sheets', 'Slack'],

    roiStat:  '5 sec',
    roiLabel: 'average lead response time (vs. 2–6 hour industry average)',
    roiNote:  'The gap between a 5-second reply and a 4-hour reply is often the difference between a closed deal and a ghosted lead.',

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
          'AI-personalised email copy per lead',
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
    title:       'AI Customer Support Triage',
    tagline:     'Turn 200 daily support tickets into 20 minutes of human work.',
    shortDesc:   '60–70% of support tickets answered instantly by AI. The rest routed to your team with full context.',
    youtubeId:   'd3penZ1sLuE',  
    searchKeywords: [
      'customer support', 'support automation', 'ticket triage', 'helpdesk automation',
      'ai chatbot', 'auto reply', 'zendesk automation', 'gmail automation',
      'customer service', 'support bot', 'faq bot', 'ticket routing',
    ],

    problem: {
      hook:   '60–70% of all support tickets are the same 10 questions.',
      detail: 'Every one answered manually — one by one — with a 12–48 hour delay that triggers refund requests, chargebacks, and 1-star reviews. Hiring more agents does not scale. This does.',
    },

    what: {
      input:   'Gmail, Helpscout, or Zendesk incoming ticket',
      process: 'Claude AI classifies intent → known query = instant auto-reply from your knowledge base → unknown = tagged + escalated to human with full context',
      output:  '60–70% of tickets resolved automatically, remaining routed to your team with conversation summary pre-loaded',
    },

    tech: ['n8n', 'Claude AI', 'Gmail / SMTP', 'Airtable', 'Slack', 'Zendesk'],

    roiStat:  '5–15 hrs',
    roiLabel: 'of agent time saved per week',
    roiNote:  'At ₹200/hr agent cost = ₹4,000–12,000 saved per month. System pays for itself within the first week.',

    pricing: [
      {
        name:     'Setup',
        price:    '₹8,000',
        period:   'one-time',
        popular:  false,
        priceNote: 'Up to ₹15,000 depending on ticket volume & existing platform',
        features: [
          'Full triage system setup',
          'Knowledge base configuration',
          'AI intent classification',
          'Auto-reply templates (up to 20 query types)',
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

    retainer: null, // retainer is already in the pricing tiers above

    architecture: 'Gmail / Zendesk webhook → Claude AI (classify intent) → Branch: auto-reply from KB OR Slack escalation with context → Airtable audit log → weekly summary report',
  },

  // ──────────────────────────────────────────────────────────
  // TEMPLATE — Copy this to add a new service
  // ──────────────────────────────────────────────────────────
  // {
  //   id:          6,                        // ← next number in sequence
  //   slug:        'invoice-automation',     // ← lowercase-hyphenated, used in URL
  //   nicheId:     'finance',               // ← must match a NICHES[].id above
  //   icon:        'ti-receipt',            // ← tabler icon class (tabler.io/icons)
  //   accentColor: 'purple',               // ← 'purple' or 'cyan'
  //   title:       'Invoice Automation',
  //   tagline:     'One-line tagline that hooks the reader.',
  //   shortDesc:   'Two-sentence description for the home page card.',
  //   youtubeId:   null,                   // ← 'VIDEO_ID' or null if not yet uploaded
  //
  //   searchKeywords: [
  //     'invoice', 'billing', 'payment', 'automation',
  //   ],
  //
  //   problem: {
  //     hook:   'One bold sentence stating the painful problem.',
  //     detail: 'Two-three sentences expanding the pain point.',
  //   },
  //
  //   what: {
  //     input:   'What the business provides to start the automation',
  //     process: 'What the system does step by step',
  //     output:  'What the business receives as the end result',
  //   },
  //
  //   tech: ['Python', 'n8n', 'Gmail'],   // ← array of tool/tech names
  //
  //   roiStat:  '10 hrs',
  //   roiLabel: 'saved per week',
  //   roiNote:  'One sentence proof statement.',
  //
  //   pricing: [
  //     {
  //       name:     'Basic',
  //       price:    '₹999',
  //       period:   'one-time',    // 'one-time' | '/month' | '/product'
  //       popular:  false,
  //       priceNote: '',          // optional range note
  //       features: ['Feature one', 'Feature two'],
  //     },
  //   ],
  //
  //   retainer: null,             // or { price, period, priceNote?, features[] }
  //   architecture: 'Tool A → Tool B → Tool C',
  // },
]

// ============================================================
// 4. SEARCH — Service search utility functions
// ============================================================
//
// SEARCH FLOW (how it works in the UI):
//
//   1. User types in the search bar on the Services page
//   2. searchServices(query) filters SERVICES in real time
//   3. Results update as user types (no submit needed)
//   4. IF results found  → show matching service cards
//   5. IF no results     → show "Not found" state with:
//        • Message: "We don't offer this yet"
//        • Button:  "Request this service →"
//        • Link to: /get-started?service=ENCODED_QUERY
//   6. On Contact.jsx, useSearchParams() reads ?service=
//      and pre-fills the "Describe your challenge" textarea
//      so the user's search query carries over naturally.
//
// This redirect logic lives in Services.jsx and Contact.jsx.
// This file only exports the search/filter functions.
// ============================================================

/**
 * Search services by free-text query.
 * Matches against title, description, keywords, niche label, and tech stack.
 * Multi-word queries use AND logic (all words must match somewhere).
 *
 * @param {string} query - User's search input
 * @returns {Array} - Filtered SERVICES array (empty array if no match)
 *
 * Usage in Services.jsx:
 *   const results = searchServices(query)
 *   if (results.length === 0) → show no-results UI with redirect
 */
export function searchServices(query = '') {
  const q = query.toLowerCase().trim()
  if (!q) return SERVICES

  const words = q.split(/\s+/).filter(Boolean)

  return SERVICES.filter(service => {
    const niche = NICHES.find(n => n.id === service.nicheId)

    const haystack = [
      service.title,
      service.shortDesc,
      service.tagline,
      service.problem?.hook  ?? '',
      service.problem?.detail ?? '',
      niche?.label           ?? '',
      niche?.description     ?? '',
      ...(service.searchKeywords ?? []),
      ...(service.tech            ?? []),
      ...(niche?.searchTerms      ?? []),
    ].join(' ').toLowerCase()

    // AND logic: every typed word must appear somewhere in the text
    return words.every(word => haystack.includes(word))
  })
}

/**
 * Get all services belonging to a specific niche.
 * Used by the Services page to render grouped sections.
 *
 * @param {string} nicheId - e.g. 'ecommerce', 'sales', 'support'
 * @returns {Array} - Services for that niche
 */
export function getServicesByNiche(nicheId) {
  return SERVICES.filter(s => s.nicheId === nicheId)
}

/**
 * Get a single service by its URL slug.
 * Used for deep-linking to a specific service section.
 *
 * @param {string} slug - e.g. 'price-monitoring'
 * @returns {Object|undefined}
 */
export function getServiceBySlug(slug) {
  return SERVICES.find(s => s.slug === slug)
}

/**
 * Build the "no results" redirect URL for the Contact page.
 * Call this when searchServices() returns an empty array.
 *
 * @param {string} query - The user's search query
 * @returns {string} - URL string like /get-started?service=price+monitoring
 */
export function buildContactRedirectUrl(query) {
  return `/get-started?service=${encodeURIComponent(query.trim())}`
}

// ============================================================
// 5. STATS — Hero stats bar on the Home page
// Update as you complete more projects.
// ============================================================

export const STATS = [
  { value: '20+',   label: 'Hours saved per client / month' },
  { value: '5',     label: 'Flagship automations available'  },
  { value: '5 sec', label: 'Fastest lead response time built' },
  { value: '₹1',    label: 'Cost per AI-generated product listing' },
]

// ============================================================
// 6. FAQ — Accordion on the Home page
// Add/remove objects to add/remove FAQ items.
// ============================================================

export const FAQ = [
  {
    q: 'Do I need any coding knowledge to use these automations?',
    a: 'Zero. We build, test, and hand over the complete system. You use it like any other tool — no code, no complexity on your end.',
  },
  {
    q: 'What happens if the automation breaks after I pay?',
    a: 'Every project includes a support period (7–14 days depending on the package). If anything breaks during that window, we fix it at no cost. Premium packages include 14-day support. Monthly retainer clients get ongoing priority support indefinitely.',
  },
  {
    q: 'Is my business data safe?',
    a: "Yes. Your data is processed only by enterprise-grade tools in the stack (Google, n8n, Airtable, Anthropic). We do not store your customer data on our own servers. Every automation runs inside your own accounts which you fully own and control.",
  },
  {
    q: 'Do you accept UPI or other Indian payment methods?',
    a: 'Yes, we accept UPI (GPay, PhonePe, Paytm), bank transfer (NEFT / IMPS), and Razorpay. Payment details are shared after the free consultation call.',
  },
  {
    q: 'How long does it take to build and deliver?',
    a: "Basic and Standard packages are typically delivered within 2–4 business days. Premium and custom builds take 5–10 business days. We'll give you a firm timeline on the free consultation call before you pay anything.",
  },
  {
    q: 'Can I request an automation that is not listed here?',
    a: "Absolutely. The five services above are the most requested ones, but we build custom Python & AI workflows for any repetitive business process. Use the search bar to describe your need — if it's not listed, you can request it directly from there.",
  },
  {
    q: 'Do you work with businesses outside India?',
    a: 'We primarily serve Indian small businesses right now, but we work with international clients for the right projects. Pricing for international clients is quoted in USD.',
  },
  {
    q: 'What is a monthly retainer and do I need one?',
    a: "A retainer means we actively manage and maintain your automation every month — updating it as your business changes, adding new team members, generating performance reports, and fixing issues immediately. It's optional but recommended for systems that touch revenue (like price monitoring or lead routing).",
  },
]

// ============================================================
// 7. HOW IT WORKS — 3-step process section on Home page
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
// 8. TARGET CLIENTS — "Who it's for" pills on Home page
// Add/remove strings to add/remove client type pills.
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
