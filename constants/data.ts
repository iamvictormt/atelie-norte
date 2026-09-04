export interface Projeto {
  nome: string;
  local: string;
  ano: string;
  externa: string;
  interna: string;
  descricao: string;
  especificacoes: [string, string][];
  valor: string;
}

export interface Servico {
  n: string;
  title: string;
  text: string;
}

export const NAV_ITEMS = [
  { label: 'Início', href: '#top' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Contato', href: '#contato' },
] as const;

export const PROJETOS: Projeto[] = [
  {
    nome: 'Casa Aurora',
    local: 'Gramado, RS',
    ano: '2025',
    externa: '/assets/house-a.jpg',
    interna: '/assets/interior.jpg',
    descricao:
      'Uma casa que fala pela contenção. O telhado inclinado em madeira enegrecida conduz o olhar para cima — dentro, o forro abobadado em carvalho e a janela triangular de pé direito duplo dissolvem o limite entre arquitetura e paisagem.',
    especificacoes: [
      ['ÁREA', '110 m²'],
      ['DORMITÓRIOS', '2'],
      ['PAVIMENTOS', '1'],
      ['PRAZO ESTIMADO', '4 meses'],
    ],
    valor: 'R$ 890.000',
  },
  {
    nome: 'Casa Vale',
    local: 'Campos do Jordão, SP',
    ano: '2025',
    externa: '/assets/house-b.jpg',
    interna: '/assets/interior-b.jpg',
    descricao:
      'Volumes deslocados que acompanham o declive do terreno. A lareira central organiza o convívio e o pinho aparente aquece cada ambiente nas noites mais frias da serra.',
    especificacoes: [
      ['ÁREA', '168 m²'],
      ['DORMITÓRIOS', '3'],
      ['PAVIMENTOS', '2'],
      ['PRAZO ESTIMADO', '7 meses'],
    ],
    valor: 'R$ 1.240.000',
  },
  {
    nome: 'Casa Pinheiral',
    local: 'Curitiba, PR',
    ano: '2024',
    externa: '/assets/house-c.jpg',
    interna: '/assets/interior-c.jpg',
    descricao:
      'Um pavilhão horizontal de madeira queimada implantado entre pinheiros. A cozinha em carvalho e pedra bruta é o coração da casa, aberta ao pátio de concreto polido.',
    especificacoes: [
      ['ÁREA', '132 m²'],
      ['DORMITÓRIOS', '3'],
      ['PAVIMENTOS', '1'],
      ['PRAZO ESTIMADO', '5 meses'],
    ],
    valor: 'R$ 970.000',
  },
  {
    nome: 'Casa Neblina',
    local: 'Bom Jardim da Serra, SC',
    ano: '2024',
    externa: '/assets/house-d.jpg',
    interna: '/assets/interior-d.jpg',
    descricao:
      'Um volume em balanço sobre a encosta, apoiado em base de pedra local. A luz entra pela empena de vidro e percorre os ambientes de microcimento e madeira maciça.',
    especificacoes: [
      ['ÁREA', '205 m²'],
      ['DORMITÓRIOS', '4'],
      ['PAVIMENTOS', '2'],
      ['PRAZO ESTIMADO', '9 meses'],
    ],
    valor: 'R$ 1.680.000',
  },
  {
    nome: 'Casa Espelho',
    local: 'Florianópolis, SC',
    ano: '2023',
    externa: '/assets/house-e.jpg',
    interna: '/assets/interior-b.jpg',
    descricao:
      'Uma linha única de brises verticais suspensa à beira da lagoa. O deck contínuo prolonga a sala e a água devolve a luz interna ao anoitecer.',
    especificacoes: [
      ['ÁREA', '240 m²'],
      ['DORMITÓRIOS', '4'],
      ['PAVIMENTOS', '1'],
      ['PRAZO ESTIMADO', '11 meses'],
    ],
    valor: 'R$ 2.150.000',
  },
];

export const SERVICOS: Servico[] = [
  {
    n: '01',
    title: 'Projeto Arquitetônico',
    text: 'Do primeiro croqui à planta executiva. Desenhamos casas a partir da luz, do terreno e do seu modo de viver.',
  },
  {
    n: '02',
    title: 'Conceito de Interiores',
    text: 'Ambientes que se sentem tão bem quanto parecem. Materiais naturais, calma nórdica e cada detalhe considerado.',
  },
  {
    n: '03',
    title: 'Gestão de Obra',
    text: 'Acompanhamos cada etapa, do alvará à entrega das chaves — no prazo, no orçamento e com total transparência.',
  },
  {
    n: '04',
    title: 'Paisagismo e Implantação',
    text: 'Uma casa pertence ao seu entorno. Projetamos o terreno com o mesmo cuidado dedicado às paredes.',
  },
  {
    n: '05',
    title: 'Consultoria e Viabilidade',
    text: 'Análise técnica e arquitetônica do lote antes da compra. Iluminação, topografia e potencial construtivo em detalhes.',
  },
  {
    n: '06',
    title: 'Retrofit e Reformas',
    text: 'Reinterpretação de estruturas existentes. Trazemos linguagem contemporânea, eficiência e conforto sem perder a memória.',
  },
];
