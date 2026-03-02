# 🎨 ATRIUS – Vintage Paper Theme Update
## Complete UI Refactor with Provided Color Palette
## NO HARDCODE POLICY APPLIES

---

# 🚨 GLOBAL RULE

1. ❌ NO hardcoded colors anywhere inside components
2. ❌ No inline hex values in JSX
3. ❌ No random Tailwind colors (like bg-green-500, text-gray-800)
4. ✅ All colors must use CSS variables from theme system
5. ✅ All components must inherit design tokens

---

# 🎨 DESIGN STYLE GOAL

This is NOT a modern neon SaaS UI.

This is:

• Warm
• Editorial
• Paper-like
• Elegant
• Soft shadows
• Minimal glow
• Calm contrast
• Slight vintage aesthetic

Think:
- Premium notebook
- Conference brochure
- Elegant journal
- Soft paper dashboard

---

# 🧱 IMPLEMENTATION REQUIREMENTS

## 1️⃣ Create Global Theme Variables

Update:

src/styles/variables.css

Define CSS variables:

:root {
  --color-primary: #a67c52;
  --color-primary-foreground: #ffffff;

  --color-secondary: #e2d8c3;
  --color-secondary-foreground: #5c4d3f;

  --color-accent: #d4c8aa;
  --color-accent-foreground: #4a3f35;

  --color-background: #f5f1e6;
  --color-foreground: #4a3f35;

  --color-card: #fffcf5;
  --color-card-foreground: #4a3f35;

  --color-muted: #ece5d8;
  --color-muted-foreground: #7d6b56;

  --color-destructive: #b54a35;
  --color-destructive-foreground: #ffffff;

  --color-border: #dbd0ba;
  --color-input: #dbd0ba;
  --color-ring: #a67c52;

  --color-sidebar: #ece5d8;
  --color-sidebar-foreground: #4a3f35;
}

---

## 2️⃣ Update Global Styles

In:

src/styles/globals.css

Apply:

body {
  background: var(--color-background);
  color: var(--color-foreground);
  font-family: 'Inter', serif;
}

Add subtle texture feel using:

background-image: radial-gradient(
  rgba(166,124,82,0.03) 1px,
  transparent 1px
);
background-size: 20px 20px;

Keep extremely subtle.

---

# 🃏 CARD SYSTEM UPDATE

All cards must:

• Use background: var(--color-card)
• Border: 1px solid var(--color-border)
• Soft shadow:
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
• Rounded corners: 12px

Remove:
❌ Dark gradients
❌ Neon glows
❌ Glassmorphism

Add:
✔ Soft lift on hover
✔ Subtle border highlight on hover

---

# 🔘 BUTTON SYSTEM UPDATE

Primary Button:

background: var(--color-primary);
color: var(--color-primary-foreground);
border-radius: 10px;
transition: all 0.2s ease;

Hover:
background: slightly darker primary (computed in CSS)

Secondary Button:

background: var(--color-secondary);
color: var(--color-secondary-foreground);

Destructive Button:

background: var(--color-destructive);
color: var(--color-destructive-foreground);

---

# 🧭 NAVBAR UPDATE

Navbar must:

• Background: var(--color-card)
• Border-bottom: 1px solid var(--color-border)
• Height: 72px
• Soft typography

Active link:
color: var(--color-primary)
border-bottom: 2px solid var(--color-primary)

No glow.
No animation flicker.

---

# 📂 SIDEBAR UPDATE

Sidebar:

background: var(--color-sidebar)
border-right: 1px solid var(--color-border)

Active item:
background: var(--color-accent)
color: var(--color-accent-foreground)

---

# 🧠 MATCH CARD UPDATE

MatchCard must:

• Card background: var(--color-card)
• Compatibility ring: use primary color
• Shared skills: accent background
• Reasoning section: muted background

No dark styling.
No green neon.

---

# 👤 PROFILE UPDATE

ProfileCard must:

• Card surface
• Accent section for availability
• Skills use accent tone
• Goals use secondary tone

Everything must feel warm and paper-like.

---

# 📰 FEED UPDATE

Feed:

• Post cards use card surface
• Muted metadata text
• Primary for interaction buttons
• Soft divider lines (border color)

---

# 💬 CHAT UPDATE

Chat layout:

Left panel:
background: var(--color-sidebar)

Chat window:
background: var(--color-card)

Own message:
background: var(--color-accent)

Other message:
background: var(--color-muted)

---

# 📊 CHART COLORS

If charts exist:

Chart 1: #a67c52
Chart 2: #8d6e4c
Chart 3: #735a3a
Chart 4: #b3906f
Chart 5: #c0a080

Must be referenced via config file.
Not inline.

---

# 🎨 TYPOGRAPHY

Headings:
• Font-weight: 600–700
• Slight letter spacing
• Large margins

Body:
• Softer contrast
• Use muted for secondary text

No ultra-bold heavy black text.

---

# 🧩 COMPONENT RULES

Every component must:

• Import design tokens
• Never define hex colors inline
• Never define random shadows
• Never use Tailwind default colors
• Use theme variables only

---

# 🔥 FINAL RESULT TARGET

UI must feel:

• Warm
• Thoughtful
• Professional
• Elegant
• Calm
• Conference-ready
• Print-quality aesthetic

Not:

• Neon startup
• Hacker dashboard
• Dark SaaS
• Futuristic glass

---

# 🧱 CLEANUP TASK

Remove:

❌ All dark theme styles
❌ All neon glows
❌ All heavy shadows
❌ All gradient backgrounds
❌ All hardcoded Tailwind color classes

Replace with theme variables.

---

# 🚀 OUTPUT EXPECTATION

Refactor entire UI to:

✔ Fully theme-driven system
✔ Vintage paper aesthetic
✔ Clean spacing system
✔ Soft professional layout
✔ Scalable token-based design
✔ Zero hardcode violations