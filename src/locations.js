/* ── Реальные точки Giraffe Coffee ────────────────────────────────────────
   Источник: официальный taplink сети (taplink.cc/giraffecoffeebishkek).
   Ничего не выдумано: адреса, графики и телефоны — как опубликовано у них.

   open: расписание в минутах от полуночи. `null` = круглосуточно.
   Ключи дней: wd — пн-пт, sat, sun. Если дня нет — берётся wd.

   ll: [lat, lon] — геокодинг их адресов через Nominatim (OSM), затем
   проверка попаданием в рамку города: два результата улетели в другую
   область и отброшены. У 7 точек координат нет — адреса вроде «проход
   между 8-9 рядами» на Дордое не геокодируются. Такие точки остаются
   в списке, но на карту не наносятся: выдумывать им место нельзя.    */

export const KIND = {
  cafe: { id: 'cafe', ru: 'Кофейни', kg: 'Кофеканалар' },
  togo: { id: 'togo', ru: 'Навынос', kg: 'Ала кетүү' },
  region: { id: 'region', ru: 'Регионы', kg: 'Аймактар' },
}

const H = (h, m = 0) => h * 60 + m
const std = { wd: [H(7), H(23)], sat: [H(8), H(23)], sun: [H(8), H(23)] }
const late = { wd: [H(7), H(24)], sat: [H(8), H(24)], sun: [H(8), H(24)] }
const day = (a, b) => ({ wd: [H(a), H(b)], sat: [H(a), H(b)], sun: [H(a), H(b)] })

export const LOCATIONS = [
  /* ── Кофейни ───────────────────────────────────────────────────────── */
  { id: 'mederova', ll: [42.852162, 74.61906], kind: 'cafe', name: 'Медерова', addr: 'Медерова, 81', tel: '0703333375', open: null, city: 'Бишкек' },
  { id: 'bokonbaeva', ll: [42.867132, 74.608225], kind: 'cafe', name: 'Боконбаева', addr: 'Боконбаева, 101', tel: '0703333398', open: late, city: 'Бишкек' },
  { id: 'gorkogo', ll: [42.85703, 74.599099], kind: 'cafe', name: 'Горького', addr: 'Горького, 172', tel: '0557333399', open: late, city: 'Бишкек' },
  { id: 'dordoi-plaza', ll: [42.874754, 74.618745], kind: 'cafe', name: 'Dordoi Plaza', addr: 'Dordoi Plaza', tel: '0708330033', open: day(10, 24), city: 'Бишкек', tag: 'новая' },
  { id: 'karalaeva', ll: [42.816149, 74.639217], kind: 'cafe', name: 'Каралаева', addr: 'Каралаева, 62/7', tel: '0501533333', open: late, city: 'Бишкек' },
  { id: 'cosmopark', kind: 'cafe', name: 'Cosmopark', addr: 'Юнусалиева, 40а, 2 этаж', tel: '0557553333', open: day(10, 24), city: 'Бишкек' },
  { id: 'royal', ll: [42.880088, 74.591179], kind: 'cafe', name: 'БЦ Royal', addr: 'Абдумомунова, 282', tel: '0502773333', open: late, city: 'Бишкек' },

  /* ── Навынос ───────────────────────────────────────────────────────── */
  { id: 'beta-1', kind: 'togo', name: 'Beta Stores I', addr: 'пр. Чуй, 150а/2', open: day(8, 20), city: 'Бишкек' },
  { id: 'beta-2', ll: [42.855014, 74.623575], kind: 'togo', name: 'Beta Stores II', addr: 'Юнусалиева, 171/3', open: std, city: 'Бишкек' },
  { id: '5mkr', ll: [42.83629, 74.622146], kind: 'togo', name: '5 мкр', addr: 'Юнусалиева, 160а', tel: '0504906333', open: std, city: 'Бишкек' },
  { id: '8mkr', ll: [42.83304, 74.608316], kind: 'togo', name: '8 мкр', addr: 'Байтик Баатыра, 1/4', open: std, city: 'Бишкек' },
  { id: 'ala-archa-tc', kind: 'togo', name: 'ТЦ Ала-Арча', addr: 'пр. Чынгыза Айтматова, 299в', tel: '0999104785', open: std, city: 'Бишкек' },
  { id: 'dk', ll: [42.816111, 74.633671], kind: 'togo', name: 'DK (12 мкр)', addr: 'Жетикашкаевой, 29/1', open: std, city: 'Бишкек' },
  { id: 'london', ll: [42.82235, 74.616758], kind: 'togo', name: 'БЦ Лондон', addr: 'Токомбаева, 9Б', tel: '0709330013', open: day(8, 20), city: 'Бишкек' },
  { id: 'magnum', ll: [42.843467, 74.598224], kind: 'togo', name: 'Магнум', addr: 'Ахунбаева, 127/1', tel: '0708553333', open: day(8, 20), city: 'Бишкек' },
  { id: 'kok-jar', ll: [42.839296, 74.64926], kind: 'togo', name: 'ЖМ Кок-Жар', addr: 'Кок-Жаңгак, 47а', tel: '0708600034', open: std, city: 'Бишкек' },
  { id: 'panorama', ll: [42.802552, 74.64913], kind: 'togo', name: 'Панорама', addr: 'Карагул Акмат, 6/3', tel: '0550224411', city: 'Бишкек',
    open: { wd: [H(8), H(20)], sat: [H(8), H(23)], sun: [H(8), H(23)] } },
  { id: 'erkindik', ll: [42.869712, 74.607407], kind: 'togo', name: 'Эркиндик', addr: 'Эркиндик, 23', tel: '0705113333', open: std, city: 'Бишкек' },
  { id: 'kraft', ll: [42.870453, 74.578772], kind: 'togo', name: 'Крафт', addr: 'Московская, 208', tel: '0755291225', open: day(7, 19), city: 'Бишкек' },
  { id: 'razzakova', ll: [42.867355, 74.603033], kind: 'togo', name: 'Раззакова', addr: 'Боконбаева, 113', open: std, city: 'Бишкек' },
  { id: 'bishkek-city', ll: [42.877062, 74.622992], kind: 'togo', name: 'Bishkek City', addr: 'Суюмбаева, 142/2', tel: '0557291225', open: std, city: 'Бишкек' },
  { id: 'suyumbaeva', ll: [42.872259, 74.624102], kind: 'togo', name: 'Суюмбаева', addr: 'Суюмбаева, 51', tel: '0703030353', open: std, city: 'Бишкек' },
  { id: 'bravo', kind: 'togo', name: 'Браво', addr: 'Рысмендеева, 54', tel: '0708223333', open: std, city: 'Бишкек' },
  { id: 'alamedin', ll: [42.877963, 74.684668], kind: 'togo', name: 'Аламедин', addr: 'Аламедин-1, 60/1', open: std, city: 'Бишкек' },
  { id: 'tunguch', ll: [42.855888, 74.672216], kind: 'togo', name: 'Тунгуч', addr: 'ул. Анкара, 1/1Б', tel: '0990450039', open: std, city: 'Бишкек' },
  { id: 'druzhba', ll: [42.855452, 74.610592], kind: 'togo', name: 'Дружба', addr: 'Байтик Баатыра, 39', tel: '0704773333', open: std, city: 'Бишкек' },
  { id: 'bishkek-park', ll: [42.874487, 74.590408], kind: 'togo', name: 'Bishkek Park', addr: 'Киевская, 148 (2 этаж)', open: day(10, 22), city: 'Бишкек' },
  { id: 'manasa', ll: [42.875753, 74.587905], kind: 'togo', name: 'Манаса 40', addr: 'Манаса, 40 — пересекает Киевская', open: std, city: 'Бишкек' },
  { id: 'chapaeva', ll: [42.84347, 74.578374], kind: 'togo', name: 'Чапаева', addr: 'Ахунбаева, 180', tel: '0500053691', open: std, city: 'Бишкек' },
  { id: 'jal-23', ll: [42.842794, 74.567993], kind: 'togo', name: 'Джал-23', addr: 'Тыналиева, 94а', tel: '0704777788', open: std, city: 'Бишкек' },
  { id: 'ordo', ll: [42.872596, 74.610645], kind: 'togo', name: 'БЦ Ордо', addr: 'Абдрахманова, 170/1', tel: '0707337753', open: day(9, 18), city: 'Бишкек' },
  { id: 'zum', ll: [42.876201, 74.614502], kind: 'togo', name: 'ЦУМ', addr: 'Чуй, 155 — старый ЦУМ, 1 этаж', city: 'Бишкек',
    open: { wd: [H(10), H(20, 30)], sat: [H(10), H(20, 30)], sun: [H(10), H(19, 30)] } },
  { id: 'ala-too', ll: [42.875718, 74.60158], kind: 'togo', name: 'Площадь Ала-Тоо', addr: 'Чуй, 120Б', tel: '0559799199', open: std, city: 'Бишкек' },
  { id: 'batken', ll: [42.86175, 74.601536], kind: 'togo', name: 'Баткен — Комфорт', addr: 'Льва Толстого, 19/5', tel: '0502240745', open: day(8, 20), city: 'Бишкек' },
  { id: 'dordoi-1', kind: 'togo', name: 'Дордой', addr: 'ЛЭП — проход между 8-9 рядами', tel: '0555909044', open: day(8, 17), city: 'Бишкек' },
  { id: 'dordoi-2', kind: 'togo', name: 'Дордой-2', addr: 'АЗС Север, 5-й ряд 1/1 — Шымкентская стоянка', tel: '0556909043', open: day(8, 17), city: 'Бишкек' },

  /* ── Особенные: аэропорт и горы ────────────────────────────────────── */
  { id: 'manas', ll: [42.895163, 74.541355], kind: 'togo', name: 'Аэропорт Манас', addr: 'Васильевский тракт, 105', open: null, city: 'Аэропорт', hero: true },
  { id: 'alplager', kind: 'togo', name: 'Альплагерь Ала-Арча', addr: 'ПП Ала-Арча, 1В', city: 'Горы', hero: true,
    open: { wd: [H(10), H(19)], sat: [H(9), H(19)], sun: [H(9), H(19)] }, closedMon: true },

  /* ── Регионы ───────────────────────────────────────────────────────── */
  { id: 'sokuluk', ll: [42.925309, 74.431066], kind: 'region', name: 'Сокулук', addr: 'с. Сокулук, Фрунзе, 161', open: std, city: 'Сокулук' },
  { id: 'kara-balta', ll: [42.798893, 73.851335], kind: 'region', name: 'Кара-Балта', addr: 'Кожомбердиева, 80', tel: '0556757527', open: std, city: 'Кара-Балта' },
  { id: 'tokmok-1', ll: [42.844458, 75.293407], kind: 'region', name: 'Токмок Объездная', addr: 'Советская, 152', tel: '0703024222', open: std, city: 'Токмок' },
  { id: 'tokmok-2', ll: [42.847953, 75.294521], kind: 'region', name: 'Токмок Бурана', addr: 'Советская, 150', tel: '0700176111', open: std, city: 'Токмок' },
  { id: 'karakol', ll: [42.499721, 78.384116], kind: 'region', name: 'Каракол', addr: 'Жусаева, 135', tel: '0550111099', open: late, city: 'Каракол', tag: 'кофейня' },
  { id: 'balykchy', ll: [42.456288, 76.147158], kind: 'region', name: 'Балыкчы', addr: 'Абдрахманова, 8', tel: '0501985502', open: std, city: 'Балыкчы' },
]

