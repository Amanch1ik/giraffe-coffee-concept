import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { status } from './locations.js'

/* ── Карта точек ──────────────────────────────────────────────────────────
   Leaflet + тайлы OpenStreetMap: без ключей и без платных сервисов.
   Координаты получены геокодингом их же адресов через Nominatim и лежат
   в locations.js. Точки без координат (вроде «проход между 8-9 рядами»
   на Дордое) на карту не попадают — выдумывать им место нельзя.        */

const dot = (open) => L.divIcon({
  className: '',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
  html: `<span style="display:block;width:16px;height:16px;border-radius:999px;
    background:${open ? '#f0611f' : '#b9b1a6'};border:2.5px solid #fff;
    box-shadow:0 2px 6px rgba(0,0,0,.35)"></span>`,
})

const meDot = L.divIcon({
  className: '',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
  html: `<span style="display:block;width:18px;height:18px;border-radius:999px;
    background:#1c9e5a;border:3px solid #fff;box-shadow:0 0 0 6px rgba(28,158,90,.22)"></span>`,
})

export default function Map({ points, now, me, focus }) {
  const el = useRef(null)
  const map = useRef(null)
  const layer = useRef(null)
  const meMarker = useRef(null)

  useEffect(() => {
    if (map.current || !el.current) return
    map.current = L.map(el.current, { scrollWheelZoom: false, attributionControl: true })
      .setView([42.8746, 74.6122], 12)   // Бишкек
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap',
    }).addTo(map.current)
    layer.current = L.layerGroup().addTo(map.current)
    return () => { map.current?.remove(); map.current = null }
  }, [])

  /* Маркеры перерисовываем при смене выборки или статусов */
  useEffect(() => {
    if (!map.current || !layer.current) return
    layer.current.clearLayers()
    const withLL = points.filter((p) => p.ll)
    withLL.forEach((p) => {
      const st = status(p, now)
      L.marker(p.ll, { icon: dot(st.open), title: p.name })
        .bindPopup(
          `<b>${p.name}</b><br>${p.addr}<br>` +
          `<span style="color:${st.open ? '#1c9e5a' : '#8a8175'}">${
            st.always ? 'Круглосуточно' : st.open ? 'Открыто' : 'Закрыто'
          }</span>` + (p.tel ? `<br><a href="tel:+996${p.tel.replace(/\D/g, '').replace(/^0/, '')}">${p.tel}</a>` : ''),
        )
        .addTo(layer.current)
    })
    if (!withLL.length) return
    /* Точки разбросаны от Кара-Балты до Каракола (~4° по долготе). Если влезать
       во все сразу, Бишкек с его 30+ точками сжимается в неразличимое пятно.
       Поэтому при широком разбросе показываем бишкекский кластер, а не всё. */
    const lons = withLL.map((p) => p.ll[1])
    const wide = Math.max(...lons) - Math.min(...lons) > 0.8
    const bishkek = withLL.filter((p) => p.ll[1] > 74.3 && p.ll[1] < 74.9 && p.ll[0] > 42.6)
    const fit = wide && bishkek.length >= 3 ? bishkek : withLL
    map.current.fitBounds(L.latLngBounds(fit.map((p) => p.ll)).pad(0.12), { animate: false })
  }, [points, now])

  /* Своя геопозиция */
  useEffect(() => {
    if (!map.current) return
    if (meMarker.current) { meMarker.current.remove(); meMarker.current = null }
    if (!me) return
    meMarker.current = L.marker(me, { icon: meDot, title: 'Вы здесь' }).addTo(map.current)
  }, [me])

  /* Приближение к выбранной точке */
  useEffect(() => {
    if (map.current && focus) map.current.setView(focus, 16, { animate: true })
  }, [focus])

  return <div ref={el} className="h-[380px] w-full overflow-hidden rounded-2xl md:h-[460px]"
    style={{ border: '1px solid var(--line)' }} />
}
