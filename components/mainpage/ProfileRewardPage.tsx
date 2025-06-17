"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit, FiStar, FiCheck, FiTrash2, FiUser, FiMail, FiPhone, FiMapPin, FiAward, FiClock, FiCalendar, FiGift } from 'react-icons/fi';

type Reward = {
  id: number;
  name: string;
  points: number;
  claimed: boolean;
  image: string;
  description: string;
  category: 'home' | 'lifestyle' | 'tech' | 'fashion';
};

type InventoryItem = {
  id: number;
  name: string;
  dateClaimed: string;
  image: string;
  pointsSpent: number;
};

type Activity = {
  id: number;
  type: 'pickup' | 'reward' | 'level';
  title: string;
  description: string;
  date: string;
  points?: number;
};

export default function ProfilePage() {
  // User data state
  const [user, setUser] = useState({
    name: "Lavinia Nataniela Novyandi",
    email: "lavinia.nataniela@gmail.com",
    phone: "+62 812-3456-7890",
    address: "JL. Merdeka No. 123, Jakarta, Indonesia",
    memberSince: "Jan 2023",
    points: 1250,
    level: "Eco Champion",
    completedPickups: 24,
    scheduledPickups: 3,
    carbonOffset: 56.8, // in kg
    favoriteCategory: 'home',
    inventory: [] as InventoryItem[],
  });

  // Rewards data
  const [rewards, setRewards] = useState<Reward[]>([
    {
      id: 1,
      name: "Stainless Steel Bottle",
      points: 500,
      claimed: false,
      image: "/bottle.jpg",
      description: "Premium insulated water bottle that keeps drinks cold for 24 hours",
      category: 'home'
    },
    {
      id: 2,
      name: "Reusable Grocery Bag Set",
      points: 300,
      claimed: false,
      image: "/bag.jpg",
      description: "Set of 3 organic cotton bags with reinforced stitching",
      category: 'fashion'
    },
    {
      id: 3,
      name: "Solar Charger",
      points: 1200,
      claimed: false,
      image: "/charger.jpg",
      description: "Portable 10W solar-powered charger with USB ports",
      category: 'tech'
    },
    {
      id: 4,
      name: "Bamboo Toothbrush Set",
      points: 250,
      claimed: false,
      image: "/toothbrush.jpg",
      description: "4-pack of biodegradable bamboo toothbrushes",
      category: 'lifestyle'
    },
    {
      id: 5,
      name: "Organic Cotton Tote",
      points: 400,
      claimed: false,
      image: "/tote.jpg",
      description: "Large capacity tote with eco-friendly print",
      category: 'fashion'
    },
    {
      id: 6,
      name: "Compost Bin",
      points: 800,
      claimed: false,
      image: "/compost.jpg",
      description: "Countertop compost bin with charcoal filter",
      category: 'home'
    },
  ]);

  // Activity data
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 1,
      type: 'pickup',
      title: "Plastic Recycling",
      description: "Dropped off 5kg of plastic waste",
      date: "2023-06-15",
      points: 150
    },
    {
      id: 2,
      type: 'reward',
      title: "Redeemed Reward",
      description: "Claimed Stainless Steel Bottle",
      date: "2023-06-10",
      points: -500
    },
    {
      id: 3,
      type: 'level',
      title: "Level Up!",
      description: "Reached Eco Champion status",
      date: "2023-06-05"
    },
    {
      id: 4,
      type: 'pickup',
      title: "Paper Recycling",
      description: "Dropped off 8kg of paper waste",
      date: "2023-05-28",
      points: 120
    },
  ]);

  // UI state
  const [activeTab, setActiveTab] = useState<'activity' | 'rewards' | 'inventory'>('activity');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
  });
  const [rewardFilter, setRewardFilter] = useState<'all' | Reward['category']>('all');
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [selectedInventoryItem, setSelectedInventoryItem] = useState<InventoryItem | null>(null);

  // Determine user badge based on points
  const getUserBadge = () => {
    if (user.points >= 2000) return { 
      name: "Eco Legend", 
      color: "from-purple-500 to-indigo-600",
      nextLevel: null,
      progress: 100
    };
    if (user.points >= 1500) return { 
      name: "Eco Champion", 
      color: "from-teal-500 to-cyan-600",
      nextLevel: "Eco Legend (2000 pts)",
      progress: Math.min(100, ((user.points - 1500) / 500) * 100)
    };
    if (user.points >= 1000) return { 
      name: "Green Guardian", 
      color: "from-emerald-500 to-teal-600",
      nextLevel: "Eco Champion (1500 pts)",
      progress: Math.min(100, ((user.points - 1000) / 500) * 100)
    };
    if (user.points >= 500) return { 
      name: "Eco Explorer", 
      color: "from-blue-500 to-cyan-500",
      nextLevel: "Green Guardian (1000 pts)",
      progress: Math.min(100, ((user.points - 500) / 500) * 100)
    };
    return { 
      name: "Eco Starter", 
      color: "from-green-500 to-emerald-500",
      nextLevel: "Eco Explorer (500 pts)",
      progress: Math.min(100, (user.points / 500) * 100)
    };
  };

  // Handle claiming a reward
  const handleClaimReward = (rewardId: number) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward || reward.claimed || user.points < reward.points) return;

    // Update reward status
    const updatedRewards = rewards.map(r => 
      r.id === rewardId ? { ...r, claimed: true } : r
    );

    // Deduct points and add to inventory
    setUser(prev => ({
      ...prev,
      points: prev.points - reward.points,
      inventory: [
        ...prev.inventory,
        {
          id: Date.now(),
          name: reward.name,
          dateClaimed: new Date().toISOString().split('T')[0],
          image: reward.image,
          pointsSpent: reward.points
        }
      ]
    }));

    // Add to activity
    setActivities(prev => [
      {
        id: Date.now(),
        type: 'reward',
        title: "Redeemed Reward",
        description: `Claimed ${reward.name}`,
        date: new Date().toISOString().split('T')[0],
        points: -reward.points
      },
      ...prev
    ]);

    setRewards(updatedRewards);
    setSelectedReward(null);
  };

  // Handle editing profile
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(prev => ({ ...prev, ...editForm }));
    setIsEditing(false);
  };

  // Handle deleting inventory item
  const handleDeleteItem = (itemId: number) => {
    setUser(prev => ({
      ...prev,
      inventory: prev.inventory.filter(item => item.id !== itemId)
    }));
    setSelectedInventoryItem(null);
  };

  // Filter rewards by category
  const filteredRewards = rewardFilter === 'all' 
    ? rewards 
    : rewards.filter(reward => reward.category === rewardFilter);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const tabContentVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };

  const badgeColors: Record<string, string> = {
    pickup: "bg-blue-100 text-blue-800",
    reward: "bg-amber-100 text-amber-800",
    level: "bg-purple-100 text-purple-800"
  };

  const categoryColors: Record<string, string> = {
    home: "bg-indigo-100 text-indigo-800",
    lifestyle: "bg-emerald-100 text-emerald-800",
    tech: "bg-cyan-100 text-cyan-800",
    fashion: "bg-pink-100 text-pink-800"
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-cyan-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Eco Profile</h1>
            <p className="text-gray-800">Track your sustainability journey</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-amber-100">
              <FiStar className="text-amber-500 mr-2" />
              <span className="font-bold text-gray-800">{user.points.toLocaleString()}</span>
              <span className="ml-1 text-gray-600">pts</span>
            </div>
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full hover:from-green-600 hover:to-teal-600 transition-all shadow-md hover:shadow-lg"
            >
              <FiEdit className="mr-2" />
              Edit Profile
            </button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
            >
              <div className={`h-2 bg-gradient-to-r ${getUserBadge().color}`}></div>
              <div className="p-6">
                <div className="flex flex-col items-center">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="relative w-32 h-32 mb-4 rounded-full bg-gradient-to-br from-green-100 to-cyan-100 overflow-hidden border-4 border-white shadow-md"
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <FiUser className="w-16 h-16" />
                    </div>
                    <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md border border-gray-200">
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${getUserBadge().color}`}></div>
                    </div>
                  </motion.div>
                  
                  <h2 className="text-2xl font-bold text-gray-800 text-center">{user.name}</h2>
                  <p className="text-gray-500 mb-2 text-sm">{user.email}</p>
                  
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className={`mt-2 mb-4 px-4 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${getUserBadge().color} shadow-md`}
                  >
                    {getUserBadge().name}
                  </motion.div>
                </div>
                
                <div className="border-t border-gray-100 pt-4 mt-4 space-y-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-1">
                      <FiMail className="text-gray-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-sm font-medium text-gray-900 break-all">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-1">
                      <FiPhone className="text-gray-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-sm font-medium text-gray-900">{user.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-1">
                      <FiMapPin className="text-gray-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-sm font-medium text-gray-900">{user.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-1">
                      <FiCalendar className="text-gray-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="text-sm font-medium text-gray-900">{user.memberSince}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</span>
                  <span className="text-2xl font-bold text-green-600 my-1">{user.completedPickups}</span>
                  <span className="text-xs text-gray-500">Pickups</span>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Scheduled</span>
                  <span className="text-2xl font-bold text-blue-600 my-1">{user.scheduledPickups}</span>
                  <span className="text-xs text-gray-500">Pickups</span>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Carbon</span>
                  <span className="text-2xl font-bold text-teal-600 my-1">{user.carbonOffset}</span>
                  <span className="text-xs text-gray-500">kg offset</span>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Favorite</span>
                  <span className="text-2xl font-bold text-indigo-600 my-1 capitalize">{user.favoriteCategory}</span>
                  <span className="text-xs text-gray-500">Category</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="flex space-x-1 bg-white p-1 rounded-xl shadow-sm mb-6 border border-gray-200"
            >
              <button
                onClick={() => setActiveTab('activity')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'activity' 
                    ? 'bg-gradient-to-r from-green-100 to-teal-100 text-green-700 shadow-inner' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Activity
              </button>
              <button
                onClick={() => setActiveTab('rewards')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'rewards' 
                    ? 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 shadow-inner' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Rewards
              </button>
              <button
                onClick={() => setActiveTab('inventory')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'inventory' 
                    ? 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 shadow-inner' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                My Items
              </button>
            </motion.div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={tabContentVariants}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
              >
                {/* Activity Tab */}
                {activeTab === 'activity' && (
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold text-gray-800">Your Eco Activity</h2>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Sort by:</span>
                        <select className="text-sm border border-gray-200 rounded-lg px-3 py-1 focus:ring-2 focus:ring-green-500 focus:border-green-500">
                          <option>Recent</option>
                          <option>Points</option>
                          <option>Date</option>
                        </select>
                      </div>
                    </div>
                    
                    {/* Progress to next level */}
                    <div className="mb-8 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-gray-200">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">Your Progress</span>
                        <span className="text-sm font-medium text-gray-600">
                          {user.points.toLocaleString()}{getUserBadge().nextLevel ? `/2000 pts` : ' pts (Max Level)'}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${getUserBadge().progress}%` }}
                          transition={{ duration: 1 }}
                          className={`h-2.5 rounded-full bg-gradient-to-r ${getUserBadge().color}`}
                        ></motion.div>
                      </div>
                      {getUserBadge().nextLevel && (
                        <p className="text-xs text-gray-600">
                          Next level: <span className="font-medium">{getUserBadge().nextLevel}</span>
                        </p>
                      )}
                    </div>
                    
                    {/* Activity Feed */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-800 mb-2">Recent Activity</h3>
                      
                      {activities.length === 0 ? (
                        <div className="text-center py-8">
                          <div className="text-4xl mb-3">📊</div>
                          <h4 className="text-gray-700 font-medium mb-1">No activity yet</h4>
                          <p className="text-gray-500 text-sm">Complete pickups or redeem rewards to see activity here</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {activities.map((activity) => (
                            <motion.div
                              key={activity.id}
                              whileHover={{ scale: 1.01 }}
                              className="flex items-start p-4 bg-white rounded-lg border border-gray-200 hover:border-green-300 transition-all"
                            >
                              <div className={`p-2 rounded-lg mr-4 ${badgeColors[activity.type]}`}>
                                {activity.type === 'pickup' && <FiCheck className="w-4 h-4" />}
                                {activity.type === 'reward' && <FiGift className="w-4 h-4" />}
                                {activity.type === 'level' && <FiAward className="w-4 h-4" />}
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <h4 className="font-medium text-gray-800">{activity.title}</h4>
                                  {activity.points && (
                                    <span className={`text-sm font-medium ${
                                      activity.points > 0 ? 'text-green-600' : 'text-amber-600'
                                    }`}>
                                      {activity.points > 0 ? '+' : ''}{activity.points} pts
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600">{activity.description}</p>
                                <div className="flex items-center mt-2 text-xs text-gray-500">
                                  <FiClock className="mr-1" />
                                  <span>{formatDate(activity.date)}</span>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Rewards Tab */}
                {activeTab === 'rewards' && (
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">Available Rewards</h2>
                        <p className="text-gray-600 text-sm">Redeem your points for eco-friendly products</p>
                      </div>
                      <div className="mt-3 md:mt-0 flex items-center space-x-3">
                        <div className="flex items-center bg-amber-50 px-4 py-2 rounded-full border border-amber-100">
                          <FiStar className="text-amber-500 mr-2" />
                          <span className="font-medium">{user.points.toLocaleString()} points</span>
                        </div>
                        
                        <select
                          value={rewardFilter}
                          onChange={(e) => setRewardFilter(e.target.value as 'all' | Reward['category'])}
                          className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        >
                          <option value="all">All Categories</option>
                          <option value="home">Home</option>
                          <option value="lifestyle">Lifestyle</option>
                          <option value="tech">Tech</option>
                          <option value="fashion">Fashion</option>
                        </select>
                      </div>
                    </div>
                    
                    {filteredRewards.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-5xl mb-4">🎁</div>
                        <h3 className="text-lg font-medium text-gray-700 mb-2">No rewards available</h3>
                        <p className="text-gray-500">Check back later for new eco-friendly rewards</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredRewards.map((reward) => (
                          <motion.div
                            key={reward.id}
                            initial="hidden"
                            animate="visible"
                            variants={cardVariants}
                            whileHover={{ y: -5 }}
                            className={`border rounded-xl overflow-hidden transition-all ${
                              reward.claimed 
                                ? 'border-gray-200 opacity-75' 
                                : 'border-green-200 hover:border-green-300 hover:shadow-md'
                            }`}
                          >
                            <div 
                              className={`h-40 bg-gradient-to-br ${
                                reward.claimed ? 'from-gray-100 to-gray-200' : 'from-green-50 to-blue-50'
                              } flex items-center justify-center cursor-pointer`}
                              onClick={() => setSelectedReward(reward)}
                            >
                              <div className="text-5xl">
                                {reward.category === 'home' && '🏠'}
                                {reward.category === 'lifestyle' && '🧴'}
                                {reward.category === 'tech' && '📱'}
                                {reward.category === 'fashion' && '👕'}
                              </div>
                            </div>
                            <div className="p-5">
                              <div className="flex justify-between items-start mb-3">
                                <h3 className={`font-bold text-lg ${
                                  reward.claimed ? 'text-gray-500' : 'text-gray-800'
                                }`}>
                                  {reward.name}
                                </h3>
                                <div className="flex items-center">
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    categoryColors[reward.category]
                                  }`}>
                                    {reward.category}
                                  </span>
                                </div>
                              </div>
                              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{reward.description}</p>
                              
                              <div className="flex justify-between items-center">
                                <div className="flex items-center bg-amber-100 px-2 py-1 rounded-full">
                                  <FiStar className="text-amber-500 mr-1 text-sm" />
                                  <span className="text-sm font-medium">{reward.points.toLocaleString()}</span>
                                </div>
                                
                                <motion.button
                                  whileHover={!reward.claimed && user.points >= reward.points ? { scale: 1.05 } : {}}
                                  whileTap={!reward.claimed && user.points >= reward.points ? { scale: 0.95 } : {}}
                                  onClick={() => handleClaimReward(reward.id)}
                                  disabled={reward.claimed || user.points < reward.points}
                                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                                    reward.claimed
                                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                      : user.points >= reward.points
                                        ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md hover:shadow-lg'
                                        : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                                  }`}
                                >
                                  {reward.claimed ? 'Claimed' : user.points >= reward.points ? 'Redeem' : 'Need Points'}
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Inventory Tab */}
                {activeTab === 'inventory' && (
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">Your Claimed Items</h2>
                        <p className="text-gray-600 text-sm">All the rewards you've redeemed</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Sort by:</span>
                        <select className="text-sm border border-gray-200 rounded-lg px-3 py-1 focus:ring-2 focus:ring-green-500 focus:border-green-500">
                          <option>Recent</option>
                          <option>Points</option>
                          <option>Name</option>
                        </select>
                      </div>
                    </div>
                    
                    {user.inventory.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-5xl mb-4">📦</div>
                        <h3 className="text-lg font-medium text-gray-700 mb-2">Your inventory is empty</h3>
                        <p className="text-gray-500">Claim rewards from the Rewards tab to see them here</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {user.inventory.map((item) => (
                          <motion.div
                            key={item.id}
                            initial="hidden"
                            animate="visible"
                            variants={cardVariants}
                            whileHover={{ y: -5 }}
                            className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all cursor-pointer"
                            onClick={() => setSelectedInventoryItem(item)}
                          >
                            <div className="h-40 bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
                              <div className="text-5xl">🎁</div>
                            </div>
                            <div className="p-5">
                              <div className="flex justify-between items-start mb-3">
                                <h3 className="font-bold text-lg text-gray-800">
                                  {item.name}
                                </h3>
                                <div className="flex items-center bg-amber-100 px-2 py-1 rounded-full">
                                  <FiStar className="text-amber-500 mr-1 text-xs" />
                                  <span className="text-xs font-medium">{item.pointsSpent}</span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-500">Claimed on {formatDate(item.dateClaimed)}</span>
                                <button className="text-green-600 hover:text-green-700 font-medium">
                                  Details
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isEditing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    ✕
                  </button>
                </div>
                
                <form onSubmit={handleEditSubmit}>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <textarea
                        value={editForm.address}
                        onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        rows={3}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:from-green-600 hover:to-teal-600 transition-colors shadow-md"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reward Detail Modal */}
      <AnimatePresence>
        {selectedReward && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">{selectedReward.name}</h2>
                  <button 
                    onClick={() => setSelectedReward(null)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="h-48 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-7xl">
                    {selectedReward.category === 'home' && '🏠'}
                    {selectedReward.category === 'lifestyle' && '🧴'}
                    {selectedReward.category === 'tech' && '📱'}
                    {selectedReward.category === 'fashion' && '👕'}
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      categoryColors[selectedReward.category]
                    }`}>
                      {selectedReward.category}
                    </span>
                    <div className="flex items-center bg-amber-100 px-3 py-1 rounded-full">
                      <FiStar className="text-amber-500 mr-1" />
                      <span className="font-medium">{selectedReward.points.toLocaleString()} pts</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{selectedReward.description}</p>
                  
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <h4 className="font-medium text-blue-800 mb-1">How to claim</h4>
                    <p className="text-sm text-blue-700">
                      After redemption, you'll receive an email with instructions to claim your reward within 3-5 business days.
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {user.points >= selectedReward.points ? (
                      <span>You have enough points!</span>
                    ) : (
                      <span>You need {selectedReward.points - user.points} more points</span>
                    )}
                  </div>
                  
                  <motion.button
                    whileHover={!selectedReward.claimed && user.points >= selectedReward.points ? { scale: 1.05 } : {}}
                    whileTap={!selectedReward.claimed && user.points >= selectedReward.points ? { scale: 0.95 } : {}}
                    onClick={() => handleClaimReward(selectedReward.id)}
                    disabled={selectedReward.claimed || user.points < selectedReward.points}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedReward.claimed
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : user.points >= selectedReward.points
                          ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md hover:shadow-lg'
                          : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {selectedReward.claimed ? 'Already Claimed' : user.points >= selectedReward.points ? 'Redeem Now' : 'Need More Points'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inventory Detail Modal */}
      <AnimatePresence>
        {selectedInventoryItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">{selectedInventoryItem.name}</h2>
                  <button 
                    onClick={() => setSelectedInventoryItem(null)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="h-48 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-7xl">🎁</div>
                </div>
                
                <div className="mb-6 space-y-4">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Date Claimed</h4>
                      <p className="text-gray-800">{formatDate(selectedInventoryItem.dateClaimed)}</p>
                    </div>
                    <div className="text-right">
                      <h4 className="text-sm font-medium text-gray-500">Points Spent</h4>
                      <div className="flex items-center justify-end">
                        <FiStar className="text-amber-500 mr-1" />
                        <span className="text-gray-800">{selectedInventoryItem.pointsSpent}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                    <h4 className="font-medium text-green-800 mb-1">Redemption Status</h4>
                    <p className="text-sm text-green-700">
                      Your item has been processed and will be shipped within 3-5 business days.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-800 mb-1">Shipping Information</h4>
                    <p className="text-sm text-gray-700">
                      Tracking number: <span className="font-mono">EC{Math.floor(Math.random() * 1000000)}</span>
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      Expected delivery: {formatDate(new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])}
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => {
                      setSelectedInventoryItem(null);
                      handleDeleteItem(selectedInventoryItem.id);
                    }}
                    className="px-4 py-2 border border-red-100 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <FiTrash2 className="inline mr-2" />
                    Remove Item
                  </button>
                  
                  <button
                    onClick={() => setSelectedInventoryItem(null)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-colors shadow-md"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}