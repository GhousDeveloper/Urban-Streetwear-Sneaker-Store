<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:080808,40:F4511E,100:9EFF00&height=260&section=header&text=STREET%20DISTRICT&fontSize=62&fontColor=F0EFED&fontAlignY=38&animation=fadeIn&desc=URBAN%20STREETWEAR%20%E2%80%A2%20EXCLUSIVE%20SNEAKERS%20%E2%80%A2%20NEXT-GEN%20SHOPPING&descSize=17&descAlignY=60&descColor=F0EFED" width="100%" alt="Street District — Urban Streetwear, Exclusive Sneakers, Next-Gen Shopping" />

<br/>

<img src="https://img.shields.io/badge/Next.js-15-080808?style=for-the-badge&logo=nextdotjs&logoColor=F0EFED" alt="Next.js 15" />
<img src="https://img.shields.io/badge/React-19-080808?style=for-the-badge&logo=react&logoColor=38BDF8" alt="React 19" />
<img src="https://img.shields.io/badge/TypeScript-Strict-080808?style=for-the-badge&logo=typescript&logoColor=38BDF8" alt="TypeScript strict mode" />
<img src="https://img.shields.io/badge/Tailwind_CSS-v4-080808?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8" alt="Tailwind CSS v4" />
<img src="https://img.shields.io/badge/Motion-12-080808?style=for-the-badge&labelColor=F4511E" alt="Motion 12" />
<img src="https://img.shields.io/badge/Lucide-React-080808?style=for-the-badge&logo=lucide&logoColor=9EFF00" alt="Lucide React" />

<br/><br/>

<img src="https://raw.githubusercontent.com/GhousDeveloper/Urban-Streetwear-Sneaker-Store/c9815f619461549bafc5fde80dee594ce21bb68d/web-img.PNG" width="100%" alt="Street District homepage: dark editorial hero with the headline BUILT FOR MOVEMENT, a model in a black hoodie and orange sneakers, and a neon Street District sign" />

<br/>

**“Built for the culture. Designed for the next generation of streetwear.”**

<br/>

