import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence, MotionConfig } from 'motion/react'
import Lenis from 'lenis'
import { LOCATIONS, KIND, status, fmt, telHref, telText } from './locations.js'
import { MENU, ADDONS } from './menu.js'

/* Их собственная съёмка из официального PDF-меню — вырезы с альфа-каналом
   (в PDF картинка и её маска лежат отдельно, собрал обратно в RGBA).
   Поэтому блюда «летают» по кремовому фону без рамок и плашек. */
const CUT = (n) => `/cut/${n}.webp`

const DISH = {
  coffee: 'latte', matcha: 'latte', breakfast: 'benedict',
  burger: 'burger', sandwich: 'croissant', dessert: 'dessert',
}

/* Витрина: плитки категорий с их же съёмкой. Подписи — только названия
   категорий и минимальная цена, посчитанная по данным меню. Конкретные
   блюда не подписываю: сверить каждый кадр с позицией по PDF я не могу,
   а врать в подписи к чужому фото нельзя. */
const SHOWCASE = ['coffee', 'breakfast', 'burger', 'sandwich', 'dessert']

/* ── Живые часы: раз в 30 сек, чтобы статусы точек не врали ─────────────── */
function useNow() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])
  return now
}

const clock = (d) => `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`

/* ── Header ─────────────────────────────────────────────────────────────── */
function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-[100] px-4 py-3 md:px-8 md:py-4">
      <div className="card mx-auto flex w-full max-w-6xl items-center justify-between rounded-full px-5 py-2.5 shadow-sm">
        <a href="#top" className="display text-lg md:text-xl">
          Giraffe<span style={{ color: 'var(--orange)' }}>.</span>
        </a>
        <nav className="hidden items-center gap-7 text-sm text-[color:var(--muted)] md:flex">
          <a href="#points" className="transition-colors hover:text-[color:var(--ink)]">Точки</a>
          <a href="#menu" className="transition-colors hover:text-[color:var(--ink)]">Меню</a>
          <a href="#reach" className="transition-colors hover:text-[color:var(--ink)]">География</a>
        </nav>
        <a href="#points" className="btn btn-primary rounded-full px-4 py-2 text-[11px] md:px-5">
          Найти точку
        </a>
      </div>
    </header>
  )
}

