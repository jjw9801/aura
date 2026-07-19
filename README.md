# AURA

AURA is a polished AI workspace experience built with Next.js, Supabase, and modern UI components. It includes landing, auth, dashboard, chat, research, workflows, files, billing, and settings flows.

## Features

- Landing page with hero, pricing, FAQ, and CTA
- Authentication flow with email/password and OAuth-ready integration
- Dashboard experience with analytics, quick actions, notifications, and settings
- AI chat interface with model switching and copy support
- Research, workflow, files, and billing pages

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment Variables

Create a .env.local file with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
GEMINI_API_KEY=your_gemini_key
```

## Deployment

This project is ready for Vercel deployment.

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Add the environment variables above in Vercel Project Settings.
4. Deploy.

## Production Verification

```bash
npm run build
npm run lint
```
