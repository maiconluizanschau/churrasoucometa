'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Flame,
  Beef,
  Wand2,
  Siren,
  CalendarClock,
  Coins,
  Timer,
  AlarmClockCheck,
  Zap,
  Crown,
  ChevronRight,
  Megaphone,
  HardHat,
  Cloud,
} from 'lucide-react'

// Util: formatar durações
function fmt(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000))
  const d = Math.floor(s / 86400)
  const h = Math.floor((s % 86400) / 3600)
  const m = Math.floor((s % 3600) / 60)
  const r = s % 60
  return `${d}d ${h}h ${m}m ${r}s`
}

const excuses = [
  'Faltou lenha sustentável nível ESG.',
  'Carvão em homologação com a ANVISA do Espeto.',
  'Churrasqueira pediu home office.',
  'Sprint travado: blocker “isqueiro sumiu”.',
  'Bonato abriu PR pra trocar picanha por pizza.',
  'DevOps do fogo em plantão até o cometa.',
  'Mudou o escopo: virou brunch fit.',
  'Acendimento via IA requer mais prompts.',
]

const buzz = ['serverless','multicloud','LLM','edge','on-chain','zero trust','5G','quantum','observability']
function randomBuzzSentence() {
  const pick = () => buzz[Math.floor(Math.random() * buzz.length)]
  return `Fogo ${pick()} com pipeline ${pick()} e tuning ${pick()} pronto em breve*`
}

