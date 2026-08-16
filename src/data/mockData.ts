import type { Category, Product, Offer, StoreSettings, Order } from '../types';

export const initialStoreSettings: StoreSettings = {
  shopName: "Prasad Kirana Stores, CSP & Flour Mill",
  proprietorName: "Abhimanyu Jadhav",
  tagline: "1. CSP Banking • 2. Grocery Store • 3. Flour Mill (Atta Chakki)",
  phone: "7499047152",
  whatsappNumber: "7499047152",
  email: "prasadkiranacsp@gmail.com",
  address: "Near ZP School, Pachod Kh., Taluka Paithan",
  landmark: "Near ZP School Pachod Kh. (झेड.पी. शाळा पाचोड खुर्द जवळ)",
  city: "Pachod Kh.",
  state: "Maharashtra",
  pincode: "431121",
  openingHours: "7:00 AM - 9:30 PM (Open All 7 Days)",
  deliveryFee: 20,
  freeDeliveryMin: 300,
  minOrderAmount: 50,
  deliveryRadius: "Pachod Kh. town & surrounding areas",
  googleMapsUrl: "https://maps.app.goo.gl/4euTza44dgd4diRv9",
  aboutText: "आपले विश्वासू ३-इन-१ केंद्र: १. ग्राहक सेवा केंद्र (CSP Banking), २. किराणा स्टोअर्स (Grocery Store), ३. अट्टा चक्की (Flour Mill). पाचोड खुर्द झेड.पी. शाळेजवळ!",
  flourMillInfo: "अट्टा चक्की (Flour Mill): लोकवण गहू ताजी कणिक, शाळू ज्वारी, बाजरी, चणा डाळीचे बेसन व मसाले उत्तम व स्वच्छ प्रकारे दळून मिळतील.",
  cspServicesInfo: "ग्राहक सेवा केंद्र (CSP Banking Point): आधार पेमेंट (AEPS), रोख पैसे भरणे/काढणे (Cash Deposit/Withdrawal), मायक्रो एटीएम (Micro ATM), मनी ट्रान्सफर (Money Transfer) आणि मिनी स्टेटमेंट सुविधा उपलब्ध.",
  announcementBar: "⚡ ३ मुख्य सेवा: 🏦 ग्राहक सेवा केंद्र (CSP) | 🛒 किराणा दुकान | 🌾 अट्टा चक्की! 📍 झेड.पी. शाळा पाचोड खुर्द जवळ. Call/WhatsApp: 7499047152."
};

export const initialCategories: Category[] = [
  {
    id: "cat-1",
    name: "Atta, Grain & Flour (पीठ व चक्की)",
    iconName: "Wheat",
    description: "लोकवण गहू ताजी कणिक, ज्वारी, बाजरी पीठ व चणा डाळ बेसन",
    displayOrder: 1,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "cat-2",
    name: "Rice & Dal (तांदूळ व डाळी)",
    iconName: "Container",
    description: "वाडा कोलम, बासमती तांदूळ, तूर डाळ, मूग व हरभरा डाळ",
    displayOrder: 2,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "cat-3",
    name: "Oil & Ghee (तेल व तूप)",
    iconName: "Droplet",
    description: "फॉर्च्यून सनफ्लावर, जेमिनी शेंगदाणा तेल व अमूल गायीचे तूप",
    displayOrder: 3,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "cat-4",
    name: "Spices & Salt (मसाले व मीठ)",
    iconName: "Flame",
    description: "एव्हरेस्ट हळद, लाल तिखट, टाटा मीठ व कांदा-लसूण मसाला",
    displayOrder: 4,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "cat-5",
    name: "Sugar & Tea (शक्कर व चहा)",
    iconName: "Coffee",
    description: "रेड लेबल चहा, मधुर साखर व सोसायटी टी",
    displayOrder: 5,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "cat-6",
    name: "Biscuits & Snacks (बिस्किट व नमकीन)",
    iconName: "Cookie",
    description: "पारले-जी, गुड-डे, मॅगी नूडल्स व चिप्स",
    displayOrder: 6,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "cat-7",
    name: "Dairy & Bakery (दूध व बटर)",
    iconName: "Milk",
    description: "अमूल दूध, बटर, दही व पनीर",
    displayOrder: 7,
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "cat-8",
    name: "Cleaning & Soaps (साबण व सर्फ)",
    iconName: "Sparkles",
    description: "सर्फ एक्सेल, विम जेल, डिटॉल व फिनाईल",
    displayOrder: 8,
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "cat-9",
    name: "Pooja Essentials (पूजा साहित्य)",
    iconName: "Sparkle",
    description: "भीमसेनी कापूर, सायकल अगरबत्ती व दिवट्या",
    displayOrder: 9,
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=400&auto=format&fit=crop&q=80"
  }
];

