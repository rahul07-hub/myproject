const fs = require('fs');
const path = require('path');

// 24 categories
const categories = [
  "Electronics", "Mobiles", "Laptops", "Smart Watches", "Headphones",
  "Fashion", "Men's Clothing", "Women's Clothing", "Kids Wear", "Sarees",
  "Kurtas", "Shoes", "Bags", "Cosmetics", "Beauty",
  "Skin Care", "Home Appliances", "Kitchen", "Grocery", "Sports",
  "Books", "Toys", "Furniture", "Accessories"
];

// Brands Map
const brandsMap = {
  "Electronics": ["Sony", "LG", "JBL", "Bose", "Boat", "Philips", "Logitech", "Pioneer", "Panasonic"],
  "Mobiles": ["Apple", "Samsung", "OnePlus", "Xiaomi", "Realme", "Vivo", "Oppo"],
  "Laptops": ["Apple", "Dell", "HP", "Lenovo", "Asus", "Acer"],
  "Smart Watches": ["Apple", "Samsung", "Noise", "Fire-Boltt", "Titan", "Fastrack", "Casio"],
  "Headphones": ["Apple", "Sony", "Boat", "JBL", "Noise", "Sennheiser"],
  "Fashion": ["Zara", "H&M", "Levi's", "Tommy Hilfiger", "Gucci", "Allen Solly"],
  "Men's Clothing": ["Levi's", "Allen Solly", "Van Heusen", "H&M", "Zara", "Tommy Hilfiger"],
  "Women's Clothing": ["Zara", "H&M", "Allen Solly", "Van Heusen", "Levi's", "Vero Moda"],
  "Kids Wear": ["H&M", "Zara", "Adidas", "Puma", "Allen Solly"],
  "Sarees": ["Fabindia", "Manyavar", "Nalli", "Local Artisan"],
  "Kurtas": ["Fabindia", "Manyavar", "Biba", "W", "Allen Solly"],
  "Shoes": ["Nike", "Adidas", "Puma", "Reebok", "Bata", "Woodland", "Crocs"],
  "Bags": ["Wildcraft", "American Tourister", "Skybags", "Tommy Hilfiger", "Gucci"],
  "Cosmetics": ["Lakme", "Maybelline", "L'Oréal", "MAC", "Clinique"],
  "Beauty": ["L'Oréal", "Mamaearth", "Dove", "Nivea", "Sunsilk", "Tresemme"],
  "Skin Care": ["Mamaearth", "Dove", "Nivea", "Ponds", "Cetaphil", "Neutrogena"],
  "Home Appliances": ["LG", "Samsung", "Whirlpool", "Haier", "Godrej"],
  "Kitchen": ["Prestige", "Pigeon", "Milton", "Hawkins", "Philips"],
  "Grocery": ["Tata", "Catch", "Aashirvaad", "Britannia", "Nescafe", "Kellogg's"],
  "Sports": ["Nike", "Adidas", "Puma", "Yonex", "SS", "Spalding", "Boldfit"],
  "Books": ["Penguin", "HarperCollins", "Random House", "Scholastic", "Oxford"],
  "Toys": ["Lego", "Mattel", "Hasbro", "Fisher-Price", "Funskool"],
  "Furniture": ["IKEA", "Urban Ladder", "Pepperfry", "Godrej Interio"],
  "Accessories": ["Titan", "Fastrack", "Casio", "Ray-Ban", "Wildcraft", "Tommy Hilfiger"]
};

// Base price ranges [Min, Max]
const priceRanges = {
  "Electronics": [1500, 45000],
  "Mobiles": [8000, 140000],
  "Laptops": [25000, 180000],
  "Smart Watches": [2000, 60000],
  "Headphones": [999, 29000],
  "Fashion": [799, 8999],
  "Men's Clothing": [599, 4999],
  "Women's Clothing": [699, 5999],
  "Kids Wear": [399, 2999],
  "Sarees": [1499, 19999],
  "Kurtas": [799, 5999],
  "Shoes": [1199, 14999],
  "Bags": [899, 12999],
  "Cosmetics": [199, 2999],
  "Beauty": [149, 3999],
  "Skin Care": [199, 3499],
  "Home Appliances": [6000, 75000],
  "Kitchen": [499, 14999],
  "Grocery": [49, 1199],
  "Sports": [299, 19999],
  "Books": [199, 1499],
  "Toys": [299, 8999],
  "Furniture": [1999, 45000],
  "Accessories": [399, 9999]
};

