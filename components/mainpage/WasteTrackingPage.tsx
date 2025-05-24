'use client'

import { motion } from 'framer-motion'
import { Gauge, Calendar, Package, Truck, Clock, CheckCircle } from 'lucide-react'

export default function WasteTracking() {
  const wasteItems = [
    {
      id: 1,
      type: "Plastic Waste",
      weight: "12.5 kg",
      date: "2023-11-15",
      status: "Recycled",
      statusColor: "text-green-600 bg-green-100",
      icon: <CheckCircle className="w-5 h-5" />
    },
    {
      id: 2,
      type: "Paper Waste",
      weight: "8.2 kg",
      date: "2023-11-14",
      status: "In Transit",
      statusColor: "text-blue-600 bg-blue-100",
      icon: <Truck className="w-5 h-5" />
    },
    {
      id: 3,
      type: "Electronic Waste",
      weight: "5.7 kg",
      date: "2023-11-12",
      status: "Processing",
      statusColor: "text-amber-600 bg-amber-100",
      icon: <Clock className="w-5 h-5" />
    }
  ]

  const stats = [
    { name: "Total Recycled", value: "26.4 kg", icon: <Gauge className="w-6 h-6" /> },
    { name: "This Month", value: "12.5 kg", icon: <Calendar className="w-6 h-6" /> },
    { name: "Items Processed", value: "38", icon: <Package className="w-6 h-6" /> }
  ]

  return (
    <div className="p-8 bg-green-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-green-800 flex items-center">
          <Package className="w-8 h-8 mr-3 text-green-600" />
          Waste Tracking
        </h1>
        <p className="text-green-600 mt-2">Monitor your waste disposal and recycling progress</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-green-100"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-full bg-green-100 text-green-600 mr-4`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-green-600">{stat.name}</p>
                <h3 className="text-2xl font-bold text-green-900">{stat.value}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-green-100">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-green-800 mb-6">Recent Waste Disposals</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-green-100">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Weight</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-green-800 uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-green-100">
                {wasteItems.map((item) => (
                  <motion.tr 
                    key={item.id}
                    whileHover={{ backgroundColor: "#f0fdf4" }}
                    className="hover:bg-green-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-900">{item.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-700">{item.weight}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-700">{item.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${item.statusColor}`}>
                        <span className="mr-1">{item.icon}</span>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <motion.button
                        whileHover={{ x: 3 }}
                        className="text-green-600 hover:text-green-900"
                      >
                        View →
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}