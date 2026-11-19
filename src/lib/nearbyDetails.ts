import type { NearbyKey, NearbyLocale } from './nearby';
import { extraNearbyDescriptions, type ExtraNearbyKey } from './nearbyExtensions';

export type Detail = {
  about: string;
  history: string;
  landscape: string;
  observation: string;
  visitTips: string[];
  routeSteps: string[];
  photoSpots: { title: string; detail: string }[];
  notes: string[];
};

const primaryDetails = {
  'isla-grande': {
    en: {
      about: 'Isla Grande is part of the protected Rosario and San Bernardo coral-island landscape administered by Parques Nacionales Naturales de Colombia. The Afro-Colombian community of Orika has its own community council and plays a significant role in local life and community-based tourism. Public conservation rules and the operation of individual lodging, piers and excursions are different responsibilities. The island is best understood as a living coastal community with mangroves, dry tropical vegetation and small-scale visitor services—not simply as an extension of the Oceanario.',
      history: 'The Rosario Islands have long been tied to the maritime life of Cartagena. Isla Grande has an Afro-descendant community whose fishing traditions, local knowledge and relationship with the coast are important parts of its identity. The Orika settlement developed as a center of community life during the late twentieth century. Today local guides combine cultural interpretation with visits to mangroves and coastal habitats.',
      landscape: 'This is a low coral island rather than a mountain viewpoint. Its landscape shifts among sandy paths, mangrove edges, tropical dry forest, small piers and stretches of coast. Built features are modest: village lanes, docks and lodging facilities sit within the vegetation. They should not be described as historic monumental architecture.',
      observation: 'Look for the transition between inhabited areas and natural habitats, the protective role of mangrove roots, changes in shoreline texture and the everyday use of piers. On a guided walk, ask how the local community balances tourism, fishing and the care of coral and coastal ecosystems.',
      visitTips: ['Confirm whether your boat stops at the pier closest to your intended activity.', 'Carry drinking water and shoes suitable for sandy, uneven paths.', 'Book mangrove or community walks with a locally authorized guide.', 'Keep a clear return meeting point; schedules depend on sea conditions.'],
      routeSteps: ['Arrive at the agreed Isla Grande pier and confirm the return time.', 'Follow permitted paths toward the community or nature-walk starting point.', 'Explore mangrove or dry-forest scenery with a local guide if available.', 'Pause at an accessible shoreline viewpoint to observe water and vegetation.', 'Return to the departure pier with time for boarding.'],
      photoSpots: [
        { title: 'Palm-lined waterfront', detail: 'Frame palms against the Caribbean horizon from a permitted beach or terrace area.' },
        { title: 'Mangrove edge', detail: 'Focus on roots, reflections and habitat textures without entering protected vegetation.' },
        { title: 'Village path', detail: 'Use the perspective of sandy lanes to show island life, respecting residents’ privacy.' }
      ],
      notes: ['Isla Grande and the Oceanario are on separate islands.', 'Access through a hotel or private pier may be restricted to guests.', 'Do not step on corals or collect shells and wildlife.']
    },
    es: {
      about: 'Isla Grande forma parte del paisaje insular protegido de Corales del Rosario y San Bernardo, bajo la autoridad de Parques Nacionales Naturales de Colombia. La comunidad afrocolombiana de Orika cuenta con su consejo comunitario y participa en el turismo de base local. Las reglas de conservación del área protegida y los servicios privados de alojamientos, muelles y excursiones son responsabilidades distintas. La isla es una comunidad costera viva, con manglares, bosque seco tropical y servicios de pequeña escala.',
      history: 'Las Islas del Rosario mantienen una larga relación marítima con Cartagena. La comunidad afrodescendiente de Isla Grande conserva conocimientos y tradiciones vinculados a la pesca y al litoral. El poblado de Orika se consolidó como centro de vida comunitaria hacia finales del siglo XX. Hoy algunos guías locales explican el patrimonio cultural junto a los ecosistemas de manglar.',
      landscape: 'Se trata de una isla coralina baja, no de un mirador montañoso. El paisaje combina senderos arenosos, bordes de manglar, bosque seco tropical, pequeños embarcaderos y sectores de costa. Su arquitectura es principalmente cotidiana: caminos del poblado, muelles y alojamientos integrados entre la vegetación.',
      observation: 'Observa la transición entre los espacios habitados y los ecosistemas, la función protectora de las raíces del manglar, las texturas de la costa y el uso diario de los muelles. Con un guía local, pregunta por la relación entre turismo, pesca y conservación.',
      visitTips: ['Confirma el muelle más cercano a la actividad elegida.', 'Lleva agua y calzado apropiado para caminos arenosos.', 'Contrata recorridos de manglar o culturales con guías locales autorizados.', 'Fija un punto de regreso y deja margen ante cambios del mar.'],
      routeSteps: ['Desembarca en el muelle acordado y confirma el retorno.', 'Sigue caminos permitidos hacia el poblado o el inicio de una ruta natural.', 'Conoce los manglares o el bosque seco con guía, cuando esté disponible.', 'Detente en un punto accesible de la costa para observar el paisaje.', 'Regresa al muelle con tiempo suficiente.'],
      photoSpots: [
        { title: 'Costa entre palmeras', detail: 'Combina palmeras y horizonte marino desde una playa o terraza permitida.' },
        { title: 'Borde del manglar', detail: 'Fotografía raíces y reflejos sin entrar en la vegetación protegida.' },
        { title: 'Camino del poblado', detail: 'Aprovecha la perspectiva de los senderos y respeta a los residentes.' }
      ],
      notes: ['Isla Grande y el Oceanario están en islas distintas.', 'Los muelles y terrenos privados pueden tener acceso limitado.', 'No pises corales ni recojas fauna, conchas o fragmentos de arrecife.']
    },
    zh: {
      about: 'Isla Grande 位于哥伦比亚国家自然公园管理机构负责的罗萨里奥及圣贝尔纳多珊瑚群岛保护区域。岛上的非裔哥伦比亚社区 Orika 有社区委员会，并参与当地社区旅游。保护区生态规则与各住宿、码头及旅行团的日常运营属于不同管理层面。这里既是自然景观，也是有人长期生活的海岛社区，红树林、热带干旱林与当地文化共同构成其特色。',
      history: '罗萨里奥群岛长期与卡塔赫纳的航海、渔业和岛屿生活联系紧密。Isla Grande 的非裔社区延续了与海岸、捕鱼及地方知识有关的传统。Orika 在二十世纪后期逐渐成为岛上的社区生活中心。今天，一些本地导览将文化记忆与红树林、珊瑚礁生态讲解结合。',
      landscape: '大岛是一座低平的珊瑚岛，不是山地观景台。沙质小径、红树林边缘、热带干旱林、小型码头与海岸线交错出现。这里的人文建筑以社区巷道、码头和掩映在植被中的住宿设施为主，不宜将其描述为纪念性古建筑。',
      observation: '重点观察聚落与自然栖地的过渡、红树林根系的护岸作用、海岸地表与水色变化，以及码头在日常岛屿交通中的角色。参加本地导览时，可询问社区如何协调观光、渔业与生态保育。',
      visitTips: ['提前确认船只停靠码头是否靠近计划参加的活动。', '携带饮水和适合沙地、不平路面的鞋。', '红树林与社区步行活动优先选择当地合规导览。', '记清返程集合点，为海况和登船预留时间。'],
      routeSteps: ['从约定码头上岸，确认返程时段。', '沿允许进入的小径前往社区或自然导览起点。', '视安排由当地向导带领观察红树林或干旱林。', '在开放的海岸观景处停留，欣赏海面与植被。', '提前返回码头，准备返程。'],
      photoSpots: [
        { title: '椰林海岸', detail: '从允许进入的岸边或露台，以椰树与加勒比海水平线构图。' },
        { title: '红树林边缘', detail: '记录根系、倒影和潮间带纹理，不踏入受保护植被。' },
        { title: '社区沙质小径', detail: '利用小路的纵深表现岛屿生活，拍摄居民先征求同意。' }
      ],
      notes: ['大岛与海洋馆分处不同岛屿。', '部分私人住宿和码头仅向住客开放。', '不要踩踏珊瑚或采集贝壳及海洋动物。']
    }
  },
  'playa-blanca-baru': {
    en: {
      about: 'Playa Blanca is a coastal public destination on Barú within Cartagena’s island and coastal district, where environmental protection, tourism oversight and maritime safety involve different Colombian and Cartagena authorities. It is not a single privately managed park. Community businesses provide beach meals, seating, lodging and transport separately, while public authorities establish relevant shoreline, visitor and boating rules. The beach should be treated as a living working coastline rather than a ticketed attraction with one operator.',
      history: 'Fishing and coastal trade shaped the settlements around Barú long before mass day tourism. Local families adapted economic activity as visitors increasingly came to Playa Blanca for its sand and sea. The growth of tourism has created both livelihoods and pressure on beach access and marine ecosystems. This makes local community interests and responsible service choices part of the visitor experience.',
      landscape: 'The defining scenery is a broad pale-sand shore facing turquoise Caribbean water. Palm-thatch shelters, small service buildings and boats form a practical beach landscape, rather than a historical building ensemble. The backdrop, sea conditions and density of temporary structures vary by section and season.',
      observation: 'Compare open shoreline views with busier service areas, note how coastal vegetation helps stabilize sandy terrain, and observe the separation of swimming, boats and shore services. Choose safe water entry based on current conditions rather than the apparent color or calmness of the sea.',
      visitTips: ['Agree on prices for chairs, food and other services before ordering.', 'Carry sun protection and sufficient drinking water.', 'Follow lifeguard or maritime guidance on currents and boat movements.', 'Confirm the exact return time and meeting point if arriving by boat.'],
      routeSteps: ['Arrive at a confirmed road or boat access point.', 'Walk along a permitted section of the public shoreline.', 'Choose a suitable rest area after confirming any service charges.', 'Pause for coastal photographs and observe changing sea conditions.', 'Return to the agreed vehicle or boat pickup point.'],
      photoSpots: [
        { title: 'Open sandy shoreline', detail: 'Use a wider angle to show the transition between pale sand and blue water.' },
        { title: 'Traditional beach shelters', detail: 'Capture palm-thatch roofs and the working coastal setting without intruding on private businesses.' },
        { title: 'Boat landing area', detail: 'Photograph boats from a safe designated place, clear of boarding and swimming zones.' }
      ],
      notes: ['Barú can be accessed by road, unlike the Oceanario island.', 'Beach service prices and transport inclusions vary.', 'Sea and crowd conditions can change quickly.']
    },
    es: {
      about: 'Playa Blanca es un destino costero de Barú dentro del distrito de Cartagena. La protección ambiental, la regulación turística y la seguridad marítima involucran a distintas autoridades colombianas y distritales; no es un parque privado administrado por un único operador. Negocios locales ofrecen comidas, sillas, alojamiento y transporte de forma independiente, sujetos a las normas públicas aplicables.',
      history: 'La pesca y el intercambio costero marcaron la vida de los poblados de Barú antes del crecimiento del turismo de playa. Con la llegada de más visitantes, muchas familias adaptaron sus actividades económicas. El turismo genera oportunidades, pero también presión sobre el acceso a la costa y los ecosistemas marinos; por eso es importante respetar a las comunidades y contratar servicios de manera informada.',
      landscape: 'La gran franja de arena clara frente al mar Caribe turquesa define el paisaje. Kioscos de techo de palma, pequeñas construcciones de servicios y embarcaciones forman un entorno playero funcional, no un conjunto arquitectónico histórico. El ambiente cambia según el sector, la temporada y el estado del mar.',
      observation: 'Compara los sectores despejados con las zonas de servicios, observa la vegetación costera que ayuda a fijar la arena y distingue los espacios de baño, navegación y trabajo. Decide dónde entrar al agua según las condiciones actuales, no solo por el color del mar.',
      visitTips: ['Acuerda precios de sillas, comidas y otros servicios antes de consumir.', 'Lleva protección solar y suficiente agua.', 'Sigue las indicaciones de seguridad sobre corrientes y embarcaciones.', 'Si llegas en lancha, confirma hora y lugar exactos de regreso.'],
      routeSteps: ['Llega por el acceso vial o marítimo confirmado.', 'Recorre un tramo permitido de la orilla pública.', 'Escoge una zona de descanso y verifica cualquier costo.', 'Detente a fotografiar la costa y observa el estado del mar.', 'Regresa al punto convenido de transporte.'],
      photoSpots: [
        { title: 'Orilla abierta', detail: 'Un encuadre amplio permite mostrar arena clara y agua azul.' },
        { title: 'Kioscos tradicionales', detail: 'Incluye techos de palma y ambiente playero sin invadir negocios privados.' },
        { title: 'Zona de llegada de lanchas', detail: 'Fotografía desde un lugar seguro fuera del embarque y del baño.' }
      ],
      notes: ['Barú tiene acceso por carretera, a diferencia de la isla del Oceanario.', 'Los precios y los servicios incluidos varían por operador.', 'El oleaje y la afluencia pueden cambiar rápidamente.']
    },
    zh: {
      about: 'Playa Blanca 是卡塔赫纳辖区巴鲁岛的海岸公共游览地点。当地环境保护、旅游秩序及海上安全由不同的哥伦比亚及卡塔赫纳主管部门分别负责，并不存在单一经营者统一管理整片海滩的情况。餐饮、沙滩座椅、住宿与交通通常由不同社区商户提供，并须遵守适用的公共管理规则。',
      history: '巴鲁岛沿岸聚落过去与捕鱼和海上贸易密切相关。随着更多游客为白沙与海景前来，当地家庭逐渐发展旅游服务。旅游带来就业机会，也对海岸公共通行和海洋生态形成压力。因此，理解当地社区生活、事先确认服务价格，是游览的一部分。',
      landscape: '开阔的浅色沙滩与碧蓝加勒比海是白沙滩最鲜明的景观。棕榈叶屋顶凉亭、小型服务设施与船只构成实用的海滩空间，而不是历史古建筑群。不同沙滩区段、季节与海况下，景观和设施密度都有差异。',
      observation: '比较开阔海岸与集中服务区的空间变化，留意海岸植被如何固定沙地，以及游泳、靠船和经营服务区域的分隔。不要仅凭海水看起来平静就判断适合下水，应遵守当日安全指引。',
      visitTips: ['使用座椅、点餐或购买其他服务前先谈清价格。', '带好防晒用品和足够饮水。', '留意海流、船只活动及现场救生或海事提醒。', '乘船抵达者应确认准确返航时间和集合地点。'],
      routeSteps: ['从已确认的陆路或海路入口抵达。', '沿允许进入的公共沙滩区域步行。', '确认设施费用后选择休息区域。', '停留拍摄海岸景观，并持续留意海况。', '回到约定的车辆或船只接驳点。'],
      photoSpots: [
        { title: '开阔沙岸', detail: '使用较广视角表现浅色沙滩与海水的层次。' },
        { title: '棕榈叶顶凉亭', detail: '记录当地常见海滩设施与氛围，避免擅入私人营业空间。' },
        { title: '船只靠岸区', detail: '在安全且允许的区域拍摄，不影响登船或游泳活动。' }
      ],
      notes: ['巴鲁岛可走陆路抵达，和海洋馆所在岛屿不同。', '服务价格及套票包含内容因商家而异。', '海况与人流可能快速改变。']
    }
  }
};

