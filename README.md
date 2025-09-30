# Next.js SaaS Starter

This is a starter template for building a SaaS application using **Next.js** with MongoDB and authentication.

## Features

- Simple dashboard page (`/dashboard`) 
- User authentication with email/password
- MongoDB database with Mongoose ODM
- Basic RBAC with Owner and Member roles
- Team management system
- Activity logging system for user events
- Clean, minimal UI

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **ODM**: [Mongoose](https://mongoosejs.com/)
- **UI Library**: [shadcn/ui](https://ui.shadcn.com/)
- **Authentication**: JWT with cookies

## Getting Started

```bash
git clone https://github.com/nextjs/saas-starter
cd saas-starter
npm install
```

## Running Locally

Use the included setup script to create your `.env` file:

```bash
npm run db:setup
```

This will help you set up MongoDB (local with Docker or remote) and generate necessary environment variables.

Seed the database with a default user and team:

```bash
npm run db:seed
```

This will create the following user and team:

- User: `test@test.com`
- Password: `admin123`

You can also create new users through the `/sign-up` route.

Finally, run the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

## Environment Variables

The setup script will create a `.env` file with the following variables:

- `MONGODB_URI`: Your MongoDB connection string
- `BASE_URL`: Your application URL (default: http://localhost:3000)
- `AUTH_SECRET`: Random string for JWT signing

## Going to Production

When you're ready to deploy your SaaS application to production:

1. Set up a production MongoDB database
2. Deploy to your preferred platform (Vercel, Netlify, etc.)
3. Add the production environment variables
4. Update `BASE_URL` to your production domain
5. Update `MONGODB_URI` to your production database

## Project Structure

- `app/(login)/` - Authentication pages (sign-in, sign-up)
- `app/(dashboard)/dashboard/` - Dashboard page
- `lib/db/` - Database configuration and models
- `lib/auth/` - Authentication utilities
- `components/ui/` - UI components