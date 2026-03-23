# IDEAL: Personal Development App - Blueprint

## 1. Product Summary & Vision
**IDEAL** is a personal development mobile app designed to help users become their "ideal self" through structured clarity, disciplined execution, and intelligent feedback. 

It is not just a productivity app, but a unified system combining habit tracking, financial management, health tracking, life logging, and AI-driven insights to manage all aspects of personal development in one place.

## 2. Design System & UI/UX Guidelines
The app must embody a modern, soft, playful wellness style. It should feel like a supportive companion, offering a calming, encouraging, lightweight, and positive tone.

### 2.1 Color Palette
- **Primary:** Pastel-based system with gentle gradients (lavender, mint green, sky blue, peach, soft yellow).
- **Contrast:** Avoid harsh contrasts and dark heavy themes.

### 2.2 Typography
- **Font Family:** Rounded sans-serif fonts (e.g., Nunito, Quicksand, or a rounded variant of SF Pro/Roboto).
- **Hierarchy:** Bold titles with light, minimal supporting text. Rely more on visuals than text.

### 2.3 Layout & Components
- **Structure:** Clean, card-based system utilizing a 2-column mobile grid.
- **Cards:** Large rounded corners (16–28px radius), soft shadows, generous padding, and high spacing for an airy feel. Each card carries a unique color identity.
- **Imagery:** Replace traditional icons with small, friendly, semi-flat, slightly 3D illustrations with soft edges and minimal detail.
- **Interactions:** Simple, tap-based, intuitive elements (checklists, toggles, color-based mood selectors, progress stars/bars/circles).
- **Animations:** Soft fades, gentle scaling, slight bounce on tap, smooth transitions. No sharp or aggressive motion.

---

## 3. Technology Stack & Infrastructure
- **Frontend Framework:** React Native (Expo) for highly reliable, cross-platform Android and iOS builds.
- **State & Data Caching:** React Query + Zustand, combined with `react-native-mmkv` for lightning-fast localized caching.
- **Backend & Database:** Supabase (PostgreSQL, Authentication, Real-time DB, Edge Functions, Storage).
- **Navigation:** React Navigation (Standard stacks and custom animated bottom tabs).
- **AI Integration:** OpenAI API operated exclusively through Supabase Edge Functions (to keep API keys secure).
- **Error Tracking & Analytics:** Sentry (Crash reporting) and PostHog (Behavior analytics).
- **Monetization (Future-proof):** RevenueCat for bulletproof App Store / Play Store in-app purchase and subscription management.

---

## 4. Scalability, Robustness & Offline Support
To guarantee flawless performance with 1,000+ concurrent users, the architecture requires:
- **Connection Pooling:** Utilizing PgBouncer within Supabase to manage hundreds of simultaneous database connections.
- **Indexed Queries:** All frequently accessed tables (e.g., Habits, Tasks, Finances) will maintain strict B-Tree and GIN indexes targeting user IDs and date ranges.
- **Offline-First Capabilities:** Users must be able to view their Dashboard, read Journals, and check off Habits even when disconnected. Data modifications will queue locally via AsyncStorage/MMKV and synchronize with Supabase immediately upon reconnection.
- **Edge Deployment:** Utilizing Supabase Edge Functions for all heavy logic (like AI evaluations) so computations execute close to the user geographically without stressing a monolithic backend.

---

## 5. Security & Data Protection
Absolute user trust and data privacy are enforced via:
- **Row Level Security (RLS):** Every table in PostgreSQL will be strictly governed by RLS. Users can *only* interact with records containing their `auth.uid()`. This makes widespread data breaches nearly impossible, as the API directly enforces ownership.
- **Payload Encryption:** Highly sensitive user features—specifically the Journaling, Reflection logs, and Financials—will utilize server-side encryption or encrypted columns to ensure absolute privacy even in the event of a database compromise.
- **Local Application Security:** Local Biometric authentication (FaceID/Fingerprint) enabled via `expo-local-authentication`, alongside application obscuration in the background task switcher to hide sensitive financial/habit data.
- **Complete Disconnect & Erasure:** Full GDPR and CCPA compliance including a one-tap "Delete My Account & Erase All Data" feature that cascades to wipe all databases, stored images, and AI context logs immediately.

---

## 6. App Store & Play Store Compliance Requirements
To ensure ZERO issues or rejections during store reviews:
- **Graceful Permission Requests:** The app must utilize pre-permission screens explaining *exactly* why we need Location (for time-tracking tagging) or Notifications. The app must never crash or block the user if they deny these permissions.
- **User Generated Content (UGC):** The "Social System" requires a reporting mechanism, blocking functionality, and an admin dashboard to moderate bad behavior natively. Apple will reject social apps lacking these safety measures.
- **Digital Goods / Pledges:** App Store guidelines explicitly forbid third-party payment gateways (like Stripe) for digital unlocks or software traits. RevenueCat will wrap Apple/Google IAP to comply securely.
- **App Tracking Transparency (ATT):** iOS prompts requesting permission to track user analytics across platforms will be implemented flawlessly to comply with Apple's strict privacy constraints.

---

## 7. Core Modules & Specific Expected Outputs

