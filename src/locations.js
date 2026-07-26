/* ── Реальные точки Giraffe Coffee ────────────────────────────────────────
   Источник: официальный taplink сети (taplink.cc/giraffecoffeebishkek).
   Ничего не выдумано: адреса, графики и телефоны — как опубликовано у них.

   open: расписание в минутах от полуночи. `null` = круглосуточно.
   Ключи дней: wd — пн-пт, sat, sun. Если дня нет — берётся wd.        */

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
  { id: 'mederova', kind: 'cafe', name: 'Медерова', addr: 'Медерова, 81', tel: '0703333375', open: null, city: 'Бишкек' },
  { id: 'bokonbaeva', kind: 'cafe', name: 'Боконбаева', addr: 'Боконбаева, 101', tel: '0703333398', open: late, city: 'Бишкек' },
  { id: 'gorkogo', kind: 'cafe', name: 'Горького', addr: 'Горького, 172', tel: '0557333399', open: late, city: 'Бишкек' },
  { id: 'dordoi-plaza', kind: 'cafe', name: 'Dordoi Plaza', addr: 'Dordoi Plaza', tel: '0708330033', open: day(10, 24), city: 'Бишкек', tag: 'новая' },
  { id: 'karalaeva', kind: 'cafe', name: 'Каралаева', addr: 'Каралаева, 62/7', tel: '0501533333', open: late, city: 'Бишкек' },
  { id: 'cosmopark', kind: 'cafe', name: 'Cosmopark', addr: 'Юнусалиева, 40а, 2 этаж', tel: '0557553333', open: day(10, 24), city: 'Бишкек' },
  { id: 'royal', kind: 'cafe', name: 'БЦ Royal', addr: 'Абдумомунова, 282', tel: '0502773333', open: late, city: 'Бишкек' },

  /* ── Навынос ───────────────────────────────────────────────────────── */
  { id: 'beta-1', kind: 'togo', name: 'Beta Stores I', addr: 'пр. Чуй, 150а/2', open: day(8, 20), city: 'Бишкек' },
  { id: 'beta-2', kind: 'togo', name: 'Beta Stores II', addr: 'Юнусалиева, 171/3', open: std, city: 'Бишкек' },
  { id: '5mkr', kind: 'togo', name: '5 мкр', addr: 'Юнусалиева, 160а', tel: '0504906333', open: std, city: 'Бишкек' },
  { id: '8mkr', kind: 'togo', name: '8 мкр', addr: 'Байтик Баатыра, 1/4', open: std, city: 'Бишкек' },
  { id: 'ala-archa-tc', kind: 'togo', name: 'ТЦ Ала-Арча', addr: 'пр. Чынгыза Айтматова, 299в', tel: '0999104785', open: std, city: 'Бишкек' },
  { id: 'dk', kind: 'togo', name: 'DK (12 мкр)', addr: 'Жетикашкаевой, 29/1', open: std, city: 'Бишкек' },
  { id: 'london', kind: 'togo', name: 'БЦ Лондон', addr: 'Токомбаева, 9Б', tel: '0709330013', open: day(8, 20), city: 'Бишкек' },
  { id: 'magnum', kind: 'togo', name: 'Магнум', addr: 'Ахунбаева, 127/1', tel: '0708553333', open: day(8, 20), city: 'Бишкек' },
  { id: 'kok-jar', kind: 'togo', name: 'ЖМ Кок-Жар', addr: 'Кок-Жаңгак, 47а', tel: '0708600034', open: std, city: 'Бишкек' },
  { id: 'panorama', kind: 'togo', name: 'Панорама', addr: 'Карагул Акмат, 6/3', tel: '0550224411', city: 'Бишкек',
    open: { wd: [H(8), H(20)], sat: [H(8), H(23)], sun: [H(8), H(23)] } },
  { id: 'erkindik', kind: 'togo', name: 'Эркиндик', addr: 'Эркиндик, 23', tel: '0705113333', open: std, city: 'Бишкек' },
  { id: 'kraft', kind: 'togo', name: 'Крафт', addr: 'Московская, 208', tel: '0755291225', open: day(7, 19), city: 'Бишкек' },
  { id: 'razzakova', kind: 'togo', name: 'Раззакова', addr: 'Боконбаева, 113', open: std, city: 'Бишкек' },
  { id: 'bishkek-city', kind: 'togo', name: 'Bishkek City', addr: 'Суюмбаева, 142/2', tel: '0557291225', open: std, city: 'Бишкек' },
  { id: 'suyumbaeva', kind: 'togo', name: 'Суюмбаева', addr: 'Суюмбаева, 51', tel: '0703030353', open: std, city: 'Бишкек' },
  { id: 'bravo', kind: 'togo', name: 'Браво', addr: 'Рысмендеева, 54', tel: '0708223333', open: std, city: 'Бишкек' },
  { id: 'alamedin', kind: 'togo', name: 'Аламедин', addr: 'Аламедин-1, 60/1', open: std, city: 'Бишкек' },
  { id: 'tunguch', kind: 'togo', name: 'Тунгуч', addr: 'ул. Анкара, 1/1Б', tel: '0990450039', open: std, city: 'Бишкек' },
  { id: 'druzhba', kind: 'togo', name: 'Дружба', addr: 'Байтик Баатыра, 39', tel: '0704773333', open: std, city: 'Бишкек' },
  { id: 'bishkek-park', kind: 'togo', name: 'Bishkek Park', addr: 'Киевская, 148 (2 этаж)', open: day(10, 22), city: 'Бишкек' },
  { id: 'manasa', kind: 'togo', name: 'Манаса 40', addr: 'Манаса, 40 — пересекает Киевская', open: std, city: 'Бишкек' },
  { id: 'chapaeva', kind: 'togo', name: 'Чапаева', addr: 'Ахунбаева, 180', tel: '0500053691', open: std, city: 'Бишкек' },
  { id: 'jal-23', kind: 'togo', name: 'Джал-23', addr: 'Тыналиева, 94а', tel: '0704777788', open: std, city: 'Бишкек' },
  { id: 'ordo', kind: 'togo', name: 'БЦ Ордо', addr: 'Абдрахманова, 170/1', tel: '0707337753', open: day(9, 18), city: 'Бишкек' },
  { id: 'zum', kind: 'togo', name: 'ЦУМ', addr: 'Чуй, 155 — старый ЦУМ, 1 этаж', city: 'Бишкек',
    open: { wd: [H(10), H(20, 30)], sat: [H(10), H(20, 30)], sun: [H(10), H(19, 30)] } },
  { id: 'ala-too', kind: 'togo', name: 'Площадь Ала-Тоо', addr: 'Чуй, 120Б', tel: '0559799199', open: std, city: 'Бишкек' },
  { id: 'batken', kind: 'togo', name: 'Баткен — Комфорт', addr: 'Льва Толстого, 19/5', tel: '0502240745', open: day(8, 20), city: 'Бишкек' },
  { id: 'dordoi-1', kind: 'togo', name: 'Дордой', addr: 'ЛЭП — проход между 8-9 рядами', tel: '0555909044', open: day(8, 17), city: 'Бишкек' },
  { id: 'dordoi-2', kind: 'togo', name: 'Дордой-2', addr: 'АЗС Север, 5-й ряд 1/1 — Шымкентская стоянка', tel: '0556909043', open: day(8, 17), city: 'Бишкек' },

  /* ── Особенные: аэропорт и горы ────────────────────────────────────── */
  { id: 'manas', kind: 'togo', name: 'Аэропорт Манас', addr: 'Васильевский тракт, 105', open: null, city: 'Аэропорт', hero: true },
  { id: 'alplager', kind: 'togo', name: 'Альплагерь Ала-Арча', addr: 'ПП Ала-Арча, 1В', city: 'Горы', hero: true,
    open: { wd: [H(10), H(19)], sat: [H(9), H(19)], sun: [H(9), H(19)] }, closedMon: true },

  /* ── Регионы ───────────────────────────────────────────────────────── */
  { id: 'sokuluk', kind: 'region', name: 'Сокулук', addr: 'с. Сокулук, Фрунзе, 161', open: std, city: 'Сокулук' },
  { id: 'kara-balta', kind: 'region', name: 'Кара-Балта', addr: 'Кожомбердиева, 80', tel: '0556757527', open: std, city: 'Кара-Балта' },
  { id: 'tokmok-1', kind: 'region', name: 'Токмок Объездная', addr: 'Советская, 152', tel: '0703024222', open: std, city: 'Токмок' },
  { id: 'tokmok-2', kind: 'region', name: 'Токмок Бурана', addr: 'Советская, 150', tel: '0700176111', open: std, city: 'Токмок' },
  { id: 'karakol', kind: 'region', name: 'Каракол', addr: 'Жусаева, 135', tel: '0550111099', open: late, city: 'Каракол', tag: 'кофейня' },
  { id: 'balykchy', kind: 'region', name: 'Балыкчы', addr: 'Абдрахманова, 8', tel: '0501985502', open: std, city: 'Балыкчы' },
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

export const fmt = (m) => `${String(Math.floor(m / 60) % 24).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
export const telHref = (t) => `tel:+996${t.replace(/\D/g, '').replace(/^0/, '')}`
export const telText = (t) => {
  const d = t.replace(/\D/g, '')
  return `0${d.slice(1, 4)} ${d.slice(4, 6)} ${d.slice(6, 8)} ${d.slice(8)}`.replace(/\s+$/, '')
}