export const initialProducts: Product[] = [
  // Atta & Flour Mill
  {
    id: "p-101",
    name: "CSP Fresh Chakki Gehu Atta (चक्की ताजी कणिक)",
    brand: "CSP Flour Mill",
    weight: "10 kg Bag",
    price: 360,
    mrp: 400,
    categoryId: "cat-1",
    categoryName: "Atta, Grain & Flour (पीठ व चक्की)",
    stockStatus: "in_stock",
    stockCount: 45,
    isPopular: true,
    isOffer: true,
    discountPercent: 10,
    isFlourMillSpecial: true,
    description: "100% शुद्ध लोकवण गव्हाचे सीएसपी अट्टा चक्की मधील ताजे दळलेले पीठ. मऊ व लुसलुशीत पोळ्यांठी उत्तम!",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: "p-102",
    name: "Aashirvaad Shudh Chakki Atta",
    brand: "Aashirvaad",
    weight: "5 kg Bag",
    price: 265,
    mrp: 290,
    categoryId: "cat-1",
    categoryName: "Atta, Grain & Flour (पीठ व चक्की)",
    stockStatus: "in_stock",
    stockCount: 30,
    isPopular: true,
    isOffer: false,
    discountPercent: 8,
    description: "Pure whole wheat packaged flour with zero maida.",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: "p-103",
    name: "CSP Pure Jowar Peeth (शाळू ज्वारी पीठ)",
    brand: "CSP Flour Mill",
    weight: "5 kg Bag",
    price: 210,
    mrp: 240,
    categoryId: "cat-1",
    categoryName: "Atta, Grain & Flour (पीठ व चक्की)",
    stockStatus: "in_stock",
    stockCount: 25,
    isPopular: true,
    isOffer: true,
    discountPercent: 12,
    isFlourMillSpecial: true,
    description: "शाळू ज्वारीचे ताजे दळलेले पीठ. खुसखुशीत भाकरीसाठी उत्तम.",
    image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: "p-104",
    name: "Fortune Chana Dal Besan (बेसन पीठ)",
    brand: "Fortune",
    weight: "1 kg Pack",
    price: 95,
    mrp: 110,
    categoryId: "cat-1",
    categoryName: "Atta, Grain & Flour (पीठ व चक्की)",
    stockStatus: "in_stock",
    stockCount: 50,
    isPopular: false,
    isOffer: false,
    discountPercent: 13,
    description: "100% शुद्ध चणा डाळ बेसन भजी व पिठल्यासाठी.",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=80"
  },

  // Rice & Dal
  {
    id: "p-201",
    name: "Royal Bullet Wada Kolam Rice (वाडा कोलम तांदूळ)",
    brand: "Royal Bullet",
    weight: "10 kg Bag",
    price: 680,
    mrp: 750,
    categoryId: "cat-2",
    categoryName: "Rice & Dal (तांदूळ व डाळी)",
    stockStatus: "in_stock",
    stockCount: 20,
    isPopular: true,
    isOffer: true,
    discountPercent: 9,
    description: "रोजच्या जेवणासाठी मऊ व सुगंधी वाडा कोलम तांदूळ.",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: "p-202",
    name: "Latur Super Unpolished Toor Dal (तूर डाळ)",
    brand: "Latur Selection",
    weight: "1 kg Pack",
    price: 155,
    mrp: 175,
    categoryId: "cat-2",
    categoryName: "Rice & Dal (तांदूळ व डाळी)",
    stockStatus: "in_stock",
    stockCount: 40,
    isPopular: true,
    isOffer: false,
    discountPercent: 11,
    description: "बिनपॉलिश पिवळी तूर डाळ. चवदार वरणासाठी.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=80"
  },

  // Oil & Ghee
  {
    id: "p-301",
    name: "Fortune Sunlite Sunflower Oil (सूर्यफूल तेल)",
    brand: "Fortune",
    weight: "1 Litre Pouch",
    price: 128,
    mrp: 145,
    categoryId: "cat-3",
    categoryName: "Oil & Ghee (तेल व तूप)",
    stockStatus: "in_stock",
    stockCount: 60,
    isPopular: true,
    isOffer: true,
    discountPercent: 11,
    description: "हलके आणि आरोग्यदायी रिफाइंड सनफ्लावर ऑईल.",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: "p-302",
    name: "Amul Pure Cow Ghee (शुद्ध गाईचे तूप)",
    brand: "Amul",
    weight: "1 Litre Jar",
    price: 645,
    mrp: 680,
    categoryId: "cat-3",
    categoryName: "Oil & Ghee (तेल व तूप)",
    stockStatus: "in_stock",
    stockCount: 18,
    isPopular: true,
    isOffer: false,
    discountPercent: 5,
    description: "रवाळ, सुगंधी अमूल 100% शुद्ध गाईचे तूप.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=80"
  },

  // Spices & Salt
  {
    id: "p-401",
    name: "Everest Tikhalal Red Chilli Powder (लाल तिखट)",
    brand: "Everest",
    weight: "200 g Pack",
    price: 78,
    mrp: 90,
    categoryId: "cat-4",
    categoryName: "Spices & Salt (मसाले व मीठ)",
    stockStatus: "in_stock",
    stockCount: 40,
    isPopular: true,
    isOffer: false,
    discountPercent: 13,
    description: "छान लाल रंग व झणझणीत तिखट चव.",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: "p-402",
    name: "Tata Salt Iodised Salt (टाटा मीठ)",
    brand: "Tata",
    weight: "1 kg Pack",
    price: 28,
    mrp: 30,
    categoryId: "cat-4",
    categoryName: "Spices & Salt (मसाले व मीठ)",
    stockStatus: "in_stock",
    stockCount: 100,
    isPopular: true,
    isOffer: true,
    discountPercent: 7,
    description: "देश का नमक - आयोडीनयुक्त शुद्ध मीठ.",
    image: "https://images.unsplash.com/photo-1518110165387-74f7429ee632?w=500&auto=format&fit=crop&q=80"
  },

  // Tea & Sugar
  {
    id: "p-501",
    name: "Brooke Bond Red Label Tea (रेड लेबल चहा)",
    brand: "Red Label",
    weight: "500 g Pack",
    price: 270,
    mrp: 300,
    categoryId: "cat-5",
    categoryName: "Sugar & Tea (शक्कर व चहा)",
    stockStatus: "in_stock",
    stockCount: 30,
    isPopular: true,
    isOffer: false,
    discountPercent: 10,
    description: "कडक चव व सुंदर सुगंध असलेला घरगुती चहा.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: "p-502",
    name: "Madhur Crystal White Sugar (साखर)",
    brand: "Madhur",
    weight: "1 kg Pack",
    price: 48,
    mrp: 52,
    categoryId: "cat-5",
    categoryName: "Sugar & Tea (शक्कर व चहा)",
    stockStatus: "in_stock",
    stockCount: 80,
    isPopular: true,
    isOffer: true,
    discountPercent: 8,
    description: "स्वच्छ पांढरी खडी साखर.",
    image: "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=500&auto=format&fit=crop&q=80"
  },

  // Biscuits & Snacks
  {
    id: "p-601",
    name: "Parle-G Gold Glucose Biscuits",
    brand: "Parle",
    weight: "1 kg Saver Pack",
    price: 120,
    mrp: 130,
    categoryId: "cat-6",
    categoryName: "Biscuits & Snacks (बिस्किट व नमकीन)",
    stockStatus: "in_stock",
    stockCount: 50,
    isPopular: true,
    isOffer: false,
    discountPercent: 8,
    description: "ग्लुकोज बिस्किट फॅमिली पॅक.",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: "p-603",
    name: "Maggi 2-Minute Masala Noodles Pack of 4",
    brand: "Nestle Maggi",
    weight: "280 g (4 Packs)",
    price: 56,
    mrp: 60,
    categoryId: "cat-6",
    categoryName: "Biscuits & Snacks (बिस्किट व नमकीन)",
    stockStatus: "in_stock",
    stockCount: 75,
    isPopular: true,
    isOffer: false,
    discountPercent: 7,
    description: "२ मिनिटात बनणारे मसाला नूडल्स.",
    image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&auto=format&fit=crop&q=80"
  },

  // Cleaning & Soaps
  {
    id: "p-801",
    name: "Surf Excel Easy Wash Detergent Powder",
    brand: "Surf Excel",
    weight: "1 kg Pack",
    price: 140,
    mrp: 155,
    categoryId: "cat-8",
    categoryName: "Cleaning & Soaps (साबण व सर्फ)",
    stockStatus: "in_stock",
    stockCount: 30,
    isPopular: true,
    isOffer: false,
    discountPercent: 10,
    description: "कपड्यांवरील डाग घालवणारा सर्फ.",
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&auto=format&fit=crop&q=80"
  }
];