// Templates for Product Names (by category)
const templatesMap = {
  "Electronics": ["Pro Bluetooth Speaker", "Ultra HD Smart Projector", "Universal Power Bank 20000mAh", "Cinematic Soundbar with Subwoofer", "Home Theatre Audio Receiver", "Portable Voice Recorder", "Dual USB Charging Hub", "Smart Home Assistant Speaker", "Digital Media Streamer 4K", "True Wireless FM Transmitter"],
  "Mobiles": ["Galaxy S Series Pro", "iPhone Premium Pro Max", "OnePlus Nord Plus", "Mi Note Power Ultra", "V-Series Portrait Pro", "F-Series Sleek 5G", "Pixel Vision Phone", "Edge Ultra Slim 5G", "Neo Gaming Edition", "Z-Fold Flex Premium"],
  "Laptops": ["XPS Professional Laptop", "MacBook Premium M-Series", "Inspiron Core Workhorse", "ThinkPad Business Elite", "ZenBook Ultra Slim OLED", "Predator Gaming Monster", "Aspire Everyday Chromebook", "Pavilion Entertainment Laptop", "IdeaPad Flex 2-in-1", "TUF Military Grade Gaming Laptop"],
  "Smart Watches": ["Active Sport Smartwatch", "Classic Leather Dial Watch", "Titanium Rugged Fit-Watch", "Luxury Steel Smartwatch", "Elite Smart Band Tracker", "Slim Heart-Rate Tracker", "Voyager GPS Watch", "Chronos Elegant Watch", "Pulse Health Watch", "Hybrid Sleek Smartwatch"],
  "Headphones": ["Rockerz Over-Ear Wireless", "QuietComfort Active Noise Cancelling", "Bassheads In-Ear Wired", "True Wireless Earbuds (TWS)", "Air Pro Noise Isolating", "Sport Fit Wireless Neckband", "Studio Pro DJ Headphones", "Gaming Headset with Mic", "Sleek Foldable Headset", "ClearVoice Call Earphones"],
  "Fashion": ["Classic Aviator Sunglasses", "Premium Leather Dress Belt", "Modern Wool Fedora Hat", "Sleek Bomber Jacket", "Tailored Dinner Blazer", "Designer Pashmina Shawl", "Waterproof Trench Coat", "Casual Denim Vest", "Winter Fleece Beanie", "Luxury Silk Scarf"],
  "Men's Clothing": ["Slim Fit Casual Cotton Shirt", "Classic Polo Collar T-Shirt", "Heavyweight Cotton Cargo Pants", "Straight Leg Raw Denim Jeans", "Breathable Active Gym Shorts", "Formal Business Oxford Shirt", "Cozy Pullover Fleece Hoodie", "Premium Cotton Chino Pants", "Athletic Training T-Shirt", "Smart Casual Linen Shirt"],
  "Women's Clothing": ["Floral Print Summer Maxi Dress", "Slim Fit Skinny Denim Jeans", "Classic Crewneck Knit Top", "A-Line High-Waist Skirt", "Cozy Oversized Knit Cardigan", "Athletic High-Waist Yoga Pants", "Tailored Office Wear Blazer", "Boho Chic Printed Blouse", "Casual Linen Jumpsuit", "Elegant Sleeveless Party Gown"],
  "Kids Wear": ["Soft Cotton Cartoon T-Shirt", "Stretchy Denim Overall Dungarees", "Comfy Fleece Hooded Sweatshirt", "Breathable Active Play Shorts", "Cute Printed Cotton Romper", "Kids Warm Winter Parka Coat", "Colorful Pyjama Set", "Casual Cotton Checked Shirt", "Printed Floral Summer Dress", "Elastic Waist Jogger Pants"],
  "Sarees": ["Banarasi Pure Silk Saree", "Kanjeevaram Gold Zari Saree", "Classic Chiffon Party Saree", "Georgette Floral Printed Saree", "Handloom Cotton Daily Wear Saree", "Elegant Linen Embroidered Saree", "Organza Designer Saree", "Traditional Bandhani Silk Saree", "Net Lace Festive Saree", "Bhagalpuri Tussar Silk Saree"],
  "Kurtas": ["Cotton Straight Casual Kurti", "Anarkali Silk Festive Kurta", "Printed Daily Wear Short Kurta", "Elegant A-Line Cotton Kurta", "Pathani Style Festive Kurta Set", "Embroidered Rayon Kurti", "Chanderi Silk Party Wear Kurta", "Georgette Kurti with Palazzo", "Solid Color Linen Kurta", "Indo-Western Fusion Kurta"],
  "Shoes": ["Air Zoom Performance Running Shoes", "Classic Leather Formal Dress Shoes", "Minimalist White Lifestyle Sneakers", "Rugged Outdoor Hiking Boots", "Comfortable Cushion Slip-On Clogs", "Lightweight Gym Training Shoes", "Suede Casual Loafers", "Water-Resistant Trail Runners", "Orthopedic Daily Walking Shoes", "High-Top Retro Sneakers"],
  "Bags": ["Multi-Pocket Commuter Backpack", "Genuine Leather Office Laptop Bag", "Spacious Weekend Duffel Bag", "Premium Hard Shell Suitcase Trolley", "Sleek Crossbody Shoulder Sling Bag", "Premium Designer Handbag Tote", "Compact Gym Drawstring Bag", "Anti-Theft Security Backpack", "Durable Canvas Messenger Bag", "Elegant Clutch Evening Bag"],
  "Cosmetics": ["Matte Liquid Lipstick Longwear", "Waterproof Volumizing Mascara", "Flawless Finish Liquid Foundation", "Precision Intense Eyeliner Pen", "Hydrating Lip Gloss Plumper", "Multi-Color Eye Shadow Palette", "Velvety Blush & Highlight Duo", "Satin Compact Powder SPF 20", "Nail Polish Quick-Dry lacquer", "Eyebrow Definer Pencil"],
  "Beauty": ["Professional High-Airflow Hair Dryer", "Ceramic Tourmaline Hair Straightener", "Nutri-Gloss Daily Nourishing Shampoo", "Deep Repair Hair Mask Conditioner", "Ionic Hair Curling Wand Volumizer", "Keratin Therapy Hair Serum", "Anti-Frizz Leave-in Cream", "Scalp Massager Revitalizer brush", "Herbal Hair Growth Styling Gel", "Thermal Heat Protectant Spray"],
  "Skin Care": ["Gentle Foaming Skin Cleanser", "Daily Moisturizing Cream Hydrator", "Ultra-Light Sunscreen Gel SPF 50", "Hyaluronic Acid Glow Face Serum", "Brightening Vitamin C Face Wash", "Exfoliating Walnut Face Scrub", "Nourishing Night Repair Cream", "Calming Aloe Vera Soothing Gel", "Anti-Aging Eye Recovery Cream", "Hydrating Sheet Mask Pack"],
  "Home Appliances": ["Smart Double-Door Refrigerator", "Fully Automatic Washing Machine", "Split Inverter AC 1.5 Ton", "Digital Convection Microwave Oven", "Robotic Vacuum Cleaner Pro", "Energy Saving Air Purifier", "Dehumidifier with Humidity sensor", "Instant Electric Water Geyser", "Tower Air Cooler Remote control", "Dishwasher Eco-Wash Premium"],
  "Kitchen": ["3-Jar High-Speed Mixer Grinder", "Electric Automatic Rice Cooker", "Insulated Thermosteel Water Bottle", "Insulated Soft-Case Lunch Box Set", "Non-Stick Cookware Set (3-Piece)", "Digital Air Fryer Touch Screen", "Electric Cordless Glass Kettle", "Manual Citrus Juice Extractor", "Multi-Blade Vegetables Chopper", "Induction Cooktop Smart Touch"],
  "Grocery": ["Premium Long-Grain Basmati Rice", "Organic Raw Wild Honey", "Rich Classic Instant Coffee", "Traditional Whole Wheat Flour Atta", "Premium Mixed Dry Fruits pack", "Refined Sunflower Cooking Oil", "Assorted Herbal Tea Infusion", "Choco-Crunchy Breakfast Muesli", "Himalayan Pink Rock Salt", "Extra Virgin Cold Pressed Olive Oil"],
  "Sports": ["Kashmir Willow Professional Cricket Bat", "Synthetic Leather Machine-Stitched Football", "TPE Non-Slip Exercise Yoga Mat", "Solid PVC Fitness Dumbbells Set", "Graphite High-Tension Badminton Racket", "Durable Rubber Grip Basketball", "Indoor Sports Table Tennis Bat", "Speed-Jump Workout Skipping Rope", "Foam Roller Muscle Massager", "Pro Badminton Shuttlecocks Pack"],
  "Books": ["Atomic Habits: Proven Strategies", "The Psychology of Money Lessons", "Clean Code: Software Craftsmanship", "Sapiens: A Brief History", "Steve Jobs: Exclusive Biography", "Zero to One: Startup Building", "Thinking, Fast and Slow", "Deep Work: Rules for Focus", "The Lean Startup Handbook", "Start With Why: Leadership Guide"],
  "Toys": ["Creative Building Blocks Set 500pcs", "Posable Action Hero Figure Set", "Strategic Classic Family Board Game", "Super Soft Plush Teddy Bear", "Educational Solar Robot Coding Kit", "High-Speed Remote Control Car", "Sturdy Wooden Shape Sorter Box", "Double-Sided Kids Drawing Board", "Chunky Plastic Pull-Along Toy Train", "Musical Electronic Baby Keyboard"],
  "Furniture": ["Ergonomic High-Back Office Chair", "Minimalist Solid Pine Study Desk", "Solid Oak Wooden Coffee Table", "Modular 3-Tier Bookshelf unit", "Modern Fabric L-Shape Sofa", "King Size Wooden Bed Frame", "Elegant Dresser Mirror Console", "Multi-Tier Shoe Storage Cabinet", "Outdoor Patio Rattan Chair Set", "Folding Utility Dining Table"],
  "Accessories": ["Titanium Aviator Sunglasses UV", "Casual Analog Leather Wrist Watch", "Sturdy Full-Grain Leather Belt", "Slim Carbon-Fiber Key Organizer", "RFID-Blocking Slim Front-Pocket Wallet", "Silicone Protective Airpods Case", "Heavy-Duty Zinc Keyring Carabiner", "Durable Canvas Passport Organizer pouch", "Plush Neck Travel Pillow", "Microfiber Lens Cleaning Kit"]
};

