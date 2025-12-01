export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Loteria AI
            </h1>
            <p className="text-gray-400">Powered by Artificial Intelligence</p>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 rounded-full font-semibold">
            Premium
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="block">Ganhar na Loteria</span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              é uma Ciência
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8">
            Use inteligência artificial para maximizar suas chances com
            desdobramentos matematicamente otimizados.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all">
              Começar Gratuitamente
            </button>
            <button className="border border-gray-700 hover:border-gray-500 text-white font-bold py-4 px-8 rounded-full text-lg transition-all">
              Ver Demonstração
            </button>
          </div>
        </div>

        {/* Cards de Loteria */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {['Mega-Sena', 'Lotofácil', 'Quina', 'Lotomania'].map((lottery, idx) => (
            <div key={idx} className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">{lottery}</h3>
                <div className="w-3 h-12 rounded-full" style={{
                  backgroundColor: 
                    idx === 0 ? '#209869' :
                    idx === 1 ? '#930089' :
                    idx === 2 ? '#260085' : '#F78100'
                }}></div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {Array.from({ length: idx === 0 ? 6 : idx === 1 ? 15 : idx === 2 ? 5 : 20 }, (_, i) => (
                  <div key={i} className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </div>
                ))}
              </div>
              
              <div className="text-sm text-gray-400">
                Próximo sorteio: Hoje - 20:00
              </div>
            </div>
          ))}
        </div>

        {/* Gerador Básico */}
        <div className="mt-16 bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
          <h2 className="text-3xl font-bold mb-6 text-center">Gerador de Desdobramentos</h2>
          
          <div className="grid grid-cols-10 gap-3 mb-8">
            {Array.from({ length: 60 }, (_, i) => (
              <button
                key={i}
                className="w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center font-bold transition-all"
              >
                {i + 1}
              </button>
            ))}
          </div>

          <div className="flex gap-4">
            <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-3 rounded-lg font-semibold">
              Gerar Aleatório
            </button>
            <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 py-3 rounded-lg font-semibold">
              Otimizar com IA
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-gray-800">
        <div className="text-center text-gray-500">
          <p>© 2024 Loteria AI. Todos os direitos reservados.</p>
          <p className="text-sm mt-2">Esta é uma ferramenta de auxílio estatístico.</p>
        </div>
      </footer>
    </div>
  )
}
