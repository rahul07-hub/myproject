import { useState, useEffect } from 'react';
import './App.css';

/* ==================================================================
   IMAGE HELPER — build Unsplash CDN URLs from photo IDs
   ================================================================== */
const U = (id) => `https://images.unsplash.com/photo-${id}?w=400&h=400&fit=crop&auto=format&q=80`;

/* ==================================================================
   STATIC FALLBACK CATEGORIES DATA
   ================================================================== */
const CATEGORY_DATA = [
  { name: "Electronics",     icon: "📱", tagline: "Gadgets & Tech",       heroImg: U("1519389950473-47ba0277781c") },
  { name: "Mobiles",         icon: "📞", tagline: "Smartphones & More",    heroImg: U("1511707171634-5f897ff02aa9") },
  { name: "Laptops",         icon: "💻", tagline: "Computers & Gear",      heroImg: U("1588872657578-7efd1f1555ed") },
  { name: "Smart Watches",   icon: "⌚", tagline: "Wrist Wearables",      heroImg: U("1508685096489-7aacd43bd3b1") },
  { name: "Headphones",      icon: "🎧", tagline: "Audio & Music",        heroImg: U("1505740420928-5e560c06d30e") },
  { name: "Fashion",         icon: "👗", tagline: "Trending Styles",      heroImg: U("1483985988355-763728e1935b") },
  { name: "Men's Clothing",  icon: "👔", tagline: "Men's Apparel",        heroImg: U("1617137968427-85924c800a22") },
  { name: "Women's Clothing",icon: "👚", tagline: "Women's Style",        heroImg: U("1525507119028-ed4c629a60a3") },
  { name: "Kids Wear",       icon: "👶", tagline: "Kids Outfits",          heroImg: U("1622290319048-705756507022") },
  { name: "Sarees",          icon: "🧣", tagline: "Traditional Sarees",   heroImg: U("1610030469983-98e550d6193c") },
  { name: "Kurtas",          icon: "🥋", tagline: "Ethnic Kurtas",        heroImg: U("1617627143767-d8e21194783b") },
  { name: "Shoes",           icon: "👟", tagline: "Branded Footwear",      heroImg: U("1542291026-7eec264c27ff") },
  { name: "Bags",            icon: "🎒", tagline: "Backpacks & Bags",      heroImg: U("1553062407-98eeb64c6a62") },
  { name: "Cosmetics",       icon: "💄", tagline: "Cosmetics & Makeup",   heroImg: U("1596462502278-27bfdc403348") },
  { name: "Beauty",          icon: "💅", tagline: "Beauty & Grooming",    heroImg: U("1522337360788-8b13df793f1a") },
  { name: "Skin Care",       icon: "🧴", tagline: "Skincare Essentials",  heroImg: U("1608248597279-f99d160b2109") },
  { name: "Home Appliances", icon: "📺", tagline: "Appliances & TV",      heroImg: U("1584622650111-993a426fbf0a") },
  { name: "Kitchen",         icon: "🍳", tagline: "Kitchen & Cookware",    heroImg: U("1556910103-1c02745aae4d") },
  { name: "Grocery",         icon: "🍎", tagline: "Daily Groceries",      heroImg: U("1542838132-92c53300491e") },
  { name: "Sports",          icon: "⚽", tagline: "Active Sports Gear",   heroImg: U("1518609878373-06d740f60d8b") },
  { name: "Books",           icon: "📚", tagline: "Novels & Self-Help",   heroImg: U("1507842217343-583bb7270b66") },
  { name: "Toys",            icon: "🧸", tagline: "Toys & Games",         heroImg: U("1558060370-d644479cb3f0") },
  { name: "Furniture",       icon: "🪑", tagline: "Home & Office Decor",  heroImg: U("1524758631624-e2822e304c36") },
  { name: "Accessories",     icon: "🕶️", tagline: "Style Accessories",    heroImg: U("1572635196237-14b3f281503f") }
];

/* ==================================================================
   CATEGORY IMAGE MAPPING — exact & normalized key lookup
   Keys: toLowerCase() with spaces, hyphens & apostrophes removed
   ================================================================== */
const categoryImages = {
  // ── Electronics & Tech ──────────────────────────────────────────
  smartphones:          { icon: "📱", tagline: "Smartphones & Accessories",  heroImg: U("1511707171634-5f897ff02aa9") },
  mobileaccessories:    { icon: "📱", tagline: "Mobile Accessories",          heroImg: U("1583394838336-acd977736f90") },
  laptops:              { icon: "💻", tagline: "Laptops & Computers",          heroImg: U("1588872657578-7efd1f1555ed") },
  tablets:              { icon: "📟", tagline: "Tablets & iPads",              heroImg: U("1561154464-02ce5d7f3fba") },
  // ── Watches ─────────────────────────────────────────────────────
  menswatches:          { icon: "⌚", tagline: "Men's Watches",                heroImg: U("1523275335684-37898b6baf30") },
  womenswatches:        { icon: "⌚", tagline: "Women's Watches",              heroImg: U("1509048191080-d2984bad6ae5") },
  // ── Clothing ────────────────────────────────────────────────────
  mensshirts:           { icon: "👔", tagline: "Men's Shirts & Tops",          heroImg: U("1617137968427-85924c800a22") },
  tops:                 { icon: "👚", tagline: "Women's Tops",                  heroImg: U("1525507119028-ed4c629a60a3") },
  womensdresses:        { icon: "👗", tagline: "Women's Dresses",               heroImg: U("1496747611176-843222e1e57c") },
  // ── Shoes ───────────────────────────────────────────────────────
  mensshoes:            { icon: "👟", tagline: "Men's Shoes & Sneakers",        heroImg: U("1542291026-7eec264c27ff") },
  womensshoes:          { icon: "👠", tagline: "Women's Shoes & Heels",         heroImg: U("1543163521-1bf539c55dd2") },
  // ── Beauty & Care ───────────────────────────────────────────────
  beauty:               { icon: "💅", tagline: "Beauty & Grooming",             heroImg: U("1522337360788-8b13df793f1a") },
  skincare:             { icon: "🧴", tagline: "Skincare Essentials",           heroImg: U("1608248597279-f99d160b2109") },
  fragrances:           { icon: "🌸", tagline: "Perfumes & Fragrances",         heroImg: U("1541643600914-78b084683702") },
  sunglasses:           { icon: "🕶️", tagline: "Sunglasses & Eyewear",         heroImg: U("1572635196237-14b3f281503f") },
  // ── Home & Kitchen ──────────────────────────────────────────────
  kitchenaccessories:   { icon: "🍳", tagline: "Kitchen Accessories",           heroImg: U("1556910103-1c02745aae4d") },
  furniture:            { icon: "🪑", tagline: "Furniture & Seating",           heroImg: U("1555041469-a58634b3a175") },
  homedecoration:       { icon: "🏡", tagline: "Home Decoration",               heroImg: U("1586023492125-27b2c045efd7") },
  lighting:             { icon: "💡", tagline: "Lighting & Lamps",              heroImg: U("1513506003901-1e6a22fa6fc0") },
  // ── Groceries ───────────────────────────────────────────────────
  groceries:            { icon: "🍎", tagline: "Daily Groceries",               heroImg: U("1542838132-92c53300491e") },
  // ── Sports ──────────────────────────────────────────────────────
  sportsaccessories:    { icon: "⚽", tagline: "Sports Accessories",            heroImg: U("1518609878373-06d740f60d8b") },
  // ── Vehicles ────────────────────────────────────────────────────
  motorcycle:           { icon: "🏍️", tagline: "Motorcycles & Gear",            heroImg: U("1558618666-fcd25c85cd64") },
  vehicle:              { icon: "🚗", tagline: "Vehicles & Accessories",         heroImg: U("1550355291-bbee04a92027") },
};

/* Default fallback for unrecognised categories */
const DEFAULT_CATEGORY_META = {
  icon: "🛍️",
  tagline: "Premium Selection",
  heroImg: U("1483985988355-763728e1935b"),
};

