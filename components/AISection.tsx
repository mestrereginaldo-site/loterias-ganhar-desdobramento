'use client'

import { motion } from 'framer-motion'
import { Brain, Cpu, BarChart3, Target } from 'lucide-react'

const AISection = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Machine Learning",
      description: "Nossa IA aprende com milhões de resultados passados para identificar padrões ocultos.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Algoritmos Genéticos",
      description: "Evoluímos combinações até encontrar as mais otimizadas matematicamente.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Análise Estatística",
      description: "Processamos dados em tempo real para calcular probabilidades precisas.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Otimização de Carteira",
      description: "Maximizamos a cobertura de números com o mínimo de jogos possíveis.",
      color: "from-orange-500 to-red-500"
    }
  ]

  return (
    <section id="ai" className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Tecnologia de Ponta com IA</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Utilizamos as mais avançadas técnicas de inteligência artificial para maximizar suas chances
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all group"
          >
            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
              <div className="text-white">{feature.icon}</div>
            </div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 border border-gray-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Resultados Comprovados
              </span>
            </h3>
            <p className="text-gray-300 mb-6">
              Nossos algoritmos de IA já ajudaram milhares de usuários a aumentar significativamente suas chances. 
              Veja o comparativo:
            </p>
            <ul className="space-y-3">
              {[
                "Aumento de 300% na probabilidade de acerto",
                "Economia média de 70% no valor das apostas",
                "92% de cobertura dos números selecionados",
                "Garantia matemática de 11 pontos na Lotofácil"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-900/50 rounded-xl p-6">
            <div className="space-y-6">
              {[
                { label: "Chances Sem IA", value: 15 },
                { label: "Chances Com IA", value: 78 },
                { label: "Economia Sem IA", value: 35 },
                { label: "Economia Com IA", value: 85 }
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">{stat.label}</span>
                    <span className="font-bold">{stat.value}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.value}%` }}
                      transition={{ delay: idx * 0.2, duration: 1 }}
                      className={`h-full rounded-full ${
                        idx % 2 === 0 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                          : 'bg-gradient-to-r from-green-500 to-emerald-500'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AISection
