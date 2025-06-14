// 'use client'
// import Link from 'next/link'
// import { usePathname, useRouter } from 'next/navigation'
// import { motion } from 'framer-motion'
// import { Home, Recycle, MapPin, Gauge, Truck, UserCircle2, Info, LogOut } from 'lucide-react'

// const navLinks = [
//   { name: 'Dashboard', path: '/dashboard', icon: <Gauge className="w-5 h-5" /> },
//   { name: 'Recycling Centers', path: '/recycling-centers', icon: <Recycle className="w-5 h-5" /> },
//   { name: 'Waste Tracking', path: '/waste-tracking', icon: <MapPin className="w-5 h-5" /> },
//   { name: 'Collection', path: '/delivery-collection', icon: <Truck className="w-5 h-5" /> },
//   { name: 'Profile & Rewards', path: '/profile-reward', icon: <UserCircle2 className="w-5 h-5" /> },
//   { name: 'About', path: '/about', icon: <Info className="w-5 h-5" /> },
// ]

// export default function Sidebar() {
//   const pathname = usePathname();
//   const router = useRouter();
  
//   const handleLogout = () => {
//     // Add logout logic here
//     router.push('/login');
//   }
  
//   // Animation variants
//   const sidebarVariants = {
//     hidden: { x: -100, opacity: 0 },
//     visible: { 
//       x: 0, 
//       opacity: 1,
//       transition: { 
//         type: "spring", 
//         stiffness: 100,
//         damping: 15
//       }
//     }
//   };
  
//   const itemVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: (i: number) => ({
//       opacity: 1,
//       x: 0,
//       transition: {
//         delay: i * 0.1,
//         duration: 0.4,
//         ease: "easeOut"
//       }
//     })
//   };
  
//   const logoVariants = {
//     initial: { rotate: 0 },
//     hover: { 
//       rotate: 360,
//       transition: { 
//         duration: 1.2,
//         ease: "easeInOut"
//       }
//     }
//   };

//   // Points data - this would typically come from a global state or API
//   const userPoints = 1250;

//   return (
//     <motion.aside
//       initial="hidden"
//       animate="visible"
//       variants={sidebarVariants}
//       className="w-60 bg-gradient-to-b from-white to-green-50 shadow-lg h-screen p-4 border-r border-green-100 flex flex-col fixed left-0 top-0"
//     >
//       <motion.div 
//         className="flex items-center mb-6"
//         initial={{ y: -20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.2, duration: 0.5 }}
//       >
//         <motion.div 
//           className="bg-gradient-to-br from-green-500 to-green-700 p-2 rounded-lg mr-2 shadow-md"
//           whileHover="hover"
//           variants={logoVariants}
//         >
//           <Recycle className="w-5 h-5 text-white" />
//         </motion.div>
//         <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-800 to-green-500">
//           EcoWaste
//         </h2>
//       </motion.div>
      
//       {/* Points Display - Connected to ProfileRewardPage */}
//       <Link href="/profile-reward">
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3, duration: 0.5 }}
//           className="bg-gradient-to-r from-green-100 to-green-200 p-3 rounded-lg shadow-sm mb-4 flex items-center cursor-pointer hover:shadow-md transition-shadow"
//           whileHover={{ scale: 1.01 }}
//           whileTap={{ scale: 0.99 }}
//         >
//           <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-sm mr-2">
//             <motion.span 
//               className="text-white text-sm font-bold"
//               animate={{ scale: [1, 1.1, 1] }}
//               transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
//             >
//               🌱
//             </motion.span>
//           </div>
//           <div>
//             <p className="text-xs text-green-700">Eco Points</p>
//             <p className="text-lg font-bold text-green-800">{userPoints.toLocaleString()}</p>
//           </div>
//           {pathname === '/profile-reward' && (
//             <motion.div 
//               className="ml-auto w-2 h-2 bg-green-500 rounded-full"
//               layoutId="activePointIndicator"
//               transition={{ type: "spring", stiffness: 300, damping: 30 }}
//             />
//           )}
//         </motion.div>
//       </Link>
      