### 7.1 Life Clarity Engine
- **Features:** Interactive mindmap builder, continuous prompts, editable roadmap.
- **Expected Output:** An animated 2D canvas/mindmap flow where users can drag/connect nodes. Data seamlessly converts to and from a relational DB structure.

### 7.2 Skill & Time Tracking System
- **Features:** Google Calendar sync, manual/automated tracking, 100-hours core concept tracking. **Connect with Google Maps to store user location info** (geotagging practice sessions).
- **Expected Output:** Background timer capability ensuring the OS doesn't kill timers while the app sleeps. Geolocation requests map perfectly to stored location points on a visual timeline.

### 7.3 Habit Development System
- **Features:** Daily tracking, consistency scoring, streaks, gamified points.
- **Expected Output:** Instantly responsive toggles (cached locally first to feel immediate). Complex streak-calculation algorithms running securely as PostgreSQL functions rather than brittle frontend logic.

### 7.4 Iteration System (Daily Feedback)
- **Features:** End-of-day comparison (Planned vs Completed), AI-generated feedback.
- **Expected Output:** A fluid daily review wizard that queries that day's data, passes it to an Edge Function, and streams back the AI tokenized response in real-time.

### 7.5 AI Agent (Digital Twin)
- **Features:** Conversations, life discussions, personalized advice.
- **Expected Output:** A ChatGPT-like floating interface or dedicated page storing chat history securely. Maintains context of the user’s Life Roadmap and Habits.

### 7.6 Financial Management System
- **Features:** Assets, Liabilities, Income, Expenses tracked. PDF Exports.
- **Expected Output:** Beautiful pie charts and net-worth line graphs generated natively. PDF formatting relies on an off-thread rendering system to preserve app framerate.

### 7.7 Health Tracking System
- **Features:** Body metrics (Weight, BMI), general health tracking.
- **Expected Output:** Simple input fields linked to historical trend charts visualizing wellness correlations.

### 7.8 Bird’s-Eye Dashboard
- **Features:** Full overview of Skills, Habits, Finances, Health, Goals.
- **Expected Output:** The app’s primary screen. Heavily cached, pulling aggregates rather than raw rows to load in under 300ms.

### 7.9 Reflection & Life Logging
- **Features:** Document life moments, daily journaling, timeline.
- **Expected Output:** A rich text or beautifully stylized text editor allowing timestamped entries.

### 7.10 Safety & Activity Monitoring System
- **Features:** In-app inactivity prompts, alerting loved ones.
- **Expected Output:** Background chron job executed by a Supabase Edge Function that tracks the user’s `last_active` timestamp and safely dispatches SMS/Email to trusted contacts via Twilio/SendGrid.

### 7.11 Motivation, Gamification & Social
- **Features:** Quotes, riddles, leaderboards, anonymous messaging.
- **Expected Output:** A "Community" tab utilizing infinite scroll arrays for performance. Strict mechanisms limiting abuse in anonymous systems.

### 7.12 Personality & Self-Discovery System
- **Features:** Personality tests (Strengths, weaknesses, etc.).
- **Expected Output:** Gamified questionnaire slider/selectors resulting in a generated interactive summary card for the user.

### 7.13 System Utilities
- **Features:** Widgets, notifications, security, PDF exports.
- **Expected Output:** Native iOS/Android home-screen widgets built using Expo's config plugins to display daily habit progress directly on the user's OS launcher.

---

## 8. High-Level Database Schema (Draft)
```sql
-- Security Policy Examples
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only view their own habits" ON habits FOR SELECT USING (auth.uid() = user_id);

-- Tables overview
Users (id, auth_id, created_at, points, passcode_hash, last_active)
Nodes (id, user_id, type, label, parent_id, x_coord, y_coord)
Skills (id, user_id, skill_name, tracked_seconds, location_tag)
Habits (id, user_id, title, consistency_score, streak_count)
Finances (id, user_id, type, amount, category, created_at)
Journals (id, user_id, encrypted_content, created_at)
SafetyContacts (id, user_id, contact_name, phone_number, trigger_days)
```

---

## 9. Next Steps / Implementation Blueprint
*(To be executed modularly, ensuring each phase passes Expo/App Store linting and offline tests)*

**Phase 1:** Core Expo Architecture + Supabase Auth + Security Policies. 
*Expected Output: App builds locally, user can sign up/login, and RLS prevents data bleeding.*

**Phase 2:** Design System + Dashboard Scaffolding + Caching Layer.
*Expected Output: Pastel UI library created. Placeholder cards render in under 16ms.*

**Phase 3:** Life Clarity Engine & Habit Modules.
*Expected Output: Mindmap canvas and habit toggles functionally syncing to Database.*

**Phase 4:** Triggers, Tracking & Location (Skills, Time, Location, Finances).
*Expected Output: Background location polling works correctly. Financial graphs render flawlessly.*

**Phase 5:** Intelligence (AI Twin) & Edge Functions.
*Expected Output: AI reviews user data instantly daily. Edge cron jobs monitor for user inactivity.*

**Phase 6:** Social, UGC Compliance, & Final Polish.
*Expected Output: App meets all App Store review criteria (Block/Report buttons). Widgets are operational. Ready for TestFlight and Play Console Alpha track.*
