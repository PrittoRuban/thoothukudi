// "use client";
// import Link from "next/link";
// import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar.jsx";
// import { IconHome, IconSettings, IconUser, IconCalendar, IconHistory } from "@tabler/icons-react";
// import { FloatingNav } from "@/components/ui/navbar-menu.jsx";
// import HeroSectionOne from "../components/ui/HeroSectionOne.jsx";
// import { FeaturesSectionDemo } from "@/components/ui/features.jsx";

// export default function Home() {
//   return (
//     <div className="flex">
//       {/* Floating Navbar added at the top level */}
//       <FloatingNav 
//         navItems={[
//           { name: "Home", link: "/" },
//           { name: "About Us", link: "/about" },
//           { name: "Maps", link: "/maps" },
//           { name: "Contact Us", link: "/contact" }
//         ]} 
//       />

//       <Sidebar>
//         <SidebarBody>
//           <div className="flex flex-col h-full pt-16">
//             <SidebarLink link={{ href: "/", label: "Home", icon: <IconHome /> }} />
//             <SidebarLink link={{ href: "/settings", label: "Settings", icon: <IconSettings /> }} />
//             <SidebarLink link={{ href: "/user", label: "User Account", icon: <IconUser /> }} />
//             <SidebarLink link={{ href: "/calendar", label: "Calendar", icon: <IconCalendar /> }} />
//             <SidebarLink link={{ href: "/history", label: "History", icon: <IconHistory /> }} />
//           </div>
//         </SidebarBody>
//       </Sidebar>

//       <div className="flex-1">
//         {/* Removed previous navbar, as we now have a floating navbar */}
//         <HeroSectionOne />
//         <FeaturesSectionDemo/>
//       </div>
//     </div>
//   );
// }
// app/page.jsx
"use client";
import React, { useCallback } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../components/ui/sidebar.jsx";
import { IconHome, IconSettings, IconUser, IconCalendar, IconHistory } from "@tabler/icons-react";
import { FloatingNav } from "@/components/ui/navbar-menu.jsx";
import HeroSectionOne from "../components/ui/HeroSectionOne.jsx";
import { FeaturesSectionDemo } from "@/components/ui/features.jsx";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const sidebarLinks = [
  { href: "/", label: "Home", icon: <IconHome /> },
  { href: "/settings", label: "Settings", icon: <IconSettings /> },
  { href: "/user", label: "User Account", icon: <IconUser /> },
  { href: "/calendar", label: "Calendar", icon: <IconCalendar /> },
  { href: "/history", label: "History", icon: <IconHistory /> },
];

export default function Home() {
  const router = useRouter(); // Initialize router

  const handleLoginRedirect = useCallback(() => {
    router.push("/auth"); // Redirect to /auth page
  }, [router]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar>
        <SidebarBody>
          <div className="flex flex-col h-full pt-16">
            {sidebarLinks.map((link, index) => (
              <SidebarLink key={index} link={link} />
            ))}
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1">
        {/* Navbar */}
        <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
            <h1 className="text-base font-bold md:text-2xl">Haven Trail</h1>
          </div>

          <FloatingNav
            navItems={[
              { name: "Home", link: "/" },
              { name: "About Us", link: "/about" },
              { name: "Maps", link: "/maps" },
              { name: "Contact Us", link: "/contact" },
            ]}
          />

          {/* Login Button (Redirects to /auth) */}
          <button
            onClick={handleLoginRedirect}
            className="w-24 md:w-32 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            Login
          </button>
        </nav>

        {/* Sections */}
        <HeroSectionOne />
        <FeaturesSectionDemo />
      </div>
    </div>
  );
}