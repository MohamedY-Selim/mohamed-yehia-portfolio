# Mohamed Yehia Portfolio

Modern, responsive personal portfolio for a Senior QA Automation Engineer and Software Quality Control Team Lead.

## Stack

- React + Vite
- Tailwind CSS
- Framer Motion

## Run

1. `npm install`
2. `npm run dev`
3. `npm run build` for production build (runs `prebuild` to generate `public/og-image.png` from `public/og-image.svg` via [sharp](https://github.com/lovell/sharp))

## SEO & social previews (Open Graph / Twitter)

- Meta tags in `index.html` use the production URL: `https://yehia.digitalchoice-eg.com/`
- **LinkedIn, Facebook, and X (Twitter)** read `og:*` and `twitter:*` tags; the share image is **`/og-image.png`** (1200×630) for best compatibility.
- **Regenerate the PNG** after editing `public/og-image.svg`:

  `npm run og:image`

- If the **production domain** changes, update the **canonical** link, **`og:url`**, and all **absolute** `og:image` / `twitter:image` URLs in `index.html`.
- After deploy, refresh caches: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/), [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/), [Twitter Card Validator](https://cards-dev.twitter.com/validator) (or X equivalent).

## Contact Form (EmailJS)

1. Copy `.env.example` to `.env`
2. Add your EmailJS values:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
3. In your EmailJS template, use variables:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{message}}`
   - `{{to_name}}`
