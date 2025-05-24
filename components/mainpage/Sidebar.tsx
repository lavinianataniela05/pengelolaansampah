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
  const pathname = usePathname();
  const router = useRouter();
  
  const handleLogout = () => {
    // Add logout logic here
    router.push('/login');
  }
  
  // Animation variants
  const sidebarVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 15
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };
  
  const logoVariants = {
    initial: { rotate: 0 },
    hover: { 
      rotate: 360,
      transition: { 
        duration: 1.2,
        ease: "easeInOut"
      }
    }
  };

  // Points data - this would typically come from a global state or API
  const userPoints = 1250;

  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className="w-60 bg-gradient-to-b from-white to-green-50 shadow-lg h-screen p-4 border-r border-green-100 flex flex-col fixed left-0 top-0"
    >
      <motion.div 
        className="flex items-center mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.div 
          className="bg-gradient-to-br from-green-500 to-green-700 p-2 rounded-lg mr-2 shadow-md"
          whileHover="hover"
          variants={logoVariants}
        >
          <Recycle className="w-5 h-5 text-white" />
        </motion.div>
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-800 to-green-500">
          EcoManage
        </h2>
      </motion.div>
      
      {/* Points Display - Connected to ProfileRewardPage */}
      <Link href="/profile-reward">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-gradient-to-r from-green-100 to-green-200 p-3 rounded-lg shadow-sm mb-4 flex items-center cursor-pointer hover:shadow-md transition-shadow"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-sm mr-2">
            <motion.span 
              className="text-white text-sm font-bold"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              🌱
            </motion.span>
          </div>
          <div>
            <p className="text-xs text-green-700">Eco Points</p>
            <p className="text-lg font-bold text-green-800">{userPoints.toLocaleString()}</p>
          </div>
          {pathname === '/profile-reward' && (
            <motion.div 
              className="ml-auto w-2 h-2 bg-green-500 rounded-full"
              layoutId="activePointIndicator"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </motion.div>
      </Link>
      
      <div className="h-px w-full bg-gradient-to-r from-transparent via-green-200 to-transparent mb-4"></div>
      
      <nav className="space-y-1 flex-1">
        {navLinks.map((link, i) => (
          <motion.div
            key={link.path}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            whileHover={{ scale: 1.02, x: 3 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href={link.path}
              className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                pathname === link.path
                ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 font-semibold shadow-sm'
                : 'text-gray-600 hover:bg-green-50'
              }`}
            >
              <motion.span 
                className={`mr-3 ${
                  pathname === link.path ? 'text-green-600' : 'text-gray-500'
                }`}
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {link.icon}
              </motion.span>
              <span className="text-sm">{link.name}</span>
              
              {pathname === link.path && (
                <motion.div 
                  className="ml-auto w-1 h-6 bg-green-500 rounded-full"
                  layoutId="activeIndicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          </motion.div>
        ))}
      </nav>
      
      <div className="h-px w-full bg-gradient-to-r from-transparent via-green-200 to-transparent mt-3 mb-3"></div>
      
      <motion.button
        onClick={handleLogout}
        whileHover={{ scale: 1.02, x: 3, backgroundColor: "rgba(254, 226, 226, 1)" }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="flex items-center px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 mt-auto mb-2 transition-colors duration-200"
      >
        <motion.span 
          className="w-5 h-5 mr-3 text-red-500"
          whileHover={{ rotate: [0, -45, 0] }}
          transition={{ duration: 0.5 }}
        >
          <LogOut />
        </motion.span>
        <span className="text-sm font-medium">Logout</span>
      </motion.button>
    </motion.aside>
  )
}