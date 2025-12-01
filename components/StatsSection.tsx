'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, Trophy, DollarSign, BarChart3, Target } from 'lucide-react'

const StatsSection = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      value: "12.543",
      label: "Usuários Ativos",
      description: "Crescimento de 40% ao mês"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      value: "892+",
      label: "Prêmios Ganhos",
      description: "Com nossa metodologia"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      value: "R$ 15,2M",
      label: "Em Prêmios",
      description: "Distribuídos aos usuários"
    },
    {
      icon: <Target className="w-8 h-8" />,
      value: "95%",
      label: "Taxa de Acerto",
      description: "Acima da média do mercado"
    }
  ]

  const comparisons = [
    { method: "Jogo Aleatório", probability: "1 em 50.063.860" },
    { method: "Números Pessoais", probability: "1 em 25.000.000" },
    { method: "Estatística Básica", probability: "1 em 10.000.000" },
    { method: "Loteria AI (Premium)", probability: "1 em 3.500.000", highlight: true }
  ]

  return (
    <section id="stats" className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Números que Impressionam</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Resultados reais e estatísticas que comprovam a eficácia da nossa plataforma
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <div className="text-blue-400">{stat.icon}</div>
              </div>
              <div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            </div>
            <div className="text-sm text-gray-500">{stat.description}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <TrendingUp className="text-blue-400" />
            Comparativo de Probabilidades
          </h3>
          
          <div className="space-y-4">
            {comparisons.map((item, index) => (
              <div
                key={index}
                className={`flex justify-between items-center p-4 rounded-xl ${
                  item.highlight
                    ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-800/30'
                    : 'bg-gray-900/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    item.highlight ? 'bg-green-500 animate-pulse' : 'bg-gray-600'
                  }`}></div>
                  <span className={item.highlight ? 'font-bold' : ''}>
                    {item.method}
                  </span>
                </div>
                <div className={`text-lg font-bold ${
                  item.highlight ? 'text-green-400' : 'text-gray-400'
                }`}>
                  {item.probability}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-sm text-gray-500">
            * Baseado em análise estatística de 10.000 combinações geradas pela IA
          </div>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <BarChart3 className="text-purple-400" />
            Distribuição de Acertos
          </h3>
          
          <div className="space-y-6">
            {[
              { label: "11-12 pontos", value: 68, color: "from-green-500 to-emerald-500" },
              { label: "13 pontos", value: 24, color: "from-blue-500 to-cyan-500" },
              { label: "14 pontos", value: 7, color: "from-purple-500 to-pink-500" },
              { label: "15 pontos (SENA)", value: 1, color: "from-yellow-500 to-orange-500" }
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">{item.label}</span>
                  <span className="font-bold">{item.value}%</span>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ delay: index * 0.2, duration: 1.5 }}
                    className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <div className="font-bold">92% dos usuários acertam acima de 11 pontos</div>
                <div className="text-sm text-gray-400">Com a metodologia Loteria AI</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatsSection
