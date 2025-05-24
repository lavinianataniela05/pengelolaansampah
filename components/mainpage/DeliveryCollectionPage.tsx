// // // "use client";
// // // import React, { useState, useEffect } from "react";
// // // import { motion, AnimatePresence } from "framer-motion";
// // // import dynamic from 'next/dynamic';
// // // import { format, addDays } from "date-fns";

// // // // Dynamically import Calendar to avoid SSR issues
// // // const Calendar = dynamic(
// // //   () => import("react-day-picker").then((mod) => mod.DayPicker),
// // //   { 
// // //     ssr: false,
// // //     loading: () => (
// // //       <div className="h-[300px] w-full bg-gradient-to-br from-emerald-50 to-white rounded-xl flex items-center justify-center">
// // //         <div className="animate-pulse flex flex-col items-center space-y-4">
// // //           <div className="h-8 w-48 bg-emerald-100 rounded-full"></div>
// // //           <div className="grid grid-cols-7 gap-2">
// // //             {[...Array(35)].map((_, i) => (
// // //               <div key={i} className="h-8 w-8 rounded-full bg-emerald-50"></div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     )
// // //   }
// // // );

// // // const DeliveryCollectionPage = () => {
// // //   const [date, setDate] = useState<Date | undefined>();
// // //   const [time, setTime] = useState("09:00 AM");
// // //   const [address, setAddress] = useState("");
// // //   const [email, setEmail] = useState("");
// // //   const [phone, setPhone] = useState("");
// // //   const [notes, setNotes] = useState("");
// // //   const [isSubmitted, setIsSubmitted] = useState(false);
// // //   const [recyclingType, setRecyclingType] = useState("mixed");
// // //   const [bagsCount, setBagsCount] = useState(1);
// // //   const [isMounted, setIsMounted] = useState(false);
// // //   const [currentStep, setCurrentStep] = useState(1);
// // //   const [formComplete, setFormComplete] = useState(false);

// // //   // Animation variants
// // //   const containerVariants = {
// // //     hidden: { opacity: 0 },
// // //     visible: { 
// // //       opacity: 1,
// // //       transition: { 
// // //         when: "beforeChildren",
// // //         staggerChildren: 0.1
// // //       }
// // //     }
// // //   };

// // //   const itemVariants = {
// // //     hidden: { y: 20, opacity: 0 },
// // //     visible: { 
// // //       y: 0, 
// // //       opacity: 1,
// // //       transition: { type: "spring", stiffness: 300, damping: 24 }
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     setIsMounted(true);
// // //     setDate(addDays(new Date(), 1));
    
// // //     const checkFormCompletion = () => {
// // //       if (currentStep === 1) return !!date;
// // //       if (currentStep === 2) return recyclingType !== "" && bagsCount > 0;
// // //       if (currentStep === 3) return address !== "" && email !== "" && phone !== "";
// // //       return false;
// // //     };
    
// // //     setFormComplete(checkFormCompletion());
// // //   }, [currentStep, date, recyclingType, bagsCount, address, email, phone]);

// // //   const handleSubmit = (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     if (currentStep < 3) {
// // //       setCurrentStep(currentStep + 1);
// // //     } else {
// // //       setIsSubmitted(true);
// // //     }
// // //   };

// // //   const handlePrevStep = () => {
// // //     if (currentStep > 1) {
// // //       setCurrentStep(currentStep - 1);
// // //     }
// // //   };

// // //   const formattedDate = date ? format(date, "EEE, MMM d, yyyy") : "Select a date";

// // //   const timeSlots = [
// // //     "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
// // //     "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
// // //     "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
// // //     "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
// // //   ];

// // //   const recyclingTypes = [
// // //     { id: "mixed", label: "Mixed Recycling", icon: "🔄", color: "bg-emerald-100" },
// // //     { id: "paper", label: "Paper/Cardboard", icon: "📄", color: "bg-blue-100" },
// // //     { id: "plastic", label: "Plastics", icon: "🥤", color: "bg-yellow-100" },
// // //     { id: "glass", label: "Glass", icon: "🔍", color: "bg-green-100" },
// // //     { id: "metal", label: "Metal", icon: "🥫", color: "bg-gray-100" },
// // //     { id: "ewaste", label: "E-Waste", icon: "💻", color: "bg-purple-100" }
// // //   ];

// // //   if (!isMounted) {
// // //     return (
// // //       <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-10 px-4 sm:px-6 lg:px-8">
// // //         <div className="max-w-6xl mx-auto">
// // //           <div className="h-16 w-64 bg-white/80 rounded-full mx-auto mb-8 animate-pulse"></div>
// // //           <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl h-[700px] animate-pulse overflow-hidden">
// // //             <div className="h-4 bg-gradient-to-r from-emerald-700 to-emerald-500"></div>
// // //             <div className="flex flex-col items-center justify-center h-full p-12 space-y-8">
// // //               <div className="w-full max-w-md h-12 bg-emerald-50 rounded-full animate-pulse"></div>
// // //               <div className="w-full max-w-md h-72 bg-gradient-to-br from-emerald-50 to-white rounded-xl animate-pulse"></div>
// // //               <div className="w-full max-w-md h-12 bg-emerald-50 rounded-full animate-pulse"></div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-10 px-4 sm:px-6 lg:px-8">
// // //       {/* Floating decorative elements */}
// // //       <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
// // //         {[...Array(12)].map((_, i) => (
// // //           <motion.div
// // //             key={i}
// // //             className="absolute rounded-full bg-emerald-100/30"
// // //             style={{
// // //               width: Math.random() * 200 + 100,
// // //               height: Math.random() * 200 + 100,
// // //               left: `${Math.random() * 100}%`,
// // //               top: `${Math.random() * 100}%`,
// // //             }}
// // //             animate={{
// // //               x: [0, (Math.random() - 0.5) * 100],
// // //               y: [0, (Math.random() - 0.5) * 50],
// // //               rotate: [0, Math.random() * 360]
// // //             }}
// // //             transition={{
// // //               duration: Math.random() * 20 + 10,
// // //               repeat: Infinity,
// // //               repeatType: "reverse",
// // //               ease: "easeInOut"
// // //             }}
// // //           />
// // //         ))}
// // //       </div>

// // //       {/* Header */}
// // //       <motion.div 
// // //         className="text-center mb-12 relative z-10"
// // //         initial={{ opacity: 0, y: -20 }}
// // //         animate={{ opacity: 1, y: 0 }}
// // //         transition={{ duration: 0.6 }}
// // //       >
// // //         <motion.div
// // //           className="inline-flex items-center bg-white/90 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg mb-4 border border-emerald-100"
// // //           initial={{ scale: 0.8, opacity: 0 }}
// // //           animate={{ scale: 1, opacity: 1 }}
// // //           transition={{ delay: 0.2, type: "spring" }}
// // //         >
// // //           <div className="relative w-10 h-10 mr-3">
// // //             <motion.div 
// // //               className="absolute inset-0 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xl"
// // //               animate={{ 
// // //                 rotate: [0, 360],
// // //                 scale: [1, 1.1, 1]
// // //               }}
// // //               transition={{ 
// // //                 rotate: { duration: 8, repeat: Infinity, ease: "linear" },
// // //                 scale: { duration: 3, repeat: Infinity, repeatType: "reverse" }
// // //               }}
// // //             >
// // //               ♻️
// // //             </motion.div>
// // //           </div>
// // //           <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent font-[var(--font-lexend-deca)] tracking-wide">
// // //             EcoCollect
// // //           </h1>
// // //         </motion.div>
        
// // //         <div className="w-48 h-1.5 bg-gradient-to-r from-emerald-100 via-emerald-500 to-emerald-100 mx-auto mb-6 rounded-full" />
        
// // //         <motion.h2 
// // //           className="text-3xl font-bold text-emerald-800"
// // //           initial={{ opacity: 0 }}
// // //           animate={{ opacity: 1 }}
// // //           transition={{ delay: 0.3, duration: 0.8 }}
// // //         >
// // //           Schedule a Pickup
// // //         </motion.h2>
        