// Curated Photo IDs for Unsplash images (to rotate for realism)
const imagesMap = {
  "Electronics": ["1519389950473-47ba0277781c", "1498049794561-7780e7231661", "1527443224150-54a5c676bc1b", "1606813907291-d86efa9b36cb", "1516724562728-afc824a36e84", "1593305841991-05c297ba4575", "1583394838336-acd977736f90", "1585298723682-7115561c51b7", "1612444530582-fc66183b16f7", "1546435770-a3e426bf472b"],
  "Mobiles": ["1511707171634-5f897ff02aa9", "1598327105666-5b89351aff97", "1565849906661-ca96033d411e", "1580910051074-3eb694886505", "1512941937669-90a1b58e7e9c", "1601784551446-20c9e07cdbdb", "1610945265064-32af226500b6", "1573148195900-7845dcb9b127"],
  "Laptops": ["1588872657578-7efd1f1555ed", "1496181130207-f399f65a3563", "1517336714731-489689fd1ca8", "1603302576837-37561b2fe536", "1593642632823-8f785ba67e45", "1488590528505-98d2b5aba04b"],
  "Smart Watches": ["1508685096489-7aacd43bd3b1", "1523275335684-37898b6baf30", "1542496658-e33a6d0d50f6", "1517502884422-41eaacad0168", "1434493789847-2f02f0c4362c", "1509048191080-d2984bad6ae5"],
  "Headphones": ["1505740420928-5e560c06d30e", "1546435770-a3e426bf472b", "1618366712010-f4ae9c647dcb", "1606220581534-2269d7dc8470", "1583394838336-acd977736f90", "1612444530582-fc66183b16f7"],
  "Fashion": ["1483985988355-763728e1935b", "1490481651871-ab68de25d43d", "1485968579580-b6d095142e6e", "1445205170230-053b83016050", "1509631179647-0177331693ae"],
  "Men's Clothing": ["1617137968427-85924c800a22", "1593030761756-3474301552a8", "1596755095609-ed521d84b238", "1602810318383-e386cc2a3ccf", "1620012253295-c05517e47df0"],
  "Women's Clothing": ["1525507119028-ed4c629a60a3", "1509631179647-0177331693ae", "1496747611176-843222e1e57c", "1609505848981-aa197f120025", "1515886657613-9f3515b0c78f"],
  "Kids Wear": ["1622290319048-705756507022", "1519457431-44754a64ee1d", "1519238263592-7db02755c91f", "1607453813893-9119213806f8", "1555009393-0dece068d810"],
  "Sarees": ["1610030469983-98e550d6193c", "1617627143767-d8e21194783b", "1610030470227-d0d5b432a13c", "1605666807804-d0d5b432a13c", "1615215570227-d0d5b432a13c"],
  "Kurtas": ["1617627143767-d8e21194783b", "1605666807804-8cb6ee7f1a30", "1615215570889-8cb6ee7f1a30", "1610030469983-98e550d6193c"],
  "Shoes": ["1542291026-7eec264c27ff", "1525966222438-f81a8e27c67f", "1608231387042-66d1773070a5", "1606107557195-0e29a4b5b4aa", "1491510898667-55e581026a78", "1600185365483-4a15999abf14"],
  "Bags": ["1553062407-98eeb64c6a62", "1590874103328-e621516e8615", "1622560480605-e83f242db557", "1594223274537-4f190eec26e4", "1531041065840-d7d8c0b7af0b"],
  "Cosmetics": ["1596462502278-27bfdc403348", "1586495777744-4413f210e4ea", "1522337360788-8b13df793f1a", "1612817288484-9f918d04ebd4", "1620610222384-5f50f24db557"],
  "Beauty": ["1522337360788-8b13df793f1a", "1631729371254-42c2892f0e6e", "1526947425960-945c6e72858f", "1589492477829-5e65395b66cc", "1556228578-0d85b1a4d571"],
  "Skin Care": ["1608248597279-f99d160b2109", "1556228578-0d85b1a4d571", "1611077544989-118dfb841a06", "1620916566354-f99d160b2109", "1612251491222-6e2b9c71c7b4"],
  "Home Appliances": ["1584622650111-993a426fbf0a", "1583863788434-c5a1a0684f8d", "1621213447545-de5ebd61f108", "1597843846618-9366e6027a05", "1556910103-1c02745aae4d"],
  "Kitchen": ["1556910103-1c02745aae4d", "1586201375761-83865001e355", "1599813247071-7053c51322ab", "1602143407151-7111542de6e8", "1584269600519-112d066b4d45"],
  "Grocery": ["1542838132-92c53300491e", "1578916171728-466f97143d19", "1608686134038-f3d9435b8f64", "1596040033221-70e0600491a6", "1610348722654-a3c2207b6932"],
  "Sports": ["1518609878373-06d740f60d8b", "1614632537197-38a4706509df", "1600880292089-90a7e086ee15", "1584735935682-2f2b694b4efa", "1517649763962-0c623066013b"],
  "Books": ["1507842217343-583bb7270b66", "1589829085413-56de8ae18c73", "1544947950-fa07a98d237f", "1532012197267-da84d127e765", "1546215364-12f3fff5d578"],
  "Toys": ["1558060370-d644479cb3f0", "1596461404969-dd27cf9f310f", "1608889175123-8ec330b86f84", "1531525645387-7f14be13bd6f", "1566577134-7f14be13bd6f"],
  "Furniture": ["1524758631624-e2822e304c36", "1555041469-a58634b3a175", "1586023492125-27b2c045efd7", "1618220179428-2272fc4a1a3b", "1592078615242-4f014e38e6e5"],
  "Accessories": ["1572635196237-14b3f281503f", "1627140801899-0e7bc23e32b0", "1624222165011-893a201c13d7", "1523275335684-37898b6baf30", "1509048191080-d2984bad6ae5"]
};

