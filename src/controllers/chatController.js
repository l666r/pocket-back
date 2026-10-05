const ChatSession = require('../models/ChatMessage');

// Comprehensive Knowledge & Travel Intelligence Engine
function generateAIResponse(userQuery) {
  const q = userQuery.toLowerCase().trim();

  // Greetings
  if (/^(hi|hello|hey|greetings|morning|evening|namaste)/.test(q)) {
    return `👋 **Hello explorer!** I'm your **PocketRoute AI Assistant**.\n\nI can help you plan personalized itineraries, calculate realistic travel budgets, compare transit options (cabs, metro, ferries, buses), recommend hidden local spots, and monitor weather/traffic conditions.\n\n✨ **Try asking:**\n• *"Plan a 3-day trip to Munnar with budget & best viewpoints"*\n• *"How to get from Fort Kochi to Airport during evening rush?"*\n• *"2-day family itinerary under ₹6,000"*\n• *"Top cafe spots and sunset viewpoints in town"*`;
  }

  // Itinerary / Planning Queries
  if (q.includes('plan') || q.includes('itinerary') || q.includes('route') || q.includes('trip') || q.includes('day 1') || q.includes('3 day') || q.includes('2 day') || q.includes('weekend')) {
    let dest = 'your destination';
    if (q.includes('munnar')) dest = 'Munnar';
    else if (q.includes('wayanad')) dest = 'Wayanad';
    else if (q.includes('kochi') || q.includes('cochin') || q.includes('ernakulam')) dest = 'Kochi & Fort Kochi';
    else if (q.includes('alleppey') || q.includes('alappuzha')) dest = 'Alleppey Backwaters';
    else if (q.includes('goa')) dest = 'Goa Coast';
    else if (q.includes('bangalore') || q.includes('bengaluru')) dest = 'Bengaluru';
    else dest = 'Smart Route';

    return `🗺️ **Curated 2-Day Itinerary for ${dest}**\n\n` +
      `📅 **Day 1: Cultural Heritage & Sunset Views**\n` +
      `• **08:30 AM** – Local breakfast stop & morning specialty coffee (₹150)\n` +
      `• **10:00 AM** – Historic promenade & heritage monument exploration (₹50 entry)\n` +
      `• **01:00 PM** – Authentic regional lunch at a top-rated local dining hall (₹350)\n` +
      `• **03:30 PM** – Artisan markets, spice bazaars & craft galleries (Free)\n` +
      `• **05:30 PM** – Waterfront sunset promenade / scenic viewpoint\n` +
      `• **07:30 PM** – Evening cultural performance or relaxed outdoor dinner (₹500)\n\n` +
      `📅 **Day 2: Nature, Transit & Secret Spots**\n` +
      `• **09:00 AM** – Scenic transit corridor (Metro / Ferry / Cable car depending on route)\n` +
      `• **11:00 AM** – Architectural palace or botanical garden walk (₹100)\n` +
      `• **01:30 PM** – Rooftop cafe lunch with panoramic city view (₹400)\n` +
      `• **04:00 PM** – Hidden community-recommended vista or peaceful lakeside park\n\n` +
      `💡 **Smart Transit Tip:** Book morning slots to avoid midday heat and 5:00 PM peak road congestion. Would you like me to push this into your **Plan the Trip** section?`;
  }

  // Budget & Cost Queries
  if (q.includes('budget') || q.includes('cost') || q.includes('cheap') || q.includes('expense') || q.includes('save') || q.includes('money')) {
    return `💰 **PocketRoute Smart Budget Breakdown**\n\n` +
      `Here is a realistic estimate for **2 travelers (2 Days / 1 Night)**:\n\n` +
      `• 🏨 **Stay / Boutique Homestay:** ₹2,200 – ₹3,500\n` +
      `• 🍽️ **Food & Cafes:** ₹1,600 (Breakfast ₹250, Lunch ₹600, Dinner ₹750)\n` +
      `• 🚇 **Smart Transit (Metro / Ferries / Autos):** ₹400 – ₹700 (vs ₹1,800+ for road cabs)\n` +
      `• 🎟️ **Attractions & Monument Passes:** ₹300\n` +
      `• 🛡️ **Buffer / Snacks:** ₹500\n\n` +
      `📊 **Total Estimated:** **₹5,000 – ₹6,600** total (~₹2,500 – ₹3,300 per person)\n\n` +
      `💡 **Pro Hack:** Use public rapid transit and water routes during peak hours (5 PM – 7:30 PM) to simultaneously save both money and over an hour of traffic jams!`;
  }

  // Weather & Sunset
  if (q.includes('weather') || q.includes('rain') || q.includes('temp') || q.includes('sunset') || q.includes('climate') || q.includes('season')) {
    return `⛅ **Live Weather & Optimal Viewing Times**\n\n` +
      `• 🌡️ **Temperature:** 29°C (Feels like 32°C with mild coastal breeze)\n` +
      `• 🌅 **Golden Hour / Sunset:** **6:15 PM – 6:40 PM** (Head to open waterfronts by 5:45 PM)\n` +
      `• 🌧️ **Precipitation:** 15% slight chance of scattered evening drizzle; mostly clear skies\n` +
      `• 💨 **Air Quality & Humidity:** Moderate humidity (72%), ideal for outdoor walking after 4:30 PM\n\n` +
      `🎒 **Pack light:** Sun protection & sunglasses for midday, light rain jacket for evening walks.`;
  }

  // Traffic & Commute
  if (q.includes('traffic') || q.includes('congestion') || q.includes('route') || q.includes('commute') || q.includes('road') || q.includes('cab')) {
    return `🚦 **Traffic & Commute Intelligence**\n\n` +
      `• ⚠️ **Peak Congestion Windows:** **08:30 AM – 10:15 AM** and **05:15 PM – 07:45 PM** on central arterial corridors.\n` +
      `• 🚤 **Ferry & Water Transit Advantage:** Bypasses road bottlenecks with zero congestion. Cross-harbor transit takes only 15–20 mins (₹20–₹40) compared to 45–60 mins by car during rush hour.\n` +
      `• 🚇 **Metro Rail:** High frequency (every 7 mins), fully air-conditioned, zero delay risk.\n` +
      `• 🛵 **Last-Mile:** Metered autos or bike taxis recommended for lanes under 2 km.`;
  }

  // Food & Dining
  if (q.includes('food') || q.includes('eat') || q.includes('cafe') || q.includes('restaurant') || q.includes('dining') || q.includes('coffee') || q.includes('snack') || q.includes('biryani')) {
    return `🍽️ **Curated Culinary & Cafe Recommendations**\n\n` +
      `• ☕ **Art & Coffee Cafes:** Great for quiet mornings, sourdough toast, cold brew, and local art exhibitions.\n` +
      `• 🥘 **Heritage Regional Cuisine:** Famous local banana leaf thali, slow-cooked Malabar biryani, appam with vegetable or mutton stew.\n` +
      `• 🌊 **Waterfront Dining:** Evening alfresco decks with fresh seafood grills, gentle sea breeze, and night skyline views.\n` +
      `• 🍢 **Street Food Bazaars:** Fresh hot pazhampori (banana fritters), spicy chaat, sulaimani tea, and fresh coconut water along evening promenades.`;
  }

  // Places, Sights & Hidden Gems
  if (q.includes('place') || q.includes('sight') || q.includes('visit') || q.includes('attraction') || q.includes('explore') || q.includes('hidden') || q.includes('secret')) {
    return `📍 **Must-Visit Highlights & Hidden Gems**\n\n` +
      `1. 🏛️ **Heritage District & Art Walk:** Century-old architecture, cobblestone alleys, and contemporary art galleries.\n` +
      `2. 🌅 **Waterfront Promenade:** Iconic fishing nets, open maritime horizon, and bustling evening breeze.\n` +
      `3. 🌿 **Canal & Mangrove Eco-Trails:** Silent morning kayak or electric boat tours through serene backwater tributaries.\n` +
      `4. 🎭 **Traditional Performing Arts Center:** Evening classical theater, makeup demonstration, and percussion.\n\n` +
      `Check out the **Contribute Places** tab to view crowd-sourced hidden spots added by local explorers!`;
  }

  // Universal Fallback response with structured help
  return `✨ **PocketRoute AI Travel Analysis for:** *"${userQuery}"*\n\n` +
    `• 📍 **Location Context:** Balanced transit corridors are recommended to maximize sightseeing time while minimizing transit fatigue.\n` +
    `• ⏱️ **Best Timing:** Morning (08:30–11:00 AM) or Late Afternoon (04:30–07:00 PM) for the best experience and photography lighting.\n` +
    `• 💰 **Estimated Spend:** ₹300 – ₹800 depending on activity, dining, and transit choices.\n` +
    `• 🗺️ **Next Step:** You can add this stop directly to your itinerary in **Plan the Trip** or rearrange existing stops in **Re-Arrange your Trip**.\n\n` +
    `Need specific recommendations for hotels, transit passes, or local food spots nearby? Just ask!`;
}