// // //         <motion.p 
// // //           className="mt-2 text-emerald-600 max-w-lg mx-auto"
// // //           initial={{ opacity: 0, y: 10 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           transition={{ delay: 0.4, duration: 0.8 }}
// // //         >
// // //           Help us make the planet greener by recycling your waste responsibly
// // //         </motion.p>
// // //       </motion.div>

// // //       {/* Progress Steps */}
// // //       {!isSubmitted && (
// // //         <motion.div 
// // //           className="max-w-4xl mx-auto mb-8 relative z-10"
// // //           initial={{ opacity: 0, y: 20 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           transition={{ delay: 0.5 }}
// // //         >
// // //           <div className="flex items-center justify-center space-x-4">
// // //             {[1, 2, 3].map((step) => (
// // //               <React.Fragment key={step}>
// // //                 <motion.button
// // //                   className={`relative w-14 h-14 rounded-full flex items-center justify-center text-lg font-medium transition-all duration-300 ${
// // //                     currentStep === step
// // //                       ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
// // //                       : currentStep > step
// // //                       ? "bg-emerald-100 text-emerald-800 border-2 border-emerald-500"
// // //                       : "bg-white text-emerald-400 border-2 border-emerald-200"
// // //                   }`}
// // //                   whileHover={currentStep > step ? { scale: 1.1 } : {}}
// // //                   onClick={() => currentStep > step && setCurrentStep(step)}
// // //                 >
// // //                   {currentStep > step ? (
// // //                     <motion.div
// // //                       initial={{ scale: 0 }}
// // //                       animate={{ scale: 1 }}
// // //                       transition={{ type: "spring" }}
// // //                     >
// // //                       ✓
// // //                     </motion.div>
// // //                   ) : (
// // //                     step
// // //                   )}
// // //                   {currentStep === step && (
// // //                     <motion.div 
// // //                       className="absolute -inset-1 rounded-full border-2 border-emerald-300 opacity-0"
// // //                       animate={{ 
// // //                         opacity: [0, 0.5, 0],
// // //                         scale: [1, 1.3]
// // //                       }}
// // //                       transition={{ 
// // //                         duration: 2,
// // //                         repeat: Infinity,
// // //                         repeatType: "loop"
// // //                       }}
// // //                     />
// // //                   )}
// // //                 </motion.button>
// // //                 {step < 3 && (
// // //                   <div className={`h-1 w-24 rounded-full ${
// // //                     currentStep > step 
// // //                       ? "bg-gradient-to-r from-emerald-500 to-emerald-300"
// // //                       : "bg-gradient-to-r from-emerald-100 to-emerald-50"
// // //                   }`}></div>
// // //                 )}
// // //               </React.Fragment>
// // //             ))}
// // //           </div>
// // //           <div className="flex justify-center mt-4 text-sm text-emerald-600 font-medium">
// // //             <span className={`w-40 text-center ${currentStep === 1 ? "text-emerald-700 font-semibold" : ""}`}>
// // //               Date & Time
// // //             </span>
// // //             <span className={`w-40 text-center ${currentStep === 2 ? "text-emerald-700 font-semibold" : ""}`}>
// // //               Recycling Details
// // //             </span>
// // //             <span className={`w-40 text-center ${currentStep === 3 ? "text-emerald-700 font-semibold" : ""}`}>
// // //               Contact Info
// // //             </span>
// // //           </div>
// // //         </motion.div>
// // //       )}

// // //       {/* Main Form Container */}
// // //       <div className="max-w-6xl mx-auto relative z-10">
// // //         <motion.div 
// // //           className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-emerald-100"
// // //           initial={{ opacity: 0, y: 20 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           transition={{ delay: 0.2, duration: 0.6 }}
// // //         >
// // //           {/* Decorative top border */}
// // //           <div className="relative h-4 bg-gradient-to-r from-emerald-700 via-emerald-500 to-emerald-300">
// // //             {[...Array(12)].map((_, i) => (
// // //               <motion.div
// // //                 key={i}
// // //                 className="absolute -bottom-1.5 w-3 h-3 rounded-full bg-white shadow-sm"
// // //                 style={{
// // //                   left: `${(i + 1) * (100 / 13)}%`,
// // //                 }}
// // //                 initial={{ scale: 0 }}
// // //                 animate={{ scale: 1 }}
// // //                 transition={{ delay: 0.4 + i * 0.05, type: "spring" }}
// // //               />
// // //             ))}
// // //           </div>

// // //           {/* Form Content */}
// // //           <div className="p-8 md:p-12">
// // //             {isSubmitted ? (
// // //               <motion.div
// // //                 initial={{ opacity: 0, scale: 0.9 }}
// // //                 animate={{ opacity: 1, scale: 1 }}
// // //                 className="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-2xl shadow-inner text-center"
// // //               >
// // //                 <motion.div 
// // //                   className="relative w-32 h-32 mx-auto mb-8"
// // //                   initial={{ scale: 0 }}
// // //                   animate={{ 
// // //                     scale: 1,
// // //                     rotate: [0, 10, -10, 0]
// // //                   }}
// // //                   transition={{ 
// // //                     scale: { type: "spring", stiffness: 300, damping: 20 },
// // //                     rotate: { duration: 1.5, ease: "easeInOut" }
// // //                   }}
// // //                 >
// // //                   <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-6xl shadow-lg">
// // //                     ✓
// // //                   </div>
// // //                   <motion.div 
// // //                     className="absolute inset-0 border-4 border-emerald-200 rounded-full"
// // //                     animate={{ 
// // //                       scale: [1, 1.2, 1],
// // //                       opacity: [0.6, 0.3, 0.6]
// // //                     }}
// // //                     transition={{ 
// // //                       duration: 2, 
// // //                       repeat: Infinity,
// // //                       repeatType: "reverse"
// // //                     }}
// // //                   />
// // //                 </motion.div>
                
// // //                 <motion.h3 
// // //                   className="text-3xl font-bold text-emerald-800 mb-4 font-[var(--font-lexend-deca)]"
// // //                   initial={{ opacity: 0, y: 20 }}
// // //                   animate={{ opacity: 1, y: 0 }}
// // //                   transition={{ delay: 0.3 }}
// // //                 >
// // //                   Pickup Scheduled!
// // //                 </motion.h3>
                
// // //                 <motion.p 
// // //                   className="text-xl text-emerald-600 mb-6"
// // //                   initial={{ opacity: 0 }}
// // //                   animate={{ opacity: 1 }}
// // //                   transition={{ delay: 0.5 }}
// // //                 >
// // //                   We've sent confirmation details to your email
// // //                 </motion.p>
                
// // //                 <motion.div 
// // //                   className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100 max-w-md mx-auto mb-8"
// // //                   variants={containerVariants}
// // //                   initial="hidden"
// // //                   animate="visible"
// // //                 >
// // //                   <div className="space-y-3 text-left">
// // //                     <motion.div 
// // //                       className="flex justify-between border-b border-emerald-100 pb-3"
// // //                       variants={itemVariants}
// // //                     >
// // //                       <span className="text-emerald-600 flex items-center">
// // //                         <span className="mr-2">📅</span> Date:
// // //                       </span>
// // //                       <span className="font-medium text-emerald-800">{formattedDate}</span>
// // //                     </motion.div>
// // //                     <motion.div 
// // //                       className="flex justify-between border-b border-emerald-100 pb-3"
// // //                       variants={itemVariants}
// // //                     >
// // //                       <span className="text-emerald-600 flex items-center">
// // //                         <span className="mr-2">⏰</span> Time:
// // //                       </span>
// // //                       <span className="font-medium text-emerald-800">{time}</span>
// // //                     </motion.div>
// // //                     <motion.div 
// // //                       className="flex justify-between border-b border-emerald-100 pb-3"
// // //                       variants={itemVariants}
// // //                     >
// // //                       <span className="text-emerald-600 flex items-center">
// // //                         <span className="mr-2">{recyclingTypes.find(t => t.id === recyclingType)?.icon}</span> Type:
// // //                       </span>
// // //                       <span className="font-medium text-emerald-800">
// // //                         {recyclingTypes.find(t => t.id === recyclingType)?.label}
// // //                       </span>
// // //                     </motion.div>
// // //                     <motion.div 
// // //                       className="flex justify-between"
// // //                       variants={itemVariants}
// // //                     >
// // //                       <span className="text-emerald-600 flex items-center">
// // //                         <span className="mr-2">🧺</span> Quantity:
// // //                       </span>
// // //                       <span className="font-medium text-emerald-800">{bagsCount} {bagsCount === 1 ? "Item" : "Items"}</span>
// // //                     </motion.div>
// // //                   </div>
// // //                 </motion.div>
                
