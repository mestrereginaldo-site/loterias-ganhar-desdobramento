'use client'

import { useState, useEffect } from 'react'
import AnimatedHeader from '@/components/AnimatedHeader'
import HeroSection from '@/components/HeroSection'
import LiveResults from '@/components/LiveResults'
import LotteryGenerator from '@/components/LotteryGenerator'
import AISection from '@/components/AISection'
import PremiumPlans from '@/components/PremiumPlans'
import StatsSection from '@/components/StatsSection'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Carregando Loteria AI...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black">
      <AnimatedHeader />
      
      <main className="container mx-auto px-4">
        <HeroSection />
        <LiveResults />
        <LotteryGenerator />
        <AISection />
        <PremiumPlans />
        <StatsSection />
      </main>
      
      <Footer />
    </div>
  )
}
