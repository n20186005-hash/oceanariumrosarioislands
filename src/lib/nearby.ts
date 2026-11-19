import { extraNearbyPlaces, type ExtraNearbyKey } from './nearbyExtensions';

export type NearbyKey = 'isla-grande' | 'playa-blanca-baru' | ExtraNearbyKey;
export type NearbyLocale = 'zh' | 'en' | 'es';

export type LocalText = {
  title: string;
  tagline: string;
  introduction: string;
  highlights: string;
  background: string;
  route: string;
  transport: string;
  photoTip: string;
  stay: string;
  faq: { q: string; a: string }[];
};

export type NearbyPlace = {
  image: string;
  photoSource: string;
  mapsUrl: string;
  location: string;
  manager: string;
  source: string;
  access: string;
  text: Record<NearbyLocale, LocalText>;
};

export const nearbyPlaces: Record<NearbyKey, NearbyPlace> = {
  'isla-grande': {
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Cocolise_Isla_Resort%2C_Islas_del_Rosario_%2823938738774%29.jpg',
    photoSource: 'https://commons.wikimedia.org/wiki/File:Cocolise_Isla_Resort,_Islas_del_Rosario_(23938738774).jpg',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Isla+Grande+Islas+del+Rosario+Cartagena+Colombia',
    location: 'Isla Grande, Islas del Rosario, Cartagena de Indias, Bolívar, Colombia',
    manager: 'Parques Nacionales Naturales de Colombia (protected-area authority); individual piers, accommodations and tours have their own operators.',
    source: 'https://www.parquesnacionales.gov.co/nuestros-parques/pnn-corales-del-rosario-y-de-san-bernardo/',
    access: 'Island landings and accommodation access depend on your confirmed boat operator.',
    text: {
      en: {
        title: 'Isla Grande, Rosario Islands',
        tagline: 'Mangrove landscapes, coastal paths and an island stay near the Oceanario',
        introduction: 'Isla Grande is one of the main inhabited destinations in the Rosario Islands. It is a separate island from the Oceanario on San Martín de Pajarales, so a visit requires its own boat stop.',
        highlights: 'Coastal scenery, mangrove habitats, local paths and opportunities for guided water activities are the main reasons to visit. Choose an activity according to weather, site rules and operator availability.',
        background: 'The island belongs to the Rosario archipelago within the broader protected marine landscape of Corales del Rosario y de San Bernardo. Environmental management of the protected area falls under Colombia’s national parks authority, while individual hospitality services are operated separately.',
        route: 'Start at the pier agreed with your boat operator. Follow permitted village or coastal paths, stop at a designated shoreline viewpoint, then return to the same agreed meeting point. Do not assume a walking connection to the Oceanario; these are different islands.',
        transport: 'Arrange a boat transfer from Cartagena or another island. Confirm the exact Isla Grande landing pier, outward and return sailing, luggage allowance and what happens if sea conditions interrupt service.',
        photoTip: 'For landscape photos, use a permitted shoreline or palm-lined outlook. Avoid photographing private hotel grounds or residents without permission.',
        stay: 'Isla Grande has island accommodation and day-visit operators. Staying overnight can allow more time for the island landscape, but boat schedules and individual property access should be checked before booking.',
        faq: [
          { q: 'Is Isla Grande the island of the Oceanario?', a: 'No. Oceanario CEINER is on San Martín de Pajarales; Isla Grande is a different island.' },
          { q: 'Can I visit both in one day?', a: 'Possibly, only if your boat operator confirms both stops and enough time at each. Do not assume a standard tour includes both.' },
          { q: 'Is there a universal island entrance ticket?', a: 'No single price covers every private facility or boat service. Check protected-area charges and the operator’s inclusions separately.' }
        ]
      },
      es: {
        title: 'Isla Grande, Islas del Rosario',
        tagline: 'Manglares, senderos costeros y una isla para explorar cerca del Oceanario',
        introduction: 'Isla Grande es uno de los destinos habitados del archipiélago del Rosario. Es una isla distinta a San Martín de Pajarales, donde está el Oceanario; por eso requiere una parada específica de la embarcación.',
        highlights: 'El paisaje costero, los manglares, los caminos locales y las actividades acuáticas guiadas son sus principales atractivos. Elige según el clima, las normas del lugar y la disponibilidad de operadores.',
        background: 'La isla pertenece al archipiélago del Rosario, dentro del paisaje marino protegido de Corales del Rosario y de San Bernardo. Parques Nacionales Naturales es la autoridad del área protegida; hoteles, muelles y excursiones tienen operadores independientes.',
        route: 'Comienza en el muelle acordado con la empresa de transporte, recorre únicamente los caminos permitidos y visita un punto autorizado de observación de la costa antes de regresar al lugar de encuentro. No hay conexión peatonal con el Oceanario.',
        transport: 'Reserva traslado en lancha desde Cartagena u otra isla. Confirma el muelle exacto de llegada, los horarios de ida y vuelta, el equipaje permitido y el procedimiento ante cambios del mar.',
        photoTip: 'Busca una perspectiva de la costa y las palmeras desde una zona autorizada. Respeta la privacidad de alojamientos y residentes.',
        stay: 'Hay servicios de alojamiento y pasadías. Pernoctar permite dedicar más tiempo al entorno, siempre que compruebes las conexiones marítimas y las condiciones del establecimiento.',
        faq: [
          { q: '¿Isla Grande es la isla del Oceanario?', a: 'No. El Oceanario CEINER se encuentra en San Martín de Pajarales.' },
          { q: '¿Puedo visitar ambos lugares el mismo día?', a: 'Solo si la empresa de lanchas confirma ambas paradas y suficiente tiempo de visita.' },
          { q: '¿Hay una entrada única para toda la isla?', a: 'No existe una tarifa universal para todas las instalaciones y servicios privados. Consulta cada cargo por separado.' }
        ]
      },
      zh: {
        title: '罗萨里奥群岛大岛 Isla Grande',
        tagline: '红树林、海岸小径与可安排过夜的岛屿体验',
        introduction: 'Isla Grande 是罗萨里奥群岛主要的有人居住岛屿之一，与海洋馆所在的圣马丁德帕哈拉莱斯岛不同。要参观大岛，需要向船家确认单独的停靠点。',
        highlights: '海岸风景、红树林生境、当地步道和有向导带领的水上活动是主要看点。具体活动要考虑天气、保护区规则和运营商安排。',
        background: '大岛属于罗萨里奥群岛及圣贝尔纳多珊瑚群岛海洋保护景观。哥伦比亚国家自然公园管理机构负责保护区事务，住宿、码头与旅行团则分别由各经营者运营。',
        route: '从预订船家指定的码头上岸，沿允许通行的社区或海岸路线步行，在合规观景位置停留，再返回约定集合点。大岛与海洋馆之间不能步行通达。',
        transport: '可从卡塔赫纳或其他岛屿预约船只。出发前确认具体上岸码头、往返船班、行李规定及海况改变时的安排。',
        photoTip: '在可进入的海岸与椰林位置拍摄，不随意进入私人酒店场地，拍摄居民前先征求许可。',
        stay: '大岛有住宿与一日游服务。过夜能安排更从容的岛屿活动，但应先核实船班和住宿设施的实际接驳方式。',
        faq: [
          { q: '大岛就是海洋馆所在的岛吗？', a: '不是。海洋馆 CEINER 位于圣马丁德帕哈拉莱斯岛。' },
          { q: '一天能同时参观两地吗？', a: '有可能，但必须由船家明确确认两处停靠和足够的参观时间。' },
          { q: '大岛有统一门票吗？', a: '没有涵盖所有私人设施与船只服务的统一票价；请分别核对保护区收费与运营项目。' }
        ]
      }
    }
  },
  'playa-blanca-baru': {
    image: '/gallery/nearby-playa-blanca.jpg',
    photoSource: 'https://commons.wikimedia.org/wiki/File:La_Playa_Blanca,_Bar%C3%BA.jpg',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Playa+Blanca+Baru+Cartagena+Bolivar+Colombia',
    location: 'Playa Blanca, Barú, Cartagena de Indias, Bolívar, Colombia',
    manager: 'Public coastal area under applicable Cartagena and Colombian environmental authorities; beach services are operated by independent businesses.',
    source: 'https://colombia.travel/en/cartagena-de-indias/beaches-and-islands-rosario',
    access: 'Access by road through Barú or by an itinerary that specifically includes this beach.',
    text: {
      en: {
        title: 'Playa Blanca, Barú',
        tagline: 'A white-sand beach day on Barú, distinct from the Rosario Islands Oceanario',
        introduction: 'Playa Blanca is a beach destination on Barú south of Cartagena. It is often combined with island tours, but it is not on the Oceanario island and should be planned as a separate stop.',
        highlights: 'The long sandy shore, shallow-looking turquoise water and coastal scenery define the visit. Conditions, crowding, currents and access can vary throughout the day; follow local water-safety instructions.',
        background: 'Barú and the nearby Rosario Islands are part of the Cartagena coastal tourism landscape. Playa Blanca is a beach, not a museum or a single-ticket attraction, and services along the shoreline are independently operated.',
        route: 'Arrive at an agreed access point, walk along the public beach where permitted, pick a suitable place to rest and photograph the shoreline, then return to the agreed transport meeting point. Avoid assuming that a tour stops at the Oceanario as well.',
        transport: 'Road access to Barú is possible, while some boats and day tours also stop at Playa Blanca. Confirm whether your package includes road or sea transport, return details, meals and any service charges.',
        photoTip: 'Photograph the coastline from an accessible beach section in softer morning light. Keep people and boats out of close-up images unless permission is given.',
        stay: 'Beach lodging and day-use services vary by provider. Ask about power, water, transport timing and the conditions of your particular booking.',
        faq: [
          { q: 'Is Playa Blanca next to the Oceanario?', a: 'It is in the wider Cartagena coastal region, not on San Martín de Pajarales. Travel requires a separate route or boat stop.' },
          { q: 'Can I reach Playa Blanca by road?', a: 'Yes, road access to Barú is possible. Check current route and parking arrangements.' },
          { q: 'Is the beach itself a single paid attraction?', a: 'No. Transport, amenities and private services can have separate charges; clarify them before purchase.' }
        ]
      },
      es: {
        title: 'Playa Blanca, Barú',
        tagline: 'Arena clara y paisaje costero en Barú, en una visita distinta del Oceanario',
        introduction: 'Playa Blanca es un destino de playa en Barú, al sur de Cartagena. Algunos recorridos la combinan con otras paradas, pero no está en la isla del Oceanario y requiere un itinerario específico.',
        highlights: 'La franja de arena, el paisaje litoral y el agua turquesa son sus principales atractivos. Las condiciones del mar, la afluencia y el acceso cambian; sigue las recomendaciones de seguridad.',
        background: 'Barú y las Islas del Rosario forman parte del entorno turístico costero de Cartagena. Playa Blanca es una playa, no un museo ni una atracción con una entrada única; los servicios son gestionados por negocios independientes.',
        route: 'Llega por el acceso acordado, camina por las zonas permitidas de playa, busca un lugar adecuado para descansar y fotografiar la costa, y vuelve al punto de encuentro de tu transporte.',
        transport: 'Se puede llegar a Barú por carretera; también hay excursiones marítimas que incluyen Playa Blanca. Comprueba el tipo de traslado, el retorno, las comidas y cualquier cargo por servicios.',
        photoTip: 'Fotografía la costa desde sectores accesibles, preferiblemente con luz suave de mañana. Respeta la privacidad de visitantes y trabajadores.',
        stay: 'Existen alojamientos y servicios de pasadía con condiciones distintas. Consulta electricidad, agua, acceso y horarios de transporte en cada reserva.',
        faq: [
          { q: '¿Playa Blanca está en la isla del Oceanario?', a: 'No. Se ubica en Barú, no en San Martín de Pajarales.' },
          { q: '¿Se puede llegar por carretera?', a: 'Sí. Verifica la ruta y el estacionamiento disponibles al viajar.' },
          { q: '¿Hay una entrada única a la playa?', a: 'No. Transporte, instalaciones y servicios privados pueden cobrarse por separado.' }
        ]
      },
      zh: {
        title: '巴鲁岛白沙滩 Playa Blanca',
        tagline: '卡塔赫纳海岸的白沙与碧海，一处独立于海洋馆的海滩',
        introduction: 'Playa Blanca 位于卡塔赫纳南侧的巴鲁岛，是独立的海滩目的地。部分群岛游会安排这里，但它不在海洋馆所在岛屿，需核对行程是否包含该站。',
        highlights: '绵长沙滩、海岸景观和湛蓝海水是主要特色。海况、游客密度、海流和通行条件会变化，下水应遵守现场安全指引。',
        background: '巴鲁岛与邻近罗萨里奥群岛同属卡塔赫纳海岸旅游区域。Playa Blanca 是一处海滩，而非单一售票景区，沿岸各项设施由不同经营者提供。',
        route: '从约定的入口抵达，在允许进入的沙滩区域步行，选择合适位置休息和拍照，再回到交通集合点。不能假设前往这里的行程也包含海洋馆。',
        transport: '巴鲁岛可经陆路抵达，也有部分快艇和一日团前往白沙滩。应确认陆路或海路交通、返程、餐饮与其他服务收费。',
        photoTip: '在可进入的海岸区域拍摄，上午柔和光线比较适合记录海岸层次。近距离拍摄游客或工作人员前先征求同意。',
        stay: '周边有不同类型的住宿和一日游设施，订购时应具体核实供电、供水、交通时间和服务条件。',
        faq: [
          { q: '白沙滩就在海洋馆旁边吗？', a: '不在同一座岛。白沙滩位于巴鲁岛，需要单独安排路线或停靠。' },
          { q: '可以开车前往吗？', a: '可以经陆路前往巴鲁岛，出发前核实道路与停车安排。' },
          { q: '白沙滩有统一门票吗？', a: '并非单一售票景点；交通、设施和私人服务可能分别收费。' }
        ]
      }
    }
  },
  ...extraNearbyPlaces
};