// // //                 <motion.div
// // //                   initial={{ opacity: 0 }}
// // //                   animate={{ opacity: 1 }}
// // //                   transition={{ delay: 0.8 }}
// // //                 >
// // //                   <motion.div 
// // //                     className="text-8xl mb-6"
// // //                     animate={{ 
// // //                       y: [0, -10, 0],
// // //                       rotate: [0, 15, 0, -15, 0]
// // //                     }}
// // //                     transition={{ 
// // //                       y: { repeat: Infinity, duration: 3, repeatType: "reverse" },
// // //                       rotate: { repeat: Infinity, duration: 5, repeatType: "reverse" }
// // //                     }}
// // //                   >
// // //                     🌎
// // //                   </motion.div>
                  
// // //                   <p className="text-lg text-emerald-600 font-medium mb-8">
// // //                     Thank you for helping us keep our planet clean!
// // //                   </p>
                  
// // //                   <motion.button
// // //                     whileHover={{ 
// // //                       scale: 1.05, 
// // //                       boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.4)"
// // //                     }}
// // //                     whileTap={{ scale: 0.95 }}
// // //                     onClick={() => {
// // //                       setIsSubmitted(false);
// // //                       setCurrentStep(1);
// // //                     }}
// // //                     className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-full shadow-lg hover:from-emerald-700 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center mx-auto"
// // //                   >
// // //                     <span className="mr-2">📦</span> Schedule Another Pickup
// // //                   </motion.button>
// // //                 </motion.div>
// // //               </motion.div>
// // //             ) : (
// // //               <form onSubmit={handleSubmit}>
// // //                 <AnimatePresence mode="wait">
// // //                   {/* Step 1: Date & Time Selection */}
// // //                   {currentStep === 1 && (
// // //                     <motion.div
// // //                       key="step1"
// // //                       initial={{ opacity: 0, x: -20 }}
// // //                       animate={{ opacity: 1, x: 0 }}
// // //                       exit={{ opacity: 0, x: 20 }}
// // //                       className="flex flex-col lg:flex-row gap-8 md:gap-12"
// // //                     >
// // //                       {/* Left Column - Calendar */}
// // //                       <div className="lg:w-1/2 space-y-8">
// // //                         <motion.div 
// // //                           className="rounded-2xl border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-8 shadow-md"
// // //                           variants={itemVariants}
// // //                         >
// // //                           <h2 className="text-2xl font-bold text-emerald-800 mb-6 font-[var(--font-lexend-deca)] flex items-center">
// // //                             <span className="bg-emerald-100 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-emerald-700">1</span>
// // //                             Select a Date
// // //                           </h2>
                          
// // //                           {isMounted && (
// // //                             <Calendar
// // //                               mode="single"
// // //                               selected={date}
// // //                               onSelect={setDate}
// // //                               className="w-full"
// // //                               disabled={{ before: addDays(new Date(), 1) }}
// // //                               modifiersClassNames={{
// // //                                 selected: "bg-emerald-600 text-white",
// // //                                 today: "bg-emerald-100 text-emerald-800 border border-emerald-300"
// // //                               }}
// // //                               classNames={{
// // //                                 caption: "flex justify-center py-2 mb-4 relative items-center",
// // //                                 caption_label: "text-emerald-800 font-medium text-lg",
// // //                                 nav: "flex items-center",
// // //                                 nav_button: "h-6 w-6 bg-transparent hover:bg-emerald-100 rounded-full flex items-center justify-center",
// // //                                 nav_button_previous: "absolute left-2",
// // //                                 nav_button_next: "absolute right-2",
// // //                                 head_cell: "text-emerald-600 text-sm font-normal",
// // //                                 cell: "p-1",
// // //                                 day: "h-10 w-10 rounded-full flex items-center justify-center transition-colors hover:bg-emerald-200",
// // //                                 day_selected: "bg-emerald-600 text-white hover:bg-emerald-700",
// // //                                 day_disabled: "text-gray-400 hover:bg-transparent"
// // //                               }}
// // //                               footer={
// // //                                 <p className="text-sm text-emerald-600 mt-4 pt-4 border-t border-emerald-100">
// // //                                   Next available pickup date is tomorrow
// // //                                 </p>
// // //                               }
// // //                             />
// // //                           )}
// // //                         </motion.div>

// // //                         <motion.div 
// // //                           className="rounded-2xl border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-md"
// // //                           variants={itemVariants}
// // //                         >
// // //                           <h2 className="text-xl font-bold text-emerald-800 mb-4 font-[var(--font-lexend-deca)] flex items-center">
// // //                             <span className="bg-emerald-100 w-6 h-6 rounded-full flex items-center justify-center mr-2 text-emerald-700 text-sm">2</span>
// // //                             Select a Time
// // //                           </h2>
                          
// // //                           <div className="grid grid-cols-4 gap-2">
// // //                             {timeSlots.map((slot) => (
// // //                               <motion.button
// // //                                 key={slot}
// // //                                 type="button"
// // //                                 whileHover={{ scale: 1.05 }}
// // //                                 whileTap={{ scale: 0.95 }}
// // //                                 className={`px-2 py-2 rounded-lg text-xs transition-all duration-200 ${
// // //                                   time === slot
// // //                                     ? "bg-emerald-600 text-white shadow-md"
// // //                                     : "bg-white text-emerald-800 border border-emerald-200 hover:bg-emerald-50"
// // //                                 }`}
// // //                                 onClick={() => setTime(slot)}
// // //                               >
// // //                                 {slot}
// // //                               </motion.button>
// // //                             ))}
// // //                           </div>
// // //                         </motion.div>
// // //                       </div>

// // //                       {/* Right Column - Summary */}
// // //                       <div className="lg:w-1/2 space-y-8">
// // //                         <motion.div 
// // //                           className="rounded-2xl border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-8 shadow-md h-full flex flex-col"
// // //                           variants={itemVariants}
// // //                         >
// // //                           <h2 className="text-2xl font-bold text-emerald-800 mb-6 font-[var(--font-lexend-deca)]">
// // //                             Your Pickup Summary
// // //                           </h2>
                          
// // //                           <div className="flex-1 flex flex-col justify-center">
// // //                             <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100 mb-8">
// // //                               <div className="flex items-center justify-center space-x-4">
// // //                                 <div className="text-5xl">📅</div>
// // //                                 <div className="text-left">
// // //                                   <h3 className="text-xl font-medium text-emerald-800">
// // //                                     {formattedDate}
// // //                                   </h3>
// // //                                   <p className="text-lg text-emerald-600">at {time}</p>
// // //                                 </div>
// // //                               </div>
// // //                             </div>
                            
// // //                             {!date && (
// // //                               <div className="text-emerald-600 bg-emerald-50 p-4 rounded-lg border border-emerald-200 text-center mb-8">
// // //                                 Please select a date and time to continue
// // //                               </div>
// // //                             )}
                            
