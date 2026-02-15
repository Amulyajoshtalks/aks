

# 🎮 Amulya Kumar — 3D Interactive Terminal Portfolio

## Overview
A jaw-dropping, game-like portfolio that combines **3D floating elements** with an **interactive terminal interface** where visitors can "explore" your profile by typing commands. Dark cyberpunk-inspired theme with glowing neon accents, parallax effects, and smooth animations.

---

## Pages & Sections

### 1. Hero / Landing Screen
- Full-screen dark background with animated 3D floating geometric shapes (using React Three Fiber)
- Your name "AMULYA KUMAR" rendered in large glowing neon text with a typing animation
- Subtitle: "Frontend Engineer | React Developer" with a blinking cursor
- A glowing "Enter Terminal" button that scrolls/transitions to the terminal section
- Subtle particle effects in the background

### 2. Interactive Terminal Section
- A retro-styled terminal window (dark background, green/cyan monospace text)
- Visitors type commands to explore your info:
  - `help` — shows available commands
  - `about` — displays your profile summary
  - `skills` — shows your tech stack as an animated skill tree/bar chart
  - `experience` — timeline of your work history (Josh Talks, LawyerDesk, Canan Technologies, Newton School)
  - `projects` — lists your projects (PIS, School Management System, POS, Advocase AI, ASR Platform)
  - `project <name>` — shows detailed info about a specific project
  - `education` — displays your educational background
  - `contact` — opens the contact form
  - `social` — shows LinkedIn, email, phone links
  - `clear` — clears the terminal
- Each command output renders with a typewriter animation effect
- Auto-suggestions as users type

### 3. Visual Sections (scroll-based alternative to terminal)
For visitors who prefer browsing, scrolling past the terminal reveals visual card sections:
- **Skills** — Glowing skill badges/chips organized by category (Frontend, Tools, Backend)
- **Experience Timeline** — Vertical timeline with glowing nodes, company names, and key achievements
- **Projects Gallery** — 3D card flip or hover-to-reveal cards for each project with descriptions
- **Education** — Clean card with degree info

### 4. Contact Section
- A working contact form (Name, Email, Message) styled like a terminal input
- Sends messages via an edge function (requires Lovable Cloud)
- Social links: LinkedIn, Email, Phone — with hover glow effects

---

## Design & Vibe
- **Theme**: Dark mode with neon cyan/green/purple accents
- **Font**: Monospace for terminal, modern sans-serif for visual sections
- **3D Elements**: Floating geometric shapes (icosahedron, torus, cubes) using React Three Fiber
- **Animations**: Typewriter text, parallax scrolling, fade-in on scroll, glowing hover effects
- **Responsive**: Fully mobile-friendly — terminal works on mobile with a simplified input

---

## Technical Needs
- **React Three Fiber** for 3D background elements
- **Lovable Cloud** (Supabase) for the working contact form edge function
- No authentication needed — fully public portfolio

