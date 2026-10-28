# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js App Router, TypeScript, Supabase Auth/PostgreSQL/Realtime/RLS, Cloudinary, Vercel, and Framer Motion. Three.js is optional for limited effects only. The application lives at the repository root.

## Users

Individuals, small communities, and mobile-first users who want personal or group conversations with privacy controls.

## Product Purpose

chatK lets people discover one another, start conversations through recipient-approved requests, create groups, exchange real-time messages, and share media. Success means messages persist and arrive without manual refresh while access remains restricted to authorized participants.

## Positioning

Personal conversations require the recipient's approval before ordinary messaging begins. Privacy and clear message delivery states are core product requirements.

## Operating Context

Responsive web use on mobile and desktop browsers, including intermittent or slow network connections. Product language is Indonesian, with an i18n foundation for additional languages.

## Capabilities and Constraints

The MVP covers accounts and profiles, user discovery, chat requests, groups, persistent real-time messaging, message actions, media, receipts, presence, notifications, and authorized search. Voice/video calls, public feeds, payments, native apps, and AI that reads encrypted messages are out of MVP scope. Five materially different design previews must be compared before a final visual direction is selected. E2EE remains an open product decision; do not claim it is active or implement custom cryptography. Cloudinary secrets and any Supabase service-role key remain server-only. Demo data must be synthetic.

## Evidence on Hand

`chatK_PRD_unduh.txt` is the product source. No production data, customer proof, or approved visual assets are available; do not invent them.

## Product Principles

- Enforce privacy and authorization at server/database boundaries.
- Keep delivery state understandable and resilient to retries.
- Keep the core usable on mobile, slow networks, keyboard, and reduced motion.
- Make unavailable features and empty states explicit.

## Accessibility & Inclusion

Support keyboard navigation, visible focus, readable contrast, touch-sized controls, labels, and `prefers-reduced-motion`.