// // //                             <motion.div
// // //                               className="relative w-full h-48"
// // //                               animate={{ 
// // //                                 rotate: [0, 360],
// // //                               }}
// // //                               transition={{
// // //                                 rotate: { 
// // //                                   duration: 30, 
// // //                                   repeat: Infinity, 
// // //                                   ease: "linear" 
// // //                                 },
// // //                               }}
// // //                             >
// // //                               {[...Array(6)].map((_, i) => (
// // //                                 <motion.div
// // //                                   key={i}
// // //                                   className="absolute top-1/2 left-1/2 text-4xl"
// // //                                   style={{
// // //                                     transform: `rotate(${i * 60}deg) translateX(80px) rotate(-${i * 60}deg)`
// // //                                   }}
// // //                                   animate={{
// // //                                     y: [0, -10, 0],
// // //                                     rotate: [0, 20, 0]
// // //                                   }}
// // //                                   transition={{
// // //                                     y: { 
// // //                                       duration: 3, 
// // //                                       repeat: Infinity, 
// // //                                       repeatType: "reverse",
// // //                                       delay: i * 0.2
// // //                                     },
// // //                                     rotate: {
// // //                                       duration: 4,
// // //                                       repeat: Infinity,
// // //                                       repeatType: "reverse",
// // //                                       delay: i * 0.3
// // //                                     }
// // //                                   }}
// // //                                 >
// // //                                   {["♻️", "🌱", "🌍", "🌿", "🍃", "🔄"][i]}
// // //                                 </motion.div>
// // //                               ))}
// // //                               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl">
// // //                                 ♻️
// // //                               </div>
// // //                             </motion.div>
// // //                           </div>
// // //                         </motion.div>
// // //                       </div>
// // //                     </motion.div>
// // //                   )}
// // //                 </AnimatePresence>

// // //                 {/* Navigation Buttons */}
// // //                 {!isSubmitted && (
// // //                   <motion.div 
// // //                     className="flex justify-between mt-12"
// // //                     initial={{ opacity: 0, y: 20 }}
// // //                     animate={{ opacity: 1, y: 0 }}
// // //                     transition={{ delay: 0.6 }}
// // //                   >
// // //                     <motion.button
// // //                       type="button"
// // //                       onClick={handlePrevStep}
// // //                       disabled={currentStep === 1}
// // //                       className={`px-6 py-3 rounded-full border-2 ${
// // //                         currentStep === 1 
// // //                           ? "border-gray-200 text-gray-400 cursor-not-allowed" 
// // //                           : "border-emerald-300 text-emerald-700 hover:bg-emerald-50"
// // //                       }`}
// // //                       whileHover={currentStep > 1 ? { scale: 1.05 } : {}}
// // //                       whileTap={currentStep > 1 ? { scale: 0.95 } : {}}
// // //                     >
// // //                       ← Previous
// // //                     </motion.button>
                    
// // //                     <motion.button
// // //                       type="submit"
// // //                       disabled={!formComplete}
// // //                       className={`px-8 py-3 rounded-full ${
// // //                         formComplete 
// // //                           ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg hover:from-emerald-700 hover:to-emerald-600"
// // //                           : "bg-gray-200 text-gray-500 cursor-not-allowed"
// // //                       }`}
// // //                       whileHover={formComplete ? { scale: 1.05 } : {}}
// // //                       whileTap={formComplete ? { scale: 0.95 } : {}}
// // //                     >
// // //                       {currentStep < 3 ? "Continue →" : "Schedule Pickup"}
// // //                     </motion.button>
// // //                   </motion.div>
// // //                 )}
// // //               </form>
// // //             )}
// // //           </div>
// // //         </motion.div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default DeliveryCollectionPage;

// // "use client";
// // import React, { useState, useEffect } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import dynamic from 'next/dynamic';
// // import { format, addDays } from "date-fns";

// // // Dynamically import Calendar to avoid SSR issues
// // const Calendar = dynamic(
// //   () => import("react-day-picker").then((mod) => mod.DayPicker),
// //   { 
// //     ssr: false,
// //     loading: () => (
// //       <div className="h-[300px] w-full bg-gradient-to-br from-emerald-50 to-white rounded-xl flex items-center justify-center">
// //         <div className="animate-pulse flex flex-col items-center space-y-4">
// //           <div className="h-8 w-48 bg-emerald-100 rounded-full"></div>
// //           <div className="grid grid-cols-7 gap-2">
// //             {[...Array(35)].map((_, i) => (
// //               <div key={i} className="h-8 w-8 rounded-full bg-emerald-50"></div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     )
// //   }
// // );

// // const DeliveryCollectionPage = () => {
// //   const [date, setDate] = useState<Date | undefined>(addDays(new Date(), 1));
// //   const [time, setTime] = useState("09:00 AM");
// //   const [address, setAddress] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [phone, setPhone] = useState("");
// //   const [notes, setNotes] = useState("");
// //   const [isSubmitted, setIsSubmitted] = useState(false);
// //   const [recyclingType, setRecyclingType] = useState("mixed");
// //   const [bagsCount, setBagsCount] = useState(1);
// //   const [currentStep, setCurrentStep] = useState(1);
// //   const [formComplete, setFormComplete] = useState(false);

// //   const timeSlots = [
// //     "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
// //     "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
// //     "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
// //     "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
// //   ];

// //   const recyclingTypes = [
// //     { id: "mixed", label: "Mixed Recycling", icon: "🔄" },
// //     { id: "paper", label: "Paper/Cardboard", icon: "📄" },
// //     { id: "plastic", label: "Plastics", icon: "🥤" },
// //     { id: "glass", label: "Glass", icon: "🔍" },
// //     { id: "metal", label: "Metal", icon: "🥫" },
// //     { id: "ewaste", label: "E-Waste", icon: "💻" }
// //   ];