//       <div className="h-px w-full bg-gradient-to-r from-transparent via-green-200 to-transparent mb-4"></div>
      
//       <nav className="space-y-1 flex-1">
//         {navLinks.map((link, i) => (
//           <motion.div
//             key={link.path}
//             custom={i}
//             initial="hidden"
//             animate="visible"
//             variants={itemVariants}
//             whileHover={{ scale: 1.02, x: 3 }}
//             whileTap={{ scale: 0.97 }}
//           >
//             <Link
//               href={link.path}
//               className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
//                 pathname === link.path
//                 ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 font-semibold shadow-sm'
//                 : 'text-gray-600 hover:bg-green-50'
//               }`}
//             >
//               <motion.span 
//                 className={`mr-3 ${
//                   pathname === link.path ? 'text-green-600' : 'text-gray-500'
//                 }`}
//                 whileHover={{ rotate: [0, -10, 10, -10, 0] }}
//                 transition={{ duration: 0.5 }}
//               >
//                 {link.icon}
//               </motion.span>
//               <span className="text-sm">{link.name}</span>
              
//               {pathname === link.path && (
//                 <motion.div 
//                   className="ml-auto w-1 h-6 bg-green-500 rounded-full"
//                   layoutId="activeIndicator"
//                   transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                 />
//               )}
//             </Link>
//           </motion.div>
//         ))}
//       </nav>
      
//       <div className="h-px w-full bg-gradient-to-r from-transparent via-green-200 to-transparent mt-3 mb-3"></div>
      
//       <motion.button
//         onClick={handleLogout}
//         whileHover={{ scale: 1.02, x: 3, backgroundColor: "rgba(254, 226, 226, 1)" }}
//         whileTap={{ scale: 0.97 }}
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.8, duration: 0.5 }}
//         className="flex items-center px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 mt-auto mb-2 transition-colors duration-200"
//       >
//         <motion.span 
//           className="w-5 h-5 mr-3 text-red-500"
//           whileHover={{ rotate: [0, -45, 0] }}
//           transition={{ duration: 0.5 }}
//         >
//           <LogOut />
//         </motion.span>
//         <span className="text-sm font-medium">Logout</span>
//       </motion.button>
//     </motion.aside>
//   )
// }

