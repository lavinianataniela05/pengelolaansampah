'use client'

import { motion } from 'framer-motion'
import { Gauge, Calendar, Package, Truck, Clock, CheckCircle, Leaf, Recycle, TrendingUp, Plus, Filter, Download, MapPin, User, Phone } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function WasteTracking() {
  const router = useRouter()
  
  const collectionHistory = [
    {
      id: 1,
      pickupTime: "09:30 AM",
      date: "2023-11-15",
      kilos: "12.5 kg",
      wasteType: "Plastic Bottles & Containers",
      address: "123 Green Street, Eco District, Jakarta 12345",
      status: "Completed",
      statusColor: "text-green-700 bg-green-50 border-green-200",
      icon: <CheckCircle className="w-4 h-4" />,
      collector: "EcoWaste Team A",
      phone: "+62 821-1234-5678",
      notes: "Sorted and cleaned containers"
    },
    {
      id: 2,
      pickupTime: "02:15 PM",
      date: "2023-11-14",
      kilos: "8.2 kg",
      wasteType: "Paper & Cardboard",
      address: "123 Green Street, Eco District, Jakarta 12345",
      status: "In Transit",
      statusColor: "text-blue-700 bg-blue-50 border-blue-200",
      icon: <Truck className="w-4 h-4" />,
      collector: "EcoWaste Team B",
      phone: "+62 821-1234-5679",
      notes: "Bundled and ready for processing"
    },
    {
      id: 3,
      pickupTime: "11:45 AM",
      date: "2023-11-12",
      kilos: "5.7 kg",
      wasteType: "Electronic Waste",
      address: "123 Green Street, Eco District, Jakarta 12345",
      status: "Processing",
      statusColor: "text-amber-700 bg-amber-50 border-amber-200",
      icon: <Clock className="w-4 h-4" />,
      collector: "TechRecycle Specialists",
      phone: "+62 821-1234-5680",
      notes: "Requires special handling"
    },
    {
      id: 4,
      pickupTime: "08:00 AM",
      date: "2023-11-10",
      kilos: "15.3 kg",
      wasteType: "Organic Waste",
      address: "123 Green Street, Eco District, Jakarta 12345",
      status: "Composted",
      statusColor: "text-green-700 bg-green-50 border-green-200",
      icon: <CheckCircle className="w-4 h-4" />,
      collector: "Green Compost Co.",
      phone: "+62 821-1234-5681",
      notes: "Converted to organic fertilizer"
    },
    {
      id: 5,
      pickupTime: "01:30 PM",
      date: "2023-11-08",
      kilos: "9.8 kg",
      wasteType: "Mixed Recyclables",
      address: "123 Green Street, Eco District, Jakarta 12345",
      status: "Completed", 
      statusColor: "text-green-700 bg-green-50 border-green-200",
      icon: <CheckCircle className="w-4 h-4" />,
      collector: "EcoWaste Team A",
      phone: "+62 821-1234-5678",
      notes: "Metal and glass separated"
    }
  ]

  const stats = [
    { 
      name: "Total Collected", 
      value: "51.5 kg", 
      icon: <Recycle className="w-5 h-5" />,
      change: "+12% from last month",
      color: "text-green-600"
    },
    { 
      name: "This Month", 
      value: "26.4 kg", 
      icon: <Calendar className="w-5 h-5" />,
      change: "12 pickups completed",
      color: "text-green-600"
    },
    { 
      name: "CO₂ Saved", 
      value: "23.7 kg", 
      icon: <Leaf className="w-5 h-5" />,
      change: "Equivalent to 120km car ride",
      color: "text-green-600"
    }
  ]

  const upcomingPickups = [
    {
      date: "Tomorrow",
      time: "10:00 AM",
      type: "General Recyclables",
      collector: "EcoWaste Team A"
    },
    {
      date: "Nov 18, 2023",
      time: "02:00 PM", 
      type: "Organic Waste",
      collector: "Green Compost Co."
    }
  ]

  const handleFilterClick = () => {
    // Add your filter logic here
    console.log("Filter button clicked")
    // Or open a filter modal/dialog
    // setShowFilterModal(true)
  }

  const handleSchedulePickup = () => {
    // Add your schedule pickup logic here
    console.log("Schedule Pickup button clicked")
    // Or navigate to schedule pickup page
    // router.push('/schedule-pickup')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-25 to-green-50" style={{ background: 'linear-gradient(135deg, #fafff9 0%, #f0fdf4 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start">
              <div className="bg-green-100 p-3 rounded-xl mr-4 shadow-sm">
                <Recycle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Waste Collection</h1>
                <p className="text-gray-600 mt-1 text-base">Track your pickup history and schedule</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleFilterClick}
                className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 flex items-center transition-all duration-200 shadow-sm text-sm"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSchedulePickup}
                className="bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700 flex items-center transition-all duration-200 shadow-md text-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Schedule Pickup
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Rest of your component remains the same */}
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}
              className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="bg-green-50 p-2 rounded-lg">
                  <div className={stat.color}>
                    {stat.icon}
                  </div>
                </div>
                <div className="flex items-center text-green-600 text-xs bg-green-50 px-2 py-1 rounded-full">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  <span className="font-medium">+12%</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-600 font-medium">{stat.name}</p>
                <p className="text-xs text-gray-500 mt-2">{stat.change}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Upcoming Pickups Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 h-fit"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-green-600" />
              Upcoming Pickups
            </h3>
            <div className="space-y-3">
              {upcomingPickups.map((pickup, index) => (
                <div key={index} className="bg-green-50 rounded-lg p-3 border border-green-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-green-800">{pickup.date}</span>
                    <span className="text-xs text-green-600">{pickup.time}</span>
                  </div>
                  <p className="text-sm text-gray-700 font-medium">{pickup.type}</p>
                  <p className="text-xs text-gray-500 mt-1">{pickup.collector}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Collection History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-green-50 to-green-25">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <Truck className="w-5 h-5 mr-2 text-green-600" />
                    Collection History
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">Detailed pickup records and tracking information</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Total Collections</div>
                  <div className="text-xl font-bold text-green-600">{collectionHistory.length}</div>
                </div>
              </div>
            </div>
            
            <div className="divide-y divide-gray-100">
              {collectionHistory.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  whileHover={{ 
                    backgroundColor: "rgba(240, 253, 244, 0.5)",
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className="p-5 transition-all duration-300"
                >
                  <div className="flex flex-col">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-green-100 p-2 rounded-lg mt-1">
                          <Package className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-gray-800">{item.wasteType}</h3>
                          <div className="flex items-center text-xs text-gray-600 mt-1">
                            <Clock className="w-3 h-3 mr-1" />
                            {item.date} at {item.pickupTime}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-800">{item.kilos}</div>
                        <div className="text-xs text-gray-500">Weight</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center mb-1">
                          <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-xs font-medium text-gray-700">Pickup Address</span>
                        </div>
                        <p className="text-xs text-gray-600">{item.address}</p>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center mb-1">
                          <User className="w-4 h-4 text-gray-500 mr-2" />
                          <span className="text-xs font-medium text-gray-700">Collector</span>
                        </div>
                        <p className="text-xs text-gray-600">{item.collector}</p>
                        <div className="flex items-center mt-1">
                          <Phone className="w-3 h-3 text-gray-400 mr-1" />
                          <span className="text-xs text-gray-500">{item.phone}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-3 py-1.5 inline-flex items-center text-xs font-medium rounded-full border ${item.statusColor}`}>
                          <span className="mr-1.5">{item.icon}</span>
                          {item.status}
                        </span>
                        {item.notes && (
                          <span className="text-xs text-gray-600 bg-gray-100 px-2.5 py-1.5 rounded-full">
                            {item.notes}
                          </span>
                        )}
                      </div>
                      
                      <motion.button
                        whileHover={{ x: 3 }}
                        className="text-green-600 hover:text-green-800 font-medium text-xs flex items-center transition-colors self-end xs:self-auto"
                      >
                        View Details
                        <svg className="w-3 h-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Environmental Impact Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-5 text-white shadow-md"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start md:items-center">
              <div className="bg-white/20 p-2 rounded-lg mr-3">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Environmental Impact</h3>
                <p className="text-green-100 mt-1 text-sm">Your waste collection efforts have made a positive impact</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">23.7 kg</div>
              <div className="text-green-100 text-sm">CO₂ Emissions Prevented</div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}