// Colors list
const colorsMap = {
  "Fashion": ["Black", "White", "Beige", "Navy Blue", "Crimson Red", "Olive Green"],
  "Men's Clothing": ["Black", "White", "Navy Blue", "Grey", "Forest Green", "Khaki"],
  "Women's Clothing": ["Pink", "Lavender", "Sky Blue", "White", "Black", "Maroon", "Yellow"],
  "Kids Wear": ["Red", "Blue", "Green", "Yellow", "Pink", "White", "Orange"],
  "Sarees": ["Red", "Gold", "Royal Blue", "Magenta", "Emerald Green", "Orange", "Pink"],
  "Kurtas": ["White", "Yellow", "Peach", "Navy Blue", "Maroon", "Mint Green", "Beige"],
  "Shoes": ["Black", "White", "Grey", "Blue", "Red", "Brown"],
  "Bags": ["Black", "Grey", "Blue", "Red", "Brown", "Teal", "Tan"],
  "Cosmetics": ["Ruby Red", "Pink Glow", "Coral Peach", "Nude Brown", "Berry Wine"],
  "Accessories": ["Black", "Brown", "Gold", "Silver", "Tan", "Gunmetal"]
};

// Default colors if not specified
const defaultColors = ["Charcoal Black", "Platinum Silver", "Midnight Blue", "Forest Green", "Titanium Gray", "Rose Gold"];