// //   useEffect(() => {
// //     const checkFormCompletion = () => {
// //       if (currentStep === 1) return !!date;
// //       if (currentStep === 2) return !!recyclingType && bagsCount > 0;
// //       if (currentStep === 3) return !!address && !!email && !!phone;
// //       return false;
// //     };
// //     setFormComplete(checkFormCompletion());
// //   }, [currentStep, date, recyclingType, bagsCount, address, email, phone]);

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (currentStep < 3) {
// //       setCurrentStep(currentStep + 1);
// //     } else {
// //       setIsSubmitted(true);
// //     }
// //   };

// //   const handlePrevStep = () => {
// //     if (currentStep > 1) {
// //       setCurrentStep(currentStep - 1);
// //     }
// //   };

// //   const formattedDate = date ? format(date, "EEE, MMM d, yyyy") : "Select a date";

// //   return (
// //     <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-10 px-4 sm:px-6 lg:px-8">
// //       <header className="text-center mb-12">
// //         <h1 className="text-4xl font-bold text-emerald-800">EcoCollect</h1>
// //         <h2 className="text-3xl font-bold text-emerald-600">Schedule a Pickup</h2>
// //         <p className="mt-2 text-emerald-600">Help us make the planet greener by recycling your waste responsibly</p>
// //       </header>

// //       {!isSubmitted ? (
// //         <form onSubmit={handleSubmit}>
// //           <AnimatePresence mode="wait">
// //             {currentStep === 1 && (
// //               <motion.div key="step1" className="flex flex-col lg:flex-row gap-8">
// //                 <div className="lg:w-1/2">
// //                   <Calendar
// //                     mode="single"
// //                     selected={date}
// //                     onSelect={setDate}
// //                     disabled={{ before: addDays(new Date(), 1) }}
// //                   />
// //                   <div className="mt-4">
// //                     <h2>Select a Time</h2>
// //                     <div className="grid grid-cols-4 gap-2">
// //                       {timeSlots.map((slot) => (
// //                         <button
// //                           key={slot}
// //                           type="button"
// //                           className={`px-2 py-2 rounded-lg ${time === slot ? "bg-emerald-600 text-white" : "bg-white text-emerald-800"}`}
// //                           onClick={() => setTime(slot)}
// //                         >
// //                           {slot}
// //                         </button>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <div className="lg:w-1/2">
// //                   <h2>Your Pickup Summary</h2>
// //                   <p>{formattedDate} at {time}</p>
// //                 </div>
// //               </motion.div>
// //             )}
// //             {/* Additional steps can be added here */}
// //           </AnimatePresence>

// //           <div className="flex justify-between mt-12">
// //             <button type="button" onClick={handlePrevStep} disabled={currentStep === 1}>← Previous</button>
// //             <button type="submit" disabled={!formComplete}>{currentStep < 3 ? "Continue →" : "Schedule Pickup"}</button>
// //           </div>
// //         </form>
// //       ) : (
// //         <div>
// //           <h3>Pickup Scheduled!</h3>
// //           <p>We've sent confirmation details to your email</p>
// //           <p>Date: {formattedDate}</p>
// //           <p>Time: {time}</p>
// //           <button onClick={() => setIsSubmitted(false)}>Schedule Another Pickup</button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default DeliveryCollectionPage;

// "use client";
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import dynamic from 'next/dynamic';
// import { format, addDays } from "date-fns";

// // Dynamically import Calendar to avoid SSR issues
// const Calendar = dynamic(
//   () => import("react-day-picker").then((mod) => mod.DayPicker),
//   { 
//     ssr: false,
//     loading: () => (
//       <div className="h-[300px] w-full bg-gradient-to-br from-emerald-50 to-white rounded-xl flex items-center justify-center">
//         <div className="animate-pulse flex flex-col items-center space-y-4">
//           <div className="h-8 w-48 bg-emerald-100 rounded-full"></div>
//           <div className="grid grid-cols-7 gap-2">
//             {[...Array(35)].map((_, i) => (
//               <div key={i} className="h-8 w-8 rounded-full bg-emerald-50"></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     )
//   }
// );

// const DeliveryCollectionPage = () => {
//   const [date, setDate] = useState<Date | undefined>(addDays(new Date(), 1));
//   const [time, setTime] = useState("09:00 AM");
//   const [address, setAddress] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [recyclingType, setRecyclingType] = useState("mixed");
//   const [bagsCount, setBagsCount] = useState(1);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formComplete, setFormComplete] = useState(false);

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { 
//       opacity: 1,
//       transition: { 
//         when: "beforeChildren",
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { 
//       y: 0, 
//       opacity: 1,
//       transition: { type: "spring", stiffness: 300, damping: 24 }
//     }
//   };

//   const timeSlots = [
//     "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
//     "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
//     "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
//     "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
//   ];

//   const recyclingTypes = [
//     { id: "mixed", label: "Mixed Recycling", icon: "🔄", color: "bg-emerald-100" },
//     { id: "paper", label: "Paper/Cardboard", icon: "📄", color: "bg-blue-100" },
//     { id: "plastic", label: "Plastics", icon: "🥤", color: "bg-yellow-100" },
//     { id: "glass", label: "Glass", icon: "🔍", color: "bg-green-100" },
//     { id: "metal", label: "Metal", icon: "🥫", color: "bg-gray-100" },
//     { id: "ewaste", label: "E-Waste", icon: "💻", color: "bg-purple-100" }
//   ];

//   useEffect(() => {
//     const checkFormCompletion = () => {
//       if (currentStep === 1) return !!date;
//       if (currentStep === 2) return recyclingType !== "" && bagsCount > 0;
//       if (currentStep === 3) return address !== "" && email !== "" && phone !== "";
//       return false;
//     };
//     setFormComplete(checkFormCompletion());
//   }, [currentStep, date, recyclingType, bagsCount, address, email, phone]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (currentStep < 3) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       setIsSubmitted(true);
//     }
//   };

//   const handlePrevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const formattedDate = date ? format(date, "EEE, MMM d, yyyy") : "Select a date";

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-10 px-4 sm:px-6 lg:px-8">
//       {/* Floating decorative elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
//         {[...Array(8)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute rounded-full bg-emerald-100/30"
//             style={{
//               width: Math.random() * 200 + 100,
//               height: Math.random() * 200 + 100,
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//             }}
//             animate={{
//               x: [0, (Math.random() - 0.5) * 50],
//               y: [0, (Math.random() - 0.5) * 30],
//               rotate: [0, Math.random() * 360]
//             }}
//             transition={{
//               duration: Math.random() * 20 + 10,
//               repeat: Infinity,
//               repeatType: "reverse",
//               ease: "easeInOut"
//             }}
//           />
//         ))}
//       </div>

//       {/* Header */}
//       <motion.div 
//         className="text-center mb-12 relative z-10"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <motion.h1
//           className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent mb-2"
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ delay: 0.2, type: "spring" }}
//         >
//           EcoCollect
//         </motion.h1>
//         <motion.h2 
//           className="text-3xl font-bold text-emerald-800"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//         >
//           Schedule a Pickup
//         </motion.h2>
//         <motion.p 
//           className="mt-2 text-emerald-600 max-w-lg mx-auto"
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//         >
//           Help us make the planet greener by recycling your waste responsibly
//         </motion.p>
//       </motion.div>

//       {/* Progress Steps */}
//       {!isSubmitted && (
//         <motion.div 
//           className="max-w-4xl mx-auto mb-8 relative z-10"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5 }}
//         >
//           <div className="flex items-center justify-center space-x-4">
//             {[1, 2, 3].map((step) => (
//               <React.Fragment key={step}>
//                 <motion.button
//                   className={`relative w-12 h-12 rounded-full flex items-center justify-center font-medium transition-all ${
//                     currentStep === step
//                       ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
//                       : currentStep > step
//                       ? "bg-emerald-100 text-emerald-800 border-2 border-emerald-500"
//                       : "bg-white text-emerald-400 border-2 border-emerald-200"
//                   }`}
//                   whileHover={currentStep > step ? { scale: 1.1 } : {}}
//                   onClick={() => currentStep > step && setCurrentStep(step)}
//                 >
//                   {currentStep > step ? "✓" : step}
//                 </motion.button>
//                 {step < 3 && (
//                   <div className={`h-1 w-16 rounded-full ${
//                     currentStep > step 
//                       ? "bg-gradient-to-r from-emerald-500 to-emerald-300"
//                       : "bg-gradient-to-r from-emerald-100 to-emerald-50"
//                   }`}></div>
//                 )}
//               </React.Fragment>
//             ))}
//           </div>
//         </motion.div>
//       )}

//       {/* Main Form Container */}
//       <div className="max-w-6xl mx-auto relative z-10">
//         <motion.div 
//           className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-emerald-100"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//         >
//           {/* Form Content */}
//           <div className="p-8 md:p-12">
//             {isSubmitted ? (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 className="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-2xl shadow-inner text-center"
//               >
//                 <motion.div 
//                   className="relative w-24 h-24 mx-auto mb-8"
//                   initial={{ scale: 0 }}
//                   animate={{ 
//                     scale: 1,
//                     rotate: [0, 10, -10, 0]
//                   }}
//                   transition={{ 
//                     scale: { type: "spring", stiffness: 300, damping: 20 },
//                     rotate: { duration: 1.5, ease: "easeInOut" }
//                   }}
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-4xl shadow-lg">
//                     ✓
//                   </div>
//                 </motion.div>
                
//                 <motion.h3 
//                   className="text-2xl font-bold text-emerald-800 mb-4"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.3 }}
//                 >
//                   Pickup Scheduled!
//                 </motion.h3>
                
//                 <motion.p 
//                   className="text-lg text-emerald-600 mb-6"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.5 }}
//                 >
//                   We've sent confirmation details to your email
//                 </motion.p>
                
//                 <motion.div 
//                   className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100 max-w-md mx-auto mb-8"
//                   variants={containerVariants}
//                   initial="hidden"
//                   animate="visible"
//                 >
//                   <div className="space-y-3 text-left">
//                     <motion.div className="flex justify-between border-b border-emerald-100 pb-3" variants={itemVariants}>
//                       <span className="text-emerald-600">Date:</span>
//                       <span className="font-medium text-emerald-800">{formattedDate}</span>
//                     </motion.div>
//                     <motion.div className="flex justify-between border-b border-emerald-100 pb-3" variants={itemVariants}>
//                       <span className="text-emerald-600">Time:</span>
//                       <span className="font-medium text-emerald-800">{time}</span>
//                     </motion.div>
//                     <motion.div className="flex justify-between" variants={itemVariants}>
//                       <span className="text-emerald-600">Type:</span>
//                       <span className="font-medium text-emerald-800">
//                         {recyclingTypes.find(t => t.id === recyclingType)?.label}
//                       </span>
//                     </motion.div>
//                   </div>
//                 </motion.div>
                
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => {
//                     setIsSubmitted(false);
//                     setCurrentStep(1);
//                   }}
//                   className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-full shadow-lg hover:from-emerald-700 hover:to-emerald-600 transition-all duration-300"
//                 >
//                   Schedule Another Pickup
//                 </motion.button>
//               </motion.div>
//             ) : (
//               <form onSubmit={handleSubmit}>
//                 <AnimatePresence mode="wait">
//                   {/* Step 1: Date & Time Selection */}
//                   {currentStep === 1 && (
//                     <motion.div
//                       key="step1"
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: 20 }}
//                       className="flex flex-col lg:flex-row gap-8 md:gap-12"
//                     >
//                       {/* Left Column - Calendar */}
//                       <div className="lg:w-1/2 space-y-8">
//                         <motion.div 
//                           className="rounded-2xl border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-md"
//                           variants={itemVariants}
//                         >
//                           <h2 className="text-xl font-bold text-emerald-800 mb-4">
//                             Select a Date
//                           </h2>
                          
