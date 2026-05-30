import { useEffect, useMemo, useRef, useState } from "react";

type Cookie = {
  name: string;
  description: string;
  price: string;
  image: string;
};

type Seller = {
  name: string;
  description: string;
  price: string;
  image: string;
  rating: string;
  label: string;
};

type Benefit = {
  title: string;
  description: string;
  icon: "spark" | "leaf" | "truck" | "hand" | "lock";
};

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  initials: string;
  tint: string;
};

type GalleryItem = {
  src: string;
  alt: string;
  span?: "tall" | "wide" | "square";
};

const navLinks = [
  { label: "Menu", id: "menu" },
  { label: "Favorites", id: "best-sellers" },
  { label: "Reviews", id: "reviews" },
  { label: "Gallery", id: "gallery" },
];

const featuredCookies: Cookie[] = [
  {
    name: "Chocolate Chip & M&M",
    description: "A classic buttery cookie loaded with rich chocolate chips and colorful M&M candies for a fun, irresistible bite.",
    price: "$5.00",
    image: "/images/Chocolate_Chip_ad_M_M.jpg",
  },
  {
    name: "Chocolate Chip",
    description: "Golden, chewy perfection studded with premium chocolate chips — the cookie that started it all.",
    price: "$5.00",
    image: "/images/Chocolate_Chip.jpg",
  },
  {
    name: "Cinnamon Roll",
    description: "Soft, pillowy dough swirled with warm cinnamon sugar and drizzled with a sweet vanilla glaze.",
    price: "$5.00",
    image: "/images/Cinnamon_Roll.jpg",
  },
  {
    name: "Double Chocolate Chip",
    description: "Intensely rich chocolate dough packed with melty chocolate chips for the ultimate chocoholic treat.",
    price: "$5.00",
    image: "/images/Double_Chocolate_Chip.jpg",
  },
  {
    name: "Oatmeal",
    description: "Hearty rolled oats baked into a thick, chewy cookie with warm spices and a golden finish.",
    price: "$5.00",
    image: "/images/Oatmeal.jpg",
  },
  {
    name: "Peanut Butter",
    description: "Dense, criss-crossed peanut butter cookie packed with roasted peanut flavor in every satisfying bite.",
    price: "$5.00",
    image: "/images/Peanut_Butter.jpg",
  },
  {
    name: "Red Velvet",
    description: "Striking deep-red cookie with a soft crumb and pockets of creamy white chocolate chips throughout.",
    price: "$5.00",
    image: "/images/Red_Velvet.jpg",
  },
  {
    name: "Strawberry",
    description: "Bright, fruity cookie bursting with freeze-dried strawberry pieces and creamy white chocolate chips.",
    price: "$5.00",
    image: "/images/Strawberry.jpg",
  },
  {
    name: "Sugar Cookie",
    description: "Light, buttery, and cheerfully topped with rainbow sprinkles — a timeless classic for all ages.",
    price: "$5.00",
    image: "/images/Sugar_Cookie.jpg",
  },
];

const sellers: Seller[] = [
  {
    name: "Chocolate Chip",
    description: "Our most-loved classic — golden edges, gooey center, and premium chocolate chips in every bite.",
    price: "$5.00",
    image: "/images/Chocolate_Chip.jpg",
    rating: "4.9",
    label: "Bestseller",
  },
  {
    name: "Red Velvet",
    description: "A showstopping deep-red cookie with white chocolate chips that customers keep coming back for.",
    price: "$5.00",
    image: "/images/Red_Velvet.jpg",
    rating: "4.8",
    label: "Fan Favorite",
  },
  {
    name: "Double Chocolate Chip",
    description: "For serious chocolate lovers — double the cocoa, double the chips, double the happiness.",
    price: "$5.00",
    image: "/images/Double_Chocolate_Chip.jpg",
    rating: "5.0",
    label: "Chef's Pick",
  },
  {
    name: "Strawberry",
    description: "Our most unique flavor — freeze-dried strawberries and white chocolate make this one unforgettable.",
    price: "$5.00",
    image: "/images/Strawberry.jpg",
    rating: "4.9",
    label: "Most Gifted",
  },
];

const benefits: Benefit[] = [
  {
    title: "Fresh Daily Baking",
    description: "Small-batch cookies baked every morning for warm texture and peak aroma.",
    icon: "spark",
  },
  {
    title: "Premium Ingredients",
    description: "European butter, real chocolate, vanilla bean, and carefully balanced sweetness.",
    icon: "leaf",
  },
  {
    title: "Fast Delivery",
    description: "Beautifully packed boxes that arrive ready to enjoy, gift, or share.",
    icon: "truck",
  },
  {
    title: "Handmade Recipes",
    description: "Each recipe is hand-finished to deliver crisp edges, chewy centers, and depth.",
    icon: "hand",
  },
  {
    title: "Secure Ordering",
    description: "Simple checkout flows, trusted payments, and clear delivery updates.",
    icon: "lock",
  },
];

const testimonials: Testimonial[] = [
  {
    name: "Ava Thompson",
    role: "Wedding planner",
    quote: "Tastee's Cookies turned our dessert table into the most photographed part of the event. The cookies taste as premium as they look.",
    initials: "😊",
    tint: "#f2d7b6, #b97d4c",
  },
  {
    name: "Noah Patel",
    role: "Coffee bar owner",
    quote: "We pair these with espresso every afternoon, and the response is always the same: people ask where the cookies are from.",
    initials: "😍",
    tint: "#ead8c6, #8d5a32",
  },
  {
    name: "Sophia Martinez",
    role: "Frequent customer",
    quote: "The packaging feels luxury, the delivery is seamless, and the flavors have real depth. The caramel cookie is unforgettable.",
    initials: "🤩",
    tint: "#f0e1cf, #9b4a37",
  },
  {
    name: "James Okafor",
    role: "Corporate gifting manager",
    quote: "We ordered 200 boxes for our end-of-year gifts and every single person reached out to ask where they came from. Absolutely brilliant.",
    initials: "👏",
    tint: "#d8e8f0, #3a6a8d",
  },
  {
    name: "Priya Nair",
    role: "Food blogger",
    quote: "I've reviewed hundreds of cookie brands and Tastee's stands apart — the texture, the aroma, the presentation. It's the full package.",
    initials: "✍️",
    tint: "#f0d8e8, #8d3a6a",
  },
  {
    name: "Marcus Reid",
    role: "Birthday party host",
    quote: "Ordered the Red Velvet and Sugar Cookie for my daughter's birthday. The kids went crazy and the parents kept sneaking more. Total hit!",
    initials: "🎉",
    tint: "#d8f0e8, #3a8d6a",
  },
];

const gallery: GalleryItem[] = [
  { src: "/images/Chocolate_Chip.jpg", alt: "Chocolate Chip Cookie", span: "wide" },
  { src: "/images/Red_Velvet.jpg", alt: "Red Velvet Cookie", span: "tall" },
  { src: "/images/Double_Chocolate_Chip.jpg", alt: "Double Chocolate Chip Cookie", span: "square" },
  { src: "/images/Strawberry.jpg", alt: "Strawberry Cookie", span: "square" },
  { src: "/images/Cinnamon_Roll.jpg", alt: "Cinnamon Roll", span: "square" },
];

const stars = Array.from({ length: 5 });

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderBenefitIcon(kind: Benefit["icon"]) {
  switch (kind) {
    case "spark":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l1.9 5.7L20 9.6l-5.1 2.1L12 17l-2.9-5.3L4 9.6l6.1-1.9L12 2z" />
        </svg>
      );
    case "leaf":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 5c-8 0-14 4-14 10a4 4 0 004 4c6 0 10-6 10-14z" />
          <path d="M8 16c2-3 5-5 10-7" />
        </svg>
      );
    case "truck":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 7h11v10H3z" />
          <path d="M14 10h4l3 3v4h-7z" />
          <circle cx="7" cy="18" r="2" />
          <circle cx="17" cy="18" r="2" />
        </svg>
      );
    case "hand":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 13V7a2 2 0 114 0v5" />
          <path d="M12 12V6a2 2 0 114 0v6" />
          <path d="M16 12V8a2 2 0 114 0v7c0 3-2 5-5 5H9c-2 0-4-2-4-4v-4" />
        </svg>
      );
    case "lock":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="10" width="16" height="10" rx="3" />
          <path d="M8 10V7a4 4 0 018 0v3" />
        </svg>
      );
    default:
      return null;
  }
}

