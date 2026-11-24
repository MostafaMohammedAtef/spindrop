# Spindrop

Spindrop is a responsive vinyl-record landing page built with React, TypeScript, Vite, and Tailwind CSS v4.

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