//                           <Calendar
//                             mode="single"
//                             selected={date}
//                             onSelect={setDate}
//                             className="w-full"
//                             disabled={{ before: addDays(new Date(), 1) }}
//                             modifiersClassNames={{
//                               selected: "bg-emerald-600 text-white",
//                               today: "bg-emerald-100 text-emerald-800 border border-emerald-300"
//                             }}
//                             classNames={{
//                               caption: "flex justify-center py-2 mb-4 relative items-center",
//                               caption_label: "text-emerald-800 font-medium",
//                               nav: "flex items-center",
//                               nav_button: "h-6 w-6 bg-transparent hover:bg-emerald-100 rounded-full flex items-center justify-center",
//                               nav_button_previous: "absolute left-2",
//                               nav_button_next: "absolute right-2",
//                               head_cell: "text-emerald-600 text-sm font-normal",
//                               cell: "p-1",
//                               day: "h-10 w-10 rounded-full flex items-center justify-center transition-colors hover:bg-emerald-200",
//                               day_selected: "bg-emerald-600 text-white hover:bg-emerald-700",
//                               day_disabled: "text-gray-400 hover:bg-transparent"
//                             }}
//                           />
//                         </motion.div>

//                         <motion.div 
//                           className="rounded-2xl border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-md"
//                           variants={itemVariants}
//                         >
//                           <h2 className="text-xl font-bold text-emerald-800 mb-4">
//                             Select a Time
//                           </h2>
                          
//                           <div className="grid grid-cols-4 gap-2">
//                             {timeSlots.map((slot) => (
//                               <motion.button
//                                 key={slot}
//                                 type="button"
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 className={`px-2 py-2 rounded-lg text-xs transition-all ${
//                                   time === slot
//                                     ? "bg-emerald-600 text-white shadow-md"
//                                     : "bg-white text-emerald-800 border border-emerald-200 hover:bg-emerald-50"
//                                 }`}
//                                 onClick={() => setTime(slot)}
//                               >
//                                 {slot}
//                               </motion.button>
//                             ))}
//                           </div>
//                         </motion.div>
//                       </div>

//                       {/* Right Column - Summary */}
//                       <div className="lg:w-1/2">
//                         <motion.div 
//                           className="rounded-2xl border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-md h-full"
//                           variants={itemVariants}
//                         >
//                           <h2 className="text-xl font-bold text-emerald-800 mb-4">
//                             Your Pickup Summary
//                           </h2>
                          
//                           <div className="bg-white p-4 rounded-lg border border-emerald-100 mb-6">
//                             <div className="flex items-center space-x-3">
//                               <div className="text-3xl">📅</div>
//                               <div className="text-left">
//                                 <h3 className="font-medium text-emerald-800">
//                                   {formattedDate}
//                                 </h3>
//                                 <p className="text-emerald-600">at {time}</p>
//                               </div>
//                             </div>
//                           </div>
                          
//                           {!date && (
//                             <div className="text-emerald-600 bg-emerald-50 p-3 rounded-lg border border-emerald-200 text-center mb-6">
//                               Please select a date and time to continue
//                             </div>
//                           )}
//                         </motion.div>
//                       </div>
//                     </motion.div>
//                   )}

//                   {/* Step 2: Recycling Details */}
//                   {currentStep === 2 && (
//                     <motion.div
//                       key="step2"
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: 20 }}
//                       className="flex flex-col lg:flex-row gap-8 md:gap-12"
//                     >
//                       <div className="lg:w-1/2 space-y-8">
//                         <motion.div 
//                           className="rounded-2xl border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-md"
//                           variants={itemVariants}
//                         >
//                           <h2 className="text-xl font-bold text-emerald-800 mb-4">
//                             Recycling Type
//                           </h2>
                          
//                           <div className="grid grid-cols-2 gap-3">
//                             {recyclingTypes.map((type) => (
//                               <motion.button
//                                 key={type.id}
//                                 type="button"
//                                 whileHover={{ scale: 1.03 }}
//                                 whileTap={{ scale: 0.97 }}
//                                 className={`p-3 rounded-xl border-2 transition-all flex items-center ${
//                                   recyclingType === type.id
//                                     ? "border-emerald-500 bg-emerald-50"
//                                     : "border-emerald-100 bg-white"
//                                 }`}
//                                 onClick={() => setRecyclingType(type.id)}
//                               >
//                                 <span className="text-2xl mr-2">{type.icon}</span>
//                                 <span className="text-sm font-medium">{type.label}</span>
//                               </motion.button>
//                             ))}
//                           </div>
//                         </motion.div>

//                         <motion.div 
//                           className="rounded-2xl border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-md"
//                           variants={itemVariants}
//                         >
//                           <h2 className="text-xl font-bold text-emerald-800 mb-4">
//                             Quantity
//                           </h2>
                          
//                           <div className="flex items-center justify-between max-w-xs mx-auto">
//                             <motion.button
//                               type="button"
//                               whileHover={{ scale: 1.1 }}
//                               whileTap={{ scale: 0.9 }}
//                               className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl"
//                               onClick={() => setBagsCount(Math.max(1, bagsCount - 1))}
//                             >
//                               -
//                             </motion.button>
                            
//                             <div className="text-2xl font-bold text-emerald-800 mx-4 min-w-[40px] text-center">
//                               {bagsCount}
//                             </div>
                            
//                             <motion.button
//                               type="button"
//                               whileHover={{ scale: 1.1 }}
//                               whileTap={{ scale: 0.9 }}
//                               className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl"
//                               onClick={() => setBagsCount(bagsCount + 1)}
//                             >
//                               +
//                             </motion.button>
//                           </div>
//                         </motion.div>
//                       </div>

//                       <div className="lg:w-1/2">
//                         <motion.div 
//                           className="rounded-2xl border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-md h-full"
//                           variants={itemVariants}
//                         >
//                           <h2 className="text-xl font-bold text-emerald-800 mb-4">
//                             Recycling Summary
//                           </h2>
                          
//                           <div className="bg-white p-4 rounded-lg border border-emerald-100 mb-6">
//                             <div className="flex items-center space-x-3 mb-3">
//                               <span className="text-2xl">
//                                 {recyclingTypes.find(t => t.id === recyclingType)?.icon}
//                               </span>
//                               <div>
//                                 <h3 className="font-medium text-emerald-800">
//                                   {recyclingTypes.find(t => t.id === recyclingType)?.label}
//                                 </h3>
//                                 <p className="text-emerald-600">
//                                   {bagsCount} {bagsCount === 1 ? "item" : "items"}
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                         </motion.div>
//                       </div>
//                     </motion.div>
//                   )}

//                   {/* Step 3: Contact Information */}
//                   {currentStep === 3 && (
//                     <motion.div
//                       key="step3"
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: 20 }}
//                       className="max-w-2xl mx-auto space-y-6"
//                     >
//                       <motion.div variants={itemVariants}>
//                         <label className="block text-emerald-700 mb-2">Address</label>
//                         <input
//                           type="text"
//                           value={address}
//                           onChange={(e) => setAddress(e.target.value)}
//                           className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                           placeholder="Enter your full address"
//                           required
//                         />
//                       </motion.div>
                      
//                       <div className="grid md:grid-cols-2 gap-6">
//                         <motion.div variants={itemVariants}>
//                           <label className="block text-emerald-700 mb-2">Email</label>
//                           <input
//                             type="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                             placeholder="your@email.com"
//                             required
//                           />
//                         </motion.div>
                        
