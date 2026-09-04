'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowDownRight, ArrowLeft, ArrowRight, Phone, Mail, MapPin, Menu, X, Check } from 'lucide-react';

import { useReveal } from '@/hooks/use-reveal';
import { NAV_ITEMS, PROJETOS, SERVICOS } from '@/constants/data';

function CircleArrow({ down = false }: { down?: boolean }) {
  return (
    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/70 text-foreground transition-all duration-500 group-hover:rotate-45 group-hover:bg-primary group-hover:text-primary-foreground">
      {down ? (
        <ArrowDownRight className="h-4 w-4" strokeWidth={1.5} />
      ) : (
        <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
      )}
    </span>
  );
}

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal<HTMLDivElement>(delay);
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      } ${className}`}
      style={{ transitionTimingFunction: 'var(--ease-lux)' }}
    >
      {children}
    </div>
  );
}

function Bar({ label, pct }: { label: string; pct: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>(200);
  return (
    <div ref={ref}>
      <div className="flex items-baseline justify-between">
        <span className="eyebrow text-[0.6rem]">{label}</span>
        <span className="text-[0.8rem] font-bold">
          {pct}
          <span className="text-veiled">%</span>
        </span>
      </div>
      <div className="mt-2 h-px w-full bg-border">
        <div
          className="h-px bg-primary transition-[width] duration-[1400ms]"
          style={{
            width: visible ? `${pct}%` : '0%',
            transitionTimingFunction: 'var(--ease-lux)',
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export default function Home() {
  const [projetoAtivo, setProjetoAtivo] = useState(0);
  const projeto = PROJETOS[projetoAtivo]!;
  const proximo = () => setProjetoAtivo((i) => (i + 1) % PROJETOS.length);
  const anterior = () => setProjetoAtivo((i) => (i - 1 + PROJETOS.length) % PROJETOS.length);
  const [menuAberto, setMenuAberto] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [secaoAtiva, setSecaoAtiva] = useState('#top');
  const [year, setYear] = useState(new Date().getFullYear());

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;
    const header = document.querySelector('header');
    const offset = (header?.offsetHeight ?? 72) + 24;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('header');
      const offset = (header?.offsetHeight ?? 72) + 24;
      const midpoint = window.scrollY + window.innerHeight * 0.45;
      let active = NAV_ITEMS[0]?.href ?? '#top';
      for (const item of NAV_ITEMS) {
        const el = document.querySelector<HTMLElement>(item.href);
        if (el && el.offsetTop - offset <= midpoint) {
          active = item.href;
        }
      }
      setSecaoAtiva(active);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuAberto ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuAberto]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-sans">
      {/* NAVEGAÇÃO */}
      <header className="fixed inset-x-0 top-0 z-50 bg-background transition-all duration-700">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 sm:px-6 sm:py-6 lg:px-12">
          <Link href="#top" className="flex items-baseline gap-2 text-foreground">
            <span className="text-[0.8rem] font-semibold tracking-[0.28em] sm:text-[0.85rem]">ATELIÊ NORTE</span>
            <span className="hidden text-[0.55rem] tracking-[0.2em] text-veiled sm:inline">ARQUITETURA</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex xl:gap-10">
            {NAV_ITEMS.map((item) => {
              const ativo = secaoAtiva === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  aria-current={ativo ? 'true' : undefined}
                  className={`relative text-[0.8rem] transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-foreground after:transition-all after:duration-500 ${
                    ativo
                      ? 'text-foreground after:w-full'
                      : 'text-muted-foreground after:w-0 hover:text-foreground hover:after:w-full'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contato"
              onClick={(e) => scrollToSection(e, '#contato')}
              className="hidden rounded-full border border-border/80 px-5 py-2 text-[0.75rem] tracking-wide text-foreground backdrop-blur-md transition-colors duration-500 hover:bg-primary hover:text-primary-foreground sm:inline-block"
            >
              Fale Conosco
            </a>
            <button
              type="button"
              aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuAberto}
              onClick={() => setMenuAberto((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center text-foreground transition-colors hover:text-muted-foreground lg:hidden"
            >
              {menuAberto ? (
                <X className="h-4 w-4" strokeWidth={1.5} />
              ) : (
                <Menu className="h-4 w-4" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {/* MENU MOBILE */}
        <div
          className={`overflow-hidden bg-background/95 backdrop-blur-xl transition-all duration-700 lg:hidden ${
            menuAberto ? 'max-h-96' : 'max-h-0'
          }`}
          style={{ transitionTimingFunction: 'var(--ease-lux)' }}
        >
          <nav className="flex flex-col px-5 pb-6 sm:px-6">
            {NAV_ITEMS.map((item) => {
              const ativo = secaoAtiva === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    scrollToSection(e, item.href);
                    setMenuAberto(false);
                  }}
                  aria-current={ativo ? 'true' : undefined}
                  className={`flex items-center justify-between border-b border-border/50 py-4 text-lg tracking-[-0.01em] transition-colors ${
                    ativo ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                  {ativo && <span className="h-1 w-1 rounded-full bg-foreground" aria-hidden="true" />}
                </a>
              );
            })}
            <a
              href="#contato"
              onClick={(e) => {
                scrollToSection(e, '#contato');
                setMenuAberto(false);
              }}
              className="mt-6 rounded-full border border-border/80 px-5 py-3 text-center text-[0.8rem]"
            >
              Fale Conosco
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative px-3 pt-3 sm:px-4 sm:pt-4 lg:px-8 lg:pt-6">
        <div className="relative h-[92svh] min-h-[520px] overflow-hidden rounded-lg lg:h-[86vh]">
          <Image
            src="/assets/hero-house.jpg"
            alt="Casa moderna de madeira escura iluminada ao anoitecer entre árvores de inverno"
            priority
            fill
            className="object-cover scale-105"
          />
          <div className="absolute inset-0" style={{ backgroundImage: 'var(--gradient-veil)' }} aria-hidden="true" />

          <div className="relative flex h-full flex-col items-center justify-center px-5 pb-28 pt-16 sm:px-6 sm:pb-32 lg:px-14 lg:pb-44">
            <h1 className="reveal display-xl text-center text-[19vw] leading-[0.8] text-foreground sm:text-[16vw] lg:text-[11.5vw]">
              Casas
              <span className="mt-[-0.05em] block text-[12.5vw] sm:text-[10vw] lg:text-[7.5vw]">Modernas</span>
            </h1>
            <p className="reveal mt-6 max-w-md text-center text-[0.95rem] leading-snug text-foreground/85 sm:mt-8 sm:max-w-lg sm:text-[1.1rem] lg:mt-10 lg:max-w-xl lg:text-[1.35rem]">
              <span className="text-veiled">Arquitetura</span> não são paredes.
              <br className="hidden sm:block" /> É o <span className="text-veiled">sentimento</span> dentro delas.
            </p>
            <a
              href="#sobre"
              onClick={(e) => scrollToSection(e, '#sobre')}
              className="reveal group mt-6 inline-flex items-center gap-3 rounded-full border border-border/60 bg-background/25 px-5 py-2.5 text-[0.7rem] uppercase tracking-[0.18em] text-foreground backdrop-blur-md transition-colors duration-500 hover:bg-primary hover:text-primary-foreground sm:mt-8 sm:px-6 sm:py-3 sm:text-[0.75rem]"
            >
              Conheça o ateliê
              <CircleArrow down />
            </a>
          </div>

          <div className="absolute bottom-6 left-1/2 z-10 w-[calc(100%-2.5rem)] max-w-2xl -translate-x-1/2 rounded-2xl border border-border/40 bg-background/30 px-4 py-4 backdrop-blur-md sm:bottom-10 sm:rounded-full sm:px-10 sm:py-5 lg:bottom-14">
            <div className="grid grid-cols-3 items-center gap-y-3 sm:flex sm:justify-center sm:divide-x sm:divide-border/40">
              {[
                ['+25', 'Casas entregues'],
                ['16', 'Anos de experiência'],
                ['12', 'Prêmios de design'],
              ].map(([n, l]) => (
                <div key={l} className="flex flex-col items-center px-2 sm:px-8">
                  <span className="text-lg font-semibold leading-none text-foreground sm:text-xl">{n}</span>
                  <span className="mt-1 text-center text-[0.55rem] font-medium uppercase leading-tight tracking-[0.14em] text-muted-foreground sm:text-[0.6rem] sm:tracking-[0.18em]">
                    {l}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="mx-auto max-w-[1600px] px-5 py-20 sm:px-6 lg:px-12 lg:py-40">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal delay={120}>
              <Image
                src="/assets/house-a.jpg"
                alt="Cabana nórdica de madeira escura iluminada por dentro na hora azul"
              width={1024}
              height={1280}
                className="mt-10 aspect-[4/3] w-full rounded-lg object-cover transition-transform duration-[1200ms] hover:scale-[1.02] lg:mt-14"
                style={{ boxShadow: 'var(--shadow-lift)' }}
              />
            </Reveal>
          </div>

          <div className="lg:pt-4">
            <span className="eyebrow">[&nbsp;&nbsp;Sobre nós&nbsp;&nbsp;]</span>
            <Reveal>
              <h3 className="mt-8 max-w-lg text-xl font-medium leading-snug tracking-[-0.02em] sm:text-2xl lg:mt-10 lg:text-[2rem]">
                O Ateliê Norte é um estúdio de arquitetura fundado em 2010.
              </h3>
              <p className="mt-6 max-w-xl text-[0.9rem] leading-relaxed text-veiled sm:text-[0.95rem]">
                Projetamos residências particulares no Sul do Brasil e na Serra Gaúcha — espaços em que luz natural,
                materiais honestos e proporção cuidadosa se encontram em algo silenciosamente extraordinário.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <ul className="mt-8 divide-y divide-border/70 border-y border-border/70 lg:mt-10">
                {[
                  ['Luz natural', 'Cada ambiente é desenhado a partir do sol.'],
                  ['Materiais honestos', 'Madeira, pedra e concreto como são.'],
                  ['Proporção', 'Escala humana em cada centímetro do projeto.'],
                  ['Sustentabilidade', 'Soluções passivas de conforto térmico e eficiência.'],
                  ['Integração', 'Diluição dos limites entre o interior e a paisagem.'],
                  ['Atemporalidade', 'Design feito para envelhecer com nobreza e funcionalidade.'],
                ].map(([titulo, texto], i) => (
                  <li key={titulo} className="flex items-baseline gap-5 py-4 sm:gap-8">
                    <span className="eyebrow text-[0.55rem]">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-[0.95rem] font-medium tracking-[-0.01em]">{titulo}</span>
                    <span className="ml-auto max-w-[55%] text-right text-[0.78rem] leading-relaxed text-veiled">
                      {texto}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        {/* MÉTRICAS */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          <Reveal className="h-full">
            <div className="h-full rounded-lg border border-border/70 bg-card p-6">
              <p className="text-xl font-medium tracking-[-0.02em]">Fase atual:</p>
              <div className="mt-8 space-y-6">
                <Bar label="PROJETOS EM ANDAMENTO" pct={70} />
                <Bar label="CASAS ENTREGUES" pct={90} />
              </div>
            </div>
          </Reveal>

          {[
            ['Anos de arquitetura autoral', '16+', '[ 01 ]'],
            ['Clientes satisfeitos', '95%', '[ 02 ]'],
            ['Casas prontas para morar', '25+', '[ 03 ]'],
          ].map(([label, value, idx], i) => (
            <Reveal key={label} delay={100 * (i + 1)} className="h-full">
              <div className="group flex h-full flex-col justify-between rounded-lg border border-border/70 bg-card p-6 transition-colors duration-500 hover:border-border">
                <div className="flex items-start justify-between">
                  <span className="eyebrow flex-1 border-b border-border/70 pb-4 text-[0.6rem]">{label}</span>
                  {i === 2 && (
                    <span className="ml-4">
                      <CircleArrow />
                    </span>
                  )}
                </div>
                <div className="mt-10 flex items-end justify-between lg:mt-14">
                  <span className="text-4xl font-medium tracking-[-0.04em] sm:text-5xl">{value}</span>
                  <span className="eyebrow text-[0.6rem]">{idx}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROJETOS */}
      <section id="projetos" className="mx-auto max-w-[1600px] px-5 pb-20 sm:px-6 lg:px-12 lg:pb-40">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-10">
          <div className="flex flex-col">
            <span className="eyebrow">[&nbsp;&nbsp;Projetos&nbsp;&nbsp;]</span>
            <h2 className="mt-6 text-3xl font-medium tracking-[-0.035em] sm:text-4xl lg:mt-8 lg:text-[2.75rem]">
              {projeto.nome}
            </h2>
            <p className="eyebrow mt-3 text-[0.6rem]">
              {projeto.local} &nbsp;·&nbsp; {projeto.ano}
            </p>
            <p className="mt-6 max-w-sm text-[0.9rem] leading-relaxed text-veiled sm:text-[0.95rem] lg:max-w-xs">
              {projeto.descricao}
            </p>

            <div className="mt-8 flex items-center gap-3 lg:mt-auto lg:pt-10">
              <button
                type="button"
                onClick={anterior}
                aria-label="Projeto anterior"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 transition-colors duration-500 hover:bg-primary hover:text-primary-foreground"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={proximo}
                aria-label="Próximo projeto"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 transition-colors duration-500 hover:bg-primary hover:text-primary-foreground"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </button>
              <div className="ml-3 flex items-center gap-2">
                {PROJETOS.map((p, i) => (
                  <button
                    key={p.nome}
                    type="button"
                    onClick={() => setProjetoAtivo(i)}
                    aria-label={`Ver ${p.nome}`}
                    aria-current={i === projetoAtivo}
                    className={`h-px transition-all duration-500 ${
                      i === projetoAtivo ? 'w-10 bg-foreground' : 'w-5 bg-border hover:bg-veiled'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <Reveal>
            <div className="mb-4 flex items-center gap-4 sm:gap-6">
              <span className="text-xl font-medium tracking-[-0.03em] sm:text-2xl">
                {projetoAtivo + 1}/{PROJETOS.length}
              </span>
              <span className="h-px flex-1 bg-border" />
              <span className="eyebrow text-[0.55rem] sm:text-[0.6rem]">Vista externa</span>
            </div>
            <div className="overflow-hidden rounded-lg">
              <Image
                src={projeto.externa}
                alt={`Vista externa da ${projeto.nome}`}
              width={1024}
              height={1280}
                className="aspect-[4/3] w-full animate-fade-in object-cover sm:aspect-[16/10]"
              />
            </div>
          </Reveal>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_2fr]">
          <div className="group relative overflow-hidden rounded-lg">
            <Image
              src={projeto.interna}
              alt={`Interior da ${projeto.nome}`}
              width={1024}
              height={1280}
              className="aspect-[16/11] w-full animate-fade-in object-cover transition-transform duration-[1200ms] group-hover:scale-105"
            />
            <span className="eyebrow absolute left-4 top-4 rounded-full border border-border/60 bg-background/50 px-3 py-1 text-[0.55rem] backdrop-blur-md">
              Interior
            </span>
          </div>

          <div className="flex flex-col">
            <dl className="divide-y divide-border/70 border-y border-border/70">
              {projeto.especificacoes.map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between py-3 transition-colors duration-300 hover:bg-secondary/40"
                >
                  <dt className="eyebrow text-[0.6rem]">{k}</dt>
                  <dd className="text-[0.8rem] font-bold">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-5 lg:mt-auto lg:pt-8">
              <span className="text-lg tracking-[0.06em] sm:text-xl">VALOR</span>
              <span className="text-xl font-bold tracking-[-0.02em] sm:text-2xl">{projeto.valor}</span>
              <a
                href="#contato"
                onClick={(e) => scrollToSection(e, '#contato')}
                className="rounded-full border border-border/80 px-6 py-2.5 text-[0.78rem] transition-colors duration-500 hover:bg-primary hover:text-primary-foreground"
              >
                Fale Conosco
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="mx-auto max-w-[1600px] px-5 pb-20 sm:px-6 lg:px-12 lg:pb-40">
        <p className="eyebrow text-center">[&nbsp;&nbsp;Serviços&nbsp;&nbsp;]</p>
        <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-2">
          <div className="space-y-4">
            {SERVICOS.map((s) => (
              <div
                key={s.n}
                className="group relative w-full overflow-hidden rounded-lg border border-border/70 bg-card p-5 text-left transition-all duration-500 hover:border-transparent hover:bg-primary sm:p-6"
                style={{ transitionTimingFunction: 'var(--ease-lux)' }}
              >
                {/* Número do serviço afastado para a direita com `left-4` */}
                <span
                  className="pointer-events-none absolute left-4 -top-6 text-[4.5rem] font-black tracking-tighter text-foreground/[0.06] transition-colors duration-500 group-hover:text-primary-foreground/70 sm:text-[5.5rem]"
                  aria-hidden="true"
                >
                  {s.n}
                </span>

                <h3 className="relative text-right text-lg font-medium tracking-[-0.02em] text-foreground transition-colors duration-500 group-hover:text-primary-foreground sm:text-xl lg:text-2xl">
                  {s.title}
                </h3>

                <div className="relative mt-8 flex items-end justify-between gap-5 lg:mt-10 lg:gap-6">
                  <p className="max-w-sm text-[0.78rem] leading-relaxed text-veiled transition-colors duration-500 group-hover:text-primary-foreground/70 sm:text-[0.8rem]">
                    {s.text}
                  </p>

                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/70 text-foreground transition-all duration-500 group-hover:rotate-45 group-hover:border-primary-foreground/30 group-hover:bg-primary-foreground group-hover:text-primary">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="group relative min-h-[320px] overflow-hidden rounded-lg lg:min-h-0">
            <Image
              src="/assets/house-b.jpg"
              alt="Casa de madeira escura com deck iluminado cercada por pinheiros"
              width={1024}
              height={1280}
              className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
            />
            <a
              href="#projetos"
              onClick={(e) => scrollToSection(e, '#projetos')}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-border/60 bg-background/35 px-8 py-2.5 text-[0.78rem] backdrop-blur-md transition-colors duration-500 hover:bg-primary hover:text-primary-foreground"
            >
              Explorar
            </a>
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="mx-auto max-w-[1600px] px-5 pb-14 sm:px-6 lg:px-12">
        <div className="flex flex-col justify-between gap-6 pb-10 lg:flex-row lg:items-start lg:gap-8 lg:pb-16">
          <h2 className="max-w-2xl text-2xl font-medium leading-tight tracking-[-0.03em] sm:text-3xl lg:text-[3rem]">
            Quer <span className="text-veiled">construir uma casa</span> que dure mas não sabe por onde começar?
          </h2>
          <span className="eyebrow lg:pt-4">[&nbsp;&nbsp;Contato&nbsp;&nbsp;]</span>
        </div>

        <div className="grid gap-10 rounded-lg bg-card p-6 sm:p-8 lg:grid-cols-2 lg:gap-16 lg:p-14">
          <div>
            <h3 className="text-xl font-medium tracking-[-0.02em] sm:text-2xl">Fale com o ateliê</h3>
            <p className="mt-5 text-[0.88rem] leading-relaxed text-veiled sm:mt-6 sm:text-[0.9rem]">
              Tem uma dúvida ou já está pronto para começar seu projeto?
              <br />
              Estamos aqui para construir a casa dos seus sonhos.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-1 lg:mt-10 lg:gap-8">
              {[
                [Phone, 'LIGUE PARA NÓS', '+55 62 98532-9181'],
                [Mail, 'ESCREVA PARA NÓS', 'victoorres@icloud.com'],
                [MapPin, 'VISITE-NOS', 'Anápolis, GO'],
              ].map(([Icon, label, value]) => {
                const I = Icon as typeof Phone;
                return (
                  <div key={label as string} className="flex items-start gap-3">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border/70">
                      <I className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </span>
                    <span>
                      <span className="eyebrow block text-[0.55rem]">{label as string}</span>
                      <span className="mt-1 block text-[0.78rem] font-bold">{value as string}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <form
            className="space-y-2"
            onSubmit={(e) => {
              e.preventDefault();
              e.currentTarget.reset();
              setEnviado(true);
              window.setTimeout(() => setEnviado(false), 4000);
            }}
          >
            <h3 className="mb-6 text-xl font-medium tracking-[-0.02em] sm:mb-8 sm:text-2xl">Envie uma mensagem</h3>
            {[
              ['Seu nome', 'text', 'nome'],
              ['E-mail', 'email', 'email'],
              ['Telefone', 'tel', 'telefone'],
              ['Sua mensagem', 'text', 'mensagem'],
            ].map(([ph, type, name]) => (
              <input
                key={name}
                type={type}
                name={name}
                placeholder={ph}
                required={name !== 'telefone'}
                className="w-full border-b border-border/70 bg-transparent py-4 text-[0.9rem] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
              />
            ))}
            <div className="flex flex-wrap items-center justify-end gap-4 pt-6 sm:pt-8">
              <span
                className={`inline-flex items-center gap-2 text-[0.75rem] text-veiled transition-opacity duration-500 ${
                  enviado ? 'opacity-100' : 'opacity-0'
                }`}
                aria-live="polite"
              >
                <Check className="h-3.5 w-3.5" strokeWidth={1.5} /> Mensagem enviada. Retornaremos em breve.
              </span>
              <button
                type="submit"
                className="rounded-full border border-border/80 px-7 py-2.5 text-[0.78rem] transition-colors duration-500 hover:bg-primary hover:text-primary-foreground"
              >
                Enviar mensagem
              </button>
            </div>
          </form>
        </div>
      </section>

      <footer className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3 border-t border-border/70 px-5 py-8 sm:px-6 lg:px-12 lg:py-10">
        <span className="text-[0.6rem] tracking-[0.28em]">ATELIÊ NORTE</span>
        <p className="eyebrow text-[0.58rem]">© {year} — Anápolis / Goiânia</p>
      </footer>
    </div>
  );
}
