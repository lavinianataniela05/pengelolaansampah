'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { 
  Leaf, LeafyGreen, Recycle, TreePine, Sun, Zap, 
  BarChart2, Settings, LogOut, Home, Award, Bell
} from 'lucide-react'
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell } from 'recharts'

const energyData = [
  { name: 'Jan', usage: 400 },
  { name: 'Feb', usage: 300 },
  { name: 'Mar', usage: 200 },
  { name: 'Apr', usage: 278 },
  { name: 'May', usage: 189 },
  { name: 'Jun', usage: 150 },
]

const wasteData = [
  { name: 'Recycled', value: 75 },
  { name: 'Composted', value: 15 },
  { name: 'Landfill', value: 10 },
]

const COLORS = ['#10B981', '#34D399', '#6EE7B7']

export default function DashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('dashboard')

  const handleLogout = () => {
    // Add logout logic here
    router.push('/login')
  }

  return (
    <div className="flex min-h-screen bg-green-50">
     
      {/* Main Content */}
      <div className="ml-64 p-8 w-full">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-green-900">Dashboard</h1>
            <p className="text-green-600">Welcome back, John! Here's your sustainability overview.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="w-6 h-6 text-green-700 cursor-pointer hover:text-green-500 transition-colors" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
            </div>
            <div className="relative cursor-pointer">
              <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center text-white font-semibold">
                JD
              </div>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 mr-4">
                <Sun className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-green-600">Energy Saved</p>
                <h3 className="text-2xl font-bold text-green-900">1,245 kWh</h3>
                <p className="text-xs text-green-500 mt-1">+12% from last month</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <Recycle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-blue-600">Waste Diverted</p>
                <h3 className="text-2xl font-bold text-blue-900">87%</h3>
                <p className="text-xs text-blue-500 mt-1">+5% from last month</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-amber-100 mr-4">
                <TreePine className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-amber-600">Carbon Reduced</p>
                <h3 className="text-2xl font-bold text-amber-900">2.4 tons</h3>
                <p className="text-xs text-amber-500 mt-1">Equivalent to 56 trees</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 mr-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-purple-600">Renewable Energy</p>
                <h3 className="text-2xl font-bold text-purple-900">65%</h3>
                <p className="text-xs text-purple-500 mt-1">Of total usage</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-green-800">Energy Usage Trend</h3>
              <div className="flex space-x-2">
                <div className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Monthly</div>
                <div className="px-3 py-1 text-xs font-medium rounded-full bg-green-50 text-green-600 cursor-pointer hover:bg-green-100 transition-colors">Weekly</div>
              </div>
            </div>
            <div className="h-64">
              <LineChart width={500} height={240} data={energyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <Line 
                  type="monotone" 
                  dataKey="usage" 
                  stroke="#10B981" 
                  strokeWidth={2} 
                  dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#ffffff' }}
                />
              </LineChart>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-green-800">Waste Composition</h3>
              <div className="text-sm text-green-600 cursor-pointer hover:text-green-700 transition-colors">See details</div>
            </div>
            <div className="h-64 flex">
              <div className="w-1/2 flex items-center justify-center">
                <PieChart width={200} height={200}>
                  <Pie
                    data={wasteData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {wasteData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </div>
              <div className="w-1/2 flex flex-col justify-center">
                {wasteData.map((item, index) => (
                  <div key={index} className="flex items-center mb-3">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="text-sm text-gray-700">{item.name}: {item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-green-800">Quick Actions</h3>
            <div className="text-sm text-green-600 cursor-pointer hover:text-green-700 transition-colors">View all</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
              <div className="p-3 rounded-full bg-green-100 mb-2">
                <Recycle className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm font-medium text-green-800">Schedule Pickup</span>
            </button>

            <button className="flex flex-col items-center p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
              <div className="p-3 rounded-full bg-blue-100 mb-2">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-blue-800">Energy Audit</span>
            </button>

            <button className="flex flex-col items-center p-4 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors">
              <div className="p-3 rounded-full bg-amber-100 mb-2">
                <TreePine className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-sm font-medium text-amber-800">Offset Carbon</span>
            </button>

            <button className="flex flex-col items-center p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
              <div className="p-3 rounded-full bg-purple-100 mb-2">
                <Leaf className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-purple-800">Sustainability Tips</span>
            </button>
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 mt-8 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-green-800">Recent Activity</h3>
            <div className="text-sm text-green-600 cursor-pointer hover:text-green-700 transition-colors">View all</div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center p-3 hover:bg-green-50 rounded-lg transition-colors">
              <div className="p-2 rounded-full bg-green-100 mr-4">
                <Zap className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">Energy usage reduced by 12%</p>
                <p className="text-xs text-gray-500">Yesterday at 2:30 PM</p>
              </div>
            </div>
            <div className="flex items-center p-3 hover:bg-green-50 rounded-lg transition-colors">
              <div className="p-2 rounded-full bg-blue-100 mr-4">
                <Recycle className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">Recycling pickup completed</p>
                <p className="text-xs text-gray-500">May 14, 2025 at 10:15 AM</p>
              </div>
            </div>
            <div className="flex items-center p-3 hover:bg-green-50 rounded-lg transition-colors">
              <div className="p-2 rounded-full bg-amber-100 mr-4">
                <TreePine className="w-4 h-4 text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">Donated to reforestation project</p>
                <p className="text-xs text-gray-500">May 12, 2025 at 3:45 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}