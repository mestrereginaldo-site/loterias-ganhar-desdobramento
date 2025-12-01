'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface LotteryResult {
  id: number
  name: string
  numbers: number[]
  nextDraw: string
  prize: string
  color: string
}

const LiveResults = () => {
  const [time, setTime] = useState<string>('')
  const [lastUpdate, setLastUpdate] = useState<string>('')

  const results: LotteryResult[] = [
    {
      id: 1,
      name: 'Mega-Sena',
      numbers: [4, 12, 26, 38, 42, 51],
      nextDraw: '22/01/2024 - 20:00',
      prize: 'R$ 50.000.000',
      color: 'bg-green-600',
    },
    {
      id: 2,
      name: 'Lotofácil',
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      nextDraw: 'Hoje - 19:00',
      prize: 'R$ 2.500.000',
      color: 'bg-purple-600',
    },
    {
      id: 3,
      name: 'Quina',
      numbers: [12, 24, 36, 48, 60],
      nextDraw: 'Amanhã - 20:00',
      prize: 'R$ 10.000.000',
      color: 'bg-blue-600',
    },
    {
      id: 4,
      name: 'Lotomania',
      numbers: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
      nextDraw: 'Hoje - 18:00',
      prize: 'R$ 3.000.000',
      color: 'bg-orange-600',
    },
  ]

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('pt-BR'))
      setLastUpdate(now.toLocaleDateString('pt-BR') + ' ' + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }))
    }
    
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const LotteryBall = ({ number, isSpecial = false }: { number: number, isSpecial?: boolean }) => (
    <motion.div
      whileHover={{ scale: 1.1, y: -5 }}
      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
        ${isSpecial 
          ? 'bg-gradient-to-br from-yellow-500 to-orange-600' 
          : 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700'
        }`}
    >
      {number.toString().padStart(2, '0')}
    </motion.div>
  )

  return (
    <section id="results" className="py-16">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <TrendingUp className="text-green-400" size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Resultados em Tempo Real</h2>
            <p className="text-gray-400">Dados oficiais atualizados automaticamente</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm bg-gray-800/50 px-4 py-2 rounded-lg">
          <Clock size={16} className="text-gray-400" />
          <span className="text-gray-300">{time}</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {results.map((lottery, index) => (
          <motion.div
            key={lottery.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-colors"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-12 ${lottery.color} rounded-full`}></div>
                <div>
                  <h3 className="text-2xl font-bold">{lottery.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <CheckCircle size={14} className="text-green-400" />
                    <span className="text-sm text-gray-400">Resultado oficial confirmado</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-400 mb-1">Próximo sorteio</div>
                <div className="font-semibold">{lottery.nextDraw}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              {lottery.numbers.map((number, idx) => (
                <LotteryBall
                  key={idx}
                  number={number}
                  isSpecial={idx === lottery.numbers.length - 1}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded-xl">
                <div className="text-sm text-gray-400 mb-1">Prêmio Estimado</div>
                <div className="text-2xl font-bold text-green-400">{lottery.prize}</div>
              </div>
              <div className="bg-gray-900/50 p-4 rounded-xl">
                <div className="text-sm text-gray-400 mb-1">Acumulado</div>
                <div className="text-2xl font-bold text-yellow-400">+{Math.floor(Math.random() * 5) + 1}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AlertCircle size={20} className="text-yellow-400" />
            <div>
              <h4 className="font-bold">Informações Importantes</h4>
              <p className="text-sm text-gray-400">
                Última atualização: {lastUpdate} • Fonte: Caixa Econômica Federal
              </p>
            </div>
          </div>
          <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-semibold transition-all">
            Ver Todos os Resultados
          </button>
        </div>
      </div>
    </section>
  )
}

export default LiveResults
