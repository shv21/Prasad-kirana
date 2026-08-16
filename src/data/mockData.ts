import type { Category, Product, Offer, StoreSettings, Order } from '../types';

export const initialStoreSettings: StoreSettings = {
  shopName: "Prasad Kirana Stores",
  proprietorName: "Abhimanyu Jadhav",
  tagline: "CSP Flour Mill & Daily Household Rashan",
  phone: "7499047152",
  whatsappNumber: "7499047152",
  email: "prasadkiranacsp@gmail.com",
  address: "Main Market, Pachod, Taluka Paithan",
  landmark: "Near Bus Stand / Opp. State Bank",
  city: "Chhatrapati Sambhajinagar",
  state: "Maharashtra",
  pincode: "431121",
  openingHours: "7:00 AM - 9:30 PM (Open All 7 Days)",
  deliveryFee: 20,
  freeDeliveryMin: 300,
  minOrderAmount: 50,
  deliveryRadius: "Pachod town & surrounding villages within 5 km",
  googleMapsUrl: "https://maps.google.com/?q=Pachod+Paithan+Chhatrapati+Sambhajinagar",
  aboutText: "आपला हक्काचा किराणा व सीएसपी फ्लोअर मिल! पाचोड परिसरातील प्रत्येक घरासाठी ताजी पीठ, धान्य, डाळी, तेल, मसाले, साबण आणि रोजच्या किराणा मालाचे विश्वासू दुकान.",
  flourMillInfo: "आमच्या सीएसपी फ्लोअर मिल मध्ये लोकवण गहू, शाळू ज्वारी, बाजरी, चणा डाळीचे बेसन व मसाले दळून मिळतील. एकदम शुद्ध, स्वच्छ आणि आपल्या आवडीनुसार दळण!",
  announcementBar: "⚡ पाचोड मध्ये ₹300 पेक्षा जास्त ऑर्डरवर मोफत होम डिलिव्हरी! व्हॉट्सॲपवर किराणा लिस्ट पाठवा किंवा कॉल करा: 7499047152."
};

