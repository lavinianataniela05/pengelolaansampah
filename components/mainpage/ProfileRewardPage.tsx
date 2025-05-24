

"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEdit, FiStar, FiCheck, FiTrash2, FiUser, FiMail, FiPhone, FiMapPin, FiAward } from 'react-icons/fi';

type Reward = {
  id: number;
  name: string;
  points: number;
  claimed: boolean;
  image: string;
  description: string;
};

type InventoryItem = {
  id: number;
  name: string;
  dateClaimed: string;
  image: string;
};

export default function ProfilePage() {
  // User data state
  const [user, setUser] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (234) 567-8900",
    address: "123 Green Street, Eco City",
    memberSince: "Jan 2023",
    points: 1850,
    level: "Eco Champion",
    completedPickups: 24,
    scheduledPickups: 3,
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
      description: "Premium insulated water bottle"
    },
    {
      id: 2,
      name: "Reusable Grocery Bag",
      points: 300,
      claimed: false,
      image: "/bag.jpg",
      description: "Set of 3 organic cotton bags"
    },
    {
      id: 3,
      name: "Solar Charger",
      points: 1200,
      claimed: false,
      image: "/charger.jpg",
      description: "Portable solar-powered charger"
    },
    {
      id: 4,
      name: "Bamboo Toothbrush Set",
      points: 250,
      claimed: false,
      image: "/toothbrush.jpg",
      description: "Eco-friendly bamboo toothbrushes"
    },
  ]);

  // UI state
  const [activeTab, setActiveTab] = useState<'profile' | 'rewards' | 'inventory'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
  });

  // Determine user badge based on points
  const getUserBadge = () => {
    if (user.points >= 2000) return { name: "Eco Legend", color: "from-purple-500 to-purple-600" };
    if (user.points >= 1500) return { name: "Eco Champion", color: "from-teal-500 to-teal-600" };
    if (user.points >= 1000) return { name: "Green Guardian", color: "from-emerald-500 to-emerald-600" };
    if (user.points >= 500) return { name: "Eco Explorer", color: "from-blue-500 to-blue-600" };
    return { name: "Eco Starter", color: "from-green-500 to-green-600" };
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
          dateClaimed: new Date().toLocaleDateString(),
          image: reward.image
        }
      ]
    }));

    setRewards(updatedRewards);
  };

  // Handle editing profile
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(prev => ({ ...prev, ...editForm }));
    setIsEditing(false);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const tabContentVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    <div className="p-8 bg-green-50 min-h-screen">
      <div className="container mx-auto px-2 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">My Eco Profile</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <FiStar className="text-amber-500 mr-2" />
              <span className="font-bold text-gray-800">{user.points}</span>
              <span className="ml-1 text-gray-600">pts</span>
            </div>
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors shadow-md"
            >
              <FiEdit className="mr-2" />
              Edit Profile
            </button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className={`h-3 bg-gradient-to-r ${getUserBadge().color}`}></div>
              <div className="p-6">
                <div className="flex flex-col items-center">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="relative w-32 h-32 mb-4 rounded-full bg-gradient-to-br from-green-100 to-cyan-100 overflow-hidden border-4 border-white shadow-md"
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <FiUser className="w-16 h-16" />
                    </div>
                  </motion.div>
                  
                  <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                  <p className="text-gray-500 mb-2">{user.email}</p>
                  
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className={`mt-2 mb-4 px-4 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${getUserBadge().color} shadow-md`}
                  >
                    {getUserBadge().name}
                  </motion.div>
                </div>
                
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600 flex items-center">
                      <FiMail className="mr-2" /> Email:
                    </span>
                    <span className="font-medium truncate">{user.email}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600 flex items-center">
                      <FiPhone className="mr-2" /> Phone:
                    </span>
                    <span className="font-medium">{user.phone}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600 flex items-center">
                      <FiMapPin className="mr-2" /> Address:
                    </span>
                    <span className="font-medium text-right">{user.address}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Member Since:</span>
                    <span className="font-medium">{user.memberSince}</span>
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
              className="grid grid-cols-2 gap-4 mt-6"
            >
              <div className="bg-white rounded-xl shadow-md p-5">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Completed</span>
                  <span className="text-2xl font-bold text-green-600">{user.completedPickups}</span>
                  <span className="text-xs text-gray-500 mt-1">Pickups</span>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-5">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-500">Scheduled</span>
                  <span className="text-2xl font-bold text-blue-600">{user.scheduledPickups}</span>
                  <span className="text-xs text-gray-500 mt-1">Pickups</span>
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
              className="flex space-x-1 bg-white p-1 rounded-xl shadow-sm mb-6"
            >
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'profile' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Activity
              </button>
              <button
                onClick={() => setActiveTab('rewards')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'rewards' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Rewards
              </button>
              <button
                onClick={() => setActiveTab('inventory')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'inventory' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`}
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
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Recycling Activity</h2>
                    
                    {/* Progress to next level */}
                    <div className="mb-8">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">Progress to {getUserBadge().name}</span>
                        <span className="text-sm font-medium text-gray-600">{user.points}/2000 pts</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, (user.points / 2000) * 100)}%` }}
                          transition={{ duration: 1 }}
                          className={`h-3 rounded-full bg-gradient-to-r ${getUserBadge().color}`}
                        ></motion.div>
                      </div>
                    </div>
                    
                    {/* Recent Activity */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-4">Recent Achievements</h3>
                      <div className="space-y-4">
                        <motion.div 
                          whileHover={{ scale: 1.02 }}
                          className="flex items-center p-4 bg-green-50 rounded-lg border border-green-100"
                        >
                          <div className="p-3 bg-green-100 rounded-full mr-4">
                            <FiAward className="text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">Plastic Warrior</h4>
                            <p className="text-sm text-gray-600">Recycled 50+ plastic items</p>
                          </div>
                        </motion.div>
                        
                        <motion.div 
                          whileHover={{ scale: 1.02 }}
                          className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-100"
                        >
                          <div className="p-3 bg-blue-100 rounded-full mr-4">
                            <FiCheck className="text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">Weekly Challenge</h4>
                            <p className="text-sm text-gray-600">Completed 5 pickups in one week</p>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Rewards Tab */}
                {activeTab === 'rewards' && (
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold text-gray-800">Available Rewards</h2>
                      <div className="flex items-center bg-amber-50 px-4 py-2 rounded-full">
                        <FiStar className="text-amber-500 mr-2" />
                        <span className="font-medium">{user.points} points available</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {rewards.map((reward, index) => (
                        <motion.div
                          key={reward.id}
                          initial="hidden"
                          animate="visible"
                          variants={cardVariants}
                          transition={{ delay: index * 0.1 }}
                          className={`border rounded-xl overflow-hidden ${reward.claimed ? 'border-gray-200 opacity-75' : 'border-green-200'}`}
                        >
                          <div className="h-40 bg-gradient-to-r from-green-50  flex items-center justify-center">
                            <div className="text-5xl">🎁</div>
                          </div>
                          <div className="p-5">
                            <div className="flex justify-between items-start mb-3">
                              <h3 className={`font-bold text-lg ${reward.claimed ? 'text-gray-500' : 'text-gray-800'}`}>
                                {reward.name}
                              </h3>
                              <div className="flex items-center bg-amber-100 px-2 py-1 rounded-full">
                                <FiStar className="text-amber-500 mr-1" />
                                <span className="text-sm font-medium">{reward.points}</span>
                              </div>
                            </div>
                            <p className="text-gray-600 text-sm mb-4">{reward.description}</p>
                            
                            <motion.button
                              whileHover={!reward.claimed && user.points >= reward.points ? { scale: 1.05 } : {}}
                              whileTap={!reward.claimed && user.points >= reward.points ? { scale: 0.95 } : {}}
                              onClick={() => handleClaimReward(reward.id)}
                              disabled={reward.claimed || user.points < reward.points}
                              className={`w-full py-2 rounded-lg text-sm font-medium ${
                                reward.claimed
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  : user.points >= reward.points
                                    ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md hover:shadow-lg'
                                    : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                              }`}
                            >
                              {reward.claimed ? 'Claimed' : user.points >= reward.points ? 'Redeem Now' : 'Need More Points'}
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Inventory Tab */}
                {activeTab === 'inventory' && (
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Claimed Items</h2>
                    
                    {user.inventory.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-5xl mb-4">📦</div>
                        <h3 className="text-lg font-medium text-gray-700 mb-2">Your inventory is empty</h3>
                        <p className="text-gray-500">Claim rewards from the Rewards tab to see them here</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {user.inventory.map((item, index) => (
                          <motion.div
                            key={item.id}
                            initial="hidden"
                            animate="visible"
                            variants={cardVariants}
                            transition={{ delay: index * 0.1 }}
                            className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                          >
                            <div className="h-40 bg-gradient-to-r from-blue-50 to-cyan-50 flex items-center justify-center">
                              <div className="text-5xl">🎁</div>
                            </div>
                            <div className="p-5">
                              <div className="flex justify-between items-start mb-3">
                                <h3 className="font-bold text-lg text-gray-800">
                                  {item.name}
                                </h3>
                                <button className="text-gray-400 hover:text-red-500 transition-colors">
                                  <FiTrash2 />
                                </button>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Claimed on {item.dateClaimed}</span>
                                <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                                  View Details
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
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Profile</h2>
                
                <form onSubmit={handleEditSubmit}>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        type="text"
                        value={editForm.address}
                        onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
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
    </div>
  );
}