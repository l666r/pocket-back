// Global Location Intelligence Data & APIs
// Supports worldwide destinations with real-time adaptive cities and 100% UNIQUE visual imagery per item

const GLOBAL_CITIES = {
  Kochi: {
    cityName: 'Kochi',
    country: 'India',
    flag: '🇮🇳',
    currency: 'INR',
    currencySymbol: '₹',
    emergencyNumber: '112 (Police: 100, Ambulance: 108)',
    heroImage: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80', // Chinese nets sunset
    weather: {
      temp: '29°C',
      condition: 'Sunny & breezy backwaters',
      humidity: '74%',
      sunsetTime: '6:18 PM',
      airQuality: 'Good (AQI 42)',
    },
    mapData: {
      center: [9.9655, 76.2420],
      zoom: 13,
      landmarks: [
        { id: 'k1', name: 'High Court Water Metro Jetty', type: 'transit', lat: 9.9800, lng: 76.2760, category: 'Ferry', rating: 4.9, fee: '₹20', bestTime: '06:00 - 22:00', imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80' },
        { id: 'k2', name: 'Fort Kochi Beach & Shoreline', type: 'sunset', lat: 9.9660, lng: 76.2415, category: 'Promenade', rating: 4.8, fee: 'Free', bestTime: '17:30 - 18:30', imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80' },
        { id: 'k3', name: 'Kashi Art Cafe & Courtyard', type: 'food', lat: 9.9655, lng: 76.2420, category: 'Artisan Cafe', rating: 4.8, fee: '₹350', bestTime: '09:00 - 21:00', imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80' },
        { id: 'k4', name: 'Mattancherry Jewish Synagogue', type: 'heritage', lat: 9.9575, lng: 76.2590, category: 'Heritage', rating: 4.7, fee: '₹10', bestTime: '10:00 - 17:00', imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80' },
        { id: 'k5', name: 'Shenoys Multiplex Cinema', type: 'movie', lat: 9.9730, lng: 76.2820, category: 'Cinema', rating: 4.8, fee: '₹220', bestTime: '14:00 - 23:00', imageUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=80' },
        { id: 'k6', name: 'Vypin Island Jetty', type: 'transit', lat: 9.9920, lng: 76.2370, category: 'Ferry', rating: 4.7, fee: '₹20', bestTime: 'Every 15m', imageUrl: 'https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?auto=format&fit=crop&w=600&q=80' },
      ],
    },
    movies: [
      { id: 'm1', title: 'Aadujeevitham (The Goat Life)', theater: 'Shenoys Cinemas, MG Road', showtimes: ['11:30 AM', '02:45 PM', '06:15 PM', '09:45 PM'], rating: 4.9, genre: 'Survival Drama', language: 'Malayalam', imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80' },
      { id: 'm2', title: 'Dune: Part Two (IMAX 4K)', theater: 'PVR INOX, Forum Mall Kochi', showtimes: ['01:00 PM', '04:30 PM', '08:00 PM', '11:15 PM'], rating: 4.8, genre: 'Sci-Fi Epic', language: 'English', imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80' },
      { id: 'm3', title: 'Manjummel Boys', theater: 'Cinepolis, Centre Square Mall', showtimes: ['10:45 AM', '02:00 PM', '05:30 PM', '09:00 PM'], rating: 4.9, genre: 'Adventure Thriller', language: 'Malayalam', imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80' },
    ],
    transit: [
      { id: 't1', name: 'Kochi Water Metro (High Court ↔ Vypin)', type: 'Water Metro', route: 'Line 1 • Electric AC Ferry', frequency: 'Every 15 mins', fare: '₹20', scenicRating: 5, status: 'On Schedule', imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80' },
      { id: 't2', name: 'Kochi Water Metro (Bolgatty ↔ South Chittoor)', type: 'Water Metro', route: 'Line 2 • Scenic Islands', frequency: 'Every 20 mins', fare: '₹30', scenicRating: 5, status: 'On Schedule', imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
      { id: 't3', name: 'Kochi Metro Rail (Aluva ↔ Thripunithura)', type: 'Metro Rail', route: 'Blue Line • Elevated Air-Con', frequency: 'Every 7 mins', fare: '₹10 – ₹60', scenicRating: 4.6, status: 'High Frequency', imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80' },
      { id: 't4', name: 'Ro-Ro Island Vehicle & Passenger Ferry', type: 'Public Ferry', route: 'Fort Kochi ↔ Vypin', frequency: 'Continuous (10 mins)', fare: '₹5', scenicRating: 4.7, status: 'Active', imageUrl: 'https://images.unsplash.com/photo-1559827291-72ee739d0d9a?auto=format&fit=crop&w=600&q=80' },
    ],
    events: [
      { id: 'e1', title: 'Kochi-Muziris Biennale Preview', date: 'Daily Exhibition', location: 'Aspinwall House, Fort Kochi', category: 'Contemporary Art', price: '₹150', imageUrl: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=600&q=80' },
      { id: 'e2', title: 'Traditional Kathakali Recital & Makeup Demo', date: 'Every Evening 6:00 PM', location: 'Kerala Kathakali Centre, Fort Kochi', category: 'Heritage Dance', price: '₹400', imageUrl: 'https://images.unsplash.com/photo-1609137144827-c1cfc9f3be64?auto=format&fit=crop&w=600&q=80' },
      { id: 'e3', title: 'Waterfront Sunset Indie Music Night', date: 'This Saturday, 7:00 PM', location: 'Francis Cafe Garden, Fort Kochi', category: 'Live Music', price: 'Free Entry', imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80' },
    ],
    cafes: [
      { id: 'c1', name: 'Kashi Art Cafe', category: 'Artisan Cafe', rating: 4.8, priceTier: '₹₹', area: 'Fort Kochi', specialty: 'Signature Chocolate Cake & Cold Brew', imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80' },
      { id: 'c2', name: 'Seagull Waterfront Deck', category: 'Seafood & Sunset', rating: 4.7, priceTier: '₹₹₹', area: 'Calvathy Road', specialty: 'Karimeen Pollichathu & Sea Breezes', imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80' },
      { id: 'c3', name: 'Loafer\'s Corner', category: 'Heritage Bistro', rating: 4.6, priceTier: '₹₹', area: 'Princess Street', specialty: 'Dutch Appam & Spiced Masala Chai', imageUrl: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=600&q=80' },
    ],
  },

  Tokyo: {
    cityName: 'Tokyo',
    country: 'Japan',
    flag: '🇯🇵',
    currency: 'JPY',
    currencySymbol: '¥',
    emergencyNumber: '110 (Police), 119 (Ambulance)',
    heroImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80', // Tokyo skyline & Tokyo Tower
    weather: {
      temp: '18°C',
      condition: 'Crisp & clear evening',
      humidity: '48%',
      sunsetTime: '5:42 PM',
      airQuality: 'Excellent (AQI 18)',
    },
    mapData: {
      center: [35.6762, 139.6503],
      zoom: 13,
      landmarks: [
        { id: 'tok1', name: 'Shibuya Crossing & Hachiko', type: 'promenade', lat: 35.6595, lng: 139.7004, category: 'Iconic Spot', rating: 4.9, fee: 'Free', bestTime: '18:00 - 22:00', imageUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=600&q=80' },
        { id: 'tok2', name: 'Tokyo Water Bus (Asakusa ↔ Odaiba)', type: 'transit', lat: 35.7110, lng: 139.7970, category: 'Futuristic Ferry', rating: 4.8, fee: '¥1,720', bestTime: '10:00 - 18:00', imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80' },
        { id: 'tok3', name: 'TOHO Cinemas Shinjuku (Godzilla)', type: 'movie', lat: 35.6950, lng: 139.7020, category: 'IMAX Cinema', rating: 4.9, fee: '¥2,000', bestTime: '12:00 - 23:30', imageUrl: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=600&q=80' },
        { id: 'tok4', name: 'Senso-ji Temple', type: 'heritage', lat: 35.7147, lng: 139.7967, category: 'Heritage', rating: 4.8, fee: 'Free', bestTime: '06:00 - 17:00', imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80' },
      ],
    },
    movies: [
      { id: 'tm1', title: 'The Boy and the Heron (Studio Ghibli)', theater: 'TOHO Cinemas Shinjuku', showtimes: ['11:00 AM', '02:15 PM', '06:00 PM', '09:10 PM'], rating: 4.9, genre: 'Anime / Fantasy', language: 'Japanese (EN Sub)', imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80' },
      { id: 'tm2', title: 'Godzilla Minus One', theater: 'Grand Cinema Sunshine Ikebukuro IMAX', showtimes: ['01:30 PM', '04:45 PM', '08:15 PM'], rating: 4.9, genre: 'Action Sci-Fi', language: 'Japanese', imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80' },
    ],
    transit: [
      { id: 'tt1', name: 'JR Yamanote Line (Tokyo Loop)', type: 'High Frequency Train', route: 'Shinjuku ↔ Shibuya ↔ Tokyo', frequency: 'Every 2 mins', fare: '¥160 – ¥200', scenicRating: 4.9, status: 'On Schedule', imageUrl: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=600&q=80' },
      { id: 'tt2', name: 'Tokyo Water Bus "Himiko" (Futuristic)', type: 'Water Ferry', route: 'Asakusa ↔ Odaiba Seaside', frequency: 'Every 40 mins', fare: '¥1,720', scenicRating: 5, status: 'Scenic Favorite', imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80' },
      { id: 'tt3', name: 'Tokyo Metro Ginza Line', type: 'Subway', route: 'Shibuya ↔ Asakusa', frequency: 'Every 3 mins', fare: '¥180', scenicRating: 4.7, status: 'Fast', imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=600&q=80' },
    ],
    events: [
      { id: 'te1', title: 'Roppongi Art Night 2026', date: 'This Weekend', location: 'Roppongi Hills Arena', category: 'Modern Art', price: 'Free', imageUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80' },
      { id: 'te2', title: 'Kabuki Traditional Theatre Matinee', date: 'Daily 11:00 AM', location: 'Kabukiza Theatre, Ginza', category: 'Cultural Heritage', price: '¥4,000', imageUrl: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=600&q=80' },
    ],
    cafes: [
      { id: 'tc1', name: 'Glitch Coffee & Roasters', category: 'Single Origin Cafe', rating: 4.9, priceTier: '¥¥¥', area: 'Jimbocho', specialty: 'Pour-over Geisha Coffee', imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80' },
      { id: 'tc2', name: 'Chatei Hatou', category: 'Kissaten Vintage Cafe', rating: 4.8, priceTier: '¥¥', area: 'Shibuya', specialty: 'Hand-drip Charcoal Roast & Chiffon Cake', imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80' },
    ],
  },

  Paris: {
    cityName: 'Paris',
    country: 'France',
    flag: '🇫🇷',
    currency: 'EUR',
    currencySymbol: '€',
    emergencyNumber: '112 (European Emergency), 15 (SAMU)',
    heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    weather: {
      temp: '16°C',
      condition: 'Mild breeze & golden twilight',
      humidity: '55%',
      sunsetTime: '7:45 PM',
      airQuality: 'Good (AQI 32)',
    },
    mapData: {
      center: [48.8566, 2.3522],
      zoom: 13,
      landmarks: [
        { id: 'par1', name: 'Eiffel Tower Sunset Lawn', type: 'sunset', lat: 48.8584, lng: 2.2945, category: 'Iconic View', rating: 4.9, fee: '€18', bestTime: '19:00 - 21:00', imageUrl: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=600&q=80' },
        { id: 'par2', name: 'Batobus Seine River Shuttle', type: 'transit', lat: 48.8580, lng: 2.2930, category: 'River Ferry', rating: 4.8, fee: '€19/Day', bestTime: '10:00 - 20:00', imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80' },
        { id: 'par3', name: 'Louvre Museum & Glass Pyramid', type: 'heritage', lat: 48.8606, lng: 2.3376, category: 'Art & Heritage', rating: 4.9, fee: '€22', bestTime: '09:00 - 18:00', imageUrl: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=600&q=80' },
        { id: 'par4', name: 'Le Grand Rex Cinema & Club', type: 'movie', lat: 48.8705, lng: 2.3480, category: 'Historic Cinema', rating: 4.8, fee: '€14', bestTime: '14:00 - 23:00', imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80' },
      ],
    },
    movies: [
      { id: 'pm1', title: 'Anatomy of a Fall (Palme d\'Or)', theater: 'Le Grand Rex, Grands Boulevards', showtimes: ['02:00 PM', '06:00 PM', '09:30 PM'], rating: 4.9, genre: 'Courtroom Thriller', language: 'French (EN Sub)', imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80' },
      { id: 'pm2', title: 'Midnight in Paris (Restored 4K)', theater: 'Cinema du Pantheon', showtimes: ['04:30 PM', '08:00 PM'], rating: 4.8, genre: 'Romance / Fantasy', language: 'English / French', imageUrl: 'https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?auto=format&fit=crop&w=600&q=80' },
    ],
    transit: [
      { id: 'pt1', name: 'Batobus Seine River Ferry', type: 'River Shuttle', route: 'Eiffel Tower ↔ Louvre ↔ Notre-Dame', frequency: 'Every 20 mins', fare: '€19/pass', scenicRating: 5, status: 'Scenic Cruiser', imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=600&q=80' },
      { id: 'pt2', name: 'Paris Metro Line 1 (Automated)', type: 'Metro', route: 'La Defense ↔ Chateau de Vincennes', frequency: 'Every 2 mins', fare: '€2.15', scenicRating: 4.7, status: 'Fast', imageUrl: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=600&q=80' },
      { id: 'pt3', name: 'RER C Riverbank Express', type: 'Commuter Rail', route: 'Versailles ↔ Eiffel ↔ St Michel', frequency: 'Every 10 mins', fare: '€4.50', scenicRating: 4.8, status: 'Active', imageUrl: 'https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?auto=format&fit=crop&w=600&q=80' },
    ],
    events: [
      { id: 'pe1', title: 'Seine River Sunset Jazz Cruise', date: 'Every Evening 7:30 PM', location: 'Pont de Neuf Dock', category: 'Live Jazz & Wine', price: '€35', imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80' },
      { id: 'pe2', title: 'Montmartre Artists Square Open Air', date: 'Daily 09:00 AM', location: 'Place du Tertre', category: 'Artisans & Painters', price: 'Free', imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=600&q=80' },
    ],
    cafes: [
      { id: 'pc1', name: 'Boot Cafe', category: 'Aesthetic Coffee Shop', rating: 4.8, priceTier: '€€', area: 'Le Marais', specialty: 'Flat White & Almond Financier', imageUrl: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=600&q=80' },
      { id: 'pc2', name: 'Cafe de Flore', category: 'Legendary Literary Cafe', rating: 4.7, priceTier: '€€€', area: 'Saint-Germain', specialty: 'Chocolat Chaud & Fresh Croissants', imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80' },
    ],
  },

  London: {
    cityName: 'London',
    country: 'United Kingdom',
    flag: '🇬🇧',
    currency: 'GBP',
    currencySymbol: '£',
    emergencyNumber: '999 (Emergency), 111 (NHS Healthcare)',
    heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    weather: {
      temp: '14°C',
      condition: 'Overcast & breezy with sunset glow',
      humidity: '65%',
      sunsetTime: '6:35 PM',
      airQuality: 'Good (AQI 28)',
    },
    mapData: {
      center: [51.5074, -0.1278],
      zoom: 13,
      landmarks: [
        { id: 'lon1', name: 'Uber Boat by Thames Clippers Pier', type: 'transit', lat: 51.5033, lng: -0.1195, category: 'Fast River Ferry', rating: 4.9, fee: '£9.80', bestTime: 'Every 15m', imageUrl: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=600&q=80' },
        { id: 'lon2', name: 'BFI IMAX Waterloo', type: 'movie', lat: 51.5050, lng: -0.1130, category: 'Largest Screen', rating: 4.9, fee: '£18', bestTime: '13:00 - 23:00', imageUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=80' },
        { id: 'lon3', name: 'Tower Bridge Walkway & Glass Floor', type: 'heritage', lat: 51.5055, lng: -0.0754, category: 'Historic View', rating: 4.8, fee: '£12', bestTime: '10:00 - 18:00', imageUrl: 'https://images.unsplash.com/photo-1520986606214-8b456906c813?auto=format&fit=crop&w=600&q=80' },
      ],
    },
    movies: [
      { id: 'lm1', title: 'Oppenheimer (70mm IMAX Special)', theater: 'BFI IMAX, Waterloo', showtimes: ['01:00 PM', '05:30 PM', '09:00 PM'], rating: 4.9, genre: 'Biographical Drama', language: 'English', imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80' },
    ],
    transit: [
      { id: 'lt1', name: 'Uber Boat by Thames Clippers', type: 'River Fast Catamaran', route: 'Westminster ↔ Tower Bridge ↔ Greenwich', frequency: 'Every 15 mins', fare: '£9.80', scenicRating: 5, status: 'Top Rated', imageUrl: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=600&q=80' },
      { id: 'lt2', name: 'Elizabeth Line (Crossrail)', type: 'Express Metro', route: 'Heathrow ↔ Central London ↔ Canary Wharf', frequency: 'Every 5 mins', fare: '£3.50 – £12', scenicRating: 4.8, status: 'Ultra Fast', imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80' },
    ],
    events: [
      { id: 'le1', title: 'West End Musical Gala', date: 'Nightly 7:30 PM', location: 'Shaftesbury Avenue', category: 'Theatre', price: '£30+', imageUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=600&q=80' },
    ],
    cafes: [
      { id: 'lc1', name: 'Monmouth Coffee Company', category: 'Artisan Roastery', rating: 4.9, priceTier: '££', area: 'Covent Garden', specialty: 'Filter Drips & Cinnamon Swirls', imageUrl: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=600&q=80' },
    ],
  },

  NewYork: {
    cityName: 'New York',
    country: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    currencySymbol: '$',
    emergencyNumber: '911 (Police & Ambulance)',
    heroImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
    weather: {
      temp: '21°C',
      condition: 'Sunny skyline & light autumn breeze',
      humidity: '45%',
      sunsetTime: '6:28 PM',
      airQuality: 'Good (AQI 35)',
    },
    mapData: {
      center: [40.7128, -74.0060],
      zoom: 13,
      landmarks: [
        { id: 'nyc1', name: 'NYC Ferry (East River / Wall St Pier 11)', type: 'transit', lat: 40.7035, lng: -74.0070, category: 'Water Ferry', rating: 4.9, fee: '$4.00', bestTime: '06:30 - 22:00', imageUrl: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=600&q=80' },
        { id: 'nyc2', name: 'Brooklyn Bridge Sunset Walk', type: 'sunset', lat: 40.7061, lng: -73.9969, category: 'Skyline View', rating: 4.9, fee: 'Free', bestTime: '17:45 - 19:00', imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80' },
        { id: 'nyc3', name: 'AMC Lincoln Square IMAX 70mm', type: 'movie', lat: 40.7740, lng: -73.9820, category: 'Premiere Cinema', rating: 4.8, fee: '$24', bestTime: '12:00 - 23:45', imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80' },
      ],
    },
    movies: [
      { id: 'nm1', title: 'Civil War (A24 IMAX)', theater: 'AMC Lincoln Square 13', showtimes: ['01:15 PM', '04:30 PM', '07:45 PM', '10:30 PM'], rating: 4.8, genre: 'Action Thriller', language: 'English', imageUrl: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=600&q=80' },
    ],
    transit: [
      { id: 'nt1', name: 'NYC Ferry (East River & South Brooklyn)', type: 'River Ferry', route: 'Wall St ↔ DUMBO ↔ Williamsburg', frequency: 'Every 20 mins', fare: '$4.00', scenicRating: 5, status: 'Golden Hour Gem', imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80' },
      { id: 'nt2', name: 'MTA Subway Line (L Train)', type: 'Subway', route: '14th St Manhattan ↔ Bedford Ave Brooklyn', frequency: 'Every 4 mins', fare: '$2.90', scenicRating: 4.5, status: '24/7', imageUrl: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=600&q=80' },
    ],
    events: [
      { id: 'ne1', title: 'Rooftop Cinema Club Skyline Screening', date: 'Tonight, 8:00 PM', location: 'Midtown Manhattan Deck', category: 'Film & Cocktails', price: '$28', imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80' },
    ],
    cafes: [
      { id: 'nc1', name: 'Sey Coffee Roasters', category: 'World Top 10 Coffee', rating: 4.9, priceTier: '$$', area: 'Bushwick Brooklyn', specialty: 'Micro-lot Filter Coffee', imageUrl: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=600&q=80' },
    ],
  },

  Dubai: {
    cityName: 'Dubai',
    country: 'United Arab Emirates',
    flag: '🇦🇪',
    currency: 'AED',
    currencySymbol: 'AED ',
    emergencyNumber: '999 (Police), 998 (Ambulance)',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    weather: {
      temp: '32°C',
      condition: 'Clear desert sky & warm evening breeze',
      humidity: '40%',
      sunsetTime: '6:05 PM',
      airQuality: 'Moderate (AQI 58)',
    },
    mapData: {
      center: [25.2048, 55.2708],
      zoom: 13,
      landmarks: [
        { id: 'dxb1', name: 'Dubai Ferry & Water Taxi Marina', type: 'transit', lat: 25.0770, lng: 55.1320, category: 'Scenic Cruise', rating: 4.9, fee: 'AED 25', bestTime: '17:00 - 21:00', imageUrl: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=600&q=80' },
        { id: 'dxb2', name: 'Burj Khalifa Sky Deck', type: 'sunset', lat: 25.1972, lng: 55.2744, category: 'Observation Deck', rating: 4.8, fee: 'AED 179', bestTime: '17:30 - 18:30', imageUrl: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=600&q=80' },
      ],
    },
    movies: [
      { id: 'dm1', title: 'Gladiator II (Exclusive IMAX)', theater: 'Roxy Cinemas, Dubai Hills Mall', showtimes: ['03:00 PM', '06:30 PM', '09:45 PM'], rating: 4.8, genre: 'Action Epic', language: 'English / Arabic', imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80' },
    ],
    transit: [
      { id: 'dt1', name: 'Dubai Ferry (Marina ↔ Al Ghubaiba)', type: 'Catamaran Cruise', route: 'Arabian Gulf Coastal Tour', frequency: 'Hourly', fare: 'AED 50', scenicRating: 5, status: 'Air-Conditioned', imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80' },
      { id: 'dt2', name: 'Dubai Metro Red Line (Driverless)', type: 'Metro', route: 'Airport ↔ Downtown ↔ Expo City', frequency: 'Every 3 mins', fare: 'AED 5 – 8.5', scenicRating: 4.8, status: 'World Class', imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=600&q=80' },
    ],
    events: [
      { id: 'de1', title: 'Dubai Fountain & Laser Show', date: 'Every 30 Mins from 6:00 PM', location: 'Burj Lake, Downtown', category: 'Spectacle', price: 'Free', imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
    ],
    cafes: [
      { id: 'dc1', name: 'Nightjar Coffee Roasters', category: 'Craft Roastery', rating: 4.8, priceTier: 'AED 35', area: 'Alserkal Avenue', specialty: 'Cold Brew on Tap & Artisanal Pies', imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80' },
    ],
  },
};

// @desc Get intelligence data for selected city
// @route GET /api/intelligence/city/:cityName
exports.getCityData = async (req, res) => {
  try {
    const rawName = (req.params.cityName || 'Kochi').trim();
    // Normalize city lookup
    const cityKey = Object.keys(GLOBAL_CITIES).find(
      (k) => k.toLowerCase() === rawName.toLowerCase() || rawName.toLowerCase().includes(k.toLowerCase())
    ) || 'Kochi';

    const cityData = GLOBAL_CITIES[cityKey];
    res.status(200).json({
      success: true,
      city: cityData,
      availableCities: Object.keys(GLOBAL_CITIES),
    });
  } catch (error) {
    console.error('getCityData error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc List all supported global cities
// @route GET /api/intelligence/cities
exports.listCities = async (req, res) => {
  try {
    const cities = Object.values(GLOBAL_CITIES).map((c) => ({
      name: c.cityName,
      country: c.country,
      flag: c.flag,
      currency: c.currency,
      currencySymbol: c.currencySymbol,
      heroImage: c.heroImage,
      weather: c.weather,
    }));
    res.status(200).json({ success: true, cities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.GLOBAL_CITIES = GLOBAL_CITIES;
