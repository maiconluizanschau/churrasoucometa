'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Flame,
  Beef,
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
  AlertTriangle,
  QrCode,
  Copy,
  Trophy
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

// Expressões Farroupilha (rotativas)
const farroupilhaPhrases = [
  'Mas bah! Capaz que esse fogo não sai hoje.',
  'Tri legal essa brasa… se existisse!',
  'Quem é vivo sempre aparece, menos o isqueiro.',
  'Bota um mate e espera, tchê.',
  'Se o cometa ajudar, sai um churras campeiro.',
]

// Confetti simples com emoji
// Confetti simples com emoji (hook único, sem aninhar hooks)
function ConfettiBurst({ run }: { run: boolean }) {
  const [items, setItems] = useState<number[]>([])
  useEffect(() => {
    if (!run) return
    const count = 40
    setItems(Array.from({length: count}, (_,i)=>i))
    const t = setTimeout(()=> setItems([]), 1600)
    return () => clearTimeout(t)
  }, [run])
  const symbols = ['🪙','💸','🔥','🥩','🎉']
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-50">
      <AnimatePresence>
        {items.map((i) => {
          const x = Math.random()*100
          const r = (Math.random()*2-1)*40
          const sym = symbols[i % symbols.length]
          return (
            <motion.div
              key={i}
              initial={{ y: -20, x: `${x}vw`, rotate: r }}
              animate={{ y: '110vh', rotate: r*3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, ease: 'easeIn' }}
              className="absolute text-2xl"
            >
              {sym}
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
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
  const [aiLine, setAiLine] = useState('')
  const [glitch, setGlitch] = useState(true)
  const [ctaDisabled, setCtaDisabled] = useState(true)

    // Client clock to avoid hydration mismatch
    const [nowTs, setNowTs] = useState<number | null>(null)

    // HYDRATION: seed aiLine on mount (avoid server/client mismatch)
useEffect(() => {
  if (!aiLine) setAiLine(randomBuzzSentence())
}, [])

  // Modo Farroupilha
  const [farroupilha, setFarroupilha] = useState(false)
  const proximo20Set = useMemo(() => {
    const now = new Date()
    const year = now.getMonth() > 8 || (now.getMonth()===8 && now.getDate()>20) ? now.getFullYear()+1 : now.getFullYear()
    return new Date(`${year}-09-20T12:00:00`)
  }, [])
  const farroupilhaCountdown = useMemo(() => (nowTs == null ? null : proximo20Set.getTime() - nowTs), [proximo20Set, nowTs])
  const [farPhraseIdx, setFarPhraseIdx] = useState(0)
  useEffect(() => {
    if (!farroupilha) return
    const id = setInterval(()=> setFarPhraseIdx(i => (i+1) % farroupilhaPhrases.length), 4000)
    return () => clearInterval(id)
  }, [farroupilha])

  // Konami Code => Modo Cometa
  const [modoCometa, setModoCometa] = useState(false)
  useEffect(() => {
    const seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']
    let i = 0
    const onKey = (e: KeyboardEvent) => {
      i = e.key === seq[i] ? i+1 : (e.key === seq[0] ? 1 : 0)
      if (i === seq.length) {
        i = 0
        setModoCometa(true)
        setTimeout(()=>setModoCometa(false), 1600)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Melt effect + toasts
  const [melt, setMelt] = useState(false)
  const [toast, setToast] = useState<string|null>(null)
  function showToast(msg:string){ setToast(msg); setTimeout(()=>setToast(null), 1800) }

  // Pix do Bruxo modal
  const [pixOpen, setPixOpen] = useState(false)
  const [pixProgress, setPixProgress] = useState(0)
  useEffect(() => {
    if (!pixOpen) return
    setPixProgress(0)
    const id = setInterval(()=>{
      setPixProgress(p => (p >= 99 ? 42 : p + 7))
    }, 250)
    return () => clearInterval(id)
  }, [pixOpen])

  // Convite Satírico modal
  const [inviteOpen, setInviteOpen] = useState(false)
  const [inviteText, setInviteText] = useState('')
  function genInvite() {
    const dataImpossivel = 'sábado anterior, às 25:61'
    const link = `churras.bonato/${Math.random().toString(36).slice(2,8)}`
    const corpo = `Convite oficial do Churras do Bonato\n\nQuando: ${dataImpossivel}\nOnde: Casa do Bonato (se o cometa deixar)\nDress code: chinelo estratégico\nPromessa: o bruxo paga*\n\nRSVP: ${link}\n*pagamento sujeito à validação astral`
    setInviteText(corpo)
  }
  async function copyInvite() {
    try {
      await navigator.clipboard.writeText(inviteText)
      showToast('Convite copiado ✅')
    } catch {
      showToast('Não deu pra copiar 😅')
    }
  }

  // (Novo) Promessas do Bruxo
  const [promessas, setPromessas] = useState(0)
  const [achievements, setAchievements] = useState<{[k:string]: boolean}>({})
  const [confettiRun, setConfettiRun] = useState(false)
  const conquistas = [
    { key: 'p1', label: 'Prometeu 1x', threshold: 1 },
    { key: 'p5', label: 'Prometeu 5x', threshold: 5 },
    { key: 'p10', label: 'Prometeu 10x', threshold: 10 },
    { key: 'p20', label: 'Prometeu 20x', threshold: 20 },
  ]

  // carregar/salvar localStorage
  useEffect(() => {
    try {
      const p = localStorage.getItem('promessas_bruxo')
      const a = localStorage.getItem('achievements_bruxo')
      if (p) setPromessas(parseInt(p,10)||0)
      if (a) setAchievements(JSON.parse(a))
    } catch {}
  }, [])
  useEffect(() => {
    try { localStorage.setItem('promessas_bruxo', String(promessas)) } catch {}
  }, [promessas])
  useEffect(() => {
    try { localStorage.setItem('achievements_bruxo', JSON.stringify(achievements)) } catch {}
  }, [achievements])

  function registrarPromessa() {
    setPromessas(n => {
      const novo = n+1
      // verificar conquistas
      const justUnlocked = conquistas.filter(c => !achievements[c.key] && novo >= c.threshold)
      if (justUnlocked.length) {
        const first = justUnlocked[0]
        setAchievements(prev => ({ ...prev, [first.key]: true }))
        showToast(`Conquista desbloqueada: ${first.label} 🏆`)
        setConfettiRun(true)
        setTimeout(()=>setConfettiRun(false), 1700)
      } else {
        showToast('Promessa registrada 💬')
      }
      return novo
    })
  }

  useEffect(() => {
    const t = setTimeout(() => setGlitch(false), 1800)
    const t2 = setTimeout(() => setCtaDisabled(false), 2600)
    return () => { clearTimeout(t); clearTimeout(t2) }
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setTermometro((v) => {
        let nv = v + (Math.random() * (modoCometa ? 2.2 : 1.4))
        if (nv > 93) nv = 37 + Math.random() * 6
        return nv
      })
    }, modoCometa ? 800 : 1200)
    return () => clearInterval(id)
  }, [modoCometa])

  useEffect(() => {
    const id = setInterval(() => setAiLine(randomBuzzSentence()), modoCometa ? 3000 : 5000)
    return () => clearInterval(id)
  }, [modoCometa])

  const cometETADate = new Date('2061-07-28T12:00:00')
    const cometETAms = nowTs == null ? null : cometETADate.getTime() - nowTs

  function adicionarDesculpa() { setDesculpometro((n) => n + 1) }
  function darLance() { setLances((ls) => [...ls, Math.max(...ls) + (1 + Math.floor(Math.random() * 7))]) }
  function confirmarChurras() {
    setMelt(true)
    showToast('Confirmado… no multiverso errado 😅')
    setTimeout(()=>setMelt(false), 1400)
  }

  return (
    <div className={
      `min-h-screen text-zinc-100 overflow-x-hidden ` +
      (farroupilha
        ? 'bg-gradient-to-b from-emerald-950 to-amber-950'
        : 'bg-gradient-to-b from-zinc-950 to-zinc-900')
    }>
      {/* Confetti */}
      <ConfettiBurst run={confettiRun} />

      {/* global flash for modo cometa */}
      <AnimatePresence>
        {modoCometa && (
          <motion.div
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 pointer-events-none"
            style={{ mixBlendMode:'difference', background:'linear-gradient(45deg,#fff,#000)' }}
          />
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} exit={{y:20,opacity:0}}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-amber-500 text-black font-semibold shadow z-50">
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-black/40 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <motion.div initial={{ rotate: -15, scale: 0.8 }} animate={{ rotate: 0, scale: 1 }} className={"p-2 rounded-xl ring-1 " + (farroupilha ? 'bg-emerald-500/10 ring-emerald-400/30' : 'bg-amber-500/10 ring-amber-400/30')}>
            <Flame className={"w-5 h-5 " + (farroupilha ? 'text-emerald-300' : 'text-amber-400')}/>
          </motion.div>
          <div className="font-bold tracking-tight">Churras</div>
          <div className="ml-auto text-xs sm:text-sm text-zinc-300 flex items-center gap-4">
            <span className="inline-flex items-center gap-1"><Timer className="w-4 h-4"/> cometa: <span className="font-mono">{cometETAms == null ? "—" : fmt(cometETAms)}</span></span>
            <span className="hidden sm:inline-flex items-center gap-1"><AlarmClockCheck className="w-4 h-4"/> churras: <span className="font-mono">aguardando acendimento</span></span>
            <button onClick={()=>setFarroupilha(f=>!f)} className={"px-3 py-1 rounded-full text-xs font-semibold transition " + (farroupilha ? 'bg-emerald-500 text-black hover:bg-emerald-400' : 'bg-zinc-800 ring-1 ring-white/10 hover:ring-white/20')}>
              {farroupilha ? 'Modo Farroupilha: ligado' : 'Modo Farroupilha'}
            </button>
          </div>
        </div>
      </header>

      {/* Banner Farroupilha */}
      {farroupilha && (
        <div className="bg-emerald-900/40 border-b border-emerald-700/30">
          <div className="max-w-6xl mx-auto px-4 py-2 text-sm flex items-center gap-2">
            <CalendarClock className="w-4 h-4 text-emerald-300"/>
            <span>Bah, vivente! Faltam <span className="font-mono">{farroupilhaCountdown == null ? "—" : fmt(farroupilhaCountdown)}</span> pra 20/09. {farroupilhaPhrases[farPhraseIdx]}</span>
          </div>
        </div>
      )}

      {/* Hero (envolto pelo efeito melt) */}
      <motion.section
        className="relative overflow-hidden"
        animate={melt ? { filter:'blur(6px)', y: 20, opacity: 0.7 } : { filter:'blur(0px)', y:0, opacity:1 }}
        transition={{ type:'spring', stiffness: 140, damping: 18 }}
      >
        <div className="max-w-6xl mx-auto px-4 py-14 sm:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className={`text-4xl sm:text-5xl font-extrabold leading-tight ${glitch ? 'animate-pulse' : ''}`}>
                O site que prova que <span className={farroupilha ? 'text-emerald-300' : 'text-amber-400'}>o cometa</span> chega antes da <span className={farroupilha ? 'text-amber-300' : 'text-emerald-400'}>picanha</span>.
              </h1>
              <p className="mt-4 text-zinc-300 text-lg">
                {farroupilha ? farroupilhaPhrases[farPhraseIdx] : 'Aqui o bruxo promete que paga, a Revolução Farroupilha se repete, e a grelha entra em modo manutenção preventiva.'}
              </p>
              <div className="mt-6 flex flex-wrap gap-3 items-start">
                <button disabled={ctaDisabled} onClick={adicionarDesculpa} className={`px-4 py-2 rounded-2xl font-semibold shadow transition ${ctaDisabled ? 'bg-zinc-800 text-zinc-500' : (farroupilha ? 'bg-emerald-500 text-black hover:bg-emerald-400' : 'bg-amber-500 text-black hover:bg-amber-400')}`}>
                  Gerar nova desculpa
                </button>

                {/* Confirmar churrasco (melt + toast) */}
                <button onClick={confirmarChurras} className="px-4 py-2 rounded-2xl bg-zinc-800 ring-1 ring-white/10 hover:ring-white/20 transition">
                  Confirmar churrasco (beta)
                </button>

                {/* Pix do Bruxo */}
                <button onClick={()=>setPixOpen(true)} className="px-4 py-2 rounded-2xl bg-zinc-800 ring-1 ring-white/10 hover:ring-white/20 transition">
                  Pix do Bruxo
                </button>

                {/* Convite Satírico */}
                <button onClick={()=>{ genInvite(); setInviteOpen(true); }} className="px-4 py-2 rounded-2xl bg-zinc-800 ring-1 ring-white/10 hover:ring-white/20 transition">
                  Gerar convite satírico
                </button>
              </div>
              <div className="mt-4 text-sm text-zinc-400">* Dica: tente o <span className="font-mono">Konami Code</span> (↑↑↓↓←→←→BA).</div>
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
      </motion.section>

      {/* Modal Pix do Bruxo */}
      <AnimatePresence>
        {pixOpen && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div initial={{scale:0.95, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.95, opacity:0}} className="w-[min(90vw,520px)] rounded-2xl border border-white/10 bg-zinc-900/90 p-5">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-zinc-100 flex items-center gap-2"><QrCode className="w-4 h-4"/> Pix do Bruxo</div>
                <button className="text-zinc-400 hover:text-zinc-200" onClick={()=>setPixOpen(false)}>fechar</button>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 items-center">
                <div className="aspect-square rounded-xl bg-black/30 border border-white/10 flex items-center justify-center">
                  <div className="text-zinc-500 text-xs text-center px-3">QR místico aparece aqui quando o cometa der ok</div>
                </div>
                <div className="text-sm text-zinc-300 space-y-2">
                  <div>O bruxo promete cobrir o maior lance e liberar o carvão premium.</div>
                  <div className="text-xs text-zinc-400">Status da validação astral:</div>
                  <div className="h-2 rounded-full bg-black/40 border border-white/10 overflow-hidden">
                    <motion.div className="h-full bg-emerald-500" style={{ width: pixProgress + '%' }} />
                  </div>
                  <div className="text-xs text-zinc-500">({pixProgress}% — quando chega em 99%, reinicia por segurança cósmica)</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Convite Satírico */}
      <AnimatePresence>
        {inviteOpen && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div initial={{scale:0.95, opacity:0}} animate={{scale:1, opacity:1}} exit={{scale:0.95, opacity:0}} className="w-[min(90vw,620px)] rounded-2xl border border-white/10 bg-zinc-900/90 p-5">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-zinc-100">Convite Satírico</div>
                <button className="text-zinc-400 hover:text-zinc-200" onClick={()=>setInviteOpen(false)}>fechar</button>
              </div>
              <div className="mt-3 rounded-xl bg-black/30 border border-white/10 p-3">
                <pre className="whitespace-pre-wrap text-sm text-zinc-200">{inviteText}</pre>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <button onClick={copyInvite} className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500 text-black font-semibold hover:bg-amber-400 transition"><Copy className="w-4 h-4"/> Copiar convite</button>
                <button onClick={()=>{ genInvite(); }} className="px-4 py-2 rounded-2xl bg-zinc-800 ring-1 ring-white/10 hover:ring-white/20 transition">Gerar outro</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

      {/* Status Page */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-4">Status do Churrasco</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-5">
            <div className="flex items-center gap-2 text-zinc-300"><AlertTriangle className="w-5 h-5"/> Uptime da Churrasqueira</div>
            <div className="mt-2 text-4xl font-extrabold tracking-tight">0.00%</div>
            <div className="text-xs text-zinc-400">Últimas 24h — manutenção criativa</div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-5">
            <div className="flex items-center gap-2 text-zinc-300"><Timer className="w-5 h-5"/> Latência do Isqueiro</div>
            <div className="mt-2 text-4xl font-extrabold tracking-tight">∞ ms</div>
            <div className="text-xs text-zinc-400">SLO: acender antes do cometa</div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-5">
            <div className="flex items-center gap-2 text-zinc-300"><Siren className="w-5 h-5"/> Incidente Aberto</div>
            <div className="mt-2 text-4xl font-extrabold tracking-tight">P0</div>
            <div className="text-xs text-zinc-400">Falta de carvão — equipe mobilizada* (*moralmente)</div>
          </div>
        </div>
      </section>

      {/* Promessas do Bruxo (NOVO) */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Trophy className="w-5 h-5"/> Promessas do Bruxo</h2>
        <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-5">
          <div className="flex items-center gap-3">
            <div className="text-5xl font-extrabold tracking-tight">{promessas}</div>
            <div className="text-sm text-zinc-400">promessas registradas</div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <button onClick={registrarPromessa} className="px-4 py-2 rounded-2xl bg-amber-500 text-black font-semibold hover:bg-amber-400 transition">Prometer pagar</button>
            <button onClick={()=>{ setPromessas(0); setAchievements({}); showToast('Contador zerado') }} className="px-4 py-2 rounded-2xl bg-zinc-800 ring-1 ring-white/10 hover:ring-white/20 transition">Zerar contador</button>
          </div>

          {/* Badges */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {conquistas.map(c => {
              const done = achievements[c.key] || false
              return (
                <div key={c.key} className={"rounded-2xl p-4 border " + (done ? 'bg-emerald-900/30 border-emerald-500/30' : 'bg-black/30 border-white/10')}>
                  <div className="text-sm text-zinc-300">{c.label}</div>
                  <div className={"mt-1 text-xs " + (done ? 'text-emerald-300' : 'text-zinc-500')}>{done ? 'Desbloqueada' : `Faltam ${Math.max(0, c.threshold - promessas)} promessas`}</div>
                </div>
              )
            })}
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
          <div className="text-zinc-400 text-sm">Se este site não acendeu o carvão, ao menos acendeu o riso. Próximo passo: convencer o Bonato.</div>
          <div className="md:ml-auto flex items-center gap-3">
            <button onClick={()=>showToast('Desculpa enviada com sucesso ✅')} className={"px-4 py-2 rounded-2xl font-semibold transition " + (farroupilha ? 'bg-emerald-500 text-black hover:bg-emerald-400' : 'bg-amber-500 text-black hover:bg-amber-400')}>Gerar mais desculpas</button>
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