export const initialCategories: Category[] = [
  {
    id: "cat-1",
    name: "Atta, Grain & Flour",
    iconName: "Wheat",
    description: "आटा, पीठ व चक्की दळण — CSP Flour Mill Fresh Atta, Jowar & Besan",
    displayOrder: 1,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "cat-2",
    name: "Rice & Dal (तांदूळ व डाळी)",
    iconName: "Container",
    description: "कोलम, बासमती तांदूळ, तूर डाळ, मूग व हरभरा डाळ",
    displayOrder: 2,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "cat-3",
    name: "Oil & Ghee (तेल व तूप)",
    iconName: "Droplet",
    description: "फॉर्च्यून, जेमिनी शेंगदाणा तेल, गायीचे तूप व सोयाबीन तेल",
    displayOrder: 3,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "cat-4",
    name: "Spices & Salt (मसाले व मीठ)",
    iconName: "Flame",
    description: "हळद, तिखट, टाटा मीठ, कांदा-लसूण मसाला व गरम मसाले",
    displayOrder: 4,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "cat-5",
    name: "Sugar, Tea & Coffee (शक्कर व चाय)",
    iconName: "Coffee",
    description: "रेड लेबल चाय, साखर, सोसायटी चहा व नेस्कॅफे",
    displayOrder: 5,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "cat-6",
    name: "Biscuits & Snacks (बिस्किट व नमकीन)",
    iconName: "Cookie",
    description: "पारले-जी, गुड-डे, मॅगी, चिप्स व शेव-चिवडा",
    displayOrder: 6,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "cat-7",
    name: "Dairy & Milk (दूध व बटर)",
    iconName: "Milk",
    description: "अमूल दूध, बटर, दही, पनीर व ब्रेड",
    displayOrder: 7,
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "cat-8",
    name: "Cleaning & Soaps (साबण व सर्फ)",
    iconName: "Sparkles",
    description: "सर्फ एक्सेल, विम, डिटॉल साबण, लिक्विड व फिनाईल",
    displayOrder: 8,
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: "cat-9",
    name: "Pooja Items (पूजा साहित्य)",
    iconName: "Sparkle",
    description: "कापूर, अगरबत्ती, धूप, वाती व पूजेचे तेल",
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
    categoryName: "Atta, Grain & Flour",
    stockStatus: "in_stock",
    stockCount: 45,
    isPopular: true,
    isOffer: true,
    discountPercent: 10,
    isFlourMillSpecial: true,
    description: "100% शुद्ध लोकवण गव्हाचे सीएसपी फ्लोअर मिल पाचोड मधील ताजे दळलेले पीठ. मऊ व लुसलुशीत पोळ्यांठी उत्तम!",
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
    categoryName: "Atta, Grain & Flour",
    stockStatus: "in_stock",
    stockCount: 30,
    isPopular: true,
    isOffer: false,
    discountPercent: 8,
    description: "Pure whole wheat packaged atta with 0% maida.",
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
    categoryName: "Atta, Grain & Flour",
    stockStatus: "in_stock",
    stockCount: 25,
    isPopular: true,
    isOffer: true,
    discountPercent: 12,
    isFlourMillSpecial: true,
    description: "विशेष शाळू ज्वारीचे ताजे पीठ. खुसखुशीत भाकरीसाठी उत्तम.",
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
    categoryName: "Atta, Grain & Flour",
    stockStatus: "in_stock",
    stockCount: 50,
    isPopular: false,
    isOffer: false,
    discountPercent: 13,
    description: "100% शुद्ध चणा डाळ बेसन. भजी व पिठल्यासाठी मस्त.",
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
    description: "रोजच्या जेवणासाठी मऊ, पांढरा आणि सुगंधी वाडा कोलम तांदूळ.",
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
    description: "गावरान बिनपॉलिश पिवळी तूर डाळ. चवदार व पौष्टिक वरण सांबर.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: "p-203",
    name: "Fortune Everyday Basmati Rice",
    brand: "Fortune",
    weight: "5 kg Bag",
    price: 490,
    mrp: 560,
    categoryId: "cat-2",
    categoryName: "Rice & Dal (तांदूळ व डाळी)",
    stockStatus: "in_stock",
    stockCount: 15,
    isPopular: false,
    isOffer: true,
    discountPercent: 12,
    description: "मऊ लांब दाण्याचा सुगंधी बासमती तांदूळ मसूर पुलाव साठी.",
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=500&auto=format&fit=crop&q=80"
  },

  // Oil & Ghee
  {
    id: "p-301",
    name: "Fortune Sunlite Refined Sunflower Oil (सूर्यफूल तेल)",
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
  {
    id: "p-303",
    name: "Gemini Refined Groundnut Oil (शिंगदाणा तेल)",
    brand: "Gemini",
    weight: "1 Litre Pouch",
    price: 165,
    mrp: 185,
    categoryId: "cat-3",
    categoryName: "Oil & Ghee (तेल व तूप)",
    stockStatus: "in_stock",
    stockCount: 35,
    isPopular: true,
    isOffer: false,
    discountPercent: 10,
    description: "पारंपरिक शेंगदाणा तेल सणासुदीच्या तिखट पदार्थांसाठी.",
    image: "https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=500&auto=format&fit=crop&q=80"
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
  {
    id: "p-403",
    name: "Special Kanda Lasun Masala (कांदा लसूण मसाला)",
    brand: "Bedekar / Local Mill",
    weight: "500 g Pack",
    price: 130,
    mrp: 150,
    categoryId: "cat-4",
    categoryName: "Spices & Salt (मसाले व मीठ)",
    stockStatus: "in_stock",
    stockCount: 22,
    isPopular: true,
    isOffer: true,
    discountPercent: 13,
    description: "झणझणीत रस्सा व मटण-मटकीसाठी अस्सल महाराष्ट्रीयन मसाला.",
    image: "https://images.unsplash.com/photo-1608797178974-15b35a64ede9?w=500&auto=format&fit=crop&q=80"
  },

  // Sugar, Tea & Coffee
  {
    id: "p-501",
    name: "Brooke Bond Red Label Tea (रेड लेबल चहा)",
    brand: "Red Label",
    weight: "500 g Pack",
    price: 270,
    mrp: 300,
    categoryId: "cat-5",
    categoryName: "Sugar, Tea & Coffee (शक्कर व चाय)",
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
    categoryName: "Sugar, Tea & Coffee (शक्कर व चाय)",
    stockStatus: "in_stock",
    stockCount: 80,
    isPopular: true,
    isOffer: true,
    discountPercent: 8,
    description: "स्वच्छ, सल्फर-फ्री पांढरी खडी साखर.",
    image: "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=500&auto=format&fit=crop&q=80"
  },

  // Biscuits & Snacks
  {
    id: "p-601",
    name: "Parle-G Gold Glucose Biscuits Family Pack",
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
    description: "भारताचे आवडते ग्लुकोज बिस्किट फॅमिली पॅक.",
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
    description: "2 मिनिटात बनणारे टेस्टी मसाला नूडल्स.",
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
    description: "कपड्यांवरील हट्टी डाग एका धुण्यात घालवणारा सर्फ.",
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&auto=format&fit=crop&q=80"
  },
  {
    id: "p-802",
    name: "Vim Dishwash Gel Lemon",
    brand: "Vim",
    weight: "750 ml Bottle",
    price: 185,
    mrp: 210,
    categoryId: "cat-8",
    categoryName: "Cleaning & Soaps (साबण व सर्फ)",
    stockStatus: "in_stock",
    stockCount: 25,
    isPopular: false,
    isOffer: true,
    discountPercent: 12,
    description: "भांडी चकाचक व चिकटमुक्त करणारा लिंबू जेल.",
    image: "https://images.unsplash.com/photo-1585842378054-ee2e52f94ba2?w=500&auto=format&fit=crop&q=80"
  }
];

export const initialOffers: Offer[] = [
  {
    id: "off-1",
    title: "CSP Flour Mill Special Deal",
    subtitle: "10kg ताजी गव्हाची कणिक (Chakki Atta) वर ₹40 बचत!",
    discountText: "10% OFF",
    code: "CSPFRESH",
    bannerColor: "from-emerald-700 to-green-800",
    productId: "p-101",
    isActive: true,
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "off-2",
    title: "Free Home Delivery in Pachod",
    subtitle: "₹300 पेक्षा जास्त किराणा ऑर्डरवर मोफत घरपोहच डिलिव्हरी!",
    discountText: "FREE DELIVERY",
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
    address: "Near Water Tank, Pachod Gaon",
    landmark: "Behind Gram Panchayat Office",
    deliveryType: "delivery",
    paymentType: "cod",
    notes: "Please call before coming.",
    items: [
      {
        productId: "p-101",
        name: "CSP Fresh Chakki Gehu Atta",
        brand: "CSP Flour Mill",
        weight: "10 kg Bag",
        price: 360,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80"
      },
      {
        productId: "p-402",
        name: "Tata Salt Iodised Salt",
        brand: "Tata",
        weight: "1 kg Pack",
        price: 28,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1518110165387-74f7429ee632?w=500&auto=format&fit=crop&q=80"
      }
    ],
    subtotal: 416,
    deliveryCharge: 0,
    totalAmount: 416,
    status: "delivered",
    createdAt: "2026-08-15T16:30:00.000Z"
  }
];
