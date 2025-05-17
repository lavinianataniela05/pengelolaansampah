"use client";

import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

// Type definitions
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: string;
  level: string;
}

interface RecyclingStats {
  totalItems: number;
  plastic: number;
  paper: number;
  glass: number;
  metal: number;
  co2Saved: number;
  points: number;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  image: string;
  claimed: boolean;
  partner?: string;
}

const ProfileRewardPage: NextPage = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'rewards'>('profile');

  // User data
  const user: User = {
    id: 'user-123',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    joinDate: 'January 2023',
    level: 'Eco Champion',
  };

  // Recycling stats
  const stats: RecyclingStats = {
    totalItems: 247,
    plastic: 112,
    paper: 68,
    glass: 42,
    metal: 25,
    co2Saved: 48.3,
    points: 1250,
  };

  // Badges data
  const badges: Badge[] = [
    {
      id: '1',
      name: 'Recycling Rookie',
      description: 'Recycled your first 10 items',
      icon: '🥇',
      earned: true,
    },
    {
      id: '2',
      name: 'Plastic Warrior',
      description: 'Recycled 50 plastic items',
      icon: '♻️',
      earned: true,
    },
    {
      id: '3',
      name: 'Eco Hero',
      description: 'Saved 20kg of CO2',
      icon: '🌍',
      earned: true,
    },
    {
      id: '4',
      name: 'Master Recycler',
      description: 'Recycled 500 items total',
      icon: '🏆',
      earned: false,
    },
    {
      id: '5',
      name: 'Trash Terminator',
      description: 'Recycled all material types',
      icon: '🦸',
      earned: false,
    },
  ];

  // Rewards data
  const rewards: Reward[] = [
    {
      id: '1',
      title: 'Eco-Friendly Water Bottle',
      description: 'Stainless steel water bottle with your name engraved',
      points: 800,
      image: '/water-bottle.jpg',
      claimed: false,
    },
    {
      id: '2',
      title: 'Local Coffee Shop Coupon',
      description: '$5 coupon for your next purchase at Green Beans Cafe',
      points: 500,
      image: '/coffee-cup.jpg',
      claimed: true,
      partner: 'Green Beans Cafe',
    },
    {
      id: '3',
      title: 'Reusable Shopping Bag Set',
      description: 'Set of 3 durable canvas shopping bags',
      points: 600,
      image: '/shopping-bags.jpg',
      claimed: false,
    },
    {
      id: '4',
      title: 'Tree Planting Certificate',
      description: 'We\'ll plant a tree in your name with One Tree Planted',
      points: 1000,
      image: '/tree-planting.jpg',
      claimed: false,
      partner: 'One Tree Planted',
    },
    {
      id: '5',
      title: 'Solar Charger',
      description: 'Portable solar charger for your devices',
      points: 1500,
      image: '/solar-charger.jpg',
      claimed: false,
    },
    {
      id: '6',
      title: 'Organic Cotton T-Shirt',
      description: 'Eco-friendly t-shirt made from organic cotton',
      points: 1200,
      image: '/tshirt.jpg',
      claimed: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Profile & Rewards | EcoRecycle</title>
        <meta name="description" content="Your recycling profile and rewards" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        {/* Header with tabs */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">My Eco Account</h1>
          
          <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm border border-gray-200">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'profile' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('rewards')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'rewards' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Rewards
            </button>
          </div>
        </div>

        {/* Points Banner - Always visible */}
        <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-lg shadow-lg p-6 text-white mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-xl font-bold mb-1">Your Eco Points</h2>
              <p className="opacity-90">Recycle more to earn more rewards</p>
            </div>
            <div className="mt-4 md:mt-0 bg-white bg-opacity-20 rounded-full px-6 py-3">
              <p className="text-sm font-medium">Current balance</p>
              <p className="text-2xl font-bold flex items-center">
                <span className="mr-2">⭐</span> {stats.points.toLocaleString()} pts
              </p>
            </div>
          </div>
        </div>

        {/* Profile Tab Content */}
        {activeTab === 'profile' && (
          <>
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-lg shadow p-6 mb-8">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mr-4 overflow-hidden">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl">👤</span>
                  )}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-500">Member since {user.joinDate}</p>
                </div>
              </div>
              <div className="bg-green-50 px-4 py-2 rounded-lg">
                <p className="text-sm text-green-800 font-medium">Level</p>
                <p className="text-lg font-bold text-green-600">{user.level}</p>
              </div>
            </div>

            {/* Stats Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Recycling Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <StatCard
                  title="Total Items Recycled"
                  value={stats.totalItems}
                  icon="🔄"
                  color="bg-blue-100"
                  textColor="text-blue-800"
                />
                <StatCard
                  title="CO₂ Saved"
                  value={`${stats.co2Saved} kg`}
                  icon="🌱"
                  color="bg-green-100"
                  textColor="text-green-800"
                />
                <StatCard
                  title="Eco Points"
                  value={stats.points}
                  icon="⭐"
                  color="bg-yellow-100"
                  textColor="text-yellow-800"
                />
              </div>

              {/* Material Breakdown */}
              <div className="mt-6 bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Material Breakdown</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <MaterialStat name="Plastic" value={stats.plastic} color="bg-blue-200" />
                  <MaterialStat name="Paper" value={stats.paper} color="bg-amber-200" />
                  <MaterialStat name="Glass" value={stats.glass} color="bg-emerald-200" />
                  <MaterialStat name="Metal" value={stats.metal} color="bg-gray-300" />
                </div>
              </div>
            </section>

            {/* Badges Section */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Badges</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {badges.map((badge) => (
                  <BadgeCard key={badge.id} badge={badge} />
                ))}
              </div>
            </section>
          </>
        )}

        {/* Rewards Tab Content */}
        {activeTab === 'rewards' && (
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Available Rewards</h2>
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Sort by: Points (Low to High)</option>
                  <option>Sort by: Points (High to Low)</option>
                  <option>Sort by: Newest</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewards.map((reward) => (
                <RewardCard key={reward.id} reward={reward} userPoints={stats.points} />
              ))}
            </div>

            {/* How it works */}
            <section className="mt-12 bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">How Rewards Work</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Earn Points</h3>
                    <p className="text-gray-600 text-sm">Recycle items at our centers to earn points based on material type and quantity.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Browse Rewards</h3>
                    <p className="text-gray-600 text-sm">Choose from various eco-friendly products, services, and experiences.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Redeem & Enjoy</h3>
                    <p className="text-gray-600 text-sm">Exchange your points for rewards and enjoy your eco-friendly perks!</p>
                  </div>
                </div>
              </div>
            </section>
          </section>
        )}
      </main>
    </div>
  );
};

