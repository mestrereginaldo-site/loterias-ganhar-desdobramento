'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shuffle,
  Filter,
  Zap,
  Copy,
  Check,
  Trash2,
  Calculator,
  Target,
  BarChart3,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { DesdobramentoIA, Combinacao, LotteryType } from '@/lib/lotteryMath';

type LotteryTypeKey = 'megasena' | 'lotofacil' | 'quina' | 'lotomania';

const LotteryGenerator = () => {
  const [selectedLottery, setSelectedLottery] = useState<LotteryTypeKey>('megasena');
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [combinations, setCombinations] = useState<Combinacao[]>([]);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [desdobramentoIA] = useState(() => new DesdobramentoIA());

  const lotteryConfig = {
    megasena: { min: 1, max: 60, select: 6, name: 'Mega-Sena' },
    lotofacil: { min: 1, max: 25, select: 15, name: 'Lotofácil' },
    quina: { min: 1, max: 80, select: 5, name: 'Quina' },
    lotomania: { min: 1, max: 100, select: 20, name: 'Lotomania' },
  };

  const config = lotteryConfig[selectedLottery];

  // Inicializar números disponíveis
  const allNumbers = Array.from({ length: config.max }, (_, i) => i + 1);

  const toggleNumber = (num: number) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== num));
    } else if (selectedNumbers.length < config.select * 2) {
      // Permite selecionar até o dobro da quantidade necessária para desdobramentos
      setSelectedNumbers([...selectedNumbers, num]);
    } else {
      toast.error(`Selecione no máximo ${config.select * 2} números para desdobramentos`);
    }
  };

  const generateRandom = () => {
    const shuffled = [...allNumbers].sort(() => Math.random() - 0.5);
    setSelectedNumbers(shuffled.slice(0, config.select));
  };

  const clearSelection = () => {
    setSelectedNumbers([]);
    setCombinations([]);
  };

  const generateCombinations = () => {
    if (selectedNumbers.length < config.select) {
      toast.error(`Selecione pelo menos ${config.select} números`);
      return;
    }

    setGenerating(true);

    // Usa a IA de desdobramento
    const resultado = desdobramentoIA.gerarDesdobramento({
      numerosSelecionados: selectedNumbers,
      tipoLoteria: selectedLottery,
    });

    // Simula um delay para processamento
    setTimeout(() => {
      setCombinations(resultado);
      setGenerating(false);

      // Mostra a garantia
      const garantia = desdobramentoIA.obterGarantia(
        selectedLottery,
        selectedNumbers.length
      );
      toast.success(
        `Desdobramento gerado! Garantia: ${garantia}`,
        { duration: 4000 }
      );
    }, 1500);
  };

  const copyToClipboard = () => {
    const text = combinations
      .map((combo, idx) => `Jogo ${idx + 1}: ${combo.numeros.join(', ')}`)
      .join('\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Combinações copiadas!');
    setTimeout(() => setCopied(false), 2000);
  };

  const calculateSavings = () => {
    return combinations.reduce((total, combo) => total + combo.custo, 0);
  };

  const calculateCoverage = () => {
    if (selectedNumbers.length === 0) return 0;
    return desdobramentoIA.calcularCobertura(selectedNumbers, combinations);
  };

  const getGuarantee = () => {
    return desdobramentoIA.obterGarantia(selectedLottery, selectedNumbers.length);
  };

  return (
    <section id="generator" className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Gerador de Desdobramentos</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Selecione seus números e deixe a IA criar as combinações mais otimizadas
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Painel esquerdo - Seleção */}
        <div className="lg:col-span-2 bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
          {/* Seletor de loteria */}
          <div className="flex flex-wrap gap-3 mb-8">
            {Object.entries(lotteryConfig).map(([key, value]) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedLottery(key as LotteryTypeKey);
                  setSelectedNumbers([]);
                  setCombinations([]);
                }}
                className={`
                  px-6 py-3 rounded-xl font-semibold transition-all
                  ${
                    selectedLottery === key
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-gray-800/50 text-gray-400 hover:text-white'
                  }
                `}
              >
                {value.name}
              </button>
            ))}
          </div>

          {/* Contador e ações */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-2xl font-bold">
                {selectedNumbers.length} números selecionados
              </div>
              <div className="text-gray-400 text-sm">
                Recomendado: {config.select} a {config.select * 2} números para desdobramento
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

          {/* Grid de números */}
          <div className="grid grid-cols-10 sm:grid-cols-12 md:grid-cols-15 gap-3 mb-8">
            {allNumbers.map((num) => (
              <button
                key={num}
                onClick={() => toggleNumber(num)}
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center font-bold
                  transition-all duration-200 transform hover:scale-110
                  ${
                    selectedNumbers.includes(num)
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30'
                      : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700 hover:text-white'
                  }
                `}
              >
                {num.toString().padStart(2, '0')}
              </button>
            ))}
          </div>

          {/* Botão gerar */}
          <button
            onClick={generateCombinations}
            disabled={generating || selectedNumbers.length < config.select}
            className={`
              w-full py-4 rounded-xl font-bold text-lg transition-all
              ${
                generating || selectedNumbers.length < config.select
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

        {/* Painel direito - Resultados */}
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

          <AnimatePresence>
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
                        Probabilidade: {combo.probabilidade.toFixed(1)}%
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {combo.numeros.map((num) => (
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

                {/* Estatísticas */}
                <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-4 rounded-xl border border-blue-800/30">
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <Calculator size={18} />
                    Resumo da Estratégia
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400">Combinações</div>
                      <div className="font-bold">{combinations.length}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Investimento</div>
                      <div className="font-bold text-green-400">
                        R$ {calculateSavings().toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400">Cobertura</div>
                      <div className="font-bold">{calculateCoverage().toFixed(0)}%</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Garantia Mínima</div>
                      <div className="font-bold text-yellow-400">{getGuarantee()}</div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    * Garantia válida se a quantidade de números sorteados dentro dos seus
                    escolhidos atender às condições da matriz.
                  </p>
                </div>

                {/* Explicação da Garantia */}
                <div className="bg-gradient-to-r from-gray-900 to-black p-4 rounded-xl border border-gray-700">
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <Target size={18} />
                    Como funciona a garantia?
                  </h4>
                  <p className="text-sm text-gray-400">
                    {selectedLottery === 'lotofacil' && selectedNumbers.length === 18 && (
                      <>
                        Com 18 números selecionados, usando a matriz 18-15-13-15, se 13 dos
                        números sorteados estiverem entre seus 18, você tem garantia de pelo
                        menos um jogo com 11 pontos. Pode acertar mais!
                      </>
                    )}
                    {selectedLottery === 'megasena' && selectedNumbers.length === 10 && (
                      <>
                        Com 10 números selecionados, usando a matriz 10-6-4-6, se os 6 números
                        sorteados estiverem entre seus 10, você tem garantia de pelo menos uma
                        quadra. Pode acertar quina ou sena!
                      </>
                    )}
                    {selectedLottery === 'quina' && selectedNumbers.length === 8 && (
                      <>
                        Com 8 números selecionados, usando a matriz 8-5-4-5, se os 5 números
                        sorteados estiverem entre seus 8, você tem garantia de pelo menos uma
                        quadra. Pode acertar a quina!
                      </>
                    )}
                    {!(
                      (selectedLottery === 'lotofacil' && selectedNumbers.length === 18) ||
                      (selectedLottery === 'megasena' && selectedNumbers.length === 10) ||
                      (selectedLottery === 'quina' && selectedNumbers.length === 8)
                    ) && (
                      <>
                        Para obter garantias matemáticas, selecione a quantidade ideal de
                        números para cada loteria (ex: 18 para Lotofácil, 10 para Mega-Sena,
                        8 para Quina).
                      </>
                    )}
                  </p>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <Filter size={32} className="text-gray-500" />
                </div>
                <h4 className="font-bold mb-2">Aguardando Geração</h4>
                <p className="text-gray-400 text-sm">
                  Selecione {config.select} números ou mais e clique em gerar para ver as
                  combinações otimizadas pela IA
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default LotteryGenerator;