const SHOPIFY_DOMAIN = "909y05-xq.myshopify.com";
const SHOPIFY_TOKEN  = "b15acf5d699a2771a84f8ef6048a99f4";
const STOREFRONT_URL = `https://${SHOPIFY_DOMAIN}/api/2024-04/graphql.json`;

async function shopifyFetch(query: string, variables: Record<string, unknown> = {}) {
  const res = await fetch(STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`Shopify API error: ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0]?.message ?? "Shopify error");
  return json;
}

async function createCart(): Promise<{ id: string; checkoutUrl: string }> {
  const data = await shopifyFetch(`
    mutation {
      cartCreate {
        cart { id checkoutUrl }
        userErrors { field message }
      }
    }
  `);
  const errors = data.data?.cartCreate?.userErrors;
  if (errors?.length) throw new Error(errors[0].message);
  return data.data.cartCreate.cart;
}

async function addToCart(cartId: string, merchandiseId: string, quantity = 1): Promise<{ id: string; checkoutUrl: string; totalQuantity: number }> {
  const data = await shopifyFetch(`
    mutation($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { id checkoutUrl totalQuantity }
        userErrors { field message }
      }
    }
  `, {
    cartId,
    lines: [{ merchandiseId, quantity: 1 }],
  });
  const errors = data.data?.cartLinesAdd?.userErrors;
  if (errors?.length) throw new Error(errors[0].message);
  return data.data.cartLinesAdd.cart;
}

async function fetchProducts(): Promise<{ id: string; title: string; variants: { edges: { node: { id: string } }[] } }[]> {
  const data = await shopifyFetch(`
    {
      products(first: 20) {
        edges {
          node {
            id title
            variants(first: 1) {
              edges { node { id } }
            }
          }
        }
      }
    }
  `);
  return data.data?.products?.edges?.map((e: { node: unknown }) => e.node) ?? [];
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [toast, setToast] = useState<string>("Fresh out of the oven, packed with love! 🍪");
  const [activeReview, setActiveReview] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [shopifyProducts, setShopifyProducts] = useState<{ id: string; title: string; variants: { edges: { node: { id: string } }[] } }[]>([]);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);
  const bestSellerTrackRef = useRef<HTMLDivElement | null>(null);

  const lightboxItem = useMemo(
    () => (lightboxIndex === null ? null : gallery[lightboxIndex]),
    [lightboxIndex]
  );

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -10% 0px" }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveReview((current) => (current + 1) % 2);
    }, 6500);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMobileOpen(false);
      setLightboxIndex(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      setLightboxIndex((current) => {
        if (current === null) return current;
        const direction = event.deltaY > 0 || event.deltaX > 0 ? 1 : -1;
        return (current + direction + gallery.length) % gallery.length;
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [lightboxIndex]);

  useEffect(() => {
    fetchProducts().then(setShopifyProducts).catch(console.error);
  }, []);

  function showToast(message: string) {
    setToast(message);
    if (toastTimerRef.current !== null) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => {
      setToast("Fresh out of the oven, packed with love! 🍪");
    }, 2600);
  }

  async function handleAddToCart(name: string, quantity = 1) {
    const match = shopifyProducts.find(p =>
      p.title.toLowerCase().includes(name.split(" ")[0].toLowerCase()) ||
      name.toLowerCase().includes(p.title.split(" ")[0].toLowerCase())
    );

    const merchandiseId = match?.variants?.edges?.[0]?.node?.id;

    if (!merchandiseId) {
      showToast(`${name} coming soon! 🍪`);
      return;
    }

    setAddingToCart(name);
    try {
      let currentCartId = checkoutId;

      if (!currentCartId) {
        const cart = await createCart();
        currentCartId = cart.id;
        setCheckoutId(currentCartId);
        setCheckoutUrl(cart.checkoutUrl);
      }

      const updated = await addToCart(currentCartId, merchandiseId, quantity);
      setCheckoutUrl(updated.checkoutUrl);
      setCartCount(updated.totalQuantity);
      showToast(`${name} added to your cart! 🍪`);
    } catch (err) {
      console.error(err);
      showToast("Couldn't connect to checkout. Please try again.");
    } finally {
      setAddingToCart(null);
    }
  }

  const [quantities, setQuantities] = useState<Record<string, number>>({});

  function getQty(name: string) {
    return quantities[name] ?? 1;
  }

  function changeQty(name: string, delta: number) {
    setQuantities(q => ({ ...q, [name]: Math.max(1, (q[name] ?? 1) + delta) }));
  }

  function handleCheckout() {
    if (checkoutUrl) {
      window.open(checkoutUrl, "_blank");
    } else {
      scrollToId("menu");
      showToast("Add a cookie to your cart first! 🍪");
    }
  }

  function scrollBestSellers(direction: "left" | "right") {
    const track = bestSellerTrackRef.current;
    if (!track) return;
    const distance = Math.max(320, track.clientWidth * 0.8);
    track.scrollBy({ left: direction === "right" ? distance : -distance, behavior: "smooth" });
  }

  function jumpToReview(index: number) {
    setActiveReview(index);
    scrollToId("reviews");
  }

  return (
    <div className="site-shell">
      <style>{`
        :root {
          color-scheme: light;
          --bg: #fdf6f0;
          --bg-soft: #faf0e8;
          --panel: rgba(253, 246, 240, 0.72);
          --panel-strong: rgba(255, 250, 245, 0.92);
          --text: #2a0d1e;
          --muted: #8a4a6a;
          --line: rgba(180, 50, 100, 0.14);
          --gold: #d63a7a;
          --gold-soft: rgba(214, 58, 122, 0.14);
          --shadow: 0 26px 60px rgba(107, 31, 168, 0.10);
          --shadow-strong: 0 36px 80px rgba(107, 31, 168, 0.18);
          --radius-xl: 36px;
          --radius-lg: 28px;
          --radius-md: 22px;
        }

        html {
          scroll-behavior: smooth;
          background: var(--bg);
        }

        body {
          margin: 0;
          background:
            radial-gradient(circle at top left, rgba(214, 58, 122, 0.12), transparent 28%),
            radial-gradient(circle at right top, rgba(107, 31, 168, 0.14), transparent 24%),
            linear-gradient(180deg, #fff8f2 0%, #fdf0e8 38%, #fae8de 100%);
          color: var(--text);
          font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          overflow-x: hidden;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        img {
          display: block;
          max-width: 100%;
        }

        button, input, textarea {
          font: inherit;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .site-shell {
          position: relative;
          min-height: 100vh;
          isolation: isolate;
        }

        .page-noise {
          pointer-events: none;
          position: fixed;
          inset: 0;
          opacity: 0.24;
          background-image:
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px);
          background-size: 140px 140px;
          mask-image: linear-gradient(180deg, rgba(0,0,0,0.55), transparent 85%);
          z-index: 0;
        }

        .layout {
          position: relative;
          z-index: 1;
        }

        .container {
          width: min(1180px, calc(100% - 32px));
          margin: 0 auto;
        }

        .topbar {
          position: sticky;
          top: 14px;
          z-index: 40;
          width: min(1180px, calc(100% - 20px));
          margin: 14px auto 0;
          padding: 16px 18px;
          border: 1px solid rgba(255, 255, 255, 0.45);
          border-radius: 999px;
          background: linear-gradient(180deg, rgba(255, 250, 245, 0.88), rgba(252, 240, 232, 0.68));
          backdrop-filter: blur(18px);
          box-shadow: 0 14px 34px rgba(107, 31, 168, 0.10);
          overflow: visible;
        }

        .topbar__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
        }

        .brand {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .brand__mark {
          display: grid;
          place-items: center;
          width: 42px;
          height: 42px;
          border-radius: 16px;
          color: #fffaf4;
          background: linear-gradient(145deg, #6b1fa8, #b02878 68%, #d63a7a);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.35), 0 10px 18px rgba(107, 31, 168, 0.28);
        }

        .brand__copy {
          display: grid;
          gap: 2px;
          overflow: visible;
        }

        .brand__name {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.05rem;
          font-weight: 800;
          line-height: 1;
          letter-spacing: 0.02em;
        }

        .brand__tag {
          color: var(--muted);
          font-size: 0.74rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          overflow: visible;
          white-space: nowrap;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 26px;
        }

        .nav-links button,
        .nav-links a {
          position: relative;
          padding: 0;
          border: 0;
          background: none;
          color: var(--muted);
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: color 180ms ease, transform 180ms ease;
        }

        .nav-links button::after,
        .nav-links a::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -8px;
          width: 100%;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 220ms ease;
        }

        .nav-links button:hover,
        .nav-links a:hover {
          color: var(--text);
          transform: translateY(-1px);
        }

        .nav-links button:hover::after,
        .nav-links a:hover::after {
          transform: scaleX(1);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .nav-chip {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 18px;
          border: 1px solid rgba(130, 60, 150, 0.14);
          border-radius: 999px;
          background: rgba(253, 246, 255, 0.85);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.65);
          font-size: 0.9rem;
          font-weight: 700;
          white-space: nowrap;
        }

        .nav-chip__count {
          display: inline-grid;
          place-items: center;
          min-width: 26px;
          height: 26px;
          padding: 0 8px;
          border-radius: 999px;
          background: linear-gradient(135deg, #6b1fa8, #d63a7a);
          color: white;
          font-size: 0.84rem;
        }

        .menu-toggle {
          display: none;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border: 1px solid rgba(130, 60, 150, 0.14);
          border-radius: 999px;
          background: rgba(255, 250, 245, 0.82);
          color: var(--text);
          cursor: pointer;
        }

        .menu-toggle svg {
          width: 22px;
          height: 22px;
        }

        .mobile-nav {
          display: none;
          width: 100%;
          padding: 10px 18px 14px;
          border-top: 1px solid rgba(130, 60, 150, 0.14);
        }

        .mobile-nav__links {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        .mobile-nav__links button {
          width: 100%;
          padding: 14px 0;
          border: 0;
          border-bottom: 1px solid rgba(130, 60, 150, 0.1);
          background: none;
          text-align: center;
          font-size: 1rem;
          font-weight: 700;
          color: var(--text);
          cursor: pointer;
        }

        .mobile-nav__links button:last-child {
          border-bottom: 0;
        }

        .hero {
          position: relative;
          min-height: calc(100vh - 96px);
          overflow: clip;
          padding: 34px 0 30px;
        }

        .hero::before,
        .hero::after {
          content: '';
          position: absolute;
          border-radius: 999px;
          filter: blur(10px);
          pointer-events: none;
          animation: drift 18s ease-in-out infinite alternate;
        }

        .hero::before {
          top: 8%;
          left: 6%;
          width: 180px;
          height: 180px;
          background: radial-gradient(circle, rgba(200, 140, 230, 0.24), transparent 68%);
        }

        .hero::after {
          right: 4%;
          bottom: 8%;
          width: 260px;
          height: 260px;
          background: radial-gradient(circle, rgba(240, 170, 220, 0.3), transparent 68%);
          animation-delay: -7s;
        }

        .hero__grid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(420px, 0.95fr);
          align-items: center;
          gap: 28px;
          min-height: calc(100vh - 170px);
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin: 0 0 20px;
          color: #9b1f6e;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.32em;
        }

        .eyebrow::before {
          content: '';
          width: 42px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
        }

        .hero__title {
          margin: 0;
          max-width: 12ch;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(3.6rem, 8vw, 7.6rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.04em;
          text-wrap: balance;
          overflow: visible;
          padding-bottom: 0.1em;
          animation: titleGlow 7s ease-in-out infinite alternate;
        }

        .hero__title span {
          display: inline-block;
          background: linear-gradient(120deg, #2a0d1e 10%, #6b1fa8 42%, #d63a7a 78%, #7a3010);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          padding-bottom: 0.12em;
          line-height: inherit;
        }

        .hero__copy {
          margin: 24px 0 0;
          max-width: 58ch;
          color: var(--muted);
          font-size: clamp(1rem, 1.6vw, 1.16rem);
          line-height: 1.8;
        }

        .hero__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 34px;
        }

        .button {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 54px;
          padding: 0 22px;
          border: 0;
          border-radius: 999px;
          cursor: pointer;
          font-size: 0.95rem;
          font-weight: 800;
          transition: transform 220ms ease, box-shadow 220ms ease, background 220ms ease, color 220ms ease;
          will-change: transform;
        }

        .button::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.36) 50%, transparent 80%);
          transform: translateX(-130%);
          transition: transform 420ms ease;
          pointer-events: none;
        }

        .button:hover {
          transform: translateY(-2px);
        }

        .button:hover::after {
          transform: translateX(130%);
        }

        .button--primary {
          color: #fffaf5;
          background: linear-gradient(135deg, #6b1fa8, #b02878 58%, #d63a7a);
          box-shadow: 0 18px 36px rgba(107, 31, 168, 0.28);
        }

        .button--ghost {
          border: 1px solid rgba(130, 60, 150, 0.18);
          color: var(--text);
          background: rgba(253, 248, 255, 0.85);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.8);
        }

        .button--soft {
          background: rgba(253, 242, 255, 0.9);
          border: 1px solid rgba(130, 60, 150, 0.12);
          color: var(--text);
        }

        .hero__note {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: 28px;
          color: var(--muted);
          font-size: 0.94rem;
          line-height: 1.6;
        }

        .hero__note strong {
          color: var(--text);
        }

        .hero__visual {
          position: relative;
          display: grid;
          place-items: center;
          min-height: 640px;
        }

        .hero__halo {
          position: absolute;
          inset: 9% 7% 14% 8%;
          border-radius: 42% 58% 48% 52% / 50% 40% 60% 50%;
          background:
            radial-gradient(circle at 34% 22%, rgba(255,255,255,0.6), transparent 26%),
            radial-gradient(circle at 65% 20%, rgba(214, 58, 122, 0.20), transparent 30%),
            radial-gradient(circle at 50% 62%, rgba(107, 31, 168, 0.15), transparent 55%),
            linear-gradient(145deg, rgba(255, 248, 240, 0.9), rgba(245, 220, 200, 0.6));
          filter: blur(4px);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.72), 0 24px 80px rgba(117, 72, 35, 0.12);
          animation: float 9s ease-in-out infinite alternate;
        }

        .hero__plate {
          position: relative;
          width: min(100%, 760px);
          filter: drop-shadow(0 30px 50px rgba(61, 24, 11, 0.22));
          transform: translateY(8px);
          animation: float 8s ease-in-out infinite alternate;
        }

        .hero__plate img {
          width: 100%;
          height: auto;
          object-fit: cover;
          border-radius: 34px;
          border: 1px solid rgba(255,255,255,0.45);
        }

        .cookie-float {
          position: absolute;
          width: 74px;
          height: 74px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.45);
          background:
            radial-gradient(circle at 35% 30%, rgba(255,255,255,0.55), transparent 20%),
            radial-gradient(circle at 55% 60%, rgba(107, 31, 168, 0.22), transparent 28%),
            linear-gradient(145deg, #6b1fa8, #d63a7a 78%);
          box-shadow: 0 20px 38px rgba(107, 31, 168, 0.22), inset 0 1px 0 rgba(255,255,255,0.5);
          opacity: 0.75;
          animation: orbit 14s ease-in-out infinite alternate;
        }

        .cookie-float::before,
        .cookie-float::after {
          content: '';
          position: absolute;
          inset: 22% 38% 22% 38%;
          border-radius: 50%;
          background: rgba(255, 244, 229, 0.85);
          box-shadow: 14px 12px 0 rgba(255, 244, 229, 0.78), -12px 10px 0 rgba(255, 244, 229, 0.78);
        }

        .cookie-float::after {
          inset: 30% 30% 30% 30%;
          opacity: 0.72;
          box-shadow: 16px -8px 0 rgba(255, 244, 229, 0.8), -16px 8px 0 rgba(255, 244, 229, 0.8);
        }

        .cookie-float--one { top: 10%; left: 4%; animation-delay: -1s; }
        .cookie-float--two { top: 18%; right: 8%; width: 56px; height: 56px; animation-delay: -4s; }
        .cookie-float--three { bottom: 16%; left: 0%; width: 88px; height: 88px; animation-delay: -7s; }
        .cookie-float--four { bottom: 8%; right: 18%; width: 60px; height: 60px; animation-delay: -2s; }

        .section {
          position: relative;
          padding: 96px 0;
        }

        .section__head {
          display: grid;
          gap: 12px;
          margin-bottom: 32px;
        }

        .section__title {
          margin: 0;
          max-width: 100%;
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(1.6rem, 2.8vw, 2.6rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.02em;
          white-space: nowrap;
        }

        .section__text {
          max-width: 62ch;
          margin: 0;
          color: var(--muted);
          font-size: 1rem;
          line-height: 1.75;
        }

        .section__head-row {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 32px;
        }

        .section__actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .reveal {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 700ms ease, transform 700ms ease;
          will-change: transform, opacity;
        }

        .reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .featured-grid {
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          gap: 18px;
        }

        .cookie-card {
          grid-column: span 4;
          position: relative;
          overflow: hidden;
          border: 1px solid var(--line);
          border-radius: var(--radius-xl);
          background: linear-gradient(180deg, rgba(255,255,255,0.9), rgba(249,240,230,0.9));
          box-shadow: var(--shadow);
          transition: transform 240ms ease, box-shadow 240ms ease, border-color 240ms ease;
        }

        .cookie-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-strong);
          border-color: rgba(201, 141, 71, 0.3);
        }

        .cookie-card::before {
          content: '';
          position: absolute;
          inset: auto -10% -45% 12%;
          height: 160px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201, 141, 71, 0.18), transparent 70%);
          pointer-events: none;
        }

        .cookie-card__image {
          position: relative;
          aspect-ratio: 1.05;
          overflow: hidden;
          background: linear-gradient(180deg, rgba(255,255,255,0.75), rgba(247,230,214,0.7));
        }

        .cookie-card__image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 420ms ease;
        }

        .cookie-card:hover .cookie-card__image img {
          transform: scale(1.06);
        }

        .cookie-card__body {
          display: grid;
          gap: 14px;
          padding: 22px;
        }

        .cookie-card__top {
          display: flex;
          align-items: start;
          justify-content: space-between;
          gap: 16px;
        }

        .cookie-card__name {
          margin: 0;
          font-size: 1.2rem;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

        .cookie-card__desc {
          margin: 0;
          color: var(--muted);
          line-height: 1.7;
          font-size: 0.95rem;
        }

        .cookie-card__price {
          flex: none;
          padding: 10px 12px;
          border-radius: 999px;
          background: rgba(255, 250, 246, 0.92);
          border: 1px solid rgba(130, 60, 150, 0.12);
          font-weight: 800;
          color: var(--text);
        }

        .cookie-card__footer {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 14px;
        }

        .qty-stepper {
          display: flex;
          align-items: center;
          gap: 0;
          border: 1.5px solid rgba(107, 31, 168, 0.2);
          border-radius: 50px;
          overflow: hidden;
          background: rgba(255,255,255,0.8);
        }

        .qty-btn {
          width: 34px;
          height: 34px;
          border: 0;
          background: none;
          font-size: 1.1rem;
          font-weight: 700;
          color: #6b1fa8;
          cursor: pointer;
          display: grid;
          place-items: center;
          transition: background 0.15s;
        }

        .qty-btn:hover {
          background: rgba(107, 31, 168, 0.08);
        }

        .qty-value {
          min-width: 28px;
          text-align: center;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--text);
        }

        .cookie-card__action {
          display: inline-flex;
          width: fit-content;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border: 0;
          border-radius: 999px;
          background: linear-gradient(135deg, #6b1fa8, #b02878 58%, #d63a7a);
          color: #fffaf5;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 16px 24px rgba(107, 31, 168, 0.28);
          transition: transform 220ms ease, box-shadow 220ms ease;
        }

        .cookie-card__action:hover {
          transform: translateY(-2px);
          box-shadow: 0 22px 34px rgba(107, 31, 168, 0.34);
        }

        .cookie-card__action svg {
          width: 16px;
          height: 16px;
        }

        .about-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 24px;
          align-items: center;
        }

        .about-copy {
          display: grid;
          gap: 18px;
        }

        .about-copy p {
          margin: 0;
          color: var(--muted);
          line-height: 1.8;
        }

        .about-list {
          display: grid;
          gap: 14px;
          margin: 6px 0 0;
          padding: 0;
          list-style: none;
        }

        .about-list li {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          padding: 14px 16px;
          border: 1px solid rgba(130, 60, 150, 0.12);
          border-radius: 20px;
          background: rgba(255, 251, 247, 0.72);
        }

        .about-list strong {
          display: block;
          font-size: 0.98rem;
          margin-bottom: 3px;
        }

        .about-list span {
          color: var(--muted);
          font-size: 0.94rem;
          line-height: 1.6;
        }

        .about-list__bullet {
          flex: none;
          display: grid;
          place-items: center;
          width: 34px;
          height: 34px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(92, 45, 23, 0.1), rgba(224, 176, 122, 0.18));
          color: #7f4f24;
        }

        .about-visual {
          position: relative;
          display: grid;
          grid-template-columns: 0.88fr 1.12fr;
          gap: 14px;
          align-items: stretch;
        }

        .about-visual__column {
          display: grid;
          gap: 14px;
        }

        .about-visual__tile,
        .about-visual__tile--tall {
          overflow: hidden;
          border-radius: 28px;
          border: 1px solid rgba(130, 60, 150, 0.12);
          background: rgba(255, 251, 248, 0.8);
          box-shadow: var(--shadow);
        }

        .about-visual__tile img,
        .about-visual__tile--tall img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 520ms ease;
        }

        .about-visual__tile:hover img,
        .about-visual__tile--tall:hover img {
          transform: scale(1.05);
        }

        .about-visual__tile {
          aspect-ratio: 1.1;
        }

        .about-visual__tile--tall {
          height: 100%;
          min-height: 420px;
        }

        .about-quote {
          position: absolute;
          left: 16px;
          bottom: 16px;
          max-width: 74%;
          padding: 16px 18px;
          border-radius: 22px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          background: rgba(255, 251, 247, 0.72);
          backdrop-filter: blur(14px);
          box-shadow: 0 20px 44px rgba(61, 27, 12, 0.14);
        }

        .about-quote p {
          margin: 0;
          color: var(--text);
          font-size: 0.95rem;
          line-height: 1.7;
        }

        .carousel {
          position: relative;
          margin-top: 6px;
        }

        .carousel__controls {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .carousel__button {
          display: inline-grid;
          place-items: center;
          width: 46px;
          height: 46px;
          border-radius: 999px;
          border: 1px solid rgba(130, 60, 150, 0.14);
          background: rgba(252, 246, 255, 0.88);
          cursor: pointer;
          transition: transform 220ms ease, background 220ms ease;
        }

        .carousel__button:hover {
          transform: translateY(-2px);
          background: rgba(250, 240, 255, 0.98);
        }

        .carousel__button svg {
          width: 18px;
          height: 18px;
        }

        .carousel__track {
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: minmax(280px, 1fr);
          gap: 18px;
          overflow-x: auto;
          padding-bottom: 6px;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
        }

        .carousel__track::-webkit-scrollbar {
          display: none;
        }

        .seller-card {
          position: relative;
          overflow: hidden;
          scroll-snap-align: start;
          border-radius: 30px;
          border: 1px solid rgba(130, 60, 150, 0.14);
          background: linear-gradient(180deg, rgba(255,255,255,0.94), rgba(250, 240, 230, 0.92));
          box-shadow: var(--shadow);
          transition: transform 240ms ease, box-shadow 240ms ease;
        }

        .seller-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 36px 80px rgba(90, 20, 120, 0.16), 0 0 0 1px rgba(194, 56, 126, 0.18);
        }

        .seller-card__image {
          aspect-ratio: 1.18;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(255,255,255,0.75), rgba(235, 210, 250, 0.55));
        }

        .seller-card__image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 500ms ease, filter 500ms ease;
        }

        .seller-card:hover .seller-card__image img {
          transform: scale(1.07);
          filter: saturate(1.04) contrast(1.03);
        }

        .seller-card__body {
          padding: 20px;
          display: grid;
          gap: 12px;
        }

        .seller-card__meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .seller-card__label {
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(194, 56, 126, 0.12);
          color: #8e1461;
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .seller-card__rating {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #6a1b9a;
          font-weight: 700;
          font-size: 0.94rem;
        }

        .seller-card__rating svg {
          width: 15px;
          height: 15px;
          color: #c2387e;
        }

        .seller-card__name {
          margin: 0;
          font-size: 1.18rem;
          line-height: 1.12;
        }

        .seller-card__desc {
          margin: 0;
          color: var(--muted);
          line-height: 1.7;
          font-size: 0.94rem;
        }

        .seller-card__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 2px;
        }

        .seller-card__price {
          font-size: 1.1rem;
          font-weight: 800;
        }

        .benefit-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 14px;
        }

        .benefit-card {
          display: grid;
          gap: 14px;
          padding: 22px;
          border-radius: 26px;
          border: 1px solid rgba(130, 60, 150, 0.12);
          background: linear-gradient(180deg, rgba(255,255,255,0.88), rgba(246, 234, 255, 0.84));
          box-shadow: 0 20px 50px rgba(74, 33, 15, 0.08);
          transition: transform 240ms ease, box-shadow 240ms ease, border-color 240ms ease;
        }

        .benefit-card:hover {
          transform: translateY(-6px);
          border-color: rgba(194, 56, 126, 0.28);
          box-shadow: 0 32px 64px rgba(74, 33, 15, 0.12);
        }

        .benefit-card__icon {
          display: grid;
          place-items: center;
          width: 54px;
          height: 54px;
          border-radius: 18px;
          background: linear-gradient(135deg, rgba(107, 31, 168, 0.12), rgba(220, 120, 200, 0.2));
          color: #7b1fa2;
        }

        .benefit-card__icon svg {
          width: 22px;
          height: 22px;
        }

        .benefit-card h3 {
          margin: 0;
          font-size: 1.08rem;
        }

        .benefit-card p {
          margin: 0;
          color: var(--muted);
          line-height: 1.7;
          font-size: 0.94rem;
        }

        .reviews-wrap {
          display: grid;
          gap: 18px;
        }

        .reviews-slider {
          position: relative;
          overflow: hidden;
        }

        .reviews-track {
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: 100%;
          transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .reviews-page {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .review-card {
          padding: clamp(18px, 3vw, 26px);
          border-radius: 18px;
          border: 1px solid rgba(220, 210, 230, 0.6);
          background: #fff;
          box-shadow: 0 4px 24px rgba(107, 31, 168, 0.06);
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-content: start;
        }

        .review-card__header {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .review-card__person {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: auto;
          padding-top: 14px;
          border-top: 1px solid rgba(220, 210, 230, 0.5);
        }

        .review-card__avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          font-size: 1.2rem;
          background: rgba(245, 235, 255, 0.8);
          border: 1px solid rgba(200, 180, 220, 0.4);
          flex-shrink: 0;
        }

        .review-card__name {
          margin: 0;
          font-size: 0.98rem;
          font-weight: 700;
          color: var(--text);
        }

        .review-card__role {
          color: var(--muted);
          font-size: 0.82rem;
        }

        .review-stars {
          display: inline-flex;
          gap: 3px;
          color: #d63a7a;
        }

        .review-stars svg {
          width: 14px;
          height: 14px;
        }

        .review-card__quote {
          margin: 0;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(0.9rem, 1.3vw, 1.02rem);
          line-height: 1.7;
          color: #3a2a4a;
          flex: 1;
        }

        .review-card__accent {
          display: none;
        }

        .review-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          flex-wrap: wrap;
        }

        .review-dots {
          display: inline-flex;
          gap: 8px;
        }

        .review-dot {
          width: 10px;
          height: 10px;
          border: 0;
          border-radius: 50%;
          background: rgba(100, 40, 130, 0.18);
          cursor: pointer;
          transition: transform 200ms ease, background 200ms ease, width 200ms ease;
        }

        .review-dot[aria-current="true"] {
          width: 30px;
          border-radius: 999px;
          background: linear-gradient(90deg, #6b1fa8, #d63a7a);
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          gap: 16px;
          grid-auto-flow: dense;
        }

        .gallery-item {
          position: relative;
          overflow: hidden;
          padding: 0;
          appearance: none;
          border-radius: 28px;
          border: 1px solid rgba(130, 60, 150, 0.12);
          background: rgba(255, 252, 247, 0.85);
          box-shadow: var(--shadow);
          cursor: pointer;
          min-height: 220px;
          transition: transform 220ms ease, box-shadow 220ms ease;
        }

        .gallery-item:hover {
          transform: translateY(-6px);
          box-shadow: 0 34px 72px rgba(68, 31, 14, 0.15);
        }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 520ms ease, filter 520ms ease;
        }

        .gallery-item:hover img {
          transform: scale(1.07);
          filter: saturate(1.04) contrast(1.03);
        }

        .gallery-item::after {
          content: '';
          position: absolute;
          inset: auto 0 0;
          height: 42%;
          background: linear-gradient(180deg, transparent, rgba(26, 10, 4, 0.42));
          opacity: 0;
          transition: opacity 220ms ease;
        }

        .gallery-item:hover::after {
          opacity: 1;
        }

        .gallery-item--wide { grid-column: span 7; }
        .gallery-item--tall { grid-column: span 5; min-height: 460px; }
        .gallery-item--square { grid-column: span 4; }

        .cta-panel {
          position: relative;
          overflow: hidden;
          padding: clamp(28px, 5vw, 56px);
          border-radius: 42px;
          border: 1px solid rgba(255, 255, 255, 0.42);
          background:
            radial-gradient(circle at top left, rgba(255,255,255,0.34), transparent 24%),
            radial-gradient(circle at right bottom, rgba(220, 140, 240, 0.28), transparent 28%),
            linear-gradient(135deg, rgba(45, 15, 80, 0.97), rgba(100, 30, 130, 0.96) 48%, rgba(194, 56, 126, 0.93));
          box-shadow: 0 34px 80px rgba(107, 31, 168, 0.30);
          color: #fff9f3;
        }

        .cta-panel::before,
        .cta-panel::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.2), transparent 62%);
          pointer-events: none;
        }

        .cta-panel::before {
          top: -70px;
          right: -60px;
          width: 220px;
          height: 220px;
        }

        .cta-panel::after {
          bottom: -80px;
          left: 10%;
          width: 280px;
          height: 280px;
        }

        .cta-panel__grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 24px;
          align-items: center;
        }

        .cta-panel h2 {
          margin: 0;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.6rem, 5vw, 5rem);
          line-height: 0.95;
          letter-spacing: -0.04em;
        }

        .cta-panel p {
          margin: 18px 0 0;
          max-width: 62ch;
          color: rgba(255, 250, 245, 0.82);
          line-height: 1.8;
        }

        .cta-panel__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 28px;
        }

        .cta-panel__aside {
          padding: 24px;
          border-radius: 28px;
          border: 1px solid rgba(255,255,255,0.22);
          background: rgba(255, 247, 238, 0.12);
          backdrop-filter: blur(14px);
          display: grid;
          gap: 16px;
        }

        .cta-panel__aside h3 {
          margin: 0;
          font-size: 1.08rem;
        }

        .cta-panel__aside p {
          margin: 0;
          color: rgba(255, 250, 245, 0.82);
          font-size: 0.95rem;
          line-height: 1.7;
        }

        .newsletter {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
        }

        .newsletter input {
          flex: 1 1 240px;
          min-width: 0;
          height: 52px;
          padding: 0 16px;
          border: 1px solid rgba(255, 255, 255, 0.24);
          border-radius: 999px;
          background: rgba(255, 249, 240, 0.16);
          color: #fffaf5;
          outline: none;
        }

        .newsletter input::placeholder {
          color: rgba(255, 250, 245, 0.68);
        }

        .footer {
          padding: 44px 0 32px;
        }

        .footer__panel {
          padding: 28px;
          border-radius: 34px;
          border: 1px solid rgba(130, 60, 150, 0.12);
          background: rgba(253, 248, 255, 0.88);
          box-shadow: var(--shadow);
        }

        .footer__grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr 0.8fr 0.9fr;
          gap: 24px;
          align-items: start;
        }

        .footer h3,
        .footer h4 {
          margin: 0;
        }

        .footer p,
        .footer a,
        .footer li {
          color: var(--muted);
          line-height: 1.8;
        }

        .footer ul {
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 8px;
        }

        .footer__socials {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .footer__socials a {
          display: inline-grid;
          place-items: center;
          width: 44px;
          height: 44px;
          border-radius: 14px;
          border: 1px solid rgba(130, 60, 150, 0.12);
          background: rgba(252, 244, 255, 0.82);
          color: var(--text);
          transition: transform 220ms ease, background 220ms ease;
        }

        .footer__socials a:hover {
          transform: translateY(-2px);
          background: rgba(249, 236, 255, 0.98);
        }

        .footer__socials svg {
          width: 18px;
          height: 18px;
        }

        .footer__bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          flex-wrap: wrap;
          padding: 18px 4px 0;
          margin-top: 18px;
          border-top: 1px solid rgba(130, 60, 150, 0.12);
        }

        .toast {
          position: fixed;
          left: 18px;
          bottom: 18px;
          z-index: 45;
          max-width: min(92vw, 420px);
          padding: 14px 16px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.5);
          background: rgba(41, 23, 14, 0.86);
          color: #fffaf6;
          backdrop-filter: blur(14px);
          box-shadow: 0 18px 42px rgba(40, 18, 8, 0.28);
          animation: toastIn 300ms ease;
          display: none;
        }

        .toast strong {
          display: block;
          margin-bottom: 2px;
          color: #f0b0d8;
        }

        .lightbox {
          position: fixed;
          inset: 0;
          z-index: 60;
          display: grid;
          place-items: center;
          padding: 18px;
          background: rgba(18, 10, 6, 0.82);
          backdrop-filter: blur(10px);
        }

        .lightbox__panel {
          position: relative;
          width: min(1100px, 100%);
          border-radius: 30px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.16);
          background: rgba(255, 250, 244, 0.06);
          box-shadow: 0 34px 90px rgba(0,0,0,0.35);
        }

        .lightbox__image {
          width: 100%;
          max-height: 80vh;
          object-fit: cover;
        }

        .lightbox__caption {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 16px 18px;
          color: #fff9f2;
        }

        .lightbox__caption button {
          display: inline-grid;
          place-items: center;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 0;
          background: rgba(255,255,255,0.12);
          color: #fff9f2;
          cursor: pointer;
        }

        .lightbox__nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          display: inline-grid;
          place-items: center;
          width: 48px;
          height: 48px;
          border: 0;
          border-radius: 50%;
          background: rgba(255,255,255,0.12);
          color: #fff;
          cursor: pointer;
          backdrop-filter: blur(14px);
        }

        .lightbox__nav--prev { left: 16px; }
        .lightbox__nav--next { right: 16px; }

        .lightbox__nav svg {
          width: 20px;
          height: 20px;
        }

        .visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        @keyframes float {
          0% { transform: translate3d(0, 0, 0) rotate(0.2deg); }
          100% { transform: translate3d(0, -18px, 0) rotate(-0.5deg); }
        }

        @keyframes drift {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          100% { transform: translate3d(20px, -16px, 0) scale(1.08); }
        }

        @keyframes orbit {
          0% { transform: translate3d(0, 0, 0) rotate(0deg); }
          100% { transform: translate3d(0, -10px, 0) rotate(8deg); }
        }

        @keyframes titleGlow {
          0% { filter: drop-shadow(0 0 0 rgba(201,141,71,0)); }
          100% { filter: drop-shadow(0 16px 36px rgba(194,56,126,0.14)); }
        }

        @keyframes toastIn {
          from { transform: translateY(8px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @media (max-width: 1100px) {
          .hero__grid,
          .about-grid,
          .cta-panel__grid,
          .footer__grid {
            grid-template-columns: 1fr;
          }

          .hero__visual {
            min-height: 520px;
          }

          .benefit-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .featured-grid {
            grid-template-columns: repeat(6, minmax(0, 1fr));
          }

          .cookie-card {
            grid-column: span 3;
          }

          .gallery-item--wide,
          .gallery-item--tall,
          .gallery-item--square {
            grid-column: span 6;
          }
        }

        @media (max-width: 860px) {
          .topbar {
            width: calc(100% - 16px);
            border-radius: ${mobileOpen ? "28px 28px 20px 20px" : "28px"};
          }

          .nav-links,
          .nav-actions .nav-chip,
          .nav-actions .button--primary {
            display: none;
          }

          .menu-toggle {
            display: inline-flex;
          }

          .mobile-nav {
            display: ${mobileOpen ? "block" : "none"};
          }

          .hero {
            min-height: auto;
            padding-top: 12px;
          }

          .hero__grid {
            min-height: auto;
            gap: 10px;
          }

          .hero__title {
            max-width: 100%;
          }

          .cookie-card,
          .gallery-item--wide,
          .gallery-item--tall,
          .gallery-item--square {
            grid-column: span 12;
          }

          .benefit-grid {
            grid-template-columns: 1fr;
          }

          .about-visual {
            grid-template-columns: 1fr;
          }

          .about-visual__tile--tall {
            min-height: 320px;
          }

          .carousel__track {
            grid-auto-columns: minmax(78vw, 1fr);
          }

          .cta-panel__aside {
            padding: 18px;
          }

          .footer__panel {
            padding: 22px;
          }
        }

        @media (max-width: 640px) {
          .container {
            width: min(100% - 20px, 1180px);
          }

          .topbar__inner {
            align-items: center;
          }

          .brand {
            flex: 1;
            gap: 8px;
          }

          .brand__copy {
            flex: 1;
            text-align: center;
          }

          .brand__name {
            font-size: 1.25rem;
          }

          .brand__tag {
            letter-spacing: 0.10em;
            font-size: 0.66rem;
            text-align: center;
          }

          .hero {
            padding-bottom: 8px;
          }

          .hero__actions,
          .section__actions,
          .cta-panel__actions,
          .newsletter {
            flex-direction: column;
            align-items: stretch;
          }

          .newsletter input {
            border-radius: 14px;
            flex: none;
            width: 100%;
          }

          .button,
          .button--ghost,
          .button--soft {
            width: 100%;
          }

          .hero__visual {
            min-height: 420px;
          }

          .cookie-float--one { top: 5%; left: -4%; }
          .cookie-float--two { top: 16%; right: -2%; }
          .cookie-float--three { bottom: 8%; left: -8%; }
          .cookie-float--four { bottom: 16%; right: 2%; }

          .cookie-card__body,
          .seller-card__body,
          .review-card {
            padding: 18px;
          }

          .section__title {
            white-space: normal;
            font-size: clamp(1.4rem, 5vw, 1.9rem);
          }

          .reviews-page {
            grid-template-columns: 1fr;
          }

          .review-card__quote {
            font-size: clamp(1.25rem, 5vw, 1.7rem);
          }

          .toast {
            display: block;
            left: 10px;
            right: 10px;
            bottom: 10px;
            max-width: none;
          }
        }
      `}</style>

      <div className="page-noise" />

      <div className="layout">
        <header className="topbar">
          <div className="topbar__inner container" style={{ width: "100%" }}>
            <button
              className="brand"
              onClick={() => scrollToId("home")}
              aria-label="Tastee's Cookies home"
              style={{ cursor: "pointer", background: "none", border: 0, padding: 0 }}
            >
              <span className="brand__mark" aria-hidden="true" style={{ background: "none", boxShadow: "none", overflow: "hidden", padding: 0 }}>
                <img src="/images/tastees-logo.jpg" alt="Tastee's Cookies logo" style={{ width: "42px", height: "42px", objectFit: "contain", borderRadius: "10px" }} />
              </span>
              <span className="brand__copy">
                <span className="brand__name" style={{ fontFamily: "'Courgette', cursive", background: "linear-gradient(120deg, #6b1fa8, #d63a7a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Tastee's Cookies</span>
                <span className="brand__tag">Freshly baked happiness</span>
              </span>
            </button>

            <nav className="nav-links" aria-label="Primary">
              {navLinks.map((link) => (
                <button key={link.id} onClick={() => scrollToId(link.id)}>
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="nav-actions">
              <button className="nav-chip" onClick={handleCheckout}>
                <span className="nav-chip__count">{cartCount}</span>
                Order in progress
              </button>
              <button className="button button--primary" onClick={handleCheckout} style={{ padding: "10px 22px", fontSize: "0.85rem" }}>
                Order Now
              </button>
              <button
                className="menu-toggle"
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                onClick={() => setMobileOpen((value) => !value)}
              >
                <span className="visually-hidden">Toggle menu</span>
                {mobileOpen ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 7h16M4 12h16M4 17h16" />
                  </svg>
                )}
              </button>
            </div>

          </div>

          <div className="mobile-nav" id="mobile-nav">
            <div className="mobile-nav__links">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setMobileOpen(false);
                    scrollToId(link.id);
                  }}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleCheckout();
                }}
              >
                Order Now
              </button>
            </div>
          </div>
        </header>

        <main>
          <section className="hero" id="home">
            <div className="container hero__grid">
              <div data-reveal className="reveal" style={{ transitionDelay: "60ms" }}>
                <p className="eyebrow">Luxury dessert experience</p>
                <h1 className="hero__title">
                  <span>Freshly Baked Happiness</span>
                </h1>
                <p className="hero__copy">
                  Handcrafted cookies baked in small batches with velvet chocolate, buttery caramel, and warm vanilla notes.
                  Tastee's Cookies turns everyday cravings into a luxurious ritual.
                </p>
                <div className="hero__actions">
                  <button className="button button--primary" onClick={handleCheckout}>
                    Order Now
                    <span aria-hidden="true">→</span>
                  </button>
                  <button className="button button--ghost" onClick={() => scrollToId("menu")}>
                    Explore Menu
                    <span aria-hidden="true">↘</span>
                  </button>
                </div>

              </div>

              <div className="hero__visual">
                <div className="hero__halo" />
                <div className="hero__plate">
                  <img src="/images/tastees-logo.jpg" alt="Tastee's Cookies Logo" style={{ objectFit: "contain", background: "transparent" }} />
                </div>
                <span className="cookie-float cookie-float--one" />
                <span className="cookie-float cookie-float--two" />
                <span className="cookie-float cookie-float--three" />
                <span className="cookie-float cookie-float--four" />
              </div>
            </div>
          </section>

          <section className="section" id="menu">
            <div className="container">
              <div className="section__head reveal" data-reveal>
                <p className="eyebrow">Featured cookies</p>
                <h2 className="section__title">Signature flavors, packed with personality.</h2>
                <p className="section__text">
                  A curated menu of indulgent cookies built for gifting, sharing, and late-night cravings that deserve something special.
                </p>
              </div>

              <div className="featured-grid">
                {featuredCookies.map((cookie, index) => (
                  <article
                    key={cookie.name}
                    className="cookie-card reveal"
                    data-reveal
                    style={{ transitionDelay: `${index * 70}ms` }}
                  >
                    <div className="cookie-card__image">
                      <img src={cookie.image} alt={cookie.name} style={{ position: "relative" }} />
                    </div>
                    <div className="cookie-card__body">
                      <div className="cookie-card__top">
                        <h3 className="cookie-card__name">{cookie.name}</h3>
                        <span className="cookie-card__price">{cookie.price}</span>
                      </div>
                      <p className="cookie-card__desc">{cookie.description}</p>
                      <div className="cookie-card__footer">
                        <div className="qty-stepper">
                          <button className="qty-btn" onClick={() => changeQty(cookie.name, -1)} aria-label="Decrease quantity">−</button>
                          <span className="qty-value">{getQty(cookie.name)}</span>
                          <button className="qty-btn" onClick={() => changeQty(cookie.name, 1)} aria-label="Increase quantity">+</button>
                        </div>
                        <button
                          className="cookie-card__action"
                          onClick={() => handleAddToCart(cookie.name, getQty(cookie.name))}
                          disabled={addingToCart === cookie.name}
                        >
                          {addingToCart === cookie.name ? "Adding..." : "Add to cart"}
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14" />
                            <path d="M12 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="section" id="best-sellers">
            <div className="container">
              <div className="section__head-row reveal" data-reveal>
                <div className="section__head" style={{ marginBottom: 0 }}>
                  <p className="eyebrow">Best sellers</p>
                  <h2 className="section__title">The flavors people come back for again and again.</h2>
                  <p className="section__text">
                    A premium carousel of customer favorites, limited drops, and gifting staples with the kind of polish that sells itself.
                  </p>
                </div>
                <div className="carousel__controls">
                  <button className="carousel__button" onClick={() => scrollBestSellers("left")} aria-label="Scroll best sellers left">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button className="carousel__button" onClick={() => scrollBestSellers("right")} aria-label="Scroll best sellers right">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="carousel reveal" data-reveal>
                <div className="carousel__track" ref={bestSellerTrackRef}>
                  {sellers.map((seller) => (
                    <article key={seller.name} className="seller-card">
                      <div className="seller-card__image">
                        <img src={seller.image} alt={seller.name} />
                      </div>
                      <div className="seller-card__body">
                        <div className="seller-card__meta">
                          <span className="seller-card__label">{seller.label}</span>
                          <span className="seller-card__rating">
                            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            {seller.rating}
                          </span>
                        </div>
                        <h3 className="seller-card__name">{seller.name}</h3>
                        <p className="seller-card__desc">{seller.description}</p>
                        <div className="seller-card__footer">
                          <strong className="seller-card__price">{seller.price}</strong>
                          <button className="button button--soft" onClick={() => handleAddToCart(seller.name)}>
                            Add favorite
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="section" id="why-us">
            <div className="container">
              <div className="section__head reveal" data-reveal>
                <p className="eyebrow">Why choose us</p>
                <h2 className="section__title">Precision baking with premium hospitality built in.</h2>
                <p className="section__text">
                  Every touchpoint is designed to feel reassuring, elevated, and easy to buy from, because luxury should also convert.
                </p>
              </div>

              <div className="benefit-grid">
                {benefits.map((benefit, index) => (
                  <article key={benefit.title} className="benefit-card reveal" data-reveal style={{ transitionDelay: `${index * 55}ms` }}>
                    <span className="benefit-card__icon" aria-hidden="true">
                      {renderBenefitIcon(benefit.icon)}
                    </span>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="section" id="reviews">
            <div className="container reviews-wrap">
              <div className="section__head reveal" data-reveal>
                <p className="eyebrow">Testimonials</p>
                <h2 className="section__title">Loved by families, events, and very picky cookie people.</h2>
                <p className="section__text">
                  Smooth sliding reviews, polished avatars, and a warm social-proof section that keeps the brand feeling aspirational and human.
                </p>
              </div>

              <div className="reviews-slider reveal" data-reveal>
                <div
                  className="reviews-track"
                  style={{ transform: `translateX(-${activeReview * 100}%)` }}
                >
                  {[0, 1].map((page) => (
                    <div key={page} className="reviews-page">
                      {testimonials.slice(page * 3, page * 3 + 3).map((testimonial) => (
                        <article key={testimonial.name} className="review-card">
                          <div className="review-card__header">
                            <div className="review-stars" aria-label="5 star rating">
                              {stars.map((_, index) => (
                                <svg key={index} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <p className="review-card__quote">❝ {testimonial.quote}</p>
                          <div className="review-card__person">
                            <div className="review-card__avatar">{testimonial.initials}</div>
                            <div>
                              <p className="review-card__name">{testimonial.name}</p>
                              <span className="review-card__role">{testimonial.role}</span>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="review-controls">
                <div className="review-dots" role="tablist" aria-label="Select review page">
                  {[0, 1].map((page) => (
                    <button
                      key={page}
                      className="review-dot"
                      aria-label={`Show reviews page ${page + 1}`}
                      aria-current={activeReview === page}
                      onClick={() => jumpToReview(page)}
                    />
                  ))}
                </div>
                <button className="button button--ghost" onClick={() => jumpToReview((activeReview + 1) % 2)}>
                  Next reviews
                </button>
              </div>
            </div>
          </section>

          <section className="section" id="gallery">
            <div className="container">
              <div className="section__head reveal" data-reveal>
                <p className="eyebrow">Gallery</p>
                <h2 className="section__title">A gorgeous spread with a warm, artisan finish.</h2>
                <p className="section__text">
                  Tap any image for a lightbox view. The masonry layout keeps the visual rhythm varied, modern, and food-forward.
                </p>
              </div>

              <div className="gallery-grid">
                {gallery.map((item, index) => (
                  <button
                    key={item.src}
                    className={`gallery-item reveal gallery-item--${item.span ?? "square"}`}
                    data-reveal
                    style={{ transitionDelay: `${index * 60}ms` }}
                    onClick={() => setLightboxIndex(index)}
                    aria-label={`Open gallery image: ${item.alt}`}
                  >
                    <img src={item.src} alt={item.alt} />
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="section" id="order">
            <div className="container">
              <div className="cta-panel reveal" data-reveal>
                <div className="cta-panel__grid">
                  <div>
                    <p className="eyebrow" style={{ color: "rgba(255,255,255,0.84)" }}>
                      Ready for your first bite?
                    </p>
                    <h2>Freshly baked cookies delivered warm, wrapped beautifully, and remembered forever.</h2>
                    <p>
                      Order today for same-day dispatch where available, seasonal boxes for gifting, and a newsletter that unlocks early access to new flavors.
                    </p>
                    <div className="cta-panel__actions">
                      <button className="button button--primary" onClick={() => scrollToId("menu")}>
                        Shop Best Sellers
                      </button>
                      <button className="button button--ghost" onClick={() => scrollToId("gallery")}>
                        View Gallery
                      </button>
                    </div>
                  </div>

                  <aside className="cta-panel__aside">
                    <div>
                      <h3>Delivery</h3>
                      <p>Freshly packed with premium insulation and elegant presentation, ready for local delivery or pickup.</p>
                    </div>

                    <div>
                      <h3>Special offer</h3>
                      <p>Subscribe for early access to limited edition drops, gifting bundles, and private tasting events.</p>
                    </div>

                    <form
                      className="newsletter"
                      onSubmit={(event) => {
                        event.preventDefault();
                        setToast("You are on the Tastee's Cookies list.");
                      }}
                    >
                      <label className="visually-hidden" htmlFor="email">
                        Email address
                      </label>
                      <input id="email" type="email" placeholder="Email address" required />
                      <button className="button button--soft" type="submit">
                        Join newsletter
                      </button>
                    </form>
                  </aside>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="container footer__panel">
            <div className="footer__grid">
              <div>
                <div className="brand" style={{ marginBottom: 18 }}>
                  <span className="brand__mark" aria-hidden="true" style={{ background: "none", boxShadow: "none", overflow: "hidden", padding: 0 }}>
                    <img src="/images/tastees-logo.jpg" alt="Tastee's Cookies logo" style={{ width: "42px", height: "42px", objectFit: "contain", borderRadius: "10px" }} />
                  </span>
                  <span className="brand__copy">
                    <span className="brand__name" style={{ fontFamily: "'Courgette', cursive", background: "linear-gradient(120deg, #6b1fa8, #d63a7a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Tastee's Cookies</span>
                    <span className="brand__tag">Freshly baked happiness</span>
                  </span>
                </div>
                <p>
                  Real cookies, baked with love and delivered with a smile — made for every sweet moment.
                </p>
                <div className="footer__socials" aria-label="Social links">
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="4" width="16" height="16" rx="5" />
                      <path d="M9 12a3 3 0 116 0 3 3 0 01-6 0z" />
                      <path d="M17.5 6.5h.01" />
                    </svg>
                  </a>
                  <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 3v10.2a4.4 4.4 0 11-4-4.36" />
                      <path d="M14 3c.5 2.5 2.2 4.1 5 4.1" />
                    </svg>
                  </a>
                  <a href="https://pinterest.com" target="_blank" rel="noreferrer" aria-label="Pinterest">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22a10 10 0 10-2.6-19.65c-2.46.85-3.7 2.55-3.7 5.04 0 1.47.63 2.76 1.73 3.46.27.17.58.03.66-.25.06-.2.21-.69.28-.95.08-.28.05-.39-.15-.62-.44-.52-.7-1.2-.7-2 0-2.43 1.88-4.6 4.9-4.6 2.67 0 4.35 1.63 4.35 3.96 0 2.98-1.32 5.5-3.28 5.5-.93 0-1.63-.77-1.4-1.72.26-1.08.76-2.25.76-3.03 0-.7-.38-1.28-1.16-1.28-.92 0-1.66.95-1.66 2.22 0 .81.27 1.36.27 1.36l-1.1 4.64c-.33 1.35-.08 3.01-.04 3.18" />
                    </svg>
                  </a>
                </div>
              </div>

              <div>
                <h4>Navigate</h4>
                <ul>
                  {navLinks.map((link) => (
                    <li key={link.id}>
                      <button
                        onClick={() => scrollToId(link.id)}
                        style={{
                          padding: 0,
                          border: 0,
                          background: "none",
                          color: "inherit",
                          cursor: "pointer",
                        }}
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4>Contact</h4>
                <ul>
                  <li>hello@tasteescookies.com</li>
                  <li>+1 (240) 877 - 8752</li>
                  <li>Texas, United States</li>
                </ul>
              </div>

              <div>
                <h4>Opening hours</h4>
                <ul>
                  <li>Mon - Fri: 8:00 AM - 8:00 PM</li>
                  <li>Saturday: 9:00 AM - 9:00 PM</li>
                  <li>Sunday: 9:00 AM - 6:00 PM</li>
                </ul>
              </div>
            </div>

            <div className="footer__bottom">
              <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} Tastee's Cookies. All rights reserved.</p>
              <p style={{ margin: 0 }}>Freshly baked cookies for gifting, gatherings, and pure joy.</p>
            </div>
          </div>
        </footer>
      </div>

      {toast ? (
        <div className="toast" role="status" aria-live="polite">
          <strong>Tastee's Cookies</strong>
          {toast}
        </div>
      ) : null}

      {lightboxItem ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={lightboxItem.alt} onClick={() => setLightboxIndex(null)}>
          <div className="lightbox__panel" onClick={(event) => event.stopPropagation()}>
            <img className="lightbox__image" src={lightboxItem.src} alt={lightboxItem.alt} />
            <div className="lightbox__caption">
              <span>{lightboxItem.alt}</span>
              <button aria-label="Close lightbox" onClick={() => setLightboxIndex(null)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <button
              className="lightbox__nav lightbox__nav--prev"
              aria-label="Previous image"
              onClick={() => setLightboxIndex((current) => ((current ?? 0) - 1 + gallery.length) % gallery.length)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              className="lightbox__nav lightbox__nav--next"
              aria-label="Next image"
              onClick={() => setLightboxIndex((current) => ((current ?? 0) + 1) % gallery.length)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}