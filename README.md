# Spindrop

Spindrop is a responsive vinyl-record landing page built with React, TypeScript, Vite, and Tailwind CSS v4.

## Features

- Responsive navigation and artist-focused landing sections
- Crowdfunding and Press & Sell cards
- Services accordion
- Retail network and customer support panels
- Community photo mosaic with links to music platforms
- Artist marquee and testimonial selector
- Vinyl Studio showcase with rotating record artwork
- Responsive footer

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
```

## Production deployment

The project is configured for Vercel. After linking the repository or running `vercel` once, deploy the production build with:

```sh
npm run build
vercel --prod
```

## Project structure

```text
src/
  assets/       Images and illustrations
  components/   Landing page sections and shared components
  data/         Artist information
  App.tsx       Page section order
  index.css     Tailwind imports, theme colors, and animations
```