// Component for stat cards
const StatCard = ({ title, value, icon, color, textColor }: { title: string; value: string | number; icon: string; color: string; textColor: string }) => (
  <div className={`${color} p-4 rounded-lg shadow`}>
    <div className="flex items-center">
      <span className="text-2xl mr-3">{icon}</span>
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
      </div>
    </div>
  </div>
);

// Component for material stats
const MaterialStat = ({ name, value, color }: { name: string; value: number; color: string }) => (
  <div className="flex items-center">
    <div className={`w-4 h-4 rounded-full ${color} mr-2`}></div>
    <span className="text-gray-700 font-medium">{name}:</span>
    <span className="ml-2 font-bold">{value}</span>
  </div>
);

// Component for badge cards
const BadgeCard = ({ badge }: { badge: Badge }) => (
  <div className={`bg-white rounded-lg shadow overflow-hidden border-2 ${badge.earned ? 'border-yellow-400' : 'border-gray-200 opacity-60'}`}>
    <div className="p-4">
      <div className="text-4xl text-center mb-3">{badge.icon}</div>
      <h3 className="font-bold text-center text-gray-800">{badge.name}</h3>
      <p className="text-sm text-gray-600 text-center mt-1">{badge.description}</p>
    </div>
    <div className={`px-4 py-2 text-center text-sm font-medium ${badge.earned ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-500'}`}>
      {badge.earned ? 'Earned' : 'Locked'}
    </div>
  </div>
);

// Component for reward cards
const RewardCard = ({ reward, userPoints }: { reward: Reward; userPoints: number }) => {
  const canClaim = userPoints >= reward.points && !reward.claimed;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 bg-gray-200 overflow-hidden">
        {/* In a real app, you would use next/image for optimized images */}
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          {reward.image ? (
            <img src={reward.image} alt={reward.title} className="w-full h-full object-cover" />
          ) : (
            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )}
        </div>
      </div>
      <div className="p-5">
        {reward.partner && (
          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mb-2">
            {reward.partner}
          </span>
        )}
        <h3 className="font-bold text-lg text-gray-800 mb-1">{reward.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{reward.description}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">⭐</span>
            <span className="font-bold">{reward.points.toLocaleString()} pts</span>
          </div>
          
          {reward.claimed ? (
            <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
              Claimed
            </span>
          ) : canClaim ? (
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Redeem Now
            </button>
          ) : (
            <span className="text-gray-500 text-sm">
              Need {reward.points - userPoints} more pts
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileRewardPage;