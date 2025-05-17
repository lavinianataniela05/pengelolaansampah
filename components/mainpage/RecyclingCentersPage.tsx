'use client'

import { motion } from 'framer-motion'
import { MapPin, Recycle, ArrowRight, Search, Filter } from 'lucide-react'

export default function RecyclingCenters() {
  const centers = [
    {
      id: 1,
      name: "Green Valley Recycling",
      address: "123 Eco Drive, Portland, OR",
      distance: "1.2 miles",
      accepts: ["Paper", "Plastic", "Glass", "Metal"],
      hours: "Mon-Sat: 8AM-6PM"
    },
    {
      id: 2,
      name: "Earth Friendly Center",
      address: "456 Sustainability Blvd, Portland, OR",
      distance: "2.5 miles",
      accepts: ["Electronics", "Batteries", "Hazardous Waste"],
      hours: "Tue-Sun: 9AM-5PM"
    },
    {
      id: 3,
      name: "Urban Recycle Hub",
      address: "789 Green Street, Portland, OR",
      distance: "3.1 miles",
      accepts: ["Clothing", "Plastic", "Metal"],
      hours: "Daily: 7AM-7PM"
    }
  ]

  return (
<div className="p-8 bg-green-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-green-800 flex items-center">
          <Recycle className="w-8 h-8 mr-3 text-green-600" />
          Recycling Centers
        </h1>
        <p className="text-green-600 mt-2">Find nearby locations to recycle your materials</p>
      </motion.div>

      <div className="flex items-center justify-between mb-6">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="relative flex-1 max-w-md"
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by material or location..."
            className="w-full pl-10 pr-4 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
          />
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="ml-4 flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
        >
          <Filter className="w-5 h-5 mr-2" />
          Filters
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {centers.map((center) => (
          <motion.div
            key={center.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden border border-green-100"
          >
            <div className="p-6">
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <Recycle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-800">{center.name}</h3>
                  <div className="flex items-center mt-1 text-green-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{center.distance} away</span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-green-800 mb-2">Accepts:</h4>
                <div className="flex flex-wrap gap-2">
                  {center.accepts.map((item, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-green-100">
                <p className="text-sm text-gray-600">{center.hours}</p>
                <p className="text-sm text-gray-600 mt-1">{center.address}</p>
              </div>
            </div>

            <div className="px-6 py-3 bg-green-50 flex justify-end">
              <motion.button
                whileHover={{ x: 3 }}
                className="flex items-center text-green-700 hover:text-green-900 font-medium"
              >
                View Details
                <ArrowRight className="w-4 h-4 ml-2" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}