/* ── Открыто ли сейчас ─────────────────────────────────────────────────
   Возвращает { open, until, from } в минутах. Закрытие в 24:00 и позже
   означает «до полуночи», поэтому сравниваем без переноса на след. сутки. */
export function status(loc, now = new Date()) {
  if (loc.open === null) return { open: true, always: true }

  const dow = now.getDay()               // 0 = вс
  if (loc.closedMon && dow === 1) return { open: false, closedToday: true }

  const sched = dow === 0 ? (loc.open.sun || loc.open.wd)
    : dow === 6 ? (loc.open.sat || loc.open.wd)
      : loc.open.wd
  const mins = now.getHours() * 60 + now.getMinutes()
  const [from, to] = sched
  return { open: mins >= from && mins < to, from, to }
}

/* Расстояние по прямой (гаверсинус), км. Пешком/на машине будет больше,
   поэтому в интерфейсе подписываем «по прямой». */
export function distKm([lat1, lon1], [lat2, lon2]) {
  const R = 6371, rad = (d) => (d * Math.PI) / 180
  const dLat = rad(lat2 - lat1), dLon = rad(lon2 - lon1)
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export const fmtKm = (km) => (km < 1 ? `${Math.round(km * 1000)} м` : `${km.toFixed(1)} км`)

export const fmt = (m) => `${String(Math.floor(m / 60) % 24).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
export const telHref = (t) => `tel:+996${t.replace(/\D/g, '').replace(/^0/, '')}`
export const telText = (t) => {
  const d = t.replace(/\D/g, '')
  return `0${d.slice(1, 4)} ${d.slice(4, 6)} ${d.slice(6, 8)} ${d.slice(8)}`.replace(/\s+$/, '')
}
