import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Loteria AI - Desdobramentos Inteligentes com IA',
  description: 'Maximize suas chances nas loterias brasileiras com IA avançada. Desdobramentos otimizados, resultados ao vivo e estatísticas inteligentes.',
  keywords: 'loteria, mega sena, lotofácil, quina, desdobramento, IA, inteligência artificial',
  openGraph: {
    title: 'Loteria AI - Revolucione Suas Chances',
    description: 'Plataforma completa com IA para maximizar seus ganhos nas loterias',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-black text-white`}>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#1f2937',
              color: '#fff',
              border: '1px solid #374151',
            },
          }}
        />
      </body>
    </html>
  )
}
