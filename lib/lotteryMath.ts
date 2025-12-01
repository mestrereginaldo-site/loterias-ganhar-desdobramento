// lib/lotteryMath.ts

export type LotteryType = 'megasena' | 'lotofacil' | 'quina' | 'lotomania';

export interface DesdobramentoConfig {
  numerosSelecionados: number[];
  tipoLoteria: LotteryType;
  garantiaMinima?: number; // Ex: 11 pontos na Lotofácil
  coberturaDesejada?: number; // Ex: 90
}

export interface Combinacao {
  numeros: number[];
  probabilidade: number;
  custo: number;
}

export class DesdobramentoIA {
  // Matrizes de desdobramento para cada loteria
  private matrizes = {
    lotofacil: {
      // Matriz 18-15-13-15: 18 números, 15 por jogo, garante 13 acertos se 15 sorteados estiverem nos 18
      '18-15-13-15': [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 16, 17],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 18],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 17, 18],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 15, 16, 17],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 14, 15, 16, 17, 18],
      ],
    },
    megasena: {
      // Matriz 10-6-4-6: 10 números, 6 por jogo, garante quadra se 6 sorteados estiverem nos 10
      '10-6-4-6': [
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 7],
        [1, 2, 3, 4, 5, 8],
        [1, 2, 3, 4, 6, 7],
        [1, 2, 3, 4, 6, 8],
        [1, 2, 3, 4, 7, 8],
        [1, 2, 3, 5, 6, 7],
        [1, 2, 3, 5, 6, 8],
        [1, 2, 3, 5, 7, 8],
        [1, 2, 3, 6, 7, 8],
        [1, 2, 4, 5, 6, 7],
        [1, 2, 4, 5, 6, 8],
        [1, 2, 4, 5, 7, 8],
        [1, 2, 4, 6, 7, 8],
        [1, 2, 5, 6, 7, 8],
        [1, 3, 4, 5, 6, 7],
        [1, 3, 4, 5, 6, 8],
        [1, 3, 4, 5, 7, 8],
        [1, 3, 4, 6, 7, 8],
        [1, 3, 5, 6, 7, 8],
        [1, 4, 5, 6, 7, 8],
        [2, 3, 4, 5, 6, 7],
        [2, 3, 4, 5, 6, 8],
        [2, 3, 4, 5, 7, 8],
        [2, 3, 4, 6, 7, 8],
        [2, 3, 5, 6, 7, 8],
        [2, 4, 5, 6, 7, 8],
        [3, 4, 5, 6, 7, 8],
        [1, 2, 3, 4, 9, 10],
        [1, 2, 3, 5, 9, 10],
        [1, 2, 3, 6, 9, 10],
        [1, 2, 3, 7, 9, 10],
        [1, 2, 3, 8, 9, 10],
        [1, 2, 4, 5, 9, 10],
        [1, 2, 4, 6, 9, 10],
        [1, 2, 4, 7, 9, 10],
        [1, 2, 4, 8, 9, 10],
        [1, 2, 5, 6, 9, 10],
        [1, 2, 5, 7, 9, 10],
        [1, 2, 5, 8, 9, 10],
        [1, 2, 6, 7, 9, 10],
        [1, 2, 6, 8, 9, 10],
        [1, 2, 7, 8, 9, 10],
        [1, 3, 4, 5, 9, 10],
        [1, 3, 4, 6, 9, 10],
        [1, 3, 4, 7, 9, 10],
        [1, 3, 4, 8, 9, 10],
        [1, 3, 5, 6, 9, 10],
        [1, 3, 5, 7, 9, 10],
        [1, 3, 5, 8, 9, 10],
        [1, 3, 6, 7, 9, 10],
        [1, 3, 6, 8, 9, 10],
        [1, 3, 7, 8, 9, 10],
        [1, 4, 5, 6, 9, 10],
        [1, 4, 5, 7, 9, 10],
        [1, 4, 5, 8, 9, 10],
        [1, 4, 6, 7, 9, 10],
        [1, 4, 6, 8, 9, 10],
        [1, 4, 7, 8, 9, 10],
        [1, 5, 6, 7, 9, 10],
        [1, 5, 6, 8, 9, 10],
        [1, 5, 7, 8, 9, 10],
        [1, 6, 7, 8, 9, 10],
        [2, 3, 4, 5, 9, 10],
        [2, 3, 4, 6, 9, 10],
        [2, 3, 4, 7, 9, 10],
        [2, 3, 4, 8, 9, 10],
        [2, 3, 5, 6, 9, 10],
        [2, 3, 5, 7, 9, 10],
        [2, 3, 5, 8, 9, 10],
        [2, 3, 6, 7, 9, 10],
        [2, 3, 6, 8, 9, 10],
        [2, 3, 7, 8, 9, 10],
        [2, 4, 5, 6, 9, 10],
        [2, 4, 5, 7, 9, 10],
        [2, 4, 5, 8, 9, 10],
        [2, 4, 6, 7, 9, 10],
        [2, 4, 6, 8, 9, 10],
        [2, 4, 7, 8, 9, 10],
        [2, 5, 6, 7, 9, 10],
        [2, 5, 6, 8, 9, 10],
        [2, 5, 7, 8, 9, 10],
        [2, 6, 7, 8, 9, 10],
        [3, 4, 5, 6, 9, 10],
        [3, 4, 5, 7, 9, 10],
        [3, 4, 5, 8, 9, 10],
        [3, 4, 6, 7, 9, 10],
        [3, 4, 6, 8, 9, 10],
        [3, 4, 7, 8, 9, 10],
        [3, 5, 6, 7, 9, 10],
        [3, 5, 6, 8, 9, 10],
        [3, 5, 7, 8, 9, 10],
        [3, 6, 7, 8, 9, 10],
        [4, 5, 6, 7, 9, 10],
        [4, 5, 6, 8, 9, 10],
        [4, 5, 7, 8, 9, 10],
        [4, 6, 7, 8, 9, 10],
        [5, 6, 7, 8, 9, 10],
      ],
    },
    quina: {
      // Matriz 8-5-4-5: 8 números, 5 por jogo, garante quadra se 5 sorteados estiverem nos 8
      '8-5-4-5': [
        [1, 2, 3, 4, 5],
        [1, 2, 3, 4, 6],
        [1, 2, 3, 4, 7],
        [1, 2, 3, 4, 8],
        [1, 2, 3, 5, 6],
        [1, 2, 3, 5, 7],
        [1, 2, 3, 5, 8],
        [1, 2, 3, 6, 7],
        [1, 2, 3, 6, 8],
        [1, 2, 3, 7, 8],
        [1, 2, 4, 5, 6],
        [1, 2, 4, 5, 7],
        [1, 2, 4, 5, 8],
        [1, 2, 4, 6, 7],
        [1, 2, 4, 6, 8],
        [1, 2, 4, 7, 8],
        [1, 2, 5, 6, 7],
        [1, 2, 5, 6, 8],
        [1, 2, 5, 7, 8],
        [1, 2, 6, 7, 8],
        [1, 3, 4, 5, 6],
        [1, 3, 4, 5, 7],
        [1, 3, 4, 5, 8],
        [1, 3, 4, 6, 7],
        [1, 3, 4, 6, 8],
        [1, 3, 4, 7, 8],
        [1, 3, 5, 6, 7],
        [1, 3, 5, 6, 8],
        [1, 3, 5, 7, 8],
        [1, 3, 6, 7, 8],
        [1, 4, 5, 6, 7],
        [1, 4, 5, 6, 8],
        [1, 4, 5, 7, 8],
        [1, 4, 6, 7, 8],
        [1, 5, 6, 7, 8],
        [2, 3, 4, 5, 6],
        [2, 3, 4, 5, 7],
        [2, 3, 4, 5, 8],
        [2, 3, 4, 6, 7],
        [2, 3, 4, 6, 8],
        [2, 3, 4, 7, 8],
        [2, 3, 5, 6, 7],
        [2, 3, 5, 6, 8],
        [2, 3, 5, 7, 8],
        [2, 3, 6, 7, 8],
        [2, 4, 5, 6, 7],
        [2, 4, 5, 6, 8],
        [2, 4, 5, 7, 8],
        [2, 4, 6, 7, 8],
        [2, 5, 6, 7, 8],
        [3, 4, 5, 6, 7],
        [3, 4, 5, 6, 8],
        [3, 4, 5, 7, 8],
        [3, 4, 6, 7, 8],
        [3, 5, 6, 7, 8],
        [4, 5, 6, 7, 8],
      ],
    },
  };

  // Método principal para gerar desdobramentos
  gerarDesdobramento(config: DesdobramentoConfig): Combinacao[] {
    const { numerosSelecionados, tipoLoteria } = config;

    // Ordena os números selecionados
    const numerosOrdenados = [...numerosSelecionados].sort((a, b) => a - b);

    // Obtém a matriz correspondente
    let matriz: number[][] = [];
    let matrizKey = '';

    switch (tipoLoteria) {
      case 'lotofacil':
        if (numerosOrdenados.length === 18) {
          matrizKey = '18-15-13-15';
          matriz = this.matrizes.lotofacil[matrizKey];
        }
        break;
      case 'megasena':
        if (numerosOrdenados.length === 10) {
          matrizKey = '10-6-4-6';
          matriz = this.matrizes.megasena[matrizKey];
        }
        break;
      case 'quina':
        if (numerosOrdenados.length === 8) {
          matrizKey = '8-5-4-5';
          matriz = this.matrizes.quina[matrizKey];
        }
        break;
      default:
        break;
    }

    // Se não encontrou matriz, usa algoritmo genérico (para demonstração)
    if (matriz.length === 0) {
      return this.gerarDesdobramentoGenerico(numerosOrdenados, tipoLoteria);
    }

    // Aplica a matriz aos números selecionados
    const combinacoes = this.aplicarMatriz(numerosOrdenados, matriz);

    // Calcula probabilidade e custo para cada combinação
    return combinacoes.map((numeros) => ({
      numeros,
      probabilidade: this.calcularProbabilidade(numeros.length, tipoLoteria),
      custo: this.calcularCusto(tipoLoteria),
    }));
  }

  // Aplica a matriz aos números selecionados
  private aplicarMatriz(numeros: number[], matriz: number[][]): number[][] {
    return matriz.map((combinacao) =>
      combinacao.map((indice) => numeros[indice - 1])
    );
  }

  // Gera desdobramento genérico (para quando não há matriz específica)
  private gerarDesdobramentoGenerico(
    numeros: number[],
    tipoLoteria: LotteryType
  ): Combinacao[] {
    const combinacoes: Combinacao[] = [];
    const qtdPorJogo = this.getQuantidadePorJogo(tipoLoteria);

    // Se o usuário selecionou exatamente a quantidade por jogo, retorna uma combinação
    if (numeros.length === qtdPorJogo) {
      return [
        {
          numeros,
          probabilidade: this.calcularProbabilidade(numeros.length, tipoLoteria),
          custo: this.calcularCusto(tipoLoteria),
        },
      ];
    }

    // Caso contrário, gera algumas combinações aleatórias (para demonstração)
    // Em um sistema real, aqui entraria um algoritmo de cobertura
    for (let i = 0; i < 5; i++) {
      const shuffled = [...numeros].sort(() => Math.random() - 0.5);
      const combo = shuffled.slice(0, qtdPorJogo).sort((a, b) => a - b);
      combinacoes.push({
        numeros: combo,
        probabilidade: this.calcularProbabilidade(combo.length, tipoLoteria),
        custo: this.calcularCusto(tipoLoteria),
      });
    }

    return combinacoes;
  }

  private getQuantidadePorJogo(tipoLoteria: LotteryType): number {
    const map: Record<LotteryType, number> = {
      megasena: 6,
      lotofacil: 15,
      quina: 5,
      lotomania: 20,
    };
    return map[tipoLoteria];
  }

  private calcularProbabilidade(qtdNumeros: number, tipoLoteria: LotteryType): number {
    // Valores de exemplo para demonstração
    const probabilidadesBase: Record<LotteryType, number> = {
      megasena: 0.15,
      lotofacil: 0.85,
      quina: 0.35,
      lotomania: 0.25,
    };
    return (probabilidadesBase[tipoLoteria] || 0.5) * 100;
  }

  private calcularCusto(tipoLoteria: LotteryType): number {
    const precos: Record<LotteryType, number> = {
      megasena: 5.0,
      lotofacil: 3.0,
      quina: 2.5,
      lotomania: 2.0,
    };
    return precos[tipoLoteria] || 2.5;
  }

  // Calcula a cobertura (percentual de números cobertos)
  calcularCobertura(numerosSelecionados: number[], combinacoes: Combinacao[]): number {
    const todosNumeros = new Set<number>();
    combinacoes.forEach((combinacao) => {
      combinacao.numeros.forEach((num) => todosNumeros.add(num));
    });
    return (todosNumeros.size / numerosSelecionados.length) * 100;
  }

  // Obtém a garantia com base na loteria e quantidade de números
  obterGarantia(tipoLoteria: LotteryType, qtdNumeros: number): string {
    switch (tipoLoteria) {
      case 'lotofacil':
        if (qtdNumeros === 18) return '11 pontos (se 13 sorteados)';
        if (qtdNumeros === 17) return '10 pontos (se 13 sorteados)';
        if (qtdNumeros === 16) return '9 pontos (se 13 sorteados)';
        break;
      case 'megasena':
        if (qtdNumeros === 10) return 'Quadra (se 6 sorteados)';
        if (qtdNumeros === 9) return 'Terno (se 6 sorteados)';
        break;
      case 'quina':
        if (qtdNumeros === 8) return 'Quadra (se 5 sorteados)';
        if (qtdNumeros === 7) return 'Terno (se 5 sorteados)';
        break;
    }
    return 'Estratégia básica';
  }
}
