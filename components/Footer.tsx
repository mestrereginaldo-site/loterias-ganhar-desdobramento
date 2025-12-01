'use client'

import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Heart } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900/50 backdrop-blur-sm border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo e Descrição */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">LA</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">Loteria AI</h2>
                <p className="text-sm text-gray-400">Powered by Artificial Intelligence</p>
              </div>
            </div>
            <p className="text-gray-500 mb-6">
              Revolucionando a forma como as pessoas jogam na loteria com tecnologia de ponta e inteligência artificial.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-3">
              {[
                { label: 'Resultados ao Vivo', href: '#results' },
                { label: 'Gerador de Desdobramentos', href: '#generator' },
                { label: 'Planos Premium', href: '#premium' },
                { label: 'Estatísticas', href: '#stats' },
                { label: 'Blog de Dicas', href: '#' },
                { label: 'Perguntas Frequentes', href: '#' }
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Loterias */}
          <div>
            <h3 className="text-lg font-bold mb-4">Loterias</h3>
            <ul className="space-y-3">
              {[
                'Mega-Sena',
                'Lotofácil',
                'Quina',
                'Lotomania',
                'Timemania',
                'Dia de Sorte',
                'Dupla Sena',
                'Federal'
              ].map((lottery, idx) => (
                <li key={idx}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {lottery}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-gray-500" />
                <span className="text-gray-400">contato@loteriaai.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-gray-500" />
                <span className="text-gray-400">(11) 99999-9999</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-gray-500" />
                <span className="text-gray-400">São Paulo, SP - Brasil</span>
              </li>
            </ul>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg">
              <p className="text-sm text-gray-400">
                Receba dicas exclusivas no seu e-mail
              </p>
              <div className="mt-3 flex">
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-l-lg focus:outline-none"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-r-lg font-semibold">
                  Inscrever
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm text-center md:text-left">
            © {currentYear} Loteria AI. Todos os direitos reservados.
          </div>
          
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Cookies
            </a>
          </div>

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            Feito com <Heart size={14} className="text-red-500 animate-pulse" /> no Brasil
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gray-900/30 rounded-lg border border-gray-800">
          <p className="text-xs text-gray-500 text-center">
            Esta é uma ferramenta de auxílio estatístico e não garante ganhos. Jogue com responsabilidade.
            O jogo é proibido para menores de 18 anos. As probabilidades são calculadas com base em dados
            históricos e algoritmos estatísticos. Consulte as regras oficiais das loterias.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