[**Features**](#-feature-showcase) &nbsp;•&nbsp; [**Visual Experience**](#-visual-experience) &nbsp;•&nbsp; [**Tech Stack**](#-technology-stack) &nbsp;•&nbsp; [**Get Started**](#-getting-started) &nbsp;•&nbsp; [**Design System**](#-design-system)

</div>

<br/>

## ⚡ Introduction

**Street District** is a premium urban streetwear and exclusive sneaker storefront. It pairs a bold, editorial campaign look with the interactions a real shop needs: browse by category, search the catalog live, quick-view a product, build a bag, save a wishlist, and switch currency.

It is a front-end storefront built with the Next.js App Router. Product data lives in the codebase (`lib/store-data.ts`), so there is no backend to set up. Clone it, run it, and explore.

<br/>

## 🔥 Feature Showcase

<table>
<tr>
<td width="50%" valign="top">

### 🎬 Campaign & Discovery
- **Hero campaign carousel** with 3 animated slides
- **Category browsing**: Sneakers, Hoodies, T-Shirts, Accessories
- **New Arrivals** product rail with category filtering
- **Live search overlay** across name, colorway, category, and brand
- **Product quick-view** with size selection

</td>
<td width="50%" valign="top">

### 🛍️ Shopping Flow
- **Shopping bag drawer** with quantity controls and live subtotals
- **Wishlist** with a header counter and saved-items panel
- **Free-shipping progress bar** inside the bag
- **Promo code field** (demo: try `DISTRICT20`)
- **Simulated checkout flow** from bag to shipping to confirmation

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 🌍 Storefront Utilities
- **Multi-currency display**: USD, EUR, GBP, JPY
- **Promotional announcement bar** with a free-shipping threshold
- **Store locator** panel for flagship stores
- **Help center** panel for client services and FAQs
- **Account interface**: the *District VIP Pass* panel

</td>
<td width="50%" valign="top">

### 🎨 Culture & Trust
- **Lookbook / community** section and submission panel
- **Customer testimonials** and brand strip
- **Newsletter sign-up interface** in the footer
- **Trust badges** for authenticity, returns, and secure checkout
- **Responsive layouts** across desktop and mobile

</td>
</tr>
</table>

> [!NOTE]
> Street District is a UI/UX storefront. Payments, accounts, newsletter delivery, and order processing are interface-level demos with no backend behind them. See the [Roadmap](#-roadmap).

<br/>

## 📸 Visual Experience

Dark obsidian canvas, hot orange calls to action, acid-lime accents, and heavy condensed type. The look sits between a sneaker drop page and an editorial lookbook.

*Campaign and catalog imagery shipped with the project:*

<table>
<tr>
<td width="25%"><img src="https://raw.githubusercontent.com/GhousDeveloper/Urban-Streetwear-Sneaker-Store/main/public/images/cat-sneakers.jpg" width="100%" alt="Sneakers category tile" /></td>
<td width="25%"><img src="https://raw.githubusercontent.com/GhousDeveloper/Urban-Streetwear-Sneaker-Store/main/public/images/cat-hoodies.jpg" width="100%" alt="Hoodies category tile" /></td>
<td width="25%"><img src="https://raw.githubusercontent.com/GhousDeveloper/Urban-Streetwear-Sneaker-Store/main/public/images/cat-tshirts.jpg" width="100%" alt="T-Shirts category tile" /></td>
<td width="25%"><img src="https://raw.githubusercontent.com/GhousDeveloper/Urban-Streetwear-Sneaker-Store/main/public/images/cat-accessories.jpg" width="100%" alt="Accessories category tile" /></td>
</tr>
<tr>
<td align="center"><sub><b>SNEAKERS</b></sub></td>
<td align="center"><sub><b>HOODIES</b></sub></td>
<td align="center"><sub><b>T-SHIRTS</b></sub></td>
<td align="center"><sub><b>ACCESSORIES</b></sub></td>
</tr>
<tr>
<td width="25%"><img src="https://raw.githubusercontent.com/GhousDeveloper/Urban-Streetwear-Sneaker-Store/main/public/images/editorial-2.jpg" width="100%" alt="Editorial: orange hoodie and sneakers on city steps" /></td>
<td width="25%"><img src="https://raw.githubusercontent.com/GhousDeveloper/Urban-Streetwear-Sneaker-Store/main/public/images/editorial-3.jpg" width="100%" alt="Editorial: black hoodie and cargo pants against a shutter" /></td>
<td width="25%"><img src="https://raw.githubusercontent.com/GhousDeveloper/Urban-Streetwear-Sneaker-Store/main/public/images/editorial-4.jpg" width="100%" alt="Editorial: high-top sneakers on wet pavement" /></td>
<td width="25%"><img src="https://raw.githubusercontent.com/GhousDeveloper/Urban-Streetwear-Sneaker-Store/main/public/images/editorial-5.jpg" width="100%" alt="Editorial: cream hoodie and white sneakers on steps" /></td>
</tr>
<tr>
<td colspan="4" align="center"><sub><b>THE LOOKBOOK</b>: editorial imagery used across the storefront</sub></td>
</tr>
</table>

<br/>

## 🧰 Technology Stack

Every entry below is declared in `package.json` or used in the source.

| Technology | Role |
|:--|:--|
| ![Next.js](https://img.shields.io/badge/Next.js-15-080808?style=flat-square&logo=nextdotjs&logoColor=F0EFED) | App Router framework, standalone output |
| ![React](https://img.shields.io/badge/React-19-080808?style=flat-square&logo=react&logoColor=38BDF8) | Component-driven UI and client-side state |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-080808?style=flat-square&logo=typescript&logoColor=38BDF8) | Strict typing across components and data |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-080808?style=flat-square&logo=tailwindcss&logoColor=38BDF8) | Utility-first styling and the brand design system |
| ![Motion](https://img.shields.io/badge/Motion-12-080808?style=flat-square&labelColor=F4511E) | Hero transitions, drawers, and modal animation |
| ![Lucide](https://img.shields.io/badge/Lucide_React-icons-080808?style=flat-square&logo=lucide&logoColor=9EFF00) | Interface icons |
| ![Google Fonts](https://img.shields.io/badge/next%2Ffont-Google_Fonts-080808?style=flat-square&logo=googlefonts&logoColor=9EFF00) | Anton, Oswald, Plus Jakarta Sans, Permanent Marker |

<br/>

## 🚀 Getting Started

**Requirements:** Node.js 18.18 or newer (the Next.js 15 minimum) and npm.

```bash
git clone https://github.com/GhousDeveloper/Urban-Streetwear-Sneaker-Store.git
cd Urban-Streetwear-Sneaker-Store
npm install
npm run dev
```

Open **http://localhost:3000** (the Next.js default) in your browser.

No environment variables are required to run the storefront. `.env.example` comes from the project's AI Studio scaffold, and nothing in the source reads those values.

| Command | What it does |
|:--|:--|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run clean` | Clear Next.js build artifacts |

<br/>

## 🗂️ Project Structure

```text
Urban-Streetwear-Sneaker-Store/
├── app/
│   ├── layout.tsx            # Root layout, fonts, SEO metadata
│   ├── page.tsx              # Storefront page and shared state (cart, wishlist, currency)
│   └── globals.css           # Tailwind v4 entry
├── components/               # Navbar, Hero, NewArrivals, CartDrawer, SearchOverlay,
│                             # ProductQuickView, UtilityModals, Footer, and more
├── hooks/
│   └── use-mobile.ts
├── lib/
│   ├── store-data.ts         # Products, categories, currencies, testimonials, brands
│   └── utils.ts
├── public/
│   ├── images/               # Campaign, category, editorial, and product imagery
│   └── assets/aistudio/
├── .cache_hd/                # Image asset build cache and script
├── artifacts/                # Generated media from the project's AI Studio workflow
├── web-img.PNG               # README preview screenshot
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

<br/>

## 🎨 Design System

<div align="center">

<img src="https://img.shields.io/badge/OBSIDIAN_BLACK-%23080808-080808?style=for-the-badge&labelColor=080808" alt="Obsidian Black #080808" />
<img src="https://img.shields.io/badge/BONE_WHITE-%23F0EFED-F0EFED?style=for-the-badge&labelColor=F0EFED" alt="Bone White #F0EFED" />
<img src="https://img.shields.io/badge/DISTRICT_ORANGE-%23F4511E-F4511E?style=for-the-badge&labelColor=F4511E" alt="District Orange #F4511E" />
<img src="https://img.shields.io/badge/ACID_LIME-%239EFF00-9EFF00?style=for-the-badge&labelColor=9EFF00" alt="Acid Lime #9EFF00" />

</div>

<br/>

| Color | Hex | Used for |
|:--|:--|:--|
| **Obsidian Black** | `#080808` | Primary backgrounds |
| **Bone White** | `#F0EFED` | Light sections and text |
| **District Orange** | `#F4511E` | Calls to action and promotions |
| **Acid Lime** | `#9EFF00` | Accents and handwritten highlights |

**Type:** Anton and Oswald for loud, condensed headlines. Plus Jakarta Sans for clean interface text. Permanent Marker for street-art accent lines.

**Direction:** High contrast, heavy type, and a single hot accent color, in the spirit of sneaker-drop pages and underground fashion editorials.

<br/>

## 🧭 Roadmap

These are **ideas for future work. None of them are implemented today.**

- [ ] Backend and database for the product catalog and inventory
- [ ] Real authentication and persistent user accounts
- [ ] Persistent bag and wishlist (they currently reset on reload)
- [ ] Payment gateway and real order processing
- [ ] Server-side promo code validation
- [ ] Live exchange rates (the current rates are fixed values in code)
- [ ] Working newsletter delivery
- [ ] Automated tests

<br/>

## 📄 License

**No license has been specified for this repository.** Until the owner adds a `LICENSE` file, default copyright applies and reuse is not granted. If you want to use or adapt this project, please contact the author first.

<br/>

<div align="center">

## 👨‍💻 Developer

### Ghulam Ghous Kalwar
*Full Stack Developer | AI Engineer*

<br/>

<a href="https://github.com/GhousDeveloper">
<img src="https://img.shields.io/badge/GitHub-GhousDeveloper-080808?style=for-the-badge&logo=github&logoColor=9EFF00" alt="GitHub profile: GhousDeveloper" />
</a>

<br/><br/>

If this project caught your eye, a ⭐ on the repo is always appreciated.

**Designed with intent. Built for the culture.**

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:9EFF00,55:F4511E,100:080808&height=140&section=footer&animation=fadeIn" width="100%" alt="" />

</div>
