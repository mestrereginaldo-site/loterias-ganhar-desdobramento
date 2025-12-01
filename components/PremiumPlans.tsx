'use client'

import { motion } from 'framer-motion'
import { Check, X, Crown, Sparkles, Zap, Shield } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

const PremiumPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly')

  const plans = [
    {
      name: "Básico",
      price: { monthly: 0, yearly: 0 },
      description: "Para testar a plataforma",
      color: "from-gray-600 to-gray-700",
      features: [
        { text: "3 desdobramentos por dia", included: true },
        { text: "Resultados em tempo real", included: true },
        { text: "Gerador básico", included: true },
        { text: "IA Avançada", included: false },
        { text: "Desdobramentos ilimitados", included: false },
        { text: "Estatísticas detalhadas", included: false },
        { text: "Suporte prioritário", included: false },
        { text: "Alertas inteligentes", included: false }
      ],
      cta: "Usar Gratuitamente",
      popular: false
    },
    {
      name: "Premium",
      price: { monthly: 29.90, yearly: 287.04 },
      description: "Para jogadores sérios",
      color: "from-blue-600 to-purple-600",
      features: [
        { text: "Desdobramentos ilimitados", included: true },
        { text: "IA Avançada com Machine Learning", included: true },
        { text: "Estatísticas em tempo real", included: true },
        { text: "Alertas inteligentes", included: true },
        { text: "Análise de números quentes/frios", included: true },
        { text: "Suporte prioritário 24/7", included: true },
        { text: "Exportação de combinações", included: true },
        { text: "Acesso antecipado a novas features", included: true }
      ],
      cta: "Assinar Premium",
      popular: true
    },
    {
      name: "Pro",
      price: { monthly: 99.90, yearly: 958.08 },
      description: "Para investidores",
      color: "from-emerald-600 to-green-600",
      features: [
        { text: "Tudo do Premium", included: true },
        { text: "Consultoria IA personalizada", included: true },
        { text: "API para integração", included: true },
        { text: "Relatórios detalhados", included: true },
        { text: "Gestão de múltiplas contas", included: true },
        { text: "Treinamentos exclusivos", included: true },
        { text: "Concierge dedicado", included: true },
        { text: "Garantia de resultados ou dinheiro de volta", included: true }
      ],
      cta: "Contratar Pro",
      popular: false
    }
  ]

  const handleSubscribe = (planName: string) => {
    toast.success(`Iniciando assinatura do plano ${planName}!`)
    // Em produção, aqui seria a integração com gateway de pagamento
  }

  const calculateSavings = (monthly: number, yearly: number) => {
    return Math.round(((monthly * 12 - yearly) / (monthly * 12)) * 100)
  }

  return (
    <section id="premium" className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Escolha Seu Plano</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Invista em sua estratégia com nossos planos otimizados para cada perfil de jogador
        </p>
        
        {/* Toggle mensal/anual */}
        <div className="inline-flex bg-gray-800/50 rounded-full p-1 mt-8">
          <button
            onClick={() => setSelectedPlan('monthly')}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              selectedPlan === 'monthly'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Mensal
          </button>
          <button
            onClick={() => setSelectedPlan('yearly')}
            className={`px-6 py-2 rounded-full font-semibold transition-all relative ${
              selectedPlan === 'yearly'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Anual
            <span className="absolute -top-2 -right-2 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
              -20%
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => {
          const price = selectedPlan === 'monthly' ? plan.price.monthly : plan.price.yearly
          const isYearly = selectedPlan === 'yearly'
          const savings = isYearly && plan.price.monthly > 0 
            ? calculateSavings(plan.price.monthly, plan.price.yearly)
            : 0

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 border transition-all ${
                plan.popular
                  ? 'border-blue-500 bg-gray-800/30 backdrop-blur-sm transform scale-105 z-10 shadow-2xl shadow-blue-500/20'
                  : 'border-gray-700 bg-gray-800/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                    <Crown size={14} />
                    MAIS POPULAR
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-4xl font-bold">
                    {price === 0 ? 'Grátis' : `R$ ${price.toFixed(2)}`}
                  </span>
                  {price > 0 && (
                    <span className="text-gray-400">
                      /{selectedPlan === 'monthly' ? 'mês' : 'ano'}
                    </span>
                  )}
                </div>
                
                {savings > 0 && (
                  <div className="text-green-400 text-sm font-semibold">
                    Economize {savings}% com o plano anual!
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-red-500/50 flex-shrink-0" />
                    )}
                    <span className={feature.included ? 'text-gray-300' : 'text-gray-500'}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleSubscribe(plan.name)}
                className={`w-full py-3 rounded-xl font-bold transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                    : plan.price.monthly === 0
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700'
                }`}
              >
                {plan.cta}
              </button>

              {plan.popular && (
                <div className="mt-6 text-center">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                    <Shield size={14} />
                    <span>Garantia de 30 dias ou seu dinheiro de volta</span>
                  </div>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      <div className="mt-12 text-center text-gray-400 text-sm">
        <p>Todos os planos incluem acesso aos resultados oficiais em tempo real</p>
        <p className="mt-2">Cancelamento a qualquer momento • Suporte 24/7 • Dados 100% seguros</p>
      </div>
    </section>
  )
}

export default PremiumPlans
