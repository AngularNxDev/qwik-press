# Qwik Press CMS

This repository contains a simple content management system built with [Qwik](https://qwik.dev/) and [Supabase](https://supabase.com/). The app has a public blog section and an admin area for managing posts. Styling is provided by Tailwind CSS and fonts/images are loaded from public CDNs.

## Prerequisites

- Node.js 18 or newer
- A Supabase project with an anon key

## Setup

1. Navigate into the `app` directory and install dependencies:
   ```bash
   cd app
   npm install
   ```
2. Copy `.env.example` to `.env` and enter your Supabase credentials.
3. Start the development server:
   ```bash
   npm start
   ```
   The site will be available at `http://localhost:5173`.

## Useful Commands

- `npm run lint` - run ESLint
- `npm run build` - create a production build
- `npm run preview` - preview the built app
- `npm run fmt.check` - verify formatting with Prettier

## License

This project is licensed under the [MIT License](LICENSE).
