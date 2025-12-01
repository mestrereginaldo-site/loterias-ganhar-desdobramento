'use client'

import { motion } from 'framer-motion'
import { Sparkles, Target, Zap, Shield } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

const HeroSection = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      toast.success('Cadastrado para a lista de espera!')
      setEmail('')
    }
  }

  const features = [
    {
      icon: <Target className="w-5 h-5" />,
      title: 'Desdobramentos Otimizados',
      desc: 'Algoritmos matemáticos avançados',
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'IA Avançada',
      desc: 'Machine Learning para previsões',
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: '95% de Eficiência',
      desc: 'Comprovado por nossos usuários',
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: 'Resultados Ao Vivo',
      desc: 'Atualização em tempo real',
    },
  ]

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 text-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 container mx-auto px-4"
      >
        <div className="inline-flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-full mb-6 border border-gray-700">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span className="text-sm text-gray-300">+50.000 combinações geradas hoje</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="block">Ganhar na Loteria</span>
          <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            é uma Ciência
          </span>
        </h1>

        <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Use a inteligência artificial para maximizar suas chances com
          desdobramentos matematicamente otimizados. Economize até 70% e aumente
          suas probabilidades em 300%.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={() => toast.success('Iniciando modo gratuito!')}
            className="group relative bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-green-500/30 overflow-hidden"
          >
            <span className="relative z-10">Começar Gratuitamente</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </button>
          
          <button
            onClick={() => {
              const element = document.getElementById('premium')
              element?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 border border-gray-700"
          >
            <span className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              Ver Planos Premium
            </span>
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-blue-500 transition-colors"
            >
              <div className="inline-flex p-3 bg-blue-500/20 rounded-xl mb-4">
                <div className="text-blue-400">{feature.icon}</div>
              </div>
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Email Capture */}
        <div className="max-w-md mx-auto bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-gray-700">
          <h3 className="text-xl font-bold mb-4">Lista de Espera Premium</h3>
          <p className="text-gray-400 mb-6">
            Seja o primeiro a testar os recursos avançados de IA
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all"
            >
              Garantir Vaga na Lista
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection
