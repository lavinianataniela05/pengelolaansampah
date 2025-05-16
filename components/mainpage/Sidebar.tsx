'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, Recycle, MapPin, Gauge, Truck, UserCircle2, Info, LogOut } from 'lucide-react'

const navLinks = [
  { name: 'Dashboard', path: '/dashboard', icon: <Gauge className="w-5 h-5" /> },
  { name: 'Recycling Centers', path: '/recycling-centers', icon: <Recycle className="w-5 h-5" /> },
  { name: 'Waste Tracking', path: '/waste-tracking', icon: <MapPin className="w-5 h-5" /> },
  { name: 'Collection', path: '/delivery-collection', icon: <Truck className="w-5 h-5" /> },
  { name: 'Profile & Rewards', path: '/profile-reward', icon: <UserCircle2 className="w-5 h-5" /> },
  { name: 'About', path: '/about', icon: <Info className="w-5 h-5" /> },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    // Add logout logic here
    router.push('/login')
  }

  return (
    <motion.aside 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-64 bg-white shadow-lg h-screen p-6 border-r border-green-100 flex flex-col"
    >
      <div className="flex items-center mb-8">
        <div className="bg-green-600 p-2 rounded-lg mr-3">
          <Recycle className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-green-800">EcoManage</h2>
      </div>

      <nav className="space-y-1 flex-1">
        {navLinks.map((link) => (
          <motion.div 
            key={link.path}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href={link.path}
              className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                pathname === link.path
                  ? 'bg-green-100 text-green-800 font-medium'
                  : 'text-gray-600 hover:bg-green-50'
              }`}
            >
              <span className={`mr-3 ${
                pathname === link.path ? 'text-green-600' : 'text-gray-500'
              }`}>
                {link.icon}
              </span>
              {link.name}
            </Link>
          </motion.div>
        ))}
      </nav>

      <motion.button
        onClick={handleLogout}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 mt-auto"
      >
        <LogOut className="w-5 h-5 mr-3 text-red-500" />
        Logout
      </motion.button>
    </motion.aside>
  )
}