//                         <motion.div variants={itemVariants}>
//                           <label className="block text-emerald-700 mb-2">Phone</label>
//                           <input
//                             type="tel"
//                             value={phone}
//                             onChange={(e) => setPhone(e.target.value)}
//                             className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                             placeholder="+1 (___) ___-____"
//                             required
//                           />
//                         </motion.div>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>

//                 {/* Navigation Buttons */}
//                 {!isSubmitted && (
//                   <motion.div 
//                     className="flex justify-between mt-12"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.6 }}
//                   >
//                     <motion.button
//                       type="button"
//                       onClick={handlePrevStep}
//                       disabled={currentStep === 1}
//                       className={`px-6 py-3 rounded-full border-2 ${
//                         currentStep === 1 
//                           ? "border-gray-200 text-gray-400 cursor-not-allowed" 
//                           : "border-emerald-300 text-emerald-700 hover:bg-emerald-50"
//                       }`}
//                       whileHover={currentStep > 1 ? { scale: 1.05 } : {}}
//                       whileTap={currentStep > 1 ? { scale: 0.95 } : {}}
//                     >
//                       ← Previous
//                     </motion.button>
                    
//                     <motion.button
//                       type="submit"
//                       disabled={!formComplete}
//                       className={`px-8 py-3 rounded-full ${
//                         formComplete 
//                           ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg hover:from-emerald-700 hover:to-emerald-600"
//                           : "bg-gray-200 text-gray-500 cursor-not-allowed"
//                       }`}
//                       whileHover={formComplete ? { scale: 1.05 } : {}}
//                       whileTap={formComplete ? { scale: 0.95 } : {}}
//                     >
//                       {currentStep < 3 ? "Continue →" : "Schedule Pickup"}
//                     </motion.button>
//                   </motion.div>
//                 )}
//               </form>
//             )}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default DeliveryCollectionPage;

"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from 'next/dynamic';
import { format, addDays } from "date-fns";