// Sizes list
const sizesMap = {
  "Men's Clothing": ["S", "M", "L", "XL", "XXL"],
  "Women's Clothing": ["XS", "S", "M", "L", "XL"],
  "Kids Wear": ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"],
  "Shoes": ["6", "7", "8", "9", "10", "11"],
  "Laptops": ["13-inch", "14-inch", "15.6-inch", "16-inch"],
  "Mobiles": ["6.1-inch", "6.7-inch", "6.2-inch", "6.8-inch"]
};

const defaultSizes = ["Standard"];

// Generate delivery times
const deliveryOptions = ["Tomorrow", "2 Days", "3-5 Days"];

const products = [];
let globalId = 1;

// Image helper function to generate the Unsplash URL using photo ID
const getImageUrl = (id) => `https://images.unsplash.com/photo-${id}?w=400&h=400&fit=crop&auto=format&q=80`;

// Main loop to generate 1010 products per category
for (const catName of categories) {
  const brands = brandsMap[catName];
  const templates = templatesMap[catName];
  const images = imagesMap[catName];
  const colors = colorsMap[catName] || defaultColors;
  const sizes = sizesMap[catName] || defaultSizes;
  const [minPrice, maxPrice] = priceRanges[catName];

  for (let i = 0; i < 1010; i++) {
    const brand = brands[i % brands.length];
    const template = templates[(i * 3) % templates.length];
    
    // Add variations to product name to make it look realistic
    let spec = "";
    if (catName === "Mobiles") {
      const storages = ["128GB", "256GB", "512GB"];
      const ram = ["8GB RAM", "12GB RAM", "16GB RAM"];
      spec = `(${ram[(i * 2) % ram.length]}, ${storages[(i * 5) % storages.length]})`;
    } else if (catName === "Laptops") {
      const processors = ["Intel i5", "Intel i7", "AMD Ryzen 5", "AMD Ryzen 7", "Apple M2", "Apple M3"];
      const ram = ["8GB RAM", "16GB RAM", "32GB RAM"];
      spec = `(${processors[(i * 2) % processors.length]} / ${ram[(i * 4) % ram.length]})`;
    } else if (catName === "Books") {
      const covers = ["Paperback", "Hardcover", "Kindle Edition"];
      spec = `(${covers[(i * 3) % covers.length]})`;
    } else if (catName === "Grocery") {
      const packSizes = ["1kg", "500g", "200g", "5kg", "1 Litre"];
      spec = `(${packSizes[(i * 3) % packSizes.length]})`;
    } else if (catName === "Sports") {
      const sportsVariations = ["Premium", "Match Grade", "Training Pack", "Pro Edition"];
      spec = `(${sportsVariations[(i * 3) % sportsVariations.length]})`;
    }

    const color = colors[(i * 7) % colors.length];
    const size = sizes[(i * 11) % sizes.length];

    // Build unique product name
    let productName = `${brand} ${template}`;
    if (spec) productName += ` ${spec}`;
    if (color && color !== "Standard" && !defaultColors.includes(color)) {
      productName += ` (${color})`;
    }

    // Determine deterministic price
    // Shift base price slightly per brand and per product index
    const brandWeight = (brand.charCodeAt(0) + brand.charCodeAt(brand.length - 1)) / 200; // 0.5 to 1.2
    let priceMultiplier = 0.5 + (i % 10) / 10 * 0.7; // 0.5 to 1.2
    
    // Apple / Gucci / premium brands are more expensive
    if (["Apple", "Gucci", "Sony", "Dell", "Bose", "Ray-Ban", "Tommy Hilfiger"].includes(brand)) {
      priceMultiplier *= 1.8;
    }

    let calculatedPrice = Math.round(minPrice + (maxPrice - minPrice) * priceMultiplier * brandWeight);
    if (calculatedPrice < minPrice) calculatedPrice = minPrice;
    if (calculatedPrice > maxPrice) calculatedPrice = maxPrice;

    // Grocery, cosmetics can have round values, other items too
    calculatedPrice = Math.round(calculatedPrice / 10) * 10;
    if (calculatedPrice === 0) calculatedPrice = 49; // fallback

    // Calculate MRP and discount
    // Random discount % between 0 and 60
    const hasDiscount = (i % 7) !== 0; // 6 out of 7 products have discount
    let discount = 0;
    let mrp = calculatedPrice;

    if (hasDiscount) {
      const discountPercentageOptions = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
      discount = discountPercentageOptions[(i * 3) % discountPercentageOptions.length];
      mrp = Math.round(calculatedPrice / (1 - discount / 100));
      mrp = Math.round(mrp / 10) * 10;
      // Re-calculate exact discount based on rounded prices
      discount = Math.round(((mrp - calculatedPrice) / mrp) * 100);
    }

    // Stock Status (All available, none unsold)
    let stock = 10 + (i % 91); // 10 to 100 always

    // Rating (4.0 to 5.0)
    // Distribute ratings strictly between 4.0 and 5.0
    let rating = 4.0 + (i % 11) * 0.1; // 4.0 to 5.0
    rating = parseFloat(rating.toFixed(1));

    // Number of reviews
    let reviews = 5 + (i % 95); // small count
    if (i % 3 === 0) reviews = 100 + (i % 900);
    if (i % 10 === 0) reviews = 1000 + (i % 14000);
    if (i % 50 === 0) reviews = 15000 + (i % 35000);

    // Tags
    const isBestSeller = (i % 25) === 0;
    const isNewArrival = (i % 30) === 2;
    const isTrending = (i % 20) === 7;

    let tag = "";
    if (isBestSeller) tag = "Best Seller";
    else if (isNewArrival) tag = "New Arrival";
    else if (isTrending) tag = "Trending";

    const deliveryTime = deliveryOptions[i % deliveryOptions.length];
    
    // Choose image from the curated set
    const imageId = images[i % images.length];
    const image = getImageUrl(imageId);

    // Search keywords
    const keywords = [
      brand.toLowerCase(),
      catName.toLowerCase(),
      template.toLowerCase(),
      color.toLowerCase(),
      tag.toLowerCase(),
      calculatedPrice <= 2000 ? "under 2000 under ₹2000 below 2000 below ₹2000" : "",
      calculatedPrice <= 5000 ? "under 5000 under ₹5000 below 5000 below ₹5000" : "",
      calculatedPrice <= 50000 ? "under 50000 under ₹50000 below 50000 below ₹50000" : "",
      rating >= 4.5 ? "best high rating above 4.5 top rated" : "",
      discount >= 30 ? "discount sale offer cheap cheapest price" : "",
      calculatedPrice < 1000 ? "cheapest cheap low price budget" : ""
    ].filter(Boolean).join(" ");

    const shortDescription = `High quality and durable ${template} by ${brand}. Perfect for daily use and designed with premium materials.`;
    const longDescription = `The ${productName} offers industry-leading features and outstanding performance. Designed by ${brand} for customers seeking durability and top-tier experience. Includes premium packing, certified warranty support, and reliable post-purchase assistance. Available in color ${color} and size ${size}.`;

    products.push({
      id: globalId++,
      name: productName,
      brand,
      category: catName,
      image,
      price: calculatedPrice,
      mrp,
      discount,
      rating,
      reviews,
      stock,
      description: shortDescription,
      longDescription,
      deliveryTime,
      isBestSeller,
      isNewArrival,
      isTrending,
      tag,
      color,
      size,
      keywords
    });
  }
}

// Write to public/products.json
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)){
  fs.mkdirSync(publicDir, { recursive: true });
}
const outputPath = path.join(publicDir, 'products.json');

console.log(`Generating ${products.length} products...`);
fs.writeFileSync(outputPath, JSON.stringify(products, null, 2), 'utf-8');
console.log(`Successfully generated products database in ${outputPath}`);
