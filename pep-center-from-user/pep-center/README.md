# PEP.CENTER — Research Grade Peptides

Rebuilt source code for the PEP.CENTER e-commerce site.

## Tech Stack

- **React 19** with React Router v7
- **Vite** build tool
- **Tailwind CSS** for styling
- **Stripe** for payment processing
- **Supabase** for orders (optional)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Then add your Stripe and Supabase keys to `.env`

3. **Run the dev server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Deploy to Netlify

```bash
npm run build
# Upload the `dist` folder to Netlify
```

Or connect your Git repo to Netlify for automatic deploys.

## Project Structure

```
src/
  components/     # Navbar, Footer, CartSidebar, ProductCard
  context/        # CartContext (state management)
  data/           # Product catalog, blog posts
  pages/          # Home, ProductDetail, Checkout, legal pages
  index.css       # Global styles, Tailwind, custom CSS
  main.jsx        # App entry point
  App.jsx         # Router configuration
```

## Notes

- The product image (`/product_vial.jpg`) needs to be added to the `public/` folder
- Stripe checkout requires a backend API endpoint — you will need to set up a serverless function or backend to create Stripe checkout sessions
- Supabase integration is optional; the app gracefully handles the case when Supabase is not configured
- All 56 products with their full catalog data have been recovered
- All page content (terms, privacy, shipping, refund policies) has been recovered
- Blog post titles and metadata have been recovered