/**
 * Returns icon, tagline, heroImg for any API category name.
 * Normalisation: toLowerCase() then strip all spaces, hyphens, apostrophes.
 */
const getCategoryMetadata = (catName) => {
  if (!catName) return DEFAULT_CATEGORY_META;
  // Normalize: lower-case, remove spaces / hyphens / apostrophes
  const key = catName.toLowerCase().replace(/[\s\-']+/g, "");
  return categoryImages[key] ?? DEFAULT_CATEGORY_META;
};


/* ==================================================================
   SMART SEARCH PARSING LOGIC
   ================================================================== */
function parseSearchQuery(query) {
  let parsed = {
    text: '',
    brand: null,
    category: null,
    maxPrice: null,
    minPrice: null,
    minRating: null,
    color: null,
    size: null,
    isBestSeller: false,
    isTrending: false,
    isNewArrival: false,
    sort: null,
  };

  if (!query) return parsed;

  let q = query.toLowerCase().trim();

  // 1. Price Range matching
  const underMatch = q.match(/(?:under|below|less than)\s*₹?\s*(\d+)/i);
  if (underMatch) {
    parsed.maxPrice = parseFloat(underMatch[1]);
    q = q.replace(/(?:under|below|less than)\s*₹?\s*\d+/gi, '');
  }

  const aboveMatch = q.match(/(?:above|over|more than)\s*₹?\s*(\d+)/i);
  if (aboveMatch) {
    parsed.minPrice = parseFloat(aboveMatch[1]);
    q = q.replace(/(?:above|over|more than)\s*₹?\s*\d+/gi, '');
  }

  // 2. Rating matching
  const ratingMatch = q.match(/(?:rating\s+)?(?:above|over|>)\s*(\d+(?:\.\d+)?)/i);
  if (ratingMatch) {
    parsed.minRating = parseFloat(ratingMatch[1]);
    q = q.replace(/(?:rating\s+)?(?:above|over|>)\s*\d+(?:\.\d+)?/gi, '');
  }

  // 3. Tags matching
  if (q.includes("best seller") || q.includes("bestseller")) {
    parsed.isBestSeller = true;
    q = q.replace(/best\s*seller/gi, '');
  }
  if (q.includes("trending")) {
    parsed.isTrending = true;
    q = q.replace(/trending/gi, '');
  }
  if (q.includes("new arrival") || q.includes("newest")) {
    parsed.isNewArrival = true;
    q = q.replace(/new\s*arrival|newest/gi, '');
  }

  // Sort matchers
  if (q.includes("cheapest") || q.includes("cheap")) {
    parsed.sort = 'priceLow';
    q = q.replace(/cheapest|cheap/gi, '');
  } else if (q.includes("premium") || q.includes("expensive")) {
    parsed.sort = 'priceHigh';
    q = q.replace(/premium|expensive/gi, '');
  } else if (q.includes("best") || q.includes("highest rated") || q.includes("top rated")) {
    parsed.sort = 'rating';
    q = q.replace(/best|highest\s*rated|top\s*rated/gi, '');
  }

  // 4. Color matching
  const colors = ["black", "white", "red", "blue", "green", "pink", "gold", "silver", "yellow", "orange", "grey", "gray", "purple", "brown", "tan", "beige"];
  for (const c of colors) {
    const reg = new RegExp(`\\b${c}\\b`, 'i');
    if (reg.test(q)) {
      parsed.color = c;
      q = q.replace(reg, '');
      break;
    }
  }

  // 5. Category keywords mapping
  const categoriesList = [
    { key: "electronics", name: "Electronics" },
    { key: "mobiles", name: "Smartphones" },
    { key: "mobile", name: "Smartphones" },
    { key: "phone", name: "Smartphones" },
    { key: "smartphones", name: "Smartphones" },
    { key: "laptops", name: "Laptops" },
    { key: "laptop", name: "Laptops" },
    { key: "tablets", name: "Tablets" },
    { key: "smart watches", name: "Womens watches" },
    { key: "watch", name: "Womens watches" },
    { key: "headphones", name: "Mobile accessories" },
    { key: "headphone", name: "Mobile accessories" },
    { key: "earbuds", name: "Mobile accessories" },
    { key: "perfume", name: "Fragrances" },
    { key: "fragrance", name: "Fragrances" },
    { key: "dress", name: "Womens dresses" },
    { key: "clothing", name: "Men's clothing" },
    { key: "shoes", name: "Mens shoes" },
    { key: "shoe", name: "Mens shoes" },
    { key: "sneakers", name: "Mens shoes" },
    { key: "bags", name: "Womens bags" },
    { key: "bag", name: "Womens bags" },
    { key: "backpack", name: "Womens bags" },
    { key: "cosmetics", name: "Beauty" },
    { key: "lipstick", name: "Beauty" },
    { key: "makeup", name: "Beauty" },
    { key: "appliances", name: "Kitchen accessories" },
    { key: "kitchen", name: "Kitchen accessories" },
    { key: "grocery", name: "Groceries" },
    { key: "sports", name: "Sports accessories" },
    { key: "furniture", name: "Furniture" }
  ];

  for (const cat of categoriesList) {
    const reg = new RegExp(`\\b${cat.key}\\b`, 'i');
    if (reg.test(q)) {
      parsed.category = cat.name;
      q = q.replace(reg, '');
      break;
    }
  }

  // 6. Brands mapping
  const brandsList = ["apple", "samsung", "huawei", "oppo", "canon", "nike", "puma", "adidas", "gucci", "l'oréal", "loreal", "mac", "ikea", "dell", "hp", "lenovo", "asus"];
  for (const b of brandsList) {
    const reg = new RegExp(`\\b${b}\\b`, 'i');
    if (reg.test(q)) {
      parsed.brand = b;
      q = q.replace(reg, '');
      break;
    }
  }

  parsed.text = q.trim().replace(/\s+/g, ' ');
  return parsed;
}

/* ==================================================================
   MAIN APPLICATION
   ================================================================== */
function App() {
  const [page, setPage]         = useState('home');
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [category, setCat]      = useState('All');
  
  // Advanced filters explicit states
  const [sortBy, setSort]       = useState('relevance');
  const [ratingFilter, setRatingFilter] = useState('All Ratings');
  const [priceFilter, setPriceFilter] = useState('All Prices');
  const [stockFilter, setStockFilter] = useState('All Products');
  const [brandFilter, setBrandFilter] = useState('All Brands');
  const [discountFilter, setDiscountFilter] = useState('All Discounts');
  const [colorFilter, setColorFilter] = useState('All Colors');
  const [sizeFilter, setSizeFilter] = useState('All Sizes');
  const [tagFilter, setTagFilter] = useState('All Tags');
  
  // UI states
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(20);
  const [cart, setCart]          = useState([]);
  const [wishlist, setWish]     = useState([]);
  const [detail, setDetail]     = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishOpen, setWishOpen] = useState(false);
  const [toast, setToast]       = useState(null);
  const [admin, setAdmin]       = useState(false);
  const [adding, setAdding]     = useState(false);
  const [editing, setEditing]   = useState(null);

  // Fetch from APIs with dynamic caching
  useEffect(() => {
    async function loadProducts() {
      const CACHE_KEY = 'nexastore_api_products_v1';
      // 1. Check local storage cache
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const cachedData = JSON.parse(cached);
          if (cachedData && cachedData.length > 0) {
            setProducts(cachedData);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.error("Failed to parse cached products database:", e);
        }
      }

      // 2. Fetch from Real APIs
      try {
        const [dummyRes, fakeRes] = await Promise.all([
          fetch('https://dummyjson.com/products?limit=0'),
          fetch('https://fakestoreapi.com/products')
        ]);

        const dummyData = await dummyRes.json();
        const fakeData = await fakeRes.json();

        // Map DummyJSON Products
        const mappedDummy = (dummyData.products || []).map(p => {
          const price = Math.round(p.price * 83);
          const discount = Math.round(p.discountPercentage || 10);
          const mrp = Math.round(price / (1 - discount / 100));
          return {
            id: `dj_${p.id}`,
            name: p.title,
            brand: p.brand || 'Generic',
            category: (p.category || 'Other').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            price,
            mrp,
            discount,
            stock: p.stock || 0,
            rating: p.rating || 4.0,
            reviews: p.reviews?.length || Math.floor(Math.random() * 500) + 50,
            image: p.thumbnail || (p.images && p.images[0]) || '',
            description: p.description,
            longDescription: p.description,
            color: 'Standard',
            size: 'Standard',
            isBestSeller: p.rating > 4.6,
            isNewArrival: p.meta?.createdAt ? new Date(p.meta.createdAt).getFullYear() === 2024 : false,
            isTrending: discount > 15,
            tag: p.rating > 4.8 ? 'Top Rated' : '',
            keywords: `${p.title.toLowerCase()} ${p.category.toLowerCase()}`
          };
        });

        // Map FakeStore Products
        const mappedFake = fakeData.map(p => {
          const price = Math.round(p.price * 83);
          const discount = 20; // assumed 20% discount
          const mrp = Math.round(price / (1 - discount / 100));
          return {
            id: `fs_${p.id}`,
            name: p.title,
            brand: 'Generic',
            category: (p.category || 'Other').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            price,
            mrp,
            discount,
            stock: Math.floor(Math.random() * 100) + 10,
            rating: p.rating?.rate || 4.0,
            reviews: p.rating?.count || 120,
            image: p.image,
            description: p.description.length > 100 ? p.description.substring(0, 100) + '...' : p.description,
            longDescription: p.description,
            color: 'Standard',
            size: 'Standard',
            isBestSeller: (p.rating?.rate || 0) > 4.5,
            isNewArrival: false,
            isTrending: (p.rating?.count || 0) > 300,
            tag: '',
            keywords: `${p.title.toLowerCase()} ${p.category.toLowerCase()}`
          };
        });

        const unifiedProducts = [...mappedDummy, ...mappedFake];
        // Shuffle slightly so UI isn't always identical categories grouped
        unifiedProducts.sort(() => Math.random() - 0.5);

        setProducts(unifiedProducts);
        localStorage.setItem(CACHE_KEY, JSON.stringify(unifiedProducts));
        setLoading(false);
      } catch (err) {
        console.error("API Fetch Error:", err);
        setToast("⚠️ Failed to load products from API!");
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // Toast auto-clear
  useEffect(() => { 
    if (toast) { 
      const t = setTimeout(() => setToast(null), 2500); 
      return () => clearTimeout(t); 
    } 
  }, [toast]);

  // Infinite Scroll Listener (Loads 20 products initially)
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 300) {
        setVisibleCount(prev => prev + 20);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(20);
  }, [category, search, sortBy, ratingFilter, priceFilter, stockFilter, brandFilter, discountFilter, colorFilter, sizeFilter, tagFilter]);

  const goCategory = (c) => { 
    setCat(c); 
    setPage('catalog'); 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

  // CRUD actions
  const deleteProduct = (id) => {
    const p = products.find(x => x.id === id);
    const updated = products.filter(x => x.id !== id);
    setProducts(updated);
    localStorage.setItem('nexastore_api_products_v1', JSON.stringify(updated));
    setCart(prev => prev.filter(x => x.id !== id));
    setWish(prev => prev.filter(x => x !== id));
    if (p) setToast(`🗑️ Deleted "${p.name}"`);
  };

  const saveProduct = (f) => {
    if (!f.name || !f.price || !f.category) { setToast("⚠️ Fill required fields!"); return; }
    const price = parseFloat(f.price) || 0;
    const stock = parseInt(f.stock) || 0;
    const rating = parseFloat(f.rating) || 4.0;
    const mrp = parseFloat(f.mrp) || Math.round(price * 1.4);
    const disc = Math.round(((mrp - price) / mrp) * 100);
    const image = f.image.trim() || U("1483985988355-763728e1935b");
    
    let updated;
    if (f.id) {
      updated = products.map(p => p.id === f.id ? { 
        ...p, 
        name: f.name, 
        category: f.category, 
        price, 
        mrp, 
        discount: disc, 
        stock, 
        rating, 
        image, 
        description: f.description, 
        longDescription: f.longDescription 
      } : p);
      setToast(`📝 Updated "${f.name}"`);
      setEditing(null);
    } else {
      const newId = `custom_${Date.now()}`;
      const newProd = { 
        id: newId, 
        name: f.name, 
        brand: f.brand || "Generic",
        category: f.category, 
        price, 
        mrp, 
        discount: disc, 
        stock, 
        rating, 
        reviews: 1, 
        image, 
        description: f.description || `Premium ${f.name}`, 
        longDescription: f.longDescription || '',
        deliveryTime: "3-5 Days",
        isBestSeller: false,
        isNewArrival: true,
        isTrending: false,
        tag: "New Arrival",
        color: f.color || "Standard",
        size: f.size || "Standard",
        keywords: `${f.name.toLowerCase()} ${f.category.toLowerCase()}`
      };
      updated = [newProd, ...products];
      setToast(`✨ Added "${f.name}"`);
      setAdding(false);
    }
    setProducts(updated);
    localStorage.setItem('nexastore_api_products_v1', JSON.stringify(updated));
  };

  // CART handlers
  const addToCart = (p) => {
    if (p.stock <= 0) { setToast("⚠️ Out of stock!"); return; }
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id);
      if (ex && ex.quantity >= p.stock) { setToast(`⚠️ Only ${p.stock} left!`); return prev; }
      setToast("🛒 Added to cart!");
      if (ex) return prev.map(i => i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { id: p.id, quantity: 1 }];
    });
  };

  const updateQty = (id, d) => {
    const prod = products.find(p => p.id === id);
    if (!prod) return;
    setCart(prev => prev.map(i => {
      if (i.id !== id) return i;
      const nq = i.quantity + d;
      if (nq > prod.stock) { setToast(`⚠️ Max ${prod.stock}`); return i; }
      return { ...i, quantity: nq };
    }).filter(i => i.quantity > 0));
  };

  const removeCart = (id) => { setCart(prev => prev.filter(i => i.id !== id)); setToast("🗑️ Removed"); };
  
  const toggleWish = (id) => {
    setWish(prev => {
      if (prev.includes(id)) { setToast("🤍 Removed from Wishlist"); return prev.filter(x => x !== id); }
      setToast("💖 Wishlisted!"); return [...prev, id];
    });
  };

  const wishToCart = (p) => { 
    if (p.stock <= 0) { setToast("⚠️ Out of stock!"); return; } 
    addToCart(p); 
    setWish(prev => prev.filter(id => id !== p.id)); 
  };

  const handleReset = () => {
    if (window.confirm('Reset to dynamic API data default cache?')) {
      localStorage.removeItem('nexastore_api_products_v1');
      window.location.reload();
    }
  };

  // MULTI-FILTERING ALGORITHM
  const parsedSearch = parseSearchQuery(search);
  const activeCategory = category !== 'All' ? category : (parsedSearch.category || 'All');

  const filtered = products.filter(p => {
    // 1. Category filter
    const catOk = activeCategory === 'All' || p.category === activeCategory;

    // 2. Search Text natural query matching
    let sOk = true;
    if (parsedSearch.text) {
      const searchTerms = parsedSearch.text.toLowerCase().split(/\s+/).filter(Boolean);
      sOk = searchTerms.every(term => 
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term) ||
        p.keywords.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
      );
    }

    // 3. Natural query parsed attributes matching
    let natPriceOk = true;
    if (parsedSearch.maxPrice !== null) natPriceOk = natPriceOk && p.price <= parsedSearch.maxPrice;
    if (parsedSearch.minPrice !== null) natPriceOk = natPriceOk && p.price >= parsedSearch.minPrice;
    
    let natRatingOk = true;
    if (parsedSearch.minRating !== null) natRatingOk = natRatingOk && p.rating >= parsedSearch.minRating;

    let natBrandOk = true;
    if (parsedSearch.brand !== null) {
      natBrandOk = p.brand.toLowerCase() === parsedSearch.brand.toLowerCase();
    }

    let natColorOk = true;
    if (parsedSearch.color !== null) {
      natColorOk = p.color.toLowerCase() === parsedSearch.color.toLowerCase() || p.name.toLowerCase().includes(parsedSearch.color.toLowerCase());
    }

    let natTagsOk = true;
    if (parsedSearch.isBestSeller) natTagsOk = natTagsOk && p.isBestSeller;
    if (parsedSearch.isTrending) natTagsOk = natTagsOk && p.isTrending;
    if (parsedSearch.isNewArrival) natTagsOk = natTagsOk && p.isNewArrival;

    // 4. UI Dropdowns explicitly selected Filters
    let uiBrandOk = true;
    if (brandFilter !== 'All Brands') {
      uiBrandOk = p.brand === brandFilter;
    }

    let uiRatingOk = true;
    if (ratingFilter === '5 Stars Only') uiRatingOk = p.rating === 5;
    else if (ratingFilter === '4.5 Stars & Above') uiRatingOk = p.rating >= 4.5;
    else if (ratingFilter === '4 Stars & Above') uiRatingOk = p.rating >= 4;
    else if (ratingFilter === '3 Stars & Above') uiRatingOk = p.rating >= 3;

    let uiPriceOk = true;
    if (priceFilter === 'Under ₹500') uiPriceOk = p.price < 500;
    else if (priceFilter === '₹500–₹1000') uiPriceOk = p.price >= 500 && p.price <= 1000;
    else if (priceFilter === '₹1000–₹3000') uiPriceOk = p.price >= 1000 && p.price <= 3000;
    else if (priceFilter === '₹3000–₹5000') uiPriceOk = p.price >= 3000 && p.price <= 5000;
    else if (priceFilter === '₹5000–₹10000') uiPriceOk = p.price >= 5000 && p.price <= 10000;
    else if (priceFilter === '₹10000–₹20000') uiPriceOk = p.price >= 10000 && p.price <= 20000;
    else if (priceFilter === '₹20000–₹50000') uiPriceOk = p.price >= 20000 && p.price <= 50000;
    else if (priceFilter === 'Above ₹50000') uiPriceOk = p.price > 50000;

    let uiStockOk = true;
    if (stockFilter === 'In Stock') uiStockOk = p.stock > 0;
    else if (stockFilter === 'Out of Stock') uiStockOk = p.stock <= 0;

    let uiDiscountOk = true;
    if (discountFilter === '10% Off & Above') uiDiscountOk = p.discount >= 10;
    else if (discountFilter === '20% Off & Above') uiDiscountOk = p.discount >= 20;
    else if (discountFilter === '30% Off & Above') uiDiscountOk = p.discount >= 30;
    else if (discountFilter === '40% Off & Above') uiDiscountOk = p.discount >= 40;
    else if (discountFilter === '50% Off & Above') uiDiscountOk = p.discount >= 50;

    let uiColorOk = true;
    if (colorFilter !== 'All Colors') {
      uiColorOk = p.color && p.color.toLowerCase() === colorFilter.toLowerCase();
    }

    let uiSizeOk = true;
    if (sizeFilter !== 'All Sizes') {
      uiSizeOk = p.size === sizeFilter;
    }

    let uiTagsOk = true;
    if (tagFilter === 'Best Seller') uiTagsOk = p.isBestSeller;
    else if (tagFilter === 'New Arrival') uiTagsOk = p.isNewArrival;
    else if (tagFilter === 'Trending') uiTagsOk = p.isTrending;

    return catOk && sOk && natPriceOk && natRatingOk && natBrandOk && natColorOk && natTagsOk &&
           uiBrandOk && uiRatingOk && uiPriceOk && uiStockOk && uiDiscountOk && uiColorOk && uiSizeOk && uiTagsOk;
  });

  // SORTING ALGORITHM
  const activeSort = sortBy !== 'relevance' ? sortBy : (parsedSearch.sort || 'relevance');

  const sorted = [...filtered].sort((a, b) => {
    // Relevance name-matching order
    if (search) {
      const aNameMatch = a.name.toLowerCase().includes(search.toLowerCase());
      const bNameMatch = b.name.toLowerCase().includes(search.toLowerCase());
      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;
    }

    if (activeSort === 'priceLow')   return a.price - b.price;
    if (activeSort === 'priceHigh')  return b.price - a.price;
    if (activeSort === 'rating')     return b.rating - a.rating;
    if (activeSort === 'discount')   return b.discount - a.discount;
    if (activeSort === 'popularity') return (b.reviews * b.rating) - (a.reviews * a.rating);
    
    if (activeSort === 'bestSelling') {
      if (a.isBestSeller && !b.isBestSeller) return -1;
      if (!a.isBestSeller && b.isBestSeller) return 1;
      return b.reviews - a.reviews;
    }
    
    if (activeSort === 'newest') {
      if (a.isNewArrival && !b.isNewArrival) return -1;
      if (!a.isNewArrival && b.isNewArrival) return 1;
      return b.id - a.id;
    }
    
    if (activeSort === 'az') return a.name.localeCompare(b.name);
    if (activeSort === 'za') return b.name.localeCompare(a.name);
    
    return 0;
  });

  // Dynamic values parsed from loaded products
  const apiCategories = Array.from(new Set(products.map(p => p.category)))
    .map(name => {
      const meta = getCategoryMetadata(name);
      return { name, ...meta };
    }).sort((a,b) => a.name.localeCompare(b.name));

  const availableBrands = ['All Brands', ...new Set(products.map(p => p.brand))].sort();
  const availableColors = ['All Colors', ...new Set(products.map(p => p.color).filter(c => c && c !== "Standard"))].sort();
  const availableSizes = ['All Sizes', ...new Set(products.map(p => p.size).filter(s => s && s !== "Standard"))].sort();

  const activeFiltersCount = 
    (brandFilter !== 'All Brands' ? 1 : 0) +
    (ratingFilter !== 'All Ratings' ? 1 : 0) +
    (priceFilter !== 'All Prices' ? 1 : 0) +
    (stockFilter !== 'All Products' ? 1 : 0) +
    (discountFilter !== 'All Discounts' ? 1 : 0) +
    (colorFilter !== 'All Colors' ? 1 : 0) +
    (sizeFilter !== 'All Sizes' ? 1 : 0) +
    (tagFilter !== 'All Tags' ? 1 : 0);

  const clearAllFilters = () => {
    setCat('All');
    setSearch('');
    setSort('relevance');
    setRatingFilter('All Ratings');
    setPriceFilter('All Prices');
    setStockFilter('All Products');
    setBrandFilter('All Brands');
    setDiscountFilter('All Discounts');
    setColorFilter('All Colors');
    setSizeFilter('All Sizes');
    setTagFilter('All Tags');
  };

  // Cart totals math
  const totalItems = cart.reduce((t, i) => t + i.quantity, 0);
  const cartItems  = cart.map(i => { 
    const p = products.find(x => x.id === i.id); 
    return p ? { ...p, quantity: i.quantity, total: p.price * i.quantity } : null; 
  }).filter(Boolean);
  const subtotal   = cartItems.reduce((s, i) => s + i.total, 0);
  const shipping   = subtotal === 0 || subtotal > 500 ? 0 : 49;
  const tax        = Math.round(subtotal * 0.18);
  const grandTotal = subtotal + shipping + tax;

  return (
    <div className="fk-app">
      {/* TOAST SYSTEM */}
      {toast && <div className="fk-toast"><span>{toast}</span></div>}

      {/* ========== HEADER ========== */}
      <header className="fk-header">
        <div className="fk-header-inner">
          {/* Logo */}
          <div className="fk-logo" onClick={() => setPage('home')}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="fk-logo-text">
              <span className="fk-logo-name">Rahul Store</span>
              <span className="fk-logo-sub">Explore <em>Plus</em></span>
            </div>
          </div>

          {/* Search bar */}
          <div className="fk-search-bar">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2874f0" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search e.g. laptop under 50000, samsung, cosmetics..."
              value={search}
              onChange={e => { setSearch(e.target.value); if (page === 'home') setPage('catalog'); }}
              className="fk-search-input"
            />
          </div>

          {/* Action buttons */}
          <div className="fk-header-actions">
            {page === 'catalog' && (
              <button className="fk-header-btn" onClick={() => setPage('home')}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                Home
              </button>
            )}
            <button className={`fk-header-btn ${admin ? 'admin-active' : ''}`} onClick={() => setAdmin(v => !v)}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d={admin ? "M7 11V7a5 5 0 0 1 9.9-1" : "M7 11V7a5 5 0 0 1 10 0v4"}/>
              </svg>
              {admin ? 'Admin ✓' : 'Admin'}
            </button>
            <button className="fk-header-btn" onClick={() => setWishOpen(true)}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill={wishlist.length > 0 ? "#ff4757" : "none"} stroke={wishlist.length > 0 ? "#ff4757" : "currentColor"} strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              Wishlist
              {wishlist.length > 0 && <span className="fk-badge">{wishlist.length}</span>}
            </button>
            <button className="fk-header-btn fk-cart-btn" onClick={() => setCartOpen(true)}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              Cart
              {totalItems > 0 && <span className="fk-badge fk-badge-cart">{totalItems}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* ========== HOME PAGE ========== */}
      {page === 'home' && (
        <div className="fk-home">
          {/* Categories Horizontal Circles Strip */}
          <section className="fk-cat-strip">
            {(apiCategories.length > 0 ? apiCategories : CATEGORY_DATA).map(c => (
              <div key={c.name} className="fk-cat-circle" onClick={() => goCategory(c.name)}>
                <div className="fk-cat-img-wrap" style={{background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem'}}>
                  {c.icon}
                </div>
                <span className="fk-cat-label">{c.name}</span>
              </div>
            ))}
          </section>

          {/* Hero Banner */}
          <section className="fk-hero-banner">
            <div className="fk-hero-content">
              <div className="fk-hero-tag">🛍️ Live API Powered Store</div>
              <h1 className="fk-hero-title">Welcome to <span>Rahul Store</span></h1>
              <p className="fk-hero-sub">Explore unique real-time products fetched from multiple developer APIs. Completely responsive dynamic search, filters and sorting!</p>
              <div className="fk-hero-stats">
                <div className="fk-stat"><strong>{products.length}+</strong><span>Live Items</span></div>
                <div className="fk-stat"><strong>{apiCategories.length || 24}</strong><span>Categories</span></div>
                <div className="fk-stat"><strong>Cached</strong><span>Responses</span></div>
                <div className="fk-stat"><strong>Fast</strong><span>API Filtering</span></div>
              </div>
              <button className="fk-hero-cta" onClick={() => goCategory('All')}>
                Explore Catalog
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            </div>
            <div className="fk-hero-image-grid">
              <div className="fk-hero-img-card" onClick={() => goCategory('Accessories')}>
                <img src="/images/luxury_watch_1783429438199.png" alt="Luxury Watch" loading="lazy"/>
                <span>⌚ Premium Watches</span>
              </div>
              <div className="fk-hero-img-card" onClick={() => goCategory('Fragrances')}>
                <img src="/images/luxury_perfume_1783429451732.png" alt="Luxury Fragrances" loading="lazy"/>
                <span>🌸 Fragrances</span>
              </div>
              <div className="fk-hero-img-card" onClick={() => goCategory('Bags')}>
                <img src="/images/luxury_handbag_1783429463169.png" alt="Designer Bags" loading="lazy"/>
                <span>👜 Designer Bags</span>
              </div>
              <div className="fk-hero-img-card" onClick={() => goCategory('Electronics')}>
                <img src="/images/luxury_headphones_1783429474508.png" alt="Premium Audio" loading="lazy"/>
                <span>🎧 Premium Audio</span>
              </div>
            </div>
          </section>

          {/* Categories Cards Showcase */}
          <section className="fk-showcase">
            <h2 className="fk-section-title">Shop by Category</h2>
            <div className="fk-showcase-grid">
              {(apiCategories.length > 0 ? apiCategories : CATEGORY_DATA).map(c => (
                <div key={c.name} className="fk-showcase-card" onClick={() => goCategory(c.name)}>
                  <div className="fk-showcase-info" style={{padding: '24px', textAlign: 'center'}}>
                    <span className="fk-showcase-icon" style={{fontSize: '2rem', marginBottom: '10px', display: 'block'}}>{c.icon}</span>
                    <h3 style={{margin: '0', fontSize: '1.2rem'}}>{c.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Features strip */}
          <section className="fk-features">
            <div className="fk-feature"><span className="fk-feature-icon">🚚</span><div><strong>Free Delivery</strong><p>Orders above ₹500</p></div></div>
            <div className="fk-feature"><span className="fk-feature-icon">↩️</span><div><strong>7-Day Returns</strong><p>Easy return policy</p></div></div>
            <div className="fk-feature"><span className="fk-feature-icon">✅</span><div><strong>Genuine Products</strong><p>100% authentic</p></div></div>
            <div className="fk-feature"><span className="fk-feature-icon">🔒</span><div><strong>Secure Payments</strong><p>Safe & encrypted</p></div></div>
          </section>

          <footer className="fk-footer">
            <p>© 2026 <strong>Rahul Store</strong> — Live API Products Integration | Built with React</p>
          </footer>
        </div>
      )}

      {/* ========== CATALOG PAGE ========== */}
      {page === 'catalog' && (
        <div className="fk-catalog">
          {/* Scrollable category circles tab strip */}
          <section className="fk-cat-strip fk-cat-strip-catalog">
            <div className={`fk-cat-circle ${category === 'All' ? 'active' : ''}`} onClick={() => setCat('All')}>
              <div className="fk-cat-img-wrap" style={{background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem'}}>
                📦
              </div>
              <span className="fk-cat-label">All Items</span>
            </div>
            {(apiCategories.length > 0 ? apiCategories : CATEGORY_DATA).map(c => (
              <div key={c.name} className={`fk-cat-circle ${category === c.name ? 'active' : ''}`} onClick={() => setCat(c.name)}>
                <div className="fk-cat-img-wrap" style={{background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem'}}>
                  {c.icon}
                </div>
                <span className="fk-cat-label">{c.name}</span>
              </div>
            ))}
          </section>

          {/* Admin Control Bar */}
          {admin && (
            <div className="fk-admin-bar">
              <span className="fk-admin-badge">🔑 Admin Mode</span>
              <div className="fk-admin-btns">
                <button className="fk-btn fk-btn-primary" onClick={() => setAdding(true)}>+ Add Product</button>
                <button className="fk-btn fk-btn-outline" onClick={handleReset}>Clear Cache & Reload</button>
              </div>
            </div>
          )}

          {/* Toolbar containing selects and filter toggle */}
          <div className="fk-toolbar-container">
            <div className="fk-toolbar">
              <div className="fk-toolbar-left">
                <button className={`fk-pill ${category === 'All' ? 'active' : ''}`} onClick={() => setCat('All')}>All</button>
                {(apiCategories.length > 0 ? apiCategories : CATEGORY_DATA).map(c => (
                  <button key={c.name} className={`fk-pill ${category === c.name ? 'active' : ''}`} onClick={() => setCat(c.name)}>{c.name}</button>
                ))}
              </div>
              <div className="fk-toolbar-right">
                <select className="fk-sort-select fk-filter-select" value={ratingFilter} onChange={e => setRatingFilter(e.target.value)}>
                  <option value="All Ratings">⭐ All Ratings</option>
                  <option value="5 Stars Only">⭐⭐⭐⭐⭐ 5 Stars Only</option>
                  <option value="4.5 Stars & Above">⭐⭐⭐⭐★ 4.5 & Above</option>
                  <option value="4 Stars & Above">⭐⭐⭐⭐ 4 Stars & Above</option>
                  <option value="3 Stars & Above">⭐⭐⭐ 3 Stars & Above</option>
                </select>

                <select className="fk-sort-select fk-filter-select" value={priceFilter} onChange={e => setPriceFilter(e.target.value)}>
                  <option value="All Prices">All Prices</option>
                  <option value="Under ₹500">Under ₹500</option>
                  <option value="₹500–₹1000">₹500–₹1000</option>
                  <option value="₹1000–₹3000">₹1000–₹3000</option>
                  <option value="₹3000–₹5000">₹3000–₹5000</option>
                  <option value="₹5000–₹10000">₹5000–₹10000</option>
                  <option value="₹10000–₹20000">₹10000–₹20000</option>
                  <option value="₹20000–₹50000">₹20000–₹50000</option>
                  <option value="Above ₹50000">Above ₹50000</option>
                </select>

                <select className="fk-sort-select fk-filter-select" value={stockFilter} onChange={e => setStockFilter(e.target.value)}>
                  <option value="All Products">All Products</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>

                <select className="fk-sort-select" value={sortBy} onChange={e => setSort(e.target.value)}>
                  <option value="relevance">Sort by: Relevance</option>
                  <option value="popularity">Popularity</option>
                  <option value="bestSelling">Best Selling</option>
                  <option value="newest">Newest</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="discount">Biggest Discount</option>
                  <option value="az">A – Z</option>
                  <option value="za">Z – A</option>
                </select>

                <button className={`fk-filter-toggle ${showFilters ? 'active' : ''}`} onClick={() => setShowFilters(!showFilters)}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                  </svg>
                  Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}
                </button>
              </div>
            </div>

            {/* Collapsible advanced filters grid */}
            {showFilters && (
              <div className="fk-advanced-filters-panel">
                <div className="fk-filters-grid">
                  {/* Brand filter */}
                  <label className="fk-filter-field">
                    <span>Brand</span>
                    <select value={brandFilter} onChange={e => setBrandFilter(e.target.value)}>
                      <option value="All Brands">All Brands</option>
                      {availableBrands.slice(1).map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </label>

                  {/* Color filter */}
                  <label className="fk-filter-field">
                    <span>Color</span>
                    <select value={colorFilter} onChange={e => setColorFilter(e.target.value)}>
                      <option value="All Colors">All Colors</option>
                      {availableColors.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </label>

                  {/* Size filter */}
                  <label className="fk-filter-field">
                    <span>Size</span>
                    <select value={sizeFilter} onChange={e => setSizeFilter(e.target.value)}>
                      <option value="All Sizes">All Sizes</option>
                      {availableSizes.slice(1).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </label>

                  {/* Discount Filter */}
                  <label className="fk-filter-field">
                    <span>Min Discount</span>
                    <select value={discountFilter} onChange={e => setDiscountFilter(e.target.value)}>
                      <option value="All Discounts">No Min Discount</option>
                      <option value="10% Off & Above">10% Off & Above</option>
                      <option value="20% Off & Above">20% Off & Above</option>
                      <option value="30% Off & Above">30% Off & Above</option>
                      <option value="40% Off & Above">40% Off & Above</option>
                      <option value="50% Off & Above">50% Off & Above</option>
                    </select>
                  </label>

                  {/* Tags selector */}
                  <label className="fk-filter-field">
                    <span>Special Tags</span>
                    <select value={tagFilter} onChange={e => setTagFilter(e.target.value)}>
                      <option value="All Tags">All Products</option>
                      <option value="Best Seller">Best Seller</option>
                      <option value="New Arrival">New Arrival</option>
                      <option value="Trending">Trending</option>
                    </select>
                  </label>
                  
                  <button className="fk-clear-btn" style={{height: '38px', whiteSpace: 'nowrap'}} onClick={clearAllFilters}>Reset All Filters</button>
                </div>
              </div>
            )}

            {/* Active filters chips display */}
            <div className="fk-active-filters-row">
              <span className="fk-result-count">
                Showing {Math.min(visibleCount, sorted.length)} of <strong>{sorted.length}</strong> matching products
              </span>
              
              <div className="fk-filter-chips">
                {category !== 'All' && <span className="fk-chip">{category} <button onClick={() => setCat('All')}>✕</button></span>}
                {ratingFilter !== 'All Ratings' && <span className="fk-chip">{ratingFilter} <button onClick={() => setRatingFilter('All Ratings')}>✕</button></span>}
                {priceFilter !== 'All Prices' && <span className="fk-chip">{priceFilter} <button onClick={() => setPriceFilter('All Prices')}>✕</button></span>}
                {stockFilter !== 'All Products' && <span className="fk-chip">{stockFilter} <button onClick={() => setStockFilter('All Products')}>✕</button></span>}
                {brandFilter !== 'All Brands' && <span className="fk-chip">Brand: {brandFilter} <button onClick={() => setBrandFilter('All Brands')}>✕</button></span>}
                {discountFilter !== 'All Discounts' && <span className="fk-chip">Disc: {discountFilter} <button onClick={() => setDiscountFilter('All Discounts')}>✕</button></span>}
                {colorFilter !== 'All Colors' && <span className="fk-chip">Color: {colorFilter} <button onClick={() => setColorFilter('All Colors')}>✕</button></span>}
                {sizeFilter !== 'All Sizes' && <span className="fk-chip">Size: {sizeFilter} <button onClick={() => setSizeFilter('All Sizes')}>✕</button></span>}
                {tagFilter !== 'All Tags' && <span className="fk-chip">Tag: {tagFilter} <button onClick={() => setTagFilter('All Tags')}>✕</button></span>}
                {search && <span className="fk-chip">"{search}" <button onClick={() => setSearch('')}>✕</button></span>}
                
                {(category !== 'All' || ratingFilter !== 'All Ratings' || priceFilter !== 'All Prices' || stockFilter !== 'All Products' || brandFilter !== 'All Brands' || discountFilter !== 'All Discounts' || colorFilter !== 'All Colors' || sizeFilter !== 'All Sizes' || tagFilter !== 'All Tags' || search) && (
                  <button className="fk-clear-all-btn" onClick={clearAllFilters}>Clear All Filters</button>
                )}
              </div>
            </div>
          </div>

          {/* Grid Layout & Infinite Scroll loading */}
          <main className="fk-grid-section">
            {loading ? (
              /* Skeleton Loader */
              <div className="fk-skeleton-grid">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="fk-skeleton-card">
                    <div className="fk-skeleton-img fk-skeleton-pulse"></div>
                    <div className="fk-skeleton-body">
                      <div className="fk-skeleton-text fk-skeleton-cat fk-skeleton-pulse"></div>
                      <div className="fk-skeleton-text fk-skeleton-title fk-skeleton-pulse"></div>
                      <div className="fk-skeleton-text fk-skeleton-price fk-skeleton-pulse"></div>
                      <div className="fk-skeleton-text fk-skeleton-btn fk-skeleton-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : sorted.length === 0 ? (
              <div className="fk-empty">
                <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="#bbb" strokeWidth="1.2">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <h2>No products found. Try a different search query or select fewer filters.</h2>
                <button className="fk-btn fk-btn-primary" onClick={clearAllFilters}>Clear All Filters</button>
              </div>
            ) : (
              <div className="fk-product-grid">
                {sorted.slice(0, visibleCount).map(p => {
                  const loved   = wishlist.includes(p.id);
                  const noStock = p.stock <= 0;
                  const inCart  = cart.find(i => i.id === p.id);
                  const qty     = inCart ? inCart.quantity : 0;
                  return (
                    <div key={p.id} className="fk-card">
                      {/* Heart Wish button */}
                      <button className={`fk-card-heart ${loved ? 'loved' : ''}`} onClick={() => toggleWish(p.id)}>
                        <svg viewBox="0 0 24 24" width="16" height="16" fill={loved ? "#ff4757" : "none"} stroke={loved ? "#ff4757" : "#aaa"} strokeWidth="2.5">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                      </button>

                      {/* Image panel & Tags */}
                      <div className="fk-card-img-wrap" onClick={() => setDetail(p)}>
                        <img src={p.image} alt={p.name} loading="lazy" className="fk-card-img"/>
                        {noStock && <div className="fk-sold-out-overlay">SOLD OUT</div>}
                        
                        {/* Tags list */}
                        <div className="fk-card-tags">
                          {p.isBestSeller && <span className="fk-tag-badge fk-tag-bestseller">Best Seller</span>}
                          {p.isNewArrival && <span className="fk-tag-badge fk-tag-newarrival">New Arrival</span>}
                          {p.isTrending && <span className="fk-tag-badge fk-tag-trending">Trending</span>}
                        </div>
                      </div>

                      {/* Info Panel */}
                      <div className="fk-card-body">
                        <span className="fk-card-cat">{p.category} • {p.brand}</span>
                        <h3 className="fk-card-title" onClick={() => setDetail(p)} title={p.name}>{p.name}</h3>

                        {/* Ratings */}
                        <div className="fk-card-rating-row">
                          <span className={`fk-rating-badge ${p.rating >= 4.4 ? 'good' : p.rating >= 3.5 ? 'ok' : 'low'}`}>
                            {p.rating} ★
                          </span>
                          <span className="fk-rating-count">({p.reviews ? p.reviews.toLocaleString() : 0})</span>
                        </div>

                        {/* Price Row */}
                        <div className="fk-card-price-row">
                          <span className="fk-price">₹{p.price}</span>
                          {p.discount > 0 && (
                            <>
                              <span className="fk-mrp">₹{p.mrp}</span>
                              <span className="fk-discount">{p.discount}% off</span>
                            </>
                          )}
                        </div>

                        {p.price > 500 && <span className="fk-free-delivery">Free Delivery</span>}

                        {/* Stock Tag */}
                        <div className="fk-card-stock">
                          {noStock ? (
                            <span className="fk-stock-out">Out of Stock</span>
                          ) : p.stock <= 5 ? (
                            <span className="fk-stock-low">Only {p.stock} left — hurry!</span>
                          ) : (
                            <span className="fk-stock-in">In Stock • <small>{p.deliveryTime}</small></span>
                          )}
                        </div>

                        {/* Admin buttons */}
                        {admin && (
                          <div className="fk-admin-card-actions">
                            <button className="fk-admin-edit" onClick={e => { e.stopPropagation(); setEditing(p); }}>✏️ Edit</button>
                            <button className="fk-admin-del" onClick={e => { e.stopPropagation(); if (window.confirm(`Delete "${p.name}"?`)) deleteProduct(p.id); }}>🗑️ Delete</button>
                          </div>
                        )}

                        {/* CTA buttons */}
                        <div className="fk-card-btns">
                          <button className="fk-btn fk-btn-outline fk-btn-sm" onClick={() => setDetail(p)}>View</button>
                          <button
                            className={`fk-btn fk-btn-cart fk-btn-sm ${noStock ? 'disabled' : ''}`}
                            disabled={noStock}
                            onClick={() => addToCart(p)}
                          >
                            {qty > 0 ? `In Cart (${qty})` : '🛒 Add'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            
            {/* End of products indicator */}
            {!loading && sorted.length > 0 && visibleCount >= sorted.length && (
              <div style={{textAlign: 'center', color: 'var(--fk-text3)', fontSize: '0.85rem', margin: '40px 0 20px'}}>
                Showing all {sorted.length} matching products.
              </div>
            )}
          </main>

          <footer className="fk-footer">
            <p>© 2026 <strong>Rahul Store</strong> — Live API Products Integration | Built with React</p>
          </footer>
        </div>
      )}

      {/* ========== DETAILS MODAL ========== */}
      {detail && (
        <div className="fk-modal-bg" onClick={() => setDetail(null)}>
          <div className="fk-modal" onClick={e => e.stopPropagation()}>
            <button className="fk-modal-close" onClick={() => setDetail(null)}>✕</button>
            <div className="fk-modal-grid">
              <div className="fk-modal-img-panel">
                <img src={detail.image} alt={detail.name}/>
                {/* Image badges */}
                <div className="fk-card-tags" style={{top: '15px', left: '15px'}}>
                  {detail.isBestSeller && <span className="fk-tag-badge fk-tag-bestseller">Best Seller</span>}
                  {detail.isNewArrival && <span className="fk-tag-badge fk-tag-newarrival">New Arrival</span>}
                  {detail.isTrending && <span className="fk-tag-badge fk-tag-trending">Trending</span>}
                </div>
              </div>
              <div className="fk-modal-info">
                <span className="fk-card-cat">{detail.category} • Brand: <strong>{detail.brand}</strong></span>
                <h2>{detail.name}</h2>
                <div className="fk-card-rating-row" style={{marginBottom: 10}}>
                  <span className={`fk-rating-badge ${detail.rating >= 4.4 ? 'good' : detail.rating >= 3.5 ? 'ok' : 'low'}`}>{detail.rating} ★</span>
                  <span className="fk-rating-count">({detail.reviews ? detail.reviews.toLocaleString() : 0} customer reviews)</span>
                  <span className={`fk-stock-tag ${detail.stock > 0 ? '' : 'out'}`} style={{marginLeft: 'auto'}}>
                    {detail.stock > 0 ? `In Stock (${detail.stock})` : 'Out of Stock'}
                  </span>
                </div>
                <div className="fk-modal-price-row">
                  <span className="fk-price fk-price-lg">₹{detail.price}</span>
                  {detail.discount > 0 && (
                    <>
                      <span className="fk-mrp fk-mrp-lg">₹{detail.mrp}</span>
                      <span className="fk-discount fk-discount-lg">{detail.discount}% off</span>
                    </>
                  )}
                </div>
                {detail.price > 500 && <span className="fk-free-delivery">🚚 Free Delivery</span>}
                <hr className="fk-divider"/>
                <h4>Product Details</h4>
                <table style={{width: '100%', fontSize: '0.85rem', color: 'var(--fk-text2)', borderCollapse: 'collapse', margin: '8px 0 16px'}}>
                  <tbody>
                    <tr style={{borderBottom: '1px solid #f0f0f0'}}><td style={{padding: '6px 0', fontWeight: 'bold', width: '120px'}}>Brand</td><td style={{padding: '6px 0'}}>{detail.brand}</td></tr>
                    <tr style={{borderBottom: '1px solid #f0f0f0'}}><td style={{padding: '6px 0', fontWeight: 'bold'}}>Color</td><td style={{padding: '6px 0'}}>{detail.color || "Standard"}</td></tr>
                    <tr style={{borderBottom: '1px solid #f0f0f0'}}><td style={{padding: '6px 0', fontWeight: 'bold'}}>Size / Dimension</td><td style={{padding: '6px 0'}}>{detail.size || "Standard"}</td></tr>
                    <tr style={{borderBottom: '1px solid #f0f0f0'}}><td style={{padding: '6px 0', fontWeight: 'bold'}}>Delivery Info</td><td style={{padding: '6px 0'}}>{detail.deliveryTime} ({detail.price > 500 ? 'Free' : '₹49 charges'})</td></tr>
                  </tbody>
                </table>
                <h4>Description</h4>
                <p className="fk-modal-desc">{detail.longDescription}</p>
                <h4>Highlights</h4>
                <ul className="fk-highlights">
                  <li>✅ 100% Authentic Brand Certified</li>
                  <li>↩️ Easy 7-Day Hassle-Free Returns</li>
                  <li>🚚 Super Fast Delivery ({detail.deliveryTime})</li>
                  <li>🔒 Secure Encrypted Payments</li>
                </ul>
                <div className="fk-modal-actions">
                  {admin && <button className="fk-btn fk-btn-outline" onClick={() => { setEditing(detail); setDetail(null); }}>✏️ Edit</button>}
                  <button className={`fk-btn fk-btn-cart ${detail.stock <= 0 ? 'disabled' : ''}`} disabled={detail.stock <= 0} onClick={() => { addToCart(detail); setDetail(null); }}>🛒 Add to Cart</button>
                  <button className={`fk-btn fk-btn-wish ${wishlist.includes(detail.id) ? 'active' : ''}`} onClick={() => toggleWish(detail.id)}>
                    {wishlist.includes(detail.id) ? '💖 Wishlisted' : '🤍 Wishlist'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========== CART DRAWER ========== */}
      <div className={`fk-drawer-bg ${cartOpen ? 'open' : ''}`} onClick={() => setCartOpen(false)}>
        <aside className="fk-drawer" onClick={e => e.stopPropagation()}>
          <div className="fk-drawer-head">
            <h2>Cart <span>({totalItems})</span></h2>
            <button className="fk-drawer-x" onClick={() => setCartOpen(false)}>✕</button>
          </div>
          <div className="fk-drawer-body">
            {cartItems.length === 0 ? (
              <div className="fk-drawer-empty">
                <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#ccc" strokeWidth="1.5">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                <h3>Your cart is empty</h3>
                <p>Explore premium products from live developer APIs</p>
                <button className="fk-btn fk-btn-primary" onClick={() => setCartOpen(false)}>Shop Now</button>
              </div>
            ) : (
              <div className="fk-drawer-items">
                {cartItems.map(item => (
                  <div key={item.id} className="fk-drawer-item">
                    <img src={item.image} alt={item.name}/>
                    <div className="fk-drawer-item-info">
                      <h4>{item.name}</h4>
                      <div className="fk-drawer-item-price">
                        <span className="fk-price">₹{item.price}</span>
                        {item.discount > 0 && <span className="fk-mrp">₹{item.mrp}</span>}
                      </div>
                      <div className="fk-qty-row">
                        <button className="fk-qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                        <span className="fk-qty-val">{item.quantity}</span>
                        <button className="fk-qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                      </div>
                    </div>
                    <button className="fk-drawer-del" onClick={() => removeCart(item.id)}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="fk-drawer-foot">
              <div className="fk-price-summary">
                <div className="fk-price-line"><span>Subtotal</span><span>₹{subtotal}</span></div>
                <div className="fk-price-line"><span>Delivery</span><span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
                <div className="fk-price-line"><span>GST (18%)</span><span>₹{tax}</span></div>
                <div className="fk-price-line fk-price-total"><span>Total</span><span>₹{grandTotal}</span></div>
              </div>
              {subtotal > 0 && subtotal < 500 && (
                <div className="fk-shipping-hint">💡 Add ₹{500 - subtotal} more for FREE delivery!</div>
              )}
              <button className="fk-btn fk-btn-checkout" onClick={() => { alert(`✅ Order placed successfully!\nTotal Invoice: ₹${grandTotal}\n\nThank you for shopping at Rahul Store! 🎉`); setCart([]); setCartOpen(false); }}>
                Place Order →
              </button>
            </div>
          )}
        </aside>
      </div>

      {/* ========== WISHLIST DRAWER ========== */}
      <div className={`fk-drawer-bg ${wishOpen ? 'open' : ''}`} onClick={() => setWishOpen(false)}>
        <aside className="fk-drawer" onClick={e => e.stopPropagation()}>
          <div className="fk-drawer-head">
            <h2>Wishlist <span>({wishlist.length})</span></h2>
            <button className="fk-drawer-x" onClick={() => setWishOpen(false)}>✕</button>
          </div>
          <div className="fk-drawer-body">
            {wishlist.length === 0 ? (
              <div className="fk-drawer-empty">
                <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#ccc" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                <h3>Wishlist is empty</h3>
                <p>Tap ❤️ to save products you love.</p>
                <button className="fk-btn fk-btn-primary" onClick={() => setWishOpen(false)}>Browse Products</button>
              </div>
            ) : (
              <div className="fk-drawer-items">
                {wishlist.map(id => {
                  const p = products.find(x => x.id === id);
                  if (!p) return null;
                  return (
                    <div key={p.id} className="fk-drawer-item">
                      <img src={p.image} alt={p.name}/>
                      <div className="fk-drawer-item-info">
                        <h4>{p.name}</h4>
                        <div className="fk-drawer-item-price">
                          <span className="fk-price">₹{p.price}</span>
                          {p.discount > 0 && <span className="fk-mrp">₹{p.mrp}</span>}
                        </div>
                        <button className={`fk-btn fk-btn-cart fk-btn-sm ${p.stock <= 0 ? 'disabled' : ''}`} disabled={p.stock <= 0} onClick={() => wishToCart(p)}>
                          {p.stock <= 0 ? 'Out of Stock' : '🛒 Move to Cart'}
                        </button>
                      </div>
                      <button className="fk-drawer-del" onClick={() => toggleWish(p.id)}>✕</button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* ========== ADD/EDIT FORM MODAL ========== */}
      {(adding || editing) && (
        <ProductForm
          product={editing}
          onClose={() => { setAdding(false); setEditing(null); }}
          onSave={saveProduct}
          availableCategories={apiCategories.map(c => c.name)}
        />
      )}
    </div>
  );
}

/* ==================================================================
   PRODUCT ADD/EDIT FORM COMPONENT
   ================================================================== */
function ProductForm({ product, onClose, onSave, availableCategories }) {
  const [f, setF] = useState({
    id: product?.id || null,
    name: product?.name || '',
    brand: product?.brand || '',
    category: product?.category || (availableCategories && availableCategories.length > 0 ? availableCategories[0] : 'Electronics'),
    price: product?.price || '',
    mrp: product?.mrp || '',
    stock: product?.stock ?? '',
    rating: product?.rating || 4.0,
    image: product?.image || '',
    description: product?.description || '',
    longDescription: product?.longDescription || '',
    color: product?.color || 'Standard',
    size: product?.size || 'Standard',
  });
  
  const ch = e => setF(p => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <div className="fk-modal-bg" onClick={onClose}>
      <div className="fk-modal fk-form-modal" onClick={e => e.stopPropagation()}>
        <div className="fk-form-head">
          <h2>{f.id ? '✏️ Edit Product' : '✨ New Product'}</h2>
          <button className="fk-modal-close" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={e => { e.preventDefault(); onSave(f); }} className="fk-form">
          <div className="fk-form-grid">
            <label className="fk-field">
              <span>Product Name *</span>
              <input name="name" value={f.name} onChange={ch} required/>
            </label>
            <label className="fk-field">
              <span>Category *</span>
              <select name="category" value={f.category} onChange={ch}>
                {availableCategories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
            <label className="fk-field">
              <span>Brand *</span>
              <input name="brand" value={f.brand} onChange={ch} required placeholder="e.g. Apple, Nike..."/>
            </label>
            <label className="fk-field">
              <span>Selling Price ₹ *</span>
              <input name="price" type="number" value={f.price} onChange={ch} min="1" required/>
            </label>
            <label className="fk-field">
              <span>MRP ₹</span>
              <input name="mrp" type="number" value={f.mrp} onChange={ch} min="1"/>
            </label>
            <label className="fk-field">
              <span>Stock *</span>
              <input name="stock" type="number" value={f.stock} onChange={ch} min="0" required/>
            </label>
            <label className="fk-field">
              <span>Rating (1–5)</span>
              <input name="rating" type="number" value={f.rating} onChange={ch} min="1" max="5" step="0.1"/>
            </label>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
              <label className="fk-field">
                <span>Color</span>
                <input name="color" value={f.color} onChange={ch} placeholder="e.g. Blue"/>
              </label>
              <label className="fk-field">
                <span>Size</span>
                <input name="size" value={f.size} onChange={ch} placeholder="e.g. M, L, XL"/>
              </label>
            </div>
          </div>
          <label className="fk-field fk-full" style={{marginBottom: '10px'}}>
            <span>Image URL</span>
            <input name="image" value={f.image} onChange={ch} placeholder="Leave blank for default"/>
          </label>
          <label className="fk-field fk-full" style={{marginBottom: '10px'}}>
            <span>Short Description *</span>
            <input name="description" value={f.description} onChange={ch} required/>
          </label>
          <label className="fk-field fk-full">
            <span>Full Description</span>
            <textarea name="longDescription" value={f.longDescription} onChange={ch} rows="3"/>
          </label>
          <div className="fk-form-actions">
            <button type="button" className="fk-btn fk-btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="fk-btn fk-btn-primary">{f.id ? 'Save Changes' : 'Publish'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
