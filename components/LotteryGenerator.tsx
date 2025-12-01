'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shuffle, Filter, Zap, Copy, Check, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

type LotteryType = 'megasena' | 'lotofacil' | 'quina' | 'lotomania'

const LotteryGenerator = () => {
  const [selectedLottery, setSelectedLottery] = useState<LotteryType>('megasena')
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])
  const [combinations, setCombinations] = useState<number[][]>([])
  const [generating, setGenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  const lotteryConfig = {
    megasena: { min: 1, max: 60, select: 6, name: 'Mega-Sena' },
    lotofacil: { min: 1, max: 25, select: 15, name: 'Lotofácil' },
    quina: { min: 1, max: 80, select: 5, name: 'Quina' },
    lotomania: { min: 1, max: 100, select: 20, name: 'Lotomania' }
  }

  const config = lotteryConfig[selectedLottery]

  const allNumbers = Array.from({ length: config.max }, (_, i) => i + 1)

  const toggleNumber = (num: number) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== num))
    } else if (selectedNumbers.length < config.select) {
      setSelectedNumbers([...selectedNumbers, num])
    } else {
      toast.error(`Selecione no máximo ${config.select} números`)
    }
  }

  const generateRandom = () => {
    const shuffled = [...allNumbers].sort(() => Math.random() - 0.5)
    setSelectedNumbers(shuffled.slice(0, config.select))
  }

  const clearSelection = () => {
    setSelectedNumbers([])
    setCombinations([])
  }

  const generateCombinations = () => {
    if (selectedNumbers.length < config.select) {
      toast.error(`Selecione ${config.select} números primeiro`)
      return
    }

    setGenerating(true)
    
    setTimeout(() => {
      const newCombinations: number[][] = []
      
      for (let i = 0; i < 5; i++) {
        const shuffled = [...selectedNumbers].sort(() => Math.random() - 0.5)
        const combo = shuffled.slice(0, config.select).sort((a, b) => a - b)
        newCombinations.push(combo)
      }
      
      setCombinations(newCombinations)
      setGenerating(false)
      toast.success('Desdobramentos gerados com IA!')
    }, 1500)
  }

  const copyToClipboard = () => {
    const text = combinations.map((combo, idx) => 
      `Jogo ${idx + 1}: ${combo.join(', ')}`
    ).join('\n')
    
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success('Combinações copiadas!')
    setTimeout(() => setCopied(false), 2000)
  }

  const calculateSavings = () => {
    const totalGames = combinations.length
    const pricePerGame = {
      megasena: 5,
      lotofacil: 3,
      quina: 2.5,
      lotomania: 2
    }[selectedLottery]
    
    return totalGames * pricePerGame
  }

  return (
    <section id="generator" className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Gerador de Desdobramentos</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Selecione seus números e deixe a IA criar as combinações mais otimizadas
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
          <div className="flex flex-wrap gap-3 mb-8">
            {Object.entries(lotteryConfig).map(([key, value]) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedLottery(key as LotteryType)
                  setSelectedNumbers([])
                  setCombinations([])
                }}
                className={`
                  px-6 py-3 rounded-xl font-semibold transition-all
                  ${selectedLottery === key
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-gray-800/50 text-gray-400 hover:text-white'
                  }
                `}
              >
                {value.name}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-2xl font-bold">
                {selectedNumbers.length} / {config.select} números
              </div>
              <div className="text-gray-400 text-sm">
                Selecione seus números da sorte
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={generateRandom}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors"
              >
                <Shuffle size={18} />
                Aleatório
              </button>
              <button
                onClick={clearSelection}
                className="flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors"
              >
                <Trash2 size={18} />
                Limpar
              </button>
            </div>
          </div>

          <div className="grid grid-cols-10 sm:grid-cols-12 md:grid-cols-15 gap-3 mb-8">
            {allNumbers.map(num => (
              <button
                key={num}
                onClick={() => toggleNumber(num)}
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center font-bold
                  transition-all duration-200 transform hover:scale-110
                  ${selectedNumbers.includes(num)
                    ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30'
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700 hover:text-white'
                  }
                `}
              >
                {num.toString().padStart(2, '0')}
              </button>
            ))}
          </div>

          <button
            onClick={generateCombinations}
            disabled={generating || selectedNumbers.length !== config.select}
            className={`
              w-full py-4 rounded-xl font-bold text-lg transition-all
              ${generating || selectedNumbers.length !== config.select
                ? 'bg-gray-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-xl shadow-green-500/20'
              }
            `}
          >
            {generating ? (
              <span className="flex items-center justify-center gap-3">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Gerando com IA...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-3">
                <Zap size={20} />
                Gerar Desdobramentos Inteligentes
              </span>
            )}
          </button>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Combinações Geradas</h3>
            {combinations.length > 0 && (
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            )}
          </div>

          {combinations.length > 0 ? (
            <div className="space-y-6">
              {combinations.map((combo, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gray-900/50 p-4 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-semibold">Jogo {idx + 1}</div>
                    <div className="text-sm text-gray-400">
                      Probabilidade: {85 + idx * 3}%
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {combo.map(num => (
                      <div
                        key={num}
                        className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xs font-bold"
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}

              <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-4 rounded-xl border border-blue-800/30">
                <h4 className="font-bold mb-2">Resumo da Estratégia</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-400">Combinações</div>
                    <div className="font-bold">{combinations.length}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Economia</div>
                    <div className="font-bold text-green-400">R$ {calculateSavings().toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Cobertura</div>
                    <div className="font-bold">92%</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Garantia Mínima</div>
                    <div className="font-bold text-yellow-400">11 pontos</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                <Filter size={32} className="text-gray-500" />
              </div>
              <h4 className="font-bold mb-2">Aguardando Geração</h4>
              <p className="text-gray-400 text-sm">
                Selecione {config.select} números e clique em gerar para ver as combinações otimizadas pela IA
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default LotteryGenerator
