# AI-Powered Todo App

This project is a full-stack todo application built using Cursor. It's the result of following a based af tutorial by Mckay Wrigley at [www.jointakeoff.com](https://www.jointakeoff.com), showcasing an AI setup and a full-stack implementation.

## Features

- AI-assisted development process
- Full-stack implementation with Next.js
- Authentication and user management
- Database integration
- Stripe payment processing

## Tech Stack

- **IDE**: [Cursor](https://www.cursor.com/)
- **AI Tools**: [V0](https://v0.dev/), [Perplexity](https://www.perplexity.com/)
- **Frontend**: [Next.js](https://nextjs.org/docs), [Tailwind](https://tailwindcss.com/docs/guides/nextjs), [Shadcn](https://ui.shadcn.com/docs/installation), [Framer Motion](https://www.framer.com/motion/introduction/)
- **Backend**: [PostgreSQL](https://www.postgresql.org/about/), [Supabase](https://supabase.com/), [Drizzle](https://orm.drizzle.team/docs/get-started-postgresql), [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- **Auth**: [Clerk](https://clerk.com/)
- **Payments**: [Stripe](https://stripe.com/)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (see below)
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```
DB (Supabase)
DATABASE_URL=

Auth (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup

Payments (Stripe)
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PAYMENT_LINK_YEARLY=
NEXT_PUBLIC_STRIPE_PAYMENT_LINK_MONTHLY=
```

## Learn More

To dive deeper into the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Stripe Documentation](https://stripe.com/docs)

## Acknowledgements

This project was built following the excellent tutorial by Mckay Wrigley at [www.jointakeoff.com](https://www.jointakeoff.com). Mckay is based af.