// @desc Send message to AI Chatbot & save to session
// @route POST /api/chat
exports.sendMessage = async (req, res) => {
  try {
    const { message, sessionId, userId } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message text is required' });
    }

    const aiReply = generateAIResponse(message.trim());

    let session;
    if (sessionId) {
      session = await ChatSession.findById(sessionId);
    }

    const currentUserId = userId || 'guest';

    if (!session) {
      session = await ChatSession.create({
        userId: currentUserId,
        title: message.trim().slice(0, 36) + '...',
        messages: [
          { sender: 'user', text: message.trim(), timestamp: new Date() },
          { sender: 'assistant', text: aiReply, timestamp: new Date() },
        ],
      });
    } else {
      // If session was guest and user is now authenticated, claim ownership
      if (currentUserId !== 'guest' && session.userId === 'guest') {
        session.userId = currentUserId;
      }
      session.messages.push({ sender: 'user', text: message.trim(), timestamp: new Date() });
      session.messages.push({ sender: 'assistant', text: aiReply, timestamp: new Date() });
      await session.save();
    }

    res.status(200).json({
      success: true,
      sessionId: session._id,
      userId: session.userId,
      shareCode: session.shareCode,
      reply: aiReply,
      messages: session.messages,
    });
  } catch (error) {
    console.error('sendMessage error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get recent chat sessions for the specific user
// @route GET /api/chat/history
exports.getChatHistory = async (req, res) => {
  try {
    const userId = req.query.userId || 'guest';
    const query = (userId && userId !== 'guest') ? { userId } : { userId: 'guest' };

    const sessions = await ChatSession.find(query)
      .sort({ updatedAt: -1 })
      .limit(20);

    res.status(200).json({ success: true, count: sessions.length, sessions });
  } catch (error) {
    console.error('getChatHistory error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Share a chat session (returns public share URL)
// @route POST /api/chat/share
exports.shareChat = async (req, res) => {
  try {
    const { sessionId } = req.body;
    let session = await ChatSession.findById(sessionId);

    if (!session) {
      // If no session exists yet, create one from current snapshot
      const { messages } = req.body;
      session = await ChatSession.create({
        userId: 'guest',
        title: messages && messages[0] ? messages[0].text.slice(0, 32) : 'Shared PocketRoute Chat',
        messages: messages || [],
      });
    }

    res.status(200).json({
      success: true,
      shareCode: session.shareCode,
      shareUrl: `${req.protocol}://${req.get('host')}/shared/chat/${session.shareCode}`,
      session,
    });
  } catch (error) {
    console.error('shareChat error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get public shared chat by shareCode
// @route GET /api/chat/share/:shareCode
exports.getSharedChat = async (req, res) => {
  try {
    const { shareCode } = req.params;
    const session = await ChatSession.findOne({ shareCode });

    if (!session) {
      return res.status(404).json({ success: false, message: 'Shared conversation not found' });
    }

    res.status(200).json({ success: true, session });
  } catch (error) {
    console.error('getSharedChat error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get a single chat session with full messages
// @route GET /api/chat/session/:sessionId
exports.getSingleChatSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await ChatSession.findById(sessionId);

    if (!session) {
      return res.status(404).json({ success: false, message: 'Chat session not found' });
    }

    res.status(200).json({ success: true, session });
  } catch (error) {
    console.error('getSingleChatSession error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete a specific chat session from MongoDB
// @route DELETE /api/chat/:sessionId
exports.deleteChatSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await ChatSession.findByIdAndDelete(sessionId);

    if (!session) {
      return res.status(404).json({ success: false, message: 'Chat conversation not found' });
    }

    res.status(200).json({ success: true, message: 'Chat conversation deleted successfully' });
  } catch (error) {
    console.error('deleteChatSession error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Clear all chat history for a user
// @route DELETE /api/chat
exports.clearAllChats = async (req, res) => {
  try {
    const userId = req.query.userId || 'guest';
    await ChatSession.deleteMany({ userId });

    res.status(200).json({ success: true, message: 'All conversations cleared successfully' });
  } catch (error) {
    console.error('clearAllChats error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

