# Ananta One

Premium agency website for **Ananta One** — Shopify development, custom apps, and AI automation.

## Tech Stack

- React 18+
- Vite
- JavaScript (JSX)
- Tailwind CSS v4
- Framer Motion
- Lucide React
- React Scroll
- clsx + tailwind-merge (shadcn-style utilities)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint

# Format
npm run format
```

## Deployment (Vercel)

1. Push this repository to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Vercel auto-detects Vite — no extra configuration needed
4. Deploy

## Project Structure

```
src/
├── assets/
│   ├── images/          # Product images (replace placeholders)
│   └── logos/           # Brand logo (replace placeholder)
├── components/
│   ├── layout/          # Navbar, Footer
│   ├── sections/        # Page sections
│   └── ui/              # Reusable UI components
├── constants/           # Theme, links
├── data/                # Content data files
├── hooks/               # Custom React hooks
├── lib/                 # Utilities (cn helper)
├── styles/              # Global CSS
├── App.jsx
└── main.jsx
```

## Replacing Placeholder Assets

Replace these files with your final assets:

- `src/assets/logos/ananta-logo.svg` (or update import to `.png`)
- `src/assets/images/collection-tree.svg`
- `src/assets/images/store-radar.svg`

## License

Private — Ananta One
