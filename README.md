# Spindrop

Spindrop is a client-side vinyl storefront demo built with React, TypeScript, Vite, React Router, and Tailwind CSS v4. It has no backend, real authentication, payments, or fulfillment.

## Technologies

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## Features

- Responsive navigation and artist-focused landing sections
- Crowdfunding and Press & Sell cards
- Services accordion
- Retail network and customer support panels
- Community photo mosaic with links to music platforms
- Artist marquee and testimonial selector
- Vinyl Studio showcase with rotating record artwork
- Responsive footer
- Discover catalog with price sorting, currency estimates, and cart actions
- Sortable artist collections and detailed record pages
- Keyboard-accessible instant search with saved recent searches
- Persistent cart with quantity controls, undo, free-shipping estimate, and mini-cart
- Wishlist, recently viewed records, account profile, demo checkout, and order history
- Country-based approximate prices with a USD fallback when rates are unavailable
- Local newsletter signup and accessible toast/dialog feedback
- Optimized WebP artwork with a broken-image fallback
- Vercel deep-link routing and GitHub Actions checks

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Getting started

Install dependencies and start the local development server:

```sh
npm install
npm run dev
```

Vite prints the local URL in the terminal, usually `http://localhost:5173/`.

## Available commands

```sh
npm run dev      # Start the development server
npm run build    # Type-check and build for production
npm run preview  # Preview the production build locally
npm run lint     # Run Oxlint
npm test         # Run unit tests
npm run convert:vinyls # Convert backend vinyl images to WebP
npm run convert:site-images # Rebuild optimized site artwork
npm run create:og-image # Rebuild the social preview image
```

## Production deployment

The project is configured for Vercel. After linking the repository or running `vercel` once, deploy the production build with:

```sh
npm run build
vercel --prod
```

Live site: [https://spindrop-lemon.vercel.app](https://spindrop-lemon.vercel.app)

## Project structure

```text
src/
  assets/       Images and illustrations
  components/   Landing page sections and shared components
  data/         Artist information
  App.tsx       Page section order
  index.css     Tailwind imports, theme colors, and animations
```

## Routes

- `/` landing page
- `/discover` record catalog
- `/records/:slug` record details
- `/artists/:artistSlug` artist collection
- `/cart`, `/wishlist`, `/checkout`, `/order/:id`
- `/login`, `/sign-in` (redirects to `/login`), `/create-account`
- `/account` and `/orders` (demo account required)

## Browser-only demo data

All data is demo-only and stored in this browser. There is no real account service, checkout, payment, shipping, or order fulfillment. Local storage keys include `spindrop.cart`, `spindrop.market-country`, `spindrop.market-rates`, `spindrop.demo.accounts`, `spindrop.demo.session`, `spindrop.wishlist`, `spindrop.recently-viewed`, `spindrop.recent-searches`, `spindrop.orders`, and `spindrop.newsletter`. The loading screen's once-per-session flag uses session storage.

Demo account passwords use PBKDF2 with SHA-256, 210,000 iterations, and a unique 16-byte salt per account. Existing plaintext demo accounts migrate after a successful sign-in. Currency estimates use the public Frankfurter rates API and are not live transaction prices.

Unit tests cover browser storage, cart quantity rules, price formatting and fallback behavior, search ranking, password hashing, and the legacy password migration.
