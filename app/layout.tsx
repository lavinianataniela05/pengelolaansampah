// // app/layout.tsx
// import './globals.css'
// import { ReactNode } from 'react'
// import Sidebar from '@/components/mainpage/Sidebar'

// export default function RootLayout({ children }: { children: ReactNode }) {
//   return (
//     <html lang="en">
//       <body className="flex bg-gray-100 min-h-screen">
//         <Sidebar />
//         <main className="flex-1 p-6">{children}</main>
//       </body>
//     </html>
//   )
// }

// app/layout.tsx
// 'use client'

// import { usePathname } from 'next/navigation'
// import Sidebar from '@/components/mainpage/Sidebar'
// import './globals.css'

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const pathname = usePathname()

//   // Define routes that should NOT show sidebar
//   const noSidebarRoutes = ['/', '/login', '/register']

//   const shouldShowSidebar = !noSidebarRoutes.includes(pathname)

//   return (
//     <html lang="en">
//       <body className="min-h-screen flex">
//         {shouldShowSidebar && (
//           <div className="w-57">
//             <Sidebar />
//           </div>
//         )}

//         <main className="flex-1 p-0">
//           {children}
//         </main>
//       </body>
//     </html>
//   )
// }

'use client'

import { usePathname } from 'next/navigation'
import Sidebar from '@/components/mainpage/Sidebar'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Define routes that should NOT show sidebar
  const noSidebarRoutes = ['/', '/login', '/register']

  const shouldShowSidebar = !noSidebarRoutes.includes(pathname)

  return (
    <html lang="en">
      <body className={`min-h-screen ${shouldShowSidebar ? 'flex' : ''}`}>
        {shouldShowSidebar && (
          <div className="w-57 fixed h-full">
            <Sidebar />
          </div>
        )}

        <main className={`${shouldShowSidebar ? 'flex-1 ml-57' : ''} p-0 w-full`}>
          {children}
        </main>
      </body>
    </html>
  )
}
