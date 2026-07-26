import { useEffect, useRef } from 'react'
import { mountScrollWorld } from './scrub-engine.js'

/* ── Глава «От зерна до чашки» ─────────────────────────────────────────────
   Движок: scrub-engine.js из oso95/scroll-world (MIT), вендорнут в src/.
   Видео — футажи Mixkit (free license), перекодированы под скраб:
   720p · crf 21 · GOP 8 · faststart · без звука; мобильные 480p · GOP 4.

   Коннекторов между сценами нет — они требуют платной AI-видеогенерации,
   поэтому стыки идут кроссфейдом (движок это поддерживает штатно).       */

const V = (n) => `${import.meta.env.BASE_URL}world/${n}`

const SECTIONS = [
  {
    id: 'bean', label: 'Зерно', accent: '#f0611f', linger: 0.35,
    still: V('bean.jpg'), stillMobile: V('bean-m.jpg'),
    clip: V('bean.mp4'), clipMobile: V('bean-m.mp4'),
    eyebrow: 'Баары дандан башталат',
    title: 'Всё начинается с зерна',
    body: 'Бариста и обжарщики сети учатся у чемпионов мира по кофе и сами выступают на международных конкурсах.',
    tags: ['арабика', 'своя обжарка'],
  },
  {
    id: 'roast', label: 'Обжарка', accent: '#f0611f', linger: 0.45,
    still: V('roast.jpg'), stillMobile: V('roast-m.jpg'),
    clip: V('roast.mp4'), clipMobile: V('roast-m.mp4'),
    eyebrow: 'Куурулуш',
    title: 'Живой огонь под барабаном',
    body: 'Профиль обжарки решает всё: пережарил — горечь, недожарил — кислит. Здесь это минуты и градусы.',
    tags: ['барабан', 'профиль'],
  },
  {
    id: 'grind', label: 'Помол', accent: '#e0900c', linger: 0.5,
    still: V('grind.jpg'), stillMobile: V('grind-m.jpg'),
    clip: V('grind.mp4'), clipMobile: V('grind-m.mp4'),
    eyebrow: 'Тартуу',
    title: 'Помол под каждый шот',
    body: 'Зерно мелют прямо перед проливом и темперуют вручную. От помола зависит, за сколько секунд пройдёт вода.',
    tags: ['свежий помол', 'темпер'],
  },
  {
    id: 'pour', label: 'Пролив', accent: '#e0900c', linger: 0.4,
    still: V('pour.jpg'), stillMobile: V('pour-m.jpg'),
    clip: V('pour.mp4'), clipMobile: V('pour-m.mp4'),
    eyebrow: 'Куюу',
    title: 'Двадцать пять секунд',
    body: 'Столько идёт правильный эспрессо. Раньше — жидко, позже — горько. Дальше в дело вступает молоко.',
    tags: ['эспрессо', '25 сек'],
  },
  {
    id: 'cup', label: 'Чашка', accent: '#f0611f', linger: 0.3,
    still: V('cup.jpg'), stillMobile: V('cup-m.jpg'),
    clip: V('cup.mp4'), clipMobile: V('cup-m.mp4'),
    eyebrow: 'Ар дайым бийиктикте',
    title: 'И только теперь — чашка',
    body: 'Один и тот же рецепт на всех 44 точках: от Дордоя до альплагеря Ала-Арча.',
    cta: {
      primary: { label: 'Смотреть меню', href: '#menu' },
      secondary: { label: 'Где ближайшая', href: '#points' },
    },
  },
]

export default function World() {
  const ref = useRef(null)

  useEffect(() => {
    const host = ref.current
    if (!host) return

    const phone = window.matchMedia('(max-width: 860px)').matches

    mountScrollWorld(host, {
      // Свою шапку движка не рисуем: у сайта есть собственная, она белой
      // пилюлей висит поверх тёмной главы и уже несёт их логотип.
      hint: 'крути — от зерна до чашки',
      diveScroll: phone ? 1.05 : 1.4,
      crossfade: 0.16,
      nav: false,          // навигация уже есть в шапке сайта
      atmosphere: true,
      sections: SECTIONS,
      connectors: [],      // без AI-генерации стыки идут кроссфейдом
    })

    /* Слои движка — position:fixed и рассчитаны на страницу целиком. Глава
       стоит в середине сайта, поэтому её аппарат надо не только гасить после,
       но и не показывать до: иначе он накроет герой и поиск точки. */
    const track = host.querySelector('.sw-track')
    const onScroll = () => {
      if (!track) return
      const vh = window.innerHeight
      const y = window.scrollY || window.pageYOffset
      const top = track.getBoundingClientRect().top + y
      const fadeIn = top - vh * 0.55
      const fadeOut = top + track.offsetHeight - vh * 0.6

      let v = 1
      if (y < fadeIn) v = 0
      else if (y < top) v = (y - fadeIn) / (top - fadeIn)
      else if (y > fadeOut) v = Math.max(0, 1 - (y - fadeOut) / (vh * 0.4))

      host.style.setProperty('--sw-exit', String(v))
      host.classList.toggle('is-hidden', v <= 0.001)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    // Шрифты и картинки выше по странице сдвигают начало трека — пересчитываем.
    const relayout = () => { window.dispatchEvent(new Event('resize')) }
    window.addEventListener('load', relayout)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('load', relayout)
      host.innerHTML = ''
    }
  }, [])

  return <section id="story" ref={ref} className="sw-host" />
}