function Thermo({ value }: { value: number }) {
  return (
    <div className="w-full h-3 rounded-full bg-black/50 border border-white/10 overflow-hidden">
      <motion.div
        className="h-full bg-amber-500"
        style={{ width: `${value}%` }}
        animate={{ width: `${value}%` }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      />
    </div>
  )
}

export default function ChurrasDoBonato2() {
  const [desculpometro, setDesculpometro] = useState(0)
  const [termometro, setTermometro] = useState(0.7)
  const [lances, setLances] = useState<number[]>([7, 12, 18])
  const [aiLine, setAiLine] = useState(randomBuzzSentence())
  const [glitch, setGlitch] = useState(true)
  const [ctaDisabled, setCtaDisabled] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setGlitch(false), 1800)
    const t2 = setTimeout(() => setCtaDisabled(false), 2600)
    return () => { clearTimeout(t); clearTimeout(t2) }
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setTermometro((v) => {
        let nv = v + (Math.random() * 1.4)
        if (nv > 93) nv = 37 + Math.random() * 6
        return nv
      })
    }, 1200)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setAiLine(randomBuzzSentence()), 5000)
    return () => clearInterval(id)
  }, [])

  const cometETADate = new Date('2061-07-28T12:00:00')
  const cometETAms = cometETADate.getTime() - new Date().getTime()

  function adicionarDesculpa() { setDesculpometro((n) => n + 1) }
  function darLance() { setLances((ls) => [...ls, Math.max(...ls) + (1 + Math.floor(Math.random() * 7))]) }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-zinc-100">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-black/40 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <motion.div initial={{ rotate: -15, scale: 0.8 }} animate={{ rotate: 0, scale: 1 }} className="p-2 rounded-xl bg-amber-500/10 ring-1 ring-amber-400/30">
            <Flame className="w-5 h-5 text-amber-400"/>
          </motion.div>
          <div className="font-bold tracking-tight">Churras do Bonato — v2</div>
          <div className="ml-auto text-xs sm:text-sm text-zinc-300 flex items-center gap-4">
            <span className="inline-flex items-center gap-1"><Timer className="w-4 h-4"/> cometa: <span className="font-mono">{fmt(cometETAms)}</span></span>
            <span className="hidden sm:inline-flex items-center gap-1"><AlarmClockCheck className="w-4 h-4"/> churras: <span className="font-mono">aguardando acendimento</span></span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-14 sm:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className={`text-4xl sm:text-5xl font-extrabold leading-tight ${glitch ? 'animate-pulse' : ''}`}>
                O site que prova que <span className="text-amber-400">o cometa</span> chega antes da <span className="text-emerald-400">picanha</span>.
              </h1>
              <p className="mt-4 text-zinc-300 text-lg">
                Aqui o bruxo promete que paga, a Revolução Farroupilha se repete, e a grelha entra em modo manutenção preventiva.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button disabled={ctaDisabled} onClick={adicionarDesculpa} className={`px-4 py-2 rounded-2xl font-semibold shadow transition ${ctaDisabled ? 'bg-zinc-800 text-zinc-500' : 'bg-amber-500 text-black hover:bg-amber-400'}`}>
                  Gerar nova desculpa
                </button>
                <button onClick={darLance} className="px-4 py-2 rounded-2xl bg-zinc-800 ring-1 ring-white/10 hover:ring-white/20 transition">
                  Dar lance no carvão (R$)
                </button>
              </div>
              <div className="mt-4 text-sm text-zinc-400">* ‘Breve’ = depois do cometa, provavelmente.</div>
            </div>

            {/* Card de IA do fogo + termômetro */}
            <div>
              <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-4 shadow-inner">
                <div className="flex items-center gap-2 text-zinc-300 text-sm"><Zap className="w-4 h-4"/> Fogo.AI™</div>
                <div className="mt-2 text-xl font-bold">{aiLine}</div>
                <div className="mt-4 flex items-center gap-3">
                  <Beef className="w-6 h-6 text-rose-300"/>
                  <div className="flex-1">
                    <Thermo value={termometro} />
                    <div className="mt-1 text-xs text-zinc-400">Ponto estimado: {termometro.toFixed(1)}%</div>
                  </div>
                </div>
                <div className="mt-4 text-xs text-zinc-400">Inclui modelo generativo que explica por que não acendeu.</div>
              </div>
              <div className="text-xs text-zinc-400 mt-2 italic">Se subir demais, reinicia — segurança alimentar, dizem.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Desculpômetro + feed */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid md:grid-cols-3 gap-4">
          <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} className="rounded-3xl border border-white/10 bg-zinc-900/60 p-5">
            <div className="flex items-center gap-2 text-zinc-300"><Siren className="w-5 h-5"/> Desculpômetro</div>
            <div className="mt-2 text-5xl font-extrabold tracking-tight">{desculpometro}</div>
            <div className="text-sm text-zinc-400">Quantidade de motivos oficiais para o churras não ter começado.</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} className="rounded-3xl border border-white/10 bg-zinc-900/60 p-5 md:col-span-2">
            <div className="flex items-center gap-2 text-zinc-300"><Megaphone className="w-5 h-5"/> Últimas justificativas</div>
            <div className="mt-3 grid sm:grid-cols-2 gap-3">
              {[0,1,2,3,4,5].map((i) => (
                <div key={i} className="rounded-2xl bg-black/30 border border-white/5 p-3 text-sm text-zinc-300">
                  {excuses[(desculpometro + i) % excuses.length]}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leilão do Carvão */}
      <section className="bg-gradient-to-b from-zinc-950 to-black border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center gap-2 text-zinc-300"><Coins className="w-5 h-5"/> Leilão do Carvão</div>
          <div className="mt-2 rounded-3xl border border-white/10 bg-zinc-900/60 p-5">
            <p className="text-zinc-300 text-sm">Quem dá mais para acender isso hoje?</p>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {lances.slice(-8).map((v, idx) => (
                <div key={idx} className="rounded-2xl bg-black/30 border border-white/5 p-4 text-center">
                  <div className="text-2xl font-bold">R${v},00</div>
                  <div className="text-xs text-zinc-400">lance #{lances.length - (lances.slice(-8).length - idx) + 1}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3">
              <button onClick={darLance} className="px-4 py-2 rounded-2xl bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition">Dar lance</button>
              <div className="text-xs text-zinc-400">O bruxo promete cobrir o maior. Promete.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap impossível */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-4">Roadmap Impossível</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: <HardHat className="w-5 h-5"/>, title: 'Q1 — Comprar fósforo', desc: 'Dependência externa crítica.' },
            { icon: <Cloud className="w-5 h-5"/>, title: 'Q2 — Gerar fumaça', desc: 'OKR: 2 stories de vapor por sprint.' },
            { icon: <Crown className="w-5 h-5"/>, title: 'Q3 — Picanha Soberana', desc: 'Feature premium liberada via bonatocoin.' },
          ].map((it, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} className="rounded-3xl border border-white/10 bg-zinc-900/60 p-5">
              <div className="flex items-center gap-2 text-zinc-300">{it.icon} <span className="font-semibold text-zinc-100">{it.title}</span></div>
              <div className="mt-2 text-zinc-300 text-sm">{it.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ absurdo */}
      <section className="bg-gradient-to-b from-black to-zinc-950 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-4">FAQ que ninguém pediu</h2>
          <div className="space-y-3">
            <Faq q="O bruxo paga mesmo?" a="Paga sim, desde que o cometa valide no blockchain da churrasqueira." />
            <Faq q="Por que não acendeu ainda?" a="Estamos aguardando aprovação de mudança em janela de manutenção astronômica." />
            <Faq q="Posso levar salada?" a="Pode, mas o sistema converte automaticamente em pão de alho." />
            <Faq q="Vai ter Farroupilha?" a="Vai, e o hino é cantado até a brasa se manifestar por osmose patriótica." />
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center gap-4">
          <div className="text-zinc-400 text-sm">Se este site não acendeu o carvão. Próximo passo: convencer a ter churrasco.</div>
          <div className="md:ml-auto flex items-center gap-3">
            <button onClick={adicionarDesculpa} className="px-4 py-2 rounded-2xl bg-amber-500 text-black font-semibold hover:bg-amber-400 transition">Gerar mais desculpas</button>
            <a href="#" className="px-4 py-2 rounded-2xl bg-zinc-800 ring-1 ring-white/10 hover:ring-white/20 transition" onClick={(e) => e.preventDefault()}>Ver contrato do cometa</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/60 overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full text-left px-4 py-3 flex items-center gap-2">
        <ChevronRight className={`w-4 h-4 transition ${open ? 'rotate-90' : ''}`}/>
        <span className="font-semibold text-zinc-100">{q}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-4 pb-4 text-sm text-zinc-300">
            {a}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
