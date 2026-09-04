import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Ateliê Norte — Casas Modernas e Arquitetura Autoral',
    template: '%s | Ateliê Norte',
  },
  description:
    'O Ateliê Norte projeta casas autorais no Sul do Brasil — luz natural, materiais honestos e proporção pensada. Arquitetura, conforto e elegância.',
  openGraph: {
    title: 'Ateliê Norte — Casas Modernas',
    description: 'Estúdio de arquitetura fundado em 2010. Casas modernas projetadas com luz, espaço e equilíbrio.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@AtelieNorte',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  );
}