// Dynamically import Calendar to avoid SSR issues
const Calendar = dynamic(
  () => import("react-day-picker").then((mod) => mod.DayPicker),
  { 
    ssr: false,
    loading: () => (
      <div className="h-[300px] w-full bg-gradient-to-br from-emerald-50 to-white rounded-xl flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="h-8 w-48 bg-emerald-100 rounded-full"></div>
          <div className="grid grid-cols-7 gap-2">
            {[...Array(35)].map((_, i) => (
              <div key={i} className="h-8 w-8 rounded-full bg-emerald-50"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }
);

const DeliveryCollectionPage = () => {
  const [date, setDate] = useState<Date | undefined>(addDays(new Date(), 1));
  const [time, setTime] = useState("09:00 AM");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [recyclingType, setRecyclingType] = useState("mixed");
  const [bagsCount, setBagsCount] = useState(1);
  const [currentStep, setCurrentStep] = useState(1);
  const [formComplete, setFormComplete] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
  ];

  const recyclingTypes = [
    { id: "mixed", label: "Mixed Recycling", icon: "🔄", color: "bg-emerald-100" },
    { id: "paper", label: "Paper/Cardboard", icon: "📄", color: "bg-blue-100" },
    { id: "plastic", label: "Plastics", icon: "🥤", color: "bg-yellow-100" },
    { id: "glass", label: "Glass", icon: "🔍", color: "bg-green-100" },
    { id: "metal", label: "Metal", icon: "🥫", color: "bg-gray-100" },
    { id: "ewaste", label: "E-Waste", icon: "💻", color: "bg-purple-100" }
  ];

  useEffect(() => {
    const checkFormCompletion = () => {
      if (currentStep === 1) return !!date;
      if (currentStep === 2) return recyclingType !== "" && bagsCount > 0;
      if (currentStep === 3) return address !== "" && email !== "" && phone !== "";
      return false;
    };
    setFormComplete(checkFormCompletion());
  }, [currentStep, date, recyclingType, bagsCount, address, email, phone]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Improved date formatting
  const formattedDate = date ? (
    <div className="text-center">
      <div className="text-2xl font-bold text-emerald-800">
        {format(date, "EEEE")}
      </div>
      <div className="text-4xl font-bold text-emerald-600 my-1">
        {format(date, "d")}
      </div>
      <div className="text-lg text-emerald-700">
        {format(date, "MMMM yyyy")}
      </div>
    </div>
  ) : (
    <div className="text-emerald-600">Select a date</div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-10 px-4 sm:px-6 lg:px-8">
      {/* Floating decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-emerald-100/30"
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 50],
              y: [0, (Math.random() - 0.5) * 30],
              rotate: [0, Math.random() * 360]
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div 
        className="text-center mb-12 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent mb-2"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          EcoCollect
        </motion.h1>
        <motion.h2 
          className="text-3xl font-bold text-emerald-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Schedule a Pickup
        </motion.h2>
        <motion.p 
          className="mt-2 text-emerald-600 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Help us make the planet greener by recycling your waste responsibly
        </motion.p>
      </motion.div>

      {/* Progress Steps */}
      {!isSubmitted && (
        <motion.div 
          className="max-w-4xl mx-auto mb-8 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <motion.button
                  className={`relative w-12 h-12 rounded-full flex items-center justify-center font-medium transition-all ${
                    currentStep === step
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                      : currentStep > step
                      ? "bg-emerald-100 text-emerald-800 border-2 border-emerald-500"
                      : "bg-white text-emerald-400 border-2 border-emerald-200"
                  }`}
                  whileHover={currentStep > step ? { scale: 1.1 } : {}}
                  onClick={() => currentStep > step && setCurrentStep(step)}
                >
                  {currentStep > step ? "✓" : step}
                </motion.button>
                {step < 3 && (
                  <div className={`h-1 w-16 rounded-full ${
                    currentStep > step 
                      ? "bg-gradient-to-r from-emerald-500 to-emerald-300"
                      : "bg-gradient-to-r from-emerald-100 to-emerald-50"
                  }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      )}

      {/* Main Form Container */}
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-emerald-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Form Content */}
          <div className="p-8 md:p-12">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-emerald-50 to-white p-8 rounded-2xl shadow-inner text-center"
              >
                <motion.div 
                  className="relative w-24 h-24 mx-auto mb-8"
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: 1,
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    scale: { type: "spring", stiffness: 300, damping: 20 },
                    rotate: { duration: 1.5, ease: "easeInOut" }
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-4xl shadow-lg">
                    ✓
                  </div>
                </motion.div>
                
                <motion.h3 
                  className="text-2xl font-bold text-emerald-800 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Pickup Scheduled!
                </motion.h3>
                
                <motion.p 
                  className="text-lg text-emerald-600 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  We've sent confirmation details to your email
                </motion.p>
                
                <motion.div 
                  className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100 max-w-md mx-auto mb-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="space-y-3 text-left">
                    <motion.div className="flex justify-between border-b border-emerald-100 pb-3" variants={itemVariants}>
                      <span className="text-emerald-600">Date:</span>
                      <span className="font-medium text-emerald-800">
                        {date && format(date, "MMMM d, yyyy")}
                      </span>
                    </motion.div>
                    <motion.div className="flex justify-between border-b border-emerald-100 pb-3" variants={itemVariants}>
                      <span className="text-emerald-600">Time:</span>
                      <span className="font-medium text-emerald-800">{time}</span>
                    </motion.div>
                    <motion.div className="flex justify-between" variants={itemVariants}>
                      <span className="text-emerald-600">Type:</span>
                      <span className="font-medium text-emerald-800">
                        {recyclingTypes.find(t => t.id === recyclingType)?.label}
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsSubmitted(false);
                    setCurrentStep(1);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-full shadow-lg hover:from-emerald-700 hover:to-emerald-600 transition-all duration-300"
                >
                  Schedule Another Pickup
                </motion.button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {/* Step 1: Date & Time Selection */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex flex-col lg:flex-row gap-8 md:gap-12"
                    >
                      {/* Left Column - Calendar */}
                      <div className="lg:w-1/2 space-y-8">
                        <motion.div 
                          className="rounded-2xl border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-md"
                          variants={itemVariants}
                        >
                          <h2 className="text-xl font-bold text-emerald-800 mb-4">
                            Select a Date
                          </h2>
                          
                          {/* <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="w-full"
                            disabled={{ before: addDays(new Date(), 1) }}
                            modifiersClassNames={{
                              selected: "bg-emerald-600 text-white",
                              today: "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            }}
                            classNames={{
                              caption: "flex justify-center py-2 mb-4 relative items-center",
                              caption_label: "text-emerald-800 font-medium",
                              nav: "flex items-center",
                              nav_button: "h-6 w-6 bg-transparent hover:bg-emerald-100 rounded-full flex items-center justify-center",
                              nav_button_previous: "absolute left-2",
                              nav_button_next: "absolute right-2",
                              head_cell: "text-emerald-600 text-sm font-normal",
                              cell: "p-1",
                              day: "h-10 w-10 rounded-full flex items-center justify-center transition-colors hover:bg-emerald-200",
                              day_selected: "bg-emerald-600 text-white hover:bg-emerald-700",
                              day_disabled: "text-gray-400 hover:bg-transparent"
                            }}
                          /> */}
                          <Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="w-full"
  disabled={{ before: addDays(new Date(), 1) }}
  modifiersClassNames={{
    selected: "bg-emerald-600 text-white",
    today: "bg-emerald-100 text-emerald-800 border border-emerald-300"
  }}
  classNames={{
    caption: "flex justify-center py-2 mb-4 relative items-center",
    caption_label: "text-emerald-800 font-medium text-sm",
    nav: "flex items-center",
    nav_button: "h-6 w-6 bg-transparent hover:bg-emerald-100 rounded-full flex items-center justify-center",
    nav_button_previous: "absolute left-2",
    nav_button_next: "absolute right-2",
    head_cell: "text-emerald-600 text-xs font-normal uppercase",
    cell: "p-1 text-center text-sm",
    day: "h-8 w-8 rounded-full flex items-center justify-center transition-colors hover:bg-emerald-200 mx-auto",
    day_selected: "bg-emerald-600 text-white hover:bg-emerald-700",
    day_disabled: "text-gray-400 hover:bg-transparent cursor-not-allowed",
    day_today: "font-semibold",
    day_outside: "text-gray-400 opacity-50",
    day_range_middle: "bg-emerald-100 text-emerald-800",
    day_hidden: "invisible"
  }}
/>
                        </motion.div>

                        <motion.div 
                          className="rounded-2xl border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-md"
                          variants={itemVariants}
                        >
                          <h2 className="text-xl font-bold text-emerald-800 mb-4">
                            Select a Time
                          </h2>
                          
                          <div className="grid grid-cols-4 gap-2">
                            {timeSlots.map((slot) => (
                              <motion.button
                                key={slot}
                                type="button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`px-2 py-2 rounded-lg text-xs transition-all ${
                                  time === slot
                                    ? "bg-emerald-600 text-white shadow-md"
                                    : "bg-white text-emerald-800 border border-emerald-200 hover:bg-emerald-50"
                                }`}
                                onClick={() => setTime(slot)}
                              >
                                {slot}
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      </div>

                      {/* Right Column - Summary */}
                      <div className="lg:w-1/2">
                        <motion.div 
                          className="rounded-2xl border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-md h-full flex flex-col"
                          variants={itemVariants}
                        >
                          <h2 className="text-xl font-bold text-emerald-800 mb-4">
                            Your Pickup Summary
                          </h2>
                          
                          <div className="bg-white p-6 rounded-lg border border-emerald-100 mb-6 flex-1 flex flex-col items-center justify-center">
                            <div className="text-center mb-6">
                              <div className="text-5xl mb-4">📅</div>
                              {formattedDate}
                            </div>
                            <div className="text-xl text-emerald-700 font-medium">
                              at {time}
                            </div>
                          </div>
                          
                          {!date && (
                            <div className="text-emerald-600 bg-emerald-50 p-3 rounded-lg border border-emerald-200 text-center">
                              Please select a date and time to continue
                            </div>
                          )}
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Recycling Details */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex flex-col lg:flex-row gap-8 md:gap-12"
                    >
                      <div className="lg:w-1/2 space-y-8">
                        <motion.div 
                          className="rounded-2xl border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-md"
                          variants={itemVariants}
                        >
                          <h2 className="text-xl font-bold text-emerald-800 mb-4">
                            Recycling Type
                          </h2>
                          
                          <div className="grid grid-cols-2 gap-3">
                            {recyclingTypes.map((type) => (
                              <motion.button
                                key={type.id}
                                type="button"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className={`p-3 rounded-xl border-2 transition-all flex items-center ${
                                  recyclingType === type.id
                                    ? "border-emerald-500 bg-emerald-50"
                                    : "border-emerald-100 bg-white"
                                }`}
                                onClick={() => setRecyclingType(type.id)}
                              >
                                <span className="text-2xl mr-2">{type.icon}</span>
                                <span className="text-sm font-medium">{type.label}</span>
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>

                        <motion.div 
                          className="rounded-2xl border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-md"
                          variants={itemVariants}
                        >
                          <h2 className="text-xl font-bold text-emerald-800 mb-4">
                            Quantity
                          </h2>
                          
                          <div className="flex items-center justify-between max-w-xs mx-auto">
                            <motion.button
                              type="button"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl"
                              onClick={() => setBagsCount(Math.max(1, bagsCount - 1))}
                            >
                              -
                            </motion.button>
                            
                            <div className="text-2xl font-bold text-emerald-800 mx-4 min-w-[40px] text-center">
                              {bagsCount}
                            </div>
                            
                            <motion.button
                              type="button"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl"
                              onClick={() => setBagsCount(bagsCount + 1)}
                            >
                              +
                            </motion.button>
                          </div>
                        </motion.div>
                      </div>

                      <div className="lg:w-1/2">
                        <motion.div 
                          className="rounded-2xl border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-md h-full"
                          variants={itemVariants}
                        >
                          <h2 className="text-xl font-bold text-emerald-800 mb-4">
                            Recycling Summary
                          </h2>
                          
                          <div className="bg-white p-4 rounded-lg border border-emerald-100 mb-6">
                            <div className="flex items-center space-x-3 mb-3">
                              <span className="text-2xl">
                                {recyclingTypes.find(t => t.id === recyclingType)?.icon}
                              </span>
                              <div>
                                <h3 className="font-medium text-emerald-800">
                                  {recyclingTypes.find(t => t.id === recyclingType)?.label}
                                </h3>
                                <p className="text-emerald-600">
                                  {bagsCount} {bagsCount === 1 ? "item" : "items"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Contact Information */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="max-w-2xl mx-auto space-y-6"
                    >
                      <motion.div variants={itemVariants}>
                        <label className="block text-emerald-700 mb-2">Address</label>
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="Enter your full address"
                          required
                        />
                      </motion.div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <motion.div variants={itemVariants}>
                          <label className="block text-emerald-700 mb-2">Email</label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="your@email.com"
                            required
                          />
                        </motion.div>
                        
                        <motion.div variants={itemVariants}>
                          <label className="block text-emerald-700 mb-2">Phone</label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="+1 (___) ___-____"
                            required
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                {!isSubmitted && (
                  <motion.div 
                    className="flex justify-between mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <motion.button
                      type="button"
                      onClick={handlePrevStep}
                      disabled={currentStep === 1}
                      className={`px-6 py-3 rounded-full border-2 ${
                        currentStep === 1 
                          ? "border-gray-200 text-gray-400 cursor-not-allowed" 
                          : "border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                      }`}
                      whileHover={currentStep > 1 ? { scale: 1.05 } : {}}
                      whileTap={currentStep > 1 ? { scale: 0.95 } : {}}
                    >
                      ← Previous
                    </motion.button>
                    
                    <motion.button
                      type="submit"
                      disabled={!formComplete}
                      className={`px-8 py-3 rounded-full ${
                        formComplete 
                          ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg hover:from-emerald-700 hover:to-emerald-600"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                      whileHover={formComplete ? { scale: 1.05 } : {}}
                      whileTap={formComplete ? { scale: 0.95 } : {}}
                    >
                      {currentStep < 3 ? "Continue →" : "Schedule Pickup"}
                    </motion.button>
                  </motion.div>
                )}
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DeliveryCollectionPage;