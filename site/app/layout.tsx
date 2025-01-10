// app/layout.tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Display from "@/components/Display"
import Sidebar from "@/components/Sidebar"
import sidebarweb from "@/components/Sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ShareBite",
  description: "Food Sharing Platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div 
          className="min-h-screen bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('/background.jpg')`,
          }}
        >
          {/* Add a blur overlay */}
          <div className="min-h-screen backdrop-blur-sm bg-black/30 pb-10">
            {children}
          </div>
        </div>
        <Sidebar></Sidebar>
      </body>
    </html>
  )
}
