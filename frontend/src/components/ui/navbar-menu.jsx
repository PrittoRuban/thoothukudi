// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { motion, AnimatePresence } from "framer-motion";

// export const FloatingNav = ({ navItems }) => {
//   const [isVisible, setIsVisible] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;

//       // Show navbar when scrolling up, hide when scrolling down
//       if (currentScrollY < lastScrollY) {
//         setIsVisible(true);
//       } else if (currentScrollY > 100) {
//         setIsVisible(false);
//       }

//       setLastScrollY(currentScrollY);
//     };

//     // Add scroll event listener
//     window.addEventListener('scroll', handleScroll);

//     // Cleanup
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [lastScrollY]);

//   return (
//     <AnimatePresence>
//       {isVisible && (
//         <motion.nav
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -50 }}
//           transition={{ duration: 0.3 }}
//           className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50
//           flex space-x-6 px-8 py-4
//           bg-black/70 backdrop-blur-md text-white
//           shadow-lg rounded-full border border-white/10"
//         >
//           {navItems.map((item, index) => (
//             <Link
//               key={index}
//               href={item.link}
//               className="cursor-pointer text-white hover:opacity-90 transition-opacity duration-300"
//             >
//               {item.name}
//             </Link>
//           ))}
//         </motion.nav>
//       )}
//     </AnimatePresence>
//   );
// };

"use client";
import React from "react";
import Link from "next/link";

export const FloatingNav = ({ navItems }) => {
  return (
    <nav className="relative flex space-x-6 px-8 py-4 bg-black text-white shadow-lg rounded-full border border-white/10">
      {navItems.map((item, index) => (
        <Link
          key={index}
          href={item.link}
          className="cursor-pointer text-white hover:opacity-90 transition-opacity duration-300"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};