export const initialOffers: Offer[] = [
  {
    id: "off-1",
    title: "CSP Flour Mill Special Atta Deal",
    subtitle: "10kg ताजी गव्हाची कणिक (Chakki Atta) वर ₹40 विशेष सूट!",
    discountText: "10% OFF",
    code: "CSPFRESH",
    bannerColor: "from-emerald-800 to-teal-900",
    productId: "p-101",
    isActive: true,
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "off-2",
    title: "CSP Banking & Grocery Doorstep Facility",
    subtitle: "पाचोड खुर्द झेड.पी. शाळेजवळ (Near ZP School Pachod Kh.) बँक व किराणा सेवा!",
    discountText: "3-IN-1 SERVICES",
    bannerColor: "from-amber-600 to-orange-700",
    isActive: true,
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80"
  }
];

export const initialOrders: Order[] = [
  {
    id: "ord-1001",
    orderNumber: "PKS-1001",
    customerName: "Rameshwar Patil",
    phone: "9822145890",
    address: "Near ZP School, Pachod Kh.",
    landmark: "Near ZP School Pachod Kh.",
    deliveryType: "delivery",
    paymentType: "cod",
    notes: "Call before coming.",
    items: [
      {
        productId: "p-101",
        name: "CSP Fresh Chakki Gehu Atta",
        brand: "CSP Flour Mill",
        weight: "10 kg Bag",
        price: 360,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80"
      }
    ],
    subtotal: 360,
    deliveryCharge: 0,
    totalAmount: 360,
    status: "delivered",
    createdAt: "2026-08-15T16:30:00.000Z"
  }
];