const management = {
  en: { coastal: 'Public coastal and maritime authorities set applicable access, environmental and safety rules. Individual boats, facilities and accommodations have separate operators.', fort: 'The fortification is part of Cartagena’s historic coastal defense landscape, subject to Colombian cultural-heritage protections and local visitor-access arrangements.' },
  es: { coastal: 'Las autoridades costeras y marítimas regulan el acceso, la protección ambiental y la seguridad. Embarcaciones, instalaciones y alojamientos tienen operadores distintos.', fort: 'La fortificación pertenece al paisaje defensivo histórico de Cartagena, bajo la protección del patrimonio cultural colombiano y las condiciones locales de acceso.' },
  zh: { coastal: '公共海岸与海事主管部门负责适用的通行、环境保护和安全规则；船只、设施及住宿由不同经营者管理。', fort: '这处防御工事属于卡塔赫纳历史海防体系，受哥伦比亚文化遗产保护制度及当地参观管理安排约束。' }
};

const extraDetails = Object.fromEntries(Object.entries(extraNearbyDescriptions).map(([key, place]) => [key, Object.fromEntries((['en', 'es', 'zh'] as NearbyLocale[]).map(locale => {
  const d = place.text[locale];
  const isFort = key.startsWith('fuerte-') || key.startsWith('bateria-');
  const note = management[locale][isFort ? 'fort' : 'coastal'];
  const steps = d.route.split(/(?<=[.!。])\s+/).filter(Boolean);
  return [locale, {
    about: `${note} ${d.intro}`,
    history: d.history,
    landscape: d.landscape,
    observation: d.observe,
    visitTips: [d.transport, d.observe, d.stay],
    routeSteps: steps.length > 1 ? steps : [d.transport, d.route, d.observe, d.photo],
    photoSpots: [{ title: d.title, detail: d.photo }, { title: d.tagline, detail: d.landscape }],
    notes: [d.transport, d.observe, note]
  } satisfies Detail];
}))])) as Record<ExtraNearbyKey, Record<NearbyLocale, Detail>>;

export const nearbyDetails: Record<NearbyKey, Record<NearbyLocale, Detail>> = { ...primaryDetails, ...extraDetails };