'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Recycle, MapPin, Gauge, Truck, UserCircle2, Info, LogOut, Sparkles, ChevronRight } from 'lucide-react'

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
    router.push('/logout');
  }
  
  // Animation variants
  const sidebarVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 120,
        damping: 20,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -30, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };
  
  const logoVariants = {
    initial: { rotate: 0, scale: 1 },
    hover: { 
      rotate: [0, -10, 10, -5, 5, 0],
      scale: [1, 1.1, 1],
      transition: { 
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  const pointsVariants = {
    initial: { backgroundPosition: "0% 50%" },
    animate: { 
      backgroundPosition: "100% 50%",
      transition: {
        duration: 3,
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse" as "reverse"
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
      className="w-64 bg-gradient-to-b from-slate-50 via-white to-green-50/30 backdrop-blur-sm shadow-2xl h-screen p-6 border-r border-green-100/50 flex flex-col fixed left-0 top-0 z-50"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,253,244,0.95) 50%, rgba(236,253,245,0.95) 100%)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(34, 197, 94, 0.1)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.5)'
      }}
    >
      {/* Logo Section */}
      <motion.div 
        className="flex items-center mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
      >
        <motion.div 
          className="bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 p-3 rounded-xl mr-3 shadow-lg relative overflow-hidden"
          whileHover="hover"
          variants={logoVariants}
          style={{
            boxShadow: '0 10px 25px -5px rgba(34, 197, 94, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2) inset'
          }}
        >
          <Recycle className="w-6 h-6 text-white relative z-10" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
        <div>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600">
            EcoWaste
          </h2>
          <p className="text-xs text-slate-500 font-medium">Sustainable Living</p>
        </div>
      </motion.div>
      
      {/* Enhanced Points Display */}
      <Link href="/profile-reward">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
          className="relative p-4 rounded-2xl shadow-lg mb-6 cursor-pointer group overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.15) 100%)',
            border: '1px solid rgba(34, 197, 94, 0.2)',
          }}
          whileHover={{ 
            scale: 1.02,
            boxShadow: '0 20px 40px -10px rgba(34, 197, 94, 0.2)',
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'linear-gradient(45deg, transparent 30%, rgba(34, 197, 94, 0.1) 50%, transparent 70%)',
              backgroundSize: '200% 200%'
            }}
            variants={pointsVariants}
            initial="initial"
            animate="animate"
          />
          
          <div className="relative z-10 flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg mr-3 group-hover:scale-110 transition-transform duration-200">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                🌱
              </motion.div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <p className="text-sm text-emerald-700 font-semibold">Eco Points</p>
                <Sparkles className="w-3 h-3 text-emerald-500" />
              </div>
              <p className="text-2xl font-bold text-emerald-800">{userPoints.toLocaleString()}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-emerald-600 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
          
          {pathname === '/profile-reward' && (
            <motion.div 
              className="absolute left-0 top-1/2 w-1 h-8 bg-gradient-to-b from-emerald-400 to-green-600 rounded-r-full -translate-y-1/2"
              layoutId="activePointIndicator"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </motion.div>
      </Link>
      
      {/* Elegant divider */}
      <div className="relative mb-6">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-emerald-200/50 to-transparent"></div>
      </div>
      
      {/* Navigation Links */}
      <nav className="space-y-2 flex-1">
        <AnimatePresence>
          {navLinks.map((link, i) => (
            <motion.div
              key={link.path}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02, 
                x: 4,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={link.path}
                className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                  pathname === link.path
                  ? 'text-emerald-800 font-semibold shadow-lg'
                  : 'text-slate-600 hover:text-emerald-700'
                }`}
                style={pathname === link.path ? {
                  background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.12) 100%)',
                  border: '1px solid rgba(34, 197, 94, 0.2)',
                  boxShadow: '0 4px 15px -3px rgba(34, 197, 94, 0.1)'
                } : {}}
              >
                {/* Hover background effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 to-green-50/50 opacity-0 group-hover:opacity-100"
                  initial={false}
                  transition={{ duration: 0.2 }}
                />
                
                <motion.span 
                  className={`mr-4 relative z-10 ${
                    pathname === link.path ? 'text-emerald-600' : 'text-slate-500 group-hover:text-emerald-600'
                  }`}
                  whileHover={{ 
                    rotate: [0, -8, 8, -4, 4, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {link.icon}
                </motion.span>
                <span className="text-sm relative z-10 font-medium">{link.name}</span>
                
                {pathname === link.path && (
                  <motion.div 
                    className="ml-auto w-2 h-8 bg-gradient-to-b from-emerald-400 to-green-600 rounded-full relative z-10"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                
                {/* Subtle shine effect on active item */}
                {pathname === link.path && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                    animate={{ x: [-100, 300] }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </nav>
      
      {/* Bottom divider */}
      <div className="relative my-4">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
        <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-red-200/30 to-transparent"></div>
      </div>
      
      {/* Enhanced Logout Button */}
      <motion.button
        onClick={handleLogout}
        whileHover={{ 
          scale: 1.02, 
          x: 4,
          backgroundColor: "rgba(254, 242, 242, 0.8)",
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
        className="flex items-center px-4 py-3 rounded-xl text-red-600 hover:text-red-700 transition-all duration-300 group relative overflow-hidden border border-transparent hover:border-red-200/50"
      >
        {/* Hover background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-red-50/30 to-pink-50/30 opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.2 }}
        />
        
        <motion.span 
          className="w-5 h-5 mr-4 text-red-500 relative z-10"
          whileHover={{ 
            rotate: [0, -15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <LogOut />
        </motion.span>
        <span className="text-sm font-semibold relative z-10">Sign Out</span>
        
        {/* Subtle glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20"
          style={{
            background: 'radial-gradient(circle at center, rgba(239, 68, 68, 0.3) 0%, transparent 70%)',
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    </motion.aside>
  )
}