/* ── Hero ───────────────────────────────────────────────────────────────── */
function Hero({ now, openCount }) {
  return (
    <section id="top" className="spots relative overflow-hidden px-5 pb-16 pt-28 md:px-8 md:pb-24 md:pt-36">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <div className="eyebrow" style={{ color: 'var(--orange)' }}>Ар дайым бийиктикте</div>

        <h1 className="display mt-5 text-[clamp(2.6rem,10vw,7rem)]">
          Всегда<br />на высоте
        </h1>

        <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-[color:var(--muted)] md:text-lg">
          Кофейни и точки навынос по всему Кыргызстану — от Дордоя
          до альплагеря Ала-Арча и аэропорта «Манас».
        </p>

        {/* Их собственный кадр без фона — держит центр композиции. */}
        <img src={CUT('latte')} alt="Капучино Giraffe Coffee" width="720" height="720"
          className="mt-4 w-[clamp(170px,26vw,240px)] drop-shadow-[0_22px_32px_rgba(80,55,30,.18)]" />

        {/* Живой статус сети — то, чего нет ни в инстаграме, ни в taplink.
            Намеренно без анимации входа: это ключевая информация страницы,
            она не должна зависеть от того, доиграл ли твин. */}
        <div className="card mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 py-3.5 text-sm">
          <span className="tabular-nums text-[color:var(--muted)]">Сейчас {clock(now)}</span>
          <span className="flex items-center gap-2">
            <i className="dot dot-on" />
            <b className="tabular-nums">{openCount}</b>
            <span className="text-[color:var(--muted)]">из {LOCATIONS.length} открыто</span>
          </span>
        </div>

        {/* На узком экране кнопки встают в столбик — фиксируем общую ширину,
            иначе они разъезжаются по длине надписи. */}
        <div className="mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:justify-center">
          <a href="#points" className="btn btn-primary w-full rounded-full px-7 py-3.5 text-center text-xs sm:w-auto">Где ближайшая</a>
          <a href="#menu" className="btn btn-ghost w-full rounded-full px-7 py-3.5 text-center text-xs sm:w-auto">Смотреть меню</a>
        </div>

        <ul className="mt-10 grid w-full max-w-3xl grid-cols-3 gap-4">
          {[
            { n: LOCATIONS.length, l: 'точки' },
            { n: 7, l: 'городов и сёл' },
            { n: '24/7', l: 'Медерова и Манас' },
          ].map((s) => (
            <li key={s.l} className="card px-3 py-5">
              <div className="display text-[clamp(1.3rem,4.5vw,2.2rem)]" style={{ color: 'var(--orange)' }}>{s.n}</div>
              <div className="mt-1.5 text-xs text-[color:var(--muted)] md:text-sm">{s.l}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ── Карточка точки ─────────────────────────────────────────────────────── */
function Point({ loc, now }) {
  const st = status(loc, now)
  return (
    <motion.li layout
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .97 }}
      transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      className="card flex flex-col gap-3 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="tag text-[13px]">{loc.name}</h3>
          <p className="mt-1 text-sm leading-snug text-[color:var(--muted)]">{loc.addr}</p>
        </div>
        {loc.tag && (
          <span className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white"
            style={{ background: 'var(--orange)' }}>{loc.tag}</span>
        )}
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-sm">
        <span className="flex items-center gap-2">
          <i className={`dot ${st.open ? 'dot-on' : 'dot-off'}`} />
          <span className={st.open ? 'font-semibold' : 'text-[color:var(--muted)]'}>
            {st.always ? 'Круглосуточно' : st.open ? 'Открыто' : st.closedToday ? 'Сегодня выходной' : 'Закрыто'}
          </span>
        </span>
        {!st.always && !st.closedToday && (
          <span className="tabular-nums text-[color:var(--muted)]">
            {st.open ? `до ${fmt(st.to)}` : `с ${fmt(st.from)}`}
          </span>
        )}
      </div>

      {loc.tel && (
        <a href={telHref(loc.tel)}
          className="tabular-nums text-sm font-semibold transition-opacity hover:opacity-70"
          style={{ color: 'var(--orange)' }}>
          {telText(loc.tel)}
        </a>
      )}
    </motion.li>
  )
}

/* ── Поиск точки: ядро сайта ────────────────────────────────────────────── */
function Points({ now }) {
  const [kind, setKind] = useState('all')
  const [q, setQ] = useState('')
  const [onlyOpen, setOnlyOpen] = useState(false)

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return LOCATIONS.filter((l) => {
      if (kind !== 'all' && l.kind !== kind) return false
      if (onlyOpen && !status(l, now).open) return false
      if (!needle) return true
      return `${l.name} ${l.addr} ${l.city}`.toLowerCase().includes(needle)
    })
  }, [kind, q, onlyOpen, now])

  const chips = [{ id: 'all', ru: 'Все' }, ...Object.values(KIND)]

  return (
    <section id="points" className="relative mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <div className="text-center">
        <div className="eyebrow" style={{ color: 'var(--orange)' }}>Кайда барабыз</div>
        <h2 className="display mt-4 text-[clamp(2rem,6vw,3.6rem)]">Где мы есть</h2>
        <p className="mx-auto mt-4 max-w-lg text-[color:var(--muted)]">
          {LOCATIONS.length} точки. Ищи по названию или улице — статус считается от текущего времени.
        </p>
      </div>

      <div className="mt-10 flex flex-col items-center gap-4">
        <input
          type="search" value={q} onChange={(e) => setQ(e.target.value)}
          placeholder="Улица, район или название — например «Чуй» или «Дордой»"
          className="card w-full max-w-xl px-5 py-3.5 text-[15px] outline-none placeholder:text-[color:var(--muted)] focus:border-[color:var(--orange)]"
        />

        <div className="flex flex-wrap items-center justify-center gap-2">
          {chips.map((c) => {
            const on = kind === c.id
            return (
              <button key={c.id} onClick={() => setKind(c.id)}
                className="relative rounded-full px-4 py-2 text-xs font-semibold transition-colors"
                style={{ color: on ? '#fff' : 'var(--muted)' }}>
                {on && (
                  <motion.span layoutId="kindPill" className="absolute inset-0 z-0 rounded-full"
                    style={{ background: 'var(--ink)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                )}
                <span className="relative z-10">{c.ru}</span>
              </button>
            )
          })}

          <button onClick={() => setOnlyOpen((v) => !v)}
            className="flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-colors"
            style={{
              borderColor: onlyOpen ? 'var(--orange)' : 'var(--line)',
              background: onlyOpen ? 'var(--orange)' : 'transparent',
              color: onlyOpen ? '#fff' : 'var(--muted)',
            }}>
            <i className="dot" style={{ background: onlyOpen ? '#fff' : '#1c9e5a' }} />
            Открыто сейчас
          </button>
        </div>

        <p className="text-sm text-[color:var(--muted)]">
          Найдено: <b className="tabular-nums text-[color:var(--ink)]">{list.length}</b>
        </p>
      </div>

      <motion.ul layout className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((l) => <Point key={l.id} loc={l} now={now} />)}
        </AnimatePresence>
      </motion.ul>

      {list.length === 0 && (
        <p className="mt-12 text-center text-[color:var(--muted)]">
          Ничего не нашлось. Попробуй другое слово или сбрось фильтры.
        </p>
      )}
    </section>
  )
}

/* ── Меню ───────────────────────────────────────────────────────────────── */
function Menu({ cat, setCat }) {
  const active = MENU.find((c) => c.id === cat)
  const pic = DISH[cat]

  return (
    <section id="menu" className="spots relative border-y py-20 md:py-28" style={{ borderColor: 'var(--line)' }}>
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="text-center">
          <div className="eyebrow" style={{ color: 'var(--orange)' }}>Меню</div>
          <h2 className="display mt-4 text-[clamp(2rem,6vw,3.6rem)]">
            Что <span style={{ color: 'var(--orange)' }}>наливаем</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[color:var(--muted)]">
            Цены из официального меню сети, в сомах. Напитки — три размера: {MENU[0].note}.
          </p>
        </div>

        {/* На мобиле категории едут горизонтально, а не рвутся на две строки. */}
        <div className="mt-9 -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
          {MENU.map((c) => {
            const on = cat === c.id
            return (
              <button key={c.id} onClick={() => setCat(c.id)}
                className="relative shrink-0 rounded-full px-5 py-2.5 text-xs font-semibold transition-colors"
                style={{ color: on ? '#fff' : 'var(--muted)' }}>
                {on && (
                  <motion.span layoutId="catPill" className="absolute inset-0 z-0 rounded-full"
                    style={{ background: 'var(--orange)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                )}
                <span className="relative z-10">{c.ru}</span>
              </button>
            )
          })}
        </div>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1fr_320px]">
          <div className="card overflow-hidden">
            <div className="flex items-baseline justify-between gap-4 border-b px-6 py-5" style={{ borderColor: 'var(--line)' }}>
              <div>
                <span className="plate tag text-[13px]">{active.kg}</span>
                <span className="ml-3 text-sm text-[color:var(--muted)]">{active.ru}</span>
              </div>
              <span className="hidden text-xs text-[color:var(--muted)] sm:block">{active.note}</span>
            </div>

              <motion.ul key={cat}
                initial={{ y: 8 }} animate={{ y: 0 }}
                transition={{ duration: .22 }}
                className="divide-y" style={{ borderColor: 'var(--line)' }}>
                {/* На мобиле цена уходит под название: в две колонки текст
                    рвётся на 3-4 строки при полупустой колонке цены. */}
                {active.items.map((it) => (
                  <li key={it.ru} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-5 sm:px-6">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold">{it.ru}</span>
                        {it.hit && (
                          <span className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase text-white"
                            style={{ background: 'var(--orange)' }}>хит</span>
                        )}
                      </div>
                      {/* Кыргызская строка только когда она реально отличается */}
                      {it.kg !== it.ru && (
                        <div className="mt-0.5 text-sm text-[color:var(--muted)]">{it.kg}</div>
                      )}
                      {it.d && <div className="mt-1 text-xs text-[color:var(--muted)]">{it.d}</div>}
                    </div>
                    <div className="tag shrink-0 tabular-nums text-[13px]">
                      {it.p.join(' / ')}<span className="ml-1 text-[color:var(--muted)]">с</span>
                    </div>
                  </li>
                ))}
              </motion.ul>
          </div>

          <div className="flex flex-col gap-6">
            {/* Фото блюда меняется вместе с категорией. Смена — через CSS-переход
                по key, без анимации прозрачности на входе: снимок обязан быть
                виден сразу. */}
            {/* Вырез с альфой — без рамки и круга, блюдо лежит прямо на фоне. */}
            <img key={pic} src={CUT(pic)} alt="" width="720" height="720"
              className="mx-auto w-full max-w-[300px] drop-shadow-[0_26px_34px_rgba(80,55,30,.2)]" />

            <div className="card p-6">
              <div className="tag text-[12px]">Добавки</div>
              <ul className="mt-4 space-y-2.5 text-sm">
                {ADDONS.map((a) => (
                  <li key={a.ru} className="flex items-baseline justify-between gap-3">
                    <span className="text-[color:var(--muted)]">
                      {a.ru} <span className="text-xs opacity-70">{a.d}</span>
                    </span>
                    <b className="tabular-nums">{a.p}</b>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Витрина: визуальный вход в меню ────────────────────────────────────── */
function Showcase({ onPick }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 pb-4 md:px-8">
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {SHOWCASE.map((id) => {
          const c = MENU.find((m) => m.id === id)
          const from = Math.min(...c.items.flatMap((i) => i.p))
          return (
            <li key={id}>
              <button onClick={() => onPick(id)}
                className="group flex w-full flex-col items-center rounded-2xl px-2 py-4 text-center transition-colors hover:bg-white">
                <img src={CUT(DISH[id])} alt="" width="720" height="720" loading="lazy"
                  className="h-28 w-auto object-contain drop-shadow-[0_16px_20px_rgba(80,55,30,.16)] transition-transform duration-300 group-hover:-translate-y-1.5 md:h-32" />
                <span className="tag mt-3 text-[11px]">{c.ru}</span>
                <span className="mt-1 text-xs text-[color:var(--muted)]">от {from} с</span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

/* ── География: реальный диапазон сети ──────────────────────────────────── */
const REACH = [
  { p: 'Дордой', d: 'рынок, с 8 утра', n: 'где начинается день' },
  { p: 'Бишкек', d: '7 кофеен и 29 точек навынос', n: 'от площади Ала-Тоо до Джала' },
  { p: 'Токмок · Балыкчы', d: 'Кара-Балта, Сокулук', n: 'по трассе' },
  { p: 'Каракол', d: 'кофейня до полуночи', n: 'у подножия Тянь-Шаня' },
  { p: 'Аэропорт «Манас»', d: 'круглосуточно', n: 'последний кофе перед рейсом' },
  { p: 'Альплагерь Ала-Арча', d: 'вт-вс, понедельник выходной', n: 'самая высокая точка сети' },
]

function Reach() {
  return (
    <section id="reach" className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <div className="text-center">
        <div className="eyebrow" style={{ color: 'var(--orange)' }}>География</div>
        <h2 className="display mt-4 text-[clamp(2rem,6vw,3.6rem)]">От рынка до ледника</h2>
      </div>

      {/* Анимируем только сдвиг, но НЕ прозрачность: если анимация почему-то
          не стартует (троттлинг фоновой вкладки, сбой rAF), текст всё равно
          виден. Контент не должен зависеть от того, доиграл ли твин. */}
      <ol className="mx-auto mt-14 max-w-2xl">
        {REACH.map((r, i) => (
          <motion.li key={r.p}
            initial={{ x: -14 }} whileInView={{ x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: .45, delay: i * .05 }}
            className="relative flex gap-5 pb-9 pl-7">
            {/* вертикаль — шея жирафа как шкала высоты */}
            <span aria-hidden className="absolute left-0 top-3 h-full w-px"
              style={{ background: i === REACH.length - 1 ? 'transparent' : 'var(--line)' }} />
            <span aria-hidden className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full"
              style={{ background: i === REACH.length - 1 ? 'var(--orange)' : 'var(--spot)' }} />
            <div className="flex-1">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h3 className="tag text-[15px]">{r.p}</h3>
                <span className="text-sm text-[color:var(--muted)]">{r.d}</span>
              </div>
              <p className="mt-1 text-sm text-[color:var(--muted)]">{r.n}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}

/* ── Footer ─────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="spots border-t px-5 py-16 md:px-8 md:py-20" style={{ borderColor: 'var(--line)' }}>
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="display text-2xl">Giraffe<span style={{ color: 'var(--orange)' }}>.</span></div>
            <p className="mt-3 max-w-xs text-sm text-[color:var(--muted)]">
              Ар дайым бийиктикте — всегда на высоте.
            </p>
          </div>

          <div>
            <div className="eyebrow text-[color:var(--muted)]">Связаться</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a className="hover:opacity-70" href="https://wa.me/996556333353" target="_blank" rel="noreferrer">WhatsApp · 0556 333 353</a></li>
              <li><a className="hover:opacity-70" href="mailto:giraffecoffeekg@gmail.com">giraffecoffeekg@gmail.com</a></li>
              <li><a className="hover:opacity-70" href="https://instagram.com/giraffe_coffee" target="_blank" rel="noreferrer">Instagram · @giraffe_coffee</a></li>
            </ul>
          </div>

          <div>
            <div className="eyebrow text-[color:var(--muted)]">Сотрудничество</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a className="hover:opacity-70" href="http://giraffefranchize.tilda.ws/" target="_blank" rel="noreferrer">Франшиза</a></li>
              <li><a className="hover:opacity-70" href="http://giraffevacancy.tilda.ws/" target="_blank" rel="noreferrer">Вакансии</a></li>
              <li><a className="hover:opacity-70" href="https://wa.me/996554350523" target="_blank" rel="noreferrer">Купить зерно</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-6 text-xs leading-relaxed text-[color:var(--muted)]" style={{ borderColor: 'var(--line)' }}>
          <p>
            <b>Концепт, не официальный сайт.</b> У сети Giraffe Coffee своего сайта нет;
            адреса, графики, телефоны и цены взяты из их публичных источников
            (taplink сети и официальное PDF-меню) и приведены как есть. Фотографии блюд — из того же меню.
            Права на бренд, фотографии и меню принадлежат Giraffe Coffee.
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ── App ────────────────────────────────────────────────────────────────── */
export default function App() {
  const now = useNow()
  const openCount = useMemo(() => LOCATIONS.filter((l) => status(l, now).open).length, [now])
  const [cat, setCat] = useState(MENU[0].id)

  /* Клик по витрине переключает категорию и уводит в меню. */
  const pickCategory = (id) => {
    setCat(id)
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.1 })
    let raf
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href')
        if (id.length > 1) { e.preventDefault(); lenis.scrollTo(id, { offset: -80 }) }
      })
    })
    return () => { cancelAnimationFrame(raf); lenis.destroy() }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main>
        <Hero now={now} openCount={openCount} />
        <Showcase onPick={pickCategory} />
        <Points now={now} />
        <Menu cat={cat} setCat={setCat} />
        <Reach />
      </main>
      <Footer />
    </MotionConfig>
  